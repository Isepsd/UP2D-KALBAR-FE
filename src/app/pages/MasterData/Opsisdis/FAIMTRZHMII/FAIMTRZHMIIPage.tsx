
import TableDataListAction from '@app/modules/Table/TableDataListAction';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import { API_PATH } from '@app/services/_path.service';
import { MASTER_FAILMTRZ } from '@app/configs/react-table/master-opsisdis.columns.config';
import BadgeStatus from '@app/components/Status/BadgeStatus';
import TableData from '@app/modules/Table/TableData';
import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';

export default function FAIFIOHLHMIIPage() {
  const navigate = useNavigate();
  const path = API_PATH().master.opsisdis.rekap_padam.fai_mtrz
  const [dataRows, setDataRows] = useState<any>([]);
  const [dataSelectedtion, setDataSelected] = useState<any>();
  const [action, setAction] = useState<any>();

  const [columns, setColumns] = useState<any>(MASTER_FAILMTRZ());
  const [dataColumns, setDataColumns] = useState<any>([]);
  const [roleActions, setRoleActions] = useState<any>({});

  const handleDelete = (item: any) => {
    setDataSelected(item);
    setAction('delete')
  };

  const handleEdit = (item: any) => {
    navigate(`edit/${item?.id_ref_ep_fai_mtrz}`);
  };

  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any, index: number) => {
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
      dataTableValue.push({
        ...item,
        number: item.number,
        id: item?.id,
        status: (<BadgeStatus status={item?.status}></BadgeStatus>),
        action: (
          <Dropdown className='hide-toogle hide-focus'>
            <Dropdown.Toggle className='bg-transparent border-0 no-outline py-0 text-body' id={`dropdown-act-${index}`}>
              <i className='fa-solid fa-ellipsis font-weight-bold'></i>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {roleActions?.update &&
                <Dropdown.Item onClick={() => handleEdit(item)}>Edit</Dropdown.Item>
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

    setDataRows(dataTableValue);
  };
  /** COLUMN SHOW HIDE EVENT HANDLE */
  useEffect(() => {
    let cols: any = columns?.filter(({ show }: any) => show === true);
    let roleAccess = ROLE_ACCESS("fai-mtrz-hmi")
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
  return (
    <>
      <TableDataListAction add={roleActions?.create} columns={columns} setColumns={setColumns} exporting={false} />


      <TableData
        columnsConfig={dataColumns}
        respDataApi={handleRespDataApi}
        rowData={dataRows}
        path={path}
        primaryKey={'id_ref_ep_fai_mtrz'}
        deleteConfirmation
        action={action}
        selected={dataSelectedtion}
        onCloseModal={setAction}
      />
    </>
  )
}