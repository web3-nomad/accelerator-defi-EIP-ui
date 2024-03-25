import { useWalletInterface } from "@/services/wallets/useWalletInterface";
import { useState } from "react";
import {
  Button,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { AccountId, ContractId } from "@hashgraph/sdk";
import { ContractFunctionParameterBuilder } from "@/services/wallets/contractFunctionParameterBuilder";
import { appConfig } from "@/config";

export default function MeaningOfLife() {
  const { accountId, walletName, walletInterface } = useWalletInterface();
  const [txId, setTxId] = useState("no transaction initiated");

  return (
    <VStack gap={2} alignItems="flex-start">
      <Heading size={"md"}>
        Meaning of life CA call 0x8546fc43a9F2dC6A10a2d3155f653F30B18eD56d
      </Heading>

      <Button
        onClick={async () => {
          setTxId("waiting...");

          const txId = await walletInterface?.executeContractWriteFunction(
            ContractId.fromEvmAddress(
              0,
              0,
              "0x8546fc43a9F2dC6A10a2d3155f653F30B18eD56d",
            ),
            "theMeaningOfLifeIs",
            new ContractFunctionParameterBuilder(),
            appConfig.constants.METAMASK_GAS_LIMIT_TRANSFER_FT,
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
