import { useWalletInterface } from "@/services/wallets/useWalletInterface";
import { useState } from "react";
import { Button, Flex, Input, Stack, Text } from "@chakra-ui/react";
import { AccountId, ContractId } from "@hashgraph/sdk";
import { ContractFunctionParameterBuilder } from "@/services/wallets/contractFunctionParameterBuilder";
import { appConfig } from "@/config";
import { convertAccountIdToSolidityAddress } from "@/services/util/helpers";

export default function TestFunctionCall() {
  const { accountId, walletName, walletInterface } = useWalletInterface();
  const [txId, setTxId] = useState("no transaction initiated");
  const [fungibleTokenEvmAddress, setFungibleTokenEvmAddress] = useState(
    "0x0000000000000000000000000000000000387719",
  );

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

            <Stack direction="column" gap={2} alignItems="center">
              <Text>
                Balance of TestToken ERC20 CA call
                0x0000000000000000000000000000000000387719
              </Text>

              <Text>Token ID</Text>
              <Input
                value={fungibleTokenEvmAddress}
                onChange={(e) => setFungibleTokenEvmAddress(e.target.value)}
                // sx={{
                //   maxWidth: "100px",
                // }}
              />
              <Button
                onClick={async () => {
                  setTxId("waiting...");

                  const txId = await walletInterface.executeContractFunction(
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