import { useQuery } from "@tanstack/react-query";
import { readHederaVaultPreviewRedeem } from "@/services/contracts/wagmiGenActions";
import { EvmAddress } from "@/types/types";
import { QueryKeysEIP4626 } from "@/hooks/types";

export function useReadHederaVaultPreviewRedeem(
  vaultAddress: EvmAddress,
  amount: number,
) {
  return useQuery({
    queryKey: [
      QueryKeysEIP4626.ReadHederaVaultPreviewRedeem,
      vaultAddress,
      amount,
    ],
    queryFn: () =>
      readHederaVaultPreviewRedeem(
        { args: [amount as unknown as bigint] },
        vaultAddress,
      ),
  });
}
