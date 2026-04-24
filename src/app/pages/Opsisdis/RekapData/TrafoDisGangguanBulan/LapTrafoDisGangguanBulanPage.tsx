import React, { useState, useEffect } from 'react';

/** COMPONENTS */
import TableData from '@app/modules/Table/TableData';
import TableDataListAction from '@app/modules/Table/TableDataListAction';

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import moment from 'moment';

export default function LapTrafoDisGangguanBulanPage() {
  /** DATA RESP */
  const [dataRows, setDataRows] = useState<any>([]);
  const [columns, setColumns] = useState<any>([]);
  const [dataColumns, setDataColumns] = useState<any>([]);

  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
      dataTableValue.push({ ...item });
    });

    setDataRows(dataTableValue);
  };

  useEffect(() => {
    const dateStartOfMonth = parseInt(moment().startOf('month').format('D'));
    const dateEndOfMonth   = parseInt(moment().endOf('month').format('DD'));

    let col: any = [{ Header: 'UP3', accessor: 'penyebab', minWidth: '160px', disableFilters: true, show: true }]
    
    for (let index = dateStartOfMonth; index <= dateEndOfMonth; index++) {
      col.push({ Header: `TGL ${index}`, accessor: `tgl_${index}`, minWidth: '100px', disableFilters: true, show: true })
    }

    col.push({ Header: 'Jumlah', accessor: `jlh`, minWidth: '100px', disableFilters: true, show: true })
    
    setColumns(col)
  }, [])
  

  /** COLUMN SHOW HIDE EVENT HANDLE */
  useEffect(() => {
    const cols = columns?.filter(({ show }: any) => show === true);
    setDataColumns(cols);
  }, [columns]);

  return (
    <>
      <TableDataListAction add={false} columns={columns} setColumns={setColumns}></TableDataListAction> 

      <TableData
        columnsConfig={dataColumns}
        respDataApi={handleRespDataApi}
        rowData={dataRows}
        path={API_PATH().fasop.kinerja.analog_hari} primaryKey={'id_kin_analog_harian'}
        deleteConfirmation
      />
    </>
  );
}
