"use client";
import { Button, Flex, Image, Input, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { AccountId } from "@hashgraph/sdk";

import { useWalletInterface } from "../services/wallets/useWalletInterface";

export default function TestTransactions() {
  const { accountId, walletName, walletInterface } = useWalletInterface();
  const [toAccountId, setToAccountId] = useState("0.0.3678149");
  //  const [toAccountId, setToAccountId] = useState("0x7f7631fA2C3E7b78aD8CEA99E08844440c7626f0");

  const [amount, setAmount] = useState(1);
  const [txId, setTxId] = useState("no transaction initiated");

  return (
    <>
      {accountId ? (
        <>
          <Flex
            bgColor="white"
            w="100%"
            h="100%"
            justifyContent="top"
            alignItems="center"
            flexDirection="column"
          >
            <Text
              fontSize="22px"
              fontWeight="700"
              lineHeight="16px"
              mt="16px"
              mb="16px"
            >
              Operations for {accountId}
            </Text>
            <Stack direction="row" gap={2} alignItems="center">
              <Text>HBAR Transfer</Text>
              <Input
                type="number"
                // label='amount'
                value={amount}
                onChange={(e) => setAmount(parseInt(e.target.value))}
                sx={{
                  maxWidth: "100px",
                }}
              />
              <Text>to</Text>
              <Input
                value={toAccountId}
                onChange={(e) => setToAccountId(e.target.value)}
                // label='account id or evm address'
              />
              <Button
                onClick={async () => {
                  setTxId("waiting...");
                  const txId = await walletInterface.transferHBAR(
                    AccountId.fromString(toAccountId),
                    amount,
                  );
                  console.log("txId", txId);
                  //setTxId(txId as string);
                }}
              >
                Send
              </Button>
            </Stack>
            <Text>{/* txId: { txId } */}</Text>
          </Flex>
        </>
      ) : (
        <>
          <Flex
            bgColor="white"
            w="100%"
            h="100%"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >
            <Text fontSize="22px" fontWeight="700" lineHeight="16px" mb="16px">
              Connect wallet to start operating!
            </Text>
          </Flex>
        </>
      )}
    </>
  );
}
