import { useQuery } from "@tanstack/react-query";
import { readHederaVaultCalculateReward } from "@/services/contracts/wagmiGenActions";
import { EvmAddress } from "@/types/types";
import { QueryKeysEIP4626 } from "@/hooks/types";

export function useReadHederaVaultCalculateReward(vaultAddress: EvmAddress) {
  return useQuery({
    queryKey: [QueryKeysEIP4626.ReadHederaVaultCalculateReward, vaultAddress],
    queryFn: () =>
      readHederaVaultCalculateReward({ args: [BigInt(0)] }, vaultAddress),
  });
}
