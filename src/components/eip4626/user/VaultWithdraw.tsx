import { useFormik } from "formik";
import { EvmAddress, VaultInfoProps } from "@/types/types";
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
  NumberInput,
  NumberInputField,
  VStack,
} from "@chakra-ui/react";
import { useReadHederaVaultShare } from "@/hooks/eip4626/useReadHederaVaultShare";
import { useReadHederaVaultBalanceOf } from "@/hooks/eip4626/useReadHederaVaultBalanceOf";
import { useWriteHederaVaultWithdraw } from "@/hooks/eip4626/mutations/useWriteHederaVaultWithdraw";

export function VaultWithdraw({ vaultAddress }: VaultInfoProps) {
  const {
    data: withdrawResult,
    mutateAsync: withdraw,
    error: depositError,
    isPending,
  } = useWriteHederaVaultWithdraw();

  const form = useFormik({
    initialValues: {
      amount: 0,
    },
    onSubmit: ({ amount }) => {
      const amountConverted = BigInt(amount);
      withdraw(amountConverted);
    },
  });

  const { data: vaultShareAddress } = useReadHederaVaultShare(vaultAddress);

  const { data: vaultShareUserBalance, error: vaultAssetUserBalanceError } =
    useReadHederaVaultBalanceOf(vaultAddress as EvmAddress);

  return (
    <>
      <Heading size={"sm"}>Withdraw asset from vault</Heading>

      <form onSubmit={form.handleSubmit}>
        <VStack gap={2} alignItems="flex-start">
          <FormControl isRequired>
            <FormLabel>Amount of asset to withdraw</FormLabel>
            <NumberInput
              name="amount"
              variant="outline"
              value={form.values.amount}
              clampValueOnBlur={false}
              onChange={(val) => form.setFieldValue("amount", val)}
            >
              <NumberInputField />
            </NumberInput>
            <FormHelperText>
              User balance of vault share token: {`${vaultShareUserBalance}`}
            </FormHelperText>
            {vaultAssetUserBalanceError && (
              <FormHelperText color={"red"}>
                Error fetching balance of vault share token: {vaultShareAddress}
              </FormHelperText>
            )}
          </FormControl>
          <Button type="submit" isLoading={isPending}>
            Withdraw
          </Button>
        </VStack>
      </form>
      {withdrawResult && (
        <Alert status="success">
          <AlertIcon />
          <AlertTitle>Withdraw success!</AlertTitle>
          <AlertDescription>TxId: {withdrawResult}</AlertDescription>
        </Alert>
      )}
      {depositError && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Deposit token error!</AlertTitle>
          <AlertDescription>{depositError.toString()}</AlertDescription>
        </Alert>
      )}
    </>
  );
}
