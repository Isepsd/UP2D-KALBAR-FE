import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Dropdown } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';

import TableDataListAction from '@app/modules/Table/TableDataListAction';
import TableData from '@app/modules/Table/TableData';
import ModalConfirm from '@app/components/Modals/ModalConfirm';
import ModalData from '@app/components/Modals/ModalForm';
// import DurasiProsesModal from '@app/modules/opsisdis/JawdalPemeliharaan/DurasiProsesModal';
import CardFilter from '@app/components/Filter/CardFilter';
import Form from './Form';

import { API_PATH } from '@app/services/_path.service';
import { TASK_PELAKSANAAN_COLUMN } from '@app/configs/react-table/opsisdis/jadwal-pemeliharaan.column';
// import { timeFormat } from '@app/helper/time.helper';
import BadgeStatus from '@app/components/Status/BadgeStatus';
import { timeFormatAlt } from '@app/helper/time.helper';
import Filter from './Filter';
// import TableDaftarTugasPemeliharaan from '@app/modules/opsisdis/JawdalPemeliharaan/TableDaftarTugasPemeliharaan';

function PelaksanaanPekerjaan() {
  // const navigate = useNavigate()
  /** DATA RESP */
  const [dataRows, setDataRows] = useState<any>([]);
  const [action] = useState<string>();

  const [columns, setColumns] = useState<any>(TASK_PELAKSANAAN_COLUMN());
  const [dataColumns, setDataColumns] = useState<any>([]);
  const [dataSelected, setDataSelected] = useState<any>();
  const [
    modalConfirm,
    // setModalConfirm
  ] = useState<any>({
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
  const [modal, setModal] = useState<any>({
    show: false,
    approved: false,
    size: 'lg',
    title: `Edit Data`,
  });

  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
      dataTableValue.push({
        ...item,
        id: item?.id_trans_jadwal_har,
        nomor: item?.nomor,
        gardu: item?.gardu?.nama_lokasi,
        penyulang: item?.penyulang?.nama_lokasi,
        gardu_induk: item?.gardu_induk?.nama_lokasi,
        up3: item?.up3?.nama_lokasi,
        jenis_pelayanan: item?.jenis_pelayanan,
        status: item?.status_pekerjaan,
        wilayah_padam: item?.wilayah_padam,
        pelaksana: item?.pelaksana?.nama,
        jtm: item?.jtm,
        keterangan: item?.keterangan,
        jenis_pekerjaan: item?.ref_jenis_pekerjaan?.name,
        pengawas: item?.pengawas?.fullname,
        user_entri: item?.user_entri?.fullname,
        wilayah: item?.wilayah,
        jam_pekerjaan: item?.jam_pekerjaan,
        jenis_jadwal: item?.jenis_jadwal,
        tgl_create: item?.tgl_entri,
        tgl_period: `${timeFormatAlt(item?.tgl)}`,
        // butuh_padam: (<Form.Check disabled checked></Form.Check>),
        // butuh_padam: (<input type='checkbox'),
        butuh_padam: (<BadgeStatus status={item?.status} trueStatus="active" trueMsg='Padam' falseMsg='Tidak Padam'></BadgeStatus>),
        action: (
          <>
            <div className='d-flex px-2 align-items-center'>
              <Dropdown className='hide-toogle hide-focus'>
                <Dropdown.Toggle
                  className='bg-transparent border-0 no-outline py-0 text-body'
                  id={`dropdown-act-${item.id_pointtype}`}
                >
                  <i className='fa-solid fa-ellipsis font-weight-bold'></i>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => {
                      handleEdit(item);
                    }}
                  >
                    Edit
                  </Dropdown.Item>
                  {/* <Dropdown.Item
                    onClick={() => handleDelete(item)}
                    className='text-danger-hover'
                  >
                    Delete
                  </Dropdown.Item> */}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </>
        ),
      });
    });

    setDataRows(dataTableValue);
  };

  /** COLUMN SHOW HIDE EVENT HANDLE */
  useEffect(() => {
    const cols = columns?.filter(({ show }: any) => show === true);
    setDataColumns(cols);
  }, [columns]);

  // const onDetailProses = () => {
  //   setModal((prev: any) => ({...prev, show: true}))
  // }

  const deleteData = async () => {
    // console.log('hapus');
    // console.log(dataSelected);
  };

  // const handleDelete = (item: any) => {
  //   setDataSelected(item);
  //   setModalConfirm((prevState: any) => ({
  //     ...prevState,
  //     show: true,
  //   }));
  // };

  // const handleEdit = (item: any) => {
  //   navigate(`edit/${item?.id}`);
  // };

  const handleEdit = (item: any) => {
    setDataSelected(item)
    setModal((prev: any) => ({ ...prev, show: true }));
  };

  const callbackModalConfirm = (approved = false) => approved && deleteData();

  return (
    <>
      <Row>
        <Col md={12} className='mb-4 mt-4 position-static'>
          <CardFilter>
            <Filter isStatusPek={true} isButuhPadam={true} isWilayah={true} />
          </CardFilter>
          <Card className='card-widget position-static'>
            <Card.Header className='text-uppercase'>
              MCC - PEMELIHARAAN - PELAKSANAAN
            </Card.Header>
            <Card.Body>
              <TableDataListAction
                add={false}
                columns={columns}
                setColumns={setColumns}
                module='pelaksanaan-jadwal-pemeliharaan'
                spaceTop={0}
              />
              <div className='mb-4'>
                <TableData
                  columnsConfig={dataColumns}
                  respDataApi={handleRespDataApi}
                  rowData={dataRows}
                  path={API_PATH().opsisdis.jadwal_pemeliharaan.har}
                  primaryKey={'id_meter'}
                  action={action}
                  selected={dataSelected}
                  filterParams={{
                    sort_by: "+tgl_update",
                    status_pekerjaan: "Di setujui opsis,pelaksanaan,selesai pelaksaaan,selesai manuver"
                  }}
                />
              </div>
            </Card.Body>
            {/* <TableDaftarTugasPemeliharaan /> */}
          </Card>
        </Col>
      </Row>

      <ModalConfirm
        modalConfirmProps={modalConfirm}
        callbackModalConfirm={callbackModalConfirm}
      />

      <ModalData modalProps={modal}>
        <Form dataSelected={dataSelected} />
      </ModalData>
    </>
  );
}

export default PelaksanaanPekerjaan;
