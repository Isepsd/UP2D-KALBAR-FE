import React, { useState, useRef, useMemo, useEffect } from 'react';

/** CONFIG */
import { SCADATEL_MONITORING_WO_GRID } from "@app/configs/react-table/fasop/scadatel-column-drafting";

/** COMPONENTS */
import TableDataJqxGridNewArray from '@app/modules/Table/TableDataJqxGridNewArray';
import CardWidget from '@app/components/Card/CardWidget';
import { Card, Col, Row } from 'react-bootstrap';
import JqxTabs from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxtabs';
import StatisticKinerjaWO from '@app/modules/Dashboard/StatisticKinerjaWO';
import AproveSpvBidangDetailPageJQ from './MonitoringWODetailPageJQ';

/** SERVICE */
import { CONFIG_BOX_KOMULATIF } from '@app/configs/wo-drafting.config';
import { nanoid } from '@reduxjs/toolkit';
import { API_PATH } from '@app/services/_path.service';
import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';

export default function MonitoringWOPageJQ() {
  const dataSelected = useRef<any>();
  const [roleActions, setRoleActions] = useState<any>({});
  const [detailsModuleWO, setDetailsModuleWO] = useState<any>();
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
          bidang: item?.bidang,
          create: item?.create,
          release: item?.release,
          revisi: item?.revisi,
          closing: item?.closing,
          selesai: item?.selesai,
          jlhwo: item?.jlhwo
        });
      });
    } else {
      console.warn('Data format is not an array:', data);
    }
  
    console.log('Processed Data:', dataTableValue);
    return dataTableValue;
}

  
  const handleRowSelected = (data: any) => {
    dataSelected.current = data.current;
    setDetailsModuleWO(dataSelected?.current?.bidang);
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
      <CardWidget title='SCADATEL - Drafting - Monitoring WO'>
        <Row className='gx-1'>
          {renderBoxKomulatif}
        </Row>
      </CardWidget>

      {roleActions.view && (
        <div style={{ margin: '20px' }}>
          <JqxTabs theme={"light"}>
            <ul style={{ marginLeft: 10 }}>
              <li><i className="fa-solid fa-server"></i> Monitoring WO</li>
            </ul>
            <div>
              <TableDataJqxGridNewArray
                path={API_PATH().fasop.drafting.monitoring_wo}
                filterParams={{}}  // Filter untuk posting_wo 1, 3, dan 4
                dataFieldsColsConfig={SCADATEL_MONITORING_WO_GRID()}
                primaryKey={'id'}
                respDataApi={handleRespDataApi}
                filterable={true}
                onRowSelected={handleRowSelected}
                exportbtn={true}
              />
              <hr className='my-4' />
              <Row>
                <Col md={12} className='mb-4'>
                  <Card className='card-widget'>
                    <Card.Header> Dokumen Pekerjaan {detailsModuleWO}</Card.Header>
                    <AproveSpvBidangDetailPageJQ filterParams={{ id_modules: detailsModuleWO }} />
                  </Card>
                </Col>
              </Row>
            </div>
          </JqxTabs>
        </div>
      )}
    </>
  );
}
