import { useWalletInterface } from "@/services/wallets/useWalletInterface";
import { useMutation } from "@tanstack/react-query";
import { writeTrexGatewayDeployTrexSuite } from "@/services/contracts/wagmiGenActions";
import { AccountId } from "@hashgraph/sdk";
import { WalletInterface } from "@/services/wallets/walletInterface";
import { ethers } from "ethers";
import { DeployTokenRequest } from "@/types/types";

export function useDeployToken() {
  const { accountEvm, walletInterface } = useWalletInterface();

  return useMutation({
    mutationFn: async ({ name, symbol, decimals }: DeployTokenRequest) => {
      // admin should be able to select the desired compliance module to include in the token
      const compliance = {
        modules: [],
        settings: [],
      };

      // claims are not needed right now
      const claims = {
        topics: [],
        issuers: [],
        issuerClaims: [],
      };
      const currentDeployerAddress = accountEvm as `0x${string}`;
      const tokenDetails = {
        owner: currentDeployerAddress,
        name,
        symbol,
        decimals,
        irs: ethers.ZeroAddress as `0x${string}`, // IdentityRegistryStorage
        ONCHAINID: ethers.ZeroAddress as `0x${string}`, // Identity for the token
        irAgents: [currentDeployerAddress],
        tokenAgents: [currentDeployerAddress],
        complianceModules: compliance.modules,
        complianceSettings: compliance.settings,
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
