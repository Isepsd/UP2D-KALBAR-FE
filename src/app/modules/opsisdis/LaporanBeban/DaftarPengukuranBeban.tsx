import React, { useState, useEffect } from 'react';
import moment from 'moment';
moment.locale('id')

/** COMPONENTS */
import TableData from '@app/modules/Table/TableData';
import TableDataListAction from '@app/modules/Table/TableDataListAction';

/** CONFIGS */
import { DAFTAR_PENGUKURAN_BEBAN_COLUMN } from '@app/configs/react-table/opsisdis/laporan-beban.column.config'

import { timeFormat } from '@app/helper/time.helper';

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';

export default function DaftarPengukuranBeban() {
  /** DATA RESP */
  const [dataRows, setDataRows] = useState<any>([]);
  const [columns, setColumns] = useState<any>(DAFTAR_PENGUKURAN_BEBAN_COLUMN());
  const [dataColumns, setDataColumns] = useState<any>([]);

  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data:any)=>{
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
      dataTableValue.push({
        ...item,
        tanggal: timeFormat(new Date()),
        gi: 'GI',
        no_trafo: 'Trafo',
        penyulang: 'Penyulang',
        pengukuran: 'Pengukuran'
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
      <TableDataListAction add={false} columns={columns} setColumns={setColumns} spaceTop={0}>
      </TableDataListAction> 

      <TableData columnsConfig={dataColumns} respDataApi={handleRespDataApi} rowData={dataRows} path={API_PATH().fasop.history.digital} primaryKey={'id'} filterParams={{ datum_1_after: moment().subtract(1, 'day').format('YYYY-MM-DD HH:mm'), datum_1_before: moment().format('YYYY-MM-DD HH:mm') }}  deleteConfirmation />
    </>
  );
}
