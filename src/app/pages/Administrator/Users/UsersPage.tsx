import React, { useState, useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

/** CONFIG */
import { IUser } from '@app/interface/user.interface';
import { USERS_MANAGEMENT_COLUMNS } from '@app/configs/react-table.config';

/** COMPONENTS */
import TableData from '@app/modules/Table/TableData';
import TableDataListAction from '@app/modules/Table/TableDataListAction';
import { API_PATH } from '@app/services/_path.service';
import BadgeStatus from '@app/components/Status/BadgeStatus';
import { LazyImage } from '@app/components';
import { useSelector } from 'react-redux';
import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';

const Name = styled.div`
  .name {
    font-size: 16px;
  }
  .subname {
    font-size: 12px;
    font-weight: 400;
    line-height: 1;
  }
`;

export default function UsersPage({ rowAction = ['edit', 'resetPassword', 'delete'] }: any) {
  const { closeModal } = useSelector((state: any) => state.ui);
  const navigate = useNavigate()
  /** DATA RESP */
  const [dataRows, setDataRows] = useState<any>([]);
  const [dataSelected, setDataSelected] = useState<any>();
  const [action, setAction] = useState<string>();
  const [roleActions, setRoleActions] = useState<any>({});

  const [columns, setColumns] = useState<any>(USERS_MANAGEMENT_COLUMNS());
  const [dataColumns, setDataColumns] = useState<any>([]);

  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: IUser, index: number) => {
      dataTableValue.push({
        fullname: (
          <div className='d-flex align-items-center'>
            <LazyImage
              defaultImage='/static/avatar.png'
              src={`${process.env.API_CDN}${item.avatar}`}
              width={40}
              height={40}
              className='image-circle'
            />
            <Name className='ps-3'>
              <div className='name font-weight-bold'>{item?.fullname}</div>
              <div className='subname'>{item?.username}</div>
            </Name>
          </div>
        ),
        phone: (
          <div className='cursor-pointer' onClick={() => item.phone && window.open(`tel:${item?.phone}`, '_blank')}>
            {item?.phone}
          </div>
        ),
        jabatan: item?.jabatan?.nama,
        hak_akses: item?.role?.name,
        email: (
          <span className='cursor-pointer' onClick={() => item.email && window.open(`mailto:${item?.email}`, '_blank')}>
            {item?.email}
          </span>
        ),
        status: (<BadgeStatus status={item?.status} trueStatus="active"></BadgeStatus>),
        action: (
          <Dropdown className='hide-toogle hide-focus'>
            <Dropdown.Toggle className='bg-transparent border-0 no-outline py-0 text-body' id={`dropdown-act-${index}`}>
              <i className='fa-solid fa-ellipsis font-weight-bold'></i>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {roleActions?.update &&
                <>
                  <Dropdown.Item onClick={() => handleEdit(item)}>
                    Edit
                  </Dropdown.Item>
                  {
                    rowAction?.includes("resetPassword") &&
                    <Dropdown.Item onClick={() => handleSetPassword(item)}>
                      Reset Password
                    </Dropdown.Item>
                  }
                </>
              }
              {roleActions?.delete &&

                <Dropdown.Item
                  onClick={() => handleDelete(item)}
                  className='text-danger-hover'
                >
                  Delete
                </Dropdown.Item>

              }
            </Dropdown.Menu>
          </Dropdown>
        ),
      });
    });

    setDataRows(dataTableValue)
  }

  /** SET PASSWORD */
  const handleSetPassword = (item: any) => {
    navigate(`set-password/${item?.id_user}`);
  };

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
    let cols: any = columns?.filter(({ show }: any) => show === true);

    let roleAccess = ROLE_ACCESS("admin-user")
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
      setAction(undefined)
    }
  }, [closeModal])

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
        action={action}
        selected={dataSelected}
        onCloseModal={setAction}
        filterParams={{
          sort_by: "fullname"
        }}
      ></TableData>
    </>
  );
}
