import Error404 from '@app/components/Error/Error404';
import React from 'react'
import { Route, Routes } from 'react-router-dom';

// import TopBarLoader from '@app/components/Loader/TopBarLoader';

/** PAGE */
// const AsetPage = React.lazy(() => import("@app/pages/MasterData/Apkt/Feeder/ApktFeederPage"))

export default function ApktRoute() {
  return (
    <>
      <Routes> 
          {/* <Route path="jenis" element={<React.Suspense fallback={<TopBarLoader />}><JenisAsetPage /></React.Suspense>} />  */}
          <Route path="*" element={<Error404 type="admin" />}></Route> 
      </Routes>
    </>
  )
}
