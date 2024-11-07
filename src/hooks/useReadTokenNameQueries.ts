import { skipToken, useQueries, UseQueryResult } from "@tanstack/react-query";
import { readTokenName } from "@/services/contracts/wagmiGenActions";
import { QueryKeys } from "@/hooks/types";
import { EvmAddress, TokenNameItem } from "@/types/types";

/**
 * Helper function to keep the return value of the useQueries hook
 * as referentially stable and prevent re-renders of consumer components
 * @see https://tanstack.com/query/latest/docs/framework/react/reference/useQueries#memoization
 */
const combineQueryResults = (results: UseQueryResult[]) => {
  return {
    data: results.map((result) => result.data as TokenNameItem | undefined),
    isSuccess: results.every((result) => result.isSuccess),
  };
};

export function useReadTokenNameQueries(tokenAddresses: EvmAddress[]) {
  return useQueries({
    //@ts-ignore
    queries: tokenAddresses.map((tokenAddress) => ({
      queryKey: [QueryKeys.ReadTokenName, tokenAddress],
      queryFn: !tokenAddress
        ? skipToken
        : async (): Promise<TokenNameItem> => {
            const tokenName = await readTokenName({}, tokenAddress);
            return {
              name: tokenName.toString(),
              address: tokenAddress,
            };
          },
      staleTime: Infinity,
    })),
    combine: combineQueryResults,
  });
}
