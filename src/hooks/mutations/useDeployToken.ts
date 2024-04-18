import { useWalletInterface } from "@/services/wallets/useWalletInterface";
import { useMutation } from "@tanstack/react-query";
import {
  writeTrexFactoryDeployTrexSuite,
  writeTrexGateway,
  writeTrexGatewayDeployTrexSuite,
} from "@/services/contracts/wagmiGenActions";
import { convertAccountIdToSolidityAddress } from "@/services/util/helpers";
import { AccountId } from "@hashgraph/sdk";
import { hederaTestnet } from "wagmi/chains";
import { WalletInterface } from "@/services/wallets/walletInterface";
import { ethers } from "ethers";

export function useDeployToken() {
  const { accountId, walletName, walletInterface } = useWalletInterface();

  return useMutation({
    mutationFn: async () => {
      const TOKEN_NAME = "RWA_R_US" + Math.floor(Math.random() * 1000); // unique per deployer
      //      const TOKEN_NAME = "RWA_R_US"; // unique per deployer
      const TOKEN_SYMBOL = "RWARUS";
      const TOKEN_DECIMALS = 8;

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

      console.log("L25 currentDeployerAddress ===", currentDeployerAddress);

      if (!currentDeployerAddress) return null;

      const tokenDetails = {
        owner: currentDeployerAddress,
        name: TOKEN_NAME,
        symbol: TOKEN_SYMBOL,
        decimals: TOKEN_DECIMALS,
        irs: ethers.ZeroAddress as `0x${string}`, // IdentityRegistryStorage
        ONCHAINID: ethers.ZeroAddress as `0x${string}`, // Identity for the token
        irAgents: [currentDeployerAddress],
        tokenAgents: [currentDeployerAddress],
        complianceModules: compliance.modules,
        complianceSettings: compliance.settings,
      };

      console.log("L16 tokenDetails ===", tokenDetails);

      const claimsDetails = {
        claimTopics: claims.topics,
        issuers: claims.issuers,
        issuerClaims: claims.issuerClaims,
      };

      console.log("L16 claimsDetails ===", claimsDetails);

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

      console.log("L72 deployResult ===", deployResult);
    },
    onSuccess: (data, variables, context) => {
      console.log("L10 onSuccess data ===", data);
    },
  });
}
