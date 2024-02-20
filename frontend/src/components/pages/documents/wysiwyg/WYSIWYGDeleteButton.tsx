import { useContext } from 'react';
import { DocumentsContext } from '../../../../context/DocumentsContext';

const WYSIWYGDeleteButton = () => {
  const documentsContext = useContext(DocumentsContext);

  if (!documentsContext) {
    return;
  }

  const { currentDocument, deleteDocument, handleClickOnAbortWYSIWYG } = documentsContext;

  if (!currentDocument) {
    return;
  }

  const handleClickOnDeleteAndReturnToStart = async () => {
    deleteDocument(currentDocument.user_id, currentDocument.document_id);
    handleClickOnAbortWYSIWYG(currentDocument.user_id.toString());
  };

  return (
    <button className="button-primary" onClick={handleClickOnDeleteAndReturnToStart}>
      Delete
    </button>
  );
};

export default WYSIWYGDeleteButton;
