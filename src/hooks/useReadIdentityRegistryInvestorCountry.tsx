import { EvmAddress } from "@/types/types";
import { QueryKeys } from "@/hooks/types";
import { useQuery } from "@tanstack/react-query";
import { readIdentityRegistryInvestorCountry } from "@/services/contracts/wagmiGenActions";

export function useReadIdentityRegistryInvestorCountry(
  identityRegistryAddress?: EvmAddress,
  _userAddress?: EvmAddress,
) {
  return useQuery({
    queryKey: [
      QueryKeys.ReadIdentityRegistryInvestorCountry,
      identityRegistryAddress,
    ],
    retry: false,
    enabled: !!(identityRegistryAddress && _userAddress),
    queryFn: () =>
      readIdentityRegistryInvestorCountry(
        { args: [_userAddress as EvmAddress] },
        identityRegistryAddress as EvmAddress,
      ),
  });
}
