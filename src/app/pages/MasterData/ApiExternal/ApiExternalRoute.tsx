import Error404 from '@app/components/Error/Error404';
import React from 'react'
import { Route, Routes } from 'react-router-dom';

import TopBarLoader from '@app/components/Loader/TopBarLoader';

/** PAGE */

const TokenRolePage = React.lazy(() => import("@app/pages/MasterData/ApiExternal/UserToken/TokenRolePage"))
const TokenRoleFormPage = React.lazy(() => import("@app/pages/MasterData/ApiExternal/UserToken/TokenRoleFormPage"))
const TokenRoleSettingForm = React.lazy(() => import("@app/pages/MasterData/ApiExternal/UserToken/TokenRoleSettingForm"))

const ModuleApiPage = React.lazy(() => import("@app/pages/MasterData/ApiExternal/ModuleApi/ModuleApiPage"))
const ModuleApiForm = React.lazy(() => import("@app/pages/MasterData/ApiExternal/ModuleApi/ModuleApiForm"))

// const TokenRoleFormPage = React.lazy(() => import("@app/pages/MasterData/ApiExternal/TokenRoles/TokenRoleFormPage"))
// const TokenRolePage = React.lazy(() => import("@app/pages/MasterData/ApiExternal/TokenRoles/TokenRolePage"))
// const TokenRoleSettingPage = React.lazy(() => import("@app/pages/MasterData/ApiExternal/TokenRoles/TokenRoleSettingPage"))

export default function ApiExternalRoute() {
  return (
    <>
      <Routes>
        {/* User Token */}
        <Route path='user-token'>
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><TokenRolePage /></React.Suspense>} />
          <Route path="add" element={<React.Suspense fallback={<TopBarLoader />}><TokenRoleFormPage /></React.Suspense>} />
          <Route path="edit/:id" element={<React.Suspense fallback={<TopBarLoader />}><TokenRoleFormPage /></React.Suspense>} />
          <Route path="settings/:id" element={<React.Suspense fallback={<TopBarLoader />}><TokenRoleSettingForm /></React.Suspense>} />
        </Route>
        {/* Module Api  */}
        <Route path='module-api'>
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><ModuleApiPage /></React.Suspense>} />
          <Route path="add" element={<React.Suspense fallback={<TopBarLoader />}><ModuleApiForm /></React.Suspense>} />
          <Route path="edit/:id" element={<React.Suspense fallback={<TopBarLoader />}><ModuleApiForm /></React.Suspense>} />
        </Route>

        {/* Role  */}
        {/* <Route path="token-roles">
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><TokenRolePage /></React.Suspense>} />
          <Route path="add" element={<React.Suspense fallback={<TopBarLoader />}><TokenRoleFormPage /></React.Suspense>} />
          <Route path="edit/:id" element={<React.Suspense fallback={<TopBarLoader />}><TokenRoleFormPage /></React.Suspense>} />
          <Route path="settings/:id" element={<React.Suspense fallback={<TopBarLoader />}><TokenRoleSettingPage /></React.Suspense>} />
        </Route> */}

        <Route path="*" element={<Error404 type="admin" />}></Route>
      </Routes>
    </>
  )
}
