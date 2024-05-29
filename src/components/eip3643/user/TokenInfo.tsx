import { Text, Divider } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  readTokenBalanceOf,
  readTokenIdentityRegistry,
  readTokenIsFrozen,
} from "@/services/contracts/wagmiGenActions";
import { useWalletInterface } from "@/services/wallets/useWalletInterface";
import { TokenNameItem } from "@/types/types";

export default function TokenInfo({
  tokenSelected,
}: {
  tokenSelected: TokenNameItem | null;
}) {
  const { accountEvm } = useWalletInterface();
  const [isFrozen, setIsFrozen] = useState("");
  const [balance, setBalance] = useState("");
  const [registry, setRegistry] = useState("");

  useEffect(() => {
    if (tokenSelected) {
      setBalance("pending...");
      readTokenBalanceOf(
        { args: [accountEvm as `0x${string}`] },
        tokenSelected.address,
      ).then((res) => setBalance(res.toString()));

      setIsFrozen("pending...");
      readTokenIsFrozen(
        { args: [accountEvm as `0x${string}`] },
        tokenSelected.address,
      ).then((res) => setIsFrozen("" + res));

      setRegistry("pending...");
      readTokenIdentityRegistry({ args: [] }, tokenSelected.address).then(
        (res) => setRegistry(res),
      );
    }
  }, [tokenSelected, accountEvm]);

  return (
    <>
      <Divider my={10} />
      {!tokenSelected && <Text> Token not selected </Text>}
      {tokenSelected && (
        <>
          <Text>
            <b>Your balance:</b> {balance}
          </Text>
          <Text>
            <b>Is Frozen:</b> {isFrozen}
          </Text>
          <Text>
            <b>Identity registry address:</b> {registry}
          </Text>
        </>
      )}
    </>
  );
}
