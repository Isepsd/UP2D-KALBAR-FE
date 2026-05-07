import Error404 from '@app/components/Error/Error404';
import React from 'react'
import { Route, Routes } from 'react-router-dom';
import TopBarLoader from '@app/components/Loader/TopBarLoader';


/** PAGE */
const AnomaliMonitoringPage = React.lazy(() => import("@app/pages/Tiket/Anomali/AnomaliMonitoring"))
const AnomaliInputPage = React.lazy(() => import("@app/pages/Tiket/Anomali/AnomaliInput"))
const AnomaliTindakLanjutPage = React.lazy(() => import("@app/pages/Tiket/Anomali/AnomaliTindakLanjut"))


export default function TiketRoute() {
  return (
    <>
      <Routes>
        <Route path="mon-anomali" element={<React.Suspense fallback={<TopBarLoader />}><AnomaliMonitoringPage /></React.Suspense>} />
        <Route path="daftar-tiket" element={<React.Suspense fallback={<TopBarLoader />}><AnomaliInputPage /></React.Suspense>} /> 
        <Route path="tindak-lanjut" element={<React.Suspense fallback={<TopBarLoader />}><AnomaliTindakLanjutPage /></React.Suspense>} /> 
        <Route path="*" element={<Error404 type="admin" />}></Route>
      </Routes>
      
      
    </>
  )
}
