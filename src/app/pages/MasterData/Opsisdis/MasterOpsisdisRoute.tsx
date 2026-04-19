import Error404 from '@app/components/Error/Error404';
import React from 'react'
import { Route, Routes } from 'react-router-dom';

import TopBarLoader from '@app/components/Loader/TopBarLoader';

/** PAGE */

const OpsPenyebabGangguanPage = React.lazy(() => import("@app/pages/MasterData/Opsisdis/PenyebabGangguan/OpsPenyebabGangguanPage"))
const OpsPenyebabGangguanForm = React.lazy(() => import("@app/pages/MasterData/Opsisdis/PenyebabGangguan/OpsPenyebabGangguanForm"))
const OpsRekananVendorPage = React.lazy(() => import("@app/pages/MasterData/Opsisdis/RekananVendor/OpsRekananVendorPage"))
const FrequensiMeterPage = React.lazy(() => import("@app/pages/MasterData/Opsisdis/FrequensiMeter/FrequensiMeterPage"))
const FrequensiMeterForm = React.lazy(() => import("@app/pages/MasterData/Opsisdis/FrequensiMeter/FrequensiMeterForm"))
const AmrCustomerPage = React.lazy(() => import("@app/pages/MasterData/Opsisdis/AmrCustomer/AmrCustomer"))
const AmrCustomerForm = React.lazy(() => import("@app/pages/MasterData/Opsisdis/AmrCustomer/AmrCustomerForm"))
const FormChecklistPage = React.lazy(() => import("@app/pages/MasterData/Opsisdis/FormChecklist/FormChecklistPage"))
const IndikasiPage = React.lazy(() => import("@app/pages/MasterData/Opsisdis/Indikasi/IndikasiPage"))
const IndikasiForm = React.lazy(() => import("@app/pages/MasterData/Opsisdis/Indikasi/IndikasiForm"))
const FDIRPage = React.lazy(() => import("@app/pages/MasterData/Opsisdis/FDIR/FDIRPage"))
const FDIRForm = React.lazy(() => import("@app/pages/MasterData/Opsisdis/FDIR/FDIRForm"))
const FAIMTRZHMIIPage = React.lazy(() => import("@app/pages/MasterData/Opsisdis/FAIMTRZHMII/FAIMTRZHMIIPage"))
const FAIMTRZHMIIForm = React.lazy(() => import("@app/pages/MasterData/Opsisdis/FAIMTRZHMII/FAIMTRZHMIIForm"))
const FAIFIOHLHMIIPage = React.lazy(() => import("@app/pages/MasterData/Opsisdis/FAIFIOHLHMII/FAIFIOHLHMIIPage"))
const FAIFIOHLHMIIForm = React.lazy(() => import("@app/pages/MasterData/Opsisdis/FAIFIOHLHMII/FAIFIOHLHMIIForm"))
const CuacaPage = React.lazy(() => import("@app/pages/MasterData/Opsisdis/Cuaca/CuacaPage"))
const CuacaForm = React.lazy(() => import("@app/pages/MasterData/Opsisdis/Cuaca/CuacaForm"))
const CategoryGangguanPage = React.lazy(() => import("@app/pages/MasterData/Opsisdis/CategoryGangguan/CategoryGangguanPage"))
const CategoryGangguanForm = React.lazy(() => import("@app/pages/MasterData/Opsisdis/CategoryGangguan/CategoryGangguanForm"))
const DispatcherPage = React.lazy(() => import("@app/pages/MasterData/Opsisdis/Dispatcher/DispatcherPage"))
const DispatcherForm = React.lazy(() => import("@app/pages/MasterData/Opsisdis/Dispatcher/DispatcherForm"))
const StatusProteksiPage = React.lazy(() => import("@app/pages/MasterData/Opsisdis/StatusProteksi/StatusProteksiPage"))
const StatusProteksiForm = React.lazy(() => import("@app/pages/MasterData/Opsisdis/StatusProteksi/StatusProteksiForm"))

export default function MasterOpsisdisRoute() {
  return (
    <>
      <Routes>
        <Route path="penyebab-gangguan">
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><OpsPenyebabGangguanPage /></React.Suspense>} />
          <Route path="add" element={<React.Suspense fallback={<TopBarLoader />}><OpsPenyebabGangguanForm /></React.Suspense>} />
          <Route path="edit/:id" element={<React.Suspense fallback={<TopBarLoader />}><OpsPenyebabGangguanForm /></React.Suspense>} />
        </Route>
        <Route path="frequensi-meter">
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><FrequensiMeterPage /></React.Suspense>} />
          <Route path="add" element={<React.Suspense fallback={<TopBarLoader />}><FrequensiMeterForm /></React.Suspense>} />
          <Route path="edit/:id" element={<React.Suspense fallback={<TopBarLoader />}><FrequensiMeterForm /></React.Suspense>} />
        </Route>
        <Route path="amr-customer">
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><AmrCustomerPage /></React.Suspense>} />
          <Route path="add" element={<React.Suspense fallback={<TopBarLoader />}><AmrCustomerForm /></React.Suspense>} />
          <Route path="edit/:id" element={<React.Suspense fallback={<TopBarLoader />}><AmrCustomerForm /></React.Suspense>} />
        </Route>
        <Route path="indikasi">
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><IndikasiPage /></React.Suspense>} />
          <Route path="add" element={<React.Suspense fallback={<TopBarLoader />}><IndikasiForm /></React.Suspense>} />
          <Route path="edit/:id" element={<React.Suspense fallback={<TopBarLoader />}><IndikasiForm /></React.Suspense>} />
        </Route>
        <Route path="fdir">
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><FDIRPage /></React.Suspense>} />
          <Route path="add" element={<React.Suspense fallback={<TopBarLoader />}><FDIRForm /></React.Suspense>} />
          <Route path="edit/:id" element={<React.Suspense fallback={<TopBarLoader />}><FDIRForm /></React.Suspense>} />
        </Route>
        <Route path="fai-mtrz-hmi">
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><FAIMTRZHMIIPage /></React.Suspense>} />
          <Route path="add" element={<React.Suspense fallback={<TopBarLoader />}><FAIMTRZHMIIForm /></React.Suspense>} />
          <Route path="edit/:id" element={<React.Suspense fallback={<TopBarLoader />}><FAIMTRZHMIIForm /></React.Suspense>} />
        </Route>
        <Route path="fiohl-hmi">
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><FAIFIOHLHMIIPage /></React.Suspense>} />
          <Route path="add" element={<React.Suspense fallback={<TopBarLoader />}><FAIFIOHLHMIIForm /></React.Suspense>} />
          <Route path="edit/:id" element={<React.Suspense fallback={<TopBarLoader />}><FAIFIOHLHMIIForm /></React.Suspense>} />
        </Route>
        <Route path="dispatcher">
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><DispatcherPage /></React.Suspense>} />
          <Route path="add" element={<React.Suspense fallback={<TopBarLoader />}><DispatcherForm /></React.Suspense>} />
          <Route path="edit/:id" element={<React.Suspense fallback={<TopBarLoader />}><DispatcherForm /></React.Suspense>} />
        </Route>
        <Route path="kategori-gangguan">
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><CategoryGangguanPage /></React.Suspense>} />
          <Route path="add" element={<React.Suspense fallback={<TopBarLoader />}><CategoryGangguanForm /></React.Suspense>} />
          <Route path="edit/:id" element={<React.Suspense fallback={<TopBarLoader />}><CategoryGangguanForm /></React.Suspense>} />
        </Route>
        <Route path="cuaca">
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><CuacaPage /></React.Suspense>} />
          <Route path="add" element={<React.Suspense fallback={<TopBarLoader />}><CuacaForm /></React.Suspense>} />
          <Route path="edit/:id" element={<React.Suspense fallback={<TopBarLoader />}><CuacaForm /></React.Suspense>} />
        </Route>
        <Route path="status-proteksi">
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><StatusProteksiPage /></React.Suspense>} />
          <Route path="add" element={<React.Suspense fallback={<TopBarLoader />}><StatusProteksiForm /></React.Suspense>} />
          <Route path="edit/:id" element={<React.Suspense fallback={<TopBarLoader />}><StatusProteksiForm /></React.Suspense>} />
        </Route>
        <Route path="vendor" element={<React.Suspense fallback={<TopBarLoader />}><OpsRekananVendorPage /></React.Suspense>} />
        <Route path="ceklis" element={<React.Suspense fallback={<TopBarLoader />}><FormChecklistPage /></React.Suspense>} />


        <Route path="*" element={<Error404 type="admin" />}></Route>
      </Routes>
    </>
  )
}
