import React, { useState, useEffect } from 'react';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import moment from 'moment';
moment.locale('id')

/** COMPONENTS */
import TableData from '@app/modules/Table/TableData';

/** CONFIGS */
import { INPUT_JADWAL_DAFTAR_ASET_COLUMN } from '@app/configs/react-table/opsisdis/jadwal-pemeliharaan.column'

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';

function TableInputJadwalDaftarAset() {
  /** DATA RESP */
  const [dataRows, setDataRows] = useState<any>([]);
  const [columns] = useState<any>(INPUT_JADWAL_DAFTAR_ASET_COLUMN());
  const [dataColumns, setDataColumns] = useState<any>([]);
  const [
    // dataSelected, 
    setDataSelected] = useState<any>();

  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
      dataTableValue.push({
        nomor: '2414',
        nama: 'RLY',
        seri: '39663108',
        kategori: 'RELAY',
        action: (
          <>
            <div className="d-flex px-2 align-items-center">
              <Button variant='danger' onClick={() => handleDelete(item)} size='sm' className='me-2'><i className="fa-regular fa-trash-cant"></i> Hapus</Button>
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

  const handleDelete = (item: any) => {
    setDataSelected(item);
  };

  // console.log("dataSelected", dataSelected);

  return (
    <>
      <Row>
        <Col md={7}>
          <InputGroup className="mb-3">
            <Form.Control placeholder="Pencarian Aset" aria-describedby="basic-addon2" />
            <InputGroup.Text className='bg-primary' id="basic-addon2"><i className="fa-solid fa-magnifying-glass"></i></InputGroup.Text>
          </InputGroup>
        </Col>
      </Row>
      <TableData columnsConfig={dataColumns} respDataApi={handleRespDataApi} rowData={dataRows} path={API_PATH().master.fasop.point_type} primaryKey={'id'} filterParams={{ datum_1_after: moment().subtract(1, 'day').format('YYYY-MM-DD HH:mm'), datum_1_before: moment().format('YYYY-MM-DD HH:mm') }} deleteConfirmation />
    </>
  )
}

export default TableInputJadwalDaftarAset