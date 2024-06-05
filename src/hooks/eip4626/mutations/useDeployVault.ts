import { useWalletInterface } from "@/services/wallets/useWalletInterface";
import { useMutation } from "@tanstack/react-query";
import { writeVaultFactoryDeployVault } from "@/services/contracts/wagmiGenActions";
import { WalletInterface } from "@/services/wallets/walletInterface";
import { DeployVaultRequest } from "@/types/types";
import { ethers } from "ethers";

const DEPLOY_VALUE = "13";

export function useDeployVault() {
  const { accountEvm, walletInterface } = useWalletInterface();

  return useMutation({
    mutationFn: async ({
      stakingTokenAddress,
      shareTokenName,
      shareTokenSymbol,
      rewardTokenAddress,
      feePercentage,
    }: DeployVaultRequest) => {
      const currentDeployerAddress = accountEvm as `0x${string}`;

      // Make sure share token name/symbol are unique per deployer
      const salt = currentDeployerAddress + shareTokenName + shareTokenSymbol;

      const vaultDetails = {
        stakingToken: stakingTokenAddress,
        shareTokenName,
        shareTokenSymbol,
        vaultRewardController: currentDeployerAddress,
        feeConfigController: currentDeployerAddress,
      };

      const feeConfig = {
        receiver: currentDeployerAddress,
        token: rewardTokenAddress,
        feePercentage: BigInt(feePercentage),
      };

      const deployResult = await writeVaultFactoryDeployVault(
        walletInterface as WalletInterface,
        {
          args: [salt, vaultDetails, feeConfig],
          value: ethers.parseUnits(DEPLOY_VALUE, 18),
        },
      );

      //@TODO clear query cache for the list of vaults
      return deployResult;
    },
  });
}
