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
import { useWriteHederaVaultWithdraw } from "@/hooks/eip4626/mutations/useWriteHederaVaultWithdraw";
import { useReadBalanceOf } from "@/hooks/useReadBalanceOf";
import { formatBalance } from "@/services/util/helpers";
import BigNumber from "bignumber.js";
import { VAULT_TOKEN_PRECISION_VALUE } from "@/config/constants";
import { useWriteHederaVaultApprove } from "@/hooks/eip4626/mutations/useWriteHederaVaultApprove";
import { QueryKeys } from "@/hooks/types";
import { useQueryClient } from "@tanstack/react-query";

export function VaultWithdraw({ vaultAddress }: VaultInfoProps) {
  const queryClient = useQueryClient();
  const { data: vaultShareAddress } = useReadHederaVaultShare(vaultAddress);
  const { data: shareUserBalance, error: shareUserBalanceError } =
    useReadBalanceOf(vaultShareAddress as EvmAddress);
  const balanceFormatted = formatBalance(shareUserBalance);

  const {
    data: withdrawResult,
    mutateAsync: withdraw,
    error: depositError,
    isPending,
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
    onSubmit: ({ amount }) => {
      //@TODO use token precision from vault info
      const amountConverted = BigInt(
        BigNumber(amount).shiftedBy(VAULT_TOKEN_PRECISION_VALUE).toString(),
      );

      //@TODO show read allowance
      //@TODO do not trigger allowance if it is enough?

      approve(
        {
          tokenAmount: amountConverted,
          tokenAddress: vaultShareAddress as EvmAddress,
          vaultAddress,
        },
        {
          onSuccess: async () => {
            await withdraw(amountConverted);

            queryClient.invalidateQueries({
              queryKey: [QueryKeys.ReadBalanceOf],
            });
          },
        },
      );
    },
  });

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
              User balance of vault share token: {`${balanceFormatted}`}
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
