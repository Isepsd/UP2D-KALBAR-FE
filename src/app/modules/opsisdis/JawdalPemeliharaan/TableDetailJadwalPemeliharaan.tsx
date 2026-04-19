import React, { useState, useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';
import moment from 'moment';
moment.locale('id');

/** COMPONENTS */
import TableData from '@app/modules/Table/TableData';
import TableDataListAction from '@app/modules/Table/TableDataListAction';
import ModalConfirm from '@app/components/Modals/ModalConfirm';
import ModalForm from '@app/components/Modals/ModalForm';

/** CONFIGS */

/** SERVICE */
// import { API_PATH } from '@app/services/_path.service';
import InputGarduForm from './InputGarduForm';
import InputFormDokumentasi from './InputFormDokumentasi';
import { cdnUrl } from '@app/helper/cdn.helper';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
type Props = {
  pathService?: any;
  columnsConfig: any;
  primaryKey?: string;
  tabActive?: any;
  parent?: any;
  add?: any;
};

function TableDetailJadwalPemeliharaan({
  pathService,
  columnsConfig,
  primaryKey,
  tabActive,
  parent,
  add = false,
}: Props) {
  /** DATA RESP */
  const [action, setAction] = useState<any>(null);
  const [dataRows, setDataRows] = useState<any>([]);
  const [columns, setColumns] = useState<any>(columnsConfig);
  const [dataColumns, setDataColumns] = useState<any>([]);
  const [dataSelected, setDataSelected] = useState<any>();
  const [tabOpen, setTabOpen] = useState<any>(tabActive);
  let [searchParams, setSearchParams] = useSearchParams();

  const { closeModal } = useSelector( (state: any) => state.ui );

  const [modalConfirm] = useState<any>({
    show: false,
    approved: false,
    size: 'sm',
    icon: 'fa-regular fa-trash-can',
    description: `Delete this data`,
    subDescriotion: `Data tidak dapat dikembalikan`,
    textApproved: 'Delete',
    classApproved: 'danger',
    textDecline: 'Cancel',
  });

  /** MODAL */
  const [modal, setModal] = useState<any>({
    approved: false,
    size: 'lg',
    title: `Tambah`,
  });

  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
      dataTableValue.push({
        ...item,
        number: item?.number,
        gardu_induk: item?.gardu?.gardu_induk?.nama_lokasi,
        penyulang: item?.gardu?.penyulang?.nama_lokasi,
        gardu: item?.gardu?.nama_lokasi,
        up3: item?.gardu?.up3?.nama_lokasi,
        alamat: item?.gardu?.alamat,
        nama_dok: (
          <a href={cdnUrl(item?.file_name)} target='_blank' rel='noreferrer'>
            {item?.nama_dok}
          </a>
        ),
        action: (
          <>
            <div className='d-flex px-2 align-items-center'>
              <Dropdown className='hide-toogle hide-focus'>
                <Dropdown.Toggle
                  className='bg-transparent border-0 no-outline py-0 text-body'
                  id={`dropdown-act-${item.id_pointtype}`}
                >
                  <i className='fa-solid fa-ellipsis font-weight-bold'></i>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {tabOpen == 'dokumentasi' && (
                    <Dropdown.Item onClick={() => handleEdit(item)}>
                      Edit
                    </Dropdown.Item>
                  )}
                  <Dropdown.Item
                    onClick={() => handleDelete(item)}
                    className='text-danger-hover'
                  >
                    Delete
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </>
        ),
      });
    });

    setDataRows(dataTableValue);
  };

  useEffect(() => {
    setAction(undefined)
    setTabOpen(tabActive)
  }, [tabActive])
  
  useEffect(() => {
    if(closeModal && action){
      setAction(undefined)
    }
  }, [closeModal])
  
  /** COLUMN SHOW HIDE EVENT HANDLE */
  useEffect(() => {
    const cols = columns?.filter(({ show }: any) => show === true);
    setDataColumns(cols);
  }, [columns]);

  const deleteData = async () => {
    setAction('delete');
  };

  const handleDelete = (item: any) => {
    setDataSelected(item);
    setAction('delete');
  };

  const handleEdit = (item: any) => {
    setDataSelected(item);
    setAction('edit.modal');
    setModal({ ...modal, show: true, title: `Ubah` });
  };

  const handleAdd = () => {
    setAction('create.modal');
    setDataSelected(undefined);
    setModal((prevState: any) => ({
      ...prevState,
      show: true,
      title: `Tambah`,
      size: tabOpen == 'dokumentasi' ? 'md' : 'lg',
    }));
  };

  const callbackModalConfirm = (approved = false) => approved && deleteData();

  useEffect(() => {
    setColumns(columnsConfig);
  }, [columnsConfig]);

  const modalDecline = () => {
    setModal({ ...modal, show: false });
    searchParams.delete("id_detail")
    setSearchParams(searchParams)
  };


  useEffect(() => {
      if (searchParams.get("id_detail")) {
        setModal({ ...modal, show: true, title:'Edit' });
      }else{
        setModal({ ...modal, show: false });
      } 
  }, [searchParams.get("id_detail")]);

  return (
    <>
      {parent && (
        <>
          <TableDataListAction
            onClickAdd={handleAdd}
            add={add}
            columns={columns}
            setColumns={setColumns}
            spaceTop={0}
          ></TableDataListAction>
          {tabOpen == 'gardu' && (
            <TableData
              selected={dataSelected}
              columnsConfig={dataColumns}
              respDataApi={handleRespDataApi}
              rowData={dataRows}
              path={pathService}
              primaryKey={primaryKey}
              deleteConfirmation
              action={action}
              filterParams={{ id_trans_jadwal_har: parent?.id }}
              pagingPresistance={false}
              ids='id_detail'
            />
          )}
          {tabOpen == 'dokumentasi' && (
            <TableData
              selected={dataSelected}
              columnsConfig={dataColumns}
              respDataApi={handleRespDataApi}
              rowData={dataRows}
              path={pathService}
              primaryKey={primaryKey}
              deleteConfirmation
              action={action}
              filterParams={{ id_trans_jadwal_har: parent?.id }}
              pagingPresistance={false}
              ids='id_detail'
            />
          )}
        </>
      )}

      <ModalConfirm
        modalConfirmProps={modalConfirm}
        callbackModalConfirm={callbackModalConfirm}
      />
      <ModalForm modalProps={modal} ids="id_detail">
        {tabOpen == 'gardu' && (
          <InputGarduForm parent={parent} modalDecline={modalDecline} />
        )}
        {tabOpen == 'dokumentasi' && (
          <InputFormDokumentasi parent={parent} modalDecline={modalDecline} />
        )}
      </ModalForm>
    </>
  );
}

export default TableDetailJadwalPemeliharaan;
