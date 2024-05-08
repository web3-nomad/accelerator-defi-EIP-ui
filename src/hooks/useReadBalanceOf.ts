import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@/hooks/types";
import { useWalletInterface } from "@/services/wallets/useWalletInterface";
import { readTokenBalanceOf } from "@/services/contracts/wagmiGenActions";

export function useReadBalanceOf(tokenAddress: `0x${string}`) {
  const { accountId } = useWalletInterface();

  return useQuery({
    queryKey: [QueryKeys.ReadBalanceOf, tokenAddress],
    retry: false,
    queryFn: () =>
      readTokenBalanceOf({ args: [accountId as `0x${string}`] }, tokenAddress),
  });
}
