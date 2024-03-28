import axios from "axios";
import { TransactionId } from "@hashgraph/sdk";

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

//@TODO retry if 404 and TX has not propagated yet
export async function getContractCallResultsByTxId(
  transactionId: string | number | TransactionId | null | undefined,
) {
  try {
    const { data: transaction } = await testnetMirrorNodeAPI.get(
      `/api/v1/contracts/results/${transactionId}`,
    );

    console.log("L65 transaction ===", transaction);

    return;

    //@TODO network from config
    //   let txData = await fetch(
    //     `https://testnet.mirrornode.hedera.com/api/v1/contracts/results/${rawTxId}`,
    //   );
    //
    //   console.log("L39 txData ===", txData);
    //
    //   let txDataParsed = await txData.json();
    //   console.log("L56 txDataParsed ===", txDataParsed);
    //
    //   console.log("L58 txDataParsed.call_result ===", txDataParsed.call_result);
    //
    //   const functionAbi = abiFull.abi.find(
    //     (func) => func.name === "theMeaningOfLifeIs",
    //   );
    //
    //   if (!functionAbi) {
    //     throw new Error("functionAbi 404");
    //   }
    //
    //   const functionParameters = functionAbi.outputs as AbiInput[];
    //   console.log("L65 functionParameters ===", functionParameters);
    //
    //   const web3 = new Web3();
    //
    //   const result = web3.eth.abi.decodeParameters(
    //     functionParameters,
    //     txDataParsed.call_result,
    //   );
    //
    //   //@TODO get type from output and format accordingly
    //   // Number(BigInt.asIntN(32, 42n))
    //
    //   console.log("L62 result ===", result); //42n
    //
    //   //@TODO show success popup with result info
  } catch (e) {
    console.log("L21 fetch by TX ID failed ===", e);
    //@TODO show error popup
  }
}
