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
import {
  useWriteErc20Transfer,
  UseWriteErc20TransferParameters,
} from "@/hooks/useWriteErc20Transfer";
import { convertAccountIdToSolidityAddress } from "@/services/util/helpers";
import { useReadErc20BalanceOf } from "@/hooks/useReadErc20BalanceOf";

export default function TransferFungibleToken() {
  const { accountId, walletName, walletInterface } = useWalletInterface();
  const [toAccountId, setToAccountId] = useState("");

  const [amount, setAmount] = useState(1);
  const [txId, setTxId] = useState("no transaction initiated");
  const [fungibleTokenId, setFungibleTokenId] = useState("");

  const { data: readErc20BalanceOfResult } = useReadErc20BalanceOf(
    accountId as string,
  );

  const { data: transferResult, mutateAsync: transferToken } =
    useWriteErc20Transfer();

  //@TODO need to call "associate token" for the value to show up in destination MM after transfer?

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
        <label htmlFor="fungible-token-address">
          Fungible Token ID (HEDERA ADDR 0.0.xxx)
        </label>
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
          Destination account address (HEDERA ADDR 0.0.xxx)
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
      <Button
        onClick={async () => {
          const transferParams: UseWriteErc20TransferParameters = {
            to: convertAccountIdToSolidityAddress(
              AccountId.fromString(toAccountId),
            ),
            amount: BigInt(amount),
          };

          transferToken(transferParams);
        }}
      >
        Send [codegen-wagmi]
      </Button>
      <Text>CALL RESULT: {transferResult}</Text>

      <Heading size={"md"}>
        Balance of fungible TestToken ERC20 CA call
        0x0000000000000000000000000000000000387719 for {accountId}
      </Heading>
      <Text>
        Query auto fetch result is: {readErc20BalanceOfResult?.toString()}
      </Text>
    </VStack>
  );
}
