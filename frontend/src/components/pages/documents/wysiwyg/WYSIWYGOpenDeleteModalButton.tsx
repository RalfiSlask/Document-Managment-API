import { DocumentsContext } from '../../../../context/DocumentsContext';
import { useContext } from 'react';

const WYSIWYGOpenDeleteModalButton = () => {
  const documentsContext = useContext(DocumentsContext);

  if (!documentsContext) {
    return;
  }

  const { setVisibilityOfDeleteModalOnClick } = documentsContext;

  return (
    <button
      onClick={() => {
        setVisibilityOfDeleteModalOnClick(true);
      }}
      className="button-primary"
    >
      Delete Document
    </button>
  );
};

export default WYSIWYGOpenDeleteModalButton;
