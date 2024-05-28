import { useMutation } from "@tanstack/react-query";
import { writeHederaVaultApprove } from "@/services/contracts/wagmiGenActions";
import { WalletInterface } from "@/services/wallets/walletInterface";
import { EvmAddress } from "@/types/types";
import { useWalletInterface } from "@/services/wallets/useWalletInterface";

type ApproveProps = {
  tokenAmount: bigint;
  tokenAddress: EvmAddress;
  vaultAddress: EvmAddress;
};

export function useWriteHederaVaultApprove() {
  const { walletInterface } = useWalletInterface();

  return useMutation({
    mutationFn: ({ tokenAmount, tokenAddress, vaultAddress }: ApproveProps) =>
      writeHederaVaultApprove(
        walletInterface as WalletInterface,
        {
          args: [vaultAddress, tokenAmount],
        },
        tokenAddress.toString() as EvmAddress,
      ),
  });
}
