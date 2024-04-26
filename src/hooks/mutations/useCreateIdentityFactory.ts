import { useMutation } from "@tanstack/react-query";
import { useWalletInterface } from "@/services/wallets/useWalletInterface";
import { AccountId } from "@hashgraph/sdk";
import { writeIdentityGatewayDeployIdentityForWallet } from "@/services/contracts/wagmiGenActions";
import { WalletInterface } from "@/services/wallets/walletInterface";
import { convertAccountIdToSolidityAddress } from "@/services/util/helpers";

export function useCreateIdentityFactory() {
  const { accountId, walletInterface } = useWalletInterface();

  return useMutation({
    mutationFn: async () => {
      const currentAccountAddress = convertAccountIdToSolidityAddress(
        AccountId.fromString(accountId as string),
      );

      const result = await writeIdentityGatewayDeployIdentityForWallet(
        walletInterface as WalletInterface,
        {
          args: [currentAccountAddress],
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
