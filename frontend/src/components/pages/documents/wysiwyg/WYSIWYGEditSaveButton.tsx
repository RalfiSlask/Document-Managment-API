import { useContext } from 'react';
import { DocumentsContext } from '../../../../context/DocumentsContext';

const WYSIWYGEditSaveButton = () => {
  const documentsContext = useContext(DocumentsContext);

  if (!documentsContext) {
    return;
  }

  const { isEditModeEnabled, handleClickOnEditSaveButton, handleClickOnSaveAndUpdateDocument } = documentsContext;

  return (
    <>
      {isEditModeEnabled ? (
        <button onClick={handleClickOnEditSaveButton} className="button-primary">
          Edit
        </button>
      ) : (
        <button onClick={handleClickOnSaveAndUpdateDocument} className="button-primary">
          Save Changes
        </button>
      )}
    </>
  );
};

export default WYSIWYGEditSaveButton;
