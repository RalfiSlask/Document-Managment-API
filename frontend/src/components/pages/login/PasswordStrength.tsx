import { useContext } from 'react';
import { LoginContext } from '../../../context/LoginContext';
import { getPasswordStrengthTitle } from '../../../utils/types/helperfunctions';

const PasswordStrength = () => {
  const loginContext = useContext(LoginContext);

  if (!loginContext) {
    return;
  }

  const { passwordStrength } = loginContext;

  return (
    <div className="absolute right-6 bottom-[130px] w-[150px]">
      <div className="flex items-center gap-4">
        <div className="h-8 flex gap-2">
          <div
            className={`${
              passwordStrength > 6
                ? 'bg-buttonBG'
                : passwordStrength > 3
                ? 'bg-orange-400'
                : passwordStrength > 0
                ? 'bg-red-300'
                : 'bg-inputBG'
            } border border-solid border-textColor w-4 h-full rounded-sm`}
          ></div>
          <div
            className={`${
              passwordStrength > 6 ? 'bg-buttonBG' : passwordStrength > 3 ? 'bg-orange-400' : 'bg-inputBG'
            } border border-solid border-textColor w-4 h-full rounded-sm`}
          ></div>
          <div
            className={`${
              passwordStrength > 6 ? 'bg-buttonBG' : 'bg-inputBG'
            } border border-solid border-textColor w-4 h-full rounded-sm`}
          ></div>
        </div>
        <h2 className="font-bold uppercase text-lg">{getPasswordStrengthTitle(passwordStrength)}</h2>
      </div>
    </div>
  );
};

export default PasswordStrength;
