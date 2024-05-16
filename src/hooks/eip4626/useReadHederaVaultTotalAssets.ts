import { useQuery } from "@tanstack/react-query";
import { QueryKeysEIP4626 } from "@/hooks/types";
import { readHederaVaultTotalAssets } from "@/services/contracts/wagmiGenActions";
import { EvmAddress } from "@/types/types";

/*
@hook Returns the total amount of assets on the contract balance.
 */
export function useReadHederaVaultTotalAssets(vaultAddress: EvmAddress) {
  return useQuery({
    queryKey: [QueryKeysEIP4626.ReadHederaVaultAssetTotalSupply, vaultAddress],
    queryFn: () => readHederaVaultTotalAssets({}, vaultAddress),
  });
}
