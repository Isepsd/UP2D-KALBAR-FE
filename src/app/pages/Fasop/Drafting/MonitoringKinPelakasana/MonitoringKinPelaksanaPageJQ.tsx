import React, { useState, useRef, useMemo, useEffect } from 'react';

/** CONFIG */
import { SCADATEL_MONITORING_WO_PELAKSANA_GRID } from "@app/configs/react-table/fasop/scadatel-column-drafting";
import moment from 'moment';
/** COMPONENTS */
import TableDataJqxGridNewArray from '@app/modules/Table/TableDataJqxGridNewArray';
import CardWidget from '@app/components/Card/CardWidget';
import {  Col, Row } from 'react-bootstrap';
import JqxTabs from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxtabs';
import StatisticKinerjaWO from '@app/modules/Dashboard/StatisticKinerjaWO';
// import AproveSpvBidangDetailPageJQ from './MonitoringKinPelaksanaDetailPageJQ';
import Filter from './Filter'
/** SERVICE */
import { CONFIG_BOX_KOMULATIF } from '@app/configs/wo-drafting.config';
import { nanoid } from '@reduxjs/toolkit';
import { API_PATH } from '@app/services/_path.service';
import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';

export default function MonitoringWOPageJQ() {
  const dataSelected = useRef<any>();
  const [roleActions, setRoleActions] = useState<any>({});
  // const [detailsModuleWO, setDetailsModuleWO] = useState<any>();
  const [boxKomulatif] = useState<any>(CONFIG_BOX_KOMULATIF);

  const renderBoxKomulatif = useMemo(() => {
    return boxKomulatif?.map((item: any) => (
      <Col md={3} key={nanoid()} className='mb-2'>
        <StatisticKinerjaWO
          key={nanoid()}
          variant={item?.variant}
          path={item?.path}
          suffix={item?.suffix}
          label={item?.label}
          fieldName={item?.fieldName}
        />
      </Col>
    ));
  }, [boxKomulatif]);

  const handleRespDataApi = (data: any) => {
    console.log('Received Data:', data);

    let dataTableValue: any = [];
  
    // Pastikan data adalah array dan proses setiap item
    if (Array.isArray(data)) {
      data.forEach((item: any) => {
        dataTableValue.push({
          number: item?.number, // Menambahkan nomor urut
          pelaksana:item?.pelaksana,
          tgl01:item?.tgl01,
          tgl02:item?.tgl02,
          tgl03:item?.tgl03,
          tgl04:item?.tgl04,
          tgl05:item?.tgl05,
          tgl06:item?.tgl06,
          tgl07:item?.tgl07,
          tgl08:item?.tgl08,
          tgl09:item?.tgl09,
          tgl10:item?.tgl10,
          tgl11:item?.tgl11,
          tgl12:item?.tgl12,
          tgl13:item?.tgl13,
          tgl14:item?.tgl14,
          tgl15:item?.tgl15,
          tgl16:item?.tgl16,
          tgl17:item?.tgl17,
          tgl18:item?.tgl18,
          tgl19:item?.tgl19,
          tgl20:item?.tgl20,
          tgl21:item?.tgl21,
          tgl22:item?.tgl22,
          tgl23:item?.tgl23,
          tgl24:item?.tgl24,
          tgl25:item?.tgl25,
          tgl26:item?.tgl26,
          tgl27:item?.tgl27,
          tgl28:item?.tgl28,
          tgl29:item?.tgl29,
          tgl30:item?.tgl30,
          tgl31:item?.tgl31,
          jlhwo:item?.jlhwo,
        });
      });
    } else {
      console.warn('Data format is not an array:', data);
    }
  
    console.log('Processed Data:', dataTableValue);
    return dataTableValue;
}

const [filterValues, setFilterValues] = useState<any>({
  thn_bln: moment().format("YYYY-MM") ,

  
});

const handleFilterChange = (newFilterValues: any) => {
  setFilterValues(newFilterValues);
};
  const handleRowSelected = (data: any) => {
    dataSelected.current = data.current;
    // setDetailsModuleWO(dataSelected?.current?.bidang);
  };

  useEffect(() => {
    const roleAccess = ROLE_ACCESS("approve-spv-scadatel");
    const roleAct = {
      view: ROLE_ACTION(roleAccess, 'view'),
      approve: ROLE_ACTION(roleAccess, 'approve'),
      posting: ROLE_ACTION(roleAccess, 'posting'),
      create: ROLE_ACTION(roleAccess, 'create'),
      update: ROLE_ACTION(roleAccess, 'update'),
      delete: ROLE_ACTION(roleAccess, 'delete'),
    };
    setRoleActions(roleAct);
    console.log('Role Actions:', roleAct);
  }, []);

  return (
    <>
      <CardWidget title='SCADATEL - Drafting - Kinerja Scada Pelaksana'>
        <Row className='gx-1'>
          {renderBoxKomulatif}
        </Row>
      </CardWidget>
      <br className='my-4' />
      <CardWidget title='FILTER'>
      <Filter onFilterChange={handleFilterChange} />
      </CardWidget>
      {roleActions.view && (
        <div style={{ margin: '20px' }}>
          <JqxTabs theme={"light"}>
            <ul style={{ marginLeft: 10 }}>
              <li><i className="fa-solid fa-server"></i> Kinerja Scada Pelaksana</li>
            </ul>
            <div>
              <TableDataJqxGridNewArray
                path={API_PATH().fasop.drafting.monitoring_wo_pelaksana}
                filterParams={{...filterValues}}  // Filter untuk posting_wo 1, 3, dan 4
                dataFieldsColsConfig={SCADATEL_MONITORING_WO_PELAKSANA_GRID()}
                primaryKey={'id'}
                respDataApi={handleRespDataApi}
                filterable={true}
                onRowSelected={handleRowSelected}
                exportbtn={true}
              />
              <hr className='my-4' />
              {/* <Row>
                <Col md={12} className='mb-4'>
                  <Card className='card-widget'>
                    <Card.Header> Dokumen Pekerjaan {detailsModuleWO}</Card.Header>
                    <AproveSpvBidangDetailPageJQ filterParams={{ id_modules: detailsModuleWO }} />
                  </Card>
                </Col>
              </Row> */}
            </div>
          </JqxTabs>
        </div>
      )}
    </>
  );
}
