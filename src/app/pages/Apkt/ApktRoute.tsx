import Error404 from '@app/components/Error/Error404';
import React from 'react'
import { Route, Routes } from 'react-router-dom';

import TopBarLoader from '@app/components/Loader/TopBarLoader';

/** PAGE */
const DashboardAsetPage = React.lazy(() => import("./DashboardAset/DashboardAsetPage"))
const ManuverTopJaringanPage = React.lazy(() => import("./ManuverTopJaringan/ManuverTopJaringanPage"))
const PengirimanGarduPage = React.lazy(() => import("./PengirimanGardu/PengirimanGarduPage"))
const MonitoringGarduJQ = React.lazy(() => import("./MonitoringGardu/MonitoringGarduPage"))
const PengirimanRencanaHARPage = React.lazy(() => import("./PengirimanRencanaHAR/PengirimanRencanaHARPage"))
const MonitoringApktPage = React.lazy(() => import("./MonitoringApkt/MonitoringApktPageCopy"))

export default function ApktRoute() {
  return (
    <>
    <Routes> 
          <Route path="dashboard" element={<React.Suspense fallback={<TopBarLoader />}><DashboardAsetPage /></React.Suspense>} />
          <Route path="manuver-topologi" element={<React.Suspense fallback={<TopBarLoader />}><ManuverTopJaringanPage /></React.Suspense>} />
          <Route path="pengiriman-gardu" element={<React.Suspense fallback={<TopBarLoader />}><PengirimanGarduPage /></React.Suspense>} />
          <Route path="monitoring-gardu" element={<React.Suspense fallback={<TopBarLoader />}><MonitoringGarduJQ /></React.Suspense>} />
          <Route path="pengiriman-rencana-har" element={<React.Suspense fallback={<TopBarLoader />}><PengirimanRencanaHARPage /></React.Suspense>} />
          <Route path="monitoring" element={<React.Suspense fallback={<TopBarLoader />}><MonitoringApktPage /></React.Suspense>} />
          <Route path="*" element={<Error404 type="admin" />}></Route> 
      </Routes>
    </>
  )
}
