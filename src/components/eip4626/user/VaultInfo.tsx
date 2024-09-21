import { Divider, Text, Flex, Heading } from "@chakra-ui/react";
import { VaultInfoProps } from "@/types/types";
import { useReadHederaVaultAsset } from "@/hooks/eip4626/useReadHederaVaultAsset";
import { useReadHederaVaultTotalAssets } from "@/hooks/eip4626/useReadHederaVaultTotalAssets";
import { useReadHederaVaultGetRewardTokens } from "@/hooks/eip4626/useReadHederaVaultGetRewardTokens";
import { useReadHederaVaultShare } from "@/hooks/eip4626/useReadHederaVaultShare";
import { formatBalance } from "@/services/util/helpers";
import { useReadHederaVaultFeeConfig } from "@/hooks/eip4626/useReadHederaVaultFeeConfig";

const vaultInfoBlocks = [
  "vaultAddress",
  "vaultAssetAddress",
  "vaultShareAddress",
  "rewardAssets",
  "totalAssets",
  "vaultFees",
] as const;

type VaultInfoBlock =
  | "vaultAddress"
  | "vaultAssetAddress"
  | "vaultShareAddress"
  | "rewardAssets"
  | "totalAssets"
  | "vaultFees";

const vaultInfoBlockPlaceholders = {
  vaultAddress: "Selected vault address",
  vaultAssetAddress: "Selected vault asset address",
  vaultShareAddress: "Selected vault share address",
  rewardAssets: "Selected reward address",
  totalAssets: "Total assets",
  vaultFees: "Vault fees",
};

export function VaultInfo({ vaultAddress }: VaultInfoProps) {
  const { data: vaultAssetAddress } = useReadHederaVaultAsset(vaultAddress);
  const { data: vaultAssetTotalAssets } =
    useReadHederaVaultTotalAssets(vaultAddress);
  const { data: rewardAssets } =
    useReadHederaVaultGetRewardTokens(vaultAddress);
  const { data: vaultShareAddress } = useReadHederaVaultShare(vaultAddress);
  const { data: vaultFeeConfig } = useReadHederaVaultFeeConfig(vaultAddress);

  let vaultFeeReceiver: string = "";
  let vaultFeeTokenAddress: string = "";
  let vaultFeePercentage: string = "";
  let vaultFeePercentageFormatted: number;

  if (vaultFeeConfig) {
    vaultFeeReceiver = vaultFeeConfig[0]?.toString();
    vaultFeeTokenAddress = vaultFeeConfig[1]?.toString();
    vaultFeePercentage = vaultFeeConfig[2]?.toString();

    if (vaultFeePercentage) {
      vaultFeePercentageFormatted = Number(vaultFeePercentage) / 100;
    }
  }

  const renderInfoBlock = (blockKey: VaultInfoBlock) => {
    let _value;

    if (blockKey === "vaultAddress") {
      _value = vaultAddress;
    } else if (blockKey === "rewardAssets") {
      _value = (
        <>{rewardAssets?.map((asset) => <Text key={asset}>{asset}</Text>)}</>
      );
    } else if (blockKey === "totalAssets") {
      _value = formatBalance(vaultAssetTotalAssets?.toString());
    } else if (blockKey === "vaultAssetAddress") {
      _value = vaultAssetAddress;
    } else if (blockKey === "vaultShareAddress") {
      _value = vaultShareAddress;
    } else if (blockKey === "vaultFees") {
      _value = (
        <>
          {vaultFeeReceiver && (
            <Text>Vault fee receiver address: {vaultFeeReceiver}</Text>
          )}
          {vaultFeeTokenAddress && (
            <Text>Vault fee token address: {vaultFeeTokenAddress}</Text>
          )}
          {vaultFeePercentageFormatted && (
            <Text>Vault fee percentage: {vaultFeePercentageFormatted}%</Text>
          )}
        </>
      );
    }

    if (blockKey === "vaultFees") {
      return (
        <>
          {vaultFeeReceiver && (
            <Flex direction="row" gap="1" justify="space-between">
              <Text fontSize={14} fontWeight="800" width="45%">
                Vault fee receiver address
              </Text>
              <Text fontSize={14} width="64%">
                {vaultFeeReceiver}
              </Text>
            </Flex>
          )}
          {vaultFeePercentageFormatted && (
            <Flex direction="row" gap="1" justify="space-between">
              <Text fontSize={14} fontWeight="800" width="45%">
                Vault fee percentage
              </Text>
              <Text fontSize={14} width="64%">
                {vaultFeePercentageFormatted}%
              </Text>
            </Flex>
          )}
          {vaultFeeTokenAddress && (
            <Flex direction="row" gap="1" justify="space-between">
              <Text fontSize={14} fontWeight="800" width="45%">
                Vault fee token address
              </Text>
              <Text fontSize={14} width="64%">
                {vaultFeeTokenAddress}
              </Text>
            </Flex>
          )}
        </>
      );
    }

    return (
      <Flex direction="row" gap="1" justify="space-between">
        <Text fontSize={14} fontWeight="800" width="45%">
          {vaultInfoBlockPlaceholders[blockKey]}
        </Text>
        <Text fontSize={14} width="64%">
          {_value}
        </Text>
      </Flex>
    );
  };

  return (
    <Flex direction="column" gap="2" pt="3">
      <Heading fontWeight="800" size="md">
        Vault general info/stats
      </Heading>
      <Divider my={2} />
      {vaultInfoBlocks.map((blockKey) => renderInfoBlock(blockKey))}
    </Flex>
  );
}
