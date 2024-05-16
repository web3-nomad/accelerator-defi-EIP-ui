import { Text } from "@chakra-ui/react";
import { VaultInfoProps } from "@/types/types";
import { useReadHederaVaultAsset } from "@/hooks/eip4626/useReadHederaVaultAsset";
import { useReadHederaVaultTotalAssets } from "@/hooks/eip4626/useReadHederaVaultTotalAssets";
import { useReadHederaVaultAssetsOf } from "@/hooks/eip4626/useReadHederaVaultAssetsOf";
import { useReadHederaVaultRewardTokens } from "@/hooks/eip4626/useReadHederaVaultRewardTokens";
import { useReadHederaVaultShare } from "@/hooks/eip4626/useReadHederaVaultShare";

export function VaultInfo({ vaultAddress }: VaultInfoProps) {
  const { data: vaultAssetAddress } = useReadHederaVaultAsset(vaultAddress);
  const { data: vaultAssetTotalAssets } =
    useReadHederaVaultTotalAssets(vaultAddress);
  const { data: userAssetsInVault } = useReadHederaVaultAssetsOf(vaultAddress);
  // const { data: rewardAsset } = useReadHederaVaultRewardTokens(vaultAddress);
  const { data: vaultShare } = useReadHederaVaultShare(vaultAddress);

  return (
    <>
      <Text>Current selected vault: {vaultAddress}</Text>
      <Text>Vault asset address: {vaultAssetAddress}</Text>
      {/*<Text>Vault reward asset address: {rewardAsset}</Text>*/}
      <Text>Vault share asset address: {vaultShare}</Text>
      <Text>
        Vault total assets amount: {vaultAssetTotalAssets?.toString()}
      </Text>
      <Text>
        Asset amount in vault available to redeem for current user based on # of
        shares present on user&apos;s balance: {userAssetsInVault?.toString()}
      </Text>
    </>
  );
}
