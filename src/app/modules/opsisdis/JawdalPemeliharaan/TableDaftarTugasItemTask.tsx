import React, { useState, useEffect } from 'react';
import moment from 'moment';
moment.locale('id')

/** COMPONENTS */
import TableData from '@app/modules/Table/TableData';

/** CONFIGS */
import { TASK_ITEM_PEMELIHARAAN_COLUMN } from '@app/configs/react-table/opsisdis/jadwal-pemeliharaan.column'

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';

function TableDaftarTugasItemTask({dataSelected}: any) {
  /** DATA RESP */
  const [dataRows, setDataRows] = useState<any>([]);
  const [columns] = useState<any>(TASK_ITEM_PEMELIHARAAN_COLUMN());
  const [dataColumns, setDataColumns] = useState<any>([]);

  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data:any)=>{
    let dataTableValue: any = [];
    data?.forEach(() => {
      dataTableValue.push({
        nomor: '1',
        item_task: '	CORE 2 Fasa R - Tanah',
        nilai_acuan: 'Standar : > 1 MO/kV',
        satuan: 'kV',
        tipe: 'posting',
      });
    });

    setDataRows(dataTableValue)
  }

  /** COLUMN SHOW HIDE EVENT HANDLE */
  useEffect(() => {
    // console.log(dataSelected);
    dataSelected;
    
    const cols = columns?.filter(({ show }: any) => show === true);
    setDataColumns(cols);
  }, [columns]);

  return (
    <TableData columnsConfig={dataColumns} respDataApi={handleRespDataApi} rowData={dataRows} path={API_PATH().master.fasop.point_type} primaryKey={'id'} filterParams={{ datum_1_after: moment().subtract(1, 'day').format('YYYY-MM-DD HH:mm'), datum_1_before: moment().format('YYYY-MM-DD HH:mm') }}  deleteConfirmation />
  )
}

export default TableDaftarTugasItemTask