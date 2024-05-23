import { useMutation } from "@tanstack/react-query";
import { useWalletInterface } from "@/services/wallets/useWalletInterface";
import { writeIdentityGatewayDeployIdentityForWallet } from "@/services/contracts/wagmiGenActions";
import { WalletInterface } from "@/services/wallets/walletInterface";
import { CreateIdentityRequest } from "@/types/types";

export function useCreateIdentityFactory() {
  const { walletInterface } = useWalletInterface();

  return useMutation({
    mutationFn: ({ address }: CreateIdentityRequest) =>
      writeIdentityGatewayDeployIdentityForWallet(
        walletInterface as WalletInterface,
        {
          args: [address],
        },
      ),
    onSuccess: (data, variables, context) => {
      console.log("useCreateIdentityFactory onSuccess", data);
    },
  });
}
