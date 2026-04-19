import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';

/** COMPONENTS */
import TableData from '@app/modules/Table/TableData';

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import { WP_DASHBOARD_PEKERJAAN_COLUMNS } from '@app/configs/react-table/working-permit.columns.config';
import moment from 'moment';

export default function TablePekerjaan() {
  return (
    <>
      <Row>
        <Col md={6} className="mb-3">
          <Card className='card-widget'>
            <Card.Header className='text-uppercase'>
              DAFTAR KERJAAN HARIAN
            </Card.Header>
            <Card.Body>
              <TablePekerjaanHarian></TablePekerjaanHarian>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} className="mb-3">
          <Card className='card-widget'>
            <Card.Header className='text-uppercase'>
              DAFTAR KERJAAN 1 MINGGU
            </Card.Header>
            <Card.Body>
              <TablePekerjaanMingguan></TablePekerjaanMingguan>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={6} className="mb-3">
          <Card className='card-widget'>
            <Card.Header className='text-uppercase'>
              DAFTAR KERJAAN 1 BULAN
            </Card.Header>
            <Card.Body>
              <TablePekerjaanBulanan></TablePekerjaanBulanan>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} className="mb-3">
          <Card className='card-widget'>
            <Card.Header className='text-uppercase'>
              LIST WORKING PERMIT
            </Card.Header>
            <Card.Body>
              <TablePekerjaanListWp></TablePekerjaanListWp>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}

const TablePekerjaanHarian = () => {
  /** DATA RESP */
  const [dataRows, setDataRows] = useState<any>([]);
  const [columns] = useState<any>(WP_DASHBOARD_PEKERJAAN_COLUMNS());
  const [dataColumns, setDataColumns] = useState<any>([]);

  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
      dataTableValue.push({
        ...item,
        bagian: item?.bagian?.name,
        pengawas: item?.pengawas?.fullname,
      });
    });

    setDataRows(dataTableValue);
  };

  /** COLUMN SHOW HIDE EVENT HANDLE */
  useEffect(() => {
    const cols = columns?.filter(({ show }: any) => show === true);
    setDataColumns(cols);
  }, [columns]);

  return (
    <TableData
      columnsConfig={dataColumns}
      respDataApi={handleRespDataApi}
      rowData={dataRows}
      path={API_PATH().working_permit.online}
      primaryKey={'id_wp_online'}
      module='Daftar Pekerjaan Hari Ini'
      paging={{ show: true }}
      containerClass='my-1 table table-responsive'
      pagingPresistance={false}
      filterParams={{
        tgl_pekerjaan_after: moment().format('YYYY-MM-DD [23:59]'),
        tgl_pekerjaan_before: moment().format('YYYY-MM-DD [00:00]'),
      }}
    />
  );
};

const TablePekerjaanMingguan = () => {
  /** DATA RESP */
  const [dataRows, setDataRows] = useState<any>([]);
  const [columns] = useState<any>(WP_DASHBOARD_PEKERJAAN_COLUMNS());
  const [dataColumns, setDataColumns] = useState<any>([]);

  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
      dataTableValue.push({
        ...item,
        bagian: item?.bagian?.name,
        pengawas: item?.pengawas?.fullname,
      });
    });

    setDataRows(dataTableValue);
  };

  /** COLUMN SHOW HIDE EVENT HANDLE */
  useEffect(() => {
    const cols = columns?.filter(({ show }: any) => show === true);
    setDataColumns(cols);
  }, [columns]);

  return (
    <TableData
      columnsConfig={dataColumns}
      respDataApi={handleRespDataApi}
      rowData={dataRows}
      path={API_PATH().working_permit.online}
      primaryKey={'id_wp_online'}
      module='Daftar Pekerjaan 1 Minggu'
      paging={{ show: true }}
      containerClass='my-1 table table-responsive'
      pagingPresistance={false}
      filterParams={{
        tgl_pekerjaan_after: moment().subtract(6, 'days').format('YYYY-MM-DD [23:59]'),
        tgl_pekerjaan_before: moment().format('YYYY-MM-DD [00:00]'),
      }}
    />
  );
};

const TablePekerjaanBulanan = () => {
  /** DATA RESP */
  const [dataRows, setDataRows] = useState<any>([]);
  const [columns] = useState<any>(WP_DASHBOARD_PEKERJAAN_COLUMNS());
  const [dataColumns, setDataColumns] = useState<any>([]);

  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
      dataTableValue.push({
        ...item,
        bagian: item?.bagian?.name,
        pengawas: item?.pengawas?.fullname,
      });
    });

    setDataRows(dataTableValue);
  };

  /** COLUMN SHOW HIDE EVENT HANDLE */
  useEffect(() => {
    const cols = columns?.filter(({ show }: any) => show === true);
    setDataColumns(cols);
  }, [columns]);

  return (
    <TableData
      columnsConfig={dataColumns}
      respDataApi={handleRespDataApi}
      rowData={dataRows}
      path={API_PATH().working_permit.online}
      primaryKey={'id_wp_online'}
      module='Daftar Pekerjaan 1 Bulan'
      paging={{ show: true }}
      containerClass='my-1 table table-responsive'
      pagingPresistance={false}
      filterParams={{
        tgl_pekerjaan_after: moment().format('YYYY-MM-DD [23:59]'),
        tgl_pekerjaan_before: moment().subtract(30, 'days').format('YYYY-MM-DD [00:00]'),
      }}
    />
  );
};

const TablePekerjaanListWp = () => {
  /** DATA RESP */
  const [dataRows, setDataRows] = useState<any>([]);
  const [columns] = useState<any>(WP_DASHBOARD_PEKERJAAN_COLUMNS());
  const [dataColumns, setDataColumns] = useState<any>([]);

  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
      dataTableValue.push({
        ...item,
        bagian: item?.bagian?.name,
        pengawas: item?.pengawas?.fullname,
      });
    });

    setDataRows(dataTableValue);
  };

  /** COLUMN SHOW HIDE EVENT HANDLE */
  useEffect(() => {
    const cols = columns?.filter(({ show }: any) => show === true);
    setDataColumns(cols);
  }, [columns]);

  return (
    <TableData
      columnsConfig={dataColumns}
      respDataApi={handleRespDataApi}
      rowData={dataRows}
      path={API_PATH().working_permit.online}
      primaryKey={'id_wp_online'}
      module='List Working Permit'
      paging={{ show: true }}
      containerClass='my-1 table table-responsive'
      pagingPresistance={false}
    />
  );
};
