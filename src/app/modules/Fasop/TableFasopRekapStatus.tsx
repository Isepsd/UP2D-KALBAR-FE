import React, { useState, useEffect } from 'react';

/** COMPONENTS */
import TableData from '@app/modules/Table/TableData';
import TableDataListAction from '@app/modules/Table/TableDataListAction';

type Props = { pathService: string, columnsConfig: any, primaryKey: string };

function TableFasopRekapStatus({pathService, columnsConfig, primaryKey}: Props) {
  /** DATA RESP */
  const [dataRows, setDataRows] = useState<any>([]);
  const [columns, setColumns] = useState<any>(columnsConfig);
  const [dataColumns, setDataColumns] = useState<any>([]);

  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data:any)=>{
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
      dataTableValue.push({...item});
    });

    setDataRows(dataTableValue)
  }

  useEffect(() => {
    setColumns(columnsConfig)
  }, [columnsConfig])
  

  /** COLUMN SHOW HIDE EVENT HANDLE */
  useEffect(() => {
    const cols = columns?.filter(({ show }: any) => show === true);
    setDataColumns(cols);
  }, [columns]);

  return (
    <>
      <TableDataListAction add={false} columns={columns} setColumns={setColumns}></TableDataListAction> 

      <TableData columnsConfig={dataColumns} respDataApi={handleRespDataApi} rowData={dataRows} path={pathService} primaryKey={primaryKey} deleteConfirmation />
    </>
  );
}

export default TableFasopRekapStatus