import { useWalletInterface } from "@/services/wallets/useWalletInterface";
import { useMutation } from "@tanstack/react-query";
import { writeTokenMint } from "@/services/contracts/wagmiGenActions";
import { AccountId } from "@hashgraph/sdk";
import { WalletInterface } from "@/services/wallets/walletInterface";
import { MintTokenRequest } from "@/types/types";

export function useMintToken() {
  const { walletInterface } = useWalletInterface();

  return useMutation({
    mutationFn: async ({ token, address, value }: MintTokenRequest) => {
      const mintResult = await writeTokenMint(
        walletInterface as WalletInterface,
        { args: [address, BigInt(value)] },
        token,
      );
      return mintResult;
    },
  });
}
