import { useMutation } from "@tanstack/react-query";
import { writeTokenTransferFrom } from "@/services/contracts/wagmiGenActions";
import { useWalletInterface } from "@/services/wallets/useWalletInterface";
import { WalletInterface } from "@/services/wallets/walletInterface";
import { TransferTokenFromRequest } from "@/types/types";

export function useTransferToken() {
  const { accountId, walletName, walletInterface } = useWalletInterface();

  //@TODO types
  return useMutation({
    mutationFn: async ({
      tokenAddress,
      fromAddress,
      toAddress,
      amount,
    }: any) => {
      const transferResult = writeTokenTransferFrom(
        walletInterface as WalletInterface,
        { args: [fromAddress, toAddress, amount] },
        tokenAddress,
      );

      console.log("L26 transferResult ===", transferResult);

      return transferResult;

      //@TODO reset balance query cache here for the selected token addr here?
    },
  });
}
