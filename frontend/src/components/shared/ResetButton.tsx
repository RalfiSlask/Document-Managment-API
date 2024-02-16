import { useContext } from 'react';
import { LoginContext } from '../../context/LoginContext';

type ResetPropsType = {
  type: string;
};

const ResetButton: React.FC<ResetPropsType> = ({ type }) => {
  const loginContext = useContext(LoginContext);

  if (!loginContext) {
    return;
  }

  const { handleResetOfForm } = loginContext;

  return (
    <button
      onClick={() => {
        handleResetOfForm(type);
      }}
      type="reset"
      className="button-primary"
    >
      Reset
    </button>
  );
};

export default ResetButton;
