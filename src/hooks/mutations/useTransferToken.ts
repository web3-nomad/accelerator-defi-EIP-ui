import { useMutation, useQueryClient } from "@tanstack/react-query";
import { writeTokenTransfer } from "@/services/contracts/wagmiGenActions";
import { useWalletInterface } from "@/services/wallets/useWalletInterface";
import { WalletInterface } from "@/services/wallets/walletInterface";
import { TransferTokenFromRequest } from "@/types/types";
import { QueryKeys } from "@/hooks/types";

export function useTransferToken() {
  const { walletInterface } = useWalletInterface();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      tokenAddress,
      toAddress,
      amount,
    }: TransferTokenFromRequest) => {
      return writeTokenTransfer(
        walletInterface as WalletInterface,
        { args: [toAddress, amount] },
        tokenAddress,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.ReadBalanceOf] });
    },
  });
}
