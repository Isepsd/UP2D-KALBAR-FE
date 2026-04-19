import Error404 from '@app/components/Error/Error404';
import React from 'react'
import { Route, Routes } from 'react-router-dom';

import TopBarLoader from '@app/components/Loader/TopBarLoader';

/** PAGE */ 
const LogTelegramPage = React.lazy(() => import("@app/pages/Fasop/Telegram/LogTelegram/LogTelegramPage"))

export default function TelegramRoute() {
  return (
    <>
    <Routes> 
        <Route path="log" element={<React.Suspense fallback={<TopBarLoader />}><LogTelegramPage /></React.Suspense>} />
        <Route path="*" element={<Error404 type="admin" />}></Route>
      </Routes>
    </>
  )
}
