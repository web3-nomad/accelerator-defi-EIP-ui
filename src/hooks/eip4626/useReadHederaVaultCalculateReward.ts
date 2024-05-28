import { useQuery } from "@tanstack/react-query";
import { readHederaVaultCalculateReward } from "@/services/contracts/wagmiGenActions";
import { EvmAddress } from "@/types/types";

export function useReadHederaVaultCalculateReward(vaultAddress: EvmAddress) {
  return useQuery({
    queryKey: [],
    queryFn: () =>
      readHederaVaultCalculateReward({ args: [BigInt(0)] }, vaultAddress),
  });
}
