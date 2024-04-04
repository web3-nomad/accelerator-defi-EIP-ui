import { createContext, ReactNode, useState } from "react";

const defaultValue = {
  walletConnectAccountAddress: "",
  setWalletConnectAccountAddress: (newValue: string) => {},
  isAvailable: false,
  setIsAvailable: (newValue: boolean) => {},
};

export const WalletConnectContext = createContext(defaultValue);

//
export const WalletConnectContextProvider = (props: {
  children: ReactNode | undefined;
}) => {
  const [walletConnectAccountAddress, setWalletConnectAccountAddress] =
    useState("");
  const [isAvailable, setIsAvailable] = useState(defaultValue.isAvailable);

  return (
    <WalletConnectContext.Provider
      value={{
        walletConnectAccountAddress,
        setWalletConnectAccountAddress,
        isAvailable,
        setIsAvailable,
      }}
    >
      {props.children}
    </WalletConnectContext.Provider>
  );
};
