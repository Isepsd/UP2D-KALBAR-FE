import React from 'react';
import { Outlet } from 'react-router-dom';

import HeaderExtraLayout from './HeaderExtraLayout';

import { AppProvider } from '@app/context/AppContext';
function ExtraLayout() {
  return (
    <AppProvider>
      <HeaderExtraLayout />
      <div className='pb-3 pt-3'>
          <Outlet />
      </div>
    </AppProvider>
  );
}

export default ExtraLayout;
