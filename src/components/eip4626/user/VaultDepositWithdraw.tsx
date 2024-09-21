import {
  Box,
  Text,
  Flex,
  Input,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Button,
  Alert,
  AlertDescription,
  AlertIcon,
} from "@chakra-ui/react";
import Icon from "@/components/Icon";
import { useMemo } from "react";
import { useDepositWithdrawFlow } from "@/hooks/useDepositWithdrawFlow";
import { EvmAddress } from "@/types/types";
import { VaultActionResults } from "@/components/eip4626/user/VaultActionResults";

type Props = {
  vaultAddress: EvmAddress;
  toggleError: (isError: boolean) => void;
  error: boolean;
};

export const VaultDepositWithdraw = ({
  vaultAddress,
  toggleError,
  error,
}: Props) => {
  const {
    withdrawForm,
    depositForm,
    depositError,
    approveError,
    depositResult,
    approveResult,
    shareUserBalance,
    vaultAssetUserBalance,
    approveToken,
  } = useDepositWithdrawFlow(vaultAddress);

  const maxAmounts = useMemo(
    () => ({
      deposit: vaultAssetUserBalance
        ? parseFloat(vaultAssetUserBalance?.toString())
        : 0,
      withdraw: shareUserBalance ? parseFloat(shareUserBalance?.toString()) : 0,
    }),
    [shareUserBalance, vaultAssetUserBalance],
  );

  const handleUpdateAmountWithPercent = (
    percentage: number,
    isDeposit = false,
  ) => {
    const calculatedAmount =
      (maxAmounts[isDeposit ? "deposit" : "withdraw"] * percentage) / 100;
    const form = isDeposit ? depositForm : withdrawForm;

    if (calculatedAmount) {
      form.setFieldValue("amount", calculatedAmount);

      if (calculatedAmount <= maxAmounts[isDeposit ? "deposit" : "withdraw"]) {
        toggleError(false);
      } else {
        toggleError(true);
      }
    }
  };

  const _renderInputSection = (isDeposit = false) => {
    const form = isDeposit ? depositForm : withdrawForm;

    return (
      <>
        <form onSubmit={form.handleSubmit}>
          <Flex direction="column" gap="4">
            <Flex direction="row" width="100%" justifyContent="space-between">
              <Text fontWeight="600">
                {isDeposit ? "Deposit" : "Withdraw"} Amount{": "}
                {form.values?.amount}
              </Text>
              <Text fontWeight="600">
                Max: {isDeposit ? maxAmounts.deposit : maxAmounts.withdraw}
              </Text>
            </Flex>
            <Flex width="100%" justifyContent="space-between" gap="1">
              <Input
                value={form.values?.amount}
                onChange={(e) => {
                  const calculatedAmount = parseFloat(e.target.value);

                  if (calculatedAmount || calculatedAmount === 0) {
                    form.setValues(() => ({
                      amount: calculatedAmount,
                    }));

                    if (
                      calculatedAmount <=
                      maxAmounts[isDeposit ? "deposit" : "withdraw"]
                    ) {
                      toggleError(false);
                    } else {
                      toggleError(true);
                    }

                    return;
                  }

                  form.setValues(() => ({
                    amount: 0,
                  }));
                  toggleError(false);
                }}
              />
              <Box
                width="70px"
                style={{
                  borderRadius: 6,
                  borderWidth: 1.4,
                  borderColor: "#000",
                  textAlign: "center",
                  paddingTop: 8,
                }}
              >
                <Icon name="Boat" />
              </Box>
            </Flex>
            <Flex width="100%" justifyContent="space-between" gap="2">
              {[10, 25, 50, 80].map((percentage) => (
                <Button
                  key={percentage}
                  width="100%"
                  onClick={() =>
                    handleUpdateAmountWithPercent(percentage, isDeposit)
                  }
                >
                  <Text fontWeight="600">{percentage}%</Text>
                </Button>
              ))}
            </Flex>
            {error && (
              <Alert status="error">
                <AlertIcon />
                <AlertDescription>
                  Amount should be lowest than maximum amount allowed.
                </AlertDescription>
              </Alert>
            )}
            <Flex direction="row" justifyContent="space-between" gap="5">
              <Button
                width="50%"
                variant="outline"
                isDisabled={error || !form.values.amount}
              >
                confirm
              </Button>
              <Button
                width="50%"
                variant="outline"
                isDisabled={error || !form.values.amount}
                onClick={() => approveToken(form.values.amount, isDeposit)}
                type="button"
              >
                approve
              </Button>
            </Flex>
          </Flex>
        </form>
        <VaultActionResults
          depositResult={depositResult}
          approveResult={approveResult}
          depositError={depositError}
          approveError={approveError}
        />
      </>
    );
  };

  return (
    <Tabs>
      <TabList gap="5">
        <Tab>
          <Text fontWeight="800">Withdraw</Text>
        </Tab>
        <Tab>
          <Text fontWeight="800">Deposit</Text>
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel>{_renderInputSection()}</TabPanel>
        <TabPanel>{_renderInputSection(true)}</TabPanel>
      </TabPanels>
    </Tabs>
  );
};
