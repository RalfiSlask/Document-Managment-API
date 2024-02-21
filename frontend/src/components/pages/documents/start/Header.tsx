import UserContainer from './UserContainer';

const Header = () => {
  return (
    <header className="fixed h-20 flex items-center justify-end w-full bg-secondaryBG z-10 border-b border-solid border-borderColor pl-4 pr-8">
      <UserContainer />
    </header>
  );
};

export default Header;
