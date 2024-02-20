import { createContext, ReactNode, useState, FormEvent, useEffect } from 'react';
import { IDocumentObjectType, ISectionsOpenType, INewDocumentFormInputValues } from '../utils/types/types';

export const DocumentsContext = createContext<undefined | IDocumentsTypes>(undefined);

interface IDocumentsTypes {
  // states
  newDocumentInputValues: INewDocumentFormInputValues;
  documents: IDocumentObjectType[] | null;
  sectionsOpen: ISectionsOpenType;
  formSubmitted: boolean;
  documentErrorMessage: string;
  currentDocument: IDocumentObjectType | null;
  isSaveEditButtonClicked: boolean;
  isDeleteModalOpen: boolean;
  documentId: number;
  // setters
  setFormSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentDocument: React.Dispatch<React.SetStateAction<IDocumentObjectType | null>>;
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
  handleClickOnGoBack: () => void;
  handleClickOnAbortWYSIWYG: (userId: string) => void;
  handleClickOnEditButton: (documentId: number) => void;
  changeCurrentDocumentOnChange: (e: FormEvent<HTMLInputElement>, inputKey: keyof IDocumentObjectType) => void;
  handleClickOnEditSaveButton: () => void;
  handleClickOnSaveAndUpdateDocument: () => void;
  setVisibilityOfDeleteModalOnClick: (state: boolean) => void;
  settingDocumentId: (documentId: number) => void;
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
  const [currentDocument, setCurrentDocument] = useState<IDocumentObjectType | null>(null);
  const [isSaveEditButtonClicked, setIsSaveEditButtonClicked] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [documentId, setDocumentId] = useState(0);

  const handleClickOnEditSaveButton = async () => {
    setIsSaveEditButtonClicked(prevState => !prevState);
  };

  const setVisibilityOfDeleteModalOnClick = (state: boolean) => {
    setIsDeleteModalOpen(state);
  };

  const handleClickOnSaveAndUpdateDocument = async () => {
    setIsSaveEditButtonClicked(prevState => !prevState);
    await updateDocument();
  };

  const updateDocument = async () => {
    console.log('currentDocument:', currentDocument);
    try {
      const response = await fetch(`http://localhost:3000/api/documents/update`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(currentDocument),
      });
      if (!response.ok) {
        return;
      }
      const jsonData = await response.json();
      if (jsonData) {
        console.log(jsonData);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const changeCurrentDocumentOnChange = (e: FormEvent<HTMLInputElement>, inputKey: keyof IDocumentObjectType) => {
    const target = e.target as HTMLInputElement;
    setCurrentDocument(prev => {
      if (prev) {
        return { ...prev, [inputKey]: target.value };
      } else {
        return prev;
      }
    });
  };

  const handleClickOnEditButton = (documentId: number) => {
    if (documents !== null) {
      const shallowDocuments = [...documents];
      const currentDoc = shallowDocuments.find(document => document.document_id === documentId);
      if (currentDoc) {
        setCurrentDocument(currentDoc);
        setSectionsOpen(prev => ({ ...prev, start: false, wysiwyg: true }));
        setIsSaveEditButtonClicked(true);
      }
    }
  };

  const settingDocumentId = (documentId: number) => {
    setDocumentId(documentId);
  };

  const handleClickOnNewDocument = () => {
    setSectionsOpen(prev => ({ ...prev, start: false, create: true }));
  };

  const handleClickOnGoBack = () => {
    handleResetOfDocumentForm();
    setSectionsOpen(prev => ({ ...prev, start: true, create: false }));
  };

  const handleClickOnAbortWYSIWYG = async (userId: string) => {
    setSectionsOpen(prev => ({ ...prev, start: true, wysiwyg: false }));
    setCurrentDocument(null);
    await getUserSpecificDocuments(userId);
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
        setIsDeleteModalOpen(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getUserSpecificDocuments = async (userId: string) => {
    try {
      const response = await fetch(`http://localhost:3000/api/documents/${userId}`);
      if (!response.ok) {
        return;
      }
      const jsonData = await response.json();
      if (jsonData) {
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
        setSectionsOpen(prev => ({ ...prev, create: false, wysiwyg: true }));
        await getUserSpecificDocuments(userId);
      }
    } catch (err) {
      console.log(err, 'could not post input values');
    }
  };

  useEffect(() => {
    console.log('documents:', documents);
  }, [documents]);

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

  useEffect(() => {
    if (documents !== null) {
      settingCurrentDocument();
    }
  }, [documents]);

  useEffect(() => {
    console.log('current:', currentDocument);
  }, [currentDocument]);

  const settingCurrentDocument = async () => {
    if (documents !== null) {
      const shallowDocuments = [...documents];
      setCurrentDocument(shallowDocuments[shallowDocuments.length - 1]);
    }
  };

  const handleNewDocumentSubmit = async (e: FormEvent<HTMLFormElement>, userId: string) => {
    e.preventDefault();

    const { title, description } = newDocumentInputValues;
    if (title.trim().length <= 0 || description.trim().length <= 0) {
      setDocumentErrorMessage('you have to fill in inputs');
    } else {
      handleResetOfDocumentForm();
      await postCreateNewDocumentFormValues(userId);
    }
  };

  const contextValue = {
    // states
    documentId: documentId,
    documents: documents,
    sectionsOpen: sectionsOpen,
    newDocumentInputValues: newDocumentInputValues,
    formSubmitted: formSubmitted,
    documentErrorMessage: documentErrorMessage,
    currentDocument: currentDocument,
    isSaveEditButtonClicked: isSaveEditButtonClicked,
    isDeleteModalOpen: isDeleteModalOpen,
    // setters
    setFormSubmitted: setFormSubmitted,
    setCurrentDocument: setCurrentDocument,
    // functions
    getUserSpecificDocuments: getUserSpecificDocuments,
    handleClickOnNewDocument: handleClickOnNewDocument,
    handleResetOfDocumentForm: handleResetOfDocumentForm,
    handleDocumentFormInputOnChange: handleDocumentFormInputOnChange,
    handleNewDocumentSubmit: handleNewDocumentSubmit,
    deleteDocument: deleteDocument,
    handleClickOnGoBack: handleClickOnGoBack,
    handleClickOnAbortWYSIWYG: handleClickOnAbortWYSIWYG,
    handleClickOnEditButton: handleClickOnEditButton,
    changeCurrentDocumentOnChange: changeCurrentDocumentOnChange,
    handleClickOnEditSaveButton: handleClickOnEditSaveButton,
    handleClickOnSaveAndUpdateDocument: handleClickOnSaveAndUpdateDocument,
    setVisibilityOfDeleteModalOnClick: setVisibilityOfDeleteModalOnClick,
    settingDocumentId: settingDocumentId,
  };

  return <DocumentsContext.Provider value={contextValue}>{children}</DocumentsContext.Provider>;
};
