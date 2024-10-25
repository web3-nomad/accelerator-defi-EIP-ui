import { useQueries, UseQueryResult } from "@tanstack/react-query";
import { readTokenName } from "@/services/contracts/wagmiGenActions";
import { QueryKeys } from "@/hooks/types";
import { LogDescription } from "ethers";
import { EvmAddress, TokenNameItem } from "@/types/types";

/**
 * Helper function to keep the return value of the useQueries hook
 * as referentially stable and prevent re-renders of consumer components
 * @see https://tanstack.com/query/latest/docs/framework/react/reference/useQueries#memoization
 */
const combineQueryResults = (results: UseQueryResult[]) => {
  return {
    data: results.map((result) => result.data as TokenNameItem),
    isSuccess: results.every((result) => result.isSuccess),
  };
};

export function useReadTokenName(tokenLogItems: LogDescription[]) {
  return useQueries({
    queries: tokenLogItems.map((tokenLogItem) => ({
      queryKey: [QueryKeys.ReadTokenName, tokenLogItem["args"]?.[0]],
      queryFn: async () => {
        const tokenName = await readTokenName({}, tokenLogItem["args"]?.[0]);
        return {
          name: tokenName.toString(),
          address: tokenLogItem["args"]?.[0] as EvmAddress,
        };
      },
      staleTime: Infinity,
    })),
    combine: combineQueryResults,
  });
}
