import { AccountId, TransactionId } from "@hashgraph/sdk";
import { AbiInput, Web3 } from "web3";
import abiFull from "@/assets/abi/MeaningOfLife.json";

export function convertAccountIdToSolidityAddress(
  accountId: AccountId,
): string {
  const accountIdString =
    accountId.evmAddress !== null
      ? accountId.evmAddress.toString()
      : accountId.toSolidityAddress();

  return `0x${accountIdString}`;
}

/**
 * Convert from raw tx id format into format suitable for RPC calls
 * 0.0.902@1711368787.622186597 -> 0.0.902-1711368787-622186597
 * @param txIdRaw
 */
export function formatRawTxId(txIdRaw: string) {
  console.log("L16 txIdRaw ===", txIdRaw);
  const a = txIdRaw.split("@");
  const b = a[1].split(".");
  const res = `${a[0]}-${b[0]}-${b[1]}`;
  console.log("L20 txId converted res ===", res);
  return res;
}

//@TODO retry if 404 and TX has not propagated yet
export async function getContractCallResultsByTxId(
  rawTxId: string | number | TransactionId | null | undefined,
) {
  try {
    //@TODO network from config
    let txData = await fetch(
      `https://testnet.mirrornode.hedera.com/api/v1/contracts/results/${rawTxId}`,
    );

    console.log("L39 txData ===", txData);

    let txDataParsed = await txData.json();
    console.log("L56 txDataParsed ===", txDataParsed);

    console.log("L58 txDataParsed.call_result ===", txDataParsed.call_result);

    const functionAbi = abiFull.abi.find(
      (func) => func.name === "theMeaningOfLifeIs",
    );

    if (!functionAbi) {
      throw new Error("functionAbi 404");
    }

    const functionParameters = functionAbi.outputs as AbiInput[];
    console.log("L65 functionParameters ===", functionParameters);

    const web3 = new Web3();

    const result = web3.eth.abi.decodeParameters(
      functionParameters,
      txDataParsed.call_result,
    );

    //@TODO get type from output and format accordingly
    // Number(BigInt.asIntN(32, 42n))

    console.log("L62 result ===", result); //42n

    //@TODO show success popup with result info
  } catch (e) {
    console.log("L21 fetch by TX ID failed ===", e);
    //@TODO show error popup
  }
}
