import React, { useState, useEffect } from 'react';

/** CONFIG */
import { STATUS_DIGITAL_COLUMNS } from '@app/configs/react-table/fasop/spectrum-realtime.column'
import { timeFormat } from '@app/helper/time.helper';

/** COMPONENTS */
import TableData from '@app/modules/Table/TableData';
import TableDataListAction from '@app/modules/Table/TableDataListAction';
import RealtimeFilter from '@app/modules/Fasop/RealtimeFilter'

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';

export default function SrStatusAnalogPage() {
  /** DATA RESP */
  const [dataRows, setDataRows] = useState<any>([]);
  const [columns, setColumns] = useState<any>(STATUS_DIGITAL_COLUMNS());
  const [dataColumns, setDataColumns] = useState<any>([]);

  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data:any)=>{
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
      dataTableValue.push({
        ...item,
        jenis: item?.c_point?.pointtype?.name,
        b1: item.c_point?.path1text,
        b2: item.c_point?.path2text,
        b3: item.c_point?.path3text,
        element: item.c_point?.path4text,
        info: item.c_point?.path5text,
        value: item?.value,
        datetime: timeFormat(item?.datum),
        status: item.kesimpulan
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
        <RealtimeFilter selectProps={{ fieldName: 'id_pointtype', pathServiceName: 'master.fasop.point_type', labelField: 'name', valueField: 'id_pointtype', placeholder: 'Pilih Jenis Point' }} queryParams={{page: -1, jenispoint: 'ANALOG'}} isJenisPoint fieldKeyword='path3text' />
      </TableDataListAction> 

      <TableData columnsConfig={dataColumns} respDataApi={handleRespDataApi} rowData={dataRows} path={API_PATH().fasop.realtime.analog} primaryKey={'id'} deleteConfirmation />
    </>
  );
}
