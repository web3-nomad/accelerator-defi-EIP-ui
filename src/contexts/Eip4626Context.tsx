import { LogDescription } from "ethers";
import { createContext, ReactNode, useState } from "react";
import { EvmAddress } from "@/types/types";

type defaultContextType = {
  deployedVaults: LogDescription[];
  deployedProxyHtsTokens: EvmAddress[];
  setDeployedVaults: (newValue: []) => void;
  setDeployedProxyHtsTokens: (newValue: []) => void;
};

const defaultValue: defaultContextType = {
  deployedVaults: [],
  deployedProxyHtsTokens: [],
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

  return (
    <Eip4626Context.Provider
      value={{
        deployedVaults,
        setDeployedVaults,
        deployedProxyHtsTokens,
        setDeployedProxyHtsTokens,
      }}
    >
      {props.children}
    </Eip4626Context.Provider>
  );
};
