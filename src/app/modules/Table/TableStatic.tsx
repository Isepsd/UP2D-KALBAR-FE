import React, { useMemo, useState, useEffect } from 'react';

import ReactTable from '@app/components/ReactTable';
import { ROLE_COLUMNS } from '@app/configs/react-table/admin.columns.config';

export default function TableStatic({ columnsConfig, rowsData, containerClass="table-responsive mt-3", styles }: ITableStatic) {
  /** DATA RESP */
  const [data, setData] = useState<any>([]);

  /** COLUMN FILTER */
  const [columns, setColumns] = useState<any>(ROLE_COLUMNS());
  const [dataColumns, setDataColumns] = useState<any>([]);

  useEffect(() => {
    setData(rowsData);
  }, [rowsData]);

  useEffect(() => {
    setColumns(columnsConfig);
  }, [columnsConfig]);

  const dataTable = useMemo(() => data, [data]);

  /** COLUMN SHOW HIDE EVENT HANDLE */
  useEffect(() => {
    const cols = columns?.filter(({ show }: any) => show === true);
    setDataColumns(cols);
  }, [columns]);

  return (
    <>
      <ReactTable containerClass={containerClass} columns={dataColumns} data={dataTable} styles={styles} />
    </>
  );
}

interface ITableStatic {
  columnsConfig: any;
  rowsData: any;
  containerClass?: any;
  styles?: any;
}
