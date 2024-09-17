import { readTokenIsAgent } from "@/services/contracts/wagmiGenActions";
import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@/hooks/types";
import { EvmAddress } from "@/types/types";

/*
@hook Returns flag if passed account address has agent role for the specified token.
 */
export function useReadTokenIsAgent(
  tokenAddress: EvmAddress,
  accountAddress: EvmAddress,
) {
  return useQuery({
    queryKey: [QueryKeys.ReadTokenIsAgent, accountAddress, tokenAddress],
    enabled: !!accountAddress && !!tokenAddress,
    queryFn: () =>
      readTokenIsAgent({ args: [accountAddress as EvmAddress] }, tokenAddress),
  });
}
