import { LogDescription } from "ethers";
import { createContext, ReactNode, useState } from "react";

type defaultContextType = {
  deployedVaults: LogDescription[];
  setDeployedVaults: (newValue: []) => void;
};

const defaultValue: defaultContextType = {
  deployedVaults: [],
  setDeployedVaults: (newValue) => {},
};

export const Eip4626Context = createContext(defaultValue);

export const Eip4626ContextProvider = (props: {
  children: ReactNode | undefined;
}) => {
  const [deployedVaults, setDeployedVaults] = useState(
    defaultValue.deployedVaults,
  );

  return (
    <Eip4626Context.Provider
      value={{
        deployedVaults,
        setDeployedVaults,
      }}
    >
      {props.children}
    </Eip4626Context.Provider>
  );
};
