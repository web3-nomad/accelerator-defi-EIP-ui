import { Heading, VStack, Text, Select } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { Eip3643Context } from "../../contexts/Eip3643Context";
import {
  readTokenAllowance,
  readTokenBalanceOf,
  readTokenIsFrozen,
} from "../../services/contracts/wagmiGenActions";
import { useWalletInterface } from "../../services/wallets/useWalletInterface";

type TokenNameItem = {
  address: `0x${string}`;
  name: string;
};

export default function TokenInfo({
  selectedToken,
}: {
  selectedToken: TokenNameItem | null;
}) {
  const { accountId, walletName, walletInterface } = useWalletInterface();
  const [isFrozen, setIsFrozen] = useState("");
  const [balance, setBalance] = useState("");

  useEffect(() => {
    if (selectedToken) {
      setBalance("pending...");
      readTokenBalanceOf(
        { args: [accountId as `0x${string}`] },
        selectedToken.address,
      ).then((res) => {
        setBalance(res.toString());
      });

      setIsFrozen("pending...");
      readTokenIsFrozen(
        { args: [accountId as `0x${string}`] },
        selectedToken.address,
      ).then((res) => {
        setIsFrozen("" + res);
      });
    }
  }, [setBalance, selectedToken]);

  return (
    <>
      <Heading size={"sm"}>Current token</Heading>
      {!selectedToken && <Text> Token not selected </Text>}
      {selectedToken && (
        <>
          <Text>Name: {selectedToken.name}</Text>
          <Text>Address: {selectedToken.address}</Text>
          <Text>Your balance: {balance}</Text>
          <Text>Is Frozen: {isFrozen}</Text>
        </>
      )}
    </>
  );
}
