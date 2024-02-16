import React from 'react';
import LogoutButton from './LogoutButton';
import UserContainer from './UserContainer';

const Sidebar = () => {
  return (
    <section className="fixed h-full w-40 bg-yellow-300 left-0">
      <UserContainer />
      <LogoutButton />
    </section>
  );
};

export default Sidebar;
