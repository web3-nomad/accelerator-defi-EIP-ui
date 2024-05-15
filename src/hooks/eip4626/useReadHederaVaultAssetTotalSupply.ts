import { useQuery } from "@tanstack/react-query";
import { QueryKeysEIP4626 } from "@/hooks/types";
import { readHederaVaultAssetTotalSupply } from "@/services/contracts/wagmiGenActions";
import { EvmAddress } from "@/types/types";

export function useReadHederaVaultAssetTotalSupply(vaultAddress: EvmAddress) {
  return useQuery({
    queryKey: [QueryKeysEIP4626.ReadHederaVaultAssetTotalSupply, vaultAddress],
    queryFn: (context) => readHederaVaultAssetTotalSupply({}, vaultAddress),
  });
}
