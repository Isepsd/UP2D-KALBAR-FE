import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import moment from 'moment';
moment.locale('id')

/** COMPONENTS */
import TableData from '@app/modules/Table/TableData';

/** CONFIGS */
import { TASK_PEMELIHARAAN_COLUMN } from '@app/configs/react-table/opsisdis/jadwal-pemeliharaan.column'

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import TableDaftarTugasItemTask from './TableDaftarTugasItemTask';

function TableDaftarTugasTask() {
  /** DATA RESP */
  const [dataRows, setDataRows] = useState<any>([]);
  const [columns] = useState<any>(TASK_PEMELIHARAAN_COLUMN());
  const [dataColumns, setDataColumns] = useState<any>([]);
  const [dataSelected, setDataSelected] = useState<any>();

  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data:any)=>{
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
      dataTableValue.push({
        tugas: 'PREVENTIF KUBIKEL',
        kategori: '	KUBIKEL',
        action: (
          <>
            <div className="d-flex px-2 align-items-center">
              <Button onClick={() => handleView(item)} size='sm' className='me-2'><i className="fa-regular fa-eye"></i> Lihat</Button>
            </div>
          </>
        )
      });
    });

    setDataRows(dataTableValue)
  }

  /** COLUMN SHOW HIDE EVENT HANDLE */
  useEffect(() => {
    const cols = columns?.filter(({ show }: any) => show === true);
    setDataColumns(cols);
  }, [columns]);

  const handleView = (item: any) => {
    setDataSelected(item);
  };

  return (
    <>
      <Row>
        <Col md={6}>
          <Card>
            <Card.Header className='font-weight-light font-sise-large'>Task Pemeliharaan Level 1</Card.Header>
            <Card.Body>
              <TableData columnsConfig={dataColumns} respDataApi={handleRespDataApi} rowData={dataRows} path={API_PATH().master.fasop.point_type} primaryKey={'id'} filterParams={{ datum_1_after: moment().subtract(1, 'day').format('YYYY-MM-DD HH:mm'), datum_1_before: moment().format('YYYY-MM-DD HH:mm') }}  deleteConfirmation />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Header className='font-weight-light font-sise-large'>Item Task PREVENTIF RELAY</Card.Header>
            <Card.Body>
              <TableDaftarTugasItemTask dataSelected={dataSelected} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default TableDaftarTugasTask