import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@/hooks/types";
import { readIdentityRegistryInvestorCountry } from "@/services/contracts/wagmiGenActions";
import { EvmAddress } from "@/types/types";
import { investorCountriesItems } from "@/components/manage-registry/manage-identities/ManageIdentities";

export function useReadIdentityRegistryInvestorCountry(
  accountAddress: EvmAddress,
  registryAddress: EvmAddress,
) {
  return useQuery({
    queryKey: [QueryKeys.ReadIdentityRegistryInvestorCountry],
    queryFn: () =>
      readIdentityRegistryInvestorCountry(
        {
          args: [accountAddress],
        },
        registryAddress,
      ),
    enabled: !!accountAddress && !!registryAddress,
    select: (data) => {
      return (
        investorCountriesItems.find((item) => item.value === Number(data))
          ?.label || "N/A"
      );
    },
  });
}
