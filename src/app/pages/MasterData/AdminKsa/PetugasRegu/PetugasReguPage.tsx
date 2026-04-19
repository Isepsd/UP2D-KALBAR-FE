import React, { useState, useEffect } from 'react';

/** CONFIG */

/** COMPONENTS */
import TableData from '@app/modules/Table/TableData';
import TableDataListAction from '@app/modules/Table/TableDataListAction';

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import { Dropdown } from 'react-bootstrap';
import { MASTER_DATA_PETUGAS_REGU } from '@app/configs/react-table/master-opsisdis.columns.config';
import { useDispatch, useSelector } from 'react-redux';
import { putByPath } from '@app/services/main.service';
import axios from 'axios';
import { addNotification } from '@app/store/notification/notification.action';
import { notificationTemplate } from '@app/helper/notificationTemplate';
import { setCallbackForm } from '@app/store/reducers/ui';
import ModalConfirm from '@app/components/Modals/ModalConfirm';
import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';

export default function PetugasReguPage() {
  const { closeModal } = useSelector((state: any) => state.ui);
  const source = axios.CancelToken.source();

  const dispatch = useDispatch();
  /** DATA RESP */
  const [dataRows, setDataRows] = useState<any>([]);
  const [columns, setColumns] = useState<any>(MASTER_DATA_PETUGAS_REGU());
  const [dataColumns, setDataColumns] = useState<any>([]);
  const [roleActions, setRoleActions] = useState<any>({});
  const [dataSelected, setDataSelected] = useState<any>();
  const [action, setAction] = useState<string>();

  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: any, index: number) => {
      dataTableValue.push({
        regu: item?.regu_petugas?.name,
        fullname: item?.fullname,
        action: (
          <Dropdown className='hide-toogle hide-focus'>
            <Dropdown.Toggle
              className='bg-transparent border-0 no-outline py-0 text-body'
              id={`dropdown-act-${index}`}
            >
              <i className='fa-solid fa-ellipsis font-weight-bold'></i>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {roleActions?.update &&
                <Dropdown.Item onClick={() => handleEdit(item)}>
                  Edit
                </Dropdown.Item>
              }
              {roleActions?.delete &&
                <Dropdown.Item
                  onClick={() => handleDelete(item)}
                  className='text-danger-hover'
                >
                  Delete Regu
                </Dropdown.Item>
              }


            </Dropdown.Menu>
          </Dropdown>
        ),
      });
    });

    setDataRows(dataTableValue);
  };


  const [modalConfirm, setModalConfirm] = useState<any>({
    show: false,
    approved: false,
    size: 'sm',
    icon: 'fa-regular fa-trash-can',
    description: `Hapus data`,
    subDescriotion: `Data tidak dapat dikembalikan`,
    textApproved: 'Delete',
    classApproved: 'danger',
    textDecline: 'Cancel',
  });


  /** DELETE HANDLING */
  const handleDelete = (item: any) => {
    setDataSelected(item);
    setModalConfirm((prevState: any) => ({
      ...prevState,
      show: true,
    }));
  };

  const deleteRegu = async (id: any) => {
    try {
      await putByPath(
        API_PATH().admin.user + '/delete-regu',
        {},
        id,
        source.token
      );
      dispatchNotification(`Sukses menghapus data`, 'success');
      dispatch(setCallbackForm(id));
    } catch (err: any) {
      dispatchNotification('Gagal menghapus data', 'danger');
    }
  };

  /** NOTIFICATION HANDLER */
  const dispatchNotification = (msg: string = '', type: string = '') => {
    const notification = notificationTemplate(msg, type);
    dispatch(addNotification({ ...notification, message: msg, type: type }));
  };

  /** EDIT HANDLING */
  const handleEdit = (item: any) => {
    setDataSelected(item);
    setAction('edit');
  };

  /** COLUMN SHOW HIDE EVENT HANDLE */
  useEffect(() => {
    let cols: any = columns?.filter(({ show }: any) => show === true);
    let roleAccess = ROLE_ACCESS("petugas-regu")
    const roleAct = {
      view: ROLE_ACTION(roleAccess, 'view'),
      create: ROLE_ACTION(roleAccess, 'create'),
      update: ROLE_ACTION(roleAccess, 'update'),
      delete: ROLE_ACTION(roleAccess, 'delete'),
    };
    setRoleActions(roleAct);
    if (!roleAct?.delete && !roleAct?.update) {
      cols = cols?.filter((item: any) => {
        return item?.accessor != "action"
      })
    }
    setDataColumns(cols);
  }, [columns]);

  /** HANDLE CLOSE MODAL */
  useEffect(() => {
    if (closeModal && action) {
      setAction(undefined);
    }
  }, [closeModal]);


  const callbackModalConfirm = (approved = null) => {
    if (approved) {
      deleteRegu(dataSelected?.id_user);
    }
  };

  return (
    <>
      <TableDataListAction
        add={roleActions?.create}
        columns={columns}
        setColumns={setColumns}
        exporting={false}
      ></TableDataListAction>

      <TableData
        columnsConfig={dataColumns}
        respDataApi={handleRespDataApi}
        rowData={dataRows}
        path={API_PATH().admin.user}
        primaryKey={'id_user'}
        filterParams={{ sort_by: 'fullname' }}
        action={action}
        selected={dataSelected}
      />

      <ModalConfirm
        modalConfirmProps={modalConfirm}
        callbackModalConfirm={callbackModalConfirm}
      />
    </>
  );
}
