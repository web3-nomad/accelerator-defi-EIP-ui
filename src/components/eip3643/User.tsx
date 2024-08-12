import { useEffect, useContext, useState, useMemo } from "react";
import TransferToken from "@/components/eip3643/user/TransferToken";
import { Eip3643Context } from "@/contexts/Eip3643Context";
import { readTokenName } from "@/services/contracts/wagmiGenActions";
import { TokenNameItem } from "@/types/types";
import { useWalletInterface } from "@/services/wallets/useWalletInterface";
import { Divider, Select, Stack } from "@chakra-ui/react";
import { useTokensIdentityRegistries } from "@/hooks/useTokensIdentityRegistries";

export default function User() {
  const [tokenSelected, setTokenSelected] = useState(
    null as TokenNameItem | null,
  );
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

  // Sorting tokens by bring to the top ones account matched in.
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

  return (
    <>
      <Stack spacing={4} align="center">
        <Select
          placeholder="Select token for operation"
          onChange={(item) => {
            const tokenItem = tokens.find(
              (itemSub) => itemSub.address === item.target.value,
            );
            setTokenSelected(tokenItem || null);
          }}
          variant="outline"
        >
          {sortedTokensByOwnership.map((item) => (
            <option key={item.address} value={item.address}>
              {item.name} [{item.address}]
            </option>
          ))}
        </Select>
      </Stack>
      {tokenSelected &&
        registriesAgents &&
        registriesAgents[tokenSelected?.address] && (
          <>
            <Divider my={10} />
            <TransferToken
              tokenSelected={tokenSelected}
              registeredIdentities={registriesAgents[tokenSelected?.address]}
            />
          </>
        )}
    </>
  );
}
