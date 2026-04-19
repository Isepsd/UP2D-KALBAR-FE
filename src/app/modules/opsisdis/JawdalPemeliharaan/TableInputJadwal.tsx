import React, { useState, useEffect } from 'react';
import { Button, Dropdown } from 'react-bootstrap';
import moment from 'moment';
moment.locale('id')

/** COMPONENTS */
import TableData from '@app/modules/Table/TableData';
import TableDataListAction from '@app/modules/Table/TableDataListAction';
// import ModalConfirm from '@app/components/Modals/ModalConfirm';

/** CONFIGS */
import { INPUT_JADWAL_COLUMN } from '@app/configs/react-table/opsisdis/jadwal-pemeliharaan.column'


/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import Filter from '@app/modules/opsisdis/JawdalPemeliharaan/Filter';
import ModalData from '@app/components/Modals/ModalForm';
import InputJadwalForm from './InputJadwalForm';
import BadgeStatus from '@app/components/Status/BadgeStatus';
import { timeFormatAlt } from '@app/helper/time.helper';
// import ApporveOpsis from './ApporveOpsis';

function TableInputJadwal({
  roleActions,
  onCheckedRows,
  page = "DRAFT",
  sendTo = "",
  rowSelect = false,
  approve = true,
  filterParams
}: ITableInputJadwal) {

  /** DATA RESP */
  const [action, setAction] = useState<any>(null);
  const [dataRows, setDataRows] = useState<any>([]);
  const [columns, setColumns] = useState<any>(INPUT_JADWAL_COLUMN());
  const [dataColumns, setDataColumns] = useState<any>([]);
  const [dataSelected, setDataSelected] = useState<any>();

  // const [modalConfirm, setModalConfirm] = useState<any>({
  //   show: false,
  //   approved: false,
  //   size: 'sm',
  //   icon: 'fa-regular fa-trash-can',
  //   description: `Delete this data`,
  //   subDescriotion: `Data tidak dapat dikembalikan`,
  //   textApproved: 'Delete',
  //   classApproved: 'danger',
  //   textDecline: 'Cancel',
  // });

  /** MODAL */
  const [modal, setModal] = useState<any>({
    approved: false,
    size: 'lg',
    title: `Tambah`,
  });
  // const [modalOpsis, setModalOpsis] = useState<any>({
  //   approved: false,
  //   size: 'lg',
  //   title: `Approve`,
  // });

  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
      dataTableValue.push({
        ...item,
        key: item?.key,
        id: item?.id_trans_jadwal_har,
        number: item?.number,
        lbs_manual: item?.lbs_manual,
        id_og:item?.og?.nama_lokasi,
        // sumber: item?.gardu_induk?.nama_lokasi,
        up3: item?.up3?.nama_lokasi,
        jenis_pelayanan: item?.jenis_pelayanan,
        status: item?.status_pekerjaan,
        wilayah_padam: item?.wilayah_padam,
        pelaksana: item?.pelaksana?.nama,
        pengawas: item?.pengawas?.fullname,
        jtm: item?.jtm,
        keterangan: item?.keterangan,
        jenis_pekerjaan: item?.ref_jenis_pekerjaan?.name,
        user_entri: item?.user_entri?.fullname,
        wilayah: item?.wilayah,
        jam_pekerjaan: item?.jam_pekerjaan,
        jenis_jadwal: item?.jenis_jadwal,
        tgl_create: item?.tgl_entri,
        respon_apd: item?.respon_apd ? item?.respon_apd : '-',
        tgl_period: `${timeFormatAlt(item?.tgl)}`,
        butuh_padam: (<BadgeStatus status={item?.butuh_padam} trueStatus={0} trueMsg='Tidak Butuh' falseMsg='Butuh'></BadgeStatus>),
        action: (
          <>
            <div className="d-flex px-2 align-items-center">
              {page == "opsis" && roleActions?.approve &&
                <Button size='sm' variant='success' className='me-2' onClick={() => handleApprove(item)}>
                  <i className="fa-solid fa-check"></i> Setujui
                </Button>
              }

              {sendTo !== "" && roleActions?.approve &&
                <>
                  <Button size='sm' className='me-2' onClick={() => handleApprove(item)}><i className="fa-regular fa-paper-plane"></i> Kirim Ke {sendTo}</Button>
                </>
              }

              {page === "input-jadwal-pemeliharaan" &&
                <>
                  <Dropdown className='hide-toogle hide-focus'>
                    <Dropdown.Toggle className='bg-transparent border-0 no-outline py-0 text-body' id={`dropdown-act-${item.id_pointtype}`}>
                      <i className='fa-solid fa-ellipsis font-weight-bold'></i>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      {roleActions?.update &&
                        <Dropdown.Item onClick={() => handleEdit(item)}>Edit</Dropdown.Item>
                      }
                      {roleActions?.delete &&
                        <Dropdown.Item
                          onClick={() => handleDelete(item)}
                          className='text-danger-hover'
                        >
                          Delete
                        </Dropdown.Item>
                      }

                    </Dropdown.Menu>
                  </Dropdown>
                </>
              }

            </div>
          </>
        )
      });
    });
    setDataRows(dataTableValue)
  }

  /** COLUMN SHOW HIDE EVENT HANDLE */
  useEffect(() => {
    let cols: any = columns?.filter(({ show }: any) => show === true);
    if (!roleActions?.delete && !roleActions?.update && !roleActions?.approve) {
      cols = cols?.filter((item: any) => {
        return item?.accessor != "action"
      })
    }
    setDataColumns(cols);
  }, [columns, roleActions]);

  // const deleteData = async () => {
  //   console.log(dataSelected);
  // };

  const handleDelete = (item: any) => {
    setDataSelected(item);
    setAction("delete")
    // setModalConfirm((prevState: any) => ({
    //   ...prevState,
    //   show: true,
    // }));
  };

  const handleEdit = (item: any) => {
    setDataSelected(item)
    setModal((prevState: any) => ({
      ...prevState,
      show: true,
    }));
  };

  const handleApprove = (item: any) => {
    setDataSelected(item)
    // console.log("page handleApprove", page);
    // console.log("page item", item);

    switch (page) {
      case "input-jadwal-pemeliharaan":
        setAction("input-jadwal-pemeliharaan")
        break;
      case "bagian":
        setAction("bagian-jadwal-pemeliharaan")
        break;
      case "ren":
        setAction("ren-jadwal-pemeliharaan")
        break;
      case "opsis":
        setAction("opsis-jadwal-pemeliharaan")
        break;
      default:
        break;
    }
  };

  const handleAdd = () => {
    // setAction("create.modal")
    setDataSelected(undefined);
    setModal((prevState: any) => ({
      ...prevState,
      show: true,
    }));
  };
  // const handleApproveOpsis = (item: any) => {
  //   setDataSelected(item);
  //   setModalOpsis((prevState: any) => ({
  //     ...prevState,
  //     show: true,
  //   }));
  // };

  // const callbackModalConfirm = (approved = false) => approved && deleteData();

  // console.log("roleActions", roleActions);

  return (
    <>
      <TableDataListAction onClickAdd={handleAdd} add={roleActions?.create} columns={columns} setColumns={setColumns} spaceTop={0} filter={false}>
        <Filter />
      </TableDataListAction>

      <TableData
        columnsConfig={dataColumns} respDataApi={handleRespDataApi}
        rowData={dataRows}
        path={API_PATH().opsisdis.jadwal_pemeliharaan.har} primaryKey={'id_trans_jadwal_har'}
        ids="id"
        filterParams={{
          ...filterParams
        }}
        selected={dataSelected}
        rowSelect={rowSelect}
        rowSelectType={'radio'}
        onCheckedRows={onCheckedRows}
        module='jadwal pemeliharaan'
        deleteConfirmation
        onCloseModal={setAction}
        action={action} />

      {/* <ModalConfirm modalConfirmProps={modalConfirm} callbackModalConfirm={callbackModalConfirm} /> */}

      <ModalData modalProps={modal}>
        <InputJadwalForm dataSelected={dataSelected} type={page} approve={approve} />
      </ModalData>

      {/* <ModalData modalProps={modalOpsis} idsListen={false}>
        <ApporveOpsis dataSelected={dataSelected} />
      </ModalData> */}
    </>

  );
}

export default TableInputJadwal

interface ITableInputJadwal {
  onCheckedRows?: any;
  page?: string;
  sendTo?: string;
  rowSelect?: boolean;
  approve?: boolean;
  filterParams: any;
  roleActions?: any
}