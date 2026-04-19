import React, { useState, useEffect } from 'react';
import { Dropdown, Form } from 'react-bootstrap';

/** CONFIG */
import { JENIS_POINT_DETAIL_COLUMNS } from '@app/configs/react-table/master-fasop.columns.config';
import { IFasopPointTypeState } from '@app/interface/fasop-pointtype-state.interface';

/** COMPONENTS */
import TableData from '@app/modules/Table/TableData';
import TableDataListAction from '@app/modules/Table/TableDataListAction';

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import ModalForm from '@app/components/Modals/ModalForm';
import JenisPointDetailForm from './JenisPointDetailForm';
import FasJenisPointCopyDetailFormcopy from './FasJenisPointCopyDetailForm';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';

export default function FasJenisPointDetailPage({ filterParams }: any) {
  const { closeModal } = useSelector((state: any) => state.ui);
  let [searchParams] = useSearchParams();

  /** DATA RESP */
  const [dataRows, setDataRows] = useState<any>([]);
  const [dataSelected, setDataSelected] = useState<any>();
  const [action, setAction] = useState<string>();
  const [triggers, setTriggers] = useState<any>(null);
  const [roleActions, setRoleActions] = useState<any>({});
  const [columns, setColumns] = useState<any>(JENIS_POINT_DETAIL_COLUMNS());
  const [dataColumns, setDataColumns] = useState<any>([]);

  /** MODAL JENIS POINT */
  const [modal, setModal] = useState<any>({
    approved: false,
    size: 'lg',
    title: `Jenis Point State`,
    id_pointtype: filterParams?.id_pointtype,
  });

  const [modalCopyPoint, setModalCopyPoint] = useState<any>({
    approved: false,
    size: 'lg',
    title: `Jenis Point State`,
    id_pointtype: filterParams?.id_pointtype,
  });

  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: IFasopPointTypeState, index: number) => {
      dataTableValue.push({
        id: index + 1,
        value: item.statekey || '-',
        quality_code: item?.quality_code || '-',
        state_label: item.name,
        valid: (
          <div className='position-relative text-center w-100'>
            <Form.Check checked={!!item?.valid} disabled />
          </div>
        ),
        status: (
          <div className='position-relative text-center w-100'>
            <Form.Check checked={!!item.status} disabled />
          </div>
        ),
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

    setDataRows(dataTableValue);
  };

  /** DELETE HANDLING */
  const handleDelete = (item: any) => {
    setDataSelected(item);
    setAction('delete');
  };

  /** HANDLE ADD */
  const handleAddClick = () => {
    setDataSelected(undefined);
    setModal((prevState: any) => ({
      ...prevState,
      show: true,
    }));
  };
  const handleCopyPointClick = () => {
    setDataSelected(undefined);
    setModalCopyPoint((prevState: any) => ({
      ...prevState,
      show: true,
    }));
  };

  /** EDIT HANDLING */
  const handleEdit = (item: any) => {
    setDataSelected(item);
    setAction('edit.modal');
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

  useEffect(() => {
    if (filterParams?.id_pointtype) {
      setTriggers(
        filterParams?.id_pointtype ? filterParams?.id_pointtype : '0'
      );
    } else if (
      triggers &&
      filterParams?.id_pointtype == null &&
      !searchParams.get('point_type')
    ) {
      setTriggers('0');
    }
  }, [filterParams?.id_pointtype]);

  /** HANDLE CLOSE MODAL */
  useEffect(() => {
    if (closeModal && action) {
      setAction(undefined)
    }
  }, [closeModal])

  return (
    <>
      {filterParams?.id_pointtype && (
        <>
          <TableDataListAction
            add={
              filterParams?.id_pointtype > 0 || searchParams?.get('point_type')
                ? roleActions?.create
                : false
            }
            onClickAdd={handleAddClick}
            copyPointState={
              filterParams?.id_pointtype > 0 || searchParams?.get('point_type')
                ? roleActions?.create
                : false
            }
            onCopyPointState={handleCopyPointClick}
            columns={columns}
            setColumns={setColumns}
            module='Jenis Point State'
          ></TableDataListAction>

          <TableData
            columnsConfig={dataColumns}
            respDataApi={handleRespDataApi}
            rowData={dataRows}
            path={API_PATH().master.fasop.point_type_state}
            primaryKey={'id_pointtype_state'}
            action={action}
            selected={dataSelected}
            filterParams={
              filterParams?.id_pointtype != null
                ? filterParams
                : { id_pointtype: 0 }
            }
            trigger={triggers}
            ids={'ids'}
            pagingPresistance={false}
            module='Jenis Point State'
          ></TableData>
        </>
      )}

      <ModalForm modalProps={modal} ids='ids'>
        <JenisPointDetailForm></JenisPointDetailForm> 
      </ModalForm>
      <ModalForm modalProps={modalCopyPoint} ids='ids'>
        
        <FasJenisPointCopyDetailFormcopy  ></FasJenisPointCopyDetailFormcopy>
      </ModalForm>
    </>
  );
}

