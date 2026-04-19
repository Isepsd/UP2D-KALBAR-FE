import Error404 from '@app/components/Error/Error404';
import React from 'react'
import { Route, Routes } from 'react-router-dom';

import TopBarLoader from '@app/components/Loader/TopBarLoader';

/** PAGE */
const TBebanPenyulangPage = React.lazy(() => import("@app/pages/Opsisdis/TracingBeban/BebanPenyulang/TracingBebanPenyulangPage"))
const TBebanAreaPage = React.lazy(() => import("@app/pages/Opsisdis/TracingBeban/BebanArea/TracingBebanAreaPage"))
const TBebanSubSistemPage = React.lazy(() => import("@app/pages/Opsisdis/TracingBeban/BebanSubSistem/TracingBebanSubSistemPage"))
const TBebanUIDPage = React.lazy(() => import("@app/pages/Opsisdis/TracingBeban/BebanUID/TracingBebanUIDPage"))
const TBebanUP2BPage = React.lazy(() => import("@app/pages/Opsisdis/TracingBeban/BebanUP2B/TracingBebanUP2BPage"))
const TTrafoGIPage = React.lazy(() => import("@app/pages/Opsisdis/TracingBeban/TrafoGI/TracingTrafoGIPage"))
const TTrafoGINonKTTPage = React.lazy(() => import("@app/pages/Opsisdis/TracingBeban/TrafoGINonKTT/TracingTrafoGINonKTTPage"))
const TeganganTrafoPage = React.lazy(() => import("@app/pages/Opsisdis/TracingBeban/TeganganTrafo/TeganganTrafoPage"))
const GarduHubungPage = React.lazy(() => import("@app/pages/Opsisdis/TracingBeban/GarduHubung/GarduHubungPage"))
const KeyPointPage = React.lazy(() => import("@app/pages/Opsisdis/TracingBeban/Keypoint/KeyPointPage"))
const BebanPembangkitPage = React.lazy(() => import("@app/pages/Opsisdis/TracingBeban/Pembangkit/BebanPembangkitPage"))

export default function TracingBebanRouter() {
  return (
    <>
      <Routes>
        <Route path="penyulang" element={<React.Suspense fallback={<TopBarLoader />}><TBebanPenyulangPage /></React.Suspense>} />
        <Route path="trafo-gi-non-ktt" element={<React.Suspense fallback={<TopBarLoader />}><TTrafoGINonKTTPage /></React.Suspense>} />
        <Route path="trafo-gi-ktt" element={<React.Suspense fallback={<TopBarLoader />}><TTrafoGIPage /></React.Suspense>} />
        <Route path="area" element={<React.Suspense fallback={<TopBarLoader />}><TBebanAreaPage /></React.Suspense>} />
        <Route path="up2b" element={<React.Suspense fallback={<TopBarLoader />}><TBebanUP2BPage /></React.Suspense>} />
        <Route path="uid" element={<React.Suspense fallback={<TopBarLoader />}><TBebanUIDPage /></React.Suspense>} />
        <Route path="trafo-5m" element={<React.Suspense fallback={<TopBarLoader />}><TeganganTrafoPage /></React.Suspense>} />
        <Route path="subsistem" element={<React.Suspense fallback={<TopBarLoader />}><TBebanSubSistemPage /></React.Suspense>} />
        <Route path="pembangkit" element={<React.Suspense fallback={<TopBarLoader />}><BebanPembangkitPage /></React.Suspense>} />
        <Route path="gardu-hubung" element={<React.Suspense fallback={<TopBarLoader />}><GarduHubungPage /></React.Suspense>} />
        <Route path="keypoint" element={<React.Suspense fallback={<TopBarLoader />}><KeyPointPage /></React.Suspense>} />
        <Route path="*" element={<Error404 type="admin" />}></Route>
      </Routes>
    </>
  )
}
