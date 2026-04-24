import Error404 from '@app/components/Error/Error404';
import React from 'react'
import { Route, Routes } from 'react-router-dom';

import TopBarLoader from '@app/components/Loader/TopBarLoader';

/** PAGE */
const FreBackupHarianPage = React.lazy(() => import("@app/pages/Opsisdis/FrekuensiPembangkit/BackupHarian/FreBackupHarianPage"))
const FreEksekusiPage = React.lazy(() => import("@app/pages/Opsisdis/FrekuensiPembangkit/Eksekusi/FreEksekusiPage"))
const FreMonitoringPage = React.lazy(() => import("@app/pages/Opsisdis/FrekuensiPembangkit/Monitoring/FreMonitoringPage"))
const FreMonitoringDetail = React.lazy(() => import("@app/pages/Opsisdis/FrekuensiPembangkit/Monitoring/FreMonitoringDetail"))

export default function FrekuensiPembangkitRoute() {
  return (
    <>
      <Routes>
        <Route path="monitoring">
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}>
            <FreMonitoringPage /></React.Suspense>} />
          <Route path="detail/:id" element={<React.Suspense fallback={<TopBarLoader />}>
            <FreMonitoringDetail /></React.Suspense>} />
        </Route>
        <Route path="history" element={<React.Suspense fallback={<TopBarLoader />}><FreBackupHarianPage /></React.Suspense>} />
        <Route path="ekskursi" element={<React.Suspense fallback={<TopBarLoader />}><FreEksekusiPage /></React.Suspense>} />
        <Route path="*" element={<Error404 type="admin" />}></Route>
      </Routes>
    </>
  )
}
