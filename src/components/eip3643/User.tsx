import { useEffect, useContext, useState } from "react";
import TransferToken from "@/components/eip3643/user/TransferToken";
import { Eip3643Context } from "@/contexts/Eip3643Context";
import { readTokenName } from "@/services/contracts/wagmiGenActions";
import { TokenNameItem } from "@/types/types";
import { useWalletInterface } from "@/services/wallets/useWalletInterface";
import { Divider, Stack, Text, Box } from "@chakra-ui/react";
import { useTokensIdentityRegistries } from "@/hooks/useTokensIdentityRegistries";
import { MenuSelect } from "@/components/MenuSelect";
import { GroupBase } from "react-select";
import { useDebounce } from "@uidotdev/usehooks";
import RegisterIdentity from "@/components/eip3643/admin/RegisterIdentity";
import CreateIdentityFactory from "@/components/eip3643/admin/CreateIdentityFactory";

export default function User() {
  const [tokenSelected, setTokenSelected] = useState<TokenNameItem>();
  const [tokens, setTokens] = useState<TokenNameItem[]>([]);
  const { accountEvm } = useWalletInterface();
  const { deployedTokens } = useContext(Eip3643Context);
  const { registriesAgents } = useTokensIdentityRegistries(tokens);
  const [tokensByOwnership, setTokensByOwnership] = useState<TokenNameItem[]>(
    [],
  );
  const debouncedRegistriesAgents = useDebounce(registriesAgents, 5000);

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

  useEffect(() => {
    if (debouncedRegistriesAgents && accountEvm) {
      setTokensByOwnership(
        tokens.sort((a) => {
          const tokenIncludesIdentity =
            debouncedRegistriesAgents[a.address]?.includes(accountEvm);

          if (tokenIncludesIdentity) {
            return -1;
          }

          return 1;
        }),
      );
    } else if (tokens) {
      setTokensByOwnership(tokens);
    }
  }, [debouncedRegistriesAgents, accountEvm, tokens]);

  const handleTokenSelect = (value: string) => {
    const tokenItem = tokens.find((itemSub) => itemSub.address === value);
    setTokenSelected(tokenItem);
  };

  return (
    <>
      <Stack align="center">
        <Box width="50%">
          <MenuSelect
            loadingInProgress={!tokensByOwnership?.length}
            data={
              tokensByOwnership.map((item) => ({
                value: item.address,
                label: item.name,
              })) as unknown as GroupBase<string | number>[]
            }
            onTokenSelect={(value) => handleTokenSelect(value)}
            label="Select token for operation"
          />
        </Box>
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
