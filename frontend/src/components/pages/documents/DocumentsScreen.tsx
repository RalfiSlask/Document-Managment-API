import { useContext, useEffect } from 'react';
import { DocumentsContext } from '../../../context/DocumentsContext';
import Sidebar from './Sidebar';
import Header from './Header';
import { LoginContext } from '../../../context/LoginContext';

const DocumentsScreen = () => {
  const documentsContext = useContext(DocumentsContext);
  const loginContext = useContext(LoginContext);

  if (!documentsContext || !loginContext) {
    return;
  }

  const { userId } = loginContext;
  const { getUserSpecificDocuments } = documentsContext;

  useEffect(() => {
    getUserSpecificDocuments(userId);
  }, []);

  return (
    <>
      <Header />
      <Sidebar />
      <main>
        <section></section>
      </main>
    </>
  );
};

export default DocumentsScreen;
