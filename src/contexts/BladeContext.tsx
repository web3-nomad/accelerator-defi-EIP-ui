import { createContext, ReactNode, useState } from "react";

const defaultValue = {
  accountId: "",
  setAccountId: (newValue: string) => {},
  isAvailable: false,
  setIsAvailable: (newValue: boolean) => {},
  isConnected: false,
  setIsConnected: (newValue: boolean) => {},
};

export const BladeContext = createContext(defaultValue);

export const BladeContextProvider = (props: {
  children: ReactNode | undefined;
}) => {
  const [accountId, setAccountId] = useState(defaultValue.accountId);
  const [isConnected, setIsConnected] = useState(defaultValue.isConnected);
  const [isAvailable, setIsAvailable] = useState(defaultValue.isAvailable);

  return (
    <BladeContext.Provider
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
    </BladeContext.Provider>
  );
};
