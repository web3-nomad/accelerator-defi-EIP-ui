import { createContext, ReactNode } from "react";

type defaultContextType = {};

const defaultValue: defaultContextType = {};

export const Eip4626Context = createContext(defaultValue);

export const Eip4626ContextProvider = (props: {
  children: ReactNode | undefined;
}) => {
  return (
    <Eip4626Context.Provider value={{}}>
      {props.children}
    </Eip4626Context.Provider>
  );
};
