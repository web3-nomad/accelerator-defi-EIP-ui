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
      country,
    }: AddIdentityToRegistryRequest) => {
      return writeIdentityRegistryRegisterIdentity(
        walletInterface as WalletInterface,
        { args: [address, identity, country] },
        registry,
      );
    },
    onSuccess: () => {
      //@TODO find a way to refresh data for related watchContractEvent listener
      //we would like to refresh registryAgents list here
    },
  });
}
