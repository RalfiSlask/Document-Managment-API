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
    <main>
      {createAccountOpen ? (
        <section>
          <GoBackButton />
          <CreateAccountForm />
        </section>
      ) : (
        <section>
          <LoginForm />
          <LoginNotRegistered />
        </section>
      )}
    </main>
  );
};

export default LoginScreen;
