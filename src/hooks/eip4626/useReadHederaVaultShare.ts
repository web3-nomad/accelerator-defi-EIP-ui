import { useQuery } from "@tanstack/react-query";
import { readHederaVaultShare } from "@/services/contracts/wagmiGenActions";
import { EvmAddress } from "@/types/types";
import { QueryKeysEIP4626 } from "@/hooks/types";

export function useReadHederaVaultShare(vaultAddress: EvmAddress) {
  return useQuery({
    queryKey: [QueryKeysEIP4626.ReadHederaVaultShare, vaultAddress],
    queryFn: () => {
      return readHederaVaultShare({}, vaultAddress);
    },
  });
}
