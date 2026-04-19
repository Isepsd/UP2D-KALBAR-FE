import React, { useState, useEffect } from 'react'
import { Tabs, Tab, Row, Col, Card, Dropdown } from 'react-bootstrap'
import { get, head } from 'lodash'

/** COMPONENT */
import TableDataListAction from '@app/modules/Table/TableDataListAction';
import TableData from '@app/modules/Table/TableData';
import TableApktJarDetail from '@app/modules/APKT/TableApktJarDetail';
import PengirimanGarduRekap from '@app/modules/APKT/PengirimanGarduRekap';

/** CONFIG */
import { PENGIRIMAN_STATUS_GARDU, PENGIRIMAN_STATUS_LIST_GARDU, PENGIRIMAN_STATUS_LOG_GARDU } from '@app/configs/react-table/apkt.columns.config'

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import { useSearchParams } from 'react-router-dom';
import { timeFormat } from '@app/helper/time.helper';
import { useSelector } from 'react-redux';


const tabOptions = [
  { label: 'Daftar Laporan dan Gangguan', value: '1', pathService: API_PATH().apkt.trans_jar, column: PENGIRIMAN_STATUS_GARDU(), primaryKey: 'id_apkt_trans_jar' },
]
const tabOptions2 = [
  { label: 'Daftar Kirim Gardu Padam ke APKT', value: '1', pathService: API_PATH().apkt.trans_jar_detail, column: PENGIRIMAN_STATUS_LIST_GARDU(), primaryKey: 'id_apkt_trans_jar_det', filter: {status_data: 0}, type: 'kirim-gardu-padam' },
  { label: 'Daftar Kirim Gardu Padam ke APKT', value: '2', pathService: API_PATH().apkt.trans_jar_detail, column: PENGIRIMAN_STATUS_LIST_GARDU(), primaryKey: 'id_apkt_trans_jar_det', filter: {status_data: 1}, type: 'kirim-gardu-nyala' },
  { label: 'Log ke APKT', value: '3', pathService: API_PATH().apkt.trans_log, column: PENGIRIMAN_STATUS_LOG_GARDU(), primaryKey: 'id_apkt_trans_log' },
]

export default function PengirimanGarduPage() {
  const { closeModal } = useSelector( (state: any) => state.ui );

  let [searchParams, setSearchParams] = useSearchParams();
  const apktTransJar = searchParams.get("id_apkt_trans_jar")
  
  const [tabActive, setTabActive] = useState<string>('1')
  const [tabActiveConf] = useState<any>(tabOptions[0])
  const [tabActiveDetail, setTabActiveDetail] = useState<string>('1')
  const [tabActiveConfDetail, setTabActiveConfDetail] = useState<any>(tabOptions[0])

  /** DATA RESP */
  const [dataSelected, setDataSelected] = useState<any>();
  const [action, setAction] = useState<string>();
  const [dataRows, setDataRows] = useState<any>([]);
  const [columns, setColumns] = useState<any>(PENGIRIMAN_STATUS_GARDU());
  const [dataColumns, setDataColumns] = useState<any>([]);

  /** ROW */
  const [rowSelected, setRowSelected] = useState<any>({id:apktTransJar});

  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: any, index: number) => {
      dataTableValue.push({
        ...item,
        no_apkt: item?.no_apkt || item?.ref_apkt_trans_jar?.no_apkt,
        tgl_laporan: timeFormat(item?.tgl_laporan),
        tgl_padam: timeFormat(item?.tgl_padam),
        tgl_mulai_apkt_kirim_padam: timeFormat(item?.tgl_mulai_apkt_kirim_padam),
        tgl_apkt_kirim_padam: timeFormat(item?.tgl_apkt_kirim_padam),
        tgl_mulai: timeFormat(item?.tgl_mulai),
        tgl_selesai: timeFormat(item?.tgl_selesai),
        status_data: (<span className={`w-100 badge badge-${item?.status_data ? 'success' : 'danger'}`}>{item?.status_data ? 'Nyala' : 'Padam'}</span>),
        action: (
          <Dropdown className='hide-toogle hide-focus'>
            <Dropdown.Toggle className='bg-transparent border-0 no-outline py-0 text-body' id={`gardu-status-act-${index}`}>
              <i className='fa-solid fa-ellipsis font-weight-bold'></i>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleUpdateStatus(item)}>
                Update Status
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => handleUpdateNoApkt(item)}>
                Update No APKT
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ),
      });
    });

    setDataRows(dataTableValue)
  }

  useEffect(() => {
    if(apktTransJar){
      setRowSelected({id:apktTransJar ? apktTransJar : '0'})
    }
  }, [apktTransJar])

  /** HANDLE SELECTED ROWS */
  const handleSelectedRows = (v: any) => {
    const selected = get(v, '0');
    if (selected?.id) {
      searchParams.delete('id_apkt_trans_jar');
      searchParams.append('id_apkt_trans_jar', selected?.id);
      setSearchParams(searchParams);
    }
    setRowSelected(selected);
  };

  const handleUpdateStatus = (item: any) => {
    setDataSelected(item);
    setAction('update-status-gardu');
  };

  const handleUpdateNoApkt = (item: any) => {
    setDataSelected(item);
    setAction('update-no_apkt');
  };

  /** COLUMN SHOW HIDE EVENT HANDLE */
  useEffect(() => {
    const cols = columns?.filter(({ show }: any) => show === true);
    setDataColumns(cols);
  }, [columns]);

  useEffect(() => {
    const activeDetail: any = head(tabOptions2.filter((x: any) => x.value == tabActiveDetail))
    setTabActiveConfDetail(activeDetail)
  }, [tabActiveDetail])

  /** HANDLE CLOSE MODAL */
  useEffect(() => {
    if(closeModal && action){
        setAction(undefined)
    }
  }, [closeModal])


  return (
    <>
      <Row className='mt-4'>
        <Col md={12} className='mb-4'>
          <Card className='card-widget'>
            <Card.Header className='text-uppercase'>REKAP</Card.Header>
            <Card.Body>
              <PengirimanGarduRekap />
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
      
      <TableDataListAction
        add={false}
        columns={columns}
        setColumns={setColumns}
        spaceTop={0}
      >
        {/* <ApktFilter />  */}
      </TableDataListAction>

      <TableData
        columnsConfig={dataColumns}
        respDataApi={handleRespDataApi}
        rowData={dataRows}
        path={API_PATH().apkt.trans_jar}
        primaryKey={'id_apkt_trans_jar'}
        selected={dataSelected}
        action={action}
        rowSelect={true}
        rowSelectType={'radio'}
        onCheckedRows={handleSelectedRows}
        onCloseModal={setAction}
      />

      <hr className='my-4'/>

      <Tabs defaultActiveKey="1" activeKey={tabActiveDetail} onSelect={(k: any) => setTabActiveDetail(k)} className="mt-6 mb-3 tab-sm">
        {
          tabOptions2.map((tab: any) => (
            <Tab key={tab.value} eventKey={tab.value} title={tab.label} />
          ))
        }
      </Tabs>
      <TableApktJarDetail pathService={tabActiveConfDetail.pathService} columnsConfig={tabActiveConfDetail.column} primaryKey={tabActiveConf.primaryKey} type={tabActiveConfDetail?.type} filterParams={{
          id_apkt_trans_jar: rowSelected?.id ? rowSelected?.id : null,
          ...tabActiveConfDetail?.filter
        }} />
    </>
  )
}
