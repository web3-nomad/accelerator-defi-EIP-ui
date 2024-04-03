import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@/hooks/types";
import { convertAccountIdToSolidityAddress } from "@/services/util/helpers";
import { AccountId } from "@hashgraph/sdk";
import { readErc20BalanceOf } from "@/services/contracts/wagmiGenActions";

export function useReadErc20BalanceOf(accountId: string) {
  return useQuery({
    queryKey: [QueryKeys.ReadErc20BalanceOf, accountId],
    queryFn: async () => {
      if (!accountId || accountId.length === 0) return "";

      const accountIdSolidity = convertAccountIdToSolidityAddress(
        AccountId.fromString(accountId as string),
      );

      //@TODO add format output function for BigInt balances
      const result = await readErc20BalanceOf({
        args: [accountIdSolidity as "0x${string}"],
      });

      return result;
    },
  });
}
