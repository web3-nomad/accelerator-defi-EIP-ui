import { useQueries } from "@tanstack/react-query";
import { readTokenName } from "@/services/contracts/wagmiGenActions";
import { QueryKeys } from "@/hooks/types";
import { LogDescription } from "ethers";

export function useReadTokenName(tokenLogItems: LogDescription[]) {
  return useQueries({
    queries: tokenLogItems.map((tokenLogItem) => ({
      queryKey: [QueryKeys.ReadTokenName, tokenLogItem["args"]?.[0]],
      queryFn: async () => {
        let tokenName = await readTokenName({}, tokenLogItem["args"]?.[0]);
        return {
          name: tokenName.toString(),
          address: tokenLogItem["args"]?.[0] as string,
        };
      },
      staleTime: Infinity,
    })),
  });
}
