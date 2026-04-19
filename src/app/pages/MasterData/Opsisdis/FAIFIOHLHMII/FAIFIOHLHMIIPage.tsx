
import TableDataListAction from '@app/modules/Table/TableDataListAction';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import { API_PATH } from '@app/services/_path.service';
import { MASTER_FAILHMI } from '@app/configs/react-table/master-opsisdis.columns.config';
import BadgeStatus from '@app/components/Status/BadgeStatus';
import TableData from '@app/modules/Table/TableData';

export default function FAIFIOHLHMIIPage() {
  const navigate = useNavigate();
  const path = API_PATH().master.opsisdis.rekap_padam.fiohl
  const [dataRows, setDataRows] = useState<any>([]);
  const [dataSelectedtion, setDataSelected] = useState<any>();
  const [action, setAction] = useState<any>();

  const [dataColumns, setDataColumns] = useState<any>(MASTER_FAILHMI);

  const handleDelete = (item: any) => {
    setDataSelected(item);
    setAction('delete')
  };

  const handleEdit = (item: any) => {
    navigate(`edit/${item?.id_ref_ep_fiohl}`);
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

    setDataRows(dataTableValue);
  };

  return (
    <>
      <TableDataListAction add={true} columns={dataColumns} setColumns={setDataColumns} exporting={false} />

      <TableData
        columnsConfig={dataColumns}
        respDataApi={handleRespDataApi}
        rowData={dataRows}
        path={path}
        primaryKey={'id_ref_ep_fiohl'}
        deleteConfirmation
        action={action}
        selected={dataSelectedtion}
        onCloseModal={setAction}
      />
    </>
  )
}
