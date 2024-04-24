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
import { useEffect } from "react";
import { watchIdFactoryWalletLinkedEvent } from "@/services/contracts/wagmiGenActions";
import { WatchContractEventReturnType } from "viem";

export default function CreateIdentityFactory() {
  const {
    error,
    data,
    mutateAsync: createIdentityFactory,
  } = useCreateIdentityFactory();
  //@TODO add on error toast

  useEffect(() => {
    //@TODO watch for another event? like ca deploy?
    // const unsub: WatchContractEventReturnType = watchIdFactoryDeployedEvent({
    //   onLogs: (data) => {
    //     console.log("L15 watchIdFactoryDeployedEvent onlogs data ===", data);
    //   },
    // });

    const unsub: WatchContractEventReturnType = watchIdFactoryWalletLinkedEvent(
      {
        onLogs: (data) => {
          console.log("L15 watchIdFactoryDeployedEvent onlogs data ===", data);
        },
      },
    );

    return () => {
      unsub();
    };
  }, []);

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
