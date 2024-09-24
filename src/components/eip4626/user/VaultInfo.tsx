import { Divider, Text, Flex, Heading } from "@chakra-ui/react";
import { VaultInfoProps } from "@/types/types";
import { useReadHederaVaultAsset } from "@/hooks/eip4626/useReadHederaVaultAsset";
import { useReadHederaVaultTotalAssets } from "@/hooks/eip4626/useReadHederaVaultTotalAssets";
import { useReadHederaVaultGetRewardTokens } from "@/hooks/eip4626/useReadHederaVaultGetRewardTokens";
import { useReadHederaVaultShare } from "@/hooks/eip4626/useReadHederaVaultShare";
import { formatBalance } from "@/services/util/helpers";
import { useReadHederaVaultFeeConfig } from "@/hooks/eip4626/useReadHederaVaultFeeConfig";
import { VaultInfoContainer } from "./VaultInfoContainer";
import React from "react";

export type VaultInfoBlock =
  | "vaultAddress"
  | "vaultAssetAddress"
  | "vaultShareAddress"
  | "rewardAssets"
  | "totalAssets"
  | "vaultFees";

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
  let vaultFeePercentageFormatted: number = 0;

  if (vaultFeeConfig) {
    vaultFeeReceiver = vaultFeeConfig[0]?.toString();
    vaultFeeTokenAddress = vaultFeeConfig[1]?.toString();
    vaultFeePercentage = vaultFeeConfig[2]?.toString();

    if (vaultFeePercentage) {
      vaultFeePercentageFormatted = Number(vaultFeePercentage) / 100;
    }
  }

  return (
    <Flex direction="column" gap="2" pt="3">
      <Heading fontWeight="800" size="md">
        Vault general info/stats
      </Heading>
      <Divider my={2} />
      <VaultInfoContainer blockType="vaultAddress">
        <>{vaultAddress}</>
      </VaultInfoContainer>
      <VaultInfoContainer blockType="vaultAssetAddress">
        <>{vaultAssetAddress}</>
      </VaultInfoContainer>
      <VaultInfoContainer blockType="vaultShareAddress">
        <>{vaultShareAddress}</>
      </VaultInfoContainer>
      <VaultInfoContainer blockType="rewardAssets">
        <>{rewardAssets?.map((asset) => <Text key={asset}>{asset}</Text>)}</>
      </VaultInfoContainer>
      <VaultInfoContainer blockType="totalAssets">
        <>{formatBalance(vaultAssetTotalAssets?.toString())}</>
      </VaultInfoContainer>
      <VaultInfoContainer
        blockType="vaultFees"
        fees={{
          vaultFeePercentageFormatted,
          vaultFeeReceiver,
          vaultFeeTokenAddress,
        }}
      />
    </Flex>
  );
}
