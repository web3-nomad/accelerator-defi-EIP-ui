import { useWalletInterface } from "@/services/wallets/useWalletInterface";
import { useMutation } from "@tanstack/react-query";
import { writeHederaVaultUpdateFeeConfig } from "@/services/contracts/wagmiGenActions";
import { WalletInterface } from "@/services/wallets/walletInterface";
import { UpdateFeeConfigRequest } from "@/types/types";

export function useUpdateFeeConfig() {
  const { walletInterface } = useWalletInterface();

  return useMutation({
    mutationFn: async ({
      vaultAddress,
      receiver,
      rewardTokenAddress,
      feePercentage,
    }: UpdateFeeConfigRequest) => {
      const feeConfig = {
        receiver: receiver,
        token: rewardTokenAddress,
        feePercentage: BigInt(feePercentage),
      };

      const updateResult = await writeHederaVaultUpdateFeeConfig(
        walletInterface as WalletInterface,
        {
          args: [feeConfig],
        },
        vaultAddress,
      );

      return updateResult;
    },
  });
}
