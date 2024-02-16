import { useContext } from 'react';
import { LoginContext } from '../../../context/LoginContext';

const LoginNotRegistered = () => {
  const loginContext = useContext(LoginContext);

  if (!loginContext) {
    return;
  }

  const { setCreateAccountFormStateOnClick } = loginContext;

  return (
    <div className="flex items-center gap-4">
      <p className="text-2xl text-grayText">Not Registered Yet?</p>
      <p
        onClick={() => {
          setCreateAccountFormStateOnClick(true);
        }}
        className="text-2xl cursor-pointer"
      >
        Create an account
      </p>
    </div>
  );
};

export default LoginNotRegistered;
