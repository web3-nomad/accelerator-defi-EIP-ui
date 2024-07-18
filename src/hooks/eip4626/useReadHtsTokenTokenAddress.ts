import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@/hooks/types";
import { readHtsTokenTokenAddress } from "@/services/contracts/wagmiGenActions";
import { EvmAddress } from "@/types/types";

/**
 * Considering that we use HTSToken CA as a wrapper to call "mint" of regular HTS token,
 * we want to read the full non-zeroed EVM address of the underlying HTS token
 * @param deployedProxyHtsToken
 */
export function useReadHtsTokenTokenAddress(deployedProxyHtsToken: EvmAddress) {
  return useQuery({
    queryKey: [QueryKeys.ReadHtsTokenTokenAddress, deployedProxyHtsToken],
    queryFn: () => readHtsTokenTokenAddress({}, deployedProxyHtsToken),
    enabled: !!deployedProxyHtsToken,
  });
}
