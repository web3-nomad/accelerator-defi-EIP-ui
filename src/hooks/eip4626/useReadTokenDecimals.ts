import { useQuery } from "@tanstack/react-query";
import { readTokenDecimals } from "@/services/contracts/wagmiGenActions";
import { EvmAddress } from "@/types/types";

export function useReadTokenDecimals(tokenAddress?: EvmAddress) {
  return useQuery({
    queryKey: [],
    queryFn: () => readTokenDecimals({}, tokenAddress),
    enabled: !!tokenAddress,
    select: (data) => Number(data),
  });
}
