import { useContext /* useState */ } from 'react';
import ResetButton from '../../shared/ResetButton';
import SubmitButton from '../../shared/SubmitButton';
import LoginInput from './LoginInput';
import { LoginContext } from '../../../context/LoginContext';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const loginContext = useContext(LoginContext);
  const navigate = useNavigate();

  if (!loginContext) {
    return;
  }

  const { handleLoginSubmit } = loginContext;

  return (
    <>
      <form
        onSubmit={e => {
          handleLoginSubmit(e, navigate);
        }}
        className="flex flex-col gap-10 w-[350px] items-center"
      >
        <div className="w-full flex flex-col gap-4">
          <LoginInput type="text" text="email" inputKey="email" />
          <LoginInput type="password" text="password" inputKey="password" />
        </div>
        <div className="flex justify-center gap-4">
          <SubmitButton title={'Submit'} />
          <ResetButton type={'login'} />
        </div>
      </form>
    </>
  );
}

export default LoginForm;
