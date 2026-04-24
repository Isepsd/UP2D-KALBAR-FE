import React, { useState, useEffect,useRef, } from 'react'
import { useDispatch } from 'react-redux';
import { Tabs, Tab, Row, Col, Card, } from 'react-bootstrap'
import { head } from 'lodash'
import ModalConfirm from '@app/components/Modals/ModalConfirm';
/** COMPONENT */
// import TableDataListAction from '@app/modules/Table/TableDataListAction';
import TableDataJqxGridNew from '@app/modules/Table/TableDataJqxGridNew';
// import TableApktJarDetail from '@app/modules/APKT/TableApktJarDetail';
import PengirimanGarduRekap from '@app/modules/APKT/PengirimanGarduRekap';
import RoleDetailPageNyala from './RoleDetailPageNyala';
import RoleDetailPagePadam from './RoleDetailPagePadam';
import RoleDetailPageGardu from './RoleDetailPageGardu';
/** CONFIG */
import { MONITORING_APKT_JQ, MONITORING_APKT_DETAIL_PADAM_JQ, MONITORING_APKT_DETAIL_NYALA_JQ, PENGIRIMAN_STATUS_LOG_GARDU_JQ } from '@app/configs/react-table/apkt.columns.config'
import { notificationTemplate } from '@app/helper/notificationTemplate';
import { addNotification } from '@app/store/notification/notification.action';
/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
// import { useSearchParams } from 'react-router-dom';
import { timeFormat } from '@app/helper/time.helper';
// import TableMonitoringTree from '@app/modules/APKT/TableMonitoringTree';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Filter from './Filter';
import TableIntegrasiMon from '@app/modules/APKT/TableIntegrasiMon';
// import moment from 'moment';
import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';
import ModalData from '@app/components/Modals/ModalData';
import FormUpdateNOAPKT from './FormUpdateNOAPKT';
import FormUpdateJenisLaporan from './FormUpdateJenisLaporan';
import {
 
  putByPath,
} from '@app/services/main.service';

interface IExportConfig {
  path?: string;
  onCloseModal?: any;
  
}

const tabOptions = [
  { label: 'Daftar  Monitoring APKT', value: '1', pathService: API_PATH().apkt.trans_jar, column: MONITORING_APKT_JQ(), primaryKey: 'id_apkt_trans_jar' },
]
const tabOptions2 = [
  { label: 'Daftar Kirim Gardu Padam ke APKT', value: '1', pathService: API_PATH().apkt.trans_jar_detail, column: MONITORING_APKT_DETAIL_PADAM_JQ(), primaryKey: 'id_apkt_trans_jar_det', filter: { status_data: 0 }, type: 'kirim-gardu-padam', path: "apkt.trans_jar_detail_padam" },
  { label: 'Daftar Kirim Gardu Nyala ke APKT', value: '2', pathService: API_PATH().apkt.trans_jar_detail, column: MONITORING_APKT_DETAIL_NYALA_JQ(), primaryKey: 'id_apkt_trans_jar_det', filter: { status_data: 1 }, type: 'kirim-gardu-nyala', path: "apkt.trans_jar_detail_nyala" },
  { label: 'Log Kirim ke APKT', value: '3', pathService: API_PATH().apkt.trans_log, column: PENGIRIMAN_STATUS_LOG_GARDU_JQ(), primaryKey: 'id_apkt_trans_log' },
]

export default function MonitoringApktPage({path,onCloseModal}:IExportConfig) {
  const [roleActions, setRoleActions] = useState<any>({});
  const [filterParams, setFilterParams] = useState({}); // Add this line
  const source = axios.CancelToken.source();
  const { closeModal } = useSelector((state: any) => state.ui);
  const [action, setAction] = useState<string>();
  // let [searchParams, setSearchParams] = useSearchParams();
  // const apktTransJar = searchParams.get("id_apkt_trans_jar")
  // const [roleActions, setRoleActions] = useState<any>({});
  const [tabActive, setTabActive] = useState<string>('1')
  // const [tabActiveConf] = useState<any>(tabOptions[0])
  const [tabActiveDetail, setTabActiveDetail] = useState<string>('1')
  const [tabActiveConfDetail, setTabActiveConfDetail] = useState<any>(tabOptions[0])

  const dispatch = useDispatch();
  /** DATA RESP */
  const [trigger, setTrigger] = useState<any>();
  // const [dataSelected, setDataSelected] = useState<any>();
  // const [loading, setLoading] = useState<boolean>();
  // const [dataRows, setDataRows] = useState<any>([]);
  // const [columns, setColumns] = useState<any>(MONITORING_APKT_JQ());
  // const [dataColumns] = useState<any>([]);
  const dataSelected = useRef<any>();
  const [details, setDetails] = useState<any>();
  // const source = axios.CancelToken.source();
  /** NOTIFICATION HANDLER */
  const dispatchNotification = (msg: string = '', type: string = '') => {
    const notification = notificationTemplate(msg, type);
    dispatch(addNotification({ ...notification, message: msg, type: type }));
  };
  /** ROW */
  const [rowSelected] = useState<any>();
  /** MODAL */
  const [modal, setModal] = useState<any>({
    approved: false,
    size: 'md',
    title: `Update No APKT`,
  });

   /** MODAL JENIS LAPORAN*/
   const [modalJenisLaporan, setModalJenisLaporan] = useState<any>({
    approved: false,
    size: 'md',
    title: `Update Jenis Laporan`,
  });

  const [modalConfirm] = useState<any>({
    icon: 'fa-regular fa-circle-question',
    description: `Apakah laporan akan di close ?`,
    subDescriotion: `Data tidak dapat dikembalikan`,
    textApproved: 'Ok',
    classApproved: 'primary',
    textDecline: 'Cancel',
    action: 'update-status-gardu',
    show: true,
  });

  

  const UpdateStatusGardu = async (current:any) => {

    let params: any = {
      id_user_update: current?.id_user,
     
      status_laporan: 'close',
    };
    try {
      await putByPath(
        `${path}`,
        params,
        dataSelected.current.id_apkt_trans_jar,
        source.token,
        
      );
      
      let message = '';
      dispatchNotification(`Sukses ${message ? message : ''}`, 'success');

    } catch (err: any) {
      let message = '';
     
      dispatchNotification(`Gagal  ${message ? message : ''}`, 'danger');
    }
  };

  const callbackModalConfirm = (approved = null) => {
    if (approved) {
      setAction(undefined); // solusinya nambahin ini

      switch (modalConfirm?.action) {
        case 'update-status-gardu':
        UpdateStatusGardu(dataSelected.current); // Pass the current parameter here
        break;
       
      }
    } else if (approved == false) {
      setAction(undefined); // solusinya nambahin ini
      // console.log('modalConfirm?.action', modalConfirm?.action);

     
    }

    if (onCloseModal) {
      onCloseModal(undefined);
    }
  };
  
  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
      dataTableValue.push({
        ...item,
        no_apkt: item?.no_apkt || item?.ref_apkt_trans_jar?.no_apkt,
        tgl_laporan: timeFormat(item?.tgl_laporan),
        tgl_padam: timeFormat(item?.tgl_padam),
        tgl_mulai_apkt_kirim_padam: timeFormat(item?.tgl_mulai_apkt_kirim_padam),
        tgl_apkt_kirim_padam: timeFormat(item?.tgl_apkt_kirim_padam),
        tgl_mulai: timeFormat(item?.tgl_mulai),
        tgl_selesai: timeFormat(item?.tgl_selesai),
        status_data: (<span className={`w-100 badge badge-${item?.jlh_gardu_padam === 0 ? 'success' : 'danger'}`}>{item?.jlh_gardu_padam === 0 ? 'Nyala' : 'Padam'}</span>),
      
      });
    });

    return dataTableValue;
  }

  
  // useEffect(() => {
  //   if (apktTransJar) {
  //     setRowSelected({ id: apktTransJar ? apktTransJar : '0' })
  //   }
  // }, [apktTransJar])

  /** HANDLE SELECTED ROWS */
  // const handleSelectedRows = (v: any) => {
  //   const selected = get(v, '0');
  //   // if (selected?.id) {
  //   //   searchParams.delete('id_apkt_trans_jar');
  //   //   searchParams.append('id_apkt_trans_jar', selected?.id);
  //   //   setSearchParams(searchParams);
  //   // }
  //   setRowSelected(() => {
  //     return { ...selected }
  //   });
  // };

  // const handleSelectedRowsDetail = (v: any) => {
  //   // console.log(v);
  //   v;
  // };

 

  /** GET DATA PAGINATION */

  // const getAllDataGarduInduk = async () => {
  //   await new Promise((resolve) => setTimeout(resolve, 300));

  //   try {
  //     const params = {
  //       page: '-1',
  //       limit: '-1',
  //       id_ref_jenis_lokasi: 4,
  //     };

  //     const req: any = await getAllByPath(pathLokasi, params, source.token);
  //     const { results } = req;

  //     let data: any = results.map((d: any) => {
  //       return { ...d, label: d.nama_lokasi, value: d.id_ref_lokasi };
  //     });

  //     setGarduInduk(data)
  //     setLoading(false);
  //   } catch (err: any) {
  //     setLoading(false);
  //   }
  // };

  /** COLUMN SHOW HIDE EVENT HANDLE */
  // useEffect(() => {
  //   let cols: any = columns?.filter(({ show }: any) => show === true);
  //   let roleAccess = ROLE_ACCESS("monitoring-apkt")
  //   const roleAct = {
  //     view: ROLE_ACTION(roleAccess, 'view'),
  //     update_apkt: ROLE_ACTION(roleAccess, 'update-apkt'),
  //     update_status: ROLE_ACTION(roleAccess, 'update-status'),
  //     update_kirim_padam: ROLE_ACTION(roleAccess, 'update-kirim-padam'),
  //     update_kirim_nyala: ROLE_ACTION(roleAccess, 'update-kirim-nyala'),
  //     update_tanggal_nyala: ROLE_ACTION(roleAccess, 'update-tanggal-nyala'),
  //   };
  //   setRoleActions(roleAct);
  //   if (!roleAct?.update_apkt && !roleAct?.update_status) {
  //     cols = cols?.filter((item: any) => {
  //       return item?.accessor != "action"
  //     })
  //   }
  //   setDataColumns(cols);
  // }, [columns]);

  
  useEffect(() => {
    const activeDetail: any = head(tabOptions2.filter((x: any) => x.value == tabActiveDetail))
    setTabActiveConfDetail(activeDetail)
  }, [tabActiveDetail])

  useEffect(() => {
    const activeDetail: any = head(tabOptions.filter((x: any) => x.value == tabActive))
    setTabActive(activeDetail)
  }, [tabActive])

  /** HANDLE CLOSE MODAL */
  useEffect(() => {
    if (closeModal && action) {
      setAction(undefined)
    }
  }, [closeModal])

  // useEffect(() => {
  //   console.log("apktTransJar", apktTransJar);

  //   if (apktTransJar) {
  //     console.log("setRowSelected");

  //     setRowSelected(() => {
  //       return { id: apktTransJar }
  //     })
  //   }

  // }, [apktTransJar])

  const handleRowSelected = (data: any) => {
    dataSelected.current = data.current;
    setDetails(dataSelected?.current?.id_apkt_trans_jar);
    setTrigger(dataSelected?.current?.id_apkt_trans_jar);
}

useEffect(() => {
  const tabs = document.getElementById('tabs');
  if (tabs) {
    (window as any).jqwidgets.createInstance(tabs, 'jqxTabs', { theme: "light", reorder: true });
  }

  const roleAccess = ROLE_ACCESS("monitoring-apkt");
  const roleAct = {
    view: ROLE_ACTION(roleAccess, 'view'),
    update: ROLE_ACTION(roleAccess, 'update'),
    update_apkt: ROLE_ACTION(roleAccess, 'update-apkt'),
    update_status: ROLE_ACTION(roleAccess, 'update-status'),
    update_kirim_padam: ROLE_ACTION(roleAccess, 'update-kirim-padam'),
    update_kirim_nyala: ROLE_ACTION(roleAccess, 'update-kirim-nyala'),
    update_tanggal_nyala: ROLE_ACTION(roleAccess, 'update-tanggal-nyala'),
  };
  setRoleActions(roleAct);

  

  // Your existing code...
}, []);

const handleUpdateStatus = (item: any) => {
  if (roleActions.update_status) {
  dataSelected.current = item;
  // setModalConfirm((prev: any) => {
  //   return { ...prev, show: true }
  // });

  setAction('update-status-gardu');
}
};


const handleUpdateNoApkt = (item: any) => {
    // Check if the user has access to the 'update_apkt' action
  if (roleActions.update_apkt) {
    // Show the modal for update apkt
    dataSelected.current = item;
    setAction('update-no_apkt');
  } else {
    // User does not have access to the 'update_apkt' action, show a message or perform some other action
    alert('You do not have permission to update apkt.');
  }
};

const handleUpdateJenisLaporan = (item: any) => {
 // Check if the user has access to the 'update' action for jenis laporan
 if (roleActions.update) {
  // Show the modal for jenis laporan
  dataSelected.current = item;
  setAction('update-jenis-laporan');
} else {
  // User does not have access to the 'update' action, show a message or perform some other action
  alert('You do not have permission to update jenis laporan.');
}
};

  // useEffect(() => {
  //   setTrigger(moment().valueOf())
  //   const timer = setInterval(() => {
  //     setTrigger(moment().valueOf())
  //   }, 120000);

  //   return () => {
  //     source.cancel()
  //     clearInterval(timer)
  //   }
  // }, [])

  // console.log("dataSelected", dataSelected);

  return (
    <>
      <Row className='mt-4'>
        <Col md={7} className='mb-4'>
          <Card className='card-widget'>
            <Card.Header className='text-uppercase'> MONITORING STATUS PROGRAM INTEGRASI SCADA-APKT</Card.Header>
            <Card.Body>
              <TableIntegrasiMon trigger={trigger} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={5} className='mb-4'>
          <Card className='card-widget'>
            <Card.Header className='text-uppercase'>REKAP LAPORAN</Card.Header>
            <Card.Body>
              <PengirimanGarduRekap trigger={trigger} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Tabs defaultActiveKey="1" activeKey={tabActive} onSelect={(k: any) => setTabActive(k)} className="mb-3 tab-sm">
        {
          tabOptions.map((tab: any) => (
            <Tab key={tab.value} eventKey={tab.value} title={tab.label} />
          ))
        }
      </Tabs>
      <div className='px-2 mt-2'>
      <Filter setFilterParams={setFilterParams} />
      </div>
      <TableDataJqxGridNew
                //AKSI 
                addbtn={roleActions.create}
                updatebtnJenisLap={roleActions.update}
                onClickUpdateJenisLap={handleUpdateJenisLaporan}

                updatebtnNoApkt={roleActions.update_apkt}
                onClickUpdateNoApkt={handleUpdateNoApkt}
              
                updatebtnStatus={roleActions.update_status}
                onClickUpdateStatus={handleUpdateStatus}
                
                //TABLE DATA
                path={API_PATH().apkt.trans_jar}
                filterParams={{filterParams}}
                dataFieldsColsConfig={MONITORING_APKT_JQ()}
                primaryKey={'id_apkt_trans_jar'}
                respDataApi={handleRespDataApi}
                // filterable={true}
             
                onRowSelected={handleRowSelected}
                exportbtn={true}
            />
            {/* <hr className='my-4' /> */}

            {/* <Row>
                <Col md={12} className='mb-4'>
                    <Card className='card-widget'>
                        <Card.Header > Detail Nama Token {dataSelected?.current?.nama}</Card.Header>
                        <RoleDetailPage filterParams={{ id_token: details ? details : null }} />
                    </Card>
                </Col>
            </Row> */}

      <hr className='my-4' />

      {trigger &&
        <>
          <Tabs defaultActiveKey="1" activeKey={tabActiveDetail} onSelect={(k: any) => setTabActiveDetail(k)} className="mt-6 mb-3 tab-sm">
            {
              tabOptions2.map((tab: any) => (
                <Tab key={tab.value} eventKey={tab.value} title={tab.label} />
              ))
            }
          </Tabs>
          {/* {
            tabActiveConfDetail?.value == '3' && (
              <TableApktJarDetail pathService={tabActiveConfDetail.pathService} columnsConfig={PENGIRIMAN_STATUS_LOG_GARDU()} primaryKey={tabActiveConf.primaryKey} type={tabActiveConfDetail?.type}
                // filterParams={{
                //   id_apkt_trans_jar: rowSelected?.id ? rowSelected?.id : null,
                //   ...tabActiveConfDetail?.filter
                // }}
                dataParent={rowSelected}
                parentTrigger={trigger}
              
              />
            )
          } */}

          {tabActiveConfDetail?.value == '1' &&
           <RoleDetailPagePadam filterParams={{ ref_apkt_trans_jar: details ? details : null }} />
          }
          {tabActiveConfDetail?.value == '2' &&
           <RoleDetailPageNyala filterParams={{ ref_apkt_trans_jar: details ? details : null }} />
          }
          {tabActiveConfDetail?.value == '3' &&
           <RoleDetailPageGardu filterParams={{ ref_apkt_trans_jar: details ? details : null }} />
          }
        </>

      }
      {action === 'update-no_apkt' && (
      <ModalData modalProps={modal}>
        <FormUpdateNOAPKT dataSelected={rowSelected} setModal={setModal} />
      </ModalData>
      )}
      {action === 'update-jenis-laporan' && (
      <ModalData modalProps={modalJenisLaporan}>
        <FormUpdateJenisLaporan dataSelected={rowSelected} setModal={setModalJenisLaporan} />
      </ModalData>
      )}
 {action === 'update-status-gardu' && (
<ModalConfirm
        modalConfirmProps={modalConfirm}
        callbackModalConfirm={callbackModalConfirm}
      />
 )}
    </>
  )
}

