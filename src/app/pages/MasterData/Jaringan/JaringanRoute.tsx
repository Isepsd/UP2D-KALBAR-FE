import Error404 from '@app/components/Error/Error404';
import React from 'react'
import { Route, Routes } from 'react-router-dom';

import TopBarLoader from '@app/components/Loader/TopBarLoader';
import JarJenisPembangkitPage from './JenisPembangkit/JarJenisPembangkitPage';
import JarJenisPembangkitFormPage from './JenisPembangkit/JarJenisPembangkitFormPage';

/** PAGE */
const JarGarduDistribusiPage = React.lazy(() => import("@app/pages/MasterData/Jaringan/GarduDistribusi/JarGarduDistribusiPage"))
const JarGarduDistribusiForm = React.lazy(() => import("@app/pages/MasterData/Jaringan/GarduDistribusi/JarGarduDistribusiFormPage"))
const JarGarduHubungFormPage = React.lazy(() => import("@app/pages/MasterData/Jaringan/GarduHubung/JarGarduHubungFormPage"))
const JarGarduHubungPage = React.lazy(() => import("@app/pages/MasterData/Jaringan/GarduHubung/JarGarduHubungPage"))
const JarGarduHubungDetail = React.lazy(() => import("@app/pages/MasterData/Jaringan/GarduHubung/JarGarduHubungDetailPage"))
const JarGarduHubungDetailForm = React.lazy(() => import("@app/pages/MasterData/Jaringan/GarduHubung/JarGarduHubungDetailFormPage"))
const JarGarduIndukPage = React.lazy(() => import("@app/pages/MasterData/Jaringan/GarduInduk/JarGarduIndukPage"))
const JarGarduIndukForm = React.lazy(() => import("@app/pages/MasterData/Jaringan/GarduInduk/JarGarduIndukFormPage"))
const JarManageUploadPage = React.lazy(() => import("@app/pages/MasterData/Jaringan/ManageUpload/JarManageUploadPage"))
const JarPembangkitPage = React.lazy(() => import("@app/pages/MasterData/Jaringan/Pembangkit/JarPembangkitPage"))
const JarPembangkitForm = React.lazy(() => import("@app/pages/MasterData/Jaringan/Pembangkit/JarPembangkitFormPage"))
const JarPenyulangPage = React.lazy(() => import("@app/pages/MasterData/Jaringan/Penyulang/JarPenyulangPage"))
const JarPenyulangForm = React.lazy(() => import("@app/pages/MasterData/Jaringan/Penyulang/JarPenyulangFormPage"))
const JarSectionPage = React.lazy(() => import("@app/pages/MasterData/Jaringan/Section/JarSectionPage"))
const JarSectionForm = React.lazy(() => import("@app/pages/MasterData/Jaringan/Section/JarSectionFormPage"))
const JarSegmentPage = React.lazy(() => import("@app/pages/MasterData/Jaringan/Segment/JarSegmentPage"))
const JarSegmentForm = React.lazy(() => import("@app/pages/MasterData/Jaringan/Segment/JarSegmentFormPage"))
const JarTrafoGDPage = React.lazy(() => import("@app/pages/MasterData/Jaringan/TrafoGD/JarTrafoGDPage"))
const JarTrafoGDForm = React.lazy(() => import("@app/pages/MasterData/Jaringan/TrafoGD/JarTrafoGDFormPage"))
const JarTrafoGIPage = React.lazy(() => import("@app/pages/MasterData/Jaringan/TrafoGI/JarTrafoGIPage"))
const JarTrafoGIForm = React.lazy(() => import("@app/pages/MasterData/Jaringan/TrafoGI/JarTrafoGIFormPage"))
const JarTreeJaringanPage = React.lazy(() => import("@app/pages/MasterData/Jaringan/TreeJaringan/JarTreeJaringanPage"))
const JarUnitPembangkitPage = React.lazy(() => import("@app/pages/MasterData/Jaringan/UnitPembangkit/JarUnitPembangkitPage"))
const JarUnitPembangkitForm = React.lazy(() => import("@app/pages/MasterData/Jaringan/UnitPembangkit/JarUnitPembangkitForm"))
const JarZonePage = React.lazy(() => import("@app/pages/MasterData/Jaringan/Zone/JarZonePage"))
const JarZoneForm = React.lazy(() => import("@app/pages/MasterData/Jaringan/Zone/JarZoneFormPage"))
const JarKantorPage = React.lazy(() => import("@app/pages/MasterData/Jaringan/Kantor/JarKantorPage"))
const JarKantorForm = React.lazy(() => import("@app/pages/MasterData/Jaringan/Kantor/JarKantorFormPage"))
const SubsistemPage = React.lazy(() => import("@app/pages/MasterData/Jaringan/Subsistem/SubsistemPage"))
const SubsistemForm = React.lazy(() => import("@app/pages/MasterData/Jaringan/Subsistem/SubsistemForm"))
const JarPengamananSutmPage = React.lazy(() => import("@app/pages/MasterData/Jaringan/PengamananSutm/JarPengamananSutmPage"))
const JarPengamananSutmForm = React.lazy(() => import("@app/pages/MasterData/Jaringan/PengamananSutm/JarPengamananSutmForm"))
const JarPelangganVipPage = React.lazy(() => import("@app/pages/MasterData/Jaringan/PelangganVip/JarPelangganVipPage"))
const JarPelangganVipFormPage = React.lazy(() => import("@app/pages/MasterData/Jaringan/PelangganVip/JarPelangganVipFormPage"))

export default function JaringanRoute() {
  return (
    <>
      <Routes>
        <Route path="jenis-pembangkit">
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><JarJenisPembangkitPage /></React.Suspense>} />
          <Route path="add" element={<React.Suspense fallback={<TopBarLoader />}><JarJenisPembangkitFormPage /></React.Suspense>} />
          <Route path="edit/:id" element={<React.Suspense fallback={<TopBarLoader />}><JarJenisPembangkitFormPage /></React.Suspense>} />
        </Route>
        <Route path="unit-pembangkit">
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><JarUnitPembangkitPage /></React.Suspense>} />
          <Route path="add" element={<React.Suspense fallback={<TopBarLoader />}><JarUnitPembangkitForm /></React.Suspense>} />
          <Route path="edit/:id" element={<React.Suspense fallback={<TopBarLoader />}><JarUnitPembangkitForm /></React.Suspense>} />
        </Route>
        <Route path="pembangkit">
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><JarPembangkitPage /></React.Suspense>} />
          <Route path="add" element={<React.Suspense fallback={<TopBarLoader />}><JarPembangkitForm /></React.Suspense>} />
          <Route path="edit/:id" element={<React.Suspense fallback={<TopBarLoader />}><JarPembangkitForm /></React.Suspense>} />
        </Route>
        <Route path="gardu-induk">
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><JarGarduIndukPage /></React.Suspense>} />
          <Route path="add" element={<React.Suspense fallback={<TopBarLoader />}><JarGarduIndukForm /></React.Suspense>} />
          <Route path="edit/:id" element={<React.Suspense fallback={<TopBarLoader />}><JarGarduIndukForm /></React.Suspense>} />
        </Route>
        <Route path='trafo-gi'>
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><JarTrafoGIPage /></React.Suspense>} />
          <Route path="add" element={<React.Suspense fallback={<TopBarLoader />}><JarTrafoGIForm /></React.Suspense>} />
          <Route path="edit/:id" element={<React.Suspense fallback={<TopBarLoader />}><JarTrafoGIForm /></React.Suspense>} />
        </Route>
        <Route path='zone'>
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><JarZonePage /></React.Suspense>} />
          <Route path="add" element={<React.Suspense fallback={<TopBarLoader />}><JarZoneForm /></React.Suspense>} />
          <Route path="edit/:id" element={<React.Suspense fallback={<TopBarLoader />}><JarZoneForm /></React.Suspense>} />
        </Route>
        <Route path='section'>
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><JarSectionPage /></React.Suspense>} />
          <Route path="add" element={<React.Suspense fallback={<TopBarLoader />}><JarSectionForm /></React.Suspense>} />
          <Route path="edit/:id" element={<React.Suspense fallback={<TopBarLoader />}><JarSectionForm /></React.Suspense>} />
        </Route>
        <Route path='segment'>
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><JarSegmentPage /></React.Suspense>} />
          <Route path="add" element={<React.Suspense fallback={<TopBarLoader />}><JarSegmentForm /></React.Suspense>} />
          <Route path="edit/:id" element={<React.Suspense fallback={<TopBarLoader />}><JarSegmentForm /></React.Suspense>} />
        </Route>
        <Route path='penyulang'>
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><JarPenyulangPage /></React.Suspense>} />
          <Route path="add" element={<React.Suspense fallback={<TopBarLoader />}><JarPenyulangForm /></React.Suspense>} />
          <Route path="edit/:id" element={<React.Suspense fallback={<TopBarLoader />}><JarPenyulangForm /></React.Suspense>} />
        </Route>
        <Route path='gardu-distribusi'>
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><JarGarduDistribusiPage /></React.Suspense>} />
          <Route path="add" element={<React.Suspense fallback={<TopBarLoader />}><JarGarduDistribusiForm /></React.Suspense>} />
          <Route path="edit/:id" element={<React.Suspense fallback={<TopBarLoader />}><JarGarduDistribusiForm /></React.Suspense>} />
        </Route>
        <Route path='trafo-gd'>
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><JarTrafoGDPage /></React.Suspense>} />
          <Route path="add" element={<React.Suspense fallback={<TopBarLoader />}><JarTrafoGDForm /></React.Suspense>} />
          <Route path="edit/:id" element={<React.Suspense fallback={<TopBarLoader />}><JarTrafoGDForm /></React.Suspense>} />
        </Route>
        <Route path='gardu-hubung'>
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><JarGarduHubungPage /></React.Suspense>} />
          <Route path="detail/:id/edit/:id_gh" element={<React.Suspense fallback={<TopBarLoader />}><JarGarduHubungDetailForm /></React.Suspense>} />
          <Route path="detail/:id/add" element={<React.Suspense fallback={<TopBarLoader />}><JarGarduHubungDetailForm /></React.Suspense>} />
          <Route path="add" element={<React.Suspense fallback={<TopBarLoader />}><JarGarduHubungFormPage /></React.Suspense>} />
          <Route path="edit/:id" element={<React.Suspense fallback={<TopBarLoader />}><JarGarduHubungFormPage /></React.Suspense>} />
          <Route path="detail/:id" element={<React.Suspense fallback={<TopBarLoader />}><JarGarduHubungDetail /></React.Suspense>} />
        </Route>

        <Route path='kantor'>
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><JarKantorPage /></React.Suspense>} />
          <Route path="add" element={<React.Suspense fallback={<TopBarLoader />}><JarKantorForm /></React.Suspense>} />
          <Route path="edit/:id" element={<React.Suspense fallback={<TopBarLoader />}><JarKantorForm /></React.Suspense>} />
        </Route>
        <Route path='subsistem'>
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><SubsistemPage /></React.Suspense>} />
          <Route path="add" element={<React.Suspense fallback={<TopBarLoader />}><SubsistemForm /></React.Suspense>} />
          <Route path="edit/:id" element={<React.Suspense fallback={<TopBarLoader />}><SubsistemForm /></React.Suspense>} />
        </Route>
        <Route path='pengaman-sutm'>
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><JarPengamananSutmPage /></React.Suspense>} />
          <Route path="add" element={<React.Suspense fallback={<TopBarLoader />}><JarPengamananSutmForm /></React.Suspense>} />
          <Route path="edit/:id" element={<React.Suspense fallback={<TopBarLoader />}><JarPengamananSutmForm /></React.Suspense>} />
        </Route>
        <Route path='pelanggan-prioritas'>
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><JarPelangganVipPage /></React.Suspense>} />
          <Route path="add" element={<React.Suspense fallback={<TopBarLoader />}><JarPelangganVipFormPage /></React.Suspense>} />
          <Route path="edit/:id" element={<React.Suspense fallback={<TopBarLoader />}><JarPelangganVipFormPage /></React.Suspense>} />
        </Route>

        <Route path="tree-jaringan" element={<React.Suspense fallback={<TopBarLoader />}><JarTreeJaringanPage /></React.Suspense>} />
        <Route path="management-upload" element={<React.Suspense fallback={<TopBarLoader />}><JarManageUploadPage /></React.Suspense>} />



        <Route path="*" element={<Error404 type="admin" />}></Route>
      </Routes>
    </>
  )
}
