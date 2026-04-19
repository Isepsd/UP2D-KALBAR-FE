import React, { useState, useEffect } from 'react'
import { Row, Col, Card } from 'react-bootstrap'
import { get } from 'lodash'

/** COMPONENT */
import TableDataListAction from '@app/modules/Table/TableDataListAction';
import TableData from '@app/modules/Table/TableData';
import TableApktJarDetail from '@app/modules/APKT/TableApktJarDetail';

/** CONFIG */
import { PENGIRIMAN_HAR, PENGIRIMAN_HAR_DETAIL } from '@app/configs/react-table/apkt.columns.config';

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import { timeFormat } from '@app/helper/time.helper';
import ModalData from '@app/components/Modals/ModalForm';
import PengirimanRencanaHARForm from '@app/modules/APKT/PengirimanRencanaHARForm';
import AppButton from '@app/components/Button/Button';


export default function PengirimanRencanaHARPage() {

  /** DATA RESP */
  const [dataRows, setDataRows] = useState<any>([]);
  const [columns, setColumns] = useState<any>(PENGIRIMAN_HAR());
  const [dataColumns, setDataColumns] = useState<any>([]);
  const [action, setAction] = useState<string>();
  /** ROW */
  const [rowSelected, setRowSelected] = useState<any>();
  const [dataSelected, setDataSelected] = useState<any>();

  /** MODAL */
  const [modal, setModal] = useState<any>({
    approved: false,
    size: 'md',
    title: `Tambah`,
  });

  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
      let status_apkt = "Belum Kirim"
      let color = "secondary"
      switch (item?.status_apkt_kirim) {
        case 1:
          status_apkt = "Sedang Kirim"
          color = "success"
          break;
        case 2:
          status_apkt = "Gagal Kirim"
          color = "danger"
          break;
      }
      dataTableValue.push({
        ...item,
        no_apkt: item?.no_apkt || item?.ref_apkt_trans_jar?.no_apkt,
        tgl_laporan: timeFormat(item?.tgl_laporan),
        tgl_padam: timeFormat(item?.tgl_padam),
        tgl_mulai_apkt_kirim_padam: timeFormat(item?.tgl_mulai_apkt_kirim_padam),
        tgl_apkt_kirim_padam: timeFormat(item?.tgl_apkt_kirim_padam),
        tgl_mulai: timeFormat(item?.tgl_mulai_pelaksanaan),
        tgl_selesai: timeFormat(item?.tgl_selesai_pelaksanaan),
        tgl_apkt_kirim: timeFormat(item?.tgl_apkt_kirim),
        status_data: (<span className={`w-100 badge badge-${color}`}>{item?.status_data ? 'Nyala' : 'Padam'}</span>),
        status_apkt_kirim: (<span className={`w-100 badge badge-${color}`}>{status_apkt}</span>),
        penyulang: get(item, 'jadwal_har.penyulang.nama_penyulang'),
        gardu_induk: get(item, 'jadwal_har.gardu_induk.nama_gardu_induk'),
        gardu: get(item, 'jadwal_har.gardu.nama_gardu'),
        action: (
          <AppButton onClick={() => handleKirimAPKT(item)}>Kirim APKT</AppButton>
        ),
      });
    });

    setDataRows(dataTableValue)
  }

  const handleKirimAPKT = (item: any) => {
    setDataSelected(item);
    setAction('kirim-apkt');
  }


  /** HANDLE SELECTED ROWS */
  const handleSelectedRows = (v: any) => {
    const selected = get(v, '0');
    // if (selected?.id) {
    //   searchParams.delete('id_apkt_trans_jar');
    //   searchParams.append('id_apkt_trans_jar', selected?.id);
    //   setSearchParams(searchParams);
    // }
    setRowSelected(selected);
  };

  /** ADD HANDLING */
  const handleAddClick = () => {
    setDataSelected(undefined);
    setModal((prevState: any) => ({
      ...prevState,
      show: true,
    }));
  };

  /** COLUMN SHOW HIDE EVENT HANDLE */
  useEffect(() => {
    const cols = columns?.filter(({ show }: any) => show === true);
    setDataColumns(cols);
  }, [columns]);


  return (
    <>
      <Row className='mt-4'>
        <Col md={12} className='mb-4 position-static'>
          <Card className='card-widget position-static'>
            <Card.Header className='text-uppercase'>Pengiriman Rencana HAR</Card.Header>
            <Card.Body>
              <TableDataListAction
                add={true}
                columns={columns}
                setColumns={setColumns}
                onClickAdd={handleAddClick}
                spaceTop={0}
              >
              </TableDataListAction>

              <TableData
                columnsConfig={dataColumns}
                respDataApi={handleRespDataApi}
                rowData={dataRows}
                path={API_PATH().apkt.trans_jar_har}
                primaryKey={'id_apkt_trans_jar'}
                selected={dataSelected}
                action={action}
                rowSelect={true}
                rowSelectType={'radio'}
                onCheckedRows={handleSelectedRows}
              />
            </Card.Body>
            <hr />
            {rowSelected &&
              <Card.Body>
                <TableApktJarDetail pathService={API_PATH().apkt.trans_jar_det_har}
                  columnsConfig={PENGIRIMAN_HAR_DETAIL()} primaryKey={'id_trans_jadwal_har_det'}
                  type="pengiriman-rencana-har"
                  filterParams={{
                    id_trans_jadwal_har: rowSelected?.id_trans_jadwal_har ? rowSelected?.id_trans_jadwal_har : null,
                  }} />
              </Card.Body>
            }
          </Card>
        </Col>
      </Row>

      <ModalData modalProps={modal}>
        <PengirimanRencanaHARForm />
      </ModalData>
    </>
  )
}
