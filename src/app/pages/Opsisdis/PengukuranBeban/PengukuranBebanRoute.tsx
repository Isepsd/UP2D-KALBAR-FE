import Error404 from '@app/components/Error/Error404';
import React from 'react'
import { Route, Routes } from 'react-router-dom';

import TopBarLoader from '@app/components/Loader/TopBarLoader';

/** PAGE */
const PbPenylanbPage = React.lazy(() => import("@app/pages/Opsisdis/PengukuranBeban/Penyulang/PbPenylanbPage"))
const PbGarduHubungPage = React.lazy(() => import("@app/pages/Opsisdis/PengukuranBeban/GarduHubung/PbGarduHubungPage"))
const PbKeypointPage = React.lazy(() => import("@app/pages/Opsisdis/PengukuranBeban/Keypoint/PbKeypointPage"))
const PbTrafoGIPage = React.lazy(() => import("@app/pages/Opsisdis/PengukuranBeban/TrafoGI/PbTrafoGIPage"))
const PbTrafoGIKTTPage = React.lazy(() => import("@app/pages/Opsisdis/PengukuranBeban/TrafoGIKTT/PbTrafoGIKTTPage"))
const PbEnergyPage = React.lazy(() => import("@app/pages/Opsisdis/PengukuranBeban/Energy/PbEnergyPage"))
const PbZonePage = React.lazy(() => import("@app/pages/Opsisdis/PengukuranBeban/Zone/PbZonePage"))
const PbAreaPage = React.lazy(() => import("@app/pages/Opsisdis/PengukuranBeban/Area/PbAreaPage"))
const PbWilayahPage = React.lazy(() => import("@app/pages/Opsisdis/PengukuranBeban/Wilayah/PbWilayahPage"))
const PbPembangkitPage = React.lazy(() => import("@app/pages/Opsisdis/PengukuranBeban/Pembangkit/PbPembangkitPage"))
const PbPembangkitForm = React.lazy(() => import("@app/pages/Opsisdis/PengukuranBeban/Pembangkit/PbPembangkitForm"))
const PbLoadProfilePage = React.lazy(() => import("@app/pages/Opsisdis/PengukuranBeban/LoadProfile/PbLoadProfilePage"))

export default function PengukuranBebanRoute() {
  return (
    <>
      <Routes>
        <Route path="penyulang" element={<React.Suspense fallback={<TopBarLoader />}><PbPenylanbPage /></React.Suspense>} />
        <Route path="gardu-hubung" element={<React.Suspense fallback={<TopBarLoader />}><PbGarduHubungPage /></React.Suspense>} />
        <Route path="keypoint" element={<React.Suspense fallback={<TopBarLoader />}><PbKeypointPage /></React.Suspense>} />
        <Route path="trafo-ktt" element={<React.Suspense fallback={<TopBarLoader />}><PbTrafoGIKTTPage /></React.Suspense>} />
        <Route path="trafo-gi" element={<React.Suspense fallback={<TopBarLoader />}><PbTrafoGIPage /></React.Suspense>} />
        <Route path="pembangkit">
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><PbPembangkitPage /></React.Suspense>} />
          <Route path="add" element={<React.Suspense fallback={<TopBarLoader />}><PbPembangkitForm /></React.Suspense>} />
          <Route path="edit/:id" element={<React.Suspense fallback={<TopBarLoader />}><PbPembangkitForm /></React.Suspense>} />
        </Route>
        <Route path="zone" element={<React.Suspense fallback={<TopBarLoader />}><PbZonePage /></React.Suspense>} />
        <Route path="energy" element={<React.Suspense fallback={<TopBarLoader />}><PbEnergyPage /></React.Suspense>} />
        <Route path="load-profile" element={<React.Suspense fallback={<TopBarLoader />}><PbLoadProfilePage /></React.Suspense>} />
        <Route path="area" element={<React.Suspense fallback={<TopBarLoader />}><PbAreaPage /></React.Suspense>} />
        <Route path="wilayah" element={<React.Suspense fallback={<TopBarLoader />}><PbWilayahPage /></React.Suspense>} />
        <Route path="*" element={<Error404 type="admin" />}></Route>
      </Routes>
    </>
  )
}
