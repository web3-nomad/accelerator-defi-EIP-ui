import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  FormControl,
  FormHelperText,
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

  const {
    currentIdentityAddress,
    setCurrentIdentityAddress,
    currentIdentityWallet,
    setCurrentIdentityWallet,
    identities,
  } = useContext(Eip3643Context);
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
      createIdentityFactory({ address: address as `0x${string}` });
    },
  });

  useEffect(() => {
    let isFound = false;
    (identities as any).map((item: any) => {
      //@TODO fix if we can have several identities per wallet
      if (
        item["args"]?.[0].toLowerCase() === form.values.address?.toLowerCase()
      ) {
        isFound = true;
        setCurrentIdentityWallet(item?.["args"]?.[0]);
        setCurrentIdentityAddress(item?.["args"]?.[1]);
      }
    });
    if (!isFound) {
      setCurrentIdentityAddress("");
      setCurrentIdentityWallet("");
    }
  }, [accountId, identities, form.values.address]);

  return (
    <>
      <form onSubmit={form.handleSubmit}>
        <VStack gap={2} alignItems="flex-start">
          <FormControl isRequired>
            <FormLabel>Identity wallet address</FormLabel>
            <Input
              name="address"
              variant="outline"
              value={form.values.address}
              onChange={form.handleChange}
            />
            <FormHelperText>
              <b>Current present Identity Address is:</b>{" "}
              {currentIdentityAddress || "Not created yet"}
            </FormHelperText>
          </FormControl>
          {!currentIdentityAddress && (
            <Button type="submit" isLoading={isPending}>
              Create identity
            </Button>
          )}
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
    </>
  );
}
