import React, { useState, useEffect } from 'react';

/** CONFIG */
import { HIS_REMOTE_COLUMNS } from '@app/configs/react-table/fasop/spectrum-history.column';

/** COMPONENTS */
import TableData from '@app/modules/Table/TableData';
import TableDataListAction from '@app/modules/Table/TableDataListAction';
// eslint-disable-next-line @typescript-eslint/no-unused-vars

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import RCFilter from '@app/modules/Fasop/RCFilter';
// import moment from 'moment';

export default function ShRemoteControlPage() {
  /** DATA RESP */
  const [dataRows, setDataRows] = useState<any>([]);
  const [columns, setColumns] = useState<any>(HIS_REMOTE_COLUMNS());
  const [dataColumns, setDataColumns] = useState<any>([]);

  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
      dataTableValue.push({
        ...item,
        path1: item?.path1,
        path2: item?.path2,
        path3: item?.path3,
        path4: item?.path4,
        operator: item?.msg_operator,
        tgl_mulai_remote: item?.datum_1,
        tgl_selesai_remote: item?.datum_2,
        // status_1: item?.status_1,
        status_remote: item?.status_2,
        durasi: item?.durasi,
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
      {/* <TableDataListAction add={false} columns={columns} setColumns={setColumns}>
        <HistoryFilter keywordName='B1' selectProps={{ fieldName: 'id_pointtype', pathServiceName: 'master.fasop.point_type', labelField: 'name', valueField: 'id_pointtype', placeholder: 'Pilih Jenis Point' }} queryParams={{page: -1, jenispoint: 'TRIP'}} isJenisPoint={false}
        />
      </TableDataListAction>  */}

      <TableDataListAction add={false} columns={columns} setColumns={setColumns} filterLayout='card'>
        <RCFilter />
      </TableDataListAction>

      <TableData 
       columnsConfig={dataColumns} 
       respDataApi={handleRespDataApi}
       rowData={dataRows} 
       path={API_PATH().fasop.laporan_scada.histori_rc} 
       primaryKey={'id_his_rc'} 
       deleteConfirmation 
       />
    </>
  );  
}
