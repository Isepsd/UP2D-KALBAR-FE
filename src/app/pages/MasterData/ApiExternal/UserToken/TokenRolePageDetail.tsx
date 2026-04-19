import React, { useState, useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';

/** CONFIG */
import { WP_HIRARC_DETAIL_COLUMNS } from '@app/configs/react-table/working-permit.columns.config';
import { IWpHirarcDetail } from '@app/interface/wp-hirarc.interface';

/** COMPONENTS */
import TableData from '@app/modules/Table/TableData';
import TableDataListAction from '@app/modules/Table/TableDataListAction';

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import ModalForm from '@app/components/Modals/ModalForm';
import TokenRolePageDetailForm from './TokenRolePageDetailForm';
import { useSelector } from 'react-redux';

export default function TokenRolePageDetail({ filterParams }: any) {
  const { closeModal } = useSelector( (state: any) => state.ui );
  let [searchParams] = useSearchParams();

  const hirarcId = searchParams.get('hirarc')

  /** DATA RESP */
  const [dataRows, setDataRows] = useState<any>([]);
  const [dataSelected, setDataSelected] = useState<any>();
  const [action, setAction] = useState<string>();
  const [triggers, setTriggers] = useState<any>(null);

  const [columns, setColumns] = useState<any>(WP_HIRARC_DETAIL_COLUMNS());
  const [dataColumns, setDataColumns] = useState<any>([]);

  /** MODAL JENIS POINT */
  const [modal, setModal] = useState<any>({
    approved: false,
    size: 'md',
    title: `Hirarc Detail`,
    id_wp_hirarc: filterParams?.id_wp_hirarc
  });

  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: IWpHirarcDetail, index: number) => {
      dataTableValue.push({
        ...item,
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

    setDataRows(dataTableValue);
  };

  /** DELETE HANDLING */
  const handleDelete = (item: any) => {
    setDataSelected(item);
    setAction('delete');
  };

  /** HANDLE ADD */
  const handleAddClick = () => {
    setDataSelected(undefined)
    setModal((prevState: any) => ({
      ...prevState,
      show: true,
    }));
  };

  /** EDIT HANDLING */
  const handleEdit = (item: any) => {
    setDataSelected(item);
    setAction('edit.modal');
  };

  /** COLUMN SHOW HIDE EVENT HANDLE */
  useEffect(() => {
    const cols = columns?.filter(({ show }: any) => show === true);
    setDataColumns(cols);
  }, [columns]);

  useEffect(() => {  
    if(hirarcId){
      setTriggers(hirarcId ? hirarcId : '0')
    }
  }, [hirarcId]) 

  /** HANDLE CLOSE MODAL */
  useEffect(() => {
    if(closeModal && action){
      setAction(undefined)
    }
  }, [closeModal])
  
  return (
    <>
      <TableDataListAction
        add={filterParams?.id_wp_hirarc>0 || searchParams?.get("hirarc") ? true: false}
        onClickAdd={handleAddClick}
        columns={columns}
        setColumns={setColumns}
        module='Hirarc Detail'
      ></TableDataListAction>

      <TableData
        columnsConfig={dataColumns}
        respDataApi={handleRespDataApi}
        rowData={dataRows}
        path={API_PATH().working_permit.hirarc_detail}
        primaryKey={'id_wp_hirarc_detail'}
        action={action}
        selected={dataSelected}
        filterParams={hirarcId ? {id_wp_hirarc:searchParams.get("hirarc")}:{id_wp_hirarc:0}}
        request={hirarcId ? true: false}
        trigger={triggers}
        ids={'ids'}
        pagingPresistance={false}
        module='Hirarc Detail'
      ></TableData>

      <ModalForm modalProps={modal} ids="ids">
        <TokenRolePageDetailForm />
      </ModalForm>
    </>
  );
}
