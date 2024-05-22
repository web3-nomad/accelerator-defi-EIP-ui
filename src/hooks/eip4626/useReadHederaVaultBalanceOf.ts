import { useQuery } from "@tanstack/react-query";
import { QueryKeysEIP4626 } from "@/hooks/types";
import { readHederaVaultBalanceOf } from "@/services/contracts/wagmiGenActions";
import { EvmAddress } from "@/types/types";
import { useWalletInterface } from "@/services/wallets/useWalletInterface";

/**
 * Returns the total amount of vault shares the owner currently has.
 * @link https://ethereum.org/en/developers/docs/standards/tokens/erc-4626/#balanceof
 */
export function useReadHederaVaultBalanceOf(vaultAddress: EvmAddress) {
  const { accountId } = useWalletInterface();

  return useQuery({
    queryKey: [
      QueryKeysEIP4626.ReadHederaVaultBalanceOf,
      vaultAddress,
      accountId,
    ],
    retry: false,
    enabled: !!vaultAddress,
    queryFn: () => {
      return readHederaVaultBalanceOf(
        { args: [accountId as EvmAddress] },
        vaultAddress as EvmAddress,
      );
    },
  });
}
