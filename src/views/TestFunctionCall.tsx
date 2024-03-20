import { useWalletInterface } from "@/services/wallets/useWalletInterface";
import { useState } from "react";
import { Button, Flex, Input, Stack, Text } from "@chakra-ui/react";
import { AccountId, ContractId } from "@hashgraph/sdk";
import { ContractFunctionParameterBuilder } from "@/services/wallets/contractFunctionParameterBuilder";
import { appConfig } from "@/config";

export default function TestFunctionCall() {
  const { accountId, walletName, walletInterface } = useWalletInterface();
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
              <Text>
                Meaning of life CA call
                0x8546fc43a9F2dC6A10a2d3155f653F30B18eD56d
              </Text>

              <Button
                onClick={async () => {
                  setTxId("waiting...");

                  const txId = await walletInterface.executeContractFunction(
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
