import Error404 from '@app/components/Error/Error404';
import React from 'react'
import { Route, Routes } from 'react-router-dom';

import TopBarLoader from '@app/components/Loader/TopBarLoader';

/** PAGE */
const PetaGarduPadamPage = React.lazy(() => import("@app/pages/Opsisdis/PetaListrik/PetaGardu/PetaGarduPadamPage"))
const PetaJenisGangguanPage = React.lazy(() => import("@app/pages/Opsisdis/PetaListrik/PetaJenisGangguan/PetaJenisGangguanPage"))

export default function PetaListrikRoute() {
  return (
    <>
      <Routes>
        <Route path="padam" element={<React.Suspense fallback={<TopBarLoader />}><PetaGarduPadamPage /></React.Suspense>} />
        <Route path="jenis-gangguan" element={<React.Suspense fallback={<TopBarLoader />}><PetaJenisGangguanPage /></React.Suspense>} />
        <Route path="*" element={<Error404 type="admin" />}></Route>
      </Routes>
    </>
  )
}
