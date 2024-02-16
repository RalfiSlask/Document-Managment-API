import { createContext, ReactNode, useState } from 'react';
import { IDocumentObjectType } from '../utils/types/types';

export const DocumentsContext = createContext<undefined | IDocumentsTypes>(undefined);

interface IDocumentsTypes {
  getUserSpecificDocuments: (userId: string) => void;
}

interface IDocumentType {
  children: ReactNode;
}

export const DocumentsProvider: React.FC<IDocumentType> = ({ children }) => {
  const [documents, setDocuments] = useState<IDocumentObjectType[] | null>(null);

  const getUserSpecificDocuments = async (userId: string) => {
    console.log(userId);
    try {
      const response = await fetch(`http://localhost:3000/api/documents/${userId}`);
      if (!response.ok) {
        return;
      }
      const jsonData = await response.json();
      if (jsonData) {
        console.log(jsonData);
        setDocuments(jsonData);
      }
    } catch (err) {
      console.log(err, 'could not get documents');
    }
  };

  const contextValue = {
    // states
    documents: documents,
    // setters
    // functions
    getUserSpecificDocuments: getUserSpecificDocuments,
  };

  return <DocumentsContext.Provider value={contextValue}>{children}</DocumentsContext.Provider>;
};
