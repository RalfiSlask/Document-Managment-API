import { createContext, ReactNode, useEffect, useState, FormEvent } from 'react';
import { IDocumentObjectType, ISectionsOpenType, INewDocumentFormInputValues } from '../utils/types/types';

export const DocumentsContext = createContext<undefined | IDocumentsTypes>(undefined);

interface IDocumentsTypes {
  // states
  newDocumentInputValues: INewDocumentFormInputValues;
  documents: IDocumentObjectType[] | null;
  sectionsOpen: ISectionsOpenType;
  formSubmitted: boolean;
  documentErrorMessage: string;
  // setters
  setFormSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
  // functions
  getUserSpecificDocuments: (userId: string) => void;
  handleClickOnNewDocument: () => void;
  handleResetOfDocumentForm: () => void;
  handleDocumentFormInputOnChange: (
    inputKey: keyof INewDocumentFormInputValues,
    e: FormEvent<HTMLInputElement>,
    setFormSubmitted: React.Dispatch<React.SetStateAction<boolean>>
  ) => void;
  handleNewDocumentSubmit: (e: FormEvent<HTMLFormElement>, userId: string) => Promise<void>;
  deleteDocument: (userId: number, documentId: number) => Promise<void>;
}

interface IDocumentType {
  children: ReactNode;
}

export const DocumentsProvider: React.FC<IDocumentType> = ({ children }) => {
  const [documents, setDocuments] = useState<IDocumentObjectType[] | null>(null);
  const [sectionsOpen, setSectionsOpen] = useState({ start: true, create: false, wysiwyg: false });
  const [newDocumentInputValues, setNewDocumentInputValues] = useState<INewDocumentFormInputValues>({
    title: '',
    description: '',
    content: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [documentErrorMessage, setDocumentErrorMessage] = useState('');

  const handleClickOnNewDocument = () => {
    setSectionsOpen(prev => ({ ...prev, start: false, create: true }));
  };

  const deleteDocument = async (userId: number, documentId: number) => {
    try {
      const response = await fetch(`http://localhost:3000/api/documents/remove`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: userId, documentId: documentId }),
      });

      const jsonData = await response.json();
      if (jsonData) {
        console.log(jsonData);
        await getUserSpecificDocuments(userId.toString());
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getUserSpecificDocuments = async (userId: string) => {
    console.log(userId);
    try {
      const response = await fetch(`http://localhost:3000/api/documents/${userId}`);
      if (!response.ok) {
        return;
      }
      const jsonData = await response.json();
      console.log(jsonData);
      if (jsonData) {
        console.log(jsonData);
        setDocuments(jsonData);
      }
    } catch (err) {
      console.log(err, 'could not get documents');
    }
  };

  const postCreateNewDocumentFormValues = async (userId: string) => {
    try {
      const response = await fetch(`http://localhost:3000/api/documents/add/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newDocumentInputValues),
      });
      if (!response.ok) {
        return;
      }
      const jsonData = await response.json();
      if (jsonData) {
        console.log(jsonData);
      }
    } catch (err) {
      console.log(err, 'could not post input values');
    }
  };

  const handleResetOfDocumentForm = () => {
    setNewDocumentInputValues({ title: '', description: '', content: '' });
  };

  const handleDocumentFormInputOnChange = (
    inputKey: keyof INewDocumentFormInputValues,
    e: FormEvent<HTMLInputElement>,
    setFormSubmitted: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    const target = e.target as HTMLInputElement;
    setNewDocumentInputValues(prev => ({ ...prev, [inputKey]: target.value }));
    setFormSubmitted(false);
    setDocumentErrorMessage('');
  };

  const handleNewDocumentSubmit = async (e: FormEvent<HTMLFormElement>, userId: string) => {
    e.preventDefault();
    const { title, description } = newDocumentInputValues;
    if (title.trim().length <= 0 || description.trim().length <= 0) {
      setDocumentErrorMessage('you have to fill in inputs');
    } else {
      await postCreateNewDocumentFormValues(userId);
    }
  };

  useEffect(() => {
    console.log(sectionsOpen);
  }, [sectionsOpen]);

  const contextValue = {
    // states
    documents: documents,
    sectionsOpen: sectionsOpen,
    newDocumentInputValues: newDocumentInputValues,
    formSubmitted: formSubmitted,
    documentErrorMessage: documentErrorMessage,
    // setters
    setFormSubmitted: setFormSubmitted,
    // functions
    getUserSpecificDocuments: getUserSpecificDocuments,
    handleClickOnNewDocument: handleClickOnNewDocument,
    handleResetOfDocumentForm: handleResetOfDocumentForm,
    handleDocumentFormInputOnChange: handleDocumentFormInputOnChange,
    handleNewDocumentSubmit: handleNewDocumentSubmit,
    deleteDocument: deleteDocument,
  };

  return <DocumentsContext.Provider value={contextValue}>{children}</DocumentsContext.Provider>;
};
