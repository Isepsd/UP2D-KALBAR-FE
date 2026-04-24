import React, { useState, useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';

/** CONFIG */
import { IJaringanPenyulang } from '@app/interface/jaringan-penyulang.interface';
import { PENYULANG } from '@app/configs/react-table/master-jaringan.columns.config';
import { JENIS_LOKASI } from '@app/configs/jenis-lokasi.config';

/** COMPONENTS */
import TableData from '@app/modules/Table/TableData';
import TableDataListAction from '@app/modules/Table/TableDataListAction';

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import BadgeStatus from '@app/components/Status/BadgeStatus';
import { useSelector } from 'react-redux';
import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';

export default function JarPenyulangPage() {
  const { closeModal } = useSelector((state: any) => state.ui);

  /** DATA RESP */
  const [dataRows, setDataRows] = useState<any>([]);
  const [dataSelected, setDataSelected] = useState<any>();
  const [action, setAction] = useState<string>();
  const [roleActions, setRoleActions] = useState<any>({});

  const [columns, setColumns] = useState<any>(PENYULANG());
  const [dataColumns, setDataColumns] = useState<any>([]);

  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: IJaringanPenyulang, index: number) => {
      dataTableValue.push({
        number: item.number,
        jumlah_pelanggan: item.jumlah_pelanggan,
        ssot_number: item.ssot_number,
        jenis_jaringan: item?.jenis_jaringan,
        nama: item?.nama_lokasi,
        kode_lokasi: item?.kode_lokasi,
        gardu_induk: item?.gardu_induk?.nama_lokasi,
        parent_lokasi: item?.parent_lokasi?.nama_lokasi,
        coverage: item?.coverage,
        status_penyulang: item?.status_penyulang,
        jenis_peralatan: item?.jenis_peralatan,
        fungsi_lokasi: item?.fungsi_lokasi,
        lat: item?.lat,
        no_urut: item?.no_urut,
        lon: item?.lon,
        uid: item?.uid?.nama_lokasi,
        path1: item?.path1,
        path2:item?.path2,
        path3: item?.path3,
        up3_1: item?.up3_1?.nama_lokasi,
        ulp_1: item?.ulp_1?.nama_lokasi,
        count_gardu: item?.count_gardu,
        i_max: item?.i_max ? item?.i_max : "",
        id_i: item?.id_i ? item?.id_i : "",
        id_q: item?.id_q ? item?.id_q : "",
        id_v: item?.id_v ? item?.id_v : "",
        id_p: item?.id_p ? item?.id_p : "",
        id_amr: item?.id_amr ? item?.id_amr : "",
        id_portal_ext: item?.id_portal_ext ? item?.id_portal_ext : "",
        panjang_jaringan: item?.panjang_jaringan ? item?.panjang_jaringan : "",
        url_webservice: item?.url_webservice ? item?.url_webservice : "",
        faktor_kali: item?.faktor_kali ? item?.faktor_kali : "",
        dcc: item?.dcc ? item?.dcc : "",
        pemilik: item?.pemilik ? item?.pemilik : "",
        rekon_beban: (<BadgeStatus status={item?.rekon_beban} trueMsg='IYA' falseMsg='TIDAK'></BadgeStatus>),
        status: (<BadgeStatus status={item?.status_listrik}></BadgeStatus>),
        action: (
          <Dropdown className='hide-toogle hide-focus'>
            <Dropdown.Toggle className='bg-transparent border-0 no-outline py-0 text-body' id={`dropdown-act-${index}`}>
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
        ),
      });
    });

    setDataRows(dataTableValue)
  }

  /** DELETE HANDLING */
  const handleDelete = (item: any) => {
    setDataSelected(item);
    setAction('delete')
  };

  /** EDIT HANDLING */
  const handleEdit = (item: any) => {
    setDataSelected(item);
    setAction('edit')
  };

/** COLUMN SHOW HIDE EVENT HANDLE */
useEffect(() => {
  let cols: any = columns?.filter(({ show }: any) => show === true);
  let roleAccess = ROLE_ACCESS("master-penyulang")
  const roleAct = {
    view: ROLE_ACTION(roleAccess, 'view'),
    create: ROLE_ACTION(roleAccess, 'create'),
    update: ROLE_ACTION(roleAccess, 'update'),
    delete: ROLE_ACTION(roleAccess, 'delete'),
  };
  setRoleActions(roleAct);
  if (!roleAct?.delete && !roleAct?.update) {
    cols = cols?.filter((item: any) => {
      return item?.accessor != "action"
    })
  }
  setDataColumns(cols);
}, [columns]);

  /** HANDLE CLOSE MODAL */
  useEffect(() => {
    if (closeModal && action) {
      setAction(undefined)
    }
  }, [closeModal])

  return (
    <>
      <TableDataListAction
        add={roleActions?.create}
        columns={columns}
        setColumns={setColumns}
      >

      </TableDataListAction>

      <TableData
        columnsConfig={dataColumns}
        respDataApi={handleRespDataApi}
        rowData={dataRows}
        path={API_PATH().master.jaringan.ref_lokasi}
        // exportConfig={{ path: API_PATH().master.management_upload.penyulang + '/download-excel', customParams: {} }}
        primaryKey={'id_ref_lokasi'}
        action={action}
        selected={dataSelected}
        deleteConfirmation
        filterParams={{ id_ref_jenis_lokasi: JENIS_LOKASI().penyulang, sort_by: '-tgl_update,id_ref_lokasi' }}
      ></TableData>
    </>
  );
}
