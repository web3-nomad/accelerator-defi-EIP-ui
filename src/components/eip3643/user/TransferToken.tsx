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
import { TokenNameItem, TransferTokenFromRequest } from "@/types/types";
import { useAccountId } from "@/hooks/useAccountId";
import { AccountIdResult } from "@/components/AccountIdResult";

export default function TransferToken({
  tokenSelected,
}: {
  tokenSelected: TokenNameItem | null;
}) {
  const { accountEvm } = useWalletInterface();

  const {
    error,
    isPending,
    data: transferResult,
    mutateAsync: transferToken,
  } = useTransferToken();

  const form = useFormik({
    initialValues: {
      toAddress: "",
      amount: 0,
    },
    onSubmit: ({ toAddress, amount }) => {
      const amountConverted = BigInt(amount);

      transferToken({
        tokenAddress: tokenSelected?.address,
        toAddress: (hederaEVMAccount || toAddress) as `0x${string}`,
        amount: amountConverted,
      } as TransferTokenFromRequest);
    },
  });

  const { data: tokenBalance, error: tokenBalanceError } = useReadBalanceOf(
    tokenSelected?.address as `0x${string}`,
  );

  const { hederaAccountIdError, hederaEVMAccount } = useAccountId(
    form.values.toAddress,
  );

  return (
    <>
      <Heading size={"sm"}>Transfer token</Heading>
      <form onSubmit={form.handleSubmit}>
        <VStack gap={2} alignItems="flex-start">
          <FormControl isRequired>
            <FormHelperText>
              Balance of token: {`${tokenBalance}`}
            </FormHelperText>
            {tokenBalanceError && (
              <FormHelperText color={"red"}>
                Error fetching balance of token: {tokenSelected?.address}
              </FormHelperText>
            )}
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Send to address</FormLabel>
            <Input
              name="toAddress"
              variant="outline"
              value={form.values.toAddress}
              onChange={form.handleChange}
            />

            <FormHelperText>
              <b>Connected wallet address:</b> {accountEvm || "Not connected"}
            </FormHelperText>
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

          <Button
            type="submit"
            isLoading={isPending}
            disabled={hederaAccountIdError}
          >
            Transfer
          </Button>
        </VStack>
      </form>
      <AccountIdResult
        error={hederaAccountIdError}
        transformed={hederaEVMAccount}
      />
      {error && (
        <Alert status="error" mt="4">
          <AlertIcon />
          <AlertTitle>Transfer token error!</AlertTitle>
          <AlertDescription>
            {error.toString()}
            Potential reasons: - no sender or recipient identity present in the
            identity registry - sender or recipient does not have KYC NFT
            present
          </AlertDescription>
        </Alert>
      )}
    </>
  );
}
