import { useMutation } from "@tanstack/react-query";
import { useWalletInterface } from "@/services/wallets/useWalletInterface";
import { writeErc20Transfer } from "@/services/contracts/wagmi-gen-actions";
import { WalletInterface } from "@/services/wallets/walletInterface";
import { hederaTestnet } from "wagmi/chains";
import { AccountId } from "@hashgraph/sdk";
import { convertAccountIdToSolidityAddress } from "@/services/util/helpers";

export interface UseWriteErc20TransferParameters {
  to: `0x${string}`;
  amount: bigint;
}

export function useWriteErc20Transfer() {
  const { accountId, walletName, walletInterface } = useWalletInterface();

  const mutation = useMutation({
    mutationFn: async ({ to, amount }: UseWriteErc20TransferParameters) => {
      // if (!walletInterface) return;
      //@TODO make account/chain not mandatory if possible
      const writeCallRes = await writeErc20Transfer(
        walletInterface as WalletInterface, //@TODO prevent walletInterface as null from useWalletInterface
        {
          args: [to, amount],
          account: convertAccountIdToSolidityAddress(
            AccountId.fromString(accountId as string), //@TODO prevent accountId as null from useWalletInterface
          ),
          chain: hederaTestnet, //@TODO could not use app config, imported from viem
        },
      );

      console.log("L24 writeCallRes ===", writeCallRes);
      return writeCallRes;
    },
    onSuccess: (data, variables, context) => {
      console.log("L10 onSuccess data ===", data);
    },
  });

  console.log("L14 mutation ===", mutation);

  return mutation;
}
