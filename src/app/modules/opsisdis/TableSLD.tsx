import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

/** COMPONENT */
import TableDataListAction from '@app/modules/Table/TableDataListAction';
import TableData from '@app/modules/Table/TableData';

/** CONFIG */
import { SLD_COLUMN } from '@app/configs/react-table/opsisdis/slingle-line-diagram.colum.config';

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import { Dropdown } from 'react-bootstrap';
import { cdnUrl } from '@app/helper/cdn.helper';
import { useSelector } from 'react-redux';
import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';

interface ITableSLD {
  setModal: any
  module: any
  filterParams?: any
  garduInduk?: any
  roles?: any
}

export default function TableSLD({ module, setModal, filterParams = {}, garduInduk, roles }: ITableSLD) {
  const { closeModal } = useSelector((state: any) => state.ui);
  let [searchParams] = useSearchParams();

  /** DATA RESP */
  const [dataSelected, setDataSelected] = useState<any>();
  const [action, setAction] = useState<string>();
  const [dataRows, setDataRows] = useState<any>([]);
  const [columns, setColumns] = useState<any>(SLD_COLUMN());
  const [dataColumns, setDataColumns] = useState<any>([]);
  const [roleActions, setRoleActions] = useState<any>({});

  const [triggers, setTriggers] = useState<any>(null);

  useEffect(() => {
    if (filterParams?.id_gardu_induk) {
      setTriggers(filterParams?.id_gardu_induk ? filterParams?.id_gardu_induk : '-1')
    }
    else if (triggers && filterParams?.id_gardu_induk == null && !searchParams.get("id_gardu_induk")) {
      setTriggers('0')
    }

  }, [filterParams?.id_gardu_induk])


  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any, index: number) => {
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
      dataTableValue.push({
        ...item,
        keterangan: <a href={cdnUrl(item?.nama_file)} target="_blank" rel="noreferrer">{item?.keterangan}</a>,
        tgl_upload: item?.tgl_upload,
        action: (
          <Dropdown className='hide-toogle hide-focus'>
            <Dropdown.Toggle className='bg-transparent border-0 no-outline py-0 text-body' id={`gardu-status-act-${index}`}>
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

  /** EDIT HANDLING */
  const handleEdit = (item: any) => {
    setDataSelected(item);
    setAction('edit.modal');
  };

  const handleDelete = (item: any) => {
    setDataSelected(item);
    setAction('delete');
  };

  /** ADD HANDLING */
  const handleAddClick = () => {
    if (garduInduk?.id_ref_lokasi == undefined) { alert('Silahkan pilih gardu induk terlebih dahulu'); return false; }
    setDataSelected(undefined);
    setModal((prevState: any) => ({
      ...prevState,
      show: true,
    }));
  };

  /** HANDLE CLOSE MODAL */
  useEffect(() => {
    if (closeModal && action) {
      setAction(undefined)
    }
  }, [closeModal])

  /** COLUMN SHOW HIDE EVENT HANDLE */
  useEffect(() => {
    let cols: any = columns?.filter(({ show }: any) => show === true);
    let roleAccess = ROLE_ACCESS(roles)
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
      <TableDataListAction
        add={roleActions?.create}
        onClickAdd={handleAddClick}
        columns={columns}
        setColumns={setColumns}
        spaceTop={0}
      ></TableDataListAction>

      <TableData
        module={module}
        columnsConfig={dataColumns}
        respDataApi={handleRespDataApi}
        rowData={dataRows}
        path={API_PATH().opsisdis.sld}
        primaryKey={'id_daf_sld_gi'}
        filterParams={{
          sort_by: '-tgl_upload',
          ...filterParams
        }}
        trigger={triggers}
        selected={dataSelected}
        action={action}
        onCloseModal={setAction}
      />
    </>
  );
}
