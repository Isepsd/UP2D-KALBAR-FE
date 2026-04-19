import React, { useState, useEffect } from 'react';

/** CONFIG */

/** COMPONENTS */
import TableData from '@app/modules/Table/TableData';
import TableDataListAction from '@app/modules/Table/TableDataListAction';

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import { WP_HIRARC_COLUMNS } from '@app/configs/react-table/working-permit.columns.config';
import { Button, Dropdown } from 'react-bootstrap';
import ModalData from '@app/components/Modals/ModalForm';
import WmHirarcForm from '@app/modules/WorkingManagement/WmHirarcForm';
import { useSearchParams } from 'react-router-dom';
import { get, upperCase } from 'lodash';
import WmHirarcDetail from './WmHirarcDetail';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDownload } from '@app/services/main.service';
import { notificationTemplate } from '@app/helper/notificationTemplate';
import { addNotification } from '@app/store/notification/notification.action';
import axios from 'axios';
import fileDownload from 'js-file-download';
import slugify from 'slugify';

export default function WmHirarcPage() {
  const source = axios.CancelToken.source();
  const dispatch = useDispatch()
  const { closeModal } = useSelector( (state: any) => state.ui );
  let [searchParams, setSearchParams] = useSearchParams();
  const hirarcParams = searchParams.get("hirarc")

  /** MODAL */
  const [modal, setModal] = useState<any>({
    approved: false,
    size: 'md',
    title: `Hirarc`,
  });

  /** DATA RESP */
  const [dataRows, setDataRows] = useState<any>([]);
  const [columns, setColumns] = useState<any>(WP_HIRARC_COLUMNS());
  const [dataColumns, setDataColumns] = useState<any>([]);

  const [dataSelected, setDataSelected] = useState<any>();
  const [action, setAction] = useState<string>();

  /** ROW */
  const [rowSelected, setRowSelected] = useState<any>({id:hirarcParams});

  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any, index: number) => {
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
      dataTableValue.push({
        ...item,
        bagian: item.bagian?.name,
        download: <Button variant='' size='sm' onClick={()=>handleDownloadData(item)}>Download</Button>,
        action: (
          <Dropdown className='hide-toogle hide-focus'>
            <Dropdown.Toggle variant='light' id={`qrc-act-${index}`}>
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

  useEffect(() => {
    if(hirarcParams){
      setRowSelected({id:hirarcParams ? hirarcParams : '0'})
    }
  }, [hirarcParams])

  /** HANDLE SELECTED ROWS */
  const handleSelectedRows = (v: any) => {
    const selected = get(v, '0');
    if (selected?.id) {
      searchParams.delete('hirarc');
      searchParams.append('hirarc', selected?.id);
      setSearchParams(searchParams);
    }
    setRowSelected(selected);
  };

  /** ADD HANDLING */
  const handleAddClick = () => {
    setDataSelected(undefined);
    setModal((prevState: any) => ({
      ...prevState,
      show: true,
    }));
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

  /** HANDLE CLOSE MODAL */
  useEffect(() => {
    if(closeModal && action){
      setAction(undefined)
    }
  }, [closeModal])


  /** EXPORTING DATA */
  const getDownloadPdf = async (item: any) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    try {
      const path:any = `${API_PATH().working_permit.hirarc}/pdf/${item?.id_wp_hirarc}`
      let req: any = await getAllDownload( path, {}, source.token );

      /** RESET EXPORT */
      const dataBlob = req?.data;
      fileDownload(
        dataBlob,
        `${slugify(upperCase(`HIRARC-${item?.bagian?.name}-${item?.pekerjaan}-${item?.id_wp_hirarc}`))}.pdf`
      );
    } catch (err: any) {
      dispatchNotification(`Gagal export / download data`, 'danger');
    }
  };
  
  /** DOWNLOAD ON CLICK */
  const handleDownloadData = async (item:any)=>{
    getDownloadPdf(item)
  }

  /** NOTIFICATION HANDLER */
  const dispatchNotification = (msg: string = '', type: string = '') => {
    const notification = notificationTemplate(msg, type);
    dispatch(addNotification({ ...notification, message: msg, type: type }));
  };

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
        path={API_PATH().working_permit.hirarc}
        primaryKey={'id_wp_hirarc'}
        selected={dataSelected}
        action={action}
        rowSelect={true}
        rowSelectType={'radio'}
        onCheckedRows={handleSelectedRows}
      />

      <hr className='my-4'/>

      <WmHirarcDetail
        filterParams={{
          id_wp_hirarc: rowSelected?.id ? rowSelected?.id : null,
        }}
      ></WmHirarcDetail>

      <ModalData modalProps={modal}>
        <WmHirarcForm />
      </ModalData>
    </>
  );
}
