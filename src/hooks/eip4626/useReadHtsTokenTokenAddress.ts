import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@/hooks/types";
import { readHtsTokenTokenAddress } from "@/services/contracts/wagmiGenActions";
import { EvmAddress } from "@/types/types";

/**
 * Considering that we use HTSToken CA as a proxy to allow users to associate/mint underlying HTS token,
 * `tokenAddress` will return the EVM address of the said HTS token
 *
 * @param deployedProxyHtsToken
 */
export function useReadHtsTokenTokenAddress(deployedProxyHtsToken: EvmAddress) {
  return useQuery({
    queryKey: [QueryKeys.ReadHtsTokenTokenAddress, deployedProxyHtsToken],
    queryFn: () => readHtsTokenTokenAddress({}, deployedProxyHtsToken),
    enabled: !!deployedProxyHtsToken,
  });
}
