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
import { AccountId, TokenId } from "@hashgraph/sdk";

import { useWalletInterface } from "@/services/wallets/useWalletInterface";

export default function TransferFungibleToken() {
  const { accountId, walletName, walletInterface } = useWalletInterface();
  const [toAccountId, setToAccountId] = useState("");

  const [amount, setAmount] = useState(1);
  const [txId, setTxId] = useState("no transaction initiated");
  const [fungibleTokenId, setFungibleTokenId] = useState("");

  return (
    <VStack gap={2} alignItems="flex-start">
      <Heading size={"md"}>Transfer of Fungible Token</Heading>

      <VStack alignItems="flex-start">
        <label htmlFor="fungible-amount">
          Amount of Fungible Token to transfer
        </label>
        <Input
          name="fungible-amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(parseInt(e.target.value))}
        />
      </VStack>

      <VStack alignItems="flex-start">
        <label htmlFor="fungible-token-address">Fungible Token ID</label>
        <Input
          name="fungible-token-address"
          value={fungibleTokenId}
          onChange={(e) => setFungibleTokenId(e.target.value)}
          sx={{
            minWidth: "400px",
          }}
        />
      </VStack>

      <VStack alignItems="flex-start">
        <label htmlFor="fungible-destination-address">
          Destination account address
        </label>
        <Input
          name="fungible-destination-address"
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

          const txId = await walletInterface?.transferFungibleToken(
            AccountId.fromString(toAccountId),
            TokenId.fromString(fungibleTokenId),
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
