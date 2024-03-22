"use client";
import {
  Button,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { AccountId } from "@hashgraph/sdk";
import { useWalletInterface } from "@/services/wallets/useWalletInterface";

export default function TransferHBAR() {
  const { accountId, walletName, walletInterface } = useWalletInterface();
  const [toAccountId, setToAccountId] = useState("0.0.3678149");
  const [amount, setAmount] = useState(1);
  const [txId, setTxId] = useState("no transaction initiated");

  return (
    <VStack gap={2} alignItems="flex-start">
      <Heading size={"md"}>Transfer of HBAR Token</Heading>

      <VStack alignItems="flex-start">
        <label htmlFor="hbar-amount">Amount of HBAR to transfer</label>
        <Input
          name="hbar-amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(parseInt(e.target.value))}
        />
      </VStack>

      <VStack alignItems="flex-start">
        <label htmlFor="hbar-destination-address">Destination account</label>
        <Input
          name="hbar-destination-address"
          value={toAccountId}
          onChange={(e) => setToAccountId(e.target.value)}
          sx={{
            minWidth: "400px",
          }}
        />
      </VStack>

      <Button
        onClick={async () => {
          setTxId("waiting...");
          const txId = await walletInterface?.transferHBAR(
            AccountId.fromString(toAccountId),
            amount,
          );
          console.log("txId", txId);
          //setTxId(txId as string);
        }}
      >
        Send
      </Button>
    </VStack>
  );
}
