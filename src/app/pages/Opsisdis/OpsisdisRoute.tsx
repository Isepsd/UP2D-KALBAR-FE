import Error404 from '@app/components/Error/Error404';
import React from 'react'
import { Route, Routes } from 'react-router-dom';

import TopBarLoader from '@app/components/Loader/TopBarLoader';


import PengukuranBebanRoute from './PengukuranBeban/PengukuranBebanRoute';
import TracingBebanRoute from './TracingBeban/TracingBebanRouter';
import LaporanBebanTegangRouter from './LaporanBebanTegang/LaporanBebanTegangRouter';
import RekapPadamRoute from './RekapPadam/RekapPadamRoute';
import RekapDataRoute from './RekapData/RekapDataRoute';
import SingleLineDiagramRoute from './SingleLineDiagram/SingleLineDiagramRoute';
import FrekuensiPembangkitRoute from './FrekuensiPembangkit/FrekuensiPembangkitRoute';



/** PAGE */
const DaftarPenyulangUfrPage = React.lazy(() => import("@app/pages/Opsisdis/DaftarPenyulangUFR/DaftarPenyulangUfrPage"))
const DaftarPenyulangUfrForm = React.lazy(() => import("@app/pages/Opsisdis/DaftarPenyulangUFR/DaftarPenyulangUfrForm"))
const JadwalPemeliharaanRoute = React.lazy(() => import("@app/pages/Opsisdis/JadwalPemeliharaan/JadwalPemeliharaanRoute"))
const DownloadLaporanBebanTegPage = React.lazy(() => import("@app/pages/Opsisdis/LaporanBebanTegang/DownloadLaporanBebanTeg/DownloadLaporanBebanTegPage"))


export default function OpsisdisRoute() {
  return (
    <>
      <Routes>
        <Route path="pengukuran-beban/*" element={<React.Suspense fallback={<TopBarLoader />}><PengukuranBebanRoute /></React.Suspense>} />
        <Route path="tracing-beban/*" element={<React.Suspense fallback={<TopBarLoader />}><TracingBebanRoute /></React.Suspense>} />

        <Route path="beban-tegang/*" element={<React.Suspense fallback={<TopBarLoader />}><LaporanBebanTegangRouter /></React.Suspense>} />

        <Route path="rekap-padam/*" element={<React.Suspense fallback={<TopBarLoader />}><RekapPadamRoute /></React.Suspense>} />

        <Route path="download-laporan-beban-tegang/*" element={<React.Suspense fallback={<TopBarLoader />}><DownloadLaporanBebanTegPage /></React.Suspense>} />


        <Route path="gangguan/*" element={<React.Suspense fallback={<TopBarLoader />}><RekapDataRoute /></React.Suspense>} />
        <Route path="sld/*" element={<React.Suspense fallback={<TopBarLoader />}><SingleLineDiagramRoute /></React.Suspense>} />
        <Route path="penyulang/ufr">
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><DaftarPenyulangUfrPage /></React.Suspense>} />
          <Route path="add" element={<React.Suspense fallback={<TopBarLoader />}><DaftarPenyulangUfrForm /></React.Suspense>} />
        </Route>
        <Route path="frekuensi-pembangkit/*" element={<React.Suspense fallback={<TopBarLoader />}><FrekuensiPembangkitRoute /></React.Suspense>} />
        <Route path="pemeliharaan/*" element={<React.Suspense fallback={<TopBarLoader />}><JadwalPemeliharaanRoute /></React.Suspense>} />
        <Route path="*" element={<Error404 type="admin" />}></Route>
        

        
      </Routes>
      
      
    </>
  )
}
