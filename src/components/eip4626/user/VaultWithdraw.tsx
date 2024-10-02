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
import { ActionName, TransactionResult } from "@/components/TransactionResult";
import { EvmAddress } from "@/types/types";
import { useWriteHederaVaultApprove } from "@/hooks/eip4626/mutations/useWriteHederaVaultApprove";
import { useWriteHederaVaultWithdraw } from "@/hooks/eip4626/mutations/useWriteHederaVaultWithdraw";
import { useVaultProperties } from "@/hooks/useVaultProperties";
import { formatNumberToBigint } from "@/services/util/helpers";
import { useFormik } from "formik";
import { useState, useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";

type VaultWithdrawProps = {
  vaultAddress: EvmAddress;
};

export const VaultWithdraw = ({ vaultAddress }: VaultWithdrawProps) => {
  const queryClient = useQueryClient();
  const { shareUserBalance, vaultShareAddress, vaultAssetAddress } =
    useVaultProperties(vaultAddress);

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

  const handleUpdateAmountWithPercent = (percentage: number | string) => {
    const calculatedAmount =
      typeof percentage === "number"
        ? (maxAmount * percentage) / 100
        : maxAmount;

    if (calculatedAmount) {
      withdrawForm.setFieldValue("amount", calculatedAmount);

      if (calculatedAmount <= maxAmount) {
        setMaxAmountError(false);
      } else {
        setMaxAmountError(true);
      }
    }
  };

  const maxAmount = useMemo(
    () => (shareUserBalance ? parseFloat(shareUserBalance?.toString()) : 0),
    [shareUserBalance],
  );

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
              onChange={(e) => {
                const calculatedAmount = parseFloat(e.target.value);

                if (calculatedAmount || calculatedAmount === 0) {
                  withdrawForm.setValues(() => ({
                    amount: calculatedAmount,
                  }));

                  if (calculatedAmount <= maxAmount) {
                    setMaxAmountError(false);
                  } else {
                    setMaxAmountError(true);
                  }

                  return;
                }

                withdrawForm.setValues(() => ({
                  amount: 0,
                }));
                setMaxAmountError(false);
              }}
            />
            <Flex
              width="70px"
              height="40px"
              borderRadius={6}
              borderWidth={1.3}
              borderColor="#000"
              alignItems="center"
              justifyContent="center"
            >
              <Icon name="Boat" />
            </Flex>
          </Flex>
          <Flex width="100%" justifyContent="space-between" gap="2">
            {[25, 50, 75, "max"].map((percentage) => (
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
        actionName={ActionName.Withdraw}
        transactionResult={withdrawResult}
        transactionError={withdrawError}
      />
      <TransactionResult
        actionName={ActionName.Approve}
        transactionResult={approveResult}
        transactionError={approveError}
      />
    </>
  );
};
