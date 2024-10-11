import {
  Text,
  Flex,
  Input,
  Button,
  Alert,
  AlertDescription,
  AlertIcon,
} from "@chakra-ui/react";
import Icon from "@/components/Icon";
import { TransactionResult } from "@/components/TransactionResult";
import { EvmAddress, TxActionName } from "@/types/types";
import { useWriteHederaVaultApprove } from "@/hooks/eip4626/mutations/useWriteHederaVaultApprove";
import { useWriteHederaVaultWithdraw } from "@/hooks/eip4626/mutations/useWriteHederaVaultWithdraw";
import { formatBalance, formatNumberToBigint } from "@/services/util/helpers";
import BigNumber from "bignumber.js";
import { useFormik } from "formik";
import { useState, useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useReadHederaVaultShare } from "@/hooks/eip4626/useReadHederaVaultShare";
import { useReadBalanceOf } from "@/hooks/useReadBalanceOf";

type VaultWithdrawProps = {
  vaultAddress: EvmAddress;
};

export function VaultWithdraw({ vaultAddress }: VaultWithdrawProps) {
  const queryClient = useQueryClient();

  const { data: vaultShareAddress } = useReadHederaVaultShare(vaultAddress);
  const { data: shareUserBalance } = useReadBalanceOf(
    vaultShareAddress as EvmAddress,
  );

  const {
    data: withdrawResult,
    mutateAsync: withdraw,
    error: withdrawError,
  } = useWriteHederaVaultWithdraw();

  const {
    data: approveResult,
    mutateAsync: approve,
    error: approveError,
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

  const approveToken = (amount: number) => {
    const amountConverted = formatNumberToBigint(amount);

    approve({
      tokenAmount: amountConverted,
      tokenAddress: vaultShareAddress as EvmAddress,
      vaultAddress,
    });
  };

  const maxAmount = useMemo(
    () => Number(formatBalance(shareUserBalance)),
    [shareUserBalance],
  );

  const handleUpdateAmountWithPercent = (percentage: number) => {
    const calculatedAmount = (maxAmount * percentage) / 100;

    if (calculatedAmount) {
      withdrawForm.setFieldValue("amount", calculatedAmount);

      if (calculatedAmount <= maxAmount) {
        setMaxAmountError(false);
      } else {
        setMaxAmountError(true);
      }
    }
  };

  const handleAmountChange = (e: { target: { value: string } }) => {
    const calculatedAmount = new BigNumber(e.target.value).toNumber();

    if (calculatedAmount || calculatedAmount === 0) {
      withdrawForm.setFieldValue("amount", calculatedAmount);

      if (calculatedAmount <= maxAmount) {
        setMaxAmountError(false);
      } else {
        setMaxAmountError(true);
      }

      return;
    }

    withdrawForm.setFieldValue("amount", 0);
    setMaxAmountError(false);
  };

  const [maxAmountError, setMaxAmountError] = useState(false);

  return (
    <>
      <form onSubmit={withdrawForm.handleSubmit}>
        <Flex direction="column" gap="4">
          <Flex
            direction="row"
            width="100%"
            pt="2"
            pb="2"
            justifyContent="space-between"
          >
            <Text fontWeight="800" fontSize={14}>
              Withdraw Amount{": "}
              {withdrawForm.values?.amount}
            </Text>
            <Text fontWeight="600" fontSize={14}>
              Max: {maxAmount}
            </Text>
          </Flex>
          <Flex width="100%" justifyContent="space-between" gap="1">
            <Input
              value={withdrawForm.values?.amount}
              onChange={handleAmountChange}
            />
            <Flex
              width="70px"
              height="40px"
              borderRadius={6}
              borderWidth={1}
              borderColor="lightGray"
              alignItems="center"
              justifyContent="center"
            >
              <Icon name="Boat" />
            </Flex>
          </Flex>
          <Flex width="100%" justifyContent="space-between" gap="2">
            {[25, 50, 75, 100].map((percentage) => (
              <Button
                key={percentage}
                width="100%"
                onClick={() => handleUpdateAmountWithPercent(percentage)}
              >
                <Text fontWeight="600">
                  {typeof percentage === "number"
                    ? percentage + "%"
                    : percentage}
                </Text>
              </Button>
            ))}
          </Flex>
          {maxAmountError && (
            <Alert status="error">
              <AlertIcon />
              <AlertDescription>Token allowance is too low.</AlertDescription>
            </Alert>
          )}
          <Flex direction="row" justifyContent="space-between" gap="5">
            <Button
              width="50%"
              variant="outline"
              isDisabled={maxAmountError || !withdrawForm.values.amount}
            >
              confirm
            </Button>
            <Button
              width="50%"
              variant="outline"
              isDisabled={maxAmountError || !withdrawForm.values.amount}
              onClick={() => approveToken(withdrawForm.values.amount)}
              type="button"
            >
              approve
            </Button>
          </Flex>
        </Flex>
      </form>

      <TransactionResult
        actionName={TxActionName.Withdraw}
        transactionResult={withdrawResult}
        transactionError={withdrawError}
      />
      <TransactionResult
        actionName={TxActionName.Approve}
        transactionResult={approveResult}
        transactionError={approveError}
      />
    </>
  );
}
