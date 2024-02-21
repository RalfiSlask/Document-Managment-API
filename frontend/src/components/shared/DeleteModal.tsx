import CancelButton from './CancelButton';
import { useContext } from 'react';
import { DocumentsContext } from '../../context/DocumentsContext';
import WYSIWYGDeleteButton from '../pages/documents/wysiwyg/WYSIWYGDeleteButton';
import DeleteDocumentButton from '../pages/documents/start/DeleteDocumentButton';

const DeleteModal = () => {
  const documentsContext = useContext(DocumentsContext);

  if (!documentsContext) {
    return;
  }

  const { sectionsOpen, documentId } = documentsContext;

  return (
    <div className="flex flex-col justify-between fixed z-50 left-1/2 -translate-x-1/2 top-60 bg-secondaryBG text-center rounded-md h-[200px] w-[400px] p-4">
      <p className="text-lg">Are you sure you want to delete document?</p>
      <div className="w-full flex items-center justify-center gap-4">
        {sectionsOpen.wysiwyg && <WYSIWYGDeleteButton />}
        {sectionsOpen.start && <DeleteDocumentButton documentId={documentId} />}
        <CancelButton />
      </div>
    </div>
  );
};

export default DeleteModal;
