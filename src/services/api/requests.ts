import axios from "axios";
import { AccountId, TransactionId } from "@hashgraph/sdk";

const TESTNET_URL = `https://testnet.mirrornode.hedera.com`;
const testnetMirrorNodeAPI = axios.create({
  baseURL: TESTNET_URL,
});

interface MirrorNodeTokenTransfer {
  token_id: string;
  account: string;
  amount: number;
  is_approval: boolean;
}

interface MirrorNodeTransaction {
  bytes: null;
  charged_tx_fee: number;
  consensus_timestamp: string;
  entity_id: string;
  max_fee: number;
  memo_base64: null;
  name: string;
  node: string;
  nonce: number;
  parent_consensus_timestamp: string;
  result: string;
  scheduled: false;
  transaction_hash: string;
  transaction_id: string;
  token_transfers: MirrorNodeTokenTransfer[];
}

interface MirrorNodeAccountToken {
  automatic_association: boolean;
  balance: number;
  created_timestamp: string;
  decimals: number;
  freeze_status: string;
  kyc_status: string;
  token_id: string;
}
interface MirrorNodeAccountTokens {
  links: {
    next: string;
  };
  tokens: MirrorNodeAccountToken[];
}

/**
 * Fetches transaction details / records on Hedera network for a given TransactionId
 * @param transactionId - The ID of the transactions.
 * @returns The list of transactions for the given associated with given TransactionId
 */
export const fetchTransactionRecord = async (
  transactionId: string,
): Promise<MirrorNodeTransaction[]> => {
  const { data: transactions } = await testnetMirrorNodeAPI.get(
    `/api/v1/transactions/${transactionId}`,
  );
  return transactions.transactions;
};

export async function getContractCallResultsByTxId(
  transactionId: string | number | TransactionId | null | undefined,
) {
  const { data: transaction } = await testnetMirrorNodeAPI.get(
    `/api/v1/contracts/results/${transactionId}`,
  );

  return transaction;
}

export async function convertAccountIdToEVMWallet(accountId: AccountId) {
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
  if (
    responseJson?._status?.messages &&
    responseJson?._status?.messages[0]?.message === "Not found"
  ) {
    return null;
  }
  return responseJson?._status || responseJson.evm_address;
}

export const fetchAccountTokens = async (
  accountId: string | undefined,
  pageParam: string,
): Promise<MirrorNodeAccountTokens> => {
  // if (!accountId) return [];

  const { data: tokens } = await testnetMirrorNodeAPI.get(
    pageParam ? pageParam : `/api/v1/accounts/${accountId}/tokens`,
  );

  return tokens;
};
