import React, { useState, useEffect } from 'react';
import {  Dropdown, Form } from 'react-bootstrap';
/** CONFIG */
import { MASTER_COLUMNS } from '@app/configs/react-table/master-fasop.columns.config';

/** COMPONENTS */
import TableData from '@app/modules/Table/TableData';
import TableDataListAction from '@app/modules/Table/TableDataListAction';

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import { IFasopMaster } from '@app/interface/fasop-master.interface';
import { useSelector } from 'react-redux';

export default function FasMasterPage() {
  const { closeModal } = useSelector( (state: any) => state.ui );

  /** DATA RESP */
  const [dataRows, setDataRows] = useState<any>([]);
  const [dataSelected, setDataSelected] = useState<any>();
  const [action, setAction] = useState<string>();

  const [columns, setColumns] = useState<any>(MASTER_COLUMNS());
  const [dataColumns, setDataColumns] = useState<any>([]);
 
  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data:any)=>{
    let dataTableValue: any = [];
    data?.forEach((item: IFasopMaster, index: number) => {
      dataTableValue.push({
        number: item.number,
        station: item?.ref_lokasi?.nama_lokasi,
        nama: item?.nama,
        b3text: item?.b3text,
        jenis_point: item?.pointtype?.name,
        faktor: item?.faktor,
        aktif: (
          <div className='position-relative text-center w-100'>
            <Form.Check defaultChecked={!!item.status} disabled />
          </div>
        ),
        telegram: (
          <div className='position-relative text-center w-100'>
            <Form.Check defaultChecked={!!item.send_telegram} disabled />
          </div>
        ),
        kinerja: (
          <div className='position-relative text-center w-100'>
            <Form.Check defaultChecked={!!item.kinerja} disabled />
          </div>
        ),
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
        path={API_PATH().master.fasop.master}
        primaryKey={'point_number'}
        action={action}
        selected={dataSelected}
        deleteConfirmation
      ></TableData>
    </>
  );
}
