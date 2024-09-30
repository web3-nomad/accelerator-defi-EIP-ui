import { useQuery } from "@tanstack/react-query";
import { readTokenDecimals } from "@/services/contracts/wagmiGenActions";
import { EvmAddress } from "@/types/types";
import { QueryKeys } from "@/hooks/types";

export function useReadTokenDecimals(tokenAddress?: EvmAddress) {
  return useQuery({
    queryKey: [QueryKeys.ReadTokenDecimals, tokenAddress],
    queryFn: () => readTokenDecimals({}, tokenAddress),
    enabled: !!tokenAddress,
    select: (data) => Number(data),
    initialData: () => 18,
  });
}
