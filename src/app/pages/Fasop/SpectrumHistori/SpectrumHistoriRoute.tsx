import Error404 from '@app/components/Error/Error404';
import React from 'react'
import { Route, Routes } from 'react-router-dom';

import TopBarLoader from '@app/components/Loader/TopBarLoader';

/** PAGE */
const ShAnalogPage = React.lazy(() => import("@app/pages/Fasop/SpectrumHistori/Analog/ShAnalogPage"))
const ShDigitalPage = React.lazy(() => import("@app/pages/Fasop/SpectrumHistori/Digital/ShDigitalPage"))
const ShIPPage = React.lazy(() => import("@app/pages/Fasop/SpectrumHistori/IP/ShIPPage"))
const ShMasterPage = React.lazy(() => import("@app/pages/Fasop/SpectrumHistori/Master/ShMasterPage"))
const ShMessagePage = React.lazy(() => import("@app/pages/Fasop/SpectrumHistori/Message/ShMessagePage"))
const PickUpMessagePage = React.lazy(() => import("@app/pages/Fasop/SpectrumHistori/PickUp/PickUpMessagePage"))
const ShPengukuranPage = React.lazy(() => import("@app/pages/Fasop/SpectrumHistori/Pengukuran/ShPengukuranPage"))
const ShRTUPage = React.lazy(() => import("@app/pages/Fasop/SpectrumHistori/RTU/ShRTUPage"))
const ShRemoteControlPage = React.lazy(() => import("@app/pages/Fasop/SpectrumHistori/RemoteControl/ShRemoteControlPage"))
const ShTRIPPage = React.lazy(() => import("@app/pages/Fasop/SpectrumHistori/TRIP/ShTRIPPage"))
const ScadaPage = React.lazy(() => import("@app/pages/Fasop/SpectrumHistori/SCADA/ScadaPage"))

export default function SpectrumHistoriRoute() {
  return (
    <>
    <Routes> 
          <Route path="analog" element={<React.Suspense fallback={<TopBarLoader />}><ShAnalogPage /></React.Suspense>} /> 
          <Route path="scada" element={<React.Suspense fallback={<TopBarLoader />}><ScadaPage /></React.Suspense>} /> 
          <Route path="digital" element={<React.Suspense fallback={<TopBarLoader />}><ShDigitalPage /></React.Suspense>} /> 
          <Route path="ip" element={<React.Suspense fallback={<TopBarLoader />}><ShIPPage /></React.Suspense>} /> 
          <Route path="master" element={<React.Suspense fallback={<TopBarLoader />}><ShMasterPage /></React.Suspense>} /> 
          <Route path="message" element={<React.Suspense fallback={<TopBarLoader />}><ShMessagePage /></React.Suspense>} /> 
          <Route path="pickup" element={<React.Suspense fallback={<TopBarLoader />}><PickUpMessagePage /></React.Suspense>} /> 
          <Route path="pengukuran" element={<React.Suspense fallback={<TopBarLoader />}><ShPengukuranPage /></React.Suspense>} /> 
          <Route path="remote-control" element={<React.Suspense fallback={<TopBarLoader />}><ShRemoteControlPage /></React.Suspense>} /> 
          <Route path="rtu" element={<React.Suspense fallback={<TopBarLoader />}><ShRTUPage /></React.Suspense>} /> 
          <Route path="trip" element={<React.Suspense fallback={<TopBarLoader />}><ShTRIPPage /></React.Suspense>} /> 
          <Route path="*" element={<Error404 type="admin" />}></Route> 
      </Routes>
    </>
  )
}
