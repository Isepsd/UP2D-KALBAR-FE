import Error404 from '@app/components/Error/Error404';
import React from 'react'
import { Route, Routes } from 'react-router-dom';

import TopBarLoader from '@app/components/Loader/TopBarLoader';

/** PAGE */
const LBTGrafikBebanSistemPage = React.lazy(() => import("@app/pages/Opsisdis/LaporanBebanTegang/GrafikBebanSistem/LbtGrafikBebanSistemPage"))
const LBTBebanPenyulangPage = React.lazy(() => import("@app/pages/Opsisdis/LaporanBebanTegang/BebanPenyulang/LbtBebanPenyulangPage"))
const LBTBebanPenyulangPages = React.lazy(() => import("@app/pages/Opsisdis/LaporanBebanTegang/BebanPenyulang/BebanPenyulangPages"))
const LBTTrafoGIPage = React.lazy(() => import("@app/pages/Opsisdis/LaporanBebanTegang/TrafoGI/LbtTrafoGIPage"))
const LBTBebanAreaPage = React.lazy(() => import("@app/pages/Opsisdis/LaporanBebanTegang/BebanArea/LbtBebanAreaPage"))
const LBTBebanSubSistemPage = React.lazy(() => import("@app/pages/Opsisdis/LaporanBebanTegang/BebanSubSistem/LbtBebanSubSistemPage"))
const LbtBebanUIDPage = React.lazy(() => import("@app/pages/Opsisdis/LaporanBebanTegang/BebanUID/LbtBebanUIDPage"))
const LbtBebanUP2BPage = React.lazy(() => import("@app/pages/Opsisdis/LaporanBebanTegang/BebanUP2B/LbtBebanUP2BPage"))
const LbtTrafoGINonKTTPage = React.lazy(() => import("@app/pages/Opsisdis/LaporanBebanTegang/TrafoGINonKTT/trafokttPage"))
const GarduHubungPage = React.lazy(() => import("@app/pages/Opsisdis/LaporanBebanTegang/GarduHubung/GarduHubungPage"))
const KeyPointPage = React.lazy(() => import("@app/pages/Opsisdis/LaporanBebanTegang/KeyPoint/KeyPointPage"))
const TeganganTrafoGIPage = React.lazy(() => import("@app/pages/Opsisdis/LaporanBebanTegang/TeganganTrafoGI/TeganganTrafoGIPage"))
const BebanPembangkitPage = React.lazy(() => import("@app/pages/Opsisdis/LaporanBebanTegang/BebanPembangkit/BebanPembangkitPage"))

export default function LaporanBebanTegangRouter() {
  return (
    <>
      <Routes>
        <Route path="grafik-sistem" element={<React.Suspense fallback={<TopBarLoader />}><LBTGrafikBebanSistemPage /></React.Suspense>} />
        <Route path="penyulang" element={<React.Suspense fallback={<TopBarLoader />}><LBTBebanPenyulangPage /></React.Suspense>} />
        <Route path="penyulangs" element={<React.Suspense fallback={<TopBarLoader />}><LBTBebanPenyulangPages /></React.Suspense>} />
        <Route path="trafos-gi-non-ktt" element={<React.Suspense fallback={<TopBarLoader />}><LbtTrafoGINonKTTPage /></React.Suspense>} />
        <Route path="gardu-hubung" element={<React.Suspense fallback={<TopBarLoader />}><GarduHubungPage /></React.Suspense>} />
        <Route path="keypoint" element={<React.Suspense fallback={<TopBarLoader />}><KeyPointPage /></React.Suspense>} />
        <Route path="trafo-gi" element={<React.Suspense fallback={<TopBarLoader />}><LBTTrafoGIPage /></React.Suspense>} />
        <Route path="area" element={<React.Suspense fallback={<TopBarLoader />}><LBTBebanAreaPage /></React.Suspense>} />
        <Route path="up2b" element={<React.Suspense fallback={<TopBarLoader />}><LbtBebanUP2BPage /></React.Suspense>} />
        <Route path="uid" element={<React.Suspense fallback={<TopBarLoader />}><LbtBebanUIDPage /></React.Suspense>} />
        <Route path="subsistem" element={<React.Suspense fallback={<TopBarLoader />}><LBTBebanSubSistemPage /></React.Suspense>} />
        <Route path="tegangan-trafo-gi" element={<React.Suspense fallback={<TopBarLoader />}><TeganganTrafoGIPage /></React.Suspense>} />
        <Route path="pembangkit" element={<React.Suspense fallback={<TopBarLoader />}><BebanPembangkitPage /></React.Suspense>} />
        <Route path="*" element={<Error404 type="admin" />}></Route>
      </Routes>
    </>
  )
}
