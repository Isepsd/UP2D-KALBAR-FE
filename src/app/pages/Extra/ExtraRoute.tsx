import Error404 from '@app/components/Error/Error404';
import React from 'react'
import { Route, Routes } from 'react-router-dom';

import ExtraLayout from '@app/modules/ExtraLayout/ExtraLayout'
import TopBarLoader from '@app/components/Loader/TopBarLoader';

import PetaListrikRoute from '@app/pages/Opsisdis/PetaListrik/PetaListrikRoute';

export default function ExtraRoute() {
  return (
    <>
      <Routes>
        <Route path="" element={<ExtraLayout />}>
          <Route path="peta-listrik/*" element={<React.Suspense fallback={<TopBarLoader />}><PetaListrikRoute /></React.Suspense>} />
        </Route>
        <Route path="*" element={<Error404 type="admin" />}></Route>
      </Routes>
    </>
  )
}
