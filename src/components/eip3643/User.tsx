import { useEffect, useContext, useState, useMemo } from "react";
import TransferToken from "@/components/eip3643/user/TransferToken";
import { Eip3643Context } from "@/contexts/Eip3643Context";
import { TokenNameItem } from "@/types/types";
import { useWalletInterface } from "@/services/wallets/useWalletInterface";
import { Divider, Stack, Text, Box } from "@chakra-ui/react";
import { useTokensIdentityRegistries } from "@/hooks/useTokensIdentityRegistries";
import { MenuSelect } from "@/components/MenuSelect";
import { GroupBase } from "react-select";
import RegisterIdentity from "@/components/eip3643/admin/RegisterIdentity";
import CreateIdentityFactory from "@/components/eip3643/admin/CreateIdentityFactory";
import { useReadTokenName } from "@/hooks/useReadTokenName";
import { useReadTokenIdentityRegistryQueries } from "@/hooks/useReadTokenIdentityRegistryQueries";

export default function User() {
  const [tokenSelected, setTokenSelected] = useState<TokenNameItem>();
  const { accountEvm } = useWalletInterface();
  const { deployedTokens } = useContext(Eip3643Context);
  const { data: tokens, isSuccess: tokensIsSuccess } =
    useReadTokenName(deployedTokens);

  const [tokensByOwnership, setTokensByOwnership] = useState<TokenNameItem[]>(
    [],
  );

  const { data: tokenRegistries, isSuccess: registryAddressesIsSuccess } =
    useReadTokenIdentityRegistryQueries(tokens);

  const isReadyToLoadAgents = useMemo(() => {
    return (
      deployedTokens.length === tokens.length &&
      tokens.length === tokenRegistries.length &&
      tokensIsSuccess &&
      registryAddressesIsSuccess
    );
  }, [
    deployedTokens.length,
    tokenRegistries.length,
    registryAddressesIsSuccess,
    tokens.length,
    tokensIsSuccess,
  ]);

  const { registriesAgents } = useTokensIdentityRegistries(
    tokenRegistries,
    isReadyToLoadAgents,
  );

  useEffect(() => {
    if (!isReadyToLoadAgents) return;

    if (registriesAgents && accountEvm) {
      setTokensByOwnership(
        tokens.toSorted((a) => {
          const tokenIncludesIdentity =
            registriesAgents[a.address]?.includes(accountEvm);

          if (tokenIncludesIdentity) {
            return -1;
          }

          return 1;
        }),
      );
    } else if (tokens) {
      setTokensByOwnership(tokens);
    }
  }, [registriesAgents, accountEvm, tokens, isReadyToLoadAgents]);

  const handleTokenSelect = (value: string) => {
    const tokenItem = tokens.find((itemSub) => itemSub.address === value);
    setTokenSelected(tokenItem);
  };

  return (
    <>
      <Stack align="center">
        <Box width="50%">
          <MenuSelect
            loadingInProgress={!isReadyToLoadAgents}
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
