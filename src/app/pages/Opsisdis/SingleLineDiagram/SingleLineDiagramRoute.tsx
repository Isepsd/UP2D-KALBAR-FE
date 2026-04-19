import Error404 from '@app/components/Error/Error404';
import React from 'react'
import { Route, Routes } from 'react-router-dom';

import TopBarLoader from '@app/components/Loader/TopBarLoader';

/** PAGE */
const LayoutGiGhGbPage = React.lazy(() => import("@app/pages/Opsisdis/SingleLineDiagram/LayoutGiGhGb/LayoutGiGhGbPage"))
const SingleLine20kVPage = React.lazy(() => import("@app/pages/Opsisdis/SingleLineDiagram/SingleLine20kV/SingleLine20kVPage"))

export default function SingleLineDiagramRoute() {
  return (
    <>
    <Routes> 
          <Route path="layout-gighgb" element={<React.Suspense fallback={<TopBarLoader />}><LayoutGiGhGbPage /></React.Suspense>} />
          <Route path="single-line-20kv" element={<React.Suspense fallback={<TopBarLoader />}><SingleLine20kVPage /></React.Suspense>} />
          <Route path="*" element={<Error404 type="admin" />}></Route> 
      </Routes>
    </>
  )
}
