import {
  HashConnect,
  HashConnectConnectionState,
  SessionData,
} from "hashconnect";
import { LedgerId } from "@hashgraph/sdk";

import { HashconnectContext } from "../../../contexts/HashconnectContext";
import { useCallback, useContext, useEffect } from "react";
import { WalletInterface } from "../walletInterface";
import {
  AccountId,
  ContractExecuteTransaction,
  ContractId,
  TokenAssociateTransaction,
  TokenId,
  TransferTransaction,
} from "@hashgraph/sdk";
import { ContractFunctionParameterBuilder } from "../contractFunctionParameterBuilder";
import { appConfig } from "../../../config";

const currentNetworkConfig = appConfig.networks.testnet;
const hederaNetwork = currentNetworkConfig.network;

const appMetadata = {
  name: process.env.WALLET_DEFI_APP_NAME as string,
  description: process.env.WALLET_DEFI_APP_DESCRIPTION as string,
  icons: [process.env.WALLET_DEFI_APP_ICON as string],
  url: process.env.WALLET_DEFI_APP_URL as string,
};

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID as string;
// TODO: move all setup to config
export const hashConnect = new HashConnect(
  LedgerId.TESTNET,
  projectId,
  appMetadata,
);

class HashConnectWallet implements WalletInterface {
  private getSigner() {
    // const pairingData =
    //   hashConnect.hcData.pairingData[hashConnect.hcData.pairingData.length - 1];
    // const provider = hashConnect.getProvider(
    //   hederaNetwork,
    //   pairingData.topic,
    //   pairingData.accountIds[0],
    // );
    // return hashConnect.getSigner(provider);
    return null;
  }

  async transferHBAR(toAddress: AccountId, amount: number) {
    // // Grab the topic and account to sign from the last pairing event
    // const signer = this.getSigner();

    // const transferHBARTransaction = await new TransferTransaction()
    //   .addHbarTransfer(signer.getAccountId(), -amount)
    //   .addHbarTransfer(toAddress, amount)
    //   .freezeWithSigner(signer);

    // const txResult = await transferHBARTransaction.executeWithSigner(signer);
    // return txResult.transactionId;
    return null;
  }

  async transferFungibleToken(
    toAddress: AccountId,
    tokenId: TokenId,
    amount: number,
  ) {
    // // Grab the topic and account to sign from the last pairing event
    // const signer = this.getSigner();

    // const transferTokenTransaction = await new TransferTransaction()
    //   .addTokenTransfer(tokenId, signer.getAccountId(), -amount)
    //   .addTokenTransfer(tokenId, toAddress, amount)
    //   .freezeWithSigner(signer);

    // const txResult = await transferTokenTransaction.executeWithSigner(signer);
    // return txResult.transactionId;
    return null;
  }

  async transferNonFungibleToken(
    toAddress: AccountId,
    tokenId: TokenId,
    serialNumber: number,
  ) {
    // // Grab the topic and account to sign from the last pairing event
    // const signer = this.getSigner();

    // const transferTokenTransaction = await new TransferTransaction()
    //   .addNftTransfer(tokenId, serialNumber, signer.getAccountId(), toAddress)
    //   .freezeWithSigner(signer);

    // const txResult = await transferTokenTransaction.executeWithSigner(signer);
    // return txResult.transactionId;
    return null;
  }

  async associateToken(tokenId: TokenId) {
    // const signer = this.getSigner();

    // const associateTokenTransaction = await new TokenAssociateTransaction()
    //   .setAccountId(signer.getAccountId())
    //   .setTokenIds([tokenId])
    //   .freezeWithSigner(signer);

    // const txResult = await associateTokenTransaction.executeWithSigner(signer);
    // return txResult.transactionId;
    return null;
  }

  // Purpose: build contract execute transaction and send to hashconnect for signing and execution
  // Returns: Promise<TransactionId | null>
  async executeContractFunction(
    contractId: ContractId,
    functionName: string,
    functionParameters: ContractFunctionParameterBuilder,
    gasLimit: number,
  ) {
    // // Grab the topic and account to sign from the last pairing event
    // const pairingData =
    //   hashConnect.hcData.pairingData[hashConnect.hcData.pairingData.length - 1];

    // const provider = hashConnect.getProvider(
    //   hederaNetwork,
    //   pairingData.topic,
    //   pairingData.accountIds[0],
    // );
    // const signer = hashConnect.getSigner(provider);

    // const tx = new ContractExecuteTransaction()
    //   .setContractId(contractId)
    //   .setGas(gasLimit)
    //   .setFunction(functionName, functionParameters.buildHAPIParams());

    // const txFrozen = await tx.freezeWithSigner(signer);
    // await txFrozen.executeWithSigner(signer);

    // // in order to read the contract call results, you will need to query the contract call's results form a mirror node using the transaction id
    // // after getting the contract call results, use ethers and abi.decode to decode the call_result
    // return txFrozen.transactionId;
    return null;
  }
  disconnect() {
    hashConnect.disconnect();
  }
}
export const hashConnectWallet = new HashConnectWallet();

// set the necessary metadata for your app
// call hashconnects init function which will return your pairing code & any previously connected pariaings
// this will also start the pairing event listener
const hashConnectInitPromise = new Promise(async (resolve) => {
  const initResult = await hashConnect.init();

  resolve(initResult);
});

// this component will sync the hashconnect state with the context
export const HashConnectClient = () => {
  // use the HashpackContext to keep track of the hashpack account and connection
  const { setAccountId, setIsConnected } = useContext(HashconnectContext);

  // sync the hashconnect state with the context
  const syncWithHashConnect = useCallback(() => {
    const accountId = hashConnect.connectedAccountIds[0]?.toString();
    if (accountId) {
      setAccountId(accountId);
      setIsConnected(true);
    } else {
      setAccountId("");
      setIsConnected(false);
    }
  }, [setAccountId, setIsConnected]);

  useEffect(() => {
    // when the component renders, sync the hashconnect state with the context
    syncWithHashConnect();
    // when hashconnect is initialized, sync the hashconnect state with the context
    hashConnectInitPromise.then(() => {
      syncWithHashConnect();
    });

    // when pairing an account, sync the hashconnect state with the context
    hashConnect.pairingEvent.on(syncWithHashConnect);

    // when the connection status changes, sync the hashconnect state with the context
    hashConnect.connectionStatusChangeEvent.on(syncWithHashConnect);

    return () => {
      // remove the event listeners when the component unmounts
      hashConnect.pairingEvent.off(syncWithHashConnect);
      hashConnect.connectionStatusChangeEvent.off(syncWithHashConnect);
    };
  }, [syncWithHashConnect]);
  return null;
};
