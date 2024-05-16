import { WalletConnectContext } from "../../../contexts/WalletConnectContext";
import { useCallback, useContext, useEffect } from "react";
import { WalletInterface } from "../walletInterface";
import {
  AccountId,
  ContractExecuteTransaction,
  ContractId,
  LedgerId,
  TokenAssociateTransaction,
  TokenId,
  Transaction,
  TransactionId,
  TransferTransaction,
  Client,
} from "@hashgraph/sdk";
import { ContractFunctionParameterBuilder } from "../contractFunctionParameterBuilder";
import { appConfig } from "../../../config";
import { SignClientTypes } from "@walletconnect/types";
import {
  DAppConnector,
  HederaJsonRpcMethod,
  HederaSessionEvent,
  HederaChainId,
  SignAndExecuteTransactionParams,
  transactionToBase64String,
} from "@hashgraph/hedera-wallet-connect";
import EventEmitter from "events";

// Created refreshEvent because `dappConnector.walletConnectClient.on(eventName, syncWithWalletConnectContext)` would not call syncWithWalletConnectContext
// Reference usage from walletconnect implementation https://github.com/hashgraph/hedera-wallet-connect/blob/main/src/lib/dapp/index.ts#L120C1-L124C9
const refreshEvent = new EventEmitter();

// Create a new project in walletconnect cloud to generate a project id
const walletConnectProjectId = process.env
  .NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID as string;
const currentNetworkConfig = appConfig.networks.testnet;
const hederaNetwork = currentNetworkConfig.network;
const hederaClient = Client.forName(hederaNetwork);

// Adapted from walletconnect dapp example:
// https://github.com/hashgraph/hedera-wallet-connect/blob/main/src/examples/typescript/dapp/main.ts#L87C1-L101C4
const metadata: SignClientTypes.Metadata = {
  name: process.env.NEXT_PUBLIC_WALLET_DEFI_APP_NAME as string,
  description: process.env.NEXT_PUBLIC_WALLET_DEFI_APP_DESCRIPTION as string,
  icons: [process.env.NEXT_PUBLIC_WALLET_DEFI_APP_ICON as string],
  url: process.env.NEXT_PUBLIC_WALLET_DEFI_APP_URL as string,
};
const dappConnector = new DAppConnector(
  metadata,
  LedgerId.fromString(hederaNetwork),
  walletConnectProjectId,
  Object.values(HederaJsonRpcMethod),
  [HederaSessionEvent.ChainChanged, HederaSessionEvent.AccountsChanged],
  [HederaChainId.Testnet],
);

// ensure walletconnect is initialized only once
let walletConnectInitPromise: Promise<void> | undefined = undefined;
const initializeWalletConnect = async () => {
  if (walletConnectInitPromise === undefined) {
    walletConnectInitPromise = dappConnector.init();
  }
  await walletConnectInitPromise;
};

export const connectToWalletConnectWallet = async () => {
  await initializeWalletConnect();
  await dappConnector.openModal().then((x) => {
    refreshEvent.emit("sync");
  });
};

class WalletConnectWallet implements WalletInterface {
  private accountId() {
    // Need to convert from walletconnect's AccountId to hashgraph/sdk's AccountId because walletconnect's AccountId and hashgraph/sdk's AccountId are not the same!
    return AccountId.fromString(
      dappConnector.signers[0].getAccountId().toString(),
    );
  }

  async getEvmAccountAddress(accountId: AccountId) {
    return ("0x" + accountId.toSolidityAddress()) as `0x${string}`;
  }

  // can be replaced when walletconnect provides a signer that satisfies Transaction.executeWithSigner
  private async signAndExecuteTransaction(transaction: Transaction) {
    const params: SignAndExecuteTransactionParams = {
      signerAccountId: `::${this.accountId().toString()}`, // dApps seem to expect two colons in front of the signerAccountId, I'm not sure why. Hoping this gets cleaned up by wallets and walletconnect.
      transactionList: transactionToBase64String(transaction),
    };
    /**
     * this is not working as expected according to walletconnect's type definitions for dappConnector.signAndExecuteTransaction
     *
     * For HashPack, needed to put in try-catch because hashpack was throwing execptions in dappConnector.signAndExecuteTransaction
     * For Blade, dappConnector.signAndExecuteTransaction does not throw, but result.result is always undefined. So everywhere that this result is used, I had to add something like `txResult ? txResult.transactionId : null`
     * Basically for either wallet, the transactionId is not usable.
     */
    try {
      const result = await dappConnector.signAndExecuteTransaction(params);
      return result.result;
    } catch {
      return null;
    }
  }

  // can be replaced when walletconnect provides a signer that satisfies Transaction.freezeWithSigner
  private freezeTx(transaction: Transaction) {
    const nodeAccountIds = hederaClient._network.getNodeAccountIdsForExecute();
    return transaction
      .setTransactionId(TransactionId.generate(this.accountId()))
      .setNodeAccountIds(nodeAccountIds)
      .freeze();
  }

  async transferHBAR(toAddress: AccountId, amount: number) {
    const transferHBARTransaction = new TransferTransaction()
      .addHbarTransfer(this.accountId(), -amount)
      .addHbarTransfer(toAddress, amount);

    const frozenTx = this.freezeTx(transferHBARTransaction);
    const txResult = await this.signAndExecuteTransaction(frozenTx);
    return txResult ? txResult.transactionId : null;
  }

  async transferFungibleToken(
    toAddress: AccountId,
    tokenId: TokenId,
    amount: number,
  ) {
    const transferTokenTransaction = new TransferTransaction()
      .addTokenTransfer(tokenId, this.accountId(), -amount)
      .addTokenTransfer(tokenId, toAddress.toString(), amount);

    const frozenTx = this.freezeTx(transferTokenTransaction);
    const txResult = await this.signAndExecuteTransaction(frozenTx);
    return txResult ? txResult.transactionId : null;
  }

  async transferNonFungibleToken(
    toAddress: AccountId,
    tokenId: TokenId,
    serialNumber: number,
  ) {
    const transferTokenTransaction = new TransferTransaction().addNftTransfer(
      tokenId,
      serialNumber,
      this.accountId(),
      toAddress,
    );

    const frozenTx = this.freezeTx(transferTokenTransaction);
    const txResult = await this.signAndExecuteTransaction(frozenTx);
    return txResult ? txResult.transactionId : null;
  }

  async associateToken(tokenId: TokenId) {
    const associateTokenTransaction = new TokenAssociateTransaction()
      .setAccountId(this.accountId())
      .setTokenIds([tokenId]);

    const frozenTx = this.freezeTx(associateTokenTransaction);
    const txResult = await this.signAndExecuteTransaction(frozenTx);
    return txResult ? txResult.transactionId : null;
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
    return null;
    // const provider = getProvider();
    // if (!provider) return null;
    // const signer = await provider.getSigner();

    // let gasLimitFinal = gasLimit;
    // if (!gasLimitFinal) {
    //   const res = await estimateGas(
    //     signer.address,
    //     contractId,
    //     abi,
    //     functionName,
    //     functionParameters.buildEthersParams(),
    //   );
    //   if (res.result) {
    //     gasLimitFinal = parseInt(res.result, 16);
    //   } else {
    //     throw res._status?.messages?.[0]?.detail;
    //   }
    // }

    // // create contract instance for the contract id
    // // to call the function, use contract[functionName](...functionParameters, ethersOverrides)
    // const contract = new ethers.Contract(
    //   `0x${contractId.toSolidityAddress()}`,
    //   abi || [
    //     // workaround for case when calling outside of wagmi-codegen | no abi present
    //     `function ${functionName}(${functionParameters.buildAbiFunctionParams()})`,
    //   ],
    //   signer,
    // );

    // try {
    //   const txResult = await contract[functionName](
    //     ...functionParameters.buildEthersParams(),
    //     {
    //       gasLimit: gasLimitFinal,
    //     },
    //   );
    //   return txResult.hash;
    // } catch (error: any) {
    //   console.warn(error.message ? error.message : error);
    //   return null;
    // }
  }

  // Purpose: build contract execute transaction and send to wallet for signing and execution
  // Returns: Promise<TransactionId | null>
  async executeContractFunction(
    contractId: ContractId,
    functionName: string,
    functionParameters: ContractFunctionParameterBuilder,
    gasLimit: number,
  ) {
    // const tx = new ContractExecuteTransaction()
    //   .setContractId(contractId)
    //   .setGas(gasLimit)
    //   .setFunction(functionName, functionParameters.buildHAPIParams());

    // const frozenTx = this.freezeTx(tx);
    // const txResult = await this.signAndExecuteTransaction(frozenTx);

    // // in order to read the contract call results, you will need to query the contract call's results form a mirror node using the transaction id
    // // after getting the contract call results, use ethers and abi.decode to decode the call_result
    // return txResult ? txResult.transactionId : null;
    return null;
  }

  disconnect() {
    dappConnector.disconnectAll().then(() => {
      refreshEvent.emit("sync");
    });
  }
}
export const walletConnectWallet = new WalletConnectWallet();

// this component will sync the walletconnect state with the context
export const WalletConnectClient = () => {
  // use the HashpackContext to keep track of the hashpack account and connection
  const { setWalletConnectAccountAddress, setIsAvailable } =
    useContext(WalletConnectContext);

  // sync the walletconnect state with the context
  const syncWithWalletConnectContext = useCallback(() => {
    const accountId = dappConnector.signers[0]?.getAccountId()?.toString();
    if (accountId) {
      setWalletConnectAccountAddress(accountId);
      setIsAvailable(true);
    } else {
      setWalletConnectAccountAddress("");
      setIsAvailable(false);
    }
  }, [setWalletConnectAccountAddress, setIsAvailable]);

  useEffect(() => {
    // Sync after walletconnect finishes initializing
    refreshEvent.addListener("sync", syncWithWalletConnectContext);

    initializeWalletConnect().then(() => {
      syncWithWalletConnectContext();
    });

    return () => {
      refreshEvent.removeListener("sync", syncWithWalletConnectContext);
    };
  }, [syncWithWalletConnectContext]);
  return null;
};
