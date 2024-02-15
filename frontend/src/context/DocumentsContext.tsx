import { createContext, ReactNode } from 'react';

export const DocumentsContext = createContext<undefined | IDocumentsTypes>(undefined);

interface IDocumentsTypes {}

interface IDocumentType {
  children: ReactNode;
}

export const DocumentsProvider: React.FC<IDocumentType> = ({ children }) => {
  const contextValue = {};

  return <DocumentsContext.Provider value={contextValue}>{children}</DocumentsContext.Provider>;
};
