import React, { useEffect, useState } from 'react'
import { Card, Col, Form, Row } from 'react-bootstrap'

import TableData from '@app/modules/Table/TableData';

import { API_PATH } from '@app/services/_path.service';

import { RIWAYAT_PROGRES_COLUMN } from '@app/configs/react-table/opsisdis/jadwal-pemeliharaan.column';

import { timeFormat } from '@app/helper/time.helper';

function DurasiProsesModal() {
  /** DATA RESP */
  const [dataRows, setDataRows] = useState<any>([]);
  const [action] = useState<string>();

  const [columns] = useState<any>(RIWAYAT_PROGRES_COLUMN());
  const [dataColumns, setDataColumns] = useState<any>([]);

  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach(() => {
      dataTableValue.push({
        number: 1,
        tgl_awal: timeFormat(new Date()),
        tgl_akhir: timeFormat(new Date()),
        status_awal: 'PROSES KIRIM KE HAR',
        status_akhir: 'PELAKSANAAN OLEH HAR',
        user: 'Yogha',
        durasi: '2.15 jam'
      });
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
      <Card>
        <Card.Body className="p-4">
          <Form className='mb-4'>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column md="4">Pelapor</Form.Label>
              <Col sm="8">
                <Form.Control readOnly defaultValue="Yogha" />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column md="4">Unit</Form.Label>
              <Col sm="8">
                <Form.Control readOnly defaultValue={`UIW Bidang Niaga & PP`} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column md="4">Total Durasi</Form.Label>
              <Col sm="8">
                <Form.Control readOnly defaultValue="17 hari. 408 jam. 33 menit." />
              </Col>
            </Form.Group>
          </Form>
          <div className='mt-2'>
            <TableData
              columnsConfig={dataColumns}
              respDataApi={handleRespDataApi}
              rowData={dataRows}
              path={API_PATH().master.opsisdis.frequensi}
              primaryKey={'id_meter'}
              action={action}
            />
          </div>
        </Card.Body>
      </Card>
    </>
  )
}

export default DurasiProsesModal