import { Button, Divider, Stack, Text } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";

import DeployToken from "@/components/eip3643/admin/DeployToken";
import RegisterIdentity from "@/components/eip3643/admin/RegisterIdentity";
import CreateIdentityFactory from "@/components/eip3643/admin/CreateIdentityFactory";
import { Eip3643Context } from "@/contexts/Eip3643Context";
import {
  readTokenName,
  readTokenOwner,
} from "@/services/contracts/wagmiGenActions";
import { TokenNameItem } from "@/types/types";
import { useWalletInterface } from "@/services/wallets/useWalletInterface";
import TokenInfo from "@/components/eip3643/admin/TokenInfo";
import Compliance from "@/components/eip3643/admin/Compliance";
import { MenuSelect } from "@/components/MenuSelect";

export default function Admin() {
  const [isDeploy, setIsDeploy] = useState(false);
  const [tokenSelected, setTokenSelected] = useState(
    null as TokenNameItem | null,
  );
  const [ownTokens, setOwnTokens] = useState([] as Array<TokenNameItem>);
  const { accountEvm } = useWalletInterface();
  const { deployedTokens } = useContext(Eip3643Context);

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
    setTokenSelected(tokenItem || null);
  };

  const tokensData = ownTokens.map((token) => ({
    value: token.address,
    label: `${token.name} ${token.address}`,
  }));

  return (
    <>
      {!isDeploy && (
        <Stack spacing={4} align="center">
          <MenuSelect
            label="Select token for operation"
            data={tokensData}
            onTokenSelect={handleTokenSelect}
          />
          {!tokenSelected && (
            <>
              <Text>OR</Text>
              <Button onClick={() => setIsDeploy(true)}>
                Deploy new token
              </Button>
            </>
          )}
        </Stack>
      )}
      {isDeploy && !tokenSelected && (
        <DeployToken onClose={() => setIsDeploy(false)} />
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
