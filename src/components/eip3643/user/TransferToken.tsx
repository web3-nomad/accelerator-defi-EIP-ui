import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  VStack,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useWalletInterface } from "@/services/wallets/useWalletInterface";
import { useTransferToken } from "@/hooks/mutations/useTransferToken";
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
      // amount: BigInt(0),
      amount: 0,
    },
    onSubmit: ({ tokenAddress, fromAddress, toAddress, amount }) => {
      console.log("L32 onSubmit tokenAddress===", tokenAddress);
      console.log("L32 onSubmit fromAddress===", fromAddress);
      console.log("L32 onSubmit toAddress===", toAddress);
      console.log("L32 onSubmit amount===", amount);
      console.log("L32 onSubmit amount BIGINT===", BigInt(amount));

      const amountConverted = BigInt(amount);

      //@TODO Uncaught (in promise) Transfer not possible
      // what do i need to transfer? which requirements are not met?

      transferToken({
        tokenAddress,
        fromAddress,
        toAddress,
        amount: amountConverted,
      });
    },
  });

  return (
    <>
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
              //@TODO do i need onchange why cant write directly?
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
    </>
  );
}
