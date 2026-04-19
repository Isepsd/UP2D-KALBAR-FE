import React, { useState, useEffect } from 'react';

/** COMPONENTS */
import TableData from '@app/modules/Table/TableData';
import TableDataListAction from '@app/modules/Table/TableDataListAction';

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import moment from 'moment';
moment.locale('id')

export default function LapPenyulangGangguanTahunPage() {
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
    let col: any = [{ Header: 'UP3', accessor: 'area', minWidth: '150px', disableFilters: true, show: true }]
    
    for (let index = 1; index <= 12; index++) {
      const name: any = moment(`2022${index}`, 'YYYYM').format('MMMM')

      col.push({ Header: `SKTM <= 5 ${name}`, accessor: `sktm_less_${index}`, minWidth: '220px', disableFilters: true, show: true })
      col.push({ Header: `SUTM <= 5 ${name}`, accessor: `sutm_less_${index}`, minWidth: '220px', disableFilters: true, show: true })
      col.push({ Header: `SKTM > 5 ${name}`, accessor: `sktm_more_${index}`, minWidth: '220px', disableFilters: true, show: true })
      col.push({ Header: `SUTM > 5 ${name}`, accessor: `sutm_more_${index}`, minWidth: '220px', disableFilters: true, show: true })

      col.push({ Header: `Jumlah Bulan ${name}`, accessor: `jlh_${index}`, minWidth: '300px', disableFilters: true, show: true })
    }
    
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
