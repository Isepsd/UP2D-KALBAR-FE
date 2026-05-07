import Error404 from '@app/components/Error/Error404';
import React from 'react'
import { Route, Routes } from 'react-router-dom';

import TopBarLoader from '@app/components/Loader/TopBarLoader';

/** PAGE */
const KinerjaScadaPage = React.lazy(() => import("@app/pages/Dashboard/KinerjaScada/KinerjaScadaPageNew"))
const BebanFrekBangkaPages = React.lazy(() => import("@app/pages/Dashboard/KinerjaEkskursi/Frekuensi/Bangka/BebanFrekBangkaPages"))
const KinerjaHarianPages = React.lazy(() => import("@app/pages/Dashboard/KinerjaHarian/KinerjaHarianPages"))
const MonitoringRTU = React.lazy(() => import("@app/pages/Dashboard/MonRTU/MonitoringRTU"))
const MonitoringRTUDetail = React.lazy(() => import("@app/pages/Dashboard/MonRTU/MonitoringRTUDetail"))
const BebanFrekBelitungPages = React.lazy(() => import("@app/pages/Dashboard/KinerjaEkskursi/Frekuensi/Belitung/BebanFrekBelitungPages"))
const BebanTegBankaPages = React.lazy(() => import("@app/pages/Dashboard/KinerjaEkskursi/Tegangan/Bangka/BebanTegBankaPages"))
const BebanTegBelitungPages = React.lazy(() => import("@app/pages/Dashboard/KinerjaEkskursi/Tegangan/Belitung/BebanTegBelitungPages"))
const KinerjaScadaPageBangka = React.lazy(() => import("@app/pages/Dashboard/KinerjaScadaBangka/KinerjaScadaPageBangka"))
const KinerjaScadaPageTransmisi = React.lazy(() => import("@app/pages/Dashboard/KehandalanTransmisi/KinerjaScadaPage"))
const KinerjaScadaPageBelitung = React.lazy(() => import("@app/pages/Dashboard/KinerjaScadaBelitung/KinerjaScadaPageBelitung"))
const BebanSistemPage = React.lazy(() => import("@app/pages/Dashboard/BebanSistem/BebanSistemPage"))
const DetailPenyulangPage = React.lazy(() => import("@app/pages/Dashboard/BebanSistem/DetailPenyulangPage"))
const DetailFrekwensiPage = React.lazy(() => import("@app/pages/Dashboard/BebanSistem/DetailFrekwensiPage"))
const BebanGrafikSubPage = React.lazy(() => import("@app/pages/Dashboard/BebanGrafikSub/BebanGrafikSubPage"))
const BebanTabularPage = React.lazy(() => import("@app/pages/Dashboard/BebanSubSistem/BebanSubSistemPage"))
const KinerjaOpsisPage = React.lazy(() => import("@app/pages/Dashboard/KinerjaOpsis/KinerjaOpsisPage"))
const KinerjaPenyulangPage = React.lazy(() => import("@app/pages/Dashboard/KinerjaPenyulang/KinerjaPenyulangPage"))
const BebanUIDPage = React.lazy(() => import("@app/pages/Dashboard/BebanUID/BebanUIDPage"))
const AsetPages = React.lazy(() => import("@app/pages/Dashboard/Aset/AsetPage"))

export default function DashboardRoute() {
  return (
    <>
      <Routes>
        <Route path="dash-fasop/kinerja-scada" element={<React.Suspense fallback={<TopBarLoader />}><KinerjaScadaPage /></React.Suspense>} />
        <Route path="dash-fasop/monitoring-rtu">
                <Route path="" element={<React.Suspense fallback={<TopBarLoader />}>
                  <MonitoringRTU /></React.Suspense>} />
                <Route path="detail/:id" element={<React.Suspense fallback={<TopBarLoader />}>
                  <MonitoringRTUDetail /></React.Suspense>} />
              </Route>
        <Route path="sistem-bangka-frek" element={<React.Suspense fallback={<TopBarLoader />}><BebanFrekBangkaPages /></React.Suspense>} />
        <Route path="kinerja-harian" element={<React.Suspense fallback={<TopBarLoader />}><KinerjaHarianPages /></React.Suspense>} />
        <Route path="sistem-belitung-frek" element={<React.Suspense fallback={<TopBarLoader />}><BebanFrekBelitungPages /></React.Suspense>} />
        <Route path="sistem-bangka-teg" element={<React.Suspense fallback={<TopBarLoader />}><BebanTegBankaPages /></React.Suspense>} />
        <Route path="sistem-belitung-teg" element={<React.Suspense fallback={<TopBarLoader />}><BebanTegBelitungPages /></React.Suspense>} />
        <Route path="kinerja-scada-ultg-bangka" element={<React.Suspense fallback={<TopBarLoader />}><KinerjaScadaPageBangka /></React.Suspense>} />
        <Route path="kehandalan-transmisi" element={<React.Suspense fallback={<TopBarLoader />}><KinerjaScadaPageTransmisi /></React.Suspense>} />
        <Route path="kinerja-scada-belitung" element={<React.Suspense fallback={<TopBarLoader />}><KinerjaScadaPageBelitung /></React.Suspense>} />
        <Route path="kinerja-opsis" element={<React.Suspense fallback={<TopBarLoader />}><KinerjaOpsisPage /></React.Suspense>} />
        <Route path="kinerja-penyulang" element={<React.Suspense fallback={<TopBarLoader />}><KinerjaPenyulangPage /></React.Suspense>} />
        <Route path="beban-sistem" element={<React.Suspense fallback={<TopBarLoader />}><BebanSistemPage /></React.Suspense>} />
        <Route path="beban-sistem/beban-online" element={<React.Suspense fallback={<TopBarLoader />}><DetailPenyulangPage type='beban-online' title='DAFTAR PENYULANG ONLINE WILAYAH KALBAR' /></React.Suspense>} />
        <Route path="beban-sistem/beban-offline" element={<React.Suspense fallback={<TopBarLoader />}><DetailPenyulangPage type='beban-offline' title='DAFTAR PENYULANG OFFLINE WILAYAH KALBAR' /></React.Suspense>} />
        <Route path="beban-sistem/frekwensi" element={<React.Suspense fallback={<TopBarLoader />}><DetailFrekwensiPage /></React.Suspense>} />
        <Route path="beban-subsistem" element={<React.Suspense fallback={<TopBarLoader />}><BebanTabularPage /></React.Suspense>} />
        <Route path="beban-grafik" element={<React.Suspense fallback={<TopBarLoader />}><BebanGrafikSubPage /></React.Suspense>} />
        <Route path="beban-uid" element={<React.Suspense fallback={<TopBarLoader />}><BebanUIDPage /></React.Suspense>} />
        <Route path="aset" element={<React.Suspense fallback={<TopBarLoader />}><AsetPages /></React.Suspense>} />
        
        <Route path="*" element={<Error404 type="admin" />}></Route>
      </Routes>
    </>
  )
}
