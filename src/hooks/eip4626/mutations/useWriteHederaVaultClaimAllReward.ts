import { writeHederaVaultClaimAllReward } from "@/services/contracts/wagmiGenActions";
import { useWalletInterface } from "@/services/wallets/useWalletInterface";
import { WalletInterface } from "@/services/wallets/walletInterface";
import { useMutation } from "@tanstack/react-query";
import { VaultInfoProps } from "@/types/types";

export function useWriteHederaVaultClaimAllReward() {
  const { walletInterface } = useWalletInterface();

  return useMutation({
    mutationFn: ({ vaultAddress }: VaultInfoProps) =>
      writeHederaVaultClaimAllReward(
        walletInterface as WalletInterface,
        {
          args: [BigInt(0)],
        },
        vaultAddress,
      ),
  });
}
