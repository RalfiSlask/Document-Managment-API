import { useContext } from 'react';
import { DocumentsContext } from '../../../../context/DocumentsContext';

const AddNewDocumentButton = () => {
  const documentsContext = useContext(DocumentsContext);

  if (!documentsContext) {
    return;
  }

  const { handleClickOnNewDocument } = documentsContext;

  return (
    <button
      onClick={handleClickOnNewDocument}
      className="button-primary w-[260px] max-h-[44px] min-w-[120px] max-w-[160px]"
    >
      Add New
    </button>
  );
};

export default AddNewDocumentButton;
