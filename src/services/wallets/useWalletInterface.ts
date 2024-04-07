"use client";

import { useContext } from "react";
import { BladeContext } from "@/contexts/BladeContext";
import { HashconnectContext } from "@/contexts/HashconnectContext";
import { bladeWallet } from "./blade/bladeClient";
import { hashConnectWallet } from "./hashconnect/hashconnectClient";
import { WalletInterface } from "./walletInterface";
import { WalletConnectContext } from "@/contexts/WalletConnectContext";
import { walletconnectWallet } from "@/services/wallets/walletconnect/walletconnectClient";

// Purpose: This hook is used to determine which wallet interface to use
// Example: const { accountId, walletInterface } = useWalletInterface();
// Returns: { accountId: string | null, walletInterface: WalletInterface | null }
export const useWalletInterface = () => {
  const hashconnectCtx = useContext(HashconnectContext);
  const bladeCtx = useContext(BladeContext);
  const walletconnectCtx = useContext(WalletConnectContext);

  if (hashconnectCtx.accountId) {
    return {
      walletName: "Hashpack",
      accountId: hashconnectCtx.accountId,
      walletInterface: hashConnectWallet as WalletInterface,
    };
  } else if (bladeCtx.accountId) {
    return {
      walletName: "Blade",
      accountId: bladeCtx.accountId,
      walletInterface: bladeWallet as WalletInterface,
    };
  } else if (walletconnectCtx.walletConnectAccountAddress) {
    return {
      walletName: "WalletConnect",
      accountId: walletconnectCtx.walletConnectAccountAddress,
      walletInterface: walletconnectWallet as WalletInterface,
    };
  } else {
    return {
      accountId: null,
      walletInterface: null,
    };
  }
};
