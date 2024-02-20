import { useContext } from 'react';
import { DocumentsContext } from '../../context/DocumentsContext';

const CancelButton = () => {
  const documentsContext = useContext(DocumentsContext);

  if (!documentsContext) {
    return;
  }

  const { setVisibilityOfDeleteModalOnClick } = documentsContext;

  return (
    <button
      onClick={() => {
        setVisibilityOfDeleteModalOnClick(false);
      }}
      className="button-primary"
    >
      Cancel
    </button>
  );
};

export default CancelButton;
