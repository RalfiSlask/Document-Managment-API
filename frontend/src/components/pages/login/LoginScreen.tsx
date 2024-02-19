import LoginForm from './LoginForm';
import LoginNotRegistered from './LoginNotRegistered';
import { useContext } from 'react';
import { LoginContext } from '../../../context/LoginContext';
import GoBackButton from './GoBackButton';
import CreateAccountForm from './CreateAccountForm';

const LoginScreen = () => {
  const loginContext = useContext(LoginContext);

  if (!loginContext) {
    return;
  }

  const { createAccountOpen } = loginContext;

  return (
    <main className="w-full flex flex-col items-center gap-12 mt-[100px]">
      <h1 className="text-buttonBG text-2xl">{createAccountOpen ? 'Create Account' : 'Login'}</h1>
      {createAccountOpen ? (
        <section className="pt-10 pb-12 px-6 bg-secondaryBG flex flex-col rounded-lg w-[500px] items-center gap-6">
          <GoBackButton />
          <CreateAccountForm />
        </section>
      ) : (
        <section className="pt-20 pb-12 px-6 bg-secondaryBG flex flex-col rounded-lg w-[500px] items-center gap-6">
          <LoginForm />
          <LoginNotRegistered />
        </section>
      )}
    </main>
  );
};

export default LoginScreen;
