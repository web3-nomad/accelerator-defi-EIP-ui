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
  HStack,
  NumberInput,
  NumberInputField,
  VStack,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { EvmAddress, VaultInfoProps } from "@/types/types";
import { useReadBalanceOf } from "@/hooks/useReadBalanceOf";
import { useWriteHederaVaultDeposit } from "@/hooks/eip4626/mutations/useWriteHederaVaultDeposit";
import { useReadHederaVaultAsset } from "@/hooks/eip4626/useReadHederaVaultAsset";
import { formatBalance, formatNumberToBigint } from "@/services/util/helpers";
import { useWriteHederaVaultApprove } from "@/hooks/eip4626/mutations/useWriteHederaVaultApprove";
import { useQueryClient } from "@tanstack/react-query";
import { useReadHederaVaultPreviewDeposit } from "@/hooks/eip4626/useReadHederaVaultPreviewDeposit";

export function VaultDeposit({ vaultAddress }: VaultInfoProps) {
  const queryClient = useQueryClient();
  const { data: vaultAssetAddress } = useReadHederaVaultAsset(vaultAddress);
  const { data: vaultAssetUserBalance, error: vaultAssetUserBalanceError } =
    useReadBalanceOf(vaultAssetAddress as EvmAddress);

  //@TODO dynamic decimals
  const balanceFormatted = formatBalance(vaultAssetUserBalance);

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

  const form = useFormik({
    initialValues: {
      amount: 0,
    },
    onSubmit: async ({ amount }) => {
      const amountConverted = formatNumberToBigint(amount);

      //@TODO show read allowance
      //@TODO do not trigger allowance if it is enough?

      await deposit({
        vaultAddress: vaultAddress,
        tokenAmount: amountConverted,
      });

      queryClient.invalidateQueries();
    },
  });

  const approveToken = (amount: number) => {
    const amountConverted = formatNumberToBigint(amount);

    approve({
      tokenAmount: amountConverted,
      tokenAddress: vaultAssetAddress as EvmAddress,
      vaultAddress,
    });
  };

  const { data: previewDepositData } = useReadHederaVaultPreviewDeposit(
    vaultAddress,
    form.values.amount,
  );

  const previewDepositDataFormatted = formatBalance(
    previewDepositData?.toString(),
  );

  return (
    <>
      <Heading size={"sm"}>Deposit asset into vault</Heading>

      <form onSubmit={form.handleSubmit}>
        <VStack gap={2} alignItems="flex-start">
          <FormControl isRequired>
            <FormLabel>Amount of asset to deposit</FormLabel>
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
              User balance of vault asset token amount: {balanceFormatted}
            </FormHelperText>
            <FormHelperText>
              You will receive vault shares token amount:{" "}
              {previewDepositDataFormatted}
            </FormHelperText>
            {vaultAssetUserBalanceError && (
              <FormHelperText color={"red"}>
                Error fetching balance of vault asset token: {vaultAssetAddress}
              </FormHelperText>
            )}
            {vaultAssetUserBalanceError && (
              <FormHelperText
                color={"red"}
              >{`${vaultAssetUserBalanceError}`}</FormHelperText>
            )}
          </FormControl>
          <HStack>
            <Button
              onClick={() => approveToken(form.values.amount)}
              isLoading={isApprovePending}
            >
              Approve
            </Button>
            <Button type="submit" isLoading={isDepositPending}>
              Deposit
            </Button>
          </HStack>
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
