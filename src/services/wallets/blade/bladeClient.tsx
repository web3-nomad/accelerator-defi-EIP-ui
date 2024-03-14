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
import { useCallback, useContext, useEffect, useState } from "react";
import { BladeContext } from "../../../contexts/BladeContext";
import { ContractFunctionParameterBuilder } from "../contractFunctionParameterBuilder";
import { WalletInterface } from "../walletInterface";

const env = HederaNetwork.Testnet;
const bladeLocalStorage = "usedBladeForWalletPairing";

const appMetadata = {
  network: env,
  dAppCode: "hederaCraTemplate",
};
//const bladeConnector = new BladeConnector();

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
    // const bladeSigner = bladeConnector.getSigner();
    // if (!bladeSigner) {
    //   return null;
    // }

    // const transferHBARTransaction = await new TransferTransaction()
    //   .addHbarTransfer(bladeSigner.getAccountId().toString(), -amount)
    //   .addHbarTransfer(toAddress, amount)
    //   .freezeWithSigner(bladeSigner);

    // const transactionId = await transferHBARTransaction
    //   .executeWithSigner(bladeSigner)
    //   .then((txResult) => txResult.transactionId)
    //   .catch((error) => {
    //     console.log(error.message ? error.message : error);
    //     return null;
    //   });
    // return transactionId;
    return null;
  }

  async transferFungibleToken(
    toAddress: AccountId,
    tokenId: TokenId,
    amount: number,
  ) {
    // const bladeSigner = bladeConnector.getSigner();
    // if (!bladeSigner) {
    //   return null;
    // }

    // const transferTokenTransaction = await new TransferTransaction()
    //   .addTokenTransfer(tokenId, bladeSigner.getAccountId().toString(), -amount)
    //   .addTokenTransfer(tokenId, toAddress, amount)
    //   .freezeWithSigner(bladeSigner);

    // const transactionId = await transferTokenTransaction
    //   .executeWithSigner(bladeSigner)
    //   .then((txResult) => txResult.transactionId)
    //   .catch((error) => {
    //     console.log(error.message ? error.message : error);
    //     return null;
    //   });
    // return transactionId;
    return null;
  }

  async transferNonFungibleToken(
    toAddress: AccountId,
    tokenId: TokenId,
    serialNumber: number,
  ) {
    // const bladeSigner = bladeConnector.getSigner();
    // if (!bladeSigner) {
    //   return null;
    // }

    // const transferTokenTransaction = await new TransferTransaction()
    //   .addNftTransfer(
    //     tokenId,
    //     serialNumber,
    //     bladeSigner.getAccountId().toString(),
    //     toAddress,
    //   )
    //   .freezeWithSigner(bladeSigner);

    // const transactionId = await transferTokenTransaction
    //   .executeWithSigner(bladeSigner)
    //   .then((txResult) => txResult.transactionId)
    //   .catch((error) => {
    //     console.log(error.message ? error.message : error);
    //     return null;
    //   });
    // return transactionId;
    return null;
  }

  async associateToken(tokenId: TokenId) {
    // const bladeSigner = bladeConnector.getSigner();
    // if (!bladeSigner) {
    //   return null;
    // }

    // const associateTokenTransaction = await new TokenAssociateTransaction()
    //   .setAccountId(bladeSigner.getAccountId().toString())
    //   .setTokenIds([tokenId])
    //   .freezeWithSigner(bladeSigner);

    // const transactionId = await associateTokenTransaction
    //   .executeWithSigner(bladeSigner)
    //   .then((txResult) => txResult.transactionId)
    //   .catch((error) => {
    //     console.log(error.message ? error.message : error);
    //     return null;
    //   });
    // return transactionId;
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
    // const bladeSigner = bladeConnector.getSigner();
    // if (!bladeSigner) {
    //   return null;
    // }

    // // Grab the topic and account to sign from the last pairing event
    // const tx = new ContractExecuteTransaction()
    //   .setContractId(contractId)
    //   .setGas(gasLimit)
    //   .setFunction(functionName, functionParameters.buildHAPIParams());

    // const txFrozen = await tx.freezeWithSigner(bladeSigner);
    // const transactionId = await txFrozen
    //   .executeWithSigner(bladeSigner)
    //   .then((txResult) => txResult.transactionId)
    //   .catch((error) => {
    //     console.log(error.message ? error.message : error);
    //     return null;
    //   });

    // // in order to read the contract call results, you will need to query the contract call's results form a mirror node using the transaction id
    // // after getting the contract call results, use ethers and abi.decode to decode the call_result
    // return transactionId;

    return null;
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
    await bladeConnector.createSession(appMetadata);
    syncWithBladeEvent.emit("syncSession");
    localStorage.setItem(bladeLocalStorage, "true");
  } catch (error) {
    console.log(error);
  }
};

const bladeConnectorInitPromise = new Promise(async (resolve) => {
  const initResult: BladeConnector = await BladeConnector.init(
    ConnectorStrategy.EXTENSION, // Use Blade extension exclusively for this adapter
    {
      name: process.env.WALLET_DEFI_APP_NAME as string,
      description: process.env.WALLET_DEFI_APP_DESCRIPTION as string,
      icons: [process.env.WALLET_DEFI_APP_ICON as string],
      url: process.env.WALLET_DEFI_APP_URL as string,
    },
  );
  resolve(initResult);
});

export const BladeClient = () => {
  const [usedBlade, setUsedBlade] = useState(false);

  // use the BladeContext to keep track of the hashpack account and connection
  const { setAccountId, setIsConnected } = useContext(BladeContext);

  // sync with blade state with the context so the context is aware of connected account id
  const syncWithBladeSession = useCallback(() => {
    try {
      const bladeSigner = bladeConnector.getSigner();
      if (bladeSigner) {
        const accountId = bladeSigner.getAccountId();
        setAccountId(accountId.toString());
        setIsConnected(true);
      } else {
        setAccountId("");
        setIsConnected(false);
      }
    } catch (error) {
      console.log(error);
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
    const sessionCallback = () => {
      syncWithBladeSession();
    };

    bladeConnectorInitPromise.then((resolveResult) => {
      bladeConnector = resolveResult as BladeConnector;
      syncWithBladeSession();
    });

    const disconnectCallback = () => {
      syncWithBladeDisconnected();
    };

    // if (usedBlade) {
    //   connectToBladeWallet(true);
    // }

    syncWithBladeEvent.on("syncSession", sessionCallback);
    syncWithBladeEvent.on("syncDisconnect", disconnectCallback);

    return () => {
      syncWithBladeEvent.off("syncSession", sessionCallback);
      syncWithBladeEvent.off("syncDisconnect", disconnectCallback);
    };
  }, [syncWithBladeSession, syncWithBladeDisconnected, usedBlade]);

  useEffect(() => {
    setUsedBlade(localStorage.getItem(bladeLocalStorage) === "true");
  }, []);

  return null;
};
