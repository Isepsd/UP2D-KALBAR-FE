import React, { useEffect, useState, useCallback } from 'react';
import { Button, Dropdown, ListGroup, OverlayTrigger, Popover, Tooltip } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Clock from 'react-live-clock';

import _head from 'lodash/head';
import { concat, debounce } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';

import { MENU } from "@app/configs/menu.config";
import { OPTIONS_DISPLAY_SCALE } from '@app/configs/select-options.config';
import { initFlatMenu } from "@app/helper/menu.helper";
import { setActivePage, setThemeMode, setApplication, toggleSidebarMenu } from "@app/store/reducers/ui";
import { useApp } from '@app/context/AppContext';
import { logoutUser } from '@app/store/reducers/auth';
import LazyImage from '@app/components/LazyLoad/LazyImage';
import NotificationCenter from '@app/modules/Notification/NotificationCenter';
import { cdnUrl } from '@app/helper/cdn.helper';

import moment from 'moment';
import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';
moment.locale('id-ID');

import { API_PATH } from "@app/services/_path.service";
import { getAllByPath } from "@app/services/main.service";
import axios from "axios";


export default function Header() {
  const source = axios.CancelToken.source();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [menu, setMenu] = useState<any>();
  const [datumServer, setDatumServer] = useState<any>('');
  const [search, setSearch] = useState<any>('');
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const { navigation, application, themeMode, collapsedSidebar } = useSelector((state: any) => state.ui);
  const { currentUser } = useSelector((state: any) => state.auth);
  const { onChangeSearchValue } = useApp();
  const [roleActions, setRoleActions] = useState<any>({});
  /** HANDLE LOGOUT */
  const logoutProcessing = (event: any) => {
    event.preventDefault();
    dispatch(logoutUser());
    // window.location.href = "/signin"
    navigate("/signin");
  };

  const toggleThemeMode = () => {
    const mode = themeMode == 'light' ? 'dark' : 'light';
    dispatch(setThemeMode(mode));
  }

  const onChangeScale = (value: string) => {
    const params: any = { ...application, scaling: value }
    dispatch(setApplication(params));
  }

  useEffect(() => {
    const flatNavigation = initFlatMenu(navigation);
    const navs = concat(flatNavigation, MENU)
    const activeMenu: any = _head(
      navs.filter((f: any) => f.path != '' && location?.pathname.includes(f.path))
      // navs.filter((f: any) => f.path != '' && location?.pathname == f.path)
    );
    setMenu(activeMenu);
    dispatch(setActivePage({ ...activeMenu, isSubUrl: activeMenu?.path != location.pathname }))
    document.title = activeMenu
      ? `${activeMenu?.display} - ${process.env.APP_NAME}`
      : `${process.env.APP_NAME}`;

    setSearch('');
    onChangeSearchValue('');
  }, [location?.pathname]);

  useEffect(() => {
    debouncedSearchHandler(search);
  }, [search]);

  /**
   * ! Search handler & debounce
   * @param event
   */
  const searchHandler = (value: any) => {
    onChangeSearchValue(value || '');
  };

  const debouncedSearchHandler = useCallback(debounce(searchHandler, 500), []);

  const getTimeServer = async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    try {
      const req: any = await getAllByPath(`${API_PATH().admin.settings}/times`, {}, source.token);
      const { results } = req;
      setDatumServer(results);
    } catch (err: any) {
      console.log(err);
      setDatumServer('');
    }
  };

  useEffect(() => {
    let roleAccess = ROLE_ACCESS("roles")
    const roleAct = {
      setting: ROLE_ACTION(roleAccess, 'setting'),
    };
    setRoleActions(roleAct);
    getTimeServer();
  }, [])
const notifications = [
    {
      title: "Update Histori RTU",
      desc: "RTU GI Cibinong berhasil diupdate",
      time: "2 menit lalu",
    },
    {
      title: "Update Master Penyulang",
      desc: "Penyulang CBG-01 diperbarui",
      time: "10 menit lalu",
    },
    {
      title: "Update Histori RTU",
      desc: "RTU GI Bogor berhasil diupdate",
      time: "30 menit lalu",
    },
  ];

  return (
    <>
      <nav className={`site-header light sticky-top py-2 sidebar-expand border-0 ${collapsedSidebar == 'collapse' ? 'collapse-sidebar' : collapsedSidebar}`}
      >
        {/* LEFT */}
        <div className='container d-flex justify-content-between'>
          <div
            className='align-items-center d-flex animate__animated animate__fadeIn elipsis'
            style={{ padding: '.75rem 0' }}
          >
            {/* BUTTON MENU RESPONSEIVE  */}
            <Button
              onClick={() => dispatch(toggleSidebarMenu())}
              type='button'
              className='d-block d-sm-none me-3 p-0 bg-transparent text-body no-outline'
              variant='btn-link'
              size='lg'
            >
              <i className='fas fa-bars'></i>
            </Button>

            {/* BUTTON MENU BACK  */}
            <Button
              // onClick={() => navigate(-1)}
              onClick={() => dispatch(toggleSidebarMenu())}
              type='button'
              className='d-none d-sm-block me-3 p-0 bg-transparent text-body no-outline'
              variant='btn-link'
            >
              <i className='fas fa-bars'></i>
            </Button>

            <h5 className='m-0'>{menu?.display}</h5>
          </div>

          {/* RIGHT */}
          <div className='d-flex align-items-center animate__animated animate__fadeIn'>
            <span className='d-none d-md-block' style={{ width: '14rem' }}>
              {datumServer && <Clock format={'dddd, D MMM YYYY HH:mm:ss'} date={datumServer} ticking={true} />}
            </span>
            <OverlayTrigger
              trigger='click'
              placement='bottom'
              rootClose={true}
              overlay={
                <Popover id='popover-difficulty'>
                  <Popover.Body className='pt-3'>
                    <ListGroup variant='flush'>
                      {OPTIONS_DISPLAY_SCALE().map((x: any, index: number) => (
                        <ListGroup.Item
                          key={index}
                          className={`bg-transparent text-center cursor-pointer ${application?.scaling == x.value ? 'text-primary' : ''}`}
                          onClick={() => onChangeScale(x.value)}
                        >
                          {x.label}
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Popover.Body>
                </Popover>
              }
            >
              <a className='font-weight-bold cursor-pointer'>
                <i className='fa-solid fa-font'></i>
              </a>
            </OverlayTrigger>

            <OverlayTrigger placement={'bottom'} overlay={<Tooltip> Download manual book <br /> Web Portal </Tooltip>}>
              <Link
                to='/admin/manuals'
                className='btn bg-transparent font-weight-bold font-sise-large no-outline position-relative rounded-circle ms-3'
              >
                <i className="fa-solid fa-book"></i>
              </Link>
            </OverlayTrigger>
          <Dropdown align="end">
      <OverlayTrigger
        placement="bottom"
        overlay={
          <Tooltip>
            Notifikasi <br /> Web Portal
          </Tooltip>
        }
      >
        <Dropdown.Toggle
          as="div"
          className="btn bg-transparent position-relative rounded-circle ms-3"
          style={{ cursor: "pointer" }}
        >
          <i className="fa-solid fa-bell"></i>

          {/* 🔴 Badge jumlah notif */}
          <span
            className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
            style={{ fontSize: "10px" }}
          >
            {notifications.length}
          </span>
        </Dropdown.Toggle>
      </OverlayTrigger>

      {/* 🔽 Dropdown Content */}
      <Dropdown.Menu style={{ width: "320px" }}>
        <div className="px-3 py-2 border-bottom fw-bold">
          Notifikasi
        </div>

        {notifications.map((item, index) => (
          <Dropdown.Item key={index} className="py-2">
            <div className="fw-semibold">{item.title}</div>
            <div style={{ fontSize: "12px" }}>{item.desc}</div>
            <div className="text-muted" style={{ fontSize: "11px" }}>
              {item.time}
            </div>
          </Dropdown.Item>
        ))}

        <div className="text-center border-top p-2">
          <Link to="/admin/notifikasi">Lihat Semua</Link>
        </div>
      </Dropdown.Menu>
    </Dropdown>
            {roleActions?.setting &&
              <OverlayTrigger placement={'bottom'} overlay={<Tooltip> Setting Apps </Tooltip>}>
                <Link
                  to='/admin/settings'
                  className='btn bg-transparent font-weight-bold font-sise-large no-outline position-relative rounded-circle ms-1'
                >
                  <i className='fa-solid fa-gear'></i>
                </Link>
              </OverlayTrigger>
            }


            <Button
              onClick={() => setShowNotification(true)}
              variant=''
              size='lg'
              className='bg-transparent font-weight-bold ms-2 me-2 font-sise-large no-outline position-relative rounded-circle ms-3'
              style={{
                border: '1px solid var(--black-100)',
                padding: '.3rem .65rem',
              }}
              hidden
            >
              <i className='fa-regular fa-bell'></i>
              <span className='position-absolute top-5 start-100 translate-middle p-2 bg-danger border border-light rounded-circle'>
                <span className='visually-hidden'>New alerts</span>
              </span>
            </Button>

            <Dropdown className='hide-toogle mmenu hide-focus ms-2'>
              <Dropdown.Toggle className='p-0 bg-transparent border-0 no-outline'>
                <div className='align-items-center d-flex py-2'>
                  <LazyImage
                    src={cdnUrl(currentUser?.avatar)}
                    className='avatar-img image-circle bg-white'
                    style={{ width: '2.75rem', height: '2.75rem' }}
                  />
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu className='transform-right'>
                <Link
                  key='account'
                  to='/account/profile'
                  className='dropdown-item'
                >
                  <i className='fa-regular fa-user me-1' />
                  {currentUser?.fullname}
                </Link>
                <div
                  className='dropdown-item cursor-pointer'
                  onClick={() => toggleThemeMode()}
                >
                  <i
                    className={`me-1 fa-regular fa-${themeMode == 'light' ? 'moon' : 'sun'
                      }`}
                  />
                  {themeMode == 'light' ? 'Dark' : 'Light'} Mode
                </div>
                <hr className='my-2' />
                <a
                  className='dropdown-item text-danger cursor-pointer'
                  onClick={logoutProcessing}
                >
                  <i className='fa-solid fa-arrow-right-from-bracket me-1' />
                  Keluar
                </a>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>

        {/* <div className='container mt-3'>
        <h3 className='my-3'>{menu?.display}</h3>
      </div> */}
      </nav>

      {showNotification && (
        <NotificationCenter setShowNotification={setShowNotification} />
      )}
    </>
  );
}
