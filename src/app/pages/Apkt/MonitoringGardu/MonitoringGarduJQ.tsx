import React, { useState, useRef,useEffect } from 'react';
// import { get } from 'lodash'

/** CONFIG */
import { MONITORING_GARDU_JQX, MONITORING_GARDU_DETAIL_PAGE_JQX, MONITORING_GARDU_HISTORI_DETAIL_JQX } from '@app/configs/react-table/apkt.columns.config';
import {  head } from 'lodash'
/** COMPONENTS */
import TableDataJqxGridNew from '@app/modules/Table/TableDataJqxGridNew';
import MonitoringGarduDetailPage from './MonitoringGarduDetailPage';
import MonitoringGarduHistoriDetail from './MonitoringGarduHistoriDetail';
import { Card, Col, Row,Tabs,Tab } from 'react-bootstrap';

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';
import moment from 'moment';

const tabOptions = [
    { label: 'Histori Status Padam/Nyala Gardu', value: '1', pathService: API_PATH().apkt.monitoring_gardu_status_detail, column: MONITORING_GARDU_DETAIL_PAGE_JQX(), primaryKey: 'id_scd_statusgardu' },
    { label: 'Histori Log SCADA', value: '2', pathService: API_PATH().apkt.his_11_digitalt, column: MONITORING_GARDU_HISTORI_DETAIL_JQX(), primaryKey: 'point_number' },
  ]

export default function MonitoringGarduJQ() {
    let roleAccess = ROLE_ACCESS("monitoring-gardu");
    const roleActions = {
        view: ROLE_ACTION(roleAccess, 'view'),
        create: ROLE_ACTION(roleAccess, 'create'),
        update: ROLE_ACTION(roleAccess, 'update'),
        delete: ROLE_ACTION(roleAccess, 'delete'),
    };
    const dataSelected = useRef<any>();
    // const [trigger, setTrigger] = useState<any>(null);
    const [details, setDetails] = useState<any>();
    const [trigger, setTrigger] = useState<any>(null);
    const [tabActiveDetail, setTabActiveDetail] = useState<string>('1')
  const [tabActiveConfDetail, setTabActiveConfDetail] = useState<any>(tabOptions[0])
    /** MAP DATA FROM API RESPONSE */
    const handleRespDataApi = (data: any) => {
        let dataTableValue: any = [];
        data?.forEach((item: any) => {
            dataTableValue.push({
                id_scd_statusgardu: item?.id_scd_statusgardu,
                number: item?.number,
                // status_gardu: item?.status_2 == "up" ? 1 : 0,
                // no_apkt: item?.no_apkt || item?.ref_apkt_trans_jar?.no_apkt,
                // tgl_laporan: item?.tgl_laporan,
                // tgl_padam: item?.tgl_padam,
                // tgl_mulai_apkt_kirim_padam: item?.tgl_mulai_apkt_kirim_padam,
                // tgl_apkt_kirim_padam: item?.tgl_apkt_kirim_padam,
                // tgl_mulai: item?.tgl_mulai,
                // tgl_selesai: item?.tgl_selesai,
                point_number: item?.point_number,
                feeder: item?.feeder,
                alamat: item?.alamat,
                path1: item?.path1,
                path2: item?.path2,
                tgl_status: item?.datetime_status_2 ? moment(item.datetime_status_2).format("DD-MM-YYYY HH:mm:ss") : '-',
                status_data: (<span className={`w-100 badge badge-${item?.status_2 == "up" ? 'success' : 'danger'}`}>{item?.status_2 == "up" ? 'Nyala' : 'Padam'}</span>),
                
            });
        });
        return dataTableValue;
    }
    // const handleSelectedRows = (v: any) => {
    //     const selected = get(v, '0');
        
    //   };
    const handleRowSelected = (data: any) => {
        dataSelected.current = data.current;
        setDetails(dataSelected?.current?.point_number);
        setTrigger(dataSelected?.current?.point_number)
    }

    useEffect(() => {
        const activeDetail: any = head(tabOptions.filter((x: any) => x.value == tabActiveDetail))
        setTabActiveConfDetail(activeDetail)
      }, [tabActiveDetail])
    

    return (
        <>
            <TableDataJqxGridNew
                //AKSI 
                // addbtn={roleActions.create}
                updatebtn={roleActions.update}
                // deletebtn={roleActions.delete}

                //TABLE DATA
                path={API_PATH().apkt.monitoring_gardu_status}
                dataFieldsColsConfig={MONITORING_GARDU_JQX()}
                primaryKey={'id_scd_statusgardu'}
                respDataApi={handleRespDataApi}
                filterable={true}
                filterParams={{}}
                onRowSelected={handleRowSelected}
                exportbtn={true}
            />
            <hr className='my-4' />

            <Row>
            {trigger &&
            <>

            {/* <DetailMonitoringGardu pointName={rowSelected?.point_number} /> */}
            <Col md={12} className='mb-4 position-static'>
              <Card className='card-widget position-static'>
              <Tabs defaultActiveKey="1" activeKey={tabActiveDetail} onSelect={(k: any) => setTabActiveDetail(k)} className="mt-6 mb-3 tab-sm">
            {
              tabOptions.map((tab: any) => (
                <Tab key={tab.value} eventKey={tab.value} title={tab.label} />
              ))
            }
          </Tabs>
                {/* <Card.Header className='text-uppercase'>HISTORI STATUS PADAM/NYALA GARDU</Card.Header> */}
               
                {tabActiveConfDetail?.value == '1' &&
                <MonitoringGarduDetailPage filterParams={{ point_number: details ? details : null }} />
                }
                
              
               
                {tabActiveConfDetail?.value == '2' &&
           <MonitoringGarduHistoriDetail filterParams={{ point_number: details ? details : null }} />
             }
                
              </Card>
            </Col>
          </>
}
                {/* <Col md={12} className='mb-4'>
                    <Card className='card-widget'>
                        <MonitoringGarduDetailPage filterParams={{ point_number: details ? details : null }} />
                    </Card>
                </Col> */}

                
            </Row>

        </>
    );
}
