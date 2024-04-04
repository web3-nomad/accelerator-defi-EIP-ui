"use client";

import { useCallback, useContext, useEffect, useState } from "react";
import {
  BladeConnector,
  ConnectorStrategy,
  HederaNetwork,
} from "@bladelabs/blade-web3.js";
import {
  AccountId,
  ContractExecuteTransaction,
  ContractId,
  TokenAssociateTransaction,
  TokenId,
  TransferTransaction,
} from "@hashgraph/sdk";

import EventEmitter from "events";

import { BladeContext } from "../../../contexts/BladeContext";
import { WalletInterface } from "../walletInterface";
import { ContractFunctionParameterBuilder } from "../contractFunctionParameterBuilder";

const bladeLocalStorage = "usedBladeForWalletPairing";

let bladeConnector: BladeConnector;

// We need an event emitter to trigger syncWithBladeSession and syncWithBladeDisconnected
// from outside of the BladeClient component.
//
// The BladeWallet.disconnect() method fires the syncDisconnect event, which triggers
// the syncWithBladeDisconnected callback in the BladeClient component.
//
// The connectToBladeWallet() function fires the syncSession event, which triggers
// the syncWithBladeSession callback in the BladeClient component.
const syncWithBladeEvent = new EventEmitter();

class BladeWallet implements WalletInterface {
  async transferHBAR(toAddress: AccountId, amount: number) {
    const bladeSigner = bladeConnector.getSigners()[0];
    if (!bladeSigner) {
      return null;
    }

    const transaction = new TransferTransaction({
      hbarTransfers: [
        {
          accountId: toAddress,
          amount: amount,
        },
        {
          accountId: bladeSigner.getAccountId().toString(),
          amount: -amount,
        },
      ],
    });

    const populatedTransaction = await bladeSigner.populateTransaction(
      transaction as any,
    );
    const signedTransaction = await bladeSigner.signTransaction(
      populatedTransaction.freeze(),
    );
    const result = await bladeSigner.call(signedTransaction);
    return result as any;
  }

  async transferFungibleToken(
    toAddress: AccountId,
    tokenId: TokenId,
    amount: number,
  ) {
    const bladeSigner = bladeConnector.getSigners()[0];
    if (!bladeSigner) {
      return null;
    }

    const transferTokenTransaction = await new TransferTransaction()
      .addTokenTransfer(tokenId, bladeSigner.getAccountId().toString(), -amount)
      .addTokenTransfer(tokenId, toAddress, amount)
      .freezeWithSigner(bladeSigner as any);

    const transactionId = await transferTokenTransaction
      .executeWithSigner(bladeSigner as any)
      .then((txResult) => txResult.transactionId)
      .catch((error) => {
        console.log(error.message ? error.message : error);
        return null;
      });
    return transactionId;
  }

  async transferNonFungibleToken(
    toAddress: AccountId,
    tokenId: TokenId,
    serialNumber: number,
  ) {
    const bladeSigner = bladeConnector.getSigners()[0];
    if (!bladeSigner) {
      return null;
    }

    const transferTokenTransaction = await new TransferTransaction()
      .addNftTransfer(
        tokenId,
        serialNumber,
        bladeSigner.getAccountId().toString(),
        toAddress,
      )
      .freezeWithSigner(bladeSigner as any);

    const transactionId = await transferTokenTransaction
      .executeWithSigner(bladeSigner as any)
      .then((txResult) => txResult.transactionId)
      .catch((error) => {
        console.log(error.message ? error.message : error);
        return null;
      });
    return transactionId;
  }

  async associateToken(tokenId: TokenId) {
    const bladeSigner = bladeConnector.getSigners()[0];
    if (!bladeSigner) {
      return null;
    }

    const associateTokenTransaction = await new TokenAssociateTransaction()
      .setAccountId(bladeSigner.getAccountId().toString())
      .setTokenIds([tokenId])
      .freezeWithSigner(bladeSigner as any);

    const transactionId = await associateTokenTransaction
      .executeWithSigner(bladeSigner as any)
      .then((txResult) => txResult.transactionId)
      .catch((error) => {
        console.log(error.message ? error.message : error);
        return null;
      });
    return transactionId;
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
    const bladeSigner = bladeConnector.getSigners()[0];
    if (!bladeSigner) {
      return null;
    }

    console.log("contractId", contractId);
    console.log("bladeSigner", bladeSigner);

    // Grab the topic and account to sign from the last pairing event
    const tx = new ContractExecuteTransaction()
      .setContractId(contractId)
      .setGas(gasLimit)
      .setFunction(functionName, functionParameters.buildHAPIParams());

    console.log("tx", tx);

    const populatedTransaction = await bladeSigner.populateTransaction(
      tx as any,
    );
    const signedTransaction = await bladeSigner.signTransaction(
      tx.freeze() as any,
    );

    return null;

    // const txFrozen = await tx.freeze();
    // console.log('txF', txFrozen);

    // const transactionId = await bladeSigner.call();
    // // const transactionId = await txFrozen
    // //   .execute()
    // //   .then((txResult) => txResult.transactionId)
    // //   .catch((error) => {
    // //     console.log(error.message ? error.message : error);
    // //     return null;
    // //   });

    // // in order to read the contract call results, you will need to query the contract call's results form a mirror node using the transaction id
    // // after getting the contract call results, use ethers and abi.decode to decode the call_result
    // return transactionId;
  }

  disconnect() {
    syncWithBladeEvent.emit("syncDisconnect");
    bladeConnector.killSession();
    localStorage.removeItem(bladeLocalStorage);
  }
}
export const bladeWallet = new BladeWallet();

export const connectToBladeWallet = async (
  skipKillSession: boolean = false,
) => {
  try {
    if (!skipKillSession) {
      await bladeConnector.killSession(); // kill any existing session to allow pairing a new account
    }
    await bladeConnector.createSession({
      network:
        (process.env.NEXT_PUBLIC_WALLET_DEFI_NETWORK as HederaNetwork) ||
        "testnet",
    });
    syncWithBladeEvent.emit("syncSession");
    localStorage.setItem(bladeLocalStorage, "true");
  } catch (e: any) {
    console.log("connectToBladeWallet error", e);
  }
};

const bladeConnectorInitPromise = new Promise(async (resolve, reject) => {
  try {
    const initResult: BladeConnector = await BladeConnector.init(
      ConnectorStrategy.EXTENSION, // Use Blade extension exclusively for this adapter
      {
        name: process.env.NEXT_PUBLIC_WALLET_DEFI_APP_NAME as string,
        description: process.env
          .NEXT_PUBLIC_WALLET_DEFI_APP_DESCRIPTION as string,
        icons: [process.env.NEXT_PUBLIC_WALLET_DEFI_APP_ICON as string],
        url: process.env.NEXT_PUBLIC_WALLET_DEFI_APP_URL as string,
      },
    );
    resolve(initResult);
  } catch (_: any) {
    reject();
  }
});

export const BladeClient = () => {
  const [usedBlade, setUsedBlade] = useState(false);

  // use the BladeContext to keep track of the hashpack account and connection
  const { setAccountId, setIsConnected, setIsAvailable } =
    useContext(BladeContext);

  // sync with blade state with the context so the context is aware of connected account id
  const syncWithBladeSession = useCallback(() => {
    try {
      const bladeSigner = bladeConnector.getSigners()[0];
      if (bladeSigner) {
        const accountId = bladeSigner.getAccountId();
        setAccountId(accountId.toString());
        setIsConnected(true);
        bladeConnector.onSessionDisconnect(() => {
          setAccountId("");
          setIsConnected(false);
        });
      } else {
        setAccountId("");
        setIsConnected(false);
      }
    } catch (error) {
      setAccountId("");
      setIsConnected(false);
    }
  }, [setIsConnected, setAccountId]);

  const syncWithBladeDisconnected = useCallback(() => {
    setAccountId("");
    setIsConnected(false);
  }, [setIsConnected, setAccountId]);

  // sync the blade state with the context
  useEffect(() => {
    try {
      const sessionCallback = () => {
        syncWithBladeSession();
      };
      const disconnectCallback = () => {
        syncWithBladeDisconnected();
      };

      bladeConnectorInitPromise.then(
        (resolveResult) => {
          bladeConnector = resolveResult as BladeConnector;
          setIsAvailable(true);
          syncWithBladeSession();
          if (usedBlade) {
            connectToBladeWallet(true);
          }
        },
        () => {
          // no extension was found => make sure it's disabled
          setIsAvailable(false);
        },
      );

      syncWithBladeEvent.on("syncSession", sessionCallback);
      syncWithBladeEvent.on("syncDisconnect", disconnectCallback);

      return () => {
        syncWithBladeEvent.off("syncSession", sessionCallback);
        syncWithBladeEvent.off("syncDisconnect", disconnectCallback);
      };
    } catch (_) {}
  }, [
    syncWithBladeSession,
    syncWithBladeDisconnected,
    usedBlade,
    setIsAvailable,
  ]);

  useEffect(() => {
    setUsedBlade(localStorage.getItem(bladeLocalStorage) === "true");
  }, []);

  return null;
};
