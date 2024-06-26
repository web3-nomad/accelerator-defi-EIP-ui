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
  HStack,
  NumberInput,
  NumberInputField,
  VStack,
} from "@chakra-ui/react";
import { useReadHederaVaultShare } from "@/hooks/eip4626/useReadHederaVaultShare";
import { useWriteHederaVaultWithdraw } from "@/hooks/eip4626/mutations/useWriteHederaVaultWithdraw";
import { useReadBalanceOf } from "@/hooks/useReadBalanceOf";
import { formatBalance } from "@/services/util/helpers";
import BigNumber from "bignumber.js";
import { VAULT_TOKEN_PRECISION_VALUE } from "@/config/constants";
import { useWriteHederaVaultApprove } from "@/hooks/eip4626/mutations/useWriteHederaVaultApprove";
import { QueryKeys } from "@/hooks/types";
import { useQueryClient } from "@tanstack/react-query";
import { useReadHederaVaultPreviewWithdraw } from "@/hooks/eip4626/useReadHederaVaultPreviewWithdraw";
import { useReadHederaVaultUserContribution } from "@/hooks/eip4626/useReadHederaVaultUserContribution";

export function VaultWithdraw({ vaultAddress }: VaultInfoProps) {
  const queryClient = useQueryClient();
  const { data: vaultShareAddress } = useReadHederaVaultShare(vaultAddress);
  const { data: shareUserBalance, error: shareUserBalanceError } =
    useReadBalanceOf(vaultShareAddress as EvmAddress);
  const balanceFormatted = formatBalance(shareUserBalance);

  const {
    data: withdrawResult,
    mutateAsync: withdraw,
    error: withdrawError,
    isPending: isWithdrawPending,
  } = useWriteHederaVaultWithdraw();

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
      //@TODO use token precision from vault info
      const amountConverted = BigInt(
        BigNumber(amount).shiftedBy(VAULT_TOKEN_PRECISION_VALUE).toString(),
      );

      //@TODO show read allowance
      //@TODO do not trigger allowance if it is enough?

      await withdraw({
        vaultAddress: vaultAddress,
        tokenAmount: amountConverted,
      });

      queryClient.invalidateQueries({
        queryKey: [QueryKeys.ReadBalanceOf],
      });
    },
  });

  const approveToken = (amount: number) => {
    const amountConverted = BigInt(
      BigNumber(amount).shiftedBy(VAULT_TOKEN_PRECISION_VALUE).toString(),
    );

    approve({
      tokenAmount: amountConverted,
      tokenAddress: vaultShareAddress as EvmAddress,
      vaultAddress,
    });
  };

  const { data: previewWithdrawData } = useReadHederaVaultPreviewWithdraw(
    vaultAddress,
    form.values.amount,
  );

  const { data: userContribution } =
    useReadHederaVaultUserContribution(vaultAddress);

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
              User asset token contribution to the vault:{" "}
              {userContribution ? `${formatBalance(userContribution[0])}` : 0}
            </FormHelperText>
            <FormHelperText>
              User balance of vault share token: {`${balanceFormatted}`}
            </FormHelperText>

            <FormHelperText>
              Amount of vault share token will be burned:{" "}
              {previewWithdrawData?.toString()}
            </FormHelperText>

            {shareUserBalanceError && (
              <FormHelperText color={"red"}>
                Error fetching balance of vault share token: {vaultShareAddress}
              </FormHelperText>
            )}
            {shareUserBalanceError && (
              <FormHelperText
                color={"red"}
              >{`${shareUserBalanceError}`}</FormHelperText>
            )}
          </FormControl>
          <HStack>
            <Button
              onClick={() => approveToken(form.values.amount)}
              isLoading={isApprovePending}
            >
              Approve
            </Button>
            <Button type="submit" isLoading={isWithdrawPending}>
              Withdraw
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

      {withdrawResult && (
        <Alert status="success">
          <AlertIcon />
          <AlertTitle>Withdraw success!</AlertTitle>
          <AlertDescription>TxId: {withdrawResult}</AlertDescription>
        </Alert>
      )}
      {withdrawError && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Withdraw token error!</AlertTitle>
          <AlertDescription>{withdrawError.toString()}</AlertDescription>
        </Alert>
      )}
    </>
  );
}
