import { useQuery } from "@tanstack/react-query";
import { readHederaVaultRewardTokens } from "@/services/contracts/wagmiGenActions";
import { EvmAddress } from "@/types/types";
import { QueryKeysEIP4626 } from "@/hooks/types";

export function useReadHederaVaultRewardTokens(vaultAddress: EvmAddress) {
  return useQuery({
    queryKey: [QueryKeysEIP4626.ReadHederaVaultRewardTokens, vaultAddress],
    queryFn: () => {
      //@TODO how to know which reward token id to pass if vault has several reward tokens added?
      return readHederaVaultRewardTokens({ args: [BigInt(1)] }, vaultAddress);
    },
  });
}
