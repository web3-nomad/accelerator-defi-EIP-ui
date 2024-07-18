import { useWalletInterface } from "@/services/wallets/useWalletInterface";
import { useMutation } from "@tanstack/react-query";
import { HtsTokenMintRequest } from "@/types/types";
import { writeHtsTokenMint } from "@/services/contracts/wagmiGenActions";
import { WalletInterface } from "@/services/wallets/walletInterface";

export function useWriteHtsTokenMint() {
  const { walletInterface } = useWalletInterface();

  const DEFAULT_TOKEN_MINT_AMOUNT = BigInt(1000);

  return useMutation({
    mutationFn: ({ tokenAddress }: HtsTokenMintRequest) => {
      return writeHtsTokenMint(
        walletInterface as WalletInterface,
        {
          args: [DEFAULT_TOKEN_MINT_AMOUNT],
        },
        tokenAddress,
      );
    },
  });
}
