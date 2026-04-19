import React, { useState, useEffect } from 'react';
import { Dropdown, Form } from 'react-bootstrap';

/** CONFIG */
import { POINT_ANALOG_DIGITAL_COLUMNS } from '@app/configs/react-table/master-fasop.columns.config';

/** COMPONENTS */
import TableData from '@app/modules/Table/TableData';
import TableDataListAction from '@app/modules/Table/TableDataListAction';

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import { IFasopCPoint } from '@app/interface/fasop-c-point.interface';
import { timeFormatAlt } from '@app/helper/time.helper';
import { useSelector } from 'react-redux';
import Filter from './Filter';
import ModalForm from '@app/components/Modals/ModalForm';
import CpointUpload from './CpointUpload';
import axios from 'axios';
import { getAllByPath } from '@app/services/main.service';
import TopBarLoader from '@app/components/Loader/TopBarLoader';
import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';

export default function FasPointAnalogDigitalPage() {
  const { closeModal } = useSelector((state: any) => state.ui);

  /** DATA RESP */
  const [dataRows, setDataRows] = useState<any>([]);
  const [dataSelected, setDataSelected] = useState<any>();
  const [action, setAction] = useState<string>();
  const source = axios.CancelToken.source();
  const [columns, setColumns] = useState<any>(POINT_ANALOG_DIGITAL_COLUMNS());
  const [dataColumns, setDataColumns] = useState<any>([]);
  const [roleActions, setRoleActions] = useState<any>({});
  const [scada, setScada] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: IFasopCPoint, index: number) => {
      dataTableValue.push({
        ...item,
        number: index + 1,
        id: item?.point_number,
        jenis_point: item?.pointtype?.name || '-',
        station: item?.station,
        point_number: item?.point_number,
        point_name: item?.point_name,
        point_text: item?.point_text || '-',
        tipe_point: item?.point_type,
        kinerja: (<div className='position-relative text-center w-100'><Form.Check defaultChecked={!!item?.kinerja} disabled /></div>),
        send_telegram: (<div className='position-relative text-center w-100'><Form.Check defaultChecked={!!item?.send_telegram} disabled /></div>),
        capture_telemetring: (<div className='position-relative text-center w-100'><Form.Check defaultChecked={!!item?.capture_telemetring} disabled /></div>),
        b1: item?.path1,
        b2: item?.path2,
        b3: item?.path3,
        path4: item?.path4,
        path5: item?.path5,
        value: item?.value,
        last_update: timeFormatAlt(item?.last_update),
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
      })
    });

    setDataRows(dataTableValue)
  }

  const getAllData = async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    try {
      const params = {
        page: -1,
        limit: -1,
        is_induk: 'INDUK',
      };


      const req: any = await getAllByPath(API_PATH().master.fasop.point_type_get, params, source.token);

      const { results } = req;
      let unit: any = []
      results?.map((item: any) => {
        unit.push({
          label: item?.name,
          value: item?.id_pointtype,
          jenis: item?.jenispoint
        })
      })
      setLoading(false)
      setScada(unit)
    } catch (err: any) {
      setScada(null)
      setLoading(false)
    }
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
    let roleAccess = ROLE_ACCESS("point-analog-digital")
    const roleAct = {
      view: ROLE_ACTION(roleAccess, 'view'),
      update: ROLE_ACTION(roleAccess, 'update'),
      delete: ROLE_ACTION(roleAccess, 'delete'),
      upload: ROLE_ACTION(roleAccess, 'upload'),
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

  useEffect(() => {
    getAllData()
  }, [])

  const [modal, setModal] = useState<any>({
    approved: false,
    size: 'md',
    title: `Form Upload Data Update CPoint`,
  });
  
  const onShowModal = () => {
    setModal((prev: any) => ({ ...prev, show: true }))
  }

  return (
    <>
      <TopBarLoader isLoading={loading} />
      {scada &&
        <>
          <TableDataListAction
            add={false}
            columns={columns}
            setColumns={setColumns}
            filterLayout='card'
            isUpload={roleActions?.upload}
            onShowModal={onShowModal}
          >
            <Filter optionsScada={scada} />
          </TableDataListAction>
          <TableData
            columnsConfig={dataColumns}
            respDataApi={handleRespDataApi}
            rowData={dataRows}
            path={API_PATH().master.fasop.c_point}
            primaryKey={'point_number'}
            action={action}
            filterParams={{ sort_by: 'updated_at' }}
            selected={dataSelected}
            deleteConfirmation
          ></TableData>
          <ModalForm modalProps={modal}>
          <CpointUpload />
        </ModalForm>
        </>
      }

    </>
  );
}
