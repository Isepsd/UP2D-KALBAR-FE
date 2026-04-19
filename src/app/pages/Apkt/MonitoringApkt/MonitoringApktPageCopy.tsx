import React, { useState, useEffect } from 'react'
import { Tabs, Tab, Row, Col, Card, Dropdown } from 'react-bootstrap'
import { get, head } from 'lodash'

/** COMPONENT */
import TableDataListAction from '@app/modules/Table/TableDataListAction';
import TableData from '@app/modules/Table/TableData';
import TableApktJarDetail from '@app/modules/APKT/TableApktJarDetail';
import PengirimanGarduRekap from '@app/modules/APKT/PengirimanGarduRekap';
import { Column } from "devextreme-react/data-grid";
import TablePengukuranBeban from "@app/modules/opsisdis/TablePengukuranBebansetting";
import DiffCeilDataGrid from "@app/modules/Table/DiffCeilDataGrid";

/** CONFIG */
import { MONITORING_APKT, MONITORING_APKT_DETAIL_PADAM, MONITORING_APKT_DETAIL_NYALA, PENGIRIMAN_STATUS_LOG_GARDU ,COL_SETTINGS} from '@app/configs/react-table/apkt.columns.config'

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
// import { useSearchParams } from 'react-router-dom';
import { timeFormat } from '@app/helper/time.helper';
import TableMonitoringTree from '@app/modules/APKT/TableMonitoringTree';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Filter from './Filter';
import TableIntegrasiMon from '@app/modules/APKT/TableIntegrasiMon';
import moment from 'moment';
import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';
import ModalData from '@app/components/Modals/ModalData';
import FormUpdateNOAPKT from './FormUpdateNOAPKT';
import { infoLabelsCustom } from "@app/configs/opsis-select.config";
import FormUpdateJenisLaporan from './FormUpdateJenisLaporan';


const tabOptions = [
  { label: 'Daftar  Monitoring APKT', value: '1', pathService: API_PATH().apkt.trans_jar, column: MONITORING_APKT(), primaryKey: 'id_apkt_trans_jar' },
  { label: 'Settings', value: '2', pathService: API_PATH().appsettings, column: COL_SETTINGS(), primaryKey: 'id_apkt_trans_jar' },
]
const tabOptions2 = [
  { label: 'Daftar Kirim Gardu Padam ke APKT', value: '1', pathService: API_PATH().apkt.trans_jar_detail, column: MONITORING_APKT_DETAIL_PADAM(), primaryKey: 'id_apkt_trans_jar_det', filter: { status_data: 0 }, type: 'kirim-gardu-padam', path: "apkt.trans_jar_detail_padam" },
  { label: 'Daftar Kirim Gardu Nyala ke APKT', value: '2', pathService: API_PATH().apkt.trans_jar_detail, column: MONITORING_APKT_DETAIL_NYALA(), primaryKey: 'id_apkt_trans_jar_det', filter: { status_data: 1 }, type: 'kirim-gardu-nyala', path: "apkt.trans_jar_detail_nyala" },
  { label: 'Log Kirim ke APKT', value: '3', pathService: API_PATH().apkt.trans_log, column: PENGIRIMAN_STATUS_LOG_GARDU(), primaryKey: 'id_apkt_trans_log' },
]

export default function MonitoringApktPage() {
  const { closeModal } = useSelector((state: any) => state.ui);

  // let [searchParams, setSearchParams] = useSearchParams();
  // const apktTransJar = searchParams.get("id_apkt_trans_jar")
  const [roleActions, setRoleActions] = useState<any>({});
  const [tabActive, setTabActive] = useState<string>('1')
  const [tabActiveConf,setTabActiveConf] = useState<any>(tabOptions[0])
  const [tabActiveDetail, setTabActiveDetail] = useState<string>('1')
  const [tabActiveConfDetail, setTabActiveConfDetail] = useState<any>(tabOptions[0])
  const columns_settings: any = COL_SETTINGS();
  /** DATA RESP */
  const [trigger, setTrigger] = useState<any>();
  // const [dataSelected, setDataSelected] = useState<any>();
  const [action, setAction] = useState<string>();
  const [dataRows, setDataRows] = useState<any>([]);
  const [columns, setColumns] = useState<any>(MONITORING_APKT());
  const [dataColumns, setDataColumns] = useState<any>([]);
 
  const source = axios.CancelToken.source();
  /** ROW */
  const [rowSelected, setRowSelected] = useState<any>();
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
  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any, index: number) => {
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
        action: (
          <Dropdown className='hide-toogle hide-focus'>
            <Dropdown.Toggle className='bg-transparent border-0 no-outline py-0 text-body' id={`gardu-status-act-${index}`}>
              <i className='fa-solid fa-ellipsis font-weight-bold'></i>
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => handleUpdateJenisLaporan(item)}>
                  Update Jenis Laporan
                </Dropdown.Item>
              {roleActions?.update_apkt &&
                <Dropdown.Item
                  onClick={() => handleUpdateNoApkt(item)}>
                  Update No APKT
                </Dropdown.Item>
              }
              {roleActions?.update_status &&
                <Dropdown.Item onClick={() => handleUpdateStatus(item)}>
                  Update Status
                </Dropdown.Item>

              }

            </Dropdown.Menu>
          </Dropdown>
        ),
      });
    });

    setDataRows(dataTableValue)
  }

  const handleUpdateStatus = (item: any) => {
    setRowSelected(item);
    setAction('update-status-gardu');
  };

  const handleUpdateNoApkt = (item: any) => {
    setRowSelected(() => {
      return { ...item }
    });
    setModal((prev: any) => {
      return { ...prev, show: true }
    });
    // setAction('update-no_apkt');
  };

  const handleUpdateJenisLaporan = (item: any) => {
    setRowSelected(() => {
      return { ...item }
    });
    setModalJenisLaporan((prev: any) => {
      return { ...prev, show: true }
    });
    // setAction('update-no_apkt');
  };

  // useEffect(() => {
  //   if (apktTransJar) {
  //     setRowSelected({ id: apktTransJar ? apktTransJar : '0' })
  //   }
  // }, [apktTransJar])

  /** HANDLE SELECTED ROWS */
  const handleSelectedRows = (v: any) => {
    const selected = get(v, '0');
    // if (selected?.id) {
    //   searchParams.delete('id_apkt_trans_jar');
    //   searchParams.append('id_apkt_trans_jar', selected?.id);
    //   setSearchParams(searchParams);
    // }
    setRowSelected(() => {
      return { ...selected }
    });
  };

  const handleSelectedRowsDetail = (v: any) => {
    // console.log(v);
    v;
  };

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
  useEffect(() => {
    let cols: any = columns?.filter(({ show }: any) => show === true);
    let roleAccess = ROLE_ACCESS("monitoring-apkt")
    const roleAct = {
      view: ROLE_ACTION(roleAccess, 'view'),
      update_apkt: ROLE_ACTION(roleAccess, 'update-apkt'),
      update_status: ROLE_ACTION(roleAccess, 'update-status'),
      update_kirim_padam: ROLE_ACTION(roleAccess, 'update-kirim-padam'),
      update_kirim_nyala: ROLE_ACTION(roleAccess, 'update-kirim-nyala'),
      update_tanggal_nyala: ROLE_ACTION(roleAccess, 'update-tanggal-nyala'),
    };
    setRoleActions(roleAct);
    if (!roleAct?.update_apkt && !roleAct?.update_status) {
      cols = cols?.filter((item: any) => {
        return item?.accessor != "action"
      })
    }
    setDataColumns(cols);
  }, [columns]);

  useEffect(() => {
    const active: any = head(tabOptions.filter((x: any) => x.value == tabActive))
    setTabActiveConf(active)
  }, [tabActive])

  useEffect(() => {
    const activeDetail: any = head(tabOptions2.filter((x: any) => x.value == tabActiveDetail))
    setTabActiveConfDetail(activeDetail)
  }, [tabActiveDetail])


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


  useEffect(() => {
    setTrigger(moment().valueOf())
    const timer = setInterval(() => {
      setTrigger(moment().valueOf())
    }, 120000);

    return () => {
      source.cancel()
      clearInterval(timer)
    }
  }, [])

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
      {
        tabActiveConf?.value == '1' && (
      <div className='px-2 mt-2'>
        <Filter />
      <TableDataListAction
        add={false}
        filter={false}
        columns={columns}
        setColumns={setColumns}
        spaceTop={0}
      // filterLayout='card'
      >
        {/* <Filter /> */}
      </TableDataListAction>

      <TableData
        columnsConfig={dataColumns}
        respDataApi={handleRespDataApi}
        rowData={dataRows}
        path={API_PATH().apkt.trans_jar}
        primaryKey={'id_apkt_trans_jar'}
        selected={rowSelected}
        action={action}
        rowSelect={true}
        rowSelectType={'radio'}
        onCheckedRows={handleSelectedRows}
        onCloseModal={setAction}
        filterParams={{
          sort_by: "b1,b2"
        }}
        trigger={trigger}
      />
       </div>
        )
      }
 {
        tabActiveConf?.value == '2' && (
          <div className='px-2 mt-5'>
            <TableDataListAction
              add={false}
              filter={false}
              columns={columns_settings}
              // setColumns={setColumns}
              exporting={false}
              spaceTop={0}
              infoLabels={infoLabelsCustom()}
            >
            </TableDataListAction>

            <TablePengukuranBeban
              pathService={API_PATH().appsettings}
              primaryKey="id"
              label="Telemetring No Trafo"
              module="Telemetring No Trafo"
              customParams={{ group_name: "APKT" }}
              ChangeColorRow={true}
            >
              {columns_settings.map((item: any, index: number) => (
                <Column
                  dataField={item?.accessor}
                  dataType={item?.type || ""}
                  allowEditing={item?.allowEditing}
                  allowUpdating={item?.allowUpdating}
                  caption={item?.Header}
                  key={index}
                  minWidth={item?.minWidth}
                  enabled={item?.enabled}
                  cellRender={DiffCeilDataGrid}
                  fixed={item?.fixed ? item?.fixed : false}
                />

              ))}
            </TablePengukuranBeban>
          </div>
        )
      }
      <hr className='my-4' />

      {rowSelected && Object.keys(rowSelected).length > 0 &&
        <>
          <Tabs defaultActiveKey="1" activeKey={tabActiveDetail} onSelect={(k: any) => setTabActiveDetail(k)} className="mt-6 mb-3 tab-sm">
            {
              tabOptions2.map((tab: any) => (
                <Tab key={tab.value} eventKey={tab.value} title={tab.label} />
              ))
            }
          </Tabs>
          {
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
          }

          {tabActiveConfDetail?.value == '1' &&
            <TableMonitoringTree
              roleActions={roleActions}
              rowSelect
              dataSelected={rowSelected} onCheckedRows={handleSelectedRowsDetail}
              filterParams={{ status: 1 }}
              path={tabActiveConfDetail?.path}
              event="padam"
              configColumns={MONITORING_APKT_DETAIL_PADAM()}
              trigger={trigger}
            />
          }
          {tabActiveConfDetail?.value == '2' &&
            <TableMonitoringTree rowSelect
              roleActions={roleActions}
              dataSelected={rowSelected}
              filterParams={{ status: 0 }}
              isUpdateNyala={false}
              onCheckedRows={handleSelectedRowsDetail}
              path={tabActiveConfDetail?.path}
              event="nyala"
              configColumns={MONITORING_APKT_DETAIL_NYALA()}
              trigger={trigger}
            />
          }
        </>

      }
      <ModalData modalProps={modal}>
        <FormUpdateNOAPKT dataSelected={rowSelected} setModal={setModal} />
      </ModalData>
      <ModalData modalProps={modalJenisLaporan}>
        <FormUpdateJenisLaporan dataSelected={rowSelected} setModal={setModalJenisLaporan} />
      </ModalData>
    </>
  )
}

