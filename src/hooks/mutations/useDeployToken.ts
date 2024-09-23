import { useWalletInterface } from "@/services/wallets/useWalletInterface";
import { useMutation } from "@tanstack/react-query";
import {
  requiresNftModuleAddress,
  writeTrexGatewayDeployTrexSuite,
} from "@/services/contracts/wagmiGenActions";
import { WalletInterface } from "@/services/wallets/walletInterface";
import { ethers } from "ethers";
import { DeployTokenRequest, EvmAddress } from "@/types/types";

export function useDeployToken() {
  const { accountEvm, walletInterface } = useWalletInterface();

  return useMutation({
    mutationFn: async ({
      name,
      symbol,
      decimals,
      nftAddress,
      complianceModules,
      complianceSettings,
    }: DeployTokenRequest) => {
      // admin should be able to select the desired compliance module to include in the token
      let compliance = {
        modules: [] as `0x${string}`[],
        settings: [] as `0x${string}`[],
      };
      //@TODO select with compliance modules

      //@TODO make a function to build the settings for respective selected module
      // Sample compliance support using requireNFT (optional)
      if (nftAddress) {
        const requiresNftModuleCall = new ethers.Interface([
          "function requireNFT(address _nftAddress)",
        ]).encodeFunctionData("requireNFT", [nftAddress]) as `0x${string}`;
        compliance.modules.push(requiresNftModuleAddress);
        compliance.settings.push(requiresNftModuleCall);
      }

      // claims are not needed right now
      const claims = {
        topics: [],
        issuers: [],
        issuerClaims: [],
      };
      const currentDeployerAddress = accountEvm as EvmAddress;
      const tokenDetails = {
        owner: currentDeployerAddress,
        name,
        symbol,
        decimals,
        irs: ethers.ZeroAddress as EvmAddress, // IdentityRegistryStorage
        ONCHAINID: ethers.ZeroAddress as EvmAddress, // Identity for the token
        irAgents: [currentDeployerAddress],
        tokenAgents: [currentDeployerAddress],
        // complianceModules: compliance.modules,
        complianceModules,
        // complianceSettings: compliance.settings,
        complianceSettings,
      };

      console.log("L63 tokenDetails ===", tokenDetails);

      // return;

      const claimsDetails = {
        claimTopics: claims.topics,
        issuers: claims.issuers,
        issuerClaims: claims.issuerClaims,
      };

      const deployResult = await writeTrexGatewayDeployTrexSuite(
        walletInterface as WalletInterface,
        { args: [tokenDetails, claimsDetails] },
      );
      return deployResult;
    },
  });
}
