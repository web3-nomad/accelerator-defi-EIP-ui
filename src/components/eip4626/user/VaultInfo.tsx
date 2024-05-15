import { Text } from "@chakra-ui/react";
import { VaultInfoProps } from "@/types/types";
import { useReadHederaVaultAsset } from "@/hooks/eip4626/useReadHederaVaultAsset";
import { useReadHederaVaultAssetTotalSupply } from "@/hooks/eip4626/useReadHederaVaultAssetTotalSupply";

export function VaultInfo({ vaultAddress }: VaultInfoProps) {
  const { data: vaultAssetAddress } = useReadHederaVaultAsset(vaultAddress);
  const { data: vaultAssetTotalSupply } =
    useReadHederaVaultAssetTotalSupply(vaultAddress);

  return (
    <>
      <Text>Current selected vault: {vaultAddress}</Text>
      <Text>Vault asset address: {vaultAssetAddress}</Text>
      <Text>Vault asset total supply: {vaultAssetTotalSupply?.toString()}</Text>
    </>
  );
}
