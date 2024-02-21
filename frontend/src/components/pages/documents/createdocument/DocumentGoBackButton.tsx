import { useContext } from 'react';
import { DocumentsContext } from '../../../../context/DocumentsContext';

const DocumentGoBackButton = () => {
  const documentsContext = useContext(DocumentsContext);

  if (!documentsContext) {
    return;
  }

  const { handleClickOnGoBack } = documentsContext;

  return (
    <button onClick={handleClickOnGoBack} className="button-primary absolute left-56 top-24">
      Go Back
    </button>
  );
};

export default DocumentGoBackButton;
