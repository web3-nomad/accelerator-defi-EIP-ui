import { useMutation } from "@tanstack/react-query";
import { writeHederaVaultWithdraw } from "@/services/contracts/wagmiGenActions";
import { useWalletInterface } from "@/services/wallets/useWalletInterface";
import { WalletInterface } from "@/services/wallets/walletInterface";
import { EvmAddress } from "@/types/types";

export function useWriteHederaVaultWithdraw() {
  const { walletInterface, accountEvm } = useWalletInterface();

  return useMutation({
    mutationFn: (tokenAmount: bigint) =>
      writeHederaVaultWithdraw(walletInterface as WalletInterface, {
        args: [tokenAmount, accountEvm as EvmAddress, accountEvm as EvmAddress],
      }),
  });
}
