import Error404 from '@app/components/Error/Error404';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

import TopBarLoader from '@app/components/Loader/TopBarLoader';

/** PAGE */
const RekapPadamPage = React.lazy(() => import('@app/pages/Opsisdis/RekapPadam/RekapPadam/RekapPadamPage'));
const RekapPadamDetail = React.lazy(() => import('@app/pages/Opsisdis/RekapPadam/RekapPadam/DetailRekapPadam'));
const AddRekapPadam = React.lazy(() => import('@app/pages/Opsisdis/RekapPadam/RekapPadam/AddRekapPadam'));
const UpdateRekapPadam = React.lazy(() => import('@app/pages/Opsisdis/RekapPadam/RekapPadam/UpdateRekapPadam'));
const RincianPadamPage = React.lazy(() => import('@app/pages/Opsisdis/RekapPadam/RincianPadam/RincianPadamPage'));

export default function RekapPadamRoute() {
  return (
    <>
      <Routes>
        <Route path='/' element={ <React.Suspense fallback={<TopBarLoader />}> <RekapPadamPage /> </React.Suspense> } />
        <Route path='/rekap' element={ <React.Suspense fallback={<TopBarLoader />}> <RekapPadamPage /></React.Suspense>} />
        <Route path='/rekap/add' element={ <React.Suspense fallback={<TopBarLoader />}> <AddRekapPadam /></React.Suspense>} />
        <Route path='/rekap/edit/:id' element={ <React.Suspense fallback={<TopBarLoader />}> <UpdateRekapPadam /></React.Suspense>} />
        <Route path='/rekap/detail/:id' element={ <React.Suspense fallback={<TopBarLoader />}> <RekapPadamDetail /></React.Suspense>} />
        <Route path='rincian' element={ <React.Suspense fallback={<TopBarLoader />}> <RincianPadamPage /></React.Suspense>} />
        <Route path='*' element={<Error404 type='admin' />}></Route>
      </Routes>
    </>
  );
}
