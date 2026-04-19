import React, { useState, useEffect } from 'react';

/** CONFIG */
import { PICKUP_SOE_COLUMNS } from '@app/configs/react-table/fasop/soe.column';

/** COMPONENTS */
import TableData from '@app/modules/Table/TableData';
import TableDataListAction from '@app/modules/Table/TableDataListAction';
import PickUpFilter from './PickUpFilter'

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';

export default function ShMessagePage() {
  /** DATA RESP */
  const [dataRows, setDataRows] = useState<any>([]);
  const [columns, setColumns] = useState<any>(PICKUP_SOE_COLUMNS());
  const [dataColumns, setDataColumns] = useState<any>([]);

  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
      dataTableValue.push({
        ...item,
        tanggal: item.tanggal,
        b1: item?.path1text,
        b2: item?.path2text,
        b3: item?.path3text,
        path4: item?.path4,
        info: item?.path5text,
        message: item?.point_text,       
      });
    });

    setDataRows(dataTableValue)
  }

  /** COLUMN SHOW HIDE EVENT HANDLE */
  useEffect(() => {
    const cols = columns?.filter(({ show }: any) => show === true);
    setDataColumns(cols);
  }, [columns]);

  return (
    <>
      <TableDataListAction add={false} columns={columns} setColumns={setColumns} filterLayout='card'>
        <PickUpFilter />
      </TableDataListAction>

      <TableData columnsConfig={dataColumns} respDataApi={handleRespDataApi} rowData={dataRows} path={API_PATH().fasop.laporan_scada.soe_alarm_proteksi} primaryKey={'id_kin_digital_harian'} deleteConfirmation />
    </>
  );
}
