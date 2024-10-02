import { useWalletInterface } from "@/services/wallets/useWalletInterface";
import { useMutation } from "@tanstack/react-query";
import { HtsTokenMintRequest } from "@/types/types";
import { writeHtsTokenMint } from "@/services/contracts/wagmiGenActions";
import { WalletInterface } from "@/services/wallets/walletInterface";

export const DEFAULT_TOKEN_MINT_AMOUNT = 1000;

export function useWriteHtsTokenMint() {
  const { walletInterface } = useWalletInterface();

  return useMutation({
    mutationFn: ({ tokenAddress, mintAmount }: HtsTokenMintRequest) => {
      return writeHtsTokenMint(
        walletInterface as WalletInterface,
        {
          args: [mintAmount],
        },
        tokenAddress,
      );
    },
  });
}
