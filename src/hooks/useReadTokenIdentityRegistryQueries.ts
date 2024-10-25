import { useQueries, UseQueryResult, skipToken } from "@tanstack/react-query";
import { QueryKeys } from "@/hooks/types";
import { readTokenIdentityRegistry } from "@/services/contracts/wagmiGenActions";
import { TokenNameItem, TokenRegistry } from "@/types/types";

const combineQueryResults = (results: UseQueryResult[]) => {
  return {
    data: results.map((result) => result.data as TokenRegistry),
    isSuccess: results.every((result) => result.isSuccess),
  };
};

export function useReadTokenIdentityRegistryQueries(
  tokens: TokenNameItem[] | undefined[],
) {
  return useQueries({
    // @ts-ignore
    queries: tokens.map((token) => ({
      queryKey: [QueryKeys.ReadTokenIdentityRegistry, token?.address],
      queryFn: !token?.address
        ? skipToken
        : async () => {
            const registryAddress = await readTokenIdentityRegistry(
              { args: [] },
              token.address,
            );

            return {
              tokenAddress: token.address,
              registryAddress: registryAddress,
            };
          },
      staleTime: Infinity,
    })),
    combine: combineQueryResults,
  });
}
