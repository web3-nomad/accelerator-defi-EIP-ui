import { useMutation } from "@tanstack/react-query";
import { writeIdentityRegistryRegisterIdentity } from "@/services/contracts/wagmiGenActions";
import { useWalletInterface } from "@/services/wallets/useWalletInterface";
import { WalletInterface } from "@/services/wallets/walletInterface";
import { hederaTestnet } from "wagmi/chains";
import { convertAccountIdToSolidityAddress } from "@/services/util/helpers";
import { AccountId } from "@hashgraph/sdk";

export function useRegisterIdentity() {
  const { accountId, walletName, walletInterface } = useWalletInterface();

  return useMutation({
    mutationFn: async () => {
      //@TODO pass from input or event of previous step
      const IDENTITY_PROXY_ADDR = "0x0D02b42f72f8d3724ea222D2993061e3d027bBDc";

      //@TODO pass from input or event of previous step
      //from dctest1 [0xB624471D66E8880Df26Ed3FaF8Ceca55069A8F03]
      const IDENTITY_REGISTRY_ADDRESS =
        "0x9928352D4DCD68cB76512AB71940D8AD912246be";

      //@TODO country code selector
      const COUNTRY = 840; // ISO United States country code (see: https://www.iso.org/obp/ui/#search)

      const currentAccountAddress = convertAccountIdToSolidityAddress(
        AccountId.fromString(accountId as string),
      );

      const registerResult = writeIdentityRegistryRegisterIdentity(
        walletInterface as WalletInterface,
        {
          args: [currentAccountAddress, IDENTITY_PROXY_ADDR, COUNTRY],
          account: currentAccountAddress,
          chain: hederaTestnet,
        },
        IDENTITY_REGISTRY_ADDRESS,
      );

      console.log("L40 registerResult ===", registerResult);

      return registerResult;
    },
  });
}
