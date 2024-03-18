"use client";

import { useCallback, useContext, useEffect } from "react";
import { HashConnect } from "hashconnect";
import {
  LedgerId,
  AccountId,
  ContractExecuteTransaction,
  ContractId,
  TokenAssociateTransaction,
  TokenId,
  TransferTransaction,
  Signer,
} from "@hashgraph/sdk";

import { HashconnectContext } from "../../../contexts/HashconnectContext";
import { WalletInterface } from "../walletInterface";
import { ContractFunctionParameterBuilder } from "../contractFunctionParameterBuilder";

const appMetadata = {
  name: process.env.NEXT_PUBLIC_WALLET_DEFI_APP_NAME as string,
  description: process.env.NEXT_PUBLIC_WALLET_DEFI_APP_DESCRIPTION as string,
  icons: [process.env.NEXT_PUBLIC_WALLET_DEFI_APP_ICON as string],
  url: process.env.NEXT_PUBLIC_WALLET_DEFI_APP_URL as string,
};

export const hashConnect = new HashConnect(
  LedgerId.fromString(
    (process.env.NEXT_PUBLIC_WALLET_DEFI_NETWORK as string) || "testnet",
  ),
  process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID as string,
  appMetadata,
  true,
);

const bladeLocalStorage = "usedBladeForWalletPairing";

class HashConnectWallet implements WalletInterface {
  async transferHBAR(toAddress: AccountId, amount: number) {
    const accountId = hashConnect.connectedAccountIds[0];
    const hashConnectSigner = hashConnect.getSigner(accountId);
    if (!hashConnectSigner) {
      return null;
    }

    const transferHBARTransaction = await new TransferTransaction()
      .addHbarTransfer(accountId.toString(), -amount)
      .addHbarTransfer(toAddress, amount)
      .freezeWithSigner(hashConnectSigner as any);

    const txResult = await transferHBARTransaction.executeWithSigner(
      hashConnectSigner as any,
    );
    return txResult.transactionId;
  }

  async transferFungibleToken(
    toAddress: AccountId,
    tokenId: TokenId,
    amount: number,
  ) {
    const accountId = hashConnect.connectedAccountIds[0];
    const hashConnectSigner = hashConnect.getSigner(accountId);
    if (!hashConnectSigner) {
      return null;
    }

    const transferTokenTransaction = await new TransferTransaction()
      .addTokenTransfer(tokenId, accountId.toString(), -amount)
      .addTokenTransfer(tokenId, toAddress, amount)
      .freezeWithSigner(hashConnectSigner as any);

    const txResult = await transferTokenTransaction.executeWithSigner(
      hashConnectSigner as any,
    );
    return txResult.transactionId;
  }

  async transferNonFungibleToken(
    toAddress: AccountId,
    tokenId: TokenId,
    serialNumber: number,
  ) {
    const accountId = hashConnect.connectedAccountIds[0];
    const hashConnectSigner = hashConnect.getSigner(accountId);
    if (!hashConnectSigner) {
      return null;
    }

    const transferTokenTransaction = await new TransferTransaction()
      .addNftTransfer(tokenId, serialNumber, accountId.toString(), toAddress)
      .freezeWithSigner(hashConnectSigner as any);

    const txResult = await transferTokenTransaction.executeWithSigner(
      hashConnectSigner as any,
    );
    return txResult.transactionId;
  }

  async associateToken(tokenId: TokenId) {
    const accountId = hashConnect.connectedAccountIds[0];
    const hashConnectSigner = hashConnect.getSigner(accountId);
    if (!hashConnectSigner) {
      return null;
    }

    const associateTokenTransaction = await new TokenAssociateTransaction()
      .setAccountId(accountId.toString())
      .setTokenIds([tokenId])
      .freezeWithSigner(hashConnectSigner as any);

    const txResult = await associateTokenTransaction.executeWithSigner(
      hashConnectSigner as any,
    );
    return txResult.transactionId;
  }

  // Purpose: build contract execute transaction and send to hashconnect for signing and execution
  // Returns: Promise<TransactionId | null>
  async executeContractFunction(
    contractId: ContractId,
    functionName: string,
    functionParameters: ContractFunctionParameterBuilder,
    gasLimit: number,
  ) {
    const accountId = hashConnect.connectedAccountIds[0];
    const hashConnectSigner = hashConnect.getSigner(accountId);
    if (!hashConnectSigner) {
      return null;
    }

    const tx = new ContractExecuteTransaction()
      .setContractId(contractId)
      .setGas(gasLimit)
      .setFunction(functionName, functionParameters.buildHAPIParams());

    const txFrozen = await tx.freezeWithSigner(hashConnectSigner as any);
    await txFrozen.executeWithSigner(hashConnectSigner as any);

    // in order to read the contract call results, you will need to query the contract call's results form a mirror node using the transaction id
    // after getting the contract call results, use ethers and abi.decode to decode the call_result
    return txFrozen.transactionId;
  }

  disconnect() {
    hashConnect.disconnect();
  }
}
export const hashConnectWallet = new HashConnectWallet();

export const connectToHashconnectWallet = async () => {
  try {
    localStorage.removeItem(bladeLocalStorage);
    hashConnect.openPairingModal();
  } catch (e: any) {}
};

const hashConnectInitPromise = new Promise(async (resolve) => {
  const initResult = await hashConnect.init();
  resolve(initResult);
});

// this component will sync the hashconnect state with the context
export const HashConnectClient = () => {
  // use the HashpackContext to keep track of the hashpack account and connection
  const { setAccountId, setIsConnected, setIsAvailable } =
    useContext(HashconnectContext);

  // sync the hashconnect state with the context
  const syncWithHashConnect = useCallback(() => {
    if (localStorage.getItem(bladeLocalStorage) !== "true") {
      const accountId = hashConnect.connectedAccountIds[0]?.toString();

      if (accountId) {
        setAccountId(accountId);
        setIsConnected(true);
      } else {
        setAccountId("");
        setIsConnected(false);
      }
    }
    setIsAvailable(true);
  }, [setAccountId, setIsConnected, setIsAvailable]);

  useEffect(() => {
    syncWithHashConnect();
    // when hashconnect is initialized, sync the hashconnect state with the context
    hashConnectInitPromise.then(() => {
      syncWithHashConnect();
    });
    hashConnect.pairingEvent.on(() => {
      syncWithHashConnect();
    });
    hashConnect.disconnectionEvent.on(() => {
      syncWithHashConnect();
    });
    hashConnect.connectionStatusChangeEvent.on(() => {
      syncWithHashConnect();
    });
  }, [syncWithHashConnect]);
  return null;
};
