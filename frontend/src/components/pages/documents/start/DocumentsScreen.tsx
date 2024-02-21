import { useContext, useEffect } from 'react';
import { DocumentsContext } from '../../../../context/DocumentsContext';
import Sidebar from './Sidebar';
import Header from './Header';
import { LoginContext } from '../../../../context/LoginContext';
import DocumentComponent from './DocumentComponent';
import CreateNewDocument from '../createdocument/CreateNewDocument';
import AddNewDocumentButton from './AddNewDocumentButton';
import WYSIWYG from '../wysiwyg/WYSIWYG';
import Lightbox from '../../../shared/ui/Lightbox';
import DeleteModal from '../../../shared/DeleteModal';

const DocumentsScreen = () => {
  const documentsContext = useContext(DocumentsContext);
  const loginContext = useContext(LoginContext);

  if (!documentsContext || !loginContext) {
    return;
  }

  const { userId } = loginContext;
  const { getUserSpecificDocuments, documents, sectionsOpen, isDeleteModalOpen } = documentsContext;

  useEffect(() => {
    getUserSpecificDocuments(userId);
  }, [userId]);

  return (
    <>
      <Header />
      <Sidebar />
      <main className="w-full h-full mt-[200px] pl-[260px] flex flex-col gap-14 pr-8 items-center">
        {documents && documents.length === 0 && sectionsOpen.start && (
          <p className="text-2xl">You have no documents, please add!</p>
        )}
        <div className={`w-full flex gap-4 ${documents && documents.length === 0 ? 'justify-center' : ''}`}>
          {sectionsOpen.start && (
            <>
              <section className="flex flex-wrap gap-x-6 gap-y-4 justify-center">
                {documents
                  ? documents.map((document, index) => {
                      return <DocumentComponent key={document.document_id} number={index + 1} document={document} />;
                    })
                  : null}
              </section>
              <AddNewDocumentButton />
            </>
          )}
          {sectionsOpen.create && <CreateNewDocument />}
          {sectionsOpen.wysiwyg && <WYSIWYG />}
          {isDeleteModalOpen && (
            <>
              <Lightbox />
              <DeleteModal />
            </>
          )}
        </div>
      </main>
    </>
  );
};

export default DocumentsScreen;
