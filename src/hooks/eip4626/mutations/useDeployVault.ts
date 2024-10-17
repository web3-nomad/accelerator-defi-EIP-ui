import { useWalletInterface } from "@/services/wallets/useWalletInterface";
import { useMutation } from "@tanstack/react-query";
import { writeVaultFactoryDeployVault } from "@/services/contracts/wagmiGenActions";
import { WalletInterface } from "@/services/wallets/walletInterface";
import { DeployVaultRequest } from "@/types/types";
import { useDeployValueSafeTx } from "@/hooks/useDeployValueSafeTx";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

const MIN_ACCEPTED_DEPLOY_VALUE_IN_USD = 0.9;

export function useDeployVault() {
  const { accountEvm, walletInterface } = useWalletInterface();

  const [isTxError, setIsTxError] = useState(false);

  const { currentDeployValue, currentDeployValueParsed } = useDeployValueSafeTx(
    "hedera-hashgraph",
    "usd",
    MIN_ACCEPTED_DEPLOY_VALUE_IN_USD,
    isTxError,
  );

  const mutation = useMutation({
    mutationFn: async ({
      stakingTokenAddress,
      shareTokenName,
      shareTokenSymbol,
      rewardTokenAddress,
      feePercentage,
      feeReceiverAddress,
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
        receiver: feeReceiverAddress,
        token: rewardTokenAddress,
        feePercentage: BigInt(feePercentage),
      };

      const deployResult = await writeVaultFactoryDeployVault(
        walletInterface as WalletInterface,
        {
          args: [salt, vaultDetails, feeConfig],
          value: ethers.parseUnits(currentDeployValueParsed, 18),
        },
      );

      //@TODO clear query cache for the list of vaults
      return deployResult;
    },
  });

  useEffect(() => {
    setIsTxError(mutation.isError);
  }, [mutation.isError]);

  return { ...mutation, currentDeployValue, currentDeployValueParsed };
}
