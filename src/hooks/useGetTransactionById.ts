import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@/hooks/types";
import { getContractCallResultsByTxId } from "@/services/api/requests";

export function useGetTransactionById(txId: string) {
  return useQuery({
    queryKey: [QueryKeys.ContractCallResults, txId],
    queryFn: async () => {
      if (!txId || txId.length === 0) return "";

      console.log("L9 useGetTransactionById ===");

      const txData = await getContractCallResultsByTxId(txId);

      console.log("L13 txData ===", txData);

      return txData;
    },
  });
}
