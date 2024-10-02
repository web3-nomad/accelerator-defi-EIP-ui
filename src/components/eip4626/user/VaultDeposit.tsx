import {
  Text,
  Flex,
  Input,
  Button,
  Alert,
  AlertDescription,
  AlertIcon,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import Icon from "@/components/Icon";
import { ActionName, TransactionResult } from "@/components/TransactionResult";
import { EvmAddress } from "@/types/types";
import { useState, useMemo } from "react";
import { useVaultProperties } from "@/hooks/useVaultProperties";
import { useWriteHederaVaultApprove } from "@/hooks/eip4626/mutations/useWriteHederaVaultApprove";
import { useWriteHederaVaultDeposit } from "@/hooks/eip4626/mutations/useWriteHederaVaultDeposit";
import { useReadHederaVaultPreviewDeposit } from "@/hooks/eip4626/useReadHederaVaultPreviewDeposit";
import { formatBalance, formatNumberToBigint } from "@/services/util/helpers";

type VaultDepositProps = {
  vaultAddress: EvmAddress;
};

export const VaultDeposit = ({ vaultAddress }: VaultDepositProps) => {
  const queryClient = useQueryClient();

  const {
    data: depositResult,
    mutateAsync: deposit,
    error: depositError,
  } = useWriteHederaVaultDeposit();

  const {
    data: approveResult,
    mutateAsync: approve,
    error: approveError,
  } = useWriteHederaVaultApprove();

  const { vaultAssetUserBalance, vaultAssetAddress, vaultShareAddress } =
    useVaultProperties(vaultAddress);

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

  const approveToken = (amount: number) => {
    const amountConverted = formatNumberToBigint(amount);

    approve({
      tokenAmount: amountConverted,
      tokenAddress: vaultAssetAddress as EvmAddress,
      vaultAddress,
    });
  };

  const handleUpdateAmountWithPercent = (percentage: number | string) => {
    const calculatedAmount =
      typeof percentage === "number"
        ? (maxAmount * percentage) / 100
        : maxAmount;

    if (calculatedAmount) {
      depositForm.setFieldValue("amount", calculatedAmount);

      if (calculatedAmount <= maxAmount) {
        setMaxAmountError(false);
      } else {
        setMaxAmountError(true);
      }
    }
  };

  const maxAmount = useMemo(
    () =>
      vaultAssetUserBalance ? parseFloat(vaultAssetUserBalance?.toString()) : 0,
    [vaultAssetUserBalance],
  );

  const [maxAmountError, setMaxAmountError] = useState(false);

  return (
    <>
      <form onSubmit={depositForm.handleSubmit}>
        <Flex direction="column" gap="4">
          <Flex
            direction="row"
            width="100%"
            pt="2"
            pb="2"
            justifyContent="space-between"
          >
            <Text fontWeight="800" fontSize={14}>
              Deposit Amount{": "}
              {depositForm.values?.amount}
            </Text>
            <Text fontWeight="600" fontSize={14}>
              Max: {maxAmount}
            </Text>
          </Flex>
          <Flex width="100%" justifyContent="space-between" gap="1">
            <Input
              value={depositForm.values?.amount}
              onChange={(e) => {
                const calculatedAmount = parseFloat(e.target.value);

                if (calculatedAmount || calculatedAmount === 0) {
                  depositForm.setValues(() => ({
                    amount: calculatedAmount,
                  }));

                  if (calculatedAmount <= maxAmount) {
                    setMaxAmountError(false);
                  } else {
                    setMaxAmountError(true);
                  }

                  return;
                }

                depositForm.setValues(() => ({
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
              isDisabled={maxAmountError || !depositForm.values.amount}
            >
              confirm
            </Button>
            <Button
              width="50%"
              variant="outline"
              isDisabled={maxAmountError || !depositForm.values.amount}
              onClick={() => approveToken(depositForm.values.amount)}
              type="button"
            >
              approve
            </Button>
          </Flex>
        </Flex>
      </form>

      <TransactionResult
        actionName={ActionName.Deposit}
        transactionResult={depositResult}
        transactionError={depositError}
      />
      <TransactionResult
        actionName={ActionName.Approve}
        transactionResult={approveResult}
        transactionError={approveError}
      />
    </>
  );
};
