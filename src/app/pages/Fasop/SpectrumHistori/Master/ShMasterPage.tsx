import React, { useState, useEffect } from 'react';
import moment from 'moment';

/** CONFIG */
import { HIS_MASTER_COLUMNS } from '@app/configs/react-table/fasop/spectrum-history.column';

/** COMPONENTS */
import TableData from '@app/modules/Table/TableData';
import TableDataListAction from '@app/modules/Table/TableDataListAction';
import HistoryFilter from '@app/modules/Fasop/HistoryFilter'

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import { timeFormat } from '@app/helper/time.helper';

export default function ShMasterPage() {
  /** DATA RESP */
  const [dataRows, setDataRows] = useState<any>([]);
  const [columns, setColumns] = useState<any>(HIS_MASTER_COLUMNS());
  const [dataColumns, setDataColumns] = useState<any>([]);

  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data:any)=>{
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
      dataTableValue.push({
        ...item,
        master: item.master?.path3text,
        tanggal_awal: timeFormat(item.datum_1),
        tanggal_akhir: timeFormat(item.datum_2),
        msec_awal: item?.statekey_1,
        msec_akhir: item?.statekey_2,
        status_awal: item.status_1 == '1' ? 'runUp' : 'notCon',
        status_akhir: item.status_2 == '1' ? 'runUp' : 'notCon',
        kesimpulan: item.kesimpulan == '1' ? 'Valid' : 'Invalid',
        durasi: moment.utc(moment(item.datum_2).diff(moment(item.datum_1))).format("DD:HH:mm:ss"),
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
        <HistoryFilter  selectProps={{ fieldName: 'id_pointtype', pathServiceName: 'master.fasop.point_type', labelField: 'name', valueField: 'id_pointtype', placeholder: 'Pilih Jenis Point' }} queryParams={{page: -1, jenispoint: 'MASTER'}} isJenisPoint={false} fieldKeyword='path3text'
        />
      </TableDataListAction> 

      <TableData columnsConfig={dataColumns} respDataApi={handleRespDataApi} rowData={dataRows} path={API_PATH().fasop.history.master} primaryKey={'id'} filterParams={{ datum_1_after: moment().subtract(1, 'day').format('YYYY-MM-DD HH:mm'), datum_1_before: moment().format('YYYY-MM-DD HH:mm') }}  deleteConfirmation />
    </>
  );
}
