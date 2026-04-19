import Error404 from '@app/components/Error/Error404';
import React from 'react'
import { Route, Routes } from 'react-router-dom';

import TopBarLoader from '@app/components/Loader/TopBarLoader';

/** PAGE */
const AsetPage = React.lazy(() => import("@app/pages/MasterData/Aset/Aset/AsetPage"))
const AsetFormPage = React.lazy(() => import("@app/pages/MasterData/Aset/Aset/AsetFormPage"))
const JenisAsetPage = React.lazy(() => import("@app/pages/MasterData/Aset/JenisAset/JenisAsetPage"))
const JenisFormPage = React.lazy(() => import("@app/pages/MasterData/Aset/JenisAset/JenisFormPage"))
const JenisItemFormPage = React.lazy(() => import("@app/pages/MasterData/Aset/JenisAset/JenisItemFormPage"))
const KondisiAsetPage = React.lazy(() => import("@app/pages/MasterData/Aset/KondisiAset/KondisiAsetPage"))
const KondisiFormPage = React.lazy(() => import("@app/pages/MasterData/Aset/KondisiAset/KondisiFormPage"))
const LantaiPage = React.lazy(() => import("@app/pages/MasterData/Aset/Lantai/LantaiPage"))
const LantaiFormPage = React.lazy(() => import("@app/pages/MasterData/Aset/Lantai/LantaiFormPage"))
const LevelAsetPage = React.lazy(() => import("@app/pages/MasterData/Aset/LevelAset/LevelAsetPage"))
const LevelFormPage = React.lazy(() => import("@app/pages/MasterData/Aset/LevelAset/LevelFormPage"))
const ManufakturAsetPage = React.lazy(() => import("@app/pages/MasterData/Aset/ManufakturAset/ManufakturAsetPage"))
const ManufakturFormPage = React.lazy(() => import("@app/pages/MasterData/Aset/ManufakturAset/ManufakturFormPage"))
const RakPage = React.lazy(() => import("@app/pages/MasterData/Aset/Rak/RakPage"))
const RakFormPage = React.lazy(() => import("@app/pages/MasterData/Aset/Rak/RakFormPage"))
const RuanganPage = React.lazy(() => import("@app/pages/MasterData/Aset/Ruangan/RuanganPage"))
const RuanganFormPage = React.lazy(() => import("@app/pages/MasterData/Aset/Ruangan/RuanganFormPage"))
const StatusAsetPage = React.lazy(() => import("@app/pages/MasterData/Aset/StatusAset/StatusAsetPage"))
const StatusFormPage = React.lazy(() => import("@app/pages/MasterData/Aset/StatusAset/StatusFormPage"))

export default function AsetRoute() {
  return (
    <>
      <Routes>
        <Route path="aset">
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><AsetPage /></React.Suspense>} />
          <Route path="add" element={<React.Suspense fallback={<TopBarLoader />}><AsetFormPage /></React.Suspense>} />
          <Route path="edit/:id" element={<React.Suspense fallback={<TopBarLoader />}><AsetFormPage /></React.Suspense>} />
        </Route>

        <Route path="jenis">
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><JenisAsetPage /></React.Suspense>} />
          <Route path="add" element={<React.Suspense fallback={<TopBarLoader />}><JenisFormPage /></React.Suspense>} />
          <Route path="edit/:id" element={<React.Suspense fallback={<TopBarLoader />}><JenisFormPage /></React.Suspense>} />
          <Route path="add-item" element={<React.Suspense fallback={<TopBarLoader />}><JenisItemFormPage /></React.Suspense>} />
          <Route path="edit-item/:id" element={<React.Suspense fallback={<TopBarLoader />}><JenisItemFormPage /></React.Suspense>} />
        </Route>

        <Route path="kondisi">
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><KondisiAsetPage /></React.Suspense>} />
          <Route path="add" element={<React.Suspense fallback={<TopBarLoader />}><KondisiFormPage /></React.Suspense>} />
          <Route path="edit/:id" element={<React.Suspense fallback={<TopBarLoader />}><KondisiFormPage /></React.Suspense>} />
        </Route>

        <Route path="lantai">
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><LantaiPage /></React.Suspense>} />
          <Route path="add" element={<React.Suspense fallback={<TopBarLoader />}><LantaiFormPage /></React.Suspense>} />
          <Route path="edit/:id" element={<React.Suspense fallback={<TopBarLoader />}><LantaiFormPage /></React.Suspense>} />
        </Route>

        <Route path="level">
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><LevelAsetPage /></React.Suspense>} />
          <Route path="add" element={<React.Suspense fallback={<TopBarLoader />}><LevelFormPage /></React.Suspense>} />
          <Route path="edit/:id" element={<React.Suspense fallback={<TopBarLoader />}><LevelFormPage /></React.Suspense>} />
        </Route>

        <Route path="manufaktur">
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><ManufakturAsetPage /></React.Suspense>} />
          <Route path="add" element={<React.Suspense fallback={<TopBarLoader />}><ManufakturFormPage /></React.Suspense>} />
          <Route path="edit/:id" element={<React.Suspense fallback={<TopBarLoader />}><ManufakturFormPage /></React.Suspense>} />
        </Route>

        <Route path="rak">
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><RakPage /></React.Suspense>} />
          <Route path="add" element={<React.Suspense fallback={<TopBarLoader />}><RakFormPage /></React.Suspense>} />
          <Route path="edit/:id" element={<React.Suspense fallback={<TopBarLoader />}><RakFormPage /></React.Suspense>} />
        </Route>

        <Route path="ruangan">
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><RuanganPage /></React.Suspense>} />
          <Route path="add" element={<React.Suspense fallback={<TopBarLoader />}><RuanganFormPage /></React.Suspense>} />
          <Route path="edit/:id" element={<React.Suspense fallback={<TopBarLoader />}><RuanganFormPage /></React.Suspense>} />
        </Route>

        <Route path="status">
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><StatusAsetPage /></React.Suspense>} />
          <Route path="add" element={<React.Suspense fallback={<TopBarLoader />}><StatusFormPage /></React.Suspense>} />
          <Route path="edit/:id" element={<React.Suspense fallback={<TopBarLoader />}><StatusFormPage /></React.Suspense>} />
        </Route>

        <Route path="*" element={<Error404 type="admin" />}></Route>
      </Routes>
    </>
  )
}
