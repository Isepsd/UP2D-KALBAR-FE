import Error404 from '@app/components/Error/Error404';
import React from 'react'
import { Route, Routes } from 'react-router-dom';

import TopBarLoader from '@app/components/Loader/TopBarLoader';

/** PAGE */
const UsersPage = React.lazy(() => import("@app/pages/Administrator/Users/UsersPage"))
const UsersFormPage = React.lazy(() => import("@app/pages/Administrator/Users/UsersFormPage"))

const RolePage = React.lazy(() => import("@app/pages/Administrator/Role/RolePage"))
const RoleFormPage = React.lazy(() => import("@app/pages/Administrator/Role/RoleFormPage"))
const RoleSettingsPage = React.lazy(() => import("@app/pages/Administrator/Role/RoleSettingPage"))
const UsersSetNewPassword = React.lazy(() => import("@app/pages/Administrator/Users/UsersSetNewPasswordPage"))

const MenuPage = React.lazy(() => import("@app/pages/Administrator/Menu/MenuPage"))
const ApplicationSettingsPage = React.lazy(() => import("@app/pages/Administrator/Application/ApplicationSettingsPage"))
const ConfigsPage = React.lazy(() => import("@app/pages/Administrator/Configs/ConfigsPage"))

export default function AdministratorRouting() {
  return (
    <Routes>
      <Route path="">
        {/* Users  */}
        <Route path="users">
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><UsersPage /></React.Suspense>} />
          <Route path="add" element={<React.Suspense fallback={<TopBarLoader />}><UsersFormPage /></React.Suspense>} />
          <Route path="edit/:id" element={<React.Suspense fallback={<TopBarLoader />}><UsersFormPage /></React.Suspense>} />
          <Route path="set-password/:id" element={<React.Suspense fallback={<TopBarLoader />}><UsersSetNewPassword /></React.Suspense>} />
        </Route>

        {/* Role  */}
        <Route path="role">
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><RolePage /></React.Suspense>} />
          <Route path="add" element={<React.Suspense fallback={<TopBarLoader />}><RoleFormPage /></React.Suspense>} />
          <Route path="edit/:id" element={<React.Suspense fallback={<TopBarLoader />}><RoleFormPage /></React.Suspense>} />
          <Route path="settings/:id" element={<React.Suspense fallback={<TopBarLoader />}><RoleSettingsPage /></React.Suspense>} />
        </Route>

        {/* Role  */}
        <Route path="menu">
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><MenuPage /></React.Suspense>} />
        </Route>

        <Route path="settings" element={<React.Suspense fallback={<TopBarLoader />}><ApplicationSettingsPage /></React.Suspense>} />
        <Route path="configs" element={<React.Suspense fallback={<TopBarLoader />}><ConfigsPage /></React.Suspense>} />

        <Route path="*" element={<Error404 type="admin" />}></Route>
      </Route>
    </Routes>
  )
}
