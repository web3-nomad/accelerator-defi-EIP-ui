import {
  Text,
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
import { useEffect, useState } from "react";
import {
  readTokenBalanceOf,
  watchTokenTransferEvent,
} from "@/services/contracts/wagmiGenActions";
import { useWalletInterface } from "@/services/wallets/useWalletInterface";
import { WatchContractEventReturnType } from "@/services/contracts/watchContractEvent";
import { useMintToken } from "@/hooks/mutations/useMintToken";
import { useFormik } from "formik";
import { ethers } from "ethers";
import { useAccountId } from "@/hooks/useAccountId";
import { AccountIdResult } from "@/components/AccountIdResult";

type TokenNameItem = {
  address: `0x${string}`;
  name: string;
};

export default function TokenInfo({
  tokenSelected,
}: {
  tokenSelected: TokenNameItem | null;
}) {
  const { accountEvm } = useWalletInterface();
  const [balance, setBalance] = useState("");

  const { data, mutateAsync: mint, error, isPending } = useMintToken();

  const form = useFormik({
    initialValues: {
      address: accountEvm,
      value: "10",
    },
    onSubmit: ({ address, value }) => {
      tokenSelected &&
        mint({
          address: (hederaEVMAccount || address) as `0x${string}`,
          value,
          token: tokenSelected.address,
        });
    },
  });

  useEffect(() => {
    let unsub: WatchContractEventReturnType | null = null;
    if (tokenSelected) {
      const checkBalance = () => {
        ethers.isAddress(form.values.address)
          ? readTokenBalanceOf(
              { args: [form.values.address as `0x${string}`] },
              tokenSelected.address,
            ).then((res) => setBalance(res.toString()))
          : setBalance("Non valid address");
      };

      unsub = watchTokenTransferEvent(
        {
          onLogs: (data) => {
            checkBalance();
          },
        },
        tokenSelected.address as `0x${string}`,
      );
    }
    return () => {
      unsub && unsub();
    };
  }, [tokenSelected, form.values.address]);

  const { hederaAccountIdError, hederaEVMAccount } = useAccountId(
    form.values,
    "address",
  );

  return (
    <>
      <Divider my={10} />
      {!tokenSelected && <Text> Token not selected </Text>}
      {tokenSelected && (
        <>
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
              <FormControl isRequired>
                <FormLabel>Value</FormLabel>
                <Input
                  name="value"
                  variant="outline"
                  value={form.values.value}
                  onChange={form.handleChange}
                />
              </FormControl>
              <Stack spacing={4} direction="row" align="center">
                <Button type="submit" isLoading={isPending}>
                  Mint
                </Button>
              </Stack>
              <AccountIdResult
                error={hederaAccountIdError}
                transformed={hederaEVMAccount}
              />
              {error && (
                <Alert status="error">
                  <AlertIcon />
                  <AlertTitle>Mint error!</AlertTitle>
                  <AlertDescription>{error.toString()}</AlertDescription>
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
      )}
    </>
  );
}
