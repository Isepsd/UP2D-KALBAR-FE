import React, { useState, useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';

/** CONFIG */
import { FASOP_KINERJA_SCADA } from '@app/configs/react-table/master-fasop.columns.config';

/** COMPONENTS */
import TableData from '@app/modules/Table/TableData';
import TableDataListAction from '@app/modules/Table/TableDataListAction';

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import ModalForm from '@app/components/Modals/ModalForm';
import KinerjaScadaForm from './KinerjaScadaForm';
import { useSearchParams } from 'react-router-dom';
import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';

export default function KinerjaScadaPage() {
  let [searchParams, setSearchParams] = useSearchParams();

  /** DATA RESP */
  const [dataRows, setDataRows] = useState<any>([]);
  const [dataSelected, setDataSelected] = useState<any>();
  const [action, setAction] = useState<string>();
  const [roleActions, setRoleActions] = useState<any>({});
  const [columns, setColumns] = useState<any>(FASOP_KINERJA_SCADA());
  const [dataColumns, setDataColumns] = useState<any>([]);

  /** MODAL JENIS POINT */
  const [modal, setModal] = useState<any>({
    approved: false,
    size: 'lg',
    title: `Target Kinerja SCADA`,
  });

  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: any, index: number) => {
      dataTableValue.push({
        ...item,
        nama_pointtype: item?.nama_pointtype ? item?.nama_pointtype : 'RC',
        unit: item?.unit?.nama_lokasi,
        number: item.number,

        action: (
          <Dropdown className='hide-toogle hide-focus'>
            <Dropdown.Toggle variant='light' id={`dropdown-act-${index}`}>
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

    setDataRows(dataTableValue)
  }

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
    let cols: any = columns?.filter(({ show }: any) => show === true);
    let roleAccess = ROLE_ACCESS("fasop-md-kinerja-scada")
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

  const handleAddClick = () => {
    setDataSelected(undefined);
    setModal((prevState: any) => ({
      ...prevState,
      show: true,
    }));
  };

  /** HANDLE CLOSE MODAL */

  useEffect(() => {
    searchParams.delete("point_type")
    searchParams.delete("ids")
    searchParams.delete("id")
    setSearchParams(searchParams)
  }, [])


  return (
    <>
      <TableDataListAction
        add={roleActions?.create}
        onClickAdd={handleAddClick}
        columns={columns}
        setColumns={setColumns}
      ></TableDataListAction>

      <TableData
        columnsConfig={dataColumns}
        respDataApi={handleRespDataApi}
        rowData={dataRows}
        path={API_PATH().master.fasop.kinerja_scada}
        primaryKey={'trans_id_kinerja'}
        action={action}
        selected={dataSelected}
      />


      <ModalForm modalProps={modal}>
        <KinerjaScadaForm />
      </ModalForm>
    </>
  );
}
