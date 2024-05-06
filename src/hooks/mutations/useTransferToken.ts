import { useMutation, useQueryClient } from "@tanstack/react-query";
import { writeTokenTransferFrom } from "@/services/contracts/wagmiGenActions";
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
      fromAddress,
      toAddress,
      amount,
    }: TransferTokenFromRequest) => {
      return writeTokenTransferFrom(
        walletInterface as WalletInterface,
        { args: [fromAddress, toAddress, amount] },
        tokenAddress,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.ReadBalanceOf] });
    },
  });
}
