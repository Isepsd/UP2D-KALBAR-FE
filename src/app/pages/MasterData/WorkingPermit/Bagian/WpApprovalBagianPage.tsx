import React, { useState, useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';

/** CONFIG */
// import { IWpMasterBagian } from '@app/interface/working-permit.interface';
import { WP_BAGIAN_COLUMNS } from '@app/configs/react-table/master-working-permit.column.config';

/** COMPONENTS */
import TableData from '@app/modules/Table/TableData';
import TableDataListAction from '@app/modules/Table/TableDataListAction';

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import { useSelector } from 'react-redux';

export default function WpApprovalBagianPage() {
  const { closeModal } = useSelector( (state: any) => state.ui );

  /** DATA RESP */
  const [dataRows, setDataRows] = useState<any>([]);
  const [dataSelected, setDataSelected] = useState<any>();
  const [action, setAction] = useState<string>();

  const [columns, setColumns] = useState<any>(WP_BAGIAN_COLUMNS());
  const [dataColumns, setDataColumns] = useState<any>([]);
 
  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data:any)=>{
    let dataTableValue: any = [];
    data?.forEach((item: any, index: number) => {
      dataTableValue.push({
        number: item.number,
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
        path={API_PATH().master.working_permit.bagian}
        primaryKey={'id_wp_master_bagian'}
        action={action}
        selected={dataSelected}
        deleteConfirmation
      ></TableData>
    </>
  );
}
