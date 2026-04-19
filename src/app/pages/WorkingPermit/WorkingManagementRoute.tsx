import Error404 from '@app/components/Error/Error404';
import React from 'react'
import { Route, Routes } from 'react-router-dom';

import TopBarLoader from '@app/components/Loader/TopBarLoader';
import WmWorkingPermitFormPage from './WorkingPermit/WmWorkingPermitFormPage';
import WmApprovalClosePage from './ApprovalClose/WmApprovalClosePage';
// import WmApprovalDetailPage from './Approval/WmApprovalDetailPage';

/** PAGE */
const WmWorkingPermitPage = React.lazy(() => import("./WorkingPermit/WmWorkingPermitPage"))
// const WmApprovalPage = React.lazy(() => import("./Approval/WmApprovalPage"))
const WmSOPnJSAPage = React.lazy(() => import("./SOPnJSA/WmSOPnJSAPage"))
const WmHirarcPage = React.lazy(() => import("./Hirarc/WmHirarcPage"))
const WmDashboardPage = React.lazy(() => import("./Dashboard/WmDashboardPage"))
const WmQRCPage = React.lazy(() => import("./QRC/WmQRCPage"))
const ApprovalManagerPage = React.lazy(() => import("./ApprovalManager/ApprovalManagerPage"))
const ApprovalK3LPage = React.lazy(() => import("./ApprovalK3L/ApprovalK3LPage"))
const ApprovalSPVPage = React.lazy(() => import("./ApprovalSPV/ApprovalSPVPage"))
const ApprovalAssmentPage = React.lazy(() => import("./ApprovalAssment/ApprovalAssmentPage"))
const ApprovalOpsisPage = React.lazy(() => import("./ApprovalOpsis/ApprovalOpsisPage"))
const ApprovalProsesPage = React.lazy(() => import("./ApprovalProses/ApprovalProsesPage"))
const WmWorkingPermitSelesaiPage = React.lazy(() => import("./WorkingPermitSelesai/WmWorkingPermitSelesaiPage"))
const WmWorkingPermitApproveDetailPage = React.lazy(() => import("./WorkingPermit/WmWorkingPermitApproveDetailPage"))
const WmWorkingPermitViewDetailPage = React.lazy(() => import("./WorkingPermit/WmWorkingPermitViewDetailPage"))
const WmWorkingPermitViewDataPage = React.lazy(() => import("./WorkingPermit/WmWorkingPermitViewDataPage"))

export default function WorkingManagementRoute() {
  return (
    <>
      <Routes>
        <Route path="working-permit">
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><WmWorkingPermitPage /></React.Suspense>} />
          <Route path="add" element={<React.Suspense fallback={<TopBarLoader />}><WmWorkingPermitFormPage /></React.Suspense>} />
          <Route path="edit/:id" element={<React.Suspense fallback={<TopBarLoader />}><WmWorkingPermitFormPage /></React.Suspense>} />
          <Route path="approve-detail/:id" element={<React.Suspense fallback={<TopBarLoader />}><WmWorkingPermitApproveDetailPage /></React.Suspense>} />
        </Route>
        <Route path="approval-spv">
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><ApprovalSPVPage /></React.Suspense>} />
          <Route path="detail/:id" element={<React.Suspense fallback={<TopBarLoader />}><WmWorkingPermitApproveDetailPage /></React.Suspense>} />
        </Route>
        <Route path="approval-k3l">
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><ApprovalK3LPage /></React.Suspense>} />
          <Route path="detail/:id" element={<React.Suspense fallback={<TopBarLoader />}><WmWorkingPermitApproveDetailPage /></React.Suspense>} />
        </Route>
        <Route path="approval-assment">
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><ApprovalAssmentPage /></React.Suspense>} />
          <Route path="detail/:id" element={<React.Suspense fallback={<TopBarLoader />}><WmWorkingPermitApproveDetailPage /></React.Suspense>} />
        </Route>
        <Route path="approval-opsis">
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><ApprovalOpsisPage /></React.Suspense>} />
          <Route path="detail/:id" element={<React.Suspense fallback={<TopBarLoader />}><WmWorkingPermitApproveDetailPage /></React.Suspense>} />
        </Route>
        <Route path="approval-proses">
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><ApprovalProsesPage /></React.Suspense>} />
          <Route path="detail/:id" element={<React.Suspense fallback={<TopBarLoader />}><WmWorkingPermitApproveDetailPage /></React.Suspense>} />
        </Route>
        <Route path="approval-manager">
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><ApprovalManagerPage /></React.Suspense>} />
          <Route path="detail/:id" element={<React.Suspense fallback={<TopBarLoader />}><WmWorkingPermitApproveDetailPage /></React.Suspense>} />
        </Route>
        <Route path="approval-close">
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><WmApprovalClosePage /></React.Suspense>} />
        </Route>
        <Route path="wp-close">
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><WmWorkingPermitSelesaiPage /></React.Suspense>} />
        </Route>
        <Route path="sop-jsa">
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><WmSOPnJSAPage /></React.Suspense>} />
        </Route>
        <Route path="hirarc" element={<React.Suspense fallback={<TopBarLoader />}><WmHirarcPage /></React.Suspense>} />
        <Route path="dashboard" element={<React.Suspense fallback={<TopBarLoader />}><WmDashboardPage /></React.Suspense>} />
        <Route path="detail-view/:id" element={<React.Suspense fallback={<TopBarLoader />}><WmWorkingPermitViewDetailPage /></React.Suspense>} />
        <Route path="view-data/:status" element={<React.Suspense fallback={<TopBarLoader />}><WmWorkingPermitViewDataPage /></React.Suspense>} />
        <Route path="qrc" element={<React.Suspense fallback={<TopBarLoader />}><WmQRCPage /></React.Suspense>} />
        <Route path="*" element={<Error404 type="admin" />}></Route>
      </Routes>
    </>
  )
}