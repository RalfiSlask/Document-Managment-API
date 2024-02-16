import { useContext } from 'react';
import { DocumentsContext } from '../../../context/DocumentsContext';

const AddNewDocumentButton = () => {
  const documentsContext = useContext(DocumentsContext);

  if (!documentsContext) {
    return;
  }
  const { handleClickOnNewDocument } = documentsContext;

  return (
    <button onClick={handleClickOnNewDocument} className="button-primary">
      AddNewDocumentButton
    </button>
  );
};

export default AddNewDocumentButton;
