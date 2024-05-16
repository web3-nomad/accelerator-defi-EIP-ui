import { AccountId, ContractId, TokenId, TransactionId } from "@hashgraph/sdk";
import { ContractFunctionParameterBuilder } from "./contractFunctionParameterBuilder";

export interface WalletInterface {
  getEvmAccountAddress: (
    accountId: AccountId,
  ) => Promise<`0x${string}` | undefined>;
  executeContractWriteFunction: (
    contractId: ContractId,
    abi: readonly any[],
    functionName: string,
    functionParameters: ContractFunctionParameterBuilder,
    gasLimit: number | undefined,
  ) => Promise<TransactionId | string | null>;
  disconnect: (functionOverride?: Function) => void;
  transferHBAR: (
    toAddress: AccountId,
    amount: number,
  ) => Promise<TransactionId | string | null>;
  transferFungibleToken: (
    toAddress: AccountId,
    tokenId: TokenId,
    amount: number,
  ) => Promise<TransactionId | string | null>;
  transferNonFungibleToken: (
    toAddress: AccountId,
    tokenId: TokenId,
    serialNumber: number,
  ) => Promise<TransactionId | string | null>;
  associateToken: (tokenId: TokenId) => Promise<TransactionId | string | null>;
}
