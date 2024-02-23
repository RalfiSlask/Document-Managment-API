import { useContext } from 'react';
import { DocumentsContext } from '../../../../context/DocumentsContext';

const WYSIWYGAbortButton = () => {
  const documentsContext = useContext(DocumentsContext);

  if (!documentsContext) {
    return;
  }

  const { handleClickOnAbort } = documentsContext;

  return (
    <button onClick={handleClickOnAbort} className="button-primary">
      Abort
    </button>
  );
};

export default WYSIWYGAbortButton;
