import { useWalletInterface } from "@/services/wallets/useWalletInterface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { writeTokenMint } from "@/services/contracts/wagmiGenActions";
import { WalletInterface } from "@/services/wallets/walletInterface";
import { MintTokenRequest } from "@/types/types";
import { QueryKeys } from "@/hooks/types";

export function useMintToken() {
  const { walletInterface } = useWalletInterface();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ token, address, amount }: MintTokenRequest) => {
      const mintResult = await writeTokenMint(
        walletInterface as WalletInterface,
        { args: [address, amount] },
        token,
      );
      return mintResult;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.ReadBalanceOf] });
    },
  });
}
