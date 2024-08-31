import { useEffect, useContext, useState } from "react";
import TransferToken from "@/components/eip3643/user/TransferToken";
import { Eip3643Context } from "@/contexts/Eip3643Context";
import { readTokenName } from "@/services/contracts/wagmiGenActions";
import { TokenNameItem } from "@/types/types";
import { useWalletInterface } from "@/services/wallets/useWalletInterface";
import { Divider, Stack, Text } from "@chakra-ui/react";
import { useTokensIdentityRegistries } from "@/hooks/useTokensIdentityRegistries";
import { MenuSelect } from "@/components/MenuSelect";

export default function User() {
  const [tokenSelected, setTokenSelected] = useState(
    null as TokenNameItem | null,
  );
  const [tokens, setTokens] = useState<TokenNameItem[]>([]);
  const { accountEvm } = useWalletInterface();
  const { deployedTokens } = useContext(Eip3643Context);
  const { registriesAgents } = useTokensIdentityRegistries(tokens);
  const [tokensByOwnership, setTokensByOwnership] = useState<TokenNameItem[]>(
    [],
  );
  const [allowed, setAllowed] = useState<boolean>(false);

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
    const $timeout = setTimeout(() => {
      setAllowed(true);
    }, 5000);

    return () => {
      clearTimeout($timeout);
    };
  }, []);

  useEffect(() => {
    if (allowed) {
      if (registriesAgents && accountEvm) {
        setTokensByOwnership(
          tokens.sort((a) => {
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
    }
  }, [registriesAgents, allowed, accountEvm, tokens]);

  const handleTokenSelect = (value: string) => {
    const tokenItem = tokens.find((itemSub) => itemSub.address === value);
    setTokenSelected(tokenItem || null);
  };

  return (
    <>
      <Stack spacing={4} align="center">
        <MenuSelect
          loadingInProgress={!tokensByOwnership?.length}
          data={tokensByOwnership.map((item) => ({
            value: item.address,
            label: item.name,
          }))}
          onTokenSelect={(value) => handleTokenSelect(value)}
          label="Select token for operation"
          styles={{
            container: (base) => ({
              ...base,
              width: "45%",
            }),
          }}
        />
      </Stack>
      {tokenSelected &&
        registriesAgents &&
        registriesAgents[tokenSelected?.address] && (
          <>
            <Divider my={10} />
            <Text mb="2" fontWeight="bold">
              Address: {tokenSelected?.address}
            </Text>
            <TransferToken
              tokenSelected={tokenSelected}
              registeredIdentities={registriesAgents[tokenSelected?.address]}
            />
          </>
        )}
    </>
  );
}
