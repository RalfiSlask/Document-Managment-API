import { useContext } from 'react';
import { LoginContext } from '../../../context/LoginContext';

const LoginNotRegistered = () => {
  const loginContext = useContext(LoginContext);

  if (!loginContext) {
    return;
  }

  const { setCreateAccountFormStateOnClick } = loginContext;

  return (
    <div className="flex items-baseline gap-4">
      <p className="text-lg text-placeholder">Not Registered Yet?</p>
      <p
        onClick={() => {
          setCreateAccountFormStateOnClick(true);
        }}
        className="text-xl cursor-pointer hover:text-buttonBG"
      >
        Create an account
      </p>
    </div>
  );
};

export default LoginNotRegistered;
