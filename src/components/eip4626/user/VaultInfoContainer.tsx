import { Text, Flex } from "@chakra-ui/react";
import { VaultInfoBlock } from "./VaultInfo";

const vaultInfoBlockPlaceholders = {
  vaultAddress: "Selected vault address",
  vaultAssetAddress: "Selected vault asset address",
  vaultShareAddress: "Selected vault share address",
  rewardAssets: "Selected reward address",
  totalAssets: "Total assets",
  vaultFees: "Vault fees",
};

export const VaultInfoContainer = ({
  blockType,
  fees,
  children,
}: {
  blockType: VaultInfoBlock;
  fees?: {
    vaultFeeReceiver: string;
    vaultFeePercentageFormatted: number;
    vaultFeeTokenAddress: string;
  };
  children?: React.ReactElement;
}) => {
  if (blockType === "vaultFees" && fees) {
    return (
      <>
        {fees.vaultFeeReceiver && (
          <Flex direction="row" gap="1" justify="space-between">
            <Text fontSize={14} fontWeight="800" width="45%">
              Vault fee receiver address
            </Text>
            <Text fontSize={14} width="64%">
              {fees.vaultFeeReceiver}
            </Text>
          </Flex>
        )}
        {fees.vaultFeePercentageFormatted && (
          <Flex direction="row" gap="1" justify="space-between">
            <Text fontSize={14} fontWeight="800" width="45%">
              Vault fee percentage
            </Text>
            <Text fontSize={14} width="64%">
              {fees.vaultFeePercentageFormatted}%
            </Text>
          </Flex>
        )}
        {fees.vaultFeeTokenAddress && (
          <Flex direction="row" gap="1" justify="space-between">
            <Text fontSize={14} fontWeight="800" width="45%">
              Vault fee token address
            </Text>
            <Text fontSize={14} width="64%">
              {fees.vaultFeeTokenAddress}
            </Text>
          </Flex>
        )}
      </>
    );
  }

  return (
    <Flex direction="row" gap="1" justify="space-between">
      <Text fontSize={14} fontWeight="800" width="45%">
        {vaultInfoBlockPlaceholders[blockType]}
      </Text>
      <Text fontSize={14} width="64%">
        {children}
      </Text>
    </Flex>
  );
};
