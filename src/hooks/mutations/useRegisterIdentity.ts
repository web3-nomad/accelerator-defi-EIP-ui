import { useMutation } from "@tanstack/react-query";
import { writeIdentityRegistryRegisterIdentity } from "@/services/contracts/wagmiGenActions";
import { useWalletInterface } from "@/services/wallets/useWalletInterface";
import { WalletInterface } from "@/services/wallets/walletInterface";
import { AddIdentityToRegistryRequest } from "@/types/types";

export function useRegisterIdentity() {
  const { walletInterface } = useWalletInterface();

  return useMutation({
    mutationFn: async ({
      address,
      identity,
      registry,
    }: AddIdentityToRegistryRequest) => {
      //@TODO country code selector (if needed)
      const COUNTRY = 840; // ISO United States country code (see: https://www.iso.org/obp/ui/#search)
      return writeIdentityRegistryRegisterIdentity(
        walletInterface as WalletInterface,
        { args: [address, identity, COUNTRY] },
        registry,
      );
    },
  });
}
