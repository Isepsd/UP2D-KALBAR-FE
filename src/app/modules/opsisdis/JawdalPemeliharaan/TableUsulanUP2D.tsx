import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import moment from 'moment';
moment.locale('id')

/** COMPONENTS */
import TableData from '@app/modules/Table/TableData';
import TableDataListAction from '@app/modules/Table/TableDataListAction';
import ModalConfirm from '@app/components/Modals/ModalConfirm';

/** CONFIGS */
import { USULANUP2D_COLUMN } from '@app/configs/react-table/opsisdis/jadwal-pemeliharaan.column'

import { timeFormat } from '@app/helper/time.helper';

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';

function TableUsulanUP2D() {
  // const navigate = useNavigate();

  /** DATA RESP */
  const [dataRows, setDataRows] = useState<any>([]);
  const [columns, setColumns] = useState<any>(USULANUP2D_COLUMN());
  const [dataColumns, setDataColumns] = useState<any>([]);
  const [dataSelected] = useState<any>();
  const [modalConfirm] = useState<any>({
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
    data?.forEach(() => {
      dataTableValue.push({
        nomor: '00006/06/2022/HAR/UP2D',
        tgl_mulai: timeFormat(new Date()),
        tgl_selesai: timeFormat(new Date()),
        est_durasi: '7 jam',
        titik_manuver: 'ASM12',
        gi_gh_pk: 'GI ASAM ASAM',
        titik_pemeliharaan: 'ASM12',
        status: (<div className='badge badge-success'>Laporan Selesai</div>),
        durasi_proses: '0 jam. 43 menit',
        prioritas: <span className='text-success'>Normal</span>,
        pembuat: 'Yogha',
        unit_pembangkit: 'UIW Bidang Niaga & PP',
        action: (
          <>
            <div className="d-flex px-2 align-items-center">
              <Button size='sm' className='me-2'><i className="fa-solid fa-check"></i> Approve</Button>
              <Button size='sm' variant='danger' className='me-2'><i className="fa-solid fa-xmark"></i> Reject</Button>
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

  const callbackModalConfirm = (approved = false) => approved && deleteData();

  return (
    <>
      <TableDataListAction add={false} columns={columns} setColumns={setColumns} spaceTop={0}>
      </TableDataListAction>

      <TableData columnsConfig={dataColumns} respDataApi={handleRespDataApi} rowData={dataRows} path={API_PATH().master.fasop.point_type} primaryKey={'id'} filterParams={{ datum_1_after: moment().subtract(1, 'day').format('YYYY-MM-DD HH:mm'), datum_1_before: moment().format('YYYY-MM-DD HH:mm') }} deleteConfirmation />

      <ModalConfirm modalConfirmProps={modalConfirm} callbackModalConfirm={callbackModalConfirm} />
    </>
  );
}

export default TableUsulanUP2D