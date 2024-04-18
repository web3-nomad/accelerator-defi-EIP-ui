import { useMutation } from "@tanstack/react-query";
import { useWalletInterface } from "@/services/wallets/useWalletInterface";
import { AccountId } from "@hashgraph/sdk";
import abi from "@/assets/abi/IdentityProxy.json";

export function useCreateIdentity() {
  const { accountId, walletInterface } = useWalletInterface();

  return useMutation({
    mutationFn: async () => {
      const currentDeployerAddress =
        await walletInterface?.getEvmAccountAddress(
          AccountId.fromString(accountId as string),
        );

      //@TODO testnet/mainnet switch or fetch from json
      const implementationAuthority =
        "0xb287549483D9d1daB6371C82b365dbfF19B492f4";

      const deployParams = [
        `${implementationAuthority}`,
        `${currentDeployerAddress}` as `0x${string}`,
      ];

      return await walletInterface?.deployContract(deployParams, abi);
    },
    onSuccess: (data, variables, context) => {
      console.log("L10 useCreateIdentity onSuccess data ===", data);
    },
  });
}
