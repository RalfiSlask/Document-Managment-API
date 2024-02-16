import { useContext, useState } from 'react';
import { LoginContext } from '../../../context/LoginContext';
import { ICreateAccountFormInputValues } from '../../../utils/types/types';
import { getStringWithcapitalizedFirstLetter } from '../../../utils/types/helperfunctions';

type CreateAccountProps = {
  text: string;
  inputKey: keyof ICreateAccountFormInputValues;
  type: string;
  formSubmitted: boolean;
  setIsFormValid: React.Dispatch<
    React.SetStateAction<{
      email: boolean;
      name: boolean;
    }>
  >;
  setFormSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateAccountInput: React.FC<CreateAccountProps> = ({
  type,
  text,
  inputKey,
  formSubmitted,
  setIsFormValid,
  setFormSubmitted,
}) => {
  const [errorMessage, setErrorMessage] = useState('');
  const loginContext = useContext(LoginContext);

  if (!loginContext) {
    return;
  }

  const { createAccountInputValues, handleCreateAccountInputOnChange } = loginContext;

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex justify-between items-center">
        <label htmlFor={text}>{getStringWithcapitalizedFirstLetter(text)}</label>
        <p className="text-red-500">{formSubmitted && errorMessage}</p>
      </div>
      <input
        onInput={e => handleCreateAccountInputOnChange(inputKey, e, setErrorMessage, setIsFormValid, setFormSubmitted)}
        type={type}
        spellCheck="false"
        id={text}
        placeholder={text}
        className="input"
        value={createAccountInputValues[inputKey]}
      />
    </div>
  );
};

export default CreateAccountInput;
