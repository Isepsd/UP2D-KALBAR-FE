import React, { useState, useEffect } from 'react';
import { Button, Dropdown } from 'react-bootstrap';
import moment from 'moment';
moment.locale('id')

/** COMPONENTS */
import TableData from '@app/modules/Table/TableData';
import TableDataListAction from '@app/modules/Table/TableDataListAction';
import ModalConfirm from '@app/components/Modals/ModalConfirm';

/** CONFIGS */
import { INPUT_JADWAL_COLUMN } from '@app/configs/react-table/opsisdis/jadwal-pemeliharaan.column'

// import { timeFormat } from '@app/helper/time.helper';

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import Filter from '@app/modules/opsisdis/JawdalPemeliharaan/Filter';
import ModalData from '@app/components/Modals/ModalForm';
import InputJadwalForm from './InputJadwalForm';
import BadgeStatus from '@app/components/Status/BadgeStatus';

function TableJadwalPemeliharaan({
  handleSelectedRows,
  type = "DRAFT",
  sendTo = "Bagian",
  add = false
}: any) {

  /** DATA RESP */
  const [action, setAction] = useState<any>('create.modal');
  const [dataRows, setDataRows] = useState<any>([]);
  const [columns, setColumns] = useState<any>(INPUT_JADWAL_COLUMN());
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

  /** MODAL */
  const [modal, setModal] = useState<any>({
    approved: false,
    size: 'lg',
    title: `Tambah`,
  });

  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
      dataTableValue.push({
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
        wilayah: item?.wilayah,
        jam_pekerjaan: item?.jam_pekerjaan,
        tgl_create: item?.tgl_entri,
        // butuh_padam: (<Form.Check disabled checked></Form.Check>),
        // butuh_padam: (<input type='checkbox'),
        butuh_padam: (<BadgeStatus status={item?.status} trueStatus="active" trueMsg='Padam' falseMsg='Tidak Padam'></BadgeStatus>),
        action: (
          <>
            <div className="d-flex px-2 align-items-center">
              <Button size='sm' className='me-2' onClick={() => handleSendBagian(item)}><i className="fa-regular fa-paper-plane"></i> Kirim Ke {sendTo}</Button>
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
    dataSelected;
  };

  const handleDelete = (item: any) => {
    setDataSelected(item);
    setModalConfirm((prevState: any) => ({
      ...prevState,
      show: true,
    }));
  };

  const handleEdit = (item: any) => {
    setDataSelected(item)
    setAction("edit.modal")
  };
  const handleSendBagian = (item: any) => {
    setDataSelected(item)
    // console.log("item");

    setAction("sendBagian-jadwal-pemeliharaan")
  };

  const handleAdd = () => {
    setAction("create.modal")
    setDataSelected(undefined);
    setModal((prevState: any) => ({
      ...prevState,
      show: true,
    }));
  };

  // console.log("add", add);



  const callbackModalConfirm = (approved = false) => approved && deleteData();

  return (
    <>
      <TableDataListAction onClickAdd={handleAdd} add={add} columns={columns} setColumns={setColumns} spaceTop={0}>
        <Filter />
      </TableDataListAction>

      <TableData
        columnsConfig={dataColumns} respDataApi={handleRespDataApi}
        rowData={dataRows}
        path={API_PATH().opsisdis.jadwal_pemeliharaan.har} primaryKey={'id'}
        filterParams={{
          datum_1_after: moment().subtract(1, 'day').format('YYYY-MM-DD HH:mm'), datum_1_before: moment().format('YYYY-MM-DD HH:mm'),
          status_pekerjaan: type
        }}
        selected={dataSelected}
        rowSelect={true}
        rowSelectType={'radio'}
        onCheckedRows={handleSelectedRows}

        deleteConfirmation action={action} />

      <ModalConfirm modalConfirmProps={modalConfirm} callbackModalConfirm={callbackModalConfirm} />

      <ModalData modalProps={modal}>
        <InputJadwalForm />
      </ModalData>
    </>
  );
}

export default TableJadwalPemeliharaan