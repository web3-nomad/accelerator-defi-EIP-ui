import { LogDescription } from "ethers";
import { createContext, ReactNode, useState } from "react";
import { EvmAddress } from "@/types/types";

type defaultContextType = {
  deployedVaults: LogDescription[];
  deployedProxyHtsTokens: EvmAddress[];
  deployedHtsTokenNames: { [key: string]: EvmAddress };
  setDeployedHtsTokenNames: (newValue: {}) => void;
  setDeployedVaults: (newValue: []) => void;
  setDeployedProxyHtsTokens: (newValue: []) => void;
};

const defaultValue: defaultContextType = {
  deployedVaults: [],
  deployedProxyHtsTokens: [],
  deployedHtsTokenNames: {},
  setDeployedHtsTokenNames: (newValue) => {},
  setDeployedVaults: (newValue) => {},
  setDeployedProxyHtsTokens: (newValue) => {},
};

export const Eip4626Context = createContext(defaultValue);

export const Eip4626ContextProvider = (props: {
  children: ReactNode | undefined;
}) => {
  const [deployedVaults, setDeployedVaults] = useState(
    defaultValue.deployedVaults,
  );

  const [deployedProxyHtsTokens, setDeployedProxyHtsTokens] = useState(
    defaultValue.deployedProxyHtsTokens,
  );
  const [deployedHtsTokenNames, setDeployedHtsTokenNames] = useState(
    defaultValue.deployedHtsTokenNames,
  );

  return (
    <Eip4626Context.Provider
      value={{
        deployedVaults,
        setDeployedVaults,
        deployedProxyHtsTokens,
        setDeployedProxyHtsTokens,
        deployedHtsTokenNames,
        setDeployedHtsTokenNames,
      }}
    >
      {props.children}
    </Eip4626Context.Provider>
  );
};
