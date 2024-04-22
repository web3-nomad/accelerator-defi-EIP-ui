import { useWalletInterface } from "@/services/wallets/useWalletInterface";
import { useMutation } from "@tanstack/react-query";
import { writeTrexGatewayDeployTrexSuite } from "@/services/contracts/wagmiGenActions";
import { convertAccountIdToSolidityAddress } from "@/services/util/helpers";
import { AccountId } from "@hashgraph/sdk";
import { hederaTestnet } from "wagmi/chains";
import { WalletInterface } from "@/services/wallets/walletInterface";
import { ethers } from "ethers";

type DeployTokenRequest = {
  name: string;
  symbol: string;
  decimals: number;
};

export function useDeployToken() {
  const { accountId, walletName, walletInterface } = useWalletInterface();

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

      const currentDeployerAddress =
        await walletInterface?.getEvmAccountAddress(
          AccountId.fromString(accountId as string),
        );

      if (!currentDeployerAddress) return null;

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
        {
          args: [tokenDetails, claimsDetails],
          account: convertAccountIdToSolidityAddress(
            AccountId.fromString(accountId as string),
          ),
          chain: hederaTestnet,
        },
      );
      return deployResult;
    },
  });
}
