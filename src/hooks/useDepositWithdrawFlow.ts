import { useWriteHederaVaultApprove } from "@/hooks/eip4626/mutations/useWriteHederaVaultApprove";
import { useWriteHederaVaultDeposit } from "@/hooks/eip4626/mutations/useWriteHederaVaultDeposit";
import { useWriteHederaVaultWithdraw } from "@/hooks/eip4626/mutations/useWriteHederaVaultWithdraw";
import { useReadHederaVaultAsset } from "@/hooks/eip4626/useReadHederaVaultAsset";
import { useReadHederaVaultShare } from "@/hooks/eip4626/useReadHederaVaultShare";
import { useReadHederaVaultUserContribution } from "@/hooks/eip4626/useReadHederaVaultUserContribution";
import { useReadBalanceOf } from "@/hooks/useReadBalanceOf";
import { formatBalance, formatNumberToBigint } from "@/services/util/helpers";
import { EvmAddress } from "@/types/types";
import { readTokenSymbol } from "@/services/contracts/wagmiGenActions";
import { useReadHederaVaultPreviewDeposit } from "./eip4626/useReadHederaVaultPreviewDeposit";
import { useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useEffect, useState } from "react";

export const useDepositWithdrawFlow = (vaultAddress: EvmAddress) => {
  const queryClient = useQueryClient();
  const [vaultAssetTokenSymbol, _set] = useState<string>();

  const { data: vaultAssetAddress, error } =
    useReadHederaVaultAsset(vaultAddress);
  const { data: vaultAssetUserBalance } = useReadBalanceOf(
    vaultAssetAddress as EvmAddress,
  );
  console.log("vaultAssetAddress:", vaultAssetAddress, error);

  const { data: vaultShareAddress } = useReadHederaVaultShare(vaultAddress);
  const { data: shareUserBalance } = useReadBalanceOf(
    vaultShareAddress as EvmAddress,
  );
  const { data: userContribution } =
    useReadHederaVaultUserContribution(vaultAddress);
  const vaultBalanceFormatted = formatBalance(vaultAssetUserBalance);

  const {
    data: withdrawResult,
    mutateAsync: withdraw,
    error: withdrawError,
    isPending: isWithdrawPending,
  } = useWriteHederaVaultWithdraw();

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

  const withdrawForm = useFormik({
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

  const depositForm = useFormik({
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

  const { data: previewDepositData } = useReadHederaVaultPreviewDeposit(
    vaultAddress,
    depositForm.values.amount,
  );

  const previewDepositDataFormatted = formatBalance(
    previewDepositData?.toString(),
  );

  const approveToken = (amount: number, isDeposit = false) => {
    const amountConverted = formatNumberToBigint(amount);

    approve({
      tokenAmount: amountConverted,
      tokenAddress: (isDeposit
        ? vaultAssetAddress
        : vaultShareAddress) as EvmAddress,
      vaultAddress,
    });
  };

  useEffect(() => {
    if (!!vaultAssetAddress) {
      readTokenSymbol({}, vaultAssetAddress).then((res) => {
        _set(res[0]);
      });
    }
  }, [vaultAssetAddress]);

  return {
    approveToken,
    withdrawForm,
    depositForm,
    shareUserBalance,
    userContribution,
    vaultBalanceFormatted,
    vaultShareAddress,
    vaultAssetUserBalance,
    previewDepositDataFormatted,
    withdrawResult,
    depositResult,
    approveResult,
    depositError,
    approveError,
    withdrawError,
    isWithdrawPending,
    isDepositPending,
    isApprovePending,
  };
};
