import { useEffect, useContext, useState } from "react";
import TransferToken from "@/components/eip3643/user/TransferToken";
import { Eip3643Context } from "@/contexts/Eip3643Context";
import {
  readTokenName,
  readTokenIdentityRegistry,
  watchIdentityRegistryIdentityRegisteredEvent,
} from "@/services/contracts/wagmiGenActions";
import { TokenNameItem } from "@/types/types";
import { useWalletInterface } from "@/services/wallets/useWalletInterface";
import { Divider, Select, Stack } from "@chakra-ui/react";
import { WatchContractEventReturnType } from "@/services/contracts/watchContractEvent";

export default function User() {
  const [tokenSelected, setTokenSelected] = useState(
    null as TokenNameItem | null,
  );
  const [tokens, setTokens] = useState([] as Array<TokenNameItem>);
  const [registeredIdentities, setRegisteredIdentities] = useState<string[]>();
  const { accountEvm } = useWalletInterface();
  const { deployedTokens } = useContext(Eip3643Context);

  useEffect(() => {
    let unsub: WatchContractEventReturnType | null = null;
    tokenSelected &&
      readTokenIdentityRegistry({ args: [] }, tokenSelected.address).then(
        (res) => {
          setRegisteredIdentities([]);
          unsub = watchIdentityRegistryIdentityRegisteredEvent(
            {
              onLogs: (data) => {
                setRegisteredIdentities((prev: any) => {
                  return [
                    ...prev,
                    ...data
                      .map((item: any) => item.args[0])
                      .filter((item) => !prev.includes(item)),
                  ];
                });
              },
            },
            res[0] as `0x${string}`,
          );
        },
      );
    return () => {
      unsub && unsub();
    };
  }, [tokenSelected]);

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
          {tokens.map((item) => (
            <option key={item.address} value={item.address}>
              {item.name} [{item.address}]
            </option>
          ))}
        </Select>
      </Stack>
      {tokenSelected && (
        <>
          <Divider my={10} />
          <TransferToken
            tokenSelected={tokenSelected}
            registeredIdentities={registeredIdentities}
          />
        </>
      )}
    </>
  );
}
