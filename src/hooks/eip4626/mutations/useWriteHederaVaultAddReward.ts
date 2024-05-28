import { useMutation } from "@tanstack/react-query";
import { writeHederaVaultAddReward } from "@/services/contracts/wagmiGenActions";
import { WalletInterface } from "@/services/wallets/walletInterface";
import { useWalletInterface } from "@/services/wallets/useWalletInterface";
import { EvmAddress } from "@/types/types";

type AddRewardProps = {
  tokenAmount: bigint;
  tokenAddress: EvmAddress;
  vaultAddress: EvmAddress;
};

export function useWriteHederaVaultAddReward() {
  const { walletInterface } = useWalletInterface();

  return useMutation({
    mutationFn: ({ tokenAmount, tokenAddress, vaultAddress }: AddRewardProps) =>
      writeHederaVaultAddReward(
        walletInterface as WalletInterface,
        {
          args: [tokenAddress, tokenAmount],
        },
        vaultAddress,
      ),
  });
}
