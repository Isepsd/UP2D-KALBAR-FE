import React, { useState, useEffect } from 'react';
import { Dropdown, Form } from 'react-bootstrap';

/** CONFIG */
import { JENIS_POINT_COLUMNS } from '@app/configs/react-table/master-fasop.columns.config';
import { IFasopPointType } from '@app/interface/fasop-pointtype.interface';

/** COMPONENTS */
import TableData from '@app/modules/Table/TableData';
import TableDataListAction from '@app/modules/Table/TableDataListAction';

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import { get, truncate } from 'lodash';
import BadgeStatus from '@app/components/Status/BadgeStatus';
import FasJenisPointDetailPage from './FasJenisPointDetailPage';
import ModalForm from '@app/components/Modals/ModalForm';
import FasJenisPointFormPage from './JenisPointForm';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';

export default function GroupTelegramPage() {
  let [searchParams, setSearchParams] = useSearchParams();
  const pointTypeSearchParams = searchParams.get("point_type")
  const { activePaging, closeModal } = useSelector((state: any) => state.ui);

  /** DATA RESP */
  const [dataRows, setDataRows] = useState<any>([]);
  const [rowSelected, setRowSelected] = useState<any>({ id: pointTypeSearchParams });
  const [dataSelected, setDataSelected] = useState<any>();
  const [action, setAction] = useState<string>();
  const [roleActions, setRoleActions] = useState<any>({});
  const [columns, setColumns] = useState<any>(JENIS_POINT_COLUMNS());
  const [dataColumns, setDataColumns] = useState<any>([]);

  /** MODAL JENIS POINT */
  const [modal, setModal] = useState<any>({
    approved: false,
    size: 'lg',
    title: `Jenis Point`,
  });

  const remappedTreeJaringanData = (tree: any, level = 0) => {
    return tree
      ? tree?.map((item: IFasopPointType, index: number) => {
        return {
          key: (item as any)?.key,
          id: item.id_pointtype,
          no_urut: item.no_urut,
          nama: item.name,
          jenis_point: item.jenispoint,
          disabled: item?.id_induk_pointtype == null,
          tampil_dashboard: (
            <div className='position-relative text-center w-100'>
              <Form.Check checked={!!item?.show_grafik} disabled />
            </div>
          ),
          kirim_telegram: (
            <div className='position-relative text-center w-100'>
              <Form.Check checked={!!item?.send_telegram} disabled />
            </div>
          ),
          group_telegram: item?.telegram_group?.nama,
          status: <BadgeStatus status={item?.status}></BadgeStatus>,
          format_pesan: truncate(item.format_pesan, { length: 50 }),
          subRows: remappedTreeJaringanData(item?.child_pointtype, level + 1),
          action: (
            <Dropdown className='hide-toogle hide-focus'>
              <Dropdown.Toggle variant='light' id={`dropdown-act-${index}`}>
                <i className='fa-solid fa-ellipsis font-weight-bold'></i>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {roleActions?.update &&
                  <Dropdown.Item onClick={() => handleEdit(item)}>Edit</Dropdown.Item>
                }
                {/* {roleActions?.delete &&
                  <Dropdown.Item
                    onClick={() => handleDelete(item)}
                    className='text-danger-hover'
                  >
                    Delete
                  </Dropdown.Item>
                } */}

              </Dropdown.Menu>
            </Dropdown>
          )
        };
      })
      : undefined;
  };

  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any) => {
    const dataRows = remappedTreeJaringanData(data)
    setDataRows(dataRows);
  };

  /** DELETE HANDLING */
  // const handleDelete = (item: any) => {
  //   setDataSelected(item);
  //   setAction('delete');
  // };

  /** EDIT HANDLING */
  const handleEdit = (item: any) => {
    setDataSelected(item);
    setAction('edit.modal');
  };

  const handleSelectedRows = (v: any) => {
    const selected = get(v, '0');
    if (selected?.id) {
      searchParams.delete('point_type');
      searchParams.append('point_type', selected?.id);
      setSearchParams(searchParams);
    }
    setRowSelected(selected);
  };

/** COLUMN SHOW HIDE EVENT HANDLE */
useEffect(() => {
  let cols: any = columns?.filter(({ show }: any) => show === true);
  let roleAccess = ROLE_ACCESS("jenis-point")
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

  useEffect(() => {
    if (pointTypeSearchParams) {
      setRowSelected({ id: pointTypeSearchParams ? pointTypeSearchParams : '0' })
    }
  }, [pointTypeSearchParams])

  useEffect(() => {
    if (activePaging) {
      searchParams.delete('point_type');
      setSearchParams(searchParams);
    }
  }, [activePaging])

  /** HANDLE CLOSE MODAL */
  useEffect(() => {
    if (closeModal && action) {
      setAction(undefined)
    }
  }, [closeModal])

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
        // copyPointState={roleActions?.create}
        // onCopyPointState={handleAddClick}
        columns={columns}
        setColumns={setColumns}
      ></TableDataListAction>

      <TableData
        columnsConfig={dataColumns}
        respDataApi={handleRespDataApi}
        rowData={dataRows}
        path={API_PATH().master.fasop.point_type + '-tree'}
        primaryKey={'id_pointtype'}
        action={action}
        selected={dataSelected}
        rowSelect={true}
        rowSelectType={'radio'}
        onCheckedRows={handleSelectedRows}
      ></TableData>

      <hr className='my-4' />

      <FasJenisPointDetailPage
        filterParams={{ id_pointtype: rowSelected?.id ? rowSelected?.id : null }}
      ></FasJenisPointDetailPage>

      <ModalForm modalProps={modal}>
        <FasJenisPointFormPage />
      </ModalForm>
    </>
  );
}
