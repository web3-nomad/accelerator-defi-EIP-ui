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
  EthereumTransaction,
} from "@hashgraph/sdk";

import { HashconnectContext } from "../../../contexts/HashconnectContext";
import { WalletInterface } from "../walletInterface";
import { ContractFunctionParameterBuilder } from "../contractFunctionParameterBuilder";
import { formatRawTxId } from "../../util/helpers";
import { estimateGas } from "../estimateGas";
import { ethers } from "ethers";

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
  async getEvmAccountAddress(accountId: AccountId) {
    const response: any = await fetch(
      "https://testnet.mirrornode.hedera.com/api/v1/accounts/" +
        accountId.toString(),
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      },
    );
    const responseJson = await response.json();
    return responseJson.evm_address;
  }

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
  async executeContractWriteFunction(
    contractId: ContractId,
    abi: readonly any[],
    functionName: string,
    functionParameters: ContractFunctionParameterBuilder,
    gasLimit: number | undefined,
  ) {
    const accountId = hashConnect.connectedAccountIds[0];
    const hashConnectSigner = hashConnect.getSigner(accountId);
    if (!hashConnectSigner) {
      return null;
    }
    const evmAddress = await this.getEvmAccountAddress(
      AccountId.fromString(accountId.toString()),
    );

    let gasLimitFinal = gasLimit;
    if (!gasLimitFinal) {
      const res = await estimateGas(
        evmAddress,
        contractId,
        abi,
        functionName,
        functionParameters.buildEthersParams(),
      );
      if (res.result) {
        gasLimitFinal = parseInt(res.result, 16);
      } else {
        throw res._status?.messages?.[0]?.detail;
      }
    }

    const contractInterface = new ethers.Interface(abi as []);
    const data = contractInterface.encodeFunctionData(
      functionName,
      functionParameters.buildEthersParams(),
    );

    const tx = new ContractExecuteTransaction()
      .setContractId(contractId)
      .setGas(gasLimitFinal)
      .setFunctionParameters(
        new Uint8Array(Buffer.from(data.substring(2), "hex")),
      );

    const txFrozen = await tx.freezeWithSigner(hashConnectSigner as any);
    await txFrozen.executeWithSigner(hashConnectSigner as any);

    const txId = txFrozen.transactionId?.toString();
    return txId ? formatRawTxId(txId) : null;
  }

  disconnect() {
    hashConnect.disconnect();
  }

  async deployContract(deployParams: any[], abi: any) {
    console.log("implement deployContract for hashconnect client");
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
  const { setAccountId, setAccountEvm, setIsConnected, setIsAvailable } =
    useContext(HashconnectContext);

  // sync the hashconnect state with the context
  const syncWithHashConnect = useCallback(() => {
    if (localStorage.getItem(bladeLocalStorage) !== "true") {
      const accountId = hashConnect.connectedAccountIds[0]?.toString();

      if (accountId) {
        setAccountId(accountId);
        hashConnectWallet
          .getEvmAccountAddress(AccountId.fromString(accountId as string))
          .then((res) => {
            setAccountEvm(res);
          });
        setIsConnected(true);
      } else {
        setAccountId("");
        setAccountEvm("");
        setIsConnected(false);
      }
    }
    setIsAvailable(true);
  }, [setAccountId, setAccountEvm, setIsConnected, setIsAvailable]);

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
