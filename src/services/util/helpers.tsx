import { AccountId, TransactionId } from "@hashgraph/sdk";

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
  const a = txIdRaw.split("@");
  const b = a[1].split(".");
  const res = `${a[0]}-${b[0]}-${b[1]}`;
  return res;
}
