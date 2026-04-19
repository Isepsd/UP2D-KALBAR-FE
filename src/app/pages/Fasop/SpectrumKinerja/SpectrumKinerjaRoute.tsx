import Error404 from '@app/components/Error/Error404';
import React from 'react'
import { Route, Routes } from 'react-router-dom';

import TopBarLoader from '@app/components/Loader/TopBarLoader';

/** PAGE */
const SkAnalogPage = React.lazy(() => import("@app/pages/Fasop/SpectrumKinerja/Analog/SkAnalogPage"))
const SkDigitalPage = React.lazy(() => import("@app/pages/Fasop/SpectrumKinerja/Digital/SkDigitalPage"))
const SkMasterPage = React.lazy(() => import("@app/pages/Fasop/SpectrumKinerja/Master/SkMasterPage"))
const SkRTUPage = React.lazy(() => import("@app/pages/Fasop/SpectrumKinerja/RTU/SkRTUPage"))
const SkRemoteControlPage = React.lazy(() => import("@app/pages/Fasop/SpectrumKinerja/RemoteControl/SkRemoteControlPage"))
const SkTRIPPage = React.lazy(() => import("@app/pages/Fasop/SpectrumKinerja/TRIP/SkTRIPPage"))
const KinerjaScadaPage = React.lazy(() => import("@app/pages/Fasop/SpectrumKinerja/KinerjaScada/KinerjaScadaPage2"))

export default function SpectrumKinerjaRoute() {
  return (
    <>
    <Routes> 
          <Route path="analog" element={<React.Suspense fallback={<TopBarLoader />}><SkAnalogPage /></React.Suspense>} /> 
          <Route path="digital" element={<React.Suspense fallback={<TopBarLoader />}><SkDigitalPage /></React.Suspense>} /> 
          <Route path="master" element={<React.Suspense fallback={<TopBarLoader />}><SkMasterPage /></React.Suspense>} /> 
          <Route path="remote-control" element={<React.Suspense fallback={<TopBarLoader />}><SkRemoteControlPage /></React.Suspense>} /> 
          <Route path="rtu" element={<React.Suspense fallback={<TopBarLoader />}><SkRTUPage /></React.Suspense>} /> 
          <Route path="trip" element={<React.Suspense fallback={<TopBarLoader />}><SkTRIPPage /></React.Suspense>} /> 
          <Route path="scada" element={<React.Suspense fallback={<TopBarLoader />}><KinerjaScadaPage /></React.Suspense>} /> 
          <Route path="*" element={<Error404 type="admin" />}></Route> 
      </Routes>
    </>
  )
}
