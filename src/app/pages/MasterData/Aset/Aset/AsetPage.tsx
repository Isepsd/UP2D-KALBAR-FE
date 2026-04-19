import React, { useState, useEffect } from 'react';
import {  Dropdown } from 'react-bootstrap';

/** CONFIG */
import { IAset } from '@app/interface/aset.interface';
import { MASTER_DATA_ASET_ASET } from '@app/configs/react-table/master-aset.columns.config';

/** COMPONENTS */
import TableData from '@app/modules/Table/TableData';
import TableDataListAction from '@app/modules/Table/TableDataListAction';

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import { useSelector } from 'react-redux';

export default function BotTelegramPage() {
  const { closeModal } = useSelector( (state: any) => state.ui );
  /** DATA RESP */
  const [dataRows, setDataRows] = useState<any>([]);
  const [dataSelected, setDataSelected] = useState<any>();
  const [action, setAction] = useState<string>();

  const [columns, setColumns] = useState<any>(MASTER_DATA_ASET_ASET());
  const [dataColumns, setDataColumns] = useState<any>([]);
 
  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data:any)=>{
    let dataTableValue: any = [];
    data?.forEach((item: IAset, index: number) => {
      dataTableValue.push({
        no_aset_internal: item.no_aset_internal,
        id_ref_aset_jenis: item.ref_aset_jenis?.nama_aset_jenis,
        nama: item.nama,
        id_ref_lokasi_1: item.ref_lokasi_1?.nama_lokasi,
        id_ref_lokasi_3: item.ref_lokasi_3?.nama_lokasi,
        id_ref_lokasi_4: item.ref_lokasi_4?.nama_lokasi,
        no_seri: item.no_seri,
        id_ref_aset_manufaktur: item.ref_aset_manufaktur?.nama,
        tipe: item.tipe,
        tahun: item.tahun,
        id_ref_aset_status: item.ref_aset_status?.nama,
        action: (
          <Dropdown className='hide-toogle hide-focus'>
            <Dropdown.Toggle variant='light' id={`dropdown-act-${index}`}>
              <i className='fa-solid fa-ellipsis font-weight-bold'></i>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleEdit(item)}>
                Edit
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => handleDelete(item)}
                className='text-danger-hover'
              >
                Delete
              </Dropdown.Item>
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
    const cols = columns?.filter(({ show }: any) => show === true);
    setDataColumns(cols);
  }, [columns]);

  /** HANDLE CLOSE MODAL */
  useEffect(() => {
    if(closeModal && action){
        setAction(undefined)
    }
  }, [closeModal])

  return (
    <>
      <TableDataListAction
        add={true}
        columns={columns}
        setColumns={setColumns}
      ></TableDataListAction> 

      <TableData
        columnsConfig={dataColumns} 
        respDataApi={handleRespDataApi}
        rowData={dataRows}
        path={API_PATH().master.aset.ref_aset}
        primaryKey={'id_ref_aset'}
        action={action}
        selected={dataSelected}
        deleteConfirmation
      ></TableData>
    </>
  );
}
