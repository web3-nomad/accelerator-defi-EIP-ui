import { useMutation } from "@tanstack/react-query";
import {
  requiresNftModuleAddress,
  writeModularComplianceCallModuleFunction,
} from "@/services/contracts/wagmiGenActions";
import { useWalletInterface } from "@/services/wallets/useWalletInterface";
import { WalletInterface } from "@/services/wallets/walletInterface";
import { ethers } from "ethers";

export function useCallModuleFunction() {
  const { walletInterface } = useWalletInterface();

  return useMutation({
    mutationFn: ({ nftAddress, modularComplianceAddress }: any) => {
      const requiresNftModuleCall = new ethers.Interface([
        "function requireNFT(address _nftAddress)",
      ]).encodeFunctionData("requireNFT", [nftAddress]) as `0x${string}`;

      return writeModularComplianceCallModuleFunction(
        walletInterface as WalletInterface,
        { args: [requiresNftModuleCall, requiresNftModuleAddress] },
        modularComplianceAddress.toString(),
      );
    },
  });
}
