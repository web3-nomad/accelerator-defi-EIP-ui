import { useQuery } from "@tanstack/react-query";
import { QueryKeysEIP4626 } from "@/hooks/types";
import { readHederaVaultAsset } from "@/services/contracts/wagmiGenActions";
import { EvmAddress } from "@/types/types";

export function useReadHederaVaultAsset(vaultAddress: EvmAddress) {
  return useQuery({
    queryKey: [QueryKeysEIP4626.ReadHederaVaultAsset, vaultAddress],
    queryFn: (context) => readHederaVaultAsset({}, vaultAddress),
  });
}
