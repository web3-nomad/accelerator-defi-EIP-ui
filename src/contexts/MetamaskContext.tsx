import { createContext, ReactNode, useState } from "react";

const defaultValue = {
  metamaskAccountAddress: "",
  setMetamaskAccountAddress: (newValue: string) => {},
  isAvailable: false,
  setIsAvailable: (newValue: boolean) => {},
};

export const MetamaskContext = createContext(defaultValue);

export const MetamaskContextProvider = (props: {
  children: ReactNode | undefined;
}) => {
  const [metamaskAccountAddress, setMetamaskAccountAddress] = useState("");
  const [isAvailable, setIsAvailable] = useState(defaultValue.isAvailable);

  return (
    <MetamaskContext.Provider
      value={{
        metamaskAccountAddress,
        setMetamaskAccountAddress,
        isAvailable,
        setIsAvailable,
      }}
    >
      {props.children}
    </MetamaskContext.Provider>
  );
};
