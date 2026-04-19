import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import Header from './Header/Header';
import SideNav from './SideNav/SideNav';

import { AppProvider } from '@app/context/AppContext';
import { useSelector } from 'react-redux';
// import SubHeader from './Header/SubHeader';

/**  COMBINE LAYOUT APPS ADA DISINI */
function AppsLayout() {
  const location = useLocation()
  const { collapsedSidebar } = useSelector((state: any) => state.ui); 

  return (
    <AppProvider>
      <Header />
      {/* <SubHeader /> */}
      <SideNav />
      <div className={location.pathname=='/account/change-password'?'':`sidebar-expand ${collapsedSidebar=='collapse' ? 'collapse-sidebar':collapsedSidebar}`}>
        <div
          className='container mt-4 pb-3 pt-2'>
          <Outlet />
        </div>
      </div>
    </AppProvider>
  );
}

export default AppsLayout;
