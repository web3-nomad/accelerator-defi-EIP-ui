import { useMutation } from "@tanstack/react-query";
import { writeIdentityAddKey } from "@/services/contracts/wagmiGenActions";
import { useWalletInterface } from "@/services/wallets/useWalletInterface";
import { convertAccountIdToSolidityAddress } from "@/services/util/helpers";
import { AccountId } from "@hashgraph/sdk";
import { hederaTestnet } from "wagmi/chains";
import { WalletInterface } from "@/services/wallets/walletInterface";
import { AbiCoder, ethers } from "ethers";

export enum ADD_KEY_IDENTITY_PURPOSE {
  MANAGEMENT = 1,
  ACTION = 2,
  CLAIM = 3,
  ENCRYPTION = 4,
}

export enum ADD_KEY_IDENTITY_TYPE {
  ECDSA = 1,
  RSA = 2,
}

export function useAddKeyToIdentity() {
  const { accountId, walletName, walletInterface } = useWalletInterface();

  return useMutation({
    mutationFn: async () => {
      //@TODO pass from input or event of previous step
      const IDENTITY_PROXY_ADDR = "0xf36b77a8aecf1346f05966588ef2a34b4817f0b0";

      const currentAccountAddress = convertAccountIdToSolidityAddress(
        AccountId.fromString(accountId as string),
      );

      console.log("L31 currentAccountAddress ===", currentAccountAddress);

      const addressAsKey = ethers.keccak256(
        AbiCoder.defaultAbiCoder().encode(["address"], [currentAccountAddress]),
      ) as `0x${string}`;

      console.log("L29 encoded param addressAsKey ===", addressAsKey);

      const addKeyResult = await writeIdentityAddKey(
        walletInterface as WalletInterface,
        {
          args: [
            addressAsKey,
            BigInt(ADD_KEY_IDENTITY_PURPOSE.ACTION),
            BigInt(ADD_KEY_IDENTITY_TYPE.ECDSA),
          ],
          account: currentAccountAddress,
          chain: hederaTestnet,
        },
        IDENTITY_PROXY_ADDR,
      );

      console.log("L37 addKeyResult ===", addKeyResult);

      return addKeyResult;
    },
    onSuccess: (data, variables, context) => {
      console.log("L13 useAddKeyToIdentity() onSuccess data ===", data);
    },
  });
}
