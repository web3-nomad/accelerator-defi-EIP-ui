"use client";

// TODO: migrate transactions if needed https://docs.ethers.org/v6/migrating/

import { ContractId, AccountId } from "@hashgraph/sdk";
import { TokenId } from "@hashgraph/sdk";
import { ethers } from "ethers";
import { useContext, useEffect } from "react";
import { appConfig } from "@/config";
import { ContractFunctionParameterBuilder } from "../contractFunctionParameterBuilder";
import { WalletInterface } from "../walletInterface";
import { WalletConnectContext } from "@/contexts/WalletConnectContext";
import { useWeb3ModalProvider } from "@web3modal/ethers/react";
import { hederaTestnet } from "wagmi/chains";
import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";
import { estimateGas } from "../estimateGas";

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID as string;

// 2. Set chains
//@TODO add mainnet
const hederaTestnetConfigWC = {
  chainId: hederaTestnet.id,
  name: hederaTestnet.name,
  currency: hederaTestnet.nativeCurrency.name,
  explorerUrl: hederaTestnet.blockExplorers.default.url,
  rpcUrl: hederaTestnet.rpcUrls.default.http[0],
};

// TODO: take from .env
// 3. Create a metadata object
const metadata = {
  name: "EIP 3643 POC",
  description: "EIP 3643 POC",
  url: "https://eip.zilbo.com/", // origin must match your domain & subdomain
  icons: ["https://avatars.mywebsite.com/"],
};

// 4. Create Ethers config
const ethersConfig = defaultConfig({
  metadata,
});

// 5. Create a Web3Modal instance
const web3modal = createWeb3Modal({
  ethersConfig,
  chains: [hederaTestnetConfigWC],
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
});

//@TODO find a way to use provider from web3wallet hook inside client functions - is it needed at all?
//const { walletProvider } = useWeb3ModalProvider();
//const provider = new ethers.BrowserProvider(walletProvider);
const getProvider = () => {
  // if (!window.ethereum) {
  //   throw new Error("Metamask is not installed! Go install the extension!");
  // }

  // return new ethers.BrowserProvider(window.ethereum);
  const provider = web3modal.getWalletProvider();
  return provider ? new ethers.BrowserProvider(provider) : undefined;
};

class WalletConnectWallet implements WalletInterface {
  private convertAccountIdToSolidityAddress(accountId: AccountId): string {
    const accountIdString =
      accountId.evmAddress !== null
        ? accountId.evmAddress.toString()
        : accountId.toSolidityAddress();

    return `0x${accountIdString}`;
  }

  async getEvmAccountAddress(accountId: AccountId) {
    return ("0x" + accountId.toSolidityAddress()) as `0x${string}`;
  }

  // Purpose: Transfer HBAR
  // Returns: Promise<string>
  // Note: Use JSON RPC Relay to search by transaction hash
  async transferHBAR(toAddress: AccountId, amount: number) {
    const provider = getProvider();
    if (!provider) return null;
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
      [],
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
      BigInt(0),
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
    if (!provider) return null;
    const addresses = await provider.listAccounts();
    const hash = await this.executeContractWriteFunction(
      ContractId.fromString(tokenId.toString()),
      [],
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
      BigInt(0),
      appConfig.constants.METAMASK_GAS_LIMIT_TRANSFER_NFT,
    );

    return hash;
  }

  async associateToken(tokenId: TokenId) {
    // send the transaction
    // convert tokenId to contract id
    const hash = await this.executeContractWriteFunction(
      ContractId.fromString(tokenId.toString()),
      [],
      "associate",
      new ContractFunctionParameterBuilder(),
      BigInt(0),
      appConfig.constants.METAMASK_GAS_LIMIT_ASSOCIATE,
    );

    return hash;
  }

  // Purpose: build contract execute transaction and send to hashconnect for signing and execution
  // Returns: Promise<TransactionId | null>
  async executeContractWriteFunction(
    contractId: ContractId,
    abi: readonly any[],
    functionName: string,
    functionParameters: ContractFunctionParameterBuilder,
    value: bigint | undefined,
    gasLimit: number | undefined,
  ) {
    const provider = getProvider();
    if (!provider) return null;
    const signer = await provider.getSigner();

    //let gasLimitFinal = 1000000;
    let gasLimitFinal = gasLimit;
    if (!gasLimitFinal) {
      const res = await estimateGas(
        signer.address,
        contractId,
        abi,
        functionName,
        functionParameters.buildEthersParams(),
        value,
      );
      if (res.result) {
        gasLimitFinal = parseInt(res.result, 16);
      } else {
        throw res._status?.messages?.[0]?.detail;
      }
    }

    // create contract instance for the contract id
    // to call the function, use contract[functionName](...functionParameters, ethersOverrides)
    const contract = new ethers.Contract(
      `0x${contractId.toSolidityAddress()}`,
      abi || [
        // workaround for case when calling outside of wagmi-codegen | no abi present
        `function ${functionName}(${functionParameters.buildAbiFunctionParams()})`,
      ],
      signer,
    );

    try {
      const txResult = await contract[functionName](
        ...functionParameters.buildEthersParams(),
        {
          gasLimit: gasLimitFinal,
          value,
        },
      );
      return txResult.hash;
    } catch (error: any) {
      console.warn(error.message ? error.message : error);
      return null;
    }
  }

  disconnect(functionOverride?: Function) {
    if (functionOverride) {
      functionOverride();
    } else {
      alert("Please disconnect using the Metamask extension.");
    }
  }

  async deployContract(deployParams: any[], abi: any) {
    const provider = getProvider();
    if (!provider) return null;

    const signer = await provider.getSigner();

    const identityCA = new ethers.ContractFactory(
      abi.abi,
      abi.bytecode,
      signer,
    );

    const identity = await identityCA.deploy(...deployParams);

    await identity.waitForDeployment();

    const resultAddress = await identity.getAddress();

    return resultAddress;
  }
}

export const walletconnectWallet = new WalletConnectWallet();

//
export const WalletConnectClient = () => {
  const { setWalletConnectAccountAddress, setIsAvailable } =
    useContext(WalletConnectContext);

  const { walletProvider } = useWeb3ModalProvider();

  useEffect(() => {
    // set the account address if already connected
    try {
      if (!walletProvider) {
        return;
      }

      const provider = new ethers.BrowserProvider(walletProvider);

      provider.send("eth_requestAccounts", []).then((accounts) => {});
      setIsAvailable(true);
      provider.listAccounts().then((signers) => {
        if (signers.length !== 0) {
          setWalletConnectAccountAddress(signers[0].address);
        } else {
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
