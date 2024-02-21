import { useContext } from 'react';
import { LoginContext } from '../../../../context/LoginContext';
import userIcon from '../../../../assets/icons/user.svg';

const UserContainer = () => {
  const loginContext = useContext(LoginContext);

  if (!loginContext) {
    return;
  }

  const { userName } = loginContext;

  return (
    <div className="flex items-center gap-4">
      {userName}
      <img src={userIcon} alt="user logo" width="30" height="30" />
    </div>
  );
};

export default UserContainer;
