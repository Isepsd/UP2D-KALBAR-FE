import Error404 from '@app/components/Error/Error404';
import React from 'react'
import { Route, Routes } from 'react-router-dom';

import TopBarLoader from '@app/components/Loader/TopBarLoader';

/** PAGE */
const InputJadwal = React.lazy(() => import("@app/pages/Opsisdis/JadwalPemeliharaan/InputJadwal/InputJadwal"))
const InputJadwalForm = React.lazy(() => import("@app/pages/Opsisdis/JadwalPemeliharaan/InputJadwal/InputJadwalForm"))
const ApproveBagian = React.lazy(() => import("@app/pages/Opsisdis/JadwalPemeliharaan/ApproveBagian/ApproveBagian"))
const ApproveBagianForm = React.lazy(() => import("@app/pages/Opsisdis/JadwalPemeliharaan/ApproveBagian/ApproveBagianForm"))
const ApproveRen = React.lazy(() => import("@app/pages/Opsisdis/JadwalPemeliharaan/ApproveRen/ApproveRen"))
const ApproveOpsis = React.lazy(() => import("@app/pages/Opsisdis/JadwalPemeliharaan/ApproveOpsis/ApproveOpsis"))
const PelaksanaanPekerjaan = React.lazy(() => import("@app/pages/Opsisdis/JadwalPemeliharaan/PelaksanaanPekerjaan/PelaksanaanPekerjaan"))
const MonitoringJadwal = React.lazy(() => import("@app/pages/Opsisdis/JadwalPemeliharaan/MonitoringJadwal/MonitoringJadwal"))
const InputJadwalUP3Page = React.lazy(() => import("@app/pages/Opsisdis/JadwalPemeliharaan/InputJadwalUP3/InputJadwalUP3Page"))
const InputJadwalUP3Form = React.lazy(() => import("@app/pages/Opsisdis/JadwalPemeliharaan/InputJadwalUP3/InputjadwalUP3Form"))

export default function JadwalPemeliharaanRoute() {
  return (
    <>
      <Routes>
        <Route path="input-up3">
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><InputJadwalUP3Page /></React.Suspense>} />
          <Route path="add" element={<React.Suspense fallback={<TopBarLoader />}><InputJadwalUP3Form /></React.Suspense>} />
        </Route>
        <Route path="input">
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><InputJadwal /></React.Suspense>} />
          <Route path="add" element={<React.Suspense fallback={<TopBarLoader />}><InputJadwalForm /></React.Suspense>} />
        </Route>
        <Route path="approve-bagian">
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><ApproveBagian /></React.Suspense>} />
          <Route path="add" element={<React.Suspense fallback={<TopBarLoader />}><ApproveBagianForm /></React.Suspense>} />
        </Route>
        <Route path="approval-ren" element={<React.Suspense fallback={<TopBarLoader />}><ApproveRen /></React.Suspense>} />
        <Route path="approval-ops" element={<React.Suspense fallback={<TopBarLoader />}><ApproveOpsis /></React.Suspense>} />
        <Route path="pelaksanaan" element={<React.Suspense fallback={<TopBarLoader />}><PelaksanaanPekerjaan /></React.Suspense>} />
        <Route path="monitoring" element={<React.Suspense fallback={<TopBarLoader />}><MonitoringJadwal /></React.Suspense>} />
        <Route path="*" element={<Error404 type="admin" />}></Route>
      </Routes>
    </>
  )
}
