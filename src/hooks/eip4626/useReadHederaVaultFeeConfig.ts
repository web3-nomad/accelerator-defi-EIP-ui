import { useQuery } from "@tanstack/react-query";
import { QueryKeysEIP4626 } from "@/hooks/types";
import { EvmAddress } from "@/types/types";
import { readHederaVaultFeeConfig } from "@/services/contracts/wagmiGenActions";

export function useReadHederaVaultFeeConfig(vaultAddress: EvmAddress) {
  return useQuery({
    queryKey: [QueryKeysEIP4626.ReadHederaVaultFeeConfig, vaultAddress],
    queryFn: () => readHederaVaultFeeConfig({ args: [] }, vaultAddress),
  });
}
