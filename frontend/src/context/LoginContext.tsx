import { createContext, ReactNode, useState, FormEvent } from 'react';
import { ILoginFormInputValues, ICreateAccountFormInputValues } from '../utils/types/types';
import { textOnlyRegx, emailRegex } from '../utils/types/regex';

export const LoginContext = createContext<undefined | ILoginTypes>(undefined);

interface ILoginTypes {
  // states
  userName: string;
  loginInputValues: ILoginFormInputValues;
  createAccountInputValues: ICreateAccountFormInputValues;
  loginErrorMessage: string;
  createAccountErrorMessage: string;
  createAccountOpen: boolean;
  formSubmitted: boolean;
  // setters
  setIsFormValid: React.Dispatch<
    React.SetStateAction<{
      email: boolean;
      name: boolean;
    }>
  >;
  setFormSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
  // functions
  handleResetOfForm: (type: string) => void;
  handleLoginSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  handleLoginInputOnChange: (inputKey: keyof ILoginFormInputValues, e: FormEvent<HTMLInputElement>) => void;
  setCreateAccountFormStateOnClick: (state: boolean) => void;
  handleCreateAccountInputOnChange: (
    inputKey: keyof ICreateAccountFormInputValues,
    e: FormEvent<HTMLInputElement>,
    setError: React.Dispatch<React.SetStateAction<string>>,
    setIsFormValid: React.Dispatch<
      React.SetStateAction<{
        email: boolean;
        name: boolean;
      }>
    >,
    setFormSubmitted: React.Dispatch<React.SetStateAction<boolean>>
  ) => void;
  handleCreateAccountSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
}

interface ILoginChildrenType {
  children: ReactNode;
}

export const LoginProvider: React.FC<ILoginChildrenType> = ({ children }) => {
  const [loginInputValues, setLoginInputValues] = useState({ email: '', password: '' });
  const [createAccountInputValues, setCreateAccountInputValues] = useState({ name: '', email: '', password: '' });
  const [loginErrorMessage, setLoginErrorMessage] = useState('');
  const [createAccountErrorMessage, setCreateAccountErrorMessage] = useState('');
  const [userName, setUserName] = useState('');
  const [isFormValid, setIsFormValid] = useState({ email: false, name: false });
  const [createAccountOpen, setCreateAccountOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleResetOfForm = (type: string) => {
    if (type === 'login') {
      setLoginInputValues({ email: '', password: '' });
      setLoginErrorMessage('');
    } else if (type === 'create') {
      setCreateAccountInputValues({ name: '', email: '', password: '' });
      setCreateAccountErrorMessage('');
    }
  };

  const setCreateAccountFormStateOnClick = (state: boolean) => {
    state ? setCreateAccountOpen(true) : setCreateAccountOpen(false);
    state ? handleResetOfForm('login') : handleResetOfForm('create');
  };

  const postLoginUser = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginInputValues),
      });
      if (!response.ok) {
        setLoginErrorMessage('user does not exist');
        return;
      }
      const jsonData = await response.json();
      // must send back json object with id and name
      if (jsonData.id) {
        console.log(jsonData);
        localStorage.setItem('user', JSON.stringify({ id: jsonData.id, name: jsonData.name }));
        setLoginErrorMessage('');
        setUserName(jsonData.name);
      }
    } catch (err) {
      console.log(err, 'could not post user');
    }
  };

  const postCreateAccountFormValues = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/users/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(createAccountInputValues),
      });
      if (!response.ok) {
        setCreateAccountErrorMessage('user already exists');
        return;
      }
      const jsonData = await response.json();
      if (jsonData) {
        handleResetOfForm('create');
        setCreateAccountErrorMessage('');
        setIsFormValid({ email: false, name: false });
        alert('succesfully created account');
      }
    } catch (err) {
      console.log(err, 'could not post input values');
    }
  };

  const handleCreateAccountSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = createAccountInputValues;
    if (email.trim().length <= 0 || password.trim().length <= 0) {
      setCreateAccountErrorMessage('you have to fill in inputs');
    } else if (!isFormValid.email || !isFormValid.name) {
      setFormSubmitted(true);
    } else {
      console.log('hej goes through');
      setFormSubmitted(true);
      setCreateAccountErrorMessage('');
      await postCreateAccountFormValues();
    }
  };

  const handleLoginSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = loginInputValues;
    if (email.trim().length <= 0 || password.trim().length <= 0) {
      setLoginErrorMessage('you have to fill in inputs');
    } else {
      await postLoginUser();
    }
  };

  const handleLoginInputOnChange = (inputKey: keyof ILoginFormInputValues, e: FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setLoginInputValues(prev => ({ ...prev, [inputKey]: target.value }));
    setLoginErrorMessage('');
  };

  const handleCreateAccountInputOnChange = (
    inputKey: keyof ICreateAccountFormInputValues,
    e: FormEvent<HTMLInputElement>,
    setError: React.Dispatch<React.SetStateAction<string>>,
    setIsFormValid: React.Dispatch<
      React.SetStateAction<{
        email: boolean;
        name: boolean;
      }>
    >,
    setFormSubmitted: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    const target = e.target as HTMLInputElement;
    setCreateAccountInputValues(prev => ({ ...prev, [inputKey]: target.value }));
    setCreateAccountErrorMessage('');
    setFormSubmitted(false);
    setError('');
    let isValid = false;

    if (inputKey === 'name') {
      isValid = textOnlyRegx.test(target.value);
    } else if (inputKey === 'email') {
      isValid = emailRegex.test(target.value);
    }

    if (inputKey !== 'password') {
      setIsFormValid(prev => ({
        ...prev,
        [inputKey]: isValid,
      }));
    }

    if (!isValid) {
      if (inputKey === 'name') {
        setError('not valid name');
      } else if (inputKey === 'email') {
        setError('not valid email');
      }
    }
  };

  const contextValue = {
    // states
    userName: userName,
    createAccountOpen: createAccountOpen,
    loginInputValues: loginInputValues,
    createAccountInputValues: createAccountInputValues,
    loginErrorMessage: loginErrorMessage,
    createAccountErrorMessage: createAccountErrorMessage,
    formSubmitted: formSubmitted,
    // setters
    setIsFormValid: setIsFormValid,
    setFormSubmitted: setFormSubmitted,
    // functions
    handleResetOfForm: handleResetOfForm,
    handleLoginSubmit: handleLoginSubmit,
    handleLoginInputOnChange: handleLoginInputOnChange,
    setCreateAccountFormStateOnClick: setCreateAccountFormStateOnClick,
    handleCreateAccountInputOnChange: handleCreateAccountInputOnChange,
    handleCreateAccountSubmit: handleCreateAccountSubmit,
  };

  return <LoginContext.Provider value={contextValue}>{children}</LoginContext.Provider>;
};
