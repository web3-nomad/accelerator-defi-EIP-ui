import { useMutation } from "@tanstack/react-query";
import { writeHederaVaultDeposit } from "@/services/contracts/wagmiGenActions";
import { useWalletInterface } from "@/services/wallets/useWalletInterface";
import { WalletInterface } from "@/services/wallets/walletInterface";
import { EvmAddress } from "@/types/types";

export function useWriteHederaVaultDeposit() {
  const { walletInterface, accountEvm } = useWalletInterface();

  return useMutation({
    mutationFn: async (tokenAmount: bigint) =>
      writeHederaVaultDeposit(walletInterface as WalletInterface, {
        args: [tokenAmount, accountEvm as EvmAddress],
      }),
  });
}
