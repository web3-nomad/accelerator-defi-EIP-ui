"use client";
import { Button, Flex, Image, Input, Stack, Text } from "@chakra-ui/react";
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
              <Text>Fungible Token Transfer</Text>
              <Input
                type="number"
                // label='amount'
                value={amount}
                onChange={(e) => setAmount(parseInt(e.target.value))}
                sx={{
                  maxWidth: "100px",
                }}
              />

              <Text>Token ID</Text>
              <Input
                value={fungibleTokenId}
                onChange={(e) => setFungibleTokenId(e.target.value)}
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