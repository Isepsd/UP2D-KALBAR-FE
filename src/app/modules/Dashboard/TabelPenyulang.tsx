import CardWidget from '@app/components/Card/CardWidget';
import { DASHBOARD_PENYULANG_TRIP_DAY } from '@app/configs/react-table/dashboard/kinerja.cinfig';
import { API_PATH } from '@app/services/_path.service';
import React, { useState } from 'react';
import TableData from '../Table/TableData';

export default function TabelPenyulang() {
  const [dataRows, setDataRows] = useState<any>([]);
  const [columns] = useState<any>(DASHBOARD_PENYULANG_TRIP_DAY());
  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
      dataTableValue.push({
        bulan: item?.key ? item?.key : 'JAN',
        penyulang: item?.key ? item?.durasi : 'OG KAGE',
        1: 1,
        2: 4,
        3: 5,
      });
      dataTableValue.push({
        bulan: item?.key ? item?.key : 'FEB',
        penyulang: item?.key ? item?.durasi : 'OG KAGE',
        1: 1,
        2: 4,
        3: 5,
      });
      dataTableValue.push({
        bulan: item?.key ? item?.key : 'MAR',
        penyulang: item?.key ? item?.durasi : 'OG KAGE',
        1: 1,
        2: 4,
        3: 5,
      });
    });
    setDataRows(dataTableValue);
  };
  return (
    <>
      <CardWidget title='Tanggal Trip/Jumlah' classNameBody='p-0'>
        <TableData
          columnsConfig={columns}
          respDataApi={handleRespDataApi}
          rowData={dataRows}
          path={API_PATH().master.fasop.path1}
          primaryKey={'id_ref_lokasi'}
          paging={{ show: false }}
          containerClass={'table table-responsive'}
        />
      </CardWidget>
    </>
  );
}
