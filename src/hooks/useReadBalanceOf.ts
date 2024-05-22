import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@/hooks/types";
import { useWalletInterface } from "@/services/wallets/useWalletInterface";
import { readTokenBalanceOf } from "@/services/contracts/wagmiGenActions";
import { EvmAddress } from "@/types/types";

export function useReadBalanceOf(tokenAddress: EvmAddress) {
  const { accountId } = useWalletInterface();

  return useQuery({
    queryKey: [QueryKeys.ReadBalanceOf, tokenAddress],
    retry: false,
    enabled: !!tokenAddress,
    queryFn: () =>
      readTokenBalanceOf(
        { args: [accountId as EvmAddress] },
        tokenAddress.toString() as EvmAddress,
      ),
  });
}
