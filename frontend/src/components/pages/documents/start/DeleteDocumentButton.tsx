import { DocumentsContext } from '../../../../context/DocumentsContext';
import { useContext } from 'react';
import { LoginContext } from '../../../../context/LoginContext';

type DocumentButtonPropsType = {
  documentId: number;
};

const DeleteDocumentButton: React.FC<DocumentButtonPropsType> = ({ documentId }) => {
  const documentsContext = useContext(DocumentsContext);
  const loginContext = useContext(LoginContext);

  if (!documentsContext || !loginContext) {
    return;
  }

  const { deleteDocument } = documentsContext;
  const { userId } = loginContext;

  return (
    <button
      onClick={() => {
        deleteDocument(userId, documentId);
      }}
      className="button-primary"
    >
      Delete
    </button>
  );
};

export default DeleteDocumentButton;
