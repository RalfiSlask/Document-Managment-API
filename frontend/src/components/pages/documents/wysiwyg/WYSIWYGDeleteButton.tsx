import { useContext } from 'react';
import { DocumentsContext } from '../../../../context/DocumentsContext';
import { LoginContext } from '../../../../context/LoginContext';

const WYSIWYGDeleteButton = () => {
  const documentsContext = useContext(DocumentsContext);
  const loginContext = useContext(LoginContext);

  if (!documentsContext || !loginContext) {
    return;
  }

  const { currentDocument, deleteDocument, handleClickOnAbortWYSIWYG } = documentsContext;

  if (!currentDocument) {
    return;
  }

  const handleClickOnDeleteAndReturnToStart = async () => {
    deleteDocument(currentDocument.user_id, currentDocument.document_id);
    handleClickOnAbortWYSIWYG(currentDocument.user_id);
  };

  return (
    <button className="button-primary" onClick={handleClickOnDeleteAndReturnToStart}>
      Delete
    </button>
  );
};

export default WYSIWYGDeleteButton;
