import { Text } from "@chakra-ui/react";
import { VaultInfoProps } from "@/types/types";
import { useReadHederaVaultAsset } from "@/hooks/eip4626/useReadHederaVaultAsset";
import { useReadHederaVaultTotalAssets } from "@/hooks/eip4626/useReadHederaVaultTotalAssets";
import { useReadHederaVaultAssetsOf } from "@/hooks/eip4626/useReadHederaVaultAssetsOf";
import { useReadHederaVaultRewardTokens } from "@/hooks/eip4626/useReadHederaVaultRewardTokens";
import { useReadHederaVaultShare } from "@/hooks/eip4626/useReadHederaVaultShare";
import { formatFromBigintToNumber } from "@/services/util/helpers";
import { useReadHederaVaultFeeConfig } from "@/hooks/eip4626/useReadHederaVaultFeeConfig";

export function VaultInfo({ vaultAddress }: VaultInfoProps) {
  const { data: vaultAssetAddress } = useReadHederaVaultAsset(vaultAddress);
  const { data: vaultAssetTotalAssets } =
    useReadHederaVaultTotalAssets(vaultAddress);
  const { data: userAssetsInVault } = useReadHederaVaultAssetsOf(vaultAddress);
  // const { data: rewardAsset } = useReadHederaVaultRewardTokens(vaultAddress);
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
      <Text>Vault asset address: {vaultAssetAddress}</Text>
      {/*<Text>Vault reward asset address: {rewardAsset}</Text>*/}
      <Text>Vault share asset address: {vaultShareAddress}</Text>
      <Text>
        Vault total assets amount:{" "}
        {formatFromBigintToNumber(vaultAssetTotalAssets?.toString())}
      </Text>
      <Text>
        Asset amount in vault available to redeem for current user based on # of
        shares present on user&apos;s balance: {userAssetsInVault?.toString()}
      </Text>
      <Text>Vault fee receiver: {vaultFeeReceiver}</Text>
      <Text>Vault fee token address: {vaultFeeTokenAddress}</Text>
      <Text>Vault fee raw: {vaultFeePercentage}</Text>
      <Text>Vault fee percentage: {vaultFeePercentageFormatted}%</Text>
      <Text></Text>
      <Text></Text>
    </>
  );
}
