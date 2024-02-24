import { createContext, ReactNode, useState, FormEvent, useEffect } from 'react';
import { IDocumentObjectType, ISectionsOpenType, INewDocumentFormInputValues } from '../utils/types/types';
import DOMPurify from 'dompurify';

export const DocumentsContext = createContext<undefined | IDocumentsTypes>(undefined);

interface IDocumentsTypes {
  // states
  newDocumentInputValues: INewDocumentFormInputValues;
  documents: IDocumentObjectType[] | null;
  sectionsOpen: ISectionsOpenType;
  formSubmitted: boolean;
  documentErrorMessage: string;
  currentDocument: IDocumentObjectType | null;
  isEditModeEnabled: boolean;
  isDeleteModalOpen: boolean;
  documentId: number;
  initValue: string;
  successMessage: string;
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
  deleteDocument: (userId: string, documentId: number) => Promise<void>;
  handleClickOnGoBack: () => void;
  handleClickOnAbortWYSIWYG: (userId: string) => void;
  handleClickOnEditButton: (documentId: number) => void;
  changeCurrentDocumentOnChange: (e: FormEvent<HTMLInputElement>, inputKey: keyof IDocumentObjectType) => void;
  handleClickOnEditSaveButton: () => void;
  handleClickOnSaveAndUpdateDocument: () => void;
  setVisibilityOfDeleteModalOnClick: (state: boolean) => void;
  settingDocumentId: (documentId: number) => void;
  handleChangeOnEditor: (content: string) => void;
  handleClickOnAbort: () => void;
}

interface IDocumentType {
  children: ReactNode;
}

export const DocumentsProvider: React.FC<IDocumentType> = ({ children }) => {
  // states for documents
  const [documents, setDocuments] = useState<IDocumentObjectType[] | null>(null);
  const [currentDocument, setCurrentDocument] = useState<IDocumentObjectType | null>(null);
  const [documentId, setDocumentId] = useState(0);
  // create new document form states
  const [newDocumentInputValues, setNewDocumentInputValues] = useState<INewDocumentFormInputValues>({
    title: '',
    description: '',
    content: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  // booleans controling which sections/modals are open
  const [sectionsOpen, setSectionsOpen] = useState({ start: true, create: false, wysiwyg: false });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  // WYSIWYG Editor Content
  const [initValue, setInitValue] = useState('');
  const [editorContent, setEditorContent] = useState('');
  // WYSIWTG Edit Mode
  const [isEditModeEnabled, setIsEditModeEnabled] = useState(false);
  // user messages
  const [successMessage, setSuccessMessage] = useState('');
  const [documentErrorMessage, setDocumentErrorMessage] = useState('');

  /**
   * GET request to get a response with all documents for a specific user
   * Setting document state to the documents recieved from the server
   * @param {string} userId - ID of logged in user
   * @returns void
   */
  const getUserSpecificDocuments = async (userId: string) => {
    try {
      const response = await fetch(`http://localhost:3000/api/documents/${userId}`, {
        headers: {
          'Content-Type': 'application/json',
          /*'Authorization': `Bearer ${token}`, */
        },
        credentials: 'include',
      });
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

  /**
   * DELETE request to server for soft delete of document
   * Closes the delete modal
   * After succesful deletion, updates the user documents to current state
   * @param {number} userId - Logged in user ID
   * @param {number} documentId  - ID of current selected document
   * @returns void
   */
  const deleteDocument = async (userId: string, documentId: number) => {
    try {
      const response = await fetch(`http://localhost:3000/api/documents/remove`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ userId: userId, documentId: documentId }),
      });

      const jsonData = await response.json();
      if (jsonData) {
        await getUserSpecificDocuments(userId);
        setIsDeleteModalOpen(false);
        showSuccessMessageTemp('succesfully deleted document!', 1500);
      }
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * POST request to server for inserting new document related to user
   * If succesful, move user to WYSIWYG section
   * Updated users documents with GET request to server
   * @param {string} userId - ID of logged in user
   * @returns void
   */
  const postCreateNewDocumentFormValues = async (userId: string) => {
    try {
      const response = await fetch(`http://localhost:3000/api/documents/add/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(newDocumentInputValues),
      });
      if (!response.ok) {
        return;
      }
      const jsonData = await response.json();
      if (jsonData) {
        setSectionsOpen(prev => ({ ...prev, create: false, wysiwyg: true }));
        await getUserSpecificDocuments(userId);
      }
    } catch (err) {
      console.log(err, 'could not post input values');
    }
  };

  /**
   * PATCH request to server for updating a document
   * Sends a JSON object of the current selected document to the server
   * If succesful, object will be updated in the server
   * @returns void
   */
  const updateDocument = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/documents/update`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(currentDocument),
      });
      if (!response.ok) {
        return;
      }
      const jsonData = await response.json();
      if (jsonData) {
        showSuccessMessageTemp('succesfully updated document!', 1500);
      }
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * Submit function of the input values in the new document form
   * If inputs are not filled in, responds with an error message to user
   * If inputs are filled, reset form and WYSIWYG values
   * awaits and sends the values from the form to the server
   * @param {FormEvent<HTMLFormElement>} e - submit event for the form when creating a new document
   * @param {string} userId - ID of logged in user
   */
  const handleNewDocumentSubmit = async (e: FormEvent<HTMLFormElement>, userId: string) => {
    e.preventDefault();
    const { title, description } = newDocumentInputValues;
    if (title.trim().length <= 0 || description.trim().length <= 0) {
      setDocumentErrorMessage('you have to fill in inputs');
    } else {
      handleResetOfDocumentForm();
      setInitValue('');
      setIsEditModeEnabled(false);
      await postCreateNewDocumentFormValues(userId);
    }
  };

  /**
   * Handles changes for the WYSIWYG editor content
   * Sanitizes the content using DOMPurify
   * @param {string} content - WYSIWYG editor content
   */
  const handleChangeOnEditor = (content: string) => {
    const sanitizedContent = DOMPurify.sanitize(content);

    setEditorContent(sanitizedContent);
  };

  /**
   * Shows message with a timeout of provided duration
   * @param {string} message displayed message for user
   * @param {number} duration - duration of timeout, has a default 2000 value
   */
  const showSuccessMessageTemp = (message: string, duration: number = 2000) => {
    setSuccessMessage(message);
    setTimeout(() => {
      setSuccessMessage('');
    }, duration);
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

  const handleClickOnEditButton = (documentId: number) => {
    if (documents !== null) {
      const shallowDocuments = [...documents];
      const currentDoc = shallowDocuments.find(document => document.document_id === documentId);
      if (currentDoc) {
        setCurrentDocument(currentDoc);
        setSectionsOpen(prev => ({ ...prev, start: false, wysiwyg: true }));
        setIsEditModeEnabled(true);
        setInitValue(currentDoc.content);
      }
    }
  };

  const handleClickOnEditSaveButton = async () => {
    setIsEditModeEnabled(false);
  };

  const handleClickOnAbort = async () => {
    setIsEditModeEnabled(true);
  };

  const setVisibilityOfDeleteModalOnClick = (state: boolean) => {
    setIsDeleteModalOpen(state);
  };

  const handleClickOnSaveAndUpdateDocument = async () => {
    setIsEditModeEnabled(true);
    await updateDocument();
  };

  const settingDocumentId = (documentId: number) => {
    setDocumentId(documentId);
  };

  const handleClickOnNewDocument = () => {
    setSectionsOpen(prev => ({ ...prev, start: false, create: true }));
  };

  const handleClickOnGoBack = () => {
    setSuccessMessage('');
    handleResetOfDocumentForm();
    setSectionsOpen(prev => ({ ...prev, start: true, create: false }));
  };

  const handleClickOnAbortWYSIWYG = async (userId: string) => {
    setSectionsOpen(prev => ({ ...prev, start: true, create: false, wysiwyg: false }));
    setCurrentDocument(null);
    await getUserSpecificDocuments(userId);
  };

  const handleResetOfDocumentForm = () => {
    setNewDocumentInputValues({ title: '', description: '', content: '' });
  };

  const settingCurrentDocument = async () => {
    if (documents !== null) {
      const shallowDocuments = [...documents];
      setCurrentDocument(shallowDocuments[shallowDocuments.length - 1]);
    }
  };

  useEffect(() => {
    setCurrentDocument(prev => {
      if (prev) {
        return { ...prev, content: editorContent };
      } else {
        return prev;
      }
    });
  }, [editorContent, setCurrentDocument]);

  useEffect(() => {
    if (currentDocument?.content) {
      setEditorContent(currentDocument?.content);
    }
  }, [currentDocument]);

  useEffect(() => {
    if (documents !== null) {
      settingCurrentDocument();
    }
  }, [documents]);

  const contextValue = {
    // states
    documentId: documentId,
    documents: documents,
    sectionsOpen: sectionsOpen,
    newDocumentInputValues: newDocumentInputValues,
    formSubmitted: formSubmitted,
    documentErrorMessage: documentErrorMessage,
    currentDocument: currentDocument,
    isEditModeEnabled: isEditModeEnabled,
    isDeleteModalOpen: isDeleteModalOpen,
    initValue: initValue,
    successMessage: successMessage,
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
    handleChangeOnEditor: handleChangeOnEditor,
    handleClickOnAbort: handleClickOnAbort,
  };

  return <DocumentsContext.Provider value={contextValue}>{children}</DocumentsContext.Provider>;
};
