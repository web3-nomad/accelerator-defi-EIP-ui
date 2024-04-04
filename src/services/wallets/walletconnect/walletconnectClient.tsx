"use client";

// TODO: migrate transactions if needed https://docs.ethers.org/v6/migrating/

import { ContractId, AccountId } from "@hashgraph/sdk";
import { TokenId } from "@hashgraph/sdk";
import { ethers } from "ethers";
import { useContext, useEffect } from "react";
import { appConfig } from "@/config";
import { MetamaskContext } from "@/contexts/MetamaskContext";
import { ContractFunctionParameterBuilder } from "../contractFunctionParameterBuilder";
import { WalletInterface } from "../walletInterface";
import { WalletConnectContext } from "@/contexts/WalletConnectContext";
import { useWeb3ModalProvider } from "@web3modal/ethers/react";
import { hederaTestnet } from "wagmi/chains";

const currentNetworkConfig = appConfig.networks.testnet;

import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";

//@TODO grab from env
// 1. Get projectId at https://cloud.walletconnect.com
const projectId = "160b1b32c0b6b0227b9bcf341a9fdd0a";

// 2. Set chains
const mainnet = {
  chainId: 1,
  name: "Ethereum",
  currency: "ETH",
  explorerUrl: "https://etherscan.io",
  rpcUrl: "https://cloudflare-eth.com",
};

const hederaTestnetConfigWC = {
  chainId: hederaTestnet.id,
  name: hederaTestnet.name,
  currency: hederaTestnet.nativeCurrency.name,
  explorerUrl: hederaTestnet.blockExplorers.default.url,
  rpcUrl: hederaTestnet.rpcUrls.default.http[0],
};

// 3. Create a metadata object
const metadata = {
  name: "My Website",
  description: "My Website description",
  url: "https://mywebsite.com", // origin must match your domain & subdomain
  icons: ["https://avatars.mywebsite.com/"],
};

// 4. Create Ethers config
const ethersConfig = defaultConfig({
  /*Required*/
  metadata,

  /*Optional*/
  enableEIP6963: true, // true by default
  enableInjected: true, // true by default
  enableCoinbase: true, // true by default
  rpcUrl: "...", // used for the Coinbase SDK
  defaultChainId: 1, // used for the Coinbase SDK
});

// 5. Create a Web3Modal instance
createWeb3Modal({
  ethersConfig,
  // chains: [mainnet],
  chains: [hederaTestnetConfigWC],
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: true, // Optional - false as default
});

export const switchToHederaNetwork = async (ethereum: any) => {
  try {
    await ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: currentNetworkConfig.chainId }], // chainId must be in hexadecimal numbers
    });
  } catch (error: any) {
    if (error.code === 4902) {
      try {
        await ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainName: `Hedera (${currentNetworkConfig.network})`,
              chainId: currentNetworkConfig.chainId,
              nativeCurrency: {
                name: "HBAR",
                symbol: "HBAR",
                decimals: 18,
              },
              rpcUrls: [currentNetworkConfig.jsonRpcUrl],
            },
          ],
        });
      } catch (addError) {
        console.error(addError);
      }
    }
    console.error(error);
  }
};

//@TODO find a way to use provider from web3wallet
//const { walletProvider } = useWeb3ModalProvider();
//const provider = new ethers.BrowserProvider(walletProvider);
const getProvider = () => {
  if (!window.ethereum) {
    throw new Error("Metamask is not installed! Go install the extension!");
  }

  return new ethers.BrowserProvider(window.ethereum);
};

// returns a list of accounts
// otherwise empty array
export const connectToWalletConnect = async () => {
  const provider = getProvider();
  // keep track of accounts returned
  let accounts: string[] = [];

  try {
    await switchToHederaNetwork(window.ethereum);
    accounts = await provider.send("eth_requestAccounts", []);
  } catch (error: any) {
    if (error.code === 4001) {
      // EIP-1193 userRejectedRequest error
      console.warn("Please connect to Metamask.");
    } else {
      console.error(error);
    }
  }

  return accounts;
};

//
class WalletConnectWallet implements WalletInterface {
  private convertAccountIdToSolidityAddress(accountId: AccountId): string {
    const accountIdString =
      accountId.evmAddress !== null
        ? accountId.evmAddress.toString()
        : accountId.toSolidityAddress();

    return `0x${accountIdString}`;
  }

  // Purpose: Transfer HBAR
  // Returns: Promise<string>
  // Note: Use JSON RPC Relay to search by transaction hash
  async transferHBAR(toAddress: AccountId, amount: number) {
    const provider = getProvider();
    const signer = await provider.getSigner();
    // build the transaction
    const tx = await signer.populateTransaction({
      to: this.convertAccountIdToSolidityAddress(toAddress),
      value: ethers.parseEther(amount.toString()),
    });
    try {
      // send the transaction
      const { hash } = await signer.sendTransaction(tx);
      await provider.waitForTransaction(hash);

      return hash;
    } catch (error: any) {
      console.warn(error.message ? error.message : error);
      return null;
    }
  }

  async transferFungibleToken(
    toAddress: AccountId,
    tokenId: TokenId,
    amount: number,
  ) {
    const hash = await this.executeContractWriteFunction(
      ContractId.fromString(tokenId.toString()),
      "transfer",
      new ContractFunctionParameterBuilder()
        .addParam({
          type: "address",
          name: "recipient",
          value: this.convertAccountIdToSolidityAddress(toAddress),
        })
        .addParam({
          type: "uint256",
          name: "amount",
          value: amount,
        }),
      appConfig.constants.METAMASK_GAS_LIMIT_TRANSFER_FT,
    );

    return hash;
  }

  async transferNonFungibleToken(
    toAddress: AccountId,
    tokenId: TokenId,
    serialNumber: number,
  ) {
    const provider = getProvider();
    const addresses = await provider.listAccounts();
    const hash = await this.executeContractWriteFunction(
      ContractId.fromString(tokenId.toString()),
      "transferFrom",
      new ContractFunctionParameterBuilder()
        .addParam({
          type: "address",
          name: "from",
          value: addresses[0],
        })
        .addParam({
          type: "address",
          name: "to",
          value: this.convertAccountIdToSolidityAddress(toAddress),
        })
        .addParam({
          type: "uint256",
          name: "nftId",
          value: serialNumber,
        }),
      appConfig.constants.METAMASK_GAS_LIMIT_TRANSFER_NFT,
    );

    return hash;
  }

  async associateToken(tokenId: TokenId) {
    // send the transaction
    // convert tokenId to contract id
    const hash = await this.executeContractWriteFunction(
      ContractId.fromString(tokenId.toString()),
      "associate",
      new ContractFunctionParameterBuilder(),
      appConfig.constants.METAMASK_GAS_LIMIT_ASSOCIATE,
    );

    return hash;
  }

  async executeContractReadFunction(
    contractId: ContractId,
    functionName: string,
    functionParameters: ContractFunctionParameterBuilder,
  ) {
    // TODO
    return null;
  }

  // Purpose: build contract execute transaction and send to hashconnect for signing and execution
  // Returns: Promise<TransactionId | null>
  async executeContractWriteFunction(
    contractId: ContractId,
    functionName: string,
    functionParameters: ContractFunctionParameterBuilder,
    gasLimit: number,
  ) {
    const provider = getProvider();
    const signer = await provider.getSigner();
    const abi = [
      `function ${functionName}(${functionParameters.buildAbiFunctionParams()})`,
    ];

    // create contract instance for the contract id
    // to call the function, use contract[functionName](...functionParameters, ethersOverrides)
    const contract = new ethers.Contract(
      `0x${contractId.toSolidityAddress()}`,
      abi,
      signer,
    );
    try {
      const txResult = await contract[functionName](
        ...functionParameters.buildEthersParams(),
        {
          gasLimit: gasLimit === -1 ? undefined : gasLimit,
        },
      );
      return txResult.hash;
    } catch (error: any) {
      console.warn(error.message ? error.message : error);
      return null;
    }
  }

  disconnect() {
    alert("Please disconnect using the Metamask extension.");
  }
}

export const walletconnectWallet = new WalletConnectWallet();

//
export const WalletConnectClient = () => {
  const { setWalletConnectAccountAddress, setIsAvailable } =
    useContext(WalletConnectContext);

  const { walletProvider } = useWeb3ModalProvider();
  console.log("L60 WalletConnectClient walletProvider ===", walletProvider);

  useEffect(() => {
    // set the account address if already connected
    try {
      // const provider = getProvider();
      if (!walletProvider) {
        console.log("L325 NO WALLET PROVIDER IN EFFECT ===", walletProvider);
        return;
      }

      const provider = new ethers.BrowserProvider(walletProvider);
      console.log("L327 WalletConnectClient provider ===", provider);

      provider.send("eth_requestAccounts", []).then((accounts) => {
        console.log("L342 WalletConnectClient accounts in then ===", accounts);
      });
      setIsAvailable(true);
      provider.listAccounts().then((signers) => {
        console.log("L338 listAccounts then signers ===", signers);
        if (signers.length !== 0) {
          console.log("L331 got signers ===", signers);
          setWalletConnectAccountAddress(signers[0].address);
        } else {
          console.log("L334 no signers :( ===");
          setWalletConnectAccountAddress("");
        }
      });

      // listen for account changes and update the account address
      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        if (accounts.length !== 0) {
          setWalletConnectAccountAddress(accounts[0]);
        } else {
          setWalletConnectAccountAddress("");
        }
      });

      // cleanup by removing listeners
      return () => {
        window.ethereum.removeAllListeners("accountsChanged");
      };
    } catch (_: any) {
      setIsAvailable(false);
    }
  }, [setWalletConnectAccountAddress, setIsAvailable, walletProvider]);

  return null;
};
