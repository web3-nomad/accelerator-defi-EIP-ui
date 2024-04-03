import { useWalletInterface } from "@/services/wallets/useWalletInterface";
import { useState } from "react";
import {
  Button,
  Flex,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { AccountId, ContractId } from "@hashgraph/sdk";
import { ContractFunctionParameterBuilder } from "@/services/wallets/contractFunctionParameterBuilder";
import { appConfig } from "@/config";
import { convertAccountIdToSolidityAddress } from "@/services/util/helpers";
import { readErc20BalanceOf } from "../../../services/contracts/wagmiGenActions";

export default function BalanceOfERC20() {
  const { accountId, walletName, walletInterface } = useWalletInterface();
  const [txId, setTxId] = useState("no transaction initiated");
  const [result, setResult] = useState("no transaction initiated");
  const [fungibleTokenEvmAddress, setFungibleTokenEvmAddress] = useState(
    "0x0000000000000000000000000000000000387719",
  );

  return (
    <VStack gap={2} alignItems="flex-start">
      <Heading size={"md"}>
        Balance of fungible TestToken ERC20 CA call
        0x0000000000000000000000000000000000387719 for {accountId}
      </Heading>

      <VStack alignItems="flex-start">
        <label htmlFor="erc20-balance">Token ID</label>
        <Input
          name="erc20-balance"
          value={fungibleTokenEvmAddress}
          onChange={(e) => setFungibleTokenEvmAddress(e.target.value)}
          sx={{
            minWidth: "400px",
          }}
        />
      </VStack>

      <Button
        onClick={async () => {
          setTxId("waiting...");

          const txId = await walletInterface?.executeContractWriteFunction(
            ContractId.fromEvmAddress(0, 0, fungibleTokenEvmAddress),
            "balanceOf",
            new ContractFunctionParameterBuilder().addParam({
              type: "address",
              name: "",
              value: convertAccountIdToSolidityAddress(
                AccountId.fromString(accountId),
              ),
            }),
            appConfig.constants.METAMASK_GAS_LIMIT_TRANSFER_FT,
          );

          //@TODO implement this flow to get readable results to show them to the user
          // in order to read the contract call results, you will need to query the contract call's results form a mirror node using the transaction id
          // after getting the contract call results, use ethers and abi.decode to decode the call_result

          console.log("txId", txId);
          //setTxId(txId as string);
        }}
      >
        Send
      </Button>

      <Button
        onClick={async () => {
          if (walletInterface === null) return null;

          const accountIdSolidity = convertAccountIdToSolidityAddress(
            AccountId.fromString(accountId as string),
          );
          const res = await readErc20BalanceOf({
            args: [accountIdSolidity as "0x${string}"],
          });

          setResult(res.toString());
        }}
      >
        Read [codegen-wagmi]
      </Button>

      <Text>Result is: {result}</Text>
    </VStack>
  );
}
