import { useContext } from 'react';
import { DocumentsContext } from '../../../../context/DocumentsContext';
import { LoginContext } from '../../../../context/LoginContext';

const WYSIWYGGoBackButton = () => {
  const documentsContext = useContext(DocumentsContext);
  const loginContext = useContext(LoginContext);

  if (!documentsContext || !loginContext) {
    return;
  }

  const { handleClickOnAbortWYSIWYG } = documentsContext;
  const { userId } = loginContext;

  return (
    <button
      onClick={() => {
        handleClickOnAbortWYSIWYG(userId);
      }}
      className="absolute top-28 left-30 button-primary"
    >
      Go Back
    </button>
  );
};

export default WYSIWYGGoBackButton;
