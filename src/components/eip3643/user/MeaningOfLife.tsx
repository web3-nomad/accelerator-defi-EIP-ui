import { useWalletInterface } from "@/services/wallets/useWalletInterface";
import { useEffect, useState } from "react";
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
import { ContractId } from "@hashgraph/sdk";
import { ContractFunctionParameterBuilder } from "@/services/wallets/contractFunctionParameterBuilder";
import { appConfig } from "@/config";

import {
  meaningOfLifeAbi,
  readMeaningOfLifeTheMeaningOfLifeIs,
} from "@/services/contracts/wagmiGenActions";
import { getMeaningOfLife } from "@/services/contracts/MeaningOfLifeContract";
import { readContractCallResult } from "@/services/contracts/readContractCallResult";
import { useGetTransactionById } from "@/hooks/useGetTransactionById";

export default function MeaningOfLife() {
  const { accountId, walletName, walletInterface } = useWalletInterface();
  const [txId, setTxId] = useState("");
  const [result, setResult] = useState("no transaction initiated");

  const toast = useToast();

  const { data: contractCallResultTx } = useGetTransactionById(txId);

  useEffect(() => {
    if (!contractCallResultTx || !txId) return;

    //@TODO have function names as exported consts too
    const caCallRes = readContractCallResult({
      callResult: contractCallResultTx.call_result,
      functionName: "theMeaningOfLifeIs",
      abi: meaningOfLifeAbi,
    });

    toast({
      title: "Meaning of life is",
      description: `${caCallRes.toString()}`,
      status: "success",
      isClosable: true,
    });

    setResult(caCallRes.toString());
  }, [txId, contractCallResultTx, toast]);

  return (
    <VStack gap={2} alignItems="flex-start">
      <Heading size={"md"}>
        Meaning of life CA call 0x8546fc43a9F2dC6A10a2d3155f653F30B18eD56d
      </Heading>

      <Button
        onClick={async () => {
          const txId = (await walletInterface?.executeContractWriteFunction(
            ContractId.fromEvmAddress(
              0,
              0,
              "0x8546fc43a9F2dC6A10a2d3155f653F30B18eD56d",
            ),
            [],
            "theMeaningOfLifeIs",
            new ContractFunctionParameterBuilder(),
            appConfig.constants.METAMASK_GAS_LIMIT_TRANSFER_FT,
          )) as string;

          console.log("txId", txId);

          if (txId) {
            setTxId(txId);
          }
        }}
      >
        Read [via CA Write]
      </Button>

      <Button
        onClick={async () => {
          if (walletInterface === null) return null;
          const result = await readMeaningOfLifeTheMeaningOfLifeIs({});

          console.log("L79 result ===", result);

          toast({
            title: "Meaning of life is",
            description: `${result}`,
            status: "success",
            isClosable: true,
          });

          setResult(result.toString());
        }}
      >
        Read [codegen-wagmi]
      </Button>

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
        Read [API service]
      </Button>

      <Text>Result is: {result}</Text>
    </VStack>
  );
}
