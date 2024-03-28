import { useWalletInterface } from "@/services/wallets/useWalletInterface";
import { useState } from "react";
import {
  Button,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { AccountId, ContractId } from "@hashgraph/sdk";
import { ContractFunctionParameterBuilder } from "@/services/wallets/contractFunctionParameterBuilder";
import { appConfig } from "@/config";

import { readMeaningOfLifeTheMeaningOfLifeIs } from "@/services/contracts/wagmi-gen-actions";
import { getMeaningOfLife } from "@/services/contracts/MeaningOfLifeContract";
import { getContractCallResultsByTxId } from "@/services/api/requests";

export default function MeaningOfLife() {
  const { accountId, walletName, walletInterface } = useWalletInterface();
  const [txId, setTxId] = useState("no transaction initiated");
  const [result, setResult] = useState("no transaction initiated");

  const toast = useToast();

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

          // await getContractCallResultsByTxId(txId);

          const examplePromise = new Promise((resolve, reject) => {
            setTimeout(async () => {
              await getContractCallResultsByTxId(txId);

              resolve(200);
            }, 5000);
          });
        }}
      >
        Send
      </Button>

      <Button
        onClick={async () => {
          if (walletInterface === null) return null;
          const res = await readMeaningOfLifeTheMeaningOfLifeIs({});
          setResult(res.toString());
        }}
      >
        Read [codegen-wagmi]
      </Button>
      <Text>Result is: {result}</Text>

      <Button
        onClick={async () => {
          if (walletInterface === null) return null;

          const result = await getMeaningOfLife();

          toast({
            title: "Meaning of life is",
            description: `${result}`,
            status: "success",
            isClosable: true,
          });
        }}
      >
        Send [API service]
      </Button>
    </VStack>
  );
}
