import { useQuery } from "@tanstack/react-query";
import { readHederaVaultGetRewardTokens } from "@/services/contracts/wagmiGenActions";
import { EvmAddress } from "@/types/types";
import { QueryKeysEIP4626 } from "@/hooks/types";

export function useReadHederaVaultGetRewardTokens(vaultAddress: EvmAddress) {
  return useQuery({
    queryKey: [QueryKeysEIP4626.ReadHederaVaultGetRewardTokens, vaultAddress],
    queryFn: () => readHederaVaultGetRewardTokens({}, vaultAddress),
    initialData: [],
  });
}
