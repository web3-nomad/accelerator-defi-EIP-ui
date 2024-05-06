import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  NumberInput,
  NumberInputField,
  VStack,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useWalletInterface } from "@/services/wallets/useWalletInterface";
import { useTransferToken } from "@/hooks/mutations/useTransferToken";
import { useReadBalanceOf } from "@/hooks/useReadBalanceOf";
import { TransferTokenFromRequest } from "@/types/types";

export default function TransferToken() {
  const { accountId, walletName, walletInterface } = useWalletInterface();

  const {
    error,
    isPending,
    data: transferResult,
    mutateAsync: transferToken,
  } = useTransferToken();

  const form = useFormik({
    initialValues: {
      tokenAddress: "",
      fromAddress: "",
      toAddress: "",
      amount: 0,
    },
    onSubmit: ({ tokenAddress, fromAddress, toAddress, amount }) => {
      const amountConverted = BigInt(amount);

      transferToken({
        tokenAddress,
        fromAddress,
        toAddress,
        amount: amountConverted,
      } as TransferTokenFromRequest);
    },
  });

  const { data: tokenBalance, error: tokenBalanceError } = useReadBalanceOf(
    form.values.tokenAddress as `0x${string}`,
  );

  return (
    <>
      <Heading size={"sm"}>Transfer token</Heading>
      <form onSubmit={form.handleSubmit}>
        <VStack gap={2} alignItems="flex-start">
          <FormControl isRequired>
            <FormLabel>Specify deployed token address</FormLabel>
            <Input
              name="tokenAddress"
              variant="outline"
              value={form.values.tokenAddress}
              onChange={form.handleChange}
            />
            <FormHelperText>
              Balance of token: {`${tokenBalance}`}
            </FormHelperText>
            {tokenBalanceError && (
              <FormHelperText color={"red"}>
                Error fetching balance of token: {form.values.tokenAddress}
              </FormHelperText>
            )}
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Send from address</FormLabel>
            <Input
              name="fromAddress"
              variant="outline"
              value={form.values.fromAddress}
              onChange={form.handleChange}
            />
            <FormHelperText>
              <b>Connected wallet address:</b> {accountId || "Not connected"}
            </FormHelperText>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Send to address</FormLabel>
            <Input
              name="toAddress"
              variant="outline"
              value={form.values.toAddress}
              onChange={form.handleChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Tokens amount to transfer</FormLabel>
            <NumberInput
              name="amount"
              variant="outline"
              value={form.values.amount}
              clampValueOnBlur={false}
              onChange={(val) => form.setFieldValue("amount", val)}
            >
              <NumberInputField />
            </NumberInput>
          </FormControl>

          <Button type="submit" isLoading={isPending}>
            Transfer
          </Button>
        </VStack>
      </form>
      {error && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Transfer token error!</AlertTitle>
          <AlertDescription>
            {error.toString()} Potential reasons: - no sender or recipient
            identity present in the identity registry
          </AlertDescription>
        </Alert>
      )}
    </>
  );
}
