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
  VStack,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useCreateIdentityFactory } from "@/hooks/mutations/useCreateIdentityFactory";
import { useContext, useEffect } from "react";
import { Eip3643Context } from "@/contexts/Eip3643Context";
import { useWalletInterface } from "@/services/wallets/useWalletInterface";
import { useAccountId } from "@/hooks/useAccountId";

export default function CreateIdentityFactory() {
  const { accountEvm } = useWalletInterface();

  const {
    currentIdentityAddress,
    setCurrentIdentityAddress,
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
      address: accountEvm,
    },
    onSubmit: ({ address }) => {
      createIdentityFactory({ address: address as `0x${string}` });
    },
  });

  useEffect(() => {
    let isFound = false;
    (identities as any).map((item: any) => {
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
  }, [
    identities,
    form.values.address,
    setCurrentIdentityWallet,
    setCurrentIdentityAddress,
  ]);

  const { hederaAccountIdError } = useAccountId(
    form.setValues,
    form.values,
    "address",
  );

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
          <Button
            isDisabled={!!currentIdentityAddress}
            type="submit"
            isLoading={isPending}
          >
            Create identity {!!currentIdentityAddress && "[Already created]"}
          </Button>
          {hederaAccountIdError && (
            <Alert status="error" mt="4">
              <AlertIcon />
              <AlertTitle>Hedera Account Id conversion error!</AlertTitle>
              <AlertDescription>
                Hedera Account Id detected. But here is an error converting it
                to EVM address.
              </AlertDescription>
            </Alert>
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
              <AlertDescription>TxId: {data}</AlertDescription>
            </Alert>
          )}
        </VStack>
      </form>
    </>
  );
}
