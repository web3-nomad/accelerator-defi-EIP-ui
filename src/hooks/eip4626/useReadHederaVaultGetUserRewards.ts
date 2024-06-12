import { useQuery } from "@tanstack/react-query";
import { readHederaVaultGetUserRewards } from "@/services/contracts/wagmiGenActions";
import { useWalletInterface } from "@/services/wallets/useWalletInterface";
import { EvmAddress } from "@/types/types";
import { QueryKeysEIP4626 } from "@/hooks/types";

export function useReadHederaVaultGetUserRewards(vaultAddress: EvmAddress) {
  const { accountEvm } = useWalletInterface();

  return useQuery({
    queryKey: [
      QueryKeysEIP4626.ReadHederaVaultGetUserRewards,
      vaultAddress,
      accountEvm,
    ],
    queryFn: () =>
      readHederaVaultGetUserRewards(
        { args: [accountEvm as EvmAddress] },
        vaultAddress,
      ),
  });
}
