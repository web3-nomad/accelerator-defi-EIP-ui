import { EvmAddress } from "@/types/types";
import { useReadHederaVaultAsset } from "@/hooks/eip4626/useReadHederaVaultAsset";
import { useReadHederaVaultShare } from "@/hooks/eip4626/useReadHederaVaultShare";
import { useReadHederaVaultUserContribution } from "@/hooks/eip4626/useReadHederaVaultUserContribution";
import { useReadBalanceOf } from "@/hooks/useReadBalanceOf";

export const useVaultProperties = (vaultAddress: EvmAddress) => {
  const { data: vaultAssetAddress } = useReadHederaVaultAsset(vaultAddress);
  const { data: vaultAssetUserBalance } = useReadBalanceOf(
    vaultAssetAddress as EvmAddress,
  );
  const { data: vaultShareAddress } = useReadHederaVaultShare(vaultAddress);
  const { data: shareUserBalance } = useReadBalanceOf(
    vaultShareAddress as EvmAddress,
  );
  const { data: userContribution } =
    useReadHederaVaultUserContribution(vaultAddress);

  return {
    vaultAssetAddress,
    vaultShareAddress,
    vaultAssetUserBalance,
    shareUserBalance,
    userContribution,
  };
};
