import React from 'react';
import Home from '../home/Home';
import LoginWatcher from '../login/LoginWatcher';
import SystemInfoProvider from '../system/SystemInfoProvider';

const HomePage = () => {
  return (
    <>
      <LoginWatcher />
      <SystemInfoProvider />
      <Home />
    </>
  );
};

export default HomePage;
