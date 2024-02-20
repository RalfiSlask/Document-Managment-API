import { DocumentsContext } from '../../../../context/DocumentsContext';
import { useContext } from 'react';
import deleteIcon from '../../../../assets/icons/delete.svg';

type DocumentButtonPropsType = {
  documentId: number;
};

const OpenDeleteModalButton: React.FC<DocumentButtonPropsType> = ({ documentId }) => {
  const documentsContext = useContext(DocumentsContext);

  if (!documentsContext) {
    return;
  }

  const { setVisibilityOfDeleteModalOnClick, settingDocumentId } = documentsContext;

  const openModalOnClick = () => {
    setVisibilityOfDeleteModalOnClick(true);
    settingDocumentId(documentId);
  };

  return (
    <button onClick={openModalOnClick} className="w-[30px] h-[30px]">
      <img src={deleteIcon} alt="delete icon" />
    </button>
  );
};

export default OpenDeleteModalButton;
