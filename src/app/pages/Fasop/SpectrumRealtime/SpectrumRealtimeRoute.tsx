import Error404 from '@app/components/Error/Error404';
import React from 'react'
import { Route, Routes } from 'react-router-dom';

import TopBarLoader from '@app/components/Loader/TopBarLoader';

/** PAGE */
const SrMessagePage = React.lazy(() => import("@app/pages/Fasop/SpectrumRealtime/Message/SrMessagePage"))
const SrRekapStatusPage = React.lazy(() => import("@app/pages/Fasop/SpectrumRealtime/RekapStatus/SrRekapStatusPage"))
const SrStatusDigitalPage = React.lazy(() => import("@app/pages/Fasop/SpectrumRealtime/StatusDigital/SrStatusDigitalPage"))
const SrStatusAnalogPage = React.lazy(() => import("@app/pages/Fasop/SpectrumRealtime/StatusAnalog/SrStatusAnalogPage"))
const SrStatusMasterPage = React.lazy(() => import("@app/pages/Fasop/SpectrumRealtime/StatusMaster/SrStatusMasterPage"))
const SrStatusRTUPage = React.lazy(() => import("@app/pages/Fasop/SpectrumRealtime/StatusRTU/SrStatusRTUPage"))
const SrUFRPage = React.lazy(() => import("@app/pages/Fasop/SpectrumRealtime/UFR/SrUFRPage"))

export default function SpectrumRealtimeRoute() {
  return (
    <>
      <Routes>
        <Route path="message" element={<React.Suspense fallback={<TopBarLoader />}><SrMessagePage /></React.Suspense>} />
        <Route path="rekap-status" element={<React.Suspense fallback={<TopBarLoader />}><SrRekapStatusPage /></React.Suspense>} />
        <Route path="status-digital" element={<React.Suspense fallback={<TopBarLoader />}><SrStatusDigitalPage /></React.Suspense>} />
        <Route path="status-analog" element={<React.Suspense fallback={<TopBarLoader />}><SrStatusAnalogPage /></React.Suspense>} />
        <Route path="status-master" element={<React.Suspense fallback={<TopBarLoader />}><SrStatusMasterPage /></React.Suspense>} />
        <Route path="status-rtu" element={<React.Suspense fallback={<TopBarLoader />}><SrStatusRTUPage /></React.Suspense>} />
        <Route path="ufr" element={<React.Suspense fallback={<TopBarLoader />}><SrUFRPage /></React.Suspense>} />
        <Route path="*" element={<Error404 type="admin" />}></Route>
      </Routes>
    </>
  )
}