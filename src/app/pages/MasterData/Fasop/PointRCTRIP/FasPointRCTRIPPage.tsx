import React, { useState, useEffect } from 'react';
import {  Dropdown, Form } from 'react-bootstrap';

/** CONFIG */ 
import { REF_POINT_RC_TRIP_COLUMNS } from '@app/configs/react-table/master-fasop.columns.config';

/** COMPONENTS */
import TableData from '@app/modules/Table/TableData';
import TableDataListAction from '@app/modules/Table/TableDataListAction';

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import { IFasopCPoint } from '@app/interface/fasop-c-point.interface';
import { useSelector } from 'react-redux';

export default function FasPointAnalogDigitalPage() {
  const { closeModal } = useSelector( (state: any) => state.ui );

  /** DATA RESP */
  const [dataRows, setDataRows] = useState<any>([]);
  const [dataSelected, setDataSelected] = useState<any>();
  const [action, setAction] = useState<string>();

  const [columns, setColumns] = useState<any>(REF_POINT_RC_TRIP_COLUMNS());
  const [dataColumns, setDataColumns] = useState<any>([]);
 
  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data:any)=>{
    let dataTableValue: any = [];
    data?.forEach((item: IFasopCPoint, index: number) => {
      dataTableValue.push({
        number: index +1,
        point_number: item?.point_number,
        point_name: item?.point_name,
        point_text: item?.point_text,
        wilayah: item?.ref_lokasi?.nama_lokasi,
        state_label: item?.state_set_id,
        rc: (<div className='position-relative text-center w-100'><Form.Check defaultChecked={!!item?.rc} disabled /></div>),
        kirim_rc_telegram: (<div className='position-relative text-center w-100'><Form.Check defaultChecked={!!item?.rc_telegram} disabled /></div>),
        trip: (<div className='position-relative text-center w-100'><Form.Check defaultChecked={!!item?.trip} disabled /></div>),
        kirim_trip_telegram: (<div className='position-relative text-center w-100'><Form.Check defaultChecked={!!item?.trip_telegram} disabled /></div>),
        action: (
          <Dropdown className='hide-toogle hide-focus'>
            <Dropdown.Toggle variant='light' id={`dropdown-act-${index}`}>
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
      })
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
        add={false}
        columns={columns}
        setColumns={setColumns}
      ></TableDataListAction> 

      <TableData
        columnsConfig={dataColumns} 
        respDataApi={handleRespDataApi}
        rowData={dataRows}
        path={API_PATH().master.fasop.c_point}
        primaryKey={'point_number'}
        action={action}
        selected={dataSelected}
        deleteConfirmation
      ></TableData>
    </>
  );
}
