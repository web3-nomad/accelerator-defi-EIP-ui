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
import { getContractCallResultsByTxId } from "@/services/util/helpers";

import {
  meaningOfLifeAddress,
  readMeaningOfLifeTheMeaningOfLifeIs,
} from "@/services/contracts/wagmi-gen-actions";
import { getMeaningOfLife } from "@/services/contracts/MeaningOfLifeContract";

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

          toast.promise(getContractCallResultsByTxId(txId), {
            success: { title: "Promise resolved", description: "Looks great" },
            error: {
              title: "Promise rejected",
              description: "Something wrong",
            },
            loading: { title: "Promise pending", description: "Please wait" },
          });

          //setTxId(txId as string);
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

          const txId = await getMeaningOfLife(meaningOfLifeAddress);

          console.log("txId", txId);

          // await getContractCallResultsByTxId(txId);

          //setTxId(txId as string);
        }}
      >
        Send [API service]
      </Button>
    </VStack>
  );
}
