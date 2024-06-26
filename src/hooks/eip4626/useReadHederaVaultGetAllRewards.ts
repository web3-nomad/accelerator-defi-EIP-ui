import { useQuery } from "@tanstack/react-query";
import { readHederaVaultGetAllRewards } from "@/services/contracts/wagmiGenActions";
import { EvmAddress } from "@/types/types";
import { QueryKeysEIP4626 } from "@/hooks/types";
import { useWalletInterface } from "@/services/wallets/useWalletInterface";

export function useReadHederaVaultGetAllRewards(vaultAddress: EvmAddress) {
  const { accountEvm } = useWalletInterface();

  return useQuery({
    queryKey: [
      QueryKeysEIP4626.ReadHederaVaultGetAllRewards,
      vaultAddress,
      accountEvm,
    ],
    queryFn: () =>
      readHederaVaultGetAllRewards(
        { args: [accountEvm as EvmAddress] },
        vaultAddress,
      ),
  });
}
