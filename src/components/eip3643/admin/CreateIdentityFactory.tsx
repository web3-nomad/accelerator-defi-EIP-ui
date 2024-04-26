import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useCreateIdentityFactory } from "@/hooks/mutations/useCreateIdentityFactory";
import { useContext, useEffect } from "react";
import { watchIdFactoryWalletLinkedEvent } from "@/services/contracts/wagmiGenActions";
import { WatchContractEventReturnType } from "viem";
import { Eip3643Context } from "@/contexts/Eip3643Context";
import { useWalletInterface } from "@/services/wallets/useWalletInterface";
import { convertAccountIdToSolidityAddress } from "@/services/util/helpers";
import { AccountId } from "@hashgraph/sdk";

export default function CreateIdentityFactory() {
  const {
    error,
    data,
    mutateAsync: createIdentityFactory,
  } = useCreateIdentityFactory();

  const { accountId, walletName, walletInterface } = useWalletInterface();

  const currentAccountAddress = convertAccountIdToSolidityAddress(
    AccountId.fromString(accountId as string),
  );

  const { currentIdentityAddress, setCurrentIdentityAddress } =
    useContext(Eip3643Context);

  useEffect(() => {
    const unsub: WatchContractEventReturnType = watchIdFactoryWalletLinkedEvent(
      {
        onLogs: (data: any) => {
          console.log(
            "watchIdFactoryWalletLinkedEvent data length",
            data.length,
          );

          const currentIdentities = data.filter((item: any) => {
            const walletId = item["args"]?.[0];

            return (
              `${walletId}`.toLowerCase() ==
              `${currentAccountAddress}`.toLowerCase()
            );
          });

          //@TODO fix if we can have several identities per wallet
          setCurrentIdentityAddress(currentIdentities[0]?.["args"]?.[0]);
        },
      },
    );

    return () => {
      unsub();
    };
  }, [currentAccountAddress, setCurrentIdentityAddress]);

  return (
    <VStack gap={2} alignItems="flex-start">
      <Heading size={"md"}>Create identity</Heading>
      <Button
        onClick={async () => {
          createIdentityFactory();
        }}
      >
        Create Identity via Factory
      </Button>
      <Text>Current present Identity Address is: {currentIdentityAddress}</Text>
      {error && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Create identity error!</AlertTitle>
          <AlertDescription>{error.toString()}</AlertDescription>
        </Alert>
      )}
      {data && (
        <Alert status="success">
          <AlertIcon />
          <AlertTitle>Create identity success!</AlertTitle>
          <AlertDescription>Address: {data}</AlertDescription>
        </Alert>
      )}
    </VStack>
  );
}
