import { useMutation } from "@tanstack/react-query";
import { useWalletInterface } from "@/services/wallets/useWalletInterface";
import { writeIdentityGatewayDeployIdentityForWallet } from "@/services/contracts/wagmiGenActions";
import { WalletInterface } from "@/services/wallets/walletInterface";
import { CreateIdentityRequest } from "@/types/types";

export function useCreateIdentityFactory() {
  const { accountId, walletInterface } = useWalletInterface();

  return useMutation({
    mutationFn: async ({ address }: CreateIdentityRequest) => {
      const result = await writeIdentityGatewayDeployIdentityForWallet(
        walletInterface as WalletInterface,
        {
          args: [address],
        },
      );

      console.log("L25 useCreateIdentityFactory result ===", result);

      return result;
    },
    onSuccess: (data, variables, context) => {
      console.log("L10 useCreateIdentity onSuccess data ===", data);
    },
  });
}
