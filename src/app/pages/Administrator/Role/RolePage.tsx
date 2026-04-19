import React, { useState, useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

/** CONFIG */
import { ROLE_COLUMNS } from '@app/configs/react-table.config';
import { API_PATH } from '@app/services/_path.service';
import { IRole } from '@app/interface/role.interface';

/** COMPONENTS */
import TableData from '@app/modules/Table/TableData';
import TableDataListAction from '@app/modules/Table/TableDataListAction';
import { useSelector } from 'react-redux';
import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';

export default function RolePage() {
  const { closeModal } = useSelector((state: any) => state.ui);
  const navigate = useNavigate();

  /** DATA RESP */
  const [dataRows, setDataRows] = useState<any>([]);
  const [dataSelected, setDataSelected] = useState<any>();
  const [action, setAction] = useState<string>();
  const [roleActions, setRoleActions] = useState<any>({});
  const [columns, setColumns] = useState<any>(ROLE_COLUMNS());
  const [dataColumns, setDataColumns] = useState<any>([]);

  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: IRole, index: number) => {
      dataTableValue.push({
        name: item?.name,
        level: item?.level,
        description: item?.description,

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
                <>
                  <Dropdown.Item onClick={() => handleEdit(item)}>
                    Edit
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleSetPrivileges(item)}>
                    Set Privileges
                  </Dropdown.Item>
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

  /** SET PRIVILEGES */
  const handleSetPrivileges = (item: any) => {
    navigate(`settings/${item?.id}`);
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

    let roleAccess = ROLE_ACCESS("roles")
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
        path={API_PATH().admin.role}
        primaryKey={'id'}
        action={action}
        selected={dataSelected}
        onCloseModal={setAction}
      ></TableData>
    </>
  );
}
