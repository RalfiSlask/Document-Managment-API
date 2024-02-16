import { useContext /* useState */ } from 'react';
import ResetButton from '../../shared/ResetButton';
import SubmitButton from '../../shared/SubmitButton';
import LoginInput from './LoginInput';
import { LoginContext } from '../../../context/LoginContext';

function LoginForm() {
  const loginContext = useContext(LoginContext);

  if (!loginContext) {
    return;
  }

  const { handleLoginSubmit, loginErrorMessage } = loginContext;

  return (
    <>
      <h1 className="text-orange-500">Test</h1>
      <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4 w-[300px] items-center">
        <p className="text-red-500 text-lg h-[30px]">{loginErrorMessage}</p>
        <LoginInput type="text" text="email" inputKey="email" />
        <LoginInput type="password" text="password" inputKey="password" />
        <div className="flex justify-center gap-4">
          <SubmitButton title={'Submit'} />
          <ResetButton type={'login'} />
        </div>
      </form>
    </>
  );
}

export default LoginForm;
