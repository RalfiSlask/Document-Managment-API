import editIcon from '../../../../assets/icons/edit.svg';
import { useContext } from 'react';
import { DocumentsContext } from '../../../../context/DocumentsContext';

type EditButtonPropsType = {
  documentId: number;
};

const EditButton: React.FC<EditButtonPropsType> = ({ documentId }) => {
  const documentsContext = useContext(DocumentsContext);

  if (!documentsContext) {
    return;
  }

  const { handleClickOnEditButton } = documentsContext;

  return (
    <button
      onClick={() => {
        handleClickOnEditButton(documentId);
      }}
      className="absolute w-[30px] h-[30px] bottom-4 right-4"
    >
      <img src={editIcon} alt="edit Icon" width="30" height="30" />
    </button>
  );
};

export default EditButton;
