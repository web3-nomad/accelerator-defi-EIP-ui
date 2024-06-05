import { useWalletInterface } from "@/services/wallets/useWalletInterface";
import { useMutation } from "@tanstack/react-query";
import { writeHederaNftSafeMint } from "@/services/contracts/wagmiGenActions";
import { WalletInterface } from "@/services/wallets/walletInterface";

export function useMintNFT() {
  const { walletInterface } = useWalletInterface();

  return useMutation({
    mutationFn: async ({ address }: { address: `0x${string}` }) => {
      const mintResult = await writeHederaNftSafeMint(
        walletInterface as WalletInterface,
        { args: [address] },
      );
      return mintResult;
    },
  });
}
