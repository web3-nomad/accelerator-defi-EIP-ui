import { useQueries, UseQueryResult } from "@tanstack/react-query";
import { EvmAddress, TokenOwnerItem } from "@/types/types";
import { QueryKeys } from "@/hooks/types";
import { readTokenOwner } from "@/services/contracts/wagmiGenActions";

const combineQueryResults = (results: UseQueryResult[]) => {
  return {
    data: results.map((result) => result.data as TokenOwnerItem | undefined),
    isSuccess: results.every((result) => result.isSuccess),
  };
};

export function useReadTokenOwnerQueries(tokenAddresses: EvmAddress[]) {
  return useQueries({
    queries: tokenAddresses.map((tokenAddress) => ({
      queryKey: [QueryKeys.ReadTokenOwner, tokenAddress],
      queryFn: async () => {
        const tokenOwner = await readTokenOwner({}, tokenAddress);
        return {
          tokenAddress: tokenAddress,
          ownerAddress: tokenOwner.toString(),
        };
      },
      staleTime: Infinity,
    })),
    combine: combineQueryResults,
  });
}
