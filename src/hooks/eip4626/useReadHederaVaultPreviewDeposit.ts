import { useQuery } from "@tanstack/react-query";
import { readHederaVaultPreviewDeposit } from "@/services/contracts/wagmiGenActions";
import { QueryKeysEIP4626 } from "@/hooks/types";
import { EvmAddress } from "@/types/types";
import { formatNumberToBigint } from "@/services/util/helpers";

export function useReadHederaVaultPreviewDeposit(
  vaultAddress: EvmAddress,
  amount: number,
) {
  return useQuery({
    queryKey: [
      QueryKeysEIP4626.ReadHederaVaultPreviewDeposit,
      vaultAddress,
      amount,
    ],
    queryFn: () =>
      readHederaVaultPreviewDeposit(
        { args: [formatNumberToBigint(amount)] },
        vaultAddress,
      ),
  });
}
