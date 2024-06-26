import { useQuery } from "@tanstack/react-query";
import { readHederaVaultUserContribution } from "@/services/contracts/wagmiGenActions";
import { EvmAddress } from "@/types/types";
import { useWalletInterface } from "@/services/wallets/useWalletInterface";
import { QueryKeysEIP4626 } from "@/hooks/types";

export function useReadHederaVaultUserContribution(vaultAddress: EvmAddress) {
  const { accountEvm } = useWalletInterface();

  return useQuery({
    queryKey: [
      QueryKeysEIP4626.ReadHederaVaultUserContribution,
      vaultAddress,
      accountEvm,
    ],
    queryFn: () =>
      readHederaVaultUserContribution(
        { args: [accountEvm as EvmAddress] },
        vaultAddress,
      ),
  });
}
