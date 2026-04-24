import React, { useState, useEffect } from 'react';

/** CONFIG */

/** COMPONENTS */
import TableData from '@app/modules/Table/TableData';
import TableDataListAction from '@app/modules/Table/TableDataListAction';

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import { timeFormat } from '@app/helper/time.helper';
import { KIN_RC } from '@app/configs/react-table/fasop/spectrum-kinerja.column';
import RCKinFilter from '@app/modules/Fasop/RCKinFilter';

export default function SkRemoteControlPage() {
  /** DATA RESP */
  const [dataRows, setDataRows] = useState<any>([]);
  const [columns, setColumns] = useState<any>(KIN_RC());
  const [dataColumns, setDataColumns] = useState<any>([]);

  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
      dataTableValue.push({
        ...item,
        tanggal: timeFormat(item.datum_1),
        path1: item?.path1,
        path2: item?.path2,
        path3: item?.path3,
        element: item?.path4,
        jlm_rc: item?.jlm_rc,
        performance: item?.performance ? item?.performance : "0.0",
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
        <RCKinFilter />
      </TableDataListAction>

      <TableData 
      columnsConfig={dataColumns}
       respDataApi={handleRespDataApi} 
       rowData={dataRows} 
       path={API_PATH().fasop.laporan_scada.kinerja_rc} 
       primaryKey={'id'} 
       deleteConfirmation />
    </>
  );
}
