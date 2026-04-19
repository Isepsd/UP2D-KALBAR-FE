import React, { useState, useEffect } from 'react';

/** CONFIG */

/** COMPONENTS */
import TableData from '@app/modules/Table/TableData';
import TableDataListAction from '@app/modules/Table/TableDataListAction';

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import { WP_SOP_JSA_COLUMNS } from '@app/configs/react-table/working-permit.columns.config';
import { Button, Dropdown } from 'react-bootstrap';
import WmSOPWpDetail from './WmSOPWpDetail';
import { useSearchParams } from 'react-router-dom';
import { get } from 'lodash';
import WmSOPForm from '@app/modules/WorkingManagement/WmSOPForm';
import ModalForm from '@app/components/Modals/ModalForm';
import { useSelector } from 'react-redux';
import { cdnUrl } from '@app/helper/cdn.helper';

export default function WmSOPnJSAPage() {
  const { closeModal } = useSelector( (state: any) => state.ui );
  let [searchParams, setSearchParams] = useSearchParams();
  const sopParams = searchParams.get('sop');

  /** DATA RESP */
  const [dataRows, setDataRows] = useState<any>([]);
  const [columns, setColumns] = useState<any>(WP_SOP_JSA_COLUMNS());
  const [dataColumns, setDataColumns] = useState<any>([]);

  const [dataSelected, setDataSelected] = useState<any>();
  const [action, setAction] = useState<string>();

  /** MODAL */
  const [modal, setModal] = useState<any>({
    approved: false,
    size: 'lg',
    title: `Hirarc`,
  });

  /** ROW */
  const [rowSelected, setRowSelected] = useState<any>({ id: sopParams });

  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any, index: number) => {
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
      dataTableValue.push({
        ...item,
        bagian: item.bagian?.name,
        dokumen: (
          <Button variant='' size='sm' onClick={()=>handleDownload(item)}>
            Download
          </Button>
        ),
        action: (
          <Dropdown className='hide-toogle hide-focus'>
            <Dropdown.Toggle variant='light' id={`sop-act-${index}`}>
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
  const handleDownload = (item: any) => {
    window.open(cdnUrl(item?.nama_file), '_blank')?.focus()
  };

  /** DELETE HANDLING */
  const handleDelete = (item: any) => {
    setDataSelected(item);
    setAction('delete');
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

  /** HANDLE SELECTED ROWS */
  const handleSelectedRows = (v: any) => {
    const selected = get(v, '0');
    if (selected?.id) {
      searchParams.delete('sop');
      searchParams.append('sop', selected?.id);
      setSearchParams(searchParams);
    }
    if (selected) {
      setRowSelected(selected);
    }
  };

  /** ADD HANDLING */
  const handleAddClick = () => {
    setDataSelected(undefined);
    setModal((prevState: any) => ({
      ...prevState,
      show: true,
    }));
  };

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
        onClickAdd={handleAddClick}
      ></TableDataListAction>

      <TableData
        columnsConfig={dataColumns}
        respDataApi={handleRespDataApi}
        rowData={dataRows}
        selected={dataSelected}
        action={action}
        path={API_PATH().working_permit.sop_jsa}
        primaryKey={'id_wp_master_sop_jsa'}
        rowSelect={true}
        rowSelectType={'radio'}
        onCheckedRows={handleSelectedRows}
      />

      <hr className='my-3' />
      <WmSOPWpDetail
        filterParams={{
          nomor_sop: rowSelected?.id ? rowSelected?.id : null,
        }}
      ></WmSOPWpDetail>

      <ModalForm modalProps={modal}>
        <WmSOPForm></WmSOPForm>
      </ModalForm>
    </>
  );
}
