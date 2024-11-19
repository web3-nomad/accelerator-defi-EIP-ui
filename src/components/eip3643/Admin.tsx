import { Button, Divider, Stack, Text, Box } from "@chakra-ui/react";
import {
  useContext,
  useEffect,
  useState,
  useMemo,
  SetStateAction,
} from "react";
import { GroupBase } from "react-select";

import DeployToken from "@/components/eip3643/admin/DeployToken";
import RegisterIdentity from "@/components/eip3643/admin/RegisterIdentity";
import CreateIdentityFactory from "@/components/eip3643/admin/CreateIdentityFactory";
import { TokenNameItem } from "@/types/types";
import TokenInfo from "@/components/eip3643/admin/TokenInfo";
import Compliance from "@/components/eip3643/admin/Compliance";
import { MenuSelect } from "@/components/MenuSelect";
import { useOwnTokens } from "@/hooks/eip3643/useOwnTokens";

type Props = { setDeployedTokensEventsTrigger: SetStateAction<any> };

export default function Admin({ setDeployedTokensEventsTrigger }: Props) {
  const [isDeploy, setIsDeploy] = useState(false);
  const [tokenSelected, setTokenSelected] = useState<TokenNameItem>();
  const [tokenDeployInProgress, setTokenDeployInProgress] = useState(false);
  const { ownTokens } = useOwnTokens();

  const handleTokenSelect = (value: string | number) => {
    const tokenItem = ownTokens.find((itemSub) => itemSub.address === value);
    setTokenSelected(tokenItem);
  };

  const refreshTokensList = () => {
    setDeployedTokensEventsTrigger((prev: number) => prev++);
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
                  refreshTokensList();
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
          You have a token deploy in progress... Please allow up to 10{" "}
          {"seconds"} before it appears in the tokens list
          {!isDeploy &&
            "If the new deployed token has not appeared in the list automatically, try the manual Refresh button." +
              "Otherwise report the issue to admin.."}
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
