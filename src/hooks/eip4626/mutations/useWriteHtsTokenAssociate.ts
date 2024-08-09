import { HtsTokenAssociateRequest } from "@/types/types";
import { useMutation } from "@tanstack/react-query";
import { writeHtsTokenAssociate } from "@/services/contracts/wagmiGenActions";
import { WalletInterface } from "@/services/wallets/walletInterface";
import { useWalletInterface } from "@/services/wallets/useWalletInterface";

export function useWriteHtsTokenAssociate() {
  const { walletInterface } = useWalletInterface();

  return useMutation({
    mutationFn: ({ tokenAddress }: HtsTokenAssociateRequest) =>
      writeHtsTokenAssociate(
        walletInterface as WalletInterface,
        {},
        tokenAddress,
      ),
  });
}
