import { useMutation } from "@tanstack/react-query";
import {
  requiresNftModuleAddress,
  writeModularComplianceAddModule,
} from "@/services/contracts/wagmiGenActions";
import { WalletInterface } from "@/services/wallets/walletInterface";
import { useWalletInterface } from "@/services/wallets/useWalletInterface";

export function useAddRequiresNFTModule() {
  const { walletInterface } = useWalletInterface();

  return useMutation({
    mutationFn: ({ modularComplianceAddress }: any) => {
      return writeModularComplianceAddModule(
        walletInterface as WalletInterface,
        { args: [requiresNftModuleAddress] },
        modularComplianceAddress.toString(),
      );
    },
  });
}
