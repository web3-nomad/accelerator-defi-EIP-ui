import { AccountId } from "@hashgraph/sdk";

export function convertAccountIdToSolidityAddress(
  accountId: AccountId,
): string {
  const accountIdString =
    accountId.evmAddress !== null
      ? accountId.evmAddress.toString()
      : accountId.toSolidityAddress();

  return `0x${accountIdString}`;
}
