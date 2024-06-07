import { Divider, Text } from "@chakra-ui/react";
import { VaultInfoProps } from "@/types/types";
import { useReadHederaVaultAsset } from "@/hooks/eip4626/useReadHederaVaultAsset";
import { useReadHederaVaultTotalAssets } from "@/hooks/eip4626/useReadHederaVaultTotalAssets";
import { useReadHederaVaultGetRewardTokens } from "@/hooks/eip4626/useReadHederaVaultGetRewardTokens";
import { useReadHederaVaultShare } from "@/hooks/eip4626/useReadHederaVaultShare";
import { formatBalance } from "@/services/util/helpers";
import { useReadHederaVaultFeeConfig } from "@/hooks/eip4626/useReadHederaVaultFeeConfig";

export function VaultInfo({ vaultAddress }: VaultInfoProps) {
  //@TODO refresh queries after depo/withdraw
  const { data: vaultAssetAddress } = useReadHederaVaultAsset(vaultAddress);
  const { data: vaultAssetTotalAssets } =
    useReadHederaVaultTotalAssets(vaultAddress);
  const { data: rewardAssets } =
    useReadHederaVaultGetRewardTokens(vaultAddress);
  const { data: vaultShareAddress } = useReadHederaVaultShare(vaultAddress);
  const { data: vaultFeeConfig } = useReadHederaVaultFeeConfig(vaultAddress);

  let vaultFeeReceiver;
  let vaultFeeTokenAddress;
  let vaultFeePercentage;
  let vaultFeePercentageFormatted;

  if (vaultFeeConfig) {
    vaultFeeReceiver = vaultFeeConfig[0]?.toString();
    vaultFeeTokenAddress = vaultFeeConfig[1]?.toString();
    vaultFeePercentage = vaultFeeConfig[2]?.toString();
  }

  if (vaultFeePercentage) {
    vaultFeePercentageFormatted = Number(vaultFeePercentage) / 100;
  }

  return (
    <>
      <Text>Current selected vault: {vaultAddress}</Text>
      <Text>Vault asset token address: {vaultAssetAddress}</Text>
      <Text>Vault share token address: {vaultShareAddress}</Text>
      <Text>Vault rewards token addresses:</Text>
      {rewardAssets &&
        rewardAssets.map((rewardAsset) => (
          <Text key={rewardAsset}>{rewardAsset}</Text>
        ))}
      <Divider my={5} />
      <Text>
        Vault total assets deposited amount:{" "}
        {formatBalance(vaultAssetTotalAssets?.toString())}
      </Text>
      <Divider my={5} />
      <Text>Vault fee receiver address: {vaultFeeReceiver}</Text>
      <Text>Vault fee token address: {vaultFeeTokenAddress}</Text>
      <Text>Vault fee raw: {vaultFeePercentage}</Text>
      <Text>Vault fee percentage: {vaultFeePercentageFormatted}%</Text>
    </>
  );
}
