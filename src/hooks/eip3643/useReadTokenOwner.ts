import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@/hooks/types";
import { readTokenOwner } from "@/services/contracts/wagmiGenActions";
import { EvmAddress } from "@/types/types";

export function useReadTokenOwner(tokenAddress: EvmAddress) {
  return useQuery({
    queryKey: [QueryKeys.ReadTokenOwner, tokenAddress],
    queryFn: () => readTokenOwner({ args: [] }, tokenAddress),
  });
}
