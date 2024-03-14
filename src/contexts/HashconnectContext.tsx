import { createContext, useState, ReactNode } from "react";

const defaultValue = {
  accountId: "",
  setAccountId: (newValue: string) => {},
  isAvailable: false,
  setIsAvailable: (newValue: boolean) => {},
  isConnected: false,
  setIsConnected: (newValue: boolean) => {},
};

export const HashconnectContext = createContext(defaultValue);

export const HashconnectContextProvider = (props: {
  children: ReactNode | undefined;
}) => {
  const [accountId, setAccountId] = useState(defaultValue.accountId);
  const [isConnected, setIsConnected] = useState(defaultValue.isConnected);
  const [isAvailable, setIsAvailable] = useState(defaultValue.isAvailable);

  return (
    <HashconnectContext.Provider
      value={{
        accountId,
        setAccountId,
        isAvailable,
        setIsAvailable,
        isConnected,
        setIsConnected,
      }}
    >
      {props.children}
    </HashconnectContext.Provider>
  );
};
