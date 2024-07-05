import {
  Heading,
  Divider,
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  FormControl,
  FormLabel,
  Input,
  Stack,
  VStack,
  FormHelperText,
} from "@chakra-ui/react";
import { useWalletInterface } from "@/services/wallets/useWalletInterface";
import { useMintNFT } from "@/hooks/mutations/useMintNFT";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { readHederaNftBalanceOf } from "@/services/contracts/wagmiGenActions";
import { useAccountId } from "@/hooks/useAccountId";

export default function MintNFT() {
  const { accountEvm } = useWalletInterface();
  const { data, mutateAsync: mint, error, isPending } = useMintNFT();
  const [balance, setBalance] = useState("");

  const form = useFormik({
    initialValues: {
      address: accountEvm,
    },
    onSubmit: ({ address }) => {
      mint({
        address: address as `0x${string}`,
      });
    },
  });

  useEffect(() => {
    ethers.isAddress(form.values.address)
      ? readHederaNftBalanceOf({
          args: [form.values.address as `0x${string}`],
        }).then((res) => setBalance(res.toString()))
      : setBalance("Non valid address");
  }, [form.values.address, data]);

  const { hederaAccountIdError } = useAccountId(
    form.setValues,
    form.values,
    "address",
  );

  return (
    <>
      <Divider my={10} />
      <Heading size={"md"}>Mint NFT</Heading>
      <form onSubmit={form.handleSubmit}>
        <VStack gap={2} alignItems="flex-start">
          <FormControl isRequired>
            <FormLabel>Address</FormLabel>
            <Input
              name="address"
              variant="outline"
              value={form.values.address}
              onChange={form.handleChange}
            />
            <FormHelperText>
              <b>Balance of address: </b> {balance}
            </FormHelperText>
          </FormControl>
          <Stack spacing={4} direction="row" align="center">
            <Button type="submit" isLoading={isPending}>
              Mint
            </Button>
          </Stack>
          {error && (
            <Alert status="error">
              <AlertIcon />
              <AlertTitle>Mint error!</AlertTitle>
              <AlertDescription>{error.toString()}</AlertDescription>
            </Alert>
          )}
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
          {data && (
            <Alert status="success">
              <AlertIcon />
              <AlertTitle>Mint success!</AlertTitle>
              <AlertDescription>TxId: {data}</AlertDescription>
            </Alert>
          )}
        </VStack>
      </form>
    </>
  );
}
