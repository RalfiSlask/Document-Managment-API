import { createContext, ReactNode } from 'react';

export const LoginContext = createContext<undefined | ILoginTypes>(undefined);

interface ILoginTypes {}

interface ILoginChildrenType {
  children: ReactNode;
}

export const LoginProvider: React.FC<ILoginChildrenType> = ({ children }) => {
  const contextValue = {};

  return <LoginContext.Provider value={contextValue}>{children}</LoginContext.Provider>;
};
