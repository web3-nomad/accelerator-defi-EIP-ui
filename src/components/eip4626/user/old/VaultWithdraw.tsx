import { useFormik } from "formik";
import { EvmAddress, VaultInfoProps } from "@/types/types";
import {
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
import { formatBalance, formatNumberToBigint } from "@/services/util/helpers";
import { useWriteHederaVaultApprove } from "@/hooks/eip4626/mutations/useWriteHederaVaultApprove";
import { useQueryClient } from "@tanstack/react-query";
import { useReadHederaVaultUserContribution } from "@/hooks/eip4626/useReadHederaVaultUserContribution";
import { VaultActionResults } from "@/components/eip4626/user/VaultActionResults";

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
      const amountConverted = formatNumberToBigint(amount);

      //@TODO show read allowance
      //@TODO do not trigger allowance if it is enough?

      await withdraw({
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
      tokenAddress: vaultShareAddress as EvmAddress,
      vaultAddress,
    });
  };

  //@TODO call not working for small amounts with decimals
  // const { data: previewWithdrawData } = useReadHederaVaultPreviewWithdraw(
  //   vaultAddress,
  //   form.values.amount,
  // );

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

            {/*<FormHelperText>*/}
            {/*  Amount of vault share token will be burned:{" "}*/}
            {/*  {previewWithdrawData?.toString()}*/}
            {/*</FormHelperText>*/}

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

      <VaultActionResults
        approveError={approveError}
        approveResult={approveResult}
      />
    </>
  );
}
