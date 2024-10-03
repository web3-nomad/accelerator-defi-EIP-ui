import { Text, Flex } from "@chakra-ui/react";
import { VaultFeesInfo } from "./VaultFeesInfo";

export type VaultInfoBlock =
  | "vaultAddress"
  | "vaultAssetAddress"
  | "vaultShareAddress"
  | "rewardAssets"
  | "totalAssets"
  | "vaultFees";

export const VaultInfoContainer = ({
  blockType,
  blockTitle,
  fees,
  children,
}: {
  blockType: VaultInfoBlock;
  blockTitle: string;
  fees?: {
    vaultFeeReceiver: string;
    vaultFeePercentageFormatted: number;
    vaultFeeTokenAddress: string;
  };
  children?: React.ReactElement;
}) => {
  if (blockType === "vaultFees") {
    return <VaultFeesInfo fees={fees} />;
  }

  return (
    <Flex direction="row" gap="1" justify="space-between">
      <Text fontSize={14} fontWeight="800" width="45%">
        {blockTitle}
      </Text>
      <Text fontSize={14} width="64%">
        {children}
      </Text>
    </Flex>
  );
};
