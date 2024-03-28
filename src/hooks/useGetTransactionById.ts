import { useQuery } from "@tanstack/react-query";

export function useGetTransactionById(txId: string) {
  return useQuery({
    queryKey: [txId],
    queryFn: () => {},
  });
}
