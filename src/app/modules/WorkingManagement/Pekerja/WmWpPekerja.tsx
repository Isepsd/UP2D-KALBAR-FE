import React, { useState, useEffect } from 'react';
import {  Dropdown } from 'react-bootstrap';

/** CONFIG */
import { IWpOnlinePekerja } from '@app/interface/wp-online-pekerja.interface';

/** COMPONENTS */
import TableData from '@app/modules/Table/TableData';

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import { WP_PEKERJA } from '@app/configs/react-table/working-permit.columns.config';
import { useSelector } from 'react-redux';

export default function WmWpPekerja({filter}:any) {
  const { closeModal } = useSelector( (state: any) => state.ui );
  /** DATA RESP */
  const [dataRows, setDataRows] = useState<any>([]);
  const [dataSelected, setDataSelected] = useState<any>();
  const [action, setAction] = useState<string>();

  const [columns] = useState<any>(WP_PEKERJA());
  const [dataColumns, setDataColumns] = useState<any>([]);
 
  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data:any)=>{
    let dataTableValue: any = [];
    data?.forEach((item: IWpOnlinePekerja, index: number) => {
      dataTableValue.push({
        number: item.number,
        nama_pekerja: item.nama_pekerja,
        action: (
          <Dropdown className='hide-toogle hide-focus'>
            <Dropdown.Toggle variant='light' id={`dropdown-act-${index}`}>
              <i className='fa-solid fa-ellipsis font-weight-bold'></i>
            </Dropdown.Toggle>

            <Dropdown.Menu>
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
      <TableData
        columnsConfig={dataColumns} 
        respDataApi={handleRespDataApi}
        rowData={dataRows}
        path={API_PATH().working_permit.online_pekerja}
        primaryKey={'id_wp_online_pekerja'}
        action={action}
        selected={dataSelected}
        filterParams={{sort_by:'nama_pekerja', id_wp_online: filter?.id_wp_online}}
        pagingPresistance={false}
        onCloseModal={setAction}
      ></TableData>
      <div className="mb-2"></div>
    </>
  );
}
