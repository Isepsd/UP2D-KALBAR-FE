import React, { useState, useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';

/** CONFIG */
// import { IPertanyaanRQC } from '@app/interface/working-permit.interface';
import { PERTANYAAN_QRC_SELECTION_COLUMNS } from '@app/configs/react-table/master-working-permit.column.config';

/** COMPONENTS */
import TableData from '@app/modules/Table/TableData';

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import { useSelector } from 'react-redux';
import { postByPath, putByPath } from '@app/services/main.service';
import axios from 'axios';

export default function WmQrcQuestion({onRowChecked}:any) {
  const source = axios.CancelToken.source();
  const { callbackForm, closeModal } = useSelector((state: any) => state.ui);

  /** DATA RESP */
  const [dataRows, setDataRows] = useState<any>([]);
  const [dataSelected, setDataSelected] = useState<any>();
  const [action, setAction] = useState<string>();

  const [columns] = useState<any>(PERTANYAAN_QRC_SELECTION_COLUMNS());
  const [dataColumns, setDataColumns] = useState<any>([]);

  /** ROW */
  const [rowSelected, setRowSelected] = useState<any>(); 
  
  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data:any)=>{
    let dataTableValue: any = [];
    data?.forEach((item: any, index: number) => {
      dataTableValue.push({
        ...item,
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

  useEffect(() => {
   if(onRowChecked){
    onRowChecked(rowSelected)
   }
  }, [rowSelected])
  

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

  /** HANDLE SELECTED ROWS */
  const handleSelectedRows = (v: any) => {
    setRowSelected(v);
  };

  /** COLUMN SHOW HIDE EVENT HANDLE */
  useEffect(() => {
    const cols = columns?.filter(({ show }: any) => show === true);
    setDataColumns(cols);
  }, [columns]);

  /** UPSERT QUESTION */
  const upsertData = async (params: any) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    try {
      const ID = params?.id_wp_qrc_detail
      const path = API_PATH().working_permit.qrc_detail
      const resp = ID
        ? await putByPath(path, params, ID, source.token)
        : await postByPath(path, params, source.token);
    //  console.log(resp)
     resp;
    } catch (err: any) {
    }
  };
  
  useEffect(() => {
    if(callbackForm){
      const qrcDetailParams = rowSelected?.map((r:any)=>{
        return {
          "ada": "1",
          "id_wp_qrc": callbackForm?.results[0]?.id_wp_qrc,
          "id_pertanyaan_qrc": r?.id_pertanyaan_qrc
        }
      })
      // console.log(callbackForm?.results?.id_wp_qrc, callbackForm, qrcDetailParams, rowSelected)
      upsertData(qrcDetailParams)
    }
  }, [callbackForm])

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
        path={API_PATH().master.working_permit.pertanyaan_qrc}
        primaryKey={'id_pertanyaan_qrc'}
        action={action}
        selected={dataSelected}
        rowSelect={true}
        rowSelectType={'checkbox'}
        onCheckedRows={handleSelectedRows}
        onCloseModal={setAction}
      ></TableData>
    </>
  );
}
