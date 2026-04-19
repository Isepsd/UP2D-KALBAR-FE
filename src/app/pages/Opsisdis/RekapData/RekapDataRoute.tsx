import Error404 from '@app/components/Error/Error404';
import React from 'react'
import { Route, Routes } from 'react-router-dom';

import TopBarLoader from '@app/components/Loader/TopBarLoader';

/** PAGE */
const LapPenyulangGangguanTahunPage = React.lazy(() => import("@app/pages/Opsisdis/RekapData/PenyulangGangguanTahun/LapPenyulangGangguanTahunPage"))
const LapPenyulangGangguanBulanPage = React.lazy(() => import("@app/pages/Opsisdis/RekapData/PenyulangGangguanBulan/LapPenyulangGangguanBulanPage"))
const LapPenyulangGangguanHariPage = React.lazy(() => import("@app/pages/Opsisdis/RekapData/PenyulangGangguanHari/LapPenyulangGangguanHariPage"))

const LapTrafoGiLaporanTahunPage = React.lazy(() => import("@app/pages/Opsisdis/RekapData/TrafoGiLaporanTahun/TrafoGiLaporanTahunPage"))
const LapTrafoGiLaporanBulanPage = React.lazy(() => import("@app/pages/Opsisdis/RekapData/TrafoGiLaporanBulan/LapTrafoGiLaporanBulanPage"))
const LapTrafoGiLaporanHariPage = React.lazy(() => import("@app/pages/Opsisdis/RekapData/TrafoGiLaporanHari/LapTrafoGiLaporanHariPage"))

const LapTrafoDisGangguanTahunPage = React.lazy(() => import("@app/pages/Opsisdis/RekapData/TrafoDisGangguanTahun/LapTrafoDisGangguanTahunPage"))
const LapTrafoDisGangguanBulanPage = React.lazy(() => import("@app/pages/Opsisdis/RekapData/TrafoDisGangguanBulan/LapTrafoDisGangguanBulanPage"))
const LapTrafoDisGangguanHariPage = React.lazy(() => import("@app/pages/Opsisdis/RekapData/TrafoDisGangguanHari/LapTrafoDisGangguanHariPage"))
const LaporanPadamPage = React.lazy(() => import("@app/pages/Opsisdis/RekapData/LaporanPadam/LaporanPadamPage"))
const LaporanPadamForm = React.lazy(() => import("@app/pages/Opsisdis/RekapData/LaporanPadam/LaporanPadamForm"))
// const RekapPadamRoute = React.lazy(() => import("@app/pages/Opsisdis/RekapPadam/RekapPadamRoute"))

export default function RekapDataRoute() {
  return (
    <>
      <Routes>
        <Route path="penyulang/tahun" element={<React.Suspense fallback={<TopBarLoader />}><LapPenyulangGangguanTahunPage /></React.Suspense>} />
        <Route path="penyulang/bulan" element={<React.Suspense fallback={<TopBarLoader />}><LapPenyulangGangguanBulanPage /></React.Suspense>} />
        <Route path="penyulang/hari" element={<React.Suspense fallback={<TopBarLoader />}><LapPenyulangGangguanHariPage /></React.Suspense>} />

        <Route path="trafo-gi/tahun" element={<React.Suspense fallback={<TopBarLoader />}><LapTrafoGiLaporanTahunPage /></React.Suspense>} />
        <Route path="trafo-gi/bulan" element={<React.Suspense fallback={<TopBarLoader />}><LapTrafoGiLaporanBulanPage /></React.Suspense>} />
        <Route path="trafo-gi/hari" element={<React.Suspense fallback={<TopBarLoader />}><LapTrafoGiLaporanHariPage /></React.Suspense>} />

        <Route path="trafo-dis/tahun" element={<React.Suspense fallback={<TopBarLoader />}><LapTrafoDisGangguanTahunPage /></React.Suspense>} />
        <Route path="trafo-dis/bulan" element={<React.Suspense fallback={<TopBarLoader />}><LapTrafoDisGangguanBulanPage /></React.Suspense>} />
        <Route path="trafo-dis/hari" element={<React.Suspense fallback={<TopBarLoader />}><LapTrafoDisGangguanHariPage /></React.Suspense>} />
        <Route path="padam">
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><LaporanPadamPage /></React.Suspense>} />
          <Route path="add" element={<React.Suspense fallback={<TopBarLoader />}><LaporanPadamForm /></React.Suspense>} />
        </Route>
        {/* <Route path="padam" element={<React.Suspense fallback={<TopBarLoader />}><RekapPadamRoute /></React.Suspense>} /> */}
        <Route path="*" element={<Error404 type="admin" />}></Route>
      </Routes>
    </>
  )
}
