"use client";

import { useContext } from "react";
import { BladeContext } from "@/contexts/BladeContext";
import { HashconnectContext } from "@/contexts/HashconnectContext";
import { bladeWallet } from "./blade/bladeClient";
import { hashConnectWallet } from "./hashconnect/hashconnectClient";
import { WalletInterface } from "./walletInterface";
import { WalletConnectContext } from "@/contexts/WalletConnectContext";
import { walletconnectWallet } from "@/services/wallets/walletconnect/walletconnectClient";

export const useWalletInterface = () => {
  const hashconnectCtx = useContext(HashconnectContext);
  const bladeCtx = useContext(BladeContext);
  const walletconnectCtx = useContext(WalletConnectContext);

  if (hashconnectCtx.accountId) {
    return {
      walletName: "Hashpack",
      accountId: hashconnectCtx.accountId,
      accountEvm: hashconnectCtx.accountEvm,
      walletInterface: hashConnectWallet as WalletInterface,
    };
  } else if (bladeCtx.accountId) {
    return {
      walletName: "Blade",
      accountId: bladeCtx.accountId,
      accountEvm: bladeCtx.accountEvm,
      walletInterface: bladeWallet as WalletInterface,
    };
  } else if (walletconnectCtx.walletConnectAccountAddress) {
    return {
      walletName: "WalletConnect",
      accountId: walletconnectCtx.walletConnectAccountAddress,
      accountEvm: walletconnectCtx.walletConnectAccountAddress, // TODO: Check for non-metamask wallets bridged over wc
      walletInterface: walletconnectWallet as WalletInterface,
    };
  } else {
    return {
      accountId: null,
      walletInterface: null,
    };
  }
};
