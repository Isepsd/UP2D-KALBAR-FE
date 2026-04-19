import React, { useState, useEffect } from 'react';

/** CONFIG */
import { STATUS_RTU_COLUMNS } from '@app/configs/react-table/fasop/spectrum-realtime.column'
import { timeFormat } from '@app/helper/time.helper';

/** COMPONENTS */
import TableData from '@app/modules/Table/TableData';
import TableDataListAction from '@app/modules/Table/TableDataListAction';
import RealtimeFilter from '@app/modules/Fasop/RealtimeFilter'

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';

export default function SrStatusRTUPage() {
  /** DATA RESP */
  const [dataRows, setDataRows] = useState<any>([]);
  const [columns, setColumns] = useState<any>(STATUS_RTU_COLUMNS());
  const [dataColumns, setDataColumns] = useState<any>([]);

  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data:any)=>{
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
      dataTableValue.push({
        ...item,
        jenis_rtu: item.rtu?.pointtype?.name,
        rtu: item.rtu?.path3text,
        last_update: timeFormat(item?.datum),
        status: item.kesimpulan == '1' ? 'Valid' : 'Invalid'
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
      <TableDataListAction add={false} columns={columns} setColumns={setColumns}>
        <RealtimeFilter fieldKeyword='path3text' />
      </TableDataListAction> 

      <TableData columnsConfig={dataColumns} respDataApi={handleRespDataApi} rowData={dataRows} path={API_PATH().fasop.realtime.rtu} primaryKey={'id'} deleteConfirmation />
    </>
  );
}
