import React, { useEffect, useState } from 'react'
import { Card, Col, Row, Dropdown } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

import TableDataListAction from '@app/modules/Table/TableDataListAction';
import TableData from '@app/modules/Table/TableData';
import ModalConfirm from '@app/components/Modals/ModalConfirm';

import { API_PATH } from '@app/services/_path.service';

import { DAFTAR_TUGAS_PELAKSANAAN_COLUMN } from '@app/configs/react-table/opsisdis/jadwal-pemeliharaan.column';

import { timeFormat } from '@app/helper/time.helper';

function TableDaftarTugasPemeliharaan() {
  const navigate = useNavigate()
  /** DATA RESP */
  const [dataRows, setDataRows] = useState<any>([]);
  const [action] = useState<string>();

  const [columns, setColumns] = useState<any>(DAFTAR_TUGAS_PELAKSANAAN_COLUMN());
  const [dataColumns, setDataColumns] = useState<any>([]);
  const [dataSelected, setDataSelected] = useState<any>();
  const [modalConfirm, setModalConfirm] = useState<any>({
    show: false,
    approved: false,
    size: 'sm',
    icon: 'fa-regular fa-trash-can',
    description: `Delete this data`,
    subDescriotion: `Data tidak dapat dikembalikan`,
    textApproved: 'Delete',
    classApproved: 'danger',
    textDecline: 'Cancel',
  });

  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
      dataTableValue.push({
        tgl_mulai: timeFormat(new Date()),
        tgl_selesai: timeFormat(new Date()),
        durasi_pekerjaan: '2.15 jam',
        titik_manuver: 'Titik Manuver Jaringan',
        gi_gh_pk: 'GI CEMPAKA',
        titik_pemeliharaan: 'CPK02',
        status: <div className='badge badge-primary'>DRAFT</div>,
        durasi_proses: '1769 jam. 8 menit.',
        prioritas: <span className='text-success'>NORMAL</span>,
        pembuat: 'Yogha',
        unit_pembangkit: 'UIW Bidang Niaga & PP',
        action: (
          <>
            <div className="d-flex px-2 align-items-center">
              <Dropdown className='hide-toogle hide-focus'>
                <Dropdown.Toggle className='bg-transparent border-0 no-outline py-0 text-body' id={`dropdown-act-${item.id_pointtype}`}>
                  <i className='fa-solid fa-ellipsis font-weight-bold'></i>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleEdit(item)}>Edit</Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => handleDelete(item)}
                    className='text-danger-hover'
                  >
                    Delete
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
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

  const deleteData = async () => {
    // console.log('hapus')
    // console.log(dataSelected);
  };

  const handleDelete = (item: any) => {
    setDataSelected(item);
    setModalConfirm((prevState: any) => ({
      ...prevState,
      show: true,
    }));
  };

  const handleEdit = (item: any) => {
    navigate(`edit/${item?.id}`);
  };

  const callbackModalConfirm = (approved = false) => approved && deleteData();

  return (
    <>
      <Row>
        <Col md={12} className='mb-4 mt-4 position-static'>
          <Card className='card-widget position-static'>
            <Card.Header className='text-uppercase'>DAFTAR TUGAS</Card.Header>
            <Card.Body>
              <TableDataListAction
                add={false}
                columns={columns}
                setColumns={setColumns}
                module="Approve ren"
                spaceTop={0}
              />
              <div className='mb-4'>
                <TableData
                  columnsConfig={dataColumns}
                  respDataApi={handleRespDataApi}
                  rowData={dataRows}
                  path={API_PATH().master.opsisdis.frequensi}
                  primaryKey={'id_meter'}
                  action={action}
                  selected={dataSelected}
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <ModalConfirm modalConfirmProps={modalConfirm} callbackModalConfirm={callbackModalConfirm} />
    </>
  )
}

export default TableDaftarTugasPemeliharaan