import Error404 from '@app/components/Error/Error404';
import React from 'react'
import { Route, Routes } from 'react-router-dom';

import TopBarLoader from '@app/components/Loader/TopBarLoader';

/** PAGE */
const PegawaiPage = React.lazy(() => import("@app/pages/Administrator/Users/UsersPage"))
const PegawaiFormPage = React.lazy(() => import("@app/pages/Administrator/Users/UsersFormPage"))

const JabatanForm = React.lazy(() => import("@app/pages/MasterData/AdminKsa/Jabatan/JabatanForm"))
const JabatanPage = React.lazy(() => import("@app/pages/MasterData/AdminKsa/Jabatan/JabatanPage"))
const DepartementPage = React.lazy(() => import("@app/pages/MasterData/AdminKsa/Departement/DepartementPage"))
const DepartementForm = React.lazy(() => import("@app/pages/MasterData/AdminKsa/Departement/DepartementForm"))
const PerusahaanPage = React.lazy(() => import("@app/pages/MasterData/AdminKsa/Perusahaan/PerusahaanPage"))
const PerusahaanForm = React.lazy(() => import("@app/pages/MasterData/AdminKsa/Perusahaan/PerusahaanForm"))
const ReguPetugasPage = React.lazy(() => import("@app/pages/MasterData/AdminKsa/ReguPetugas/ReguPetugasPage"))
const ReguPetugasForm = React.lazy(() => import("@app/pages/MasterData/AdminKsa/ReguPetugas/ReguPetugasForm"))
const PetugasReguPage = React.lazy(() => import("@app/pages/MasterData/AdminKsa/PetugasRegu/PetugasReguPage"))
const PetugasReguForm = React.lazy(() => import("@app/pages/MasterData/AdminKsa/PetugasRegu/PetugasReguForm"))

export default function AdminKSARoute() {
  return (
    <>
      <Routes>
        <Route path='pegawai'>
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><PegawaiPage rowAction={['edit', 'delete']} /></React.Suspense>} />
          <Route path="add" element={<React.Suspense fallback={<TopBarLoader />}><PegawaiFormPage password={false} /></React.Suspense>} />
          <Route path="edit/:id" element={<React.Suspense fallback={<TopBarLoader />}><PegawaiFormPage password={false} /></React.Suspense>} />
        </Route>

        <Route path='perusahaan'>
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><PerusahaanPage /></React.Suspense>} />
          <Route path="add" element={<React.Suspense fallback={<TopBarLoader />}><PerusahaanForm /></React.Suspense>} />
          <Route path="edit/:id" element={<React.Suspense fallback={<TopBarLoader />}><PerusahaanForm /></React.Suspense>} />
        </Route>
        <Route path='departement'>
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><DepartementPage /></React.Suspense>} />
          <Route path="add" element={<React.Suspense fallback={<TopBarLoader />}><DepartementForm /></React.Suspense>} />
          <Route path="edit/:id" element={<React.Suspense fallback={<TopBarLoader />}><DepartementForm /></React.Suspense>} />
        </Route>
        <Route path='jabatan'>
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><JabatanPage /></React.Suspense>} />
          <Route path="add" element={<React.Suspense fallback={<TopBarLoader />}><JabatanForm /></React.Suspense>} />
          <Route path="edit/:id" element={<React.Suspense fallback={<TopBarLoader />}><JabatanForm /></React.Suspense>} />
        </Route>
        <Route path='regu-petugas'>
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><ReguPetugasPage /></React.Suspense>} />
          <Route path="add" element={<React.Suspense fallback={<TopBarLoader />}><ReguPetugasForm /></React.Suspense>} />
          <Route path="edit/:id" element={<React.Suspense fallback={<TopBarLoader />}><ReguPetugasForm /></React.Suspense>} />
        </Route>
        <Route path='petugas-regu'>
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><PetugasReguPage /></React.Suspense>} />
          <Route path="add" element={<React.Suspense fallback={<TopBarLoader />}><PetugasReguForm /></React.Suspense>} />
          <Route path="edit/:id" element={<React.Suspense fallback={<TopBarLoader />}><PetugasReguForm /></React.Suspense>} />
        </Route>
        <Route path="*" element={<Error404 type="admin" />}></Route>
      </Routes>
    </>
  )
}
