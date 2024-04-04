"use client";

import { ReactNode } from "react";
import { BladeContextProvider } from "@/contexts/BladeContext";
import { HashconnectContextProvider } from "@/contexts/HashconnectContext";
import { MetamaskContextProvider } from "@/contexts/MetamaskContext";
import { BladeClient } from "./blade/bladeClient";
import { HashConnectClient } from "./hashconnect/hashconnectClient";
import { MetaMaskClient } from "./metamask/metamaskClient";
import { WalletConnectContextProvider } from "@/contexts/WalletConnectContext";
import { WalletConnectClient } from "@/services/wallets/walletconnect/walletconnectClient";

export const AllWalletsProvider = (props: {
  children: ReactNode | undefined;
}) => {
  return (
    <WalletConnectContextProvider>
      <BladeContextProvider>
        {/*<MetamaskContextProvider>*/}
        <HashconnectContextProvider>
          <HashConnectClient />
          <BladeClient />
          {/*<MetaMaskClient />*/}
          <WalletConnectClient />
          {props.children}
        </HashconnectContextProvider>
        {/*</MetamaskContextProvider>*/}
      </BladeContextProvider>
    </WalletConnectContextProvider>
  );
};
