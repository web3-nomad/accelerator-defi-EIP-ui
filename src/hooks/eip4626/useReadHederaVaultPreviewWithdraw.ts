import { useQuery } from "@tanstack/react-query";
import { readHederaVaultPreviewWithdraw } from "@/services/contracts/wagmiGenActions";
import { EvmAddress } from "@/types/types";
import { QueryKeysEIP4626 } from "@/hooks/types";

export function useReadHederaVaultPreviewWithdraw(
  vaultAddress: EvmAddress,
  amount: number,
) {
  return useQuery({
    queryKey: [
      QueryKeysEIP4626.ReadHederaVaultPreviewWithdraw,
      vaultAddress,
      amount,
    ],
    queryFn: () =>
      readHederaVaultPreviewWithdraw(
        { args: [amount as unknown as bigint] },
        vaultAddress,
      ),
  });
}
