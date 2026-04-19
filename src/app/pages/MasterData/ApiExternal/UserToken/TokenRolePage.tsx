import React, { useState, useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';

/** CONFIG */
import { MASTER_DATA_TOKEN } from '@app/configs/react-table/master-opsisdis.columns.config';
import { API_PATH } from '@app/services/_path.service';
// import { IRole } from '@app/interface/role.interface';

/** COMPONENTS */
import TableData from '@app/modules/Table/TableData';
import TableDataListAction from '@app/modules/Table/TableDataListAction';
import { useSelector } from 'react-redux';
import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';
import moment from 'moment';
import { get } from 'lodash';
import TokenRolePageDetail from './TokenRolePageDetail'

export default function RolePage() {
  const { closeModal } = useSelector((state: any) => state.ui);
  // const navigate = useNavigate();

  /** DATA RESP */
  const [dataRows, setDataRows] = useState<any>([]);
  const [dataSelected, setDataSelected] = useState<any>();
  const [action, setAction] = useState<string>();
  const [roleActions, setRoleActions] = useState<any>({});
  const [columns, setColumns] = useState<any>(MASTER_DATA_TOKEN());
  const [dataColumns, setDataColumns] = useState<any>([]);
  let [searchParams, setSearchParams] = useSearchParams();
  const IdToken = searchParams.get("tokenid")

  /** ROW */
  const [rowSelected, setRowSelected] = useState<any>({id_token:IdToken});

  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: any, index: number) => {
      dataTableValue.push({
        number : item.number,
        namatoken: item?.nama,
        token:item?.token,
        user_token:item?.user?.fullname,
        tanggal_buat: item.created_at ? moment(item.created_at).format("DD-MM-YYYY HH:mm") : '-',
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
                  {/* <Dropdown.Item onClick={() => handleSetPrivileges(item)}>
                    Set Privileges
                  </Dropdown.Item> */}
                </>
              }
              {roleActions?.delete &&
                <Dropdown.Item onClick={() => handleDelete(item)} className='text-danger-hover' >
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
  // const handleSetPrivileges = (item: any) => {
  //   navigate(`settings/${item?.id_token}`);
  // };

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

    let roleAccess = ROLE_ACCESS("user-token")
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

  /** HANDLE SELECTED ROWS */
  const handleSelectedRows = (v: any) => {
    console.log(dataSelected)
    const selected = get(v, '0');
    if (selected?.id_token) {
      searchParams.delete('tokenid');
      searchParams.append('tokenid', selected?.id_token);
      setSearchParams(searchParams);
    }
    setRowSelected(selected);
  };

  /** HANDLE CLOSE MODAL */
  useEffect(() => {
    if (closeModal && action) {
      setAction(undefined)
    }
  }, [closeModal])

  useEffect(() => {
    if(IdToken){
      setRowSelected({id_token:IdToken ? IdToken : '0'})
    }
  }, [IdToken])

  return (
    <>
      <TableDataListAction
        add={roleActions?.create}
        columns={columns}
        setColumns={setColumns}
      ></TableDataListAction>
      <TableData
        columnsConfig={dataColumns}
        respDataApi={handleRespDataApi}
        rowData={dataRows}
        path={API_PATH().master.external.usertoken}
        primaryKey={'id_token'}
        // filterParams={{ sort_by: '-id_token' }}
        selected={dataSelected}
        action={action}
        rowSelect={true}
        rowSelectType={'radio'}
        onCheckedRows={handleSelectedRows}
      />

    <hr className='my-4'/>

    <TokenRolePageDetail
      filterParams={{
        id_token: rowSelected?.id_token ? rowSelected?.id_token : null,
      }}
    ></TokenRolePageDetail>

    </>
  );
}
