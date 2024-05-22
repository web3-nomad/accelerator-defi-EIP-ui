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
import { useFormik } from "formik";
import { EvmAddress, VaultInfoProps } from "@/types/types";
import { useReadBalanceOf } from "@/hooks/useReadBalanceOf";
import { useWriteHederaVaultDeposit } from "@/hooks/eip4626/mutations/useWriteHederaVaultDeposit";
import { useReadHederaVaultAsset } from "@/hooks/eip4626/useReadHederaVaultAsset";
import { formatBalance } from "@/services/util/helpers";
import { VAULT_TOKEN_PRECISION_VALUE } from "@/config/constants";
import BigNumber from "bignumber.js";
import { useWriteHederaVaultApprove } from "@/hooks/eip4626/mutations/useWriteHederaVaultApprove";

export function VaultDeposit({ vaultAddress }: VaultInfoProps) {
  const {
    data: depositResult,
    mutateAsync: deposit,
    error: depositError,
    isPending: isDepositPending,
  } = useWriteHederaVaultDeposit();

  const {
    data: approveResult,
    mutateAsync: approve,
    error: approveError,
    isPending: isApprovePending,
  } = useWriteHederaVaultApprove();

  const { data: vaultAssetAddress } = useReadHederaVaultAsset(vaultAddress);

  const form = useFormik({
    initialValues: {
      amount: 0,
    },
    onSubmit: ({ amount }) => {
      const amountConverted = BigInt(
        BigNumber(amount).shiftedBy(VAULT_TOKEN_PRECISION_VALUE).toString(),
      );

      //@TODO show read allowance
      //@TODO do not trigger allowance if it is enough?

      approve(
        {
          tokenAmount: amountConverted,
          tokenAddress: vaultAssetAddress as EvmAddress,
          vaultAddress,
        },
        {
          onSuccess: async () => {
            deposit(amountConverted);
          },
        },
      );
    },
  });

  const { data: vaultAssetUserBalance, error: vaultAssetUserBalanceError } =
    useReadBalanceOf(vaultAssetAddress as EvmAddress);

  const balanceFormatted = formatBalance(vaultAssetUserBalance);

  return (
    <>
      <Heading size={"sm"}>Deposit asset into vault</Heading>

      <form onSubmit={form.handleSubmit}>
        <VStack gap={2} alignItems="flex-start">
          <FormControl isRequired>
            <FormLabel>Amount of asset to deploy</FormLabel>
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
              User balance of vault asset token: {balanceFormatted}
            </FormHelperText>
            {vaultAssetUserBalanceError && (
              <FormHelperText color={"red"}>
                Error fetching balance of vault asset token: {vaultAssetAddress}
              </FormHelperText>
            )}
          </FormControl>
          <Button
            type="submit"
            isLoading={isApprovePending || isDepositPending}
          >
            Deposit
          </Button>
        </VStack>
      </form>

      {approveResult && (
        <Alert status="success">
          <AlertIcon />
          <AlertTitle>Approve success!</AlertTitle>
          <AlertDescription>TxId: {approveResult}</AlertDescription>
        </Alert>
      )}
      {approveError && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Approve token error!</AlertTitle>
          <AlertDescription>{approveError.toString()}</AlertDescription>
        </Alert>
      )}

      {depositResult && (
        <Alert status="success">
          <AlertIcon />
          <AlertTitle>Deposit success!</AlertTitle>
          <AlertDescription>TxId: {depositResult}</AlertDescription>
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
