import React, { useState, useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';
/** CONFIG */
import { MASTER_FREQUENSI_METER } from '@app/configs/react-table/master-opsisdis.columns.config';

/** COMPONENTS */
import TableData from '@app/modules/Table/TableData';
import TableDataListAction from '@app/modules/Table/TableDataListAction';

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import BadgeStatus from '@app/components/Status/BadgeStatus';
import { IFrequensi } from '@app/interface/master-data-opsisdis-frequensi';
import { useSelector } from 'react-redux';
import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';

export default function FrequensiMeterPage() {
  const { closeModal } = useSelector((state: any) => state.ui);

  /** DATA RESP */
  const [dataRows, setDataRows] = useState<any>([]);
  const [dataSelected, setDataSelected] = useState<any>();
  const [action, setAction] = useState<string>();
  const [roleActions, setRoleActions] = useState<any>({});
  const [columns, setColumns] = useState<any>(MASTER_FREQUENSI_METER());
  const [dataColumns, setDataColumns] = useState<any>([]);

  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: IFrequensi, index: number) => {
      dataTableValue.push({
        number: item.number,
        id: item?.id_meter,
        nama: item?.nama,
        datascada:item?.datascada,
        point_number:item?.point_number,
        path1: item?.path1,
        path2: item?.path2,
        path3: item?.path3,
        koneksi: item?.lokasi,
        mode: item?.general_mode,
        lokasi: item?.lokasi,
        address: item?.general_address,
        slave_id: item?.general_slaveid,
        interval_logging: item?.general_interval_logging,
        xonxoff: item?.serial_xonxoff ? 'RTU ENABLE' : 'RTU DISBALED',
        byte_size: item?.serial_bytesize,
        baud_rate: item?.serial_baudrate,
        port: item?.serial_port,
        stop_bits: item?.serial_stopbits ? 'ONE' : '-',
        scale: item?.general_scale,
        parity: item?.serial_parity,
        serial: item?.serial_port,
        ip_host: item?.ip_host,
        ip_port: item?.ip_port,
        status: (
          <BadgeStatus status={item?.status}></BadgeStatus>
        ),
        logging: (
          <BadgeStatus status={item?.general_logging} trueMsg='True' falseMsg='False'></BadgeStatus>
        ),
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

    setDataRows(dataTableValue)
  }

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
    let roleAccess = ROLE_ACCESS("frequensi-meter")
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
        path={API_PATH().master.opsisdis.frequensi}
        primaryKey={'id_meter'}
        action={action}
        selected={dataSelected}
        deleteConfirmation
      ></TableData>
    </>
  );
}
