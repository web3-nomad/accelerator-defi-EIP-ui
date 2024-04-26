import { useEffect } from "react";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { WatchContractEventReturnType } from "viem";
import { useFormik } from "formik";
import { useCreateIdentityFactory } from "@/hooks/mutations/useCreateIdentityFactory";
import { watchIdFactoryWalletLinkedEvent } from "@/services/contracts/wagmiGenActions";
import { useWalletInterface } from "@/services/wallets/useWalletInterface";

export default function CreateIdentityFactory() {
  const { accountId } = useWalletInterface();
  const {
    error,
    isPending,
    data,
    mutateAsync: createIdentityFactory,
  } = useCreateIdentityFactory();

  const form = useFormik({
    initialValues: {
      address: accountId?.toString(),
    },
    onSubmit: ({ address }) => {
      console.log("address", address);
      // createIdentityFactory();
    },
  });

  useEffect(() => {
    const unsub: WatchContractEventReturnType = watchIdFactoryWalletLinkedEvent(
      {
        onLogs: (data: any[]) => {
          data.map((item: any) => {
            console.log(
              "L15 watchIdFactoryDeployedEvent onlogs data ===",
              item["args"],
            );
          });
        },
      },
    );
    return () => {
      unsub();
    };
  }, []);

  return (
    <form onSubmit={form.handleSubmit}>
      <VStack gap={2} alignItems="flex-start">
        {/* <Heading size={"md"}>Deploy new token</Heading> */}
        <FormControl isRequired>
          <FormLabel>Identity owner address</FormLabel>
          <Input
            name="address"
            variant="outline"
            value={form.values.address}
            onChange={form.handleChange}
          />
        </FormControl>
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
    </form>
  );
}
