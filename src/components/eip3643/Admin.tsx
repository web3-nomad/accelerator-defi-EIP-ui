import { Button, Divider, Stack, Text, Box } from "@chakra-ui/react";
import { useContext, useEffect, useState, useMemo } from "react";
import { GroupBase } from "react-select";

import DeployToken from "@/components/eip3643/admin/DeployToken";
import RegisterIdentity from "@/components/eip3643/admin/RegisterIdentity";
import CreateIdentityFactory from "@/components/eip3643/admin/CreateIdentityFactory";
import { Eip3643Context } from "@/contexts/Eip3643Context";
import {
  readTokenName,
  readTokenOwner,
  watchTrexFactoryTrexSuiteDeployedEvent,
} from "@/services/contracts/wagmiGenActions";
import { TokenNameItem } from "@/types/types";
import { useWalletInterface } from "@/services/wallets/useWalletInterface";
import TokenInfo from "@/components/eip3643/admin/TokenInfo";
import Compliance from "@/components/eip3643/admin/Compliance";
import { MenuSelect } from "@/components/MenuSelect";
import { WatchContractEventReturnType } from "viem";

export default function Admin() {
  const [isDeploy, setIsDeploy] = useState(false);
  const [tokenSelected, setTokenSelected] = useState<TokenNameItem>();
  const [ownTokens, setOwnTokens] = useState([] as Array<TokenNameItem>);
  const [tokenDeployInProgress, setTokenDeployInProgress] = useState(false);
  const { accountEvm } = useWalletInterface();
  const { deployedTokens, setDeployedTokens } = useContext(Eip3643Context);

  useEffect(() => {
    (deployedTokens as any).map((item: any) => {
      const tokenAddress = item["args"]?.[0];
      tokenAddress &&
        readTokenOwner({}, tokenAddress).then((resOwner) => {
          resOwner[0].toString().toLowerCase() === accountEvm?.toLowerCase() &&
            readTokenName({}, tokenAddress).then((resName) => {
              setOwnTokens((prev) => {
                return [
                  ...prev.filter((itemSub) => itemSub.address !== tokenAddress),
                  {
                    address: tokenAddress,
                    name: resName[0],
                  },
                ];
              });
            });
        });
    });
  }, [deployedTokens, accountEvm, setOwnTokens]);

  const handleTokenSelect = (value: string | number) => {
    const tokenItem = ownTokens.find((itemSub) => itemSub.address === value);
    setTokenSelected(tokenItem);
  };

  const readTokensList = () => {
    const unsubTokens: WatchContractEventReturnType =
      watchTrexFactoryTrexSuiteDeployedEvent({
        onLogs: (data) => {
          setDeployedTokens(((prev: any) => {
            return [...prev, ...data];
          }) as any);
        },
      });

    setTimeout(() => {
      unsubTokens();
    }, 10000);
  };

  const ownTokensData = useMemo(
    () =>
      ownTokens.map((token) => ({
        value: token.address,
        label: token.name,
      })),
    [ownTokens],
  );

  return (
    <>
      {!isDeploy && (
        <Stack spacing={4} align="center">
          <Box width="50%">
            <MenuSelect
              label="Select token for operation"
              data={ownTokensData as unknown as GroupBase<string | number>[]}
              onTokenSelect={handleTokenSelect}
            />
            <Text fontSize={14} mt={4} mb={4}>
              Note: only tokens deployed by current wallet address are shown
            </Text>
            {tokenSelected && (
              <Button
                onClick={() => {
                  setTokenSelected(undefined);
                }}
              >
                Back to deploy token
              </Button>
            )}
          </Box>
          {!tokenSelected && (
            <>
              <Text>OR</Text>
              <Button onClick={() => setIsDeploy(true)}>
                Deploy new token
              </Button>
              <Text>OR</Text>
              <Button
                onClick={() => {
                  readTokensList();
                }}
              >
                Refresh tokens list
              </Button>
            </>
          )}
        </Stack>
      )}
      {isDeploy && !tokenSelected && (
        <DeployToken
          onClose={() => setIsDeploy(false)}
          userDeployedTokens={ownTokens}
          setTokenDeployInProgress={setTokenDeployInProgress}
          tokenDeployInProgress={tokenDeployInProgress}
        />
      )}

      {tokenDeployInProgress && (
        <Text fontStyle="italic" fontSize={14} mt="5">
          You have token deploying in progress... Please, wait couple more
          seconds before you able to see it inside tokens list.
          {!isDeploy &&
            "If you still do not see token inside list you can use " +
              "Refresh tokens button. If that's doesn't help much then it's problem on our side."}
        </Text>
      )}

      {tokenSelected && (
        <>
          <TokenInfo tokenSelected={tokenSelected}></TokenInfo>
          <Divider my={10} />
          <CreateIdentityFactory />
          <Divider my={10} />
          <RegisterIdentity tokenSelected={tokenSelected} />
          <Divider my={10} />
          <Compliance tokenSelected={tokenSelected} />
          <Divider my={10} />
        </>
      )}
    </>
  );
}
