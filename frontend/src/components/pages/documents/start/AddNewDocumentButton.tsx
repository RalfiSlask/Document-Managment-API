import { useContext } from 'react';
import { DocumentsContext } from '../../../../context/DocumentsContext';

const AddNewDocumentButton = () => {
  const documentsContext = useContext(DocumentsContext);

  if (!documentsContext) {
    return;
  }
  const { handleClickOnNewDocument } = documentsContext;

  return (
    <button onClick={handleClickOnNewDocument} className="button-primary w-[260px] min-h-[44px] max-h-[80px]">
      Add New Document
    </button>
  );
};

export default AddNewDocumentButton;
