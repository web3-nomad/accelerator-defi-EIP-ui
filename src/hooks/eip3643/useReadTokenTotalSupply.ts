import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@/hooks/types";
import { readTokenTotalSupply } from "@/services/contracts/wagmiGenActions";
import { EvmAddress } from "@/types/types";

export function useReadTokenTotalSupply(tokenAddress: EvmAddress) {
  return useQuery({
    queryKey: [QueryKeys.ReadTokenTotalSupply, tokenAddress],
    queryFn: () => readTokenTotalSupply({ args: [] }, tokenAddress),
    enabled: !!tokenAddress,
    initialData: () => BigInt(0),
  });
}
