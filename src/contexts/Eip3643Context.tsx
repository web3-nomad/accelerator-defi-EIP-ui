import { LogDescription } from "ethers";
import { createContext, ReactNode, useState } from "react";

const defaultValue = {
  deployedTokens: [],
  setDeployedTokens: (newValue: []) => {},
  currentIdentityAddress: "",
  setCurrentIdentityAddress: (newValue: "") => {},
};

export const Eip3643Context = createContext(defaultValue);

export const Eip3643ContextProvider = (props: {
  children: ReactNode | undefined;
}) => {
  const [deployedTokens, setDeployedTokens] = useState(
    defaultValue.deployedTokens,
  );

  const [currentIdentityAddress, setCurrentIdentityAddress] = useState(
    defaultValue.currentIdentityAddress,
  );

  return (
    <Eip3643Context.Provider
      value={{
        deployedTokens,
        setDeployedTokens,
        currentIdentityAddress,
        setCurrentIdentityAddress,
      }}
    >
      {props.children}
    </Eip3643Context.Provider>
  );
};
