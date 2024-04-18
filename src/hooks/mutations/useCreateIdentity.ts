import { useMutation } from "@tanstack/react-query";
import { useWalletInterface } from "@/services/wallets/useWalletInterface";
import { AccountId } from "@hashgraph/sdk";
import abi from "@/assets/abi/IdentityProxy.json";
import { implementations } from "../../../scripts/download-json.json";

export function useCreateIdentity() {
  const { accountId, walletName, walletInterface } = useWalletInterface();

  return useMutation({
    mutationFn: async () => {
      const currentDeployerAddress =
        await walletInterface?.getEvmAccountAddress(
          AccountId.fromString(accountId as string),
        );

      console.log("L25 currentDeployerAddress ===", currentDeployerAddress);

      const deployParams = [
        `${implementations.ImplementationAuthority}`,
        `${currentDeployerAddress}` as `0x${string}`,
      ];

      console.log("L37 deployParams ===", deployParams);

      // Process trasaction
      const tx = await walletInterface?.deployContract(deployParams, abi);

      return tx;
    },
    onSuccess: (data, variables, context) => {
      console.log("L10 useCreateIdentity onSuccess data ===", data);
    },
  });
}
