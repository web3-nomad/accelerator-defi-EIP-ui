import { useQueries, useQuery } from "@tanstack/react-query";
import { QueryKeysEIP4626 } from "@/hooks/types";
import { readHederaVaultAsset } from "@/services/contracts/wagmiGenActions";
import { EvmAddress } from "@/types/types";

export function useReadHederaVaultAsset(vaultAddress: EvmAddress) {
  return useQuery({
    queryKey: [QueryKeysEIP4626.ReadHederaVaultAsset, vaultAddress],
    queryFn: () => readHederaVaultAsset({}, vaultAddress),
  });
}

export function useReadHederaVaultAssetQueries(vaultAddresses: EvmAddress[]) {
  return useQueries({
    queries: vaultAddresses.map((vaultAddress) => ({
      queryKey: [QueryKeysEIP4626.ReadHederaVaultAssetQueries, vaultAddress],
      queryFn: async () => {
        let vaultAssetAddress = await readHederaVaultAsset({}, vaultAddress);
        let result = {
          vaultAssetAddress: vaultAssetAddress.toString(),
          vaultAddress,
        };
        console.log("L21 useReadHederaVaultAssetQueries ===", result);
        return result;
      },
      // staleTime: Infinity,
    })),
  });
}
