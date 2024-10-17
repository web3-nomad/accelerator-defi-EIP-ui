import { AccountId } from "@hashgraph/sdk";
import { isNil } from "lodash";
import { VAULT_TOKEN_PRECISION_VALUE } from "@/config/constants";
import BigNumber from "bignumber.js";
import { formatUnits, parseUnits } from "viem";
import { EvmAddress } from "@/types/types";

const COINGECKO_API_ENDPOINT = "https://api.coingecko.com/api/v3";

export function convertAccountIdToSolidityAddress(
  accountId: AccountId,
): EvmAddress {
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

/**
 * @deprecated - switch to parseUnitsWithDecimals
 * @param initialValue
 * @param precision
 */
export function formatBalance(
  initialValue: any,
  precision = VAULT_TOKEN_PRECISION_VALUE,
) {
  return !isNil(initialValue)
    ? BigNumber(initialValue).shiftedBy(-precision).toFixed(precision)
    : 0;
}

/**
 * @deprecated - switch to formatUnitsWithDecimals
 * @param amount
 * @param precision
 */
export function formatNumberToBigint(
  amount: BigNumber.Value,
  precision = VAULT_TOKEN_PRECISION_VALUE,
) {
  return BigInt(BigNumber(amount).shiftedBy(precision).toString());
}

//@TODO add decimals usage everywhere
export function parseUnitsWithDecimals(value: string, decimals: number) {
  return parseUnits(value, decimals);
}

export function formatUnitsWithDecimals(value: bigint, decimals: number) {
  return formatUnits(value, decimals);
}

export function removeEvmAddressesDuplicates(data: Array<string>) {
  return data.reduce((addresses: Array<string>, address) => {
    if (!addresses.includes(address)) {
      return [...addresses, address];
    }

    return addresses;
  }, []);
}

export function getFiatCurrencyRate(
  coinName: string = "hedera-hashgraph",
  fiatName: string = "usd",
) {
  return fetch(
    `${COINGECKO_API_ENDPOINT}/simple/price?ids=${coinName}&vs_currencies=${fiatName}`,
  );
}
