import { useContext } from 'react';
import { DocumentsContext } from '../../../../context/DocumentsContext';

const NewDocumentResetButton = () => {
  const documentsContext = useContext(DocumentsContext);

  if (!documentsContext) {
    return;
  }

  const { handleResetOfDocumentForm } = documentsContext;

  return (
    <button onClick={handleResetOfDocumentForm} type="reset" className="button-primary">
      Reset
    </button>
  );
};

export default NewDocumentResetButton;
