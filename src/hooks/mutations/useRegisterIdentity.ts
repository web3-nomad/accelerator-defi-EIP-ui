import { useMutation } from "@tanstack/react-query";
import { writeIdentityRegistryRegisterIdentity } from "@/services/contracts/wagmiGenActions";
import { useWalletInterface } from "@/services/wallets/useWalletInterface";
import { WalletInterface } from "@/services/wallets/walletInterface";
import { convertAccountIdToSolidityAddress } from "@/services/util/helpers";
import { AccountId } from "@hashgraph/sdk";
import { AddIdentityToRegistryRequest } from "@/types/types";

export function useRegisterIdentity() {
  const { accountId, walletName, walletInterface } = useWalletInterface();

  return useMutation({
    mutationFn: async ({
      address,
      identity,
      registry,
    }: AddIdentityToRegistryRequest) => {
      //@TODO country code selector (if needed)
      const COUNTRY = 840; // ISO United States country code (see: https://www.iso.org/obp/ui/#search)
      const registerResult = writeIdentityRegistryRegisterIdentity(
        walletInterface as WalletInterface,
        { args: [address, identity, COUNTRY] },
        registry,
      );

      return registerResult;
    },
  });
}
