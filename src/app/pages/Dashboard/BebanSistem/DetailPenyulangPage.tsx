import React, { useState, useEffect } from 'react';

/** CONFIG */
import { DETAIL_PENYULANG_COLUMN } from '@app/configs/react-table/dashboard/dashboard-grafik-subsistem.column';

/** COMPONENTS */
import TableData from '@app/modules/Table/TableData';

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import { Card, Col, Row } from 'react-bootstrap';

type Props = {
  type: string;
  title: string
}

export default function DetailPenyulangPage({ type, title }: Props) {
  // console.log(type);
  type;
  
  /** DATA RESP */
  const [dataRows, setDataRows] = useState<any>([]);
  const [columns] = useState<any>(DETAIL_PENYULANG_COLUMN());
  const [dataColumns, setDataColumns] = useState<any>([]);

  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data:any)=>{
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
      dataTableValue.push({...item});
    });

    setDataRows(dataTableValue)
  }

  /** COLUMN SHOW HIDE EVENT HANDLE */
  useEffect(() => {
    const cols = columns?.filter(({ show }: any) => show === true);
    setDataColumns(cols);
  }, [columns]);

  return (
    <>
      <Row>
        <Col md={12} className='mb-4'>
          <Card className='card-widget'>
            <Card.Header className='text-uppercase'>{title}</Card.Header>
            <Card.Body>
              <TableData columnsConfig={dataColumns} respDataApi={handleRespDataApi} rowData={dataRows} path={API_PATH().master.jaringan.ref_lokasi} primaryKey={'id_ref_lokasi'} deleteConfirmation />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}
