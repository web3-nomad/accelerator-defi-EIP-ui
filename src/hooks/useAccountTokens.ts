import { useWalletInterface } from "@/services/wallets/useWalletInterface";
import { useInfiniteQuery } from "@tanstack/react-query";
import { QueryKeys } from "@/hooks/types";
import { fetchAccountTokens } from "@/services/api/requests";

export function useAccountTokens() {
  const { accountEvm } = useWalletInterface();

  //@TODO convert token_id to evm address after fetching it
  return useInfiniteQuery({
    queryKey: [QueryKeys.ReadAccountTokens, accountEvm],
    queryFn: ({ pageParam }) => fetchAccountTokens(accountEvm, pageParam),
    initialPageParam: "",
    refetchOnWindowFocus: false,
    enabled: !!accountEvm,
    select: (data) => data.pages.flatMap((x) => x.tokens),
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage?.links?.next) {
        return lastPage?.links?.next;
      } else {
        return undefined;
      }
    },
  });
}
