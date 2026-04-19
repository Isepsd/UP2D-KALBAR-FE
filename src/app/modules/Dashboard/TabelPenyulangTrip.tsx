import CardWidget from '@app/components/Card/CardWidget';
import { DASHBOARD_PENYULANG_TRIP } from '@app/configs/react-table/dashboard/kinerja.cinfig';
import { API_PATH } from '@app/services/_path.service';
import React, { useState } from 'react';
import TableData from '../Table/TableData';

export default function TabelPenyulangTrip() {
  const [dataRows, setDataRows] = useState<any>([]);
  const [columns] = useState<any>(DASHBOARD_PENYULANG_TRIP());
  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
      dataTableValue.push({
        ulp: item?.key ? item?.key : '01 PONTIANAK',
        penyulang: item?.key ? item?.durasi : 'OG KAGE',
        '00_00': item?.key ? item?.durasi : '1',
        '01_00': item?.key ? item?.durasi : '1',
        '02_00': item?.key ? item?.durasi : '1',
        '03_00': item?.key ? item?.durasi : '1',
      });
    });
    setDataRows(dataTableValue);
  };

  return (
    <>
      <CardWidget title='Jam Trip/Jumlah' classNameBody='p-0'>
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
