import { LogDescription } from "ethers";
import { createContext, ReactNode, useState } from "react";

const defaultValue = {
  deployedTokens: [],
  setDeployedTokens: (newValue: []) => {},
  identities: [],
  setIdentities: (newValue: []) => {},
  currentIdentityAddress: "",
  setCurrentIdentityAddress: (newValue: "") => {},
  currentIdentityWallet: "",
  setCurrentIdentityWallet: (newValue: "") => {},
};

export const Eip3643Context = createContext(defaultValue);

export const Eip3643ContextProvider = (props: {
  children: ReactNode | undefined;
}) => {
  const [deployedTokens, setDeployedTokens] = useState(
    defaultValue.deployedTokens,
  );
  const [identities, setIdentities] = useState(defaultValue.identities);
  const [currentIdentityWallet, setCurrentIdentityWallet] = useState(
    defaultValue.currentIdentityAddress,
  );
  const [currentIdentityAddress, setCurrentIdentityAddress] = useState(
    defaultValue.currentIdentityAddress,
  );

  return (
    <Eip3643Context.Provider
      value={{
        deployedTokens,
        setDeployedTokens,
        identities,
        setIdentities,
        currentIdentityAddress,
        setCurrentIdentityAddress,
        currentIdentityWallet,
        setCurrentIdentityWallet,
      }}
    >
      {props.children}
    </Eip3643Context.Provider>
  );
};
