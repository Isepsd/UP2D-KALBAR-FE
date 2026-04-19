import Error404 from '@app/components/Error/Error404';
import React from 'react'
import { Route, Routes } from 'react-router-dom';

import TopBarLoader from '@app/components/Loader/TopBarLoader';

/** PAGE */
const WhatsAppLogPage = React.lazy(() => import("@app/pages/Fasop/WhatsappLOG/LOGWhatsapp/WhatsAppLogPage"))
const WhatsAppLogFormPage = React.lazy(() => import("@app/pages/Fasop/WhatsappLOG/LOGWhatsapp/WhatsAppLogFormPage"))

export default function WhatsappLOGRoute() {
  return (
    <>
      <Routes>
        <Route path="log">
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><WhatsAppLogPage /></React.Suspense>} />
          <Route path="add" element={<React.Suspense fallback={<TopBarLoader />}><WhatsAppLogFormPage /></React.Suspense>} />
          <Route path="edit/:id" element={<React.Suspense fallback={<TopBarLoader />}><WhatsAppLogFormPage /></React.Suspense>} />
        </Route>

        <Route path="*" element={<Error404 type="admin" />}></Route>
      </Routes>
    </>
  )
}
