import { useContext } from 'react';
import logoutIcon from '../../../../assets/icons/logout.svg';
import { LoginContext } from '../../../../context/LoginContext';
import { useNavigate } from 'react-router-dom';
import { DocumentsContext } from '../../../../context/DocumentsContext';

const LogoutButton = () => {
  const loginContext = useContext(LoginContext);
  const documentsContext = useContext(DocumentsContext);
  const navigate = useNavigate();

  if (!loginContext || !documentsContext) {
    return;
  }

  const { loggingOut, userId } = loginContext;
  const { handleClickOnAbortWYSIWYG } = documentsContext;

  const handleClickOnLogout = () => {
    loggingOut();
    handleClickOnAbortWYSIWYG(userId);
    navigate('/');
  };

  return (
    <div className="w-full flex items-center justify-center gap-4 absolute bottom-10">
      <img src={logoutIcon} alt="logout icon" width="30" height="30" className="fill-white" />
      <button onClick={handleClickOnLogout} className="text-xl font-bold hover:text-buttonBG">
        Logout
      </button>
    </div>
  );
};

export default LogoutButton;
