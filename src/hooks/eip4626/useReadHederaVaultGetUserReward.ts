import { useQuery } from "@tanstack/react-query";
import { readHederaVaultGetUserReward } from "@/services/contracts/wagmiGenActions";
import { useWalletInterface } from "@/services/wallets/useWalletInterface";
import { EvmAddress } from "@/types/types";
import { QueryKeysEIP4626 } from "@/hooks/types";

export function useReadHederaVaultGetUserReward(vaultAddress: EvmAddress) {
  const { accountEvm } = useWalletInterface();

  //@TODO pass reward token id

  return useQuery({
    queryKey: [
      QueryKeysEIP4626.ReadHederaVaultGetUserReward,
      vaultAddress,
      accountEvm,
    ],
    queryFn: () =>
      readHederaVaultGetUserReward(
        {
          args: [
            accountEvm as EvmAddress,
            "0x000000000000000000000000000000000043b894",
          ],
        },
        vaultAddress,
      ),
  });
}
