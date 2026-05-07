import React, { useEffect } from 'react'

import { Link, Navigate, useNavigate, Route, Routes, useLocation } from 'react-router-dom';

import AppsLayout from "@app/modules/AppsLayout/AppsLayout";
import Error404 from "@app/components/Error/Error404";
import ErrorOffline from '@app/components/Error/ErrorOffline';
import TopBarLoader from '@app/components/Loader/TopBarLoader';

// SUB ROUTING
import AdministratorRout from './Administrator/AdministratorRoute';
import DashboardRoute from './Dashboard/DashboardRoute';
import SpectrumRealtimeRoute from './Fasop/SpectrumRealtime/SpectrumRealtimeRoute';
import SpectrumHistoriRoute from './Fasop/SpectrumHistori/SpectrumHistoriRoute';
import SpectrumKinerjaRoute from './Fasop/SpectrumKinerja/SpectrumKinerjaRoute';
import TelegramRoute from './Fasop/Telegram/TelegramRoute';
import WhatsappLOGRoute from './Fasop/WhatsappLOG/WhatsappLOGRoute';
import TiketRoute from './Tiket/TiketRoute';
// OPSIDIS ROUTES

// MASTER DATA ROUTES
import JaringanRoute from './MasterData/Jaringan/JaringanRoute';
import AdminKSARoute from './MasterData/AdminKsa/AdminKSARoute';
import AsetRoute from './MasterData/Aset/AsetRoute';
import FasopRoute from './MasterData/Fasop/FasopRoute';
import WorkingPermitRoute from './MasterData/WorkingPermit/WorkingPermitRoute';

// WORKING MANAGEMENT ROUTES
import WorkingManagementRoute from './WorkingPermit/WorkingManagementRoute'

// APKT ROUTES
import ApktRoute from './Apkt/ApktRoute'
import { getItem, setItem } from '@app/helper/localstorage.helper';
import moment from 'moment';
import { initNestedMenu } from '@app/helper/menu.helper';
import { getAllByPath, getByIdPath } from '@app/services/main.service';
import { stringToJSON } from '@app/helper/data.helper';
import { setNavigation } from '@app/store/reducers/ui';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setRoleAccess } from '@app/store/reducers/auth';
import MasterOpsisdisRoute from './MasterData/Opsisdis/MasterOpsisdisRoute';
import ApiExternalRoute from './MasterData/ApiExternal/ApiExternalRoute';
import OpsisdisRoute from './Opsisdis/OpsisdisRoute';
import ChangePasswordPage from './Account/ChangePasswordPage';
import { Alert } from 'react-bootstrap';
import DraftingScadatelRoute from "./Fasop/Drafting/DraftingScadatelRoute";
/** PAGE COMPONENT */

const PegawaiPage = React.lazy(() => import("@app/pages/MasterData/Pegawai/PegawaiPage"))
const PegawaiForm = React.lazy(() => import("@app/pages/MasterData/Pegawai/PegawaiForm"))
const VendorPage = React.lazy(() => import("@app/pages/MasterData/vendor/VendorPage"))
const VendorForm = React.lazy(() => import("@app/pages/MasterData/vendor/VendorForm"))
const ProfilePage = React.lazy(() => import("@app/pages/Account/ProfilePage"))
const GangguanPage = React.lazy(() => import("@app/pages/Fasop/Gangguan/GangguanPage"))
const MonitoringKeyPointPage = React.lazy(() => import("@app/pages/Fasop/MonitoringKeyPoint/MonitoringKeyPointPage"))
const MonitoringProsesPage = React.lazy(() => import("@app/pages/Fasop/MonitoringProses/MonitoringProsesPage"))
const MonitoringProsesForm = React.lazy(() => import("@app/pages/Fasop/MonitoringProses/MonitoringProsesForm"))
/**
 * NOTE: ROUTING APPS PAGE ADA DISINI
 * @returns 
 */
export default function AppsPage(): React.ReactElement {
  const source = axios.CancelToken.source();
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const location = useLocation()
  const { currentUser, credentials } = useSelector((state: any) => state.auth);
  const { application } = useSelector((state: any) => state.ui);

  const [connection, setConnection] = React.useState<'offline' | 'online'>('online')

  useEffect(() => {
    lastUpdate()

    document.body.classList.remove("overflow-hidden");
    document.body.removeAttribute('style');

    function listenerOffline() {
      setConnection('offline')
    }

    function listenerOnline() {
      setConnection('online')
    }

    window.addEventListener('offline', listenerOffline);
    window.addEventListener('online', listenerOnline);

    return () => {
      document.body.style.overflow = "hidden"
      window.removeEventListener('offline', listenerOffline);
      window.removeEventListener('online', listenerOnline);
    }
  }, [])

  useEffect(() => {
    /** ERROR CHANGE PASS WARNING */
    if (credentials?.change_passd_recomendation && (!location.pathname.includes("/account/change-password") && !location.pathname.includes("/account/profile"))) {
      document.body.setAttribute('passwd-change-warning', 'true');
      navigate('/account/change-password');
    } else {
      document.body.removeAttribute('passwd-change-warning');
    }
  }, [location.pathname])


  const lastUpdate = () => {
    const now = moment()
    const last = getItem("_udate")
    if (last) {
      const startTime = moment(last);
      const endTime = now;

      // calculate total duration
      const duration: any = moment.duration(endTime.diff(startTime));
      const hours = parseFloat(duration.asHours());
      if (hours >= 0.25) {
        getUpdateMenu()
        getUpdateRole()
        setItem("_udate", now)
      }
    } else {
      setItem("_udate", now)
    }
  }

  const getUpdateMenu = async () => {
    /** GET MENU */
    const reqMenu: any = await getAllByPath('menu', { page: -1, limit: -1, }, source.token);

    const { results } = reqMenu;
    const dataResults = results ? results : [];
    const MENU = dataResults.map((d: any) => {
      return {
        ...d,
        idParent: d.idParent ? d.idParent : '',
        privileges: stringToJSON(d.privileges),
      };
    });

    const menus = initNestedMenu('', MENU, null);
    dispatch(setNavigation(menus));
  }

  /** GET UPDATE ROLE */
  const getUpdateRole = async () => {
    /** GET ROLE */
    const reqRole: any = await getByIdPath('roles', currentUser?.roleId, source.token)
    dispatch(setRoleAccess(reqRole?.results))
  }

  if (connection === 'offline') {
    return <ErrorOffline />
  }

  return (
    <>
      {
        (credentials?.change_passd_recomendation && (!location.pathname.includes("/account/change-password") && !location.pathname.includes("/account/profile"))) &&
        <Alert variant='danger' dismissible className='text-center' style={{ marginBottom: 0 }}>
          <Alert.Link href="#">Peringatan masalah keamanan akun : </Alert.Link> Password yang digunakan sudah tidak aman lagi ! Perubahan password terakhir <b>{currentUser?.days ? currentUser?.days : 30} hari</b> yang lalu.
          Mengingat begitu pentingnya keamanan akun, disarankan untuk selalu <b>mengupdate password</b> secara berkala dalam jangka waktu <b>maksimal {application?.max_change_life ? application?.max_change_life : 30} hari</b>. <br />
          Silahkan ubah password terlebih dahulu sebelum melanjutkan akses ke aplikasi. <Link to="/account/change-password">Klik disini</Link>
        </Alert>
      }

      <Routes>
        <Route path="" element={<AppsLayout />}>
          <Route path="" element={<>App Welcome</>}></Route>

          {/* ACCOUNT  */}
          <Route path="account">
            <Route path='' element={<Navigate to={'profile'}></Navigate>}></Route>
            <Route path="profile" element={<React.Suspense fallback={<TopBarLoader />}><ProfilePage /></React.Suspense>} />
            <Route path="change-password" element={<React.Suspense fallback={<TopBarLoader />}><ChangePasswordPage /></React.Suspense>} />
            {/* <Route path="forgot-password" element={<ForgotPassword />} /> */}
          </Route>

          {/* ADMIN  */}
          <Route path="adminksa/*" element={<React.Suspense fallback={<TopBarLoader />}><AdminKSARoute /></React.Suspense>} />

          <Route path="*" element={<Error404 type="admin" />}></Route>

          {/* DASHBOARD  */}
          <Route path="dashboard/*" element={<React.Suspense fallback={<TopBarLoader />}><DashboardRoute /></React.Suspense>} />

          {/* FASOP  */}
          <Route path="spectrum">
             <Route
            path="drafting/*"
                  element={
                <React.Suspense fallback={<TopBarLoader />}>
                  <DraftingScadatelRoute />
                  </React.Suspense>
                    }
                />
            <Route path="rt/*" element={<React.Suspense fallback={<TopBarLoader />}><SpectrumRealtimeRoute /></React.Suspense>} />
            <Route path="his/*" element={<React.Suspense fallback={<TopBarLoader />}><SpectrumHistoriRoute /></React.Suspense>} />
            <Route path="kin/*" element={<React.Suspense fallback={<TopBarLoader />}><SpectrumKinerjaRoute /></React.Suspense>} />
            <Route path="gangguan" element={<React.Suspense fallback={<TopBarLoader />}><GangguanPage /></React.Suspense>} />
            <Route path="monitoring-keypoint" element={<React.Suspense fallback={<TopBarLoader />}><MonitoringKeyPointPage /></React.Suspense>} />
            {/* <Route path="monitoring-proses" element={<React.Suspense fallback={<TopBarLoader />}><MonitoringProsesPage /></React.Suspense>} /> */}
            <Route path="monitoring-proses">
           
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><MonitoringProsesPage /></React.Suspense>} />
          <Route path="add" element={<React.Suspense fallback={<TopBarLoader />}><MonitoringProsesForm /></React.Suspense>} />
          <Route path="edit/:id" element={<React.Suspense fallback={<TopBarLoader />}><MonitoringProsesForm /></React.Suspense>} />
        </Route>
          </Route>
    
          <Route path="telegram/*" element={<React.Suspense fallback={<TopBarLoader />}><TelegramRoute /></React.Suspense>} />
          <Route path="whatsapp/*" element={<React.Suspense fallback={<TopBarLoader />}><WhatsappLOGRoute /></React.Suspense>} />☻
          <Route path="tiket/*" element={<React.Suspense fallback={<TopBarLoader />}><TiketRoute /></React.Suspense>} />☻

          {/* OPSISDIS  */}
          <Route path="opsisdis/*" element={<React.Suspense fallback={<TopBarLoader />}><OpsisdisRoute /></React.Suspense>} />

          {/* ApiExternal */}
          <Route path="external/*" element={<React.Suspense fallback={<TopBarLoader />}><ApiExternalRoute /></React.Suspense>} />


          {/* Working Management */}
          <Route path="wm/*" element={<React.Suspense fallback={<TopBarLoader />}><WorkingManagementRoute /></React.Suspense>} />

          {/* APKT */}
          <Route path="apkt/*" element={<React.Suspense fallback={<TopBarLoader />}><ApktRoute /></React.Suspense>} />

          {/* MASTER DATA  */}
          <Route path="aset/*" element={<React.Suspense fallback={<TopBarLoader />}><AsetRoute /></React.Suspense>} />
          <Route path="fasop/*" element={<React.Suspense fallback={<TopBarLoader />}><FasopRoute /></React.Suspense>} />
          <Route path="jaringan/*" element={<React.Suspense fallback={<TopBarLoader />}><JaringanRoute /></React.Suspense>} />
          <Route path="master-opsisdis/*" element={<React.Suspense fallback={<TopBarLoader />}><MasterOpsisdisRoute /></React.Suspense>} />
          <Route path="wp/*" element={<React.Suspense fallback={<TopBarLoader />}><WorkingPermitRoute /></React.Suspense>} />
          <Route path="pegawai">
            <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><PegawaiPage /></React.Suspense>} />
            <Route path="add" element={<React.Suspense fallback={<TopBarLoader />}><PegawaiForm /></React.Suspense>} />
            <Route path="edit/:id" element={<React.Suspense fallback={<TopBarLoader />}><PegawaiForm /></React.Suspense>} />
          </Route>
          <Route path="vendor">
            <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><VendorPage /></React.Suspense>} />
            <Route path="add" element={<React.Suspense fallback={<TopBarLoader />}><VendorForm /></React.Suspense>} />
            <Route path="edit/:id" element={<React.Suspense fallback={<TopBarLoader />}><VendorForm /></React.Suspense>} />
          </Route>
          <Route path="admin/*" element={<AdministratorRout />}></Route>

        </Route>
      </Routes>
    </>
  )
}