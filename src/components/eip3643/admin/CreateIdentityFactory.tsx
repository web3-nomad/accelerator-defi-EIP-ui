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
import { useContext, useEffect } from "react";
import { watchIdFactoryWalletLinkedEvent } from "@/services/contracts/wagmiGenActions";
import { Eip3643Context } from "@/contexts/Eip3643Context";
import { useWalletInterface } from "@/services/wallets/useWalletInterface";
import { convertAccountIdToSolidityAddress } from "@/services/util/helpers";
import { AccountId } from "@hashgraph/sdk";

export default function CreateIdentityFactory() {
  const { accountId, walletName, walletInterface } = useWalletInterface();

  const currentAccountAddress = convertAccountIdToSolidityAddress(
    AccountId.fromString(accountId as string),
  );

  const { currentIdentityAddress, setCurrentIdentityAddress } =
    useContext(Eip3643Context);
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
        onLogs: (data: any) => {
          console.log(
            "watchIdFactoryWalletLinkedEvent data length",
            data.length,
          );
          data.map((item: any) => {
            console.log(
              "L15 watchIdFactoryDeployedEvent onlogs data ===",
              item["args"],
            );
          });

          const currentIdentities = data.filter((item: any) => {
            const walletId = item["args"]?.[0];

            return (
              `${walletId}`.toLowerCase() ==
              `${currentAccountAddress}`.toLowerCase()
            );
          });

          //@TODO fix if we can have several identities per wallet
          setCurrentIdentityAddress(currentIdentities[0]?.["args"]?.[1]);
        },
      },
    );
    return () => {
      unsub();
    };
  }, [currentAccountAddress, setCurrentIdentityAddress]);

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
        <Text>
          Current present Identity Address is: {currentIdentityAddress}
        </Text>
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
