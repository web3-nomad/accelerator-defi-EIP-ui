import { useEffect, useContext, useState, useMemo } from "react";
import TransferToken from "@/components/eip3643/user/TransferToken";
import { Eip3643Context } from "@/contexts/Eip3643Context";
import { readTokenName } from "@/services/contracts/wagmiGenActions";
import { TokenNameItem } from "@/types/types";
import { useWalletInterface } from "@/services/wallets/useWalletInterface";
import { Divider, Select, Stack, Text } from "@chakra-ui/react";
import { useTokensIdentityRegistries } from "@/hooks/useTokensIdentityRegistries";
import { MenuSelect } from "../MenuSelect";
import RegisterIdentity from "@/components/eip3643/admin/RegisterIdentity";
import CreateIdentityFactory from "@/components/eip3643/admin/CreateIdentityFactory";

export default function User() {
  const [tokenSelected, setTokenSelected] = useState<TokenNameItem>();
  const [tokens, setTokens] = useState<TokenNameItem[]>([]);
  const { accountEvm } = useWalletInterface();
  const { deployedTokens } = useContext(Eip3643Context);
  const { registriesAgents } = useTokensIdentityRegistries(tokens);

  useEffect(() => {
    (deployedTokens as any).map((item: any) => {
      const tokenAddress = item["args"]?.[0];
      tokenAddress &&
        readTokenName({}, tokenAddress).then((res) => {
          setTokens((prev) => {
            return [
              ...prev.filter((itemSub) => itemSub.address !== tokenAddress),
              {
                address: tokenAddress,
                name: res[0],
              },
            ];
          });
        });
    });
  }, [deployedTokens, accountEvm, setTokens]);

  // Show the tokens which have the current user's identity added to the registry first.
  const sortedTokensByOwnership = useMemo(() => {
    if (registriesAgents && accountEvm) {
      return tokens.sort((a) => {
        const tokenIncludesIdentity =
          registriesAgents[a.address]?.includes(accountEvm);

        if (tokenIncludesIdentity) {
          return -1;
        }

        return 1;
      });
    }

    return tokens;
  }, [tokens, registriesAgents, accountEvm]);

  const handleTokenSelect = (value: string) => {
    const tokenItem = tokens.find((itemSub) => itemSub.address === value);
    setTokenSelected(tokenItem);
  };

  return (
    <>
      <Stack spacing={4} align="center">
        <MenuSelect
          buttonProps={{ style: { width: "50%" } }}
          data={sortedTokensByOwnership.map((item) => ({
            value: item.address,
            label: item.name,
          }))}
          onTokenSelect={(value) => handleTokenSelect(value)}
          label="Select token for operation"
        />
      </Stack>
      {tokenSelected &&
        registriesAgents &&
        registriesAgents[tokenSelected.address] && (
          <>
            <Divider my={10} />
            <Text>Token name: {tokenSelected.name}</Text>
            <Text>Token address: {tokenSelected.address}</Text>
            <Divider my={10} />
            <TransferToken
              tokenSelected={tokenSelected}
              registeredIdentities={registriesAgents[tokenSelected.address]}
            />
            <Divider my={10} />
            <CreateIdentityFactory />
            <Divider my={10} />
            <RegisterIdentity tokenSelected={tokenSelected} />
          </>
        )}
    </>
  );
}
