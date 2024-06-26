import { useQueries } from "@tanstack/react-query";
import { readHederaVaultGetUserReward } from "@/services/contracts/wagmiGenActions";
import { useWalletInterface } from "@/services/wallets/useWalletInterface";
import { EvmAddress } from "@/types/types";
import { QueryKeysEIP4626 } from "@/hooks/types";
import { useReadHederaVaultGetRewardTokens } from "@/hooks/eip4626/useReadHederaVaultGetRewardTokens";

export function useReadHederaVaultGetUserReward(vaultAddress: EvmAddress) {
  const { accountEvm } = useWalletInterface();

  const { data: rewardAssets } =
    useReadHederaVaultGetRewardTokens(vaultAddress);

  return useQueries({
    queries: rewardAssets.map((rewardAssetAddress) => ({
      queryKey: [
        QueryKeysEIP4626.ReadHederaVaultGetUserReward,
        vaultAddress,
        accountEvm,
        rewardAssetAddress?.toString(),
      ],
      enabled: !!rewardAssetAddress,
      queryFn: () =>
        readHederaVaultGetUserReward(
          {
            args: [
              accountEvm as EvmAddress,
              rewardAssetAddress?.toString() as EvmAddress,
            ],
          },
          vaultAddress,
        ),
    })),
  });
}
