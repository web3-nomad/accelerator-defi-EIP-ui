"use client";

import { ReactNode } from "react";
import { BladeContextProvider } from "@/contexts/BladeContext";
import { HashconnectContextProvider } from "@/contexts/HashconnectContext";
import { BladeClient } from "./blade/bladeClient";
import { HashConnectClient } from "./hashconnect/hashconnectClient";
import { WalletConnectContextProvider } from "@/contexts/WalletConnectContext";
import { WalletConnectClient } from "@/services/wallets/walletconnect/walletconnectClient";

export const AllWalletsProvider = (props: {
  children: ReactNode | undefined;
}) => {
  return (
    <WalletConnectContextProvider>
      <BladeContextProvider>
        <HashconnectContextProvider>
          <HashConnectClient />
          <BladeClient />
          <WalletConnectClient />
          {props.children}
        </HashconnectContextProvider>
      </BladeContextProvider>
    </WalletConnectContextProvider>
  );
};
