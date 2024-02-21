import LogoutButton from './LogoutButton';

import documentIcon from '../../../../assets/icons/document.svg';
import NavigationBar from './NavigationBar';

const Sidebar = () => {
  return (
    <section className="fixed h-full w-52 bg-secondaryBG left-0 border-r border-solid flex flex-col justify-between border-borderColor z-30 items-center pt-6">
      <div className="flex items-center gap-4">
        <img src={documentIcon} alt="document icon" width="30" height="30" />
        <h1 className="text-buttonBG font-bold text-xl">Documents</h1>
      </div>
      <NavigationBar />
      <LogoutButton />
    </section>
  );
};

export default Sidebar;
