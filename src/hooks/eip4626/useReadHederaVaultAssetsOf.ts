import { useQuery } from "@tanstack/react-query";
import { QueryKeysEIP4626 } from "@/hooks/types";
import { readHederaVaultAssetsOf } from "@/services/contracts/wagmiGenActions";
import { useWalletInterface } from "@/services/wallets/useWalletInterface";
import { EvmAddress } from "@/types/types";

/*
 * @hook Calculates amount of assets that can be received for user share balance.
 */
export function useReadHederaVaultAssetsOf(vaultAddress: EvmAddress) {
  const { accountId } = useWalletInterface();

  return useQuery({
    queryKey: [
      QueryKeysEIP4626.ReadHederaVaultAssetsOf,
      vaultAddress,
      accountId,
    ],
    queryFn: () => {
      return readHederaVaultAssetsOf(
        { args: [accountId as EvmAddress] },
        vaultAddress,
      );
    },
  });
}
