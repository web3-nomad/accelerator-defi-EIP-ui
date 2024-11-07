import { useWalletInterface } from "@/services/wallets/useWalletInterface";
import { useMutation } from "@tanstack/react-query";
import { writeTrexGatewayDeployTrexSuite } from "@/services/contracts/wagmiGenActions";
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
      complianceModules,
      complianceSettings,
    }: DeployTokenRequest) => {
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
        complianceModules,
        complianceSettings,
      };

      // claims are not needed right now
      const claims = {
        topics: [],
        issuers: [],
        issuerClaims: [],
      };

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
