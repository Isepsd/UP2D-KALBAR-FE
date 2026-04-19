import React, { useState, useEffect } from 'react';

/** CONFIG */

/** COMPONENTS */
import TableData from '@app/modules/Table/TableData';
import TableDataListAction from '@app/modules/Table/TableDataListAction';

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import { WP_APPROVAL_COLUMNS } from '@app/configs/react-table/working-permit.columns.config';
import { Button, Card, Col, Row } from 'react-bootstrap';
import WpStatistic from '@app/modules/WorkingManagement/WpStatistic';
import BadgeStatus from '@app/components/Status/BadgeStatus';
import { useNavigate } from 'react-router-dom';

export default function WmApprovalK3LPage(){
  const navigate = useNavigate()
  /** DATA RESP */
  const [dataRows, setDataRows] = useState<any>([]);
  const [columns, setColumns] = useState<any>(WP_APPROVAL_COLUMNS());
  const [dataColumns, setDataColumns] = useState<any>([]);

  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
      dataTableValue.push({
        ...item,
        approve: <Button variant='primary' size='sm' onClick={()=>handleDetailClick(item)}>Approve</Button>,
        reject: <Button variant='outline-danger' size='sm' onClick={()=>handleDetailClick(item)}>Reject</Button>,
        bagian: item?.bagian?.name,
        pengawas: item?.pengawas?.fullname,
        pengawask3: item?.pengawask3?.fullname,
        manuver: (
          <BadgeStatus
            status={item?.manuver}
            trueMsg='Ya'
            falseMsg='Tidak'
          ></BadgeStatus>
        ),
        status: (
          <BadgeStatus
            status={item?.status_persetujuan}
            trueMsg='Disetujui'
            falseMsg='Belum Disetujui'
          ></BadgeStatus>
        ),
        grounding: (
          <BadgeStatus
            status={item?.grounding}
            trueMsg='Ya'
            falseMsg='Tidak'
          ></BadgeStatus>
        ),
        detail: <Button variant='' size='sm' onClick={()=>handleDetailClick(item)}>Detail</Button>,
      });
    });

    setDataRows(dataTableValue);
  };

  const handleDetailClick = (item:any)=>{
    navigate(`/wm/approval-spv/detail/${item?.id_wp_online}`)
  }

  /** COLUMN SHOW HIDE EVENT HANDLE */
  useEffect(() => {
    const cols = columns?.filter(({ show }: any) => show === true);
    setDataColumns(cols);
  }, [columns]);

  return (
    <>
      {/* STATISTIC  */}
      <Row className='mt-4'>
        <Col md={12} className='mb-4'>
          <Card className='card-widget'>
            <Card.Header className='text-uppercase'>STATISTIK</Card.Header>
            <Card.Body>
              <WpStatistic />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* !!END STATISTIC  */}

      <TableDataListAction
        add={false}
        columns={columns}
        setColumns={setColumns}
        spaceTop={1}
      ></TableDataListAction>

      <TableData
        columnsConfig={dataColumns}
        respDataApi={handleRespDataApi}
        rowData={dataRows}
        path={API_PATH().working_permit.online}
        primaryKey={'id_wp_online'}
        deleteConfirmation
      />
    </>
  );
}
