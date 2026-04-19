import React, { useState, useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';

/** CONFIG */
import { IAsetRuangan } from '@app/interface/aset-ruangan.interface';
import { MASTER_DATA_STATUS_ASET } from '@app/configs/react-table/master-aset.columns.config';
import { timeFormatAlt } from '@app/helper/time.helper';

/** COMPONENTS */
import TableData from '@app/modules/Table/TableData';
import TableDataListAction from '@app/modules/Table/TableDataListAction';
import BadgeStatus from '@app/components/Status/BadgeStatus';

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import { useSelector } from 'react-redux';

export default function RuanganPage() {
  const { closeModal } = useSelector( (state: any) => state.ui );

  /** DATA RESP */
  const [dataRows, setDataRows] = useState<any>([]);
  const [dataSelected, setDataSelected] = useState<any>();
  const [action, setAction] = useState<string>();

  const [columns, setColumns] = useState<any>(MASTER_DATA_STATUS_ASET());
  const [dataColumns, setDataColumns] = useState<any>([]);
 
  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data:any)=>{
    let dataTableValue: any = [];
    data?.forEach((item: IAsetRuangan, index: number) => {
      dataTableValue.push({
        nama: item?.nama,
        status: (<BadgeStatus status={item?.status}></BadgeStatus>),
        tgl_entri: timeFormatAlt(item?.tgl_entri),
        tgl_update: timeFormatAlt(item?.tgl_update),
        action: (
          <Dropdown className='hide-toogle hide-focus'>
            <Dropdown.Toggle className='bg-transparent border-0 no-outline py-0 text-body' id={`dropdown-act-${index}`}>
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
        path={API_PATH().master.aset.ref_aset_ruangan}
        primaryKey={'id_ref_aset_ruangan'}
        action={action}
        selected={dataSelected}
        deleteConfirmation
      ></TableData>
    </>
  );
}
