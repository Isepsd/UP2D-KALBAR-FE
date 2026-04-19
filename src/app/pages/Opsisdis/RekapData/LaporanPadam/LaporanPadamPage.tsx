import TableDataListAction from '@app/modules/Table/TableDataListAction';
import { API_PATH } from '@app/services/_path.service';
import React, { useEffect, useState } from 'react'
import Filter from './Filter';
import TableData from '@app/modules/Table/TableData';
import { LAPORAN_GANGGUAN } from '@app/configs/react-table/opsisdis/rekap-data/laporan-gangguan.column';


export default function LaporanPadamPage() {
  /** DATA RESP */
  const [dataRows, setDataRows] = useState<any>([]);
  const [dataSelected] = useState<any>();
  const [action] = useState<string>();

  const [columns, setColumns] = useState<any>(LAPORAN_GANGGUAN());
  const [dataColumns, setDataColumns] = useState<any>([]);

  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
      dataTableValue.push({
        number: item.number,
        id: item?.id_meter,
        ufr: item?.id_meter,
        penyulang: item?.id_meter,
        gardu_induk: item?.id_meter,

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
      <TableDataListAction
        add={true}
        columns={columns}
        setColumns={setColumns}
        module="Rekam Padam"
        filterLayout="card"
      >
        <Filter />
      </TableDataListAction>
      <div className='mb-4'>
        <TableData
          columnsConfig={dataColumns}
          respDataApi={handleRespDataApi}
          rowData={dataRows}
          path={API_PATH().master.opsisdis.frequensi}
          primaryKey={'id_meter'}
          action={action}
          selected={dataSelected}
        />
      </div>     
      </>
      )
}
