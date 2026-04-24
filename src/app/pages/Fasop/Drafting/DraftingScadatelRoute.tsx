import Error404 from "@app/components/Error/Error404";
import React from "react";
import { Route, Routes } from "react-router-dom";
import TopBarLoader from "@app/components/Loader/TopBarLoader";

/** PAGE */

const WoDraftingPage = React.lazy(() => import("@app/pages/Fasop/Drafting/WoDrafting/WoDraftingPage"));
const WoDraftingForm = React.lazy(() => import("@app/pages/Fasop/Drafting/WoDrafting/WoDraftingForm"));
const PelaksanaanWoPage = React.lazy(() => import("@app/pages/Fasop/Drafting/PelaksanaanWo/PelaksanaanWoPage"));
const PelaksanaanWoDetailPage = React.lazy(() => import("@app/pages/Fasop/Drafting/PelaksanaanWo/PelaksanaanWoDetailPage"));
// const WoDraftingPelaksanaanForm = React.lazy(() => import("@app/pages/Fasop/Drafting/PelaksanaanWo/WoDraftingPelaksanaanForm"));
const AproveSpvScadatelPage = React.lazy(() => import("@app/pages/Fasop/Drafting/AproveSpvScadatel/AproveSpvScadatelPage"));
const AproveSpvScadatelDetailPageJQ = React.lazy(() => import("@app/pages/Fasop/Drafting/AproveSpvScadatel/AproveSpvScadatelDetailPageJQ"));
const AproveSpvOpsisPage = React.lazy(() => import("@app/pages/Fasop/Drafting/ApproveSpvOpsis/AproveSpvOpsisPage"));
const AproveSpvOpsisDetailPageJQ = React.lazy(() => import("@app/pages/Fasop/Drafting/ApproveSpvOpsis/AproveSpvOpsisDetailPageJQ"));
const AproveSpvBidangPage = React.lazy(() => import("@app/pages/Fasop/Drafting/ApproveSpvBidang/AproveSpvBidangPage"));
const AproveSpvBidangDetailPageJQ = React.lazy(() => import("@app/pages/Fasop/Drafting/ApproveSpvBidang/AproveSpvBidangDetailPageJQ"));

const MonitoringWOPageJQ = React.lazy(() => import("@app/pages/Fasop/Drafting/MonitoringWO/MonitoringWOPageJQ"));
const MonitoringWODetailPageJQ = React.lazy(() => import("@app/pages/Fasop/Drafting/MonitoringWO/MonitoringWODetailPageJQ"));

const MonitoringKinSpvPageJQ = React.lazy(() => import("@app/pages/Fasop/Drafting/MonitoringKinSpv/MonitoringKinSpvPageJQ"));
// const MonitoringKinSpvDetailPageJQ = React.lazy(() => import("@app/pages/Fasop/Drafting/MonitoringWO/MonitoringWODetailPageJQ"));

const MonitoringKinPelaksanaPageJQ = React.lazy(() => import("@app/pages/Fasop/Drafting/MonitoringKinPelakasana/MonitoringKinPelaksanaPageJQ"));
// const MonitoringKinPelaksanaDetailPageJQ = React.lazy(() => import("@app/pages/Fasop/Drafting/MonitoringWO/MonitoringWODetailPageJQ"));



export default function DraftingScadatelRoute() {
  return (
    <>
   
      <Routes>
  
        <Route path="/wo-drafting">
          <Route
            path=""
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <WoDraftingPage />
              </React.Suspense>
            }
          />
        <Route path="add" element={ <React.Suspense fallback={<TopBarLoader />}><WoDraftingForm /></React.Suspense>}/>
        <Route path='edit/:id' element={ <React.Suspense fallback={<TopBarLoader />}> <WoDraftingForm /></React.Suspense>} />
        </Route>

        <Route path="/pelaksanaan-wo">
          <Route
            path=""
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <PelaksanaanWoPage />
              </React.Suspense>
            }
          />
          
            <Route path='detail/:id' element={ <React.Suspense fallback={<TopBarLoader />}> <PelaksanaanWoDetailPage /></React.Suspense>} />
        </Route>
        
        <Route path="/approve-spv-scadatel">
          <Route
            path=""
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <AproveSpvScadatelPage />
              </React.Suspense>
            }
          />
        <Route path='detail/:id' element={ <React.Suspense fallback={<TopBarLoader />}> <AproveSpvScadatelDetailPageJQ/></React.Suspense>} />
        </Route>
        <Route path="/approve-spv-bidang">
          <Route
            path=""
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <AproveSpvBidangPage />
              </React.Suspense>
            }
          />
        <Route path='detail/:id' element={ <React.Suspense fallback={<TopBarLoader />}> <AproveSpvBidangDetailPageJQ/></React.Suspense>} />
        </Route>

     
        <Route path="/approve-spv-opsis">
          <Route
            path=""
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <AproveSpvOpsisPage />
              </React.Suspense>
            }
          />
        <Route path='detail/:id' element={ <React.Suspense fallback={<TopBarLoader />}> <AproveSpvOpsisDetailPageJQ/></React.Suspense>} />
        </Route>
     
        <Route path="/monitoring-wo">
          <Route
            path=""
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <MonitoringWOPageJQ />
              </React.Suspense>
            }
          />
        <Route path='detail/:id' element={ <React.Suspense fallback={<TopBarLoader />}> <MonitoringWODetailPageJQ/></React.Suspense>} />
        </Route>

     
        <Route path="/monitoring-kin-spv">
          <Route
            path=""
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <MonitoringKinSpvPageJQ />
              </React.Suspense>
            }
          />
        {/* <Route path='detail/:id' element={ <React.Suspense fallback={<TopBarLoader />}> <MonitoringKinSpvDetailPageJQ/></React.Suspense>} /> */}
        </Route>
     
        <Route path="/monitoring-kin-pelaksana">
          <Route
            path=""
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <MonitoringKinPelaksanaPageJQ />
              </React.Suspense>
            }
          />
        {/* <Route path='detail/:id' element={ <React.Suspense fallback={<TopBarLoader />}> <MonitoringKinPelaksanaDetailPageJQ/></React.Suspense>} /> */}
        </Route>

     

        <Route path="*" element={<Error404 type="admin" />}></Route>
      </Routes>
      
    </>
  );
}
