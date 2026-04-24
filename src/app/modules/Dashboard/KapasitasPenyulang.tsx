import CardWidget from '@app/components/Card/CardWidget';
import { KAPASITAS_PENYULANG } from '@app/configs/react-table/dashboard/kinerja.cinfig';
import { API_PATH } from '@app/services/_path.service';
import React, { useState } from 'react';
import SplineChart from '../Highcharts/SplineChart';
import TableData from '../Table/TableData';

export default function KapasitasPenyulang() {
  const [dataRows, setDataRows] = useState<any>([]);
  const [columns] = useState<any>(KAPASITAS_PENYULANG());
  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
      dataTableValue.push({
        tanggal: item?.key ? item?.key : '01-01-2022',
        penyulang: item?.key ? item?.durasi : 'OG KAGE',
        batas_atas: item?.key ? item?.durasi : '18.01',
        batas_bawah: item?.key ? item?.durasi : '22.00',
        nilai: item?.key ? item?.durasi : '21.20',
      });
      dataTableValue.push({
        tanggal: item?.key ? item?.key : '01-01-2022',
        penyulang: item?.key ? item?.durasi : 'OG KAGE',
        batas_atas: item?.key ? item?.durasi : '18.01',
        batas_bawah: item?.key ? item?.durasi : '22.00',
        nilai: item?.key ? item?.durasi : '20.22',
      });
      dataTableValue.push({
        tanggal: item?.key ? item?.key : '03-01-2022',
        penyulang: item?.key ? item?.durasi : 'OG KAGE',
        batas_atas: item?.key ? item?.durasi : '18.01',
        batas_bawah: item?.key ? item?.durasi : '22.00',
        nilai: item?.key ? item?.durasi : '19.10',
      });
      dataTableValue.push({
        tanggal: item?.key ? item?.key : '04-01-2022',
        penyulang: item?.key ? item?.durasi : 'OG KAGE',
        batas_atas: item?.key ? item?.durasi : '18.01',
        batas_bawah: item?.key ? item?.durasi : '22.00',
        nilai: item?.key ? item?.durasi : '21.10',
      });
    });
    setDataRows(dataTableValue);
  };

  const series = [
    {
      name: 'OG KAGE',
      data: [21.2, 20.22, 19.1, 21.1],
    },
  ];
  const categories = [
    '01 JAN 2022',
    '02 JAN 2022',
    '03 JAN 2022',
    '04 JAN 2022',
  ];

  return (
    <>
      <CardWidget title='Kapasitas penyulang yang melebihi ambang batas'>
        <div style={{ height: '20rem' }}>
          <SplineChart
            series={series}
            categories={categories}
            legend={
              {
                // layout: 'horizontal',
                // align: 'bottom',
                // verticalAlign: 'bottom',
              }
            }
          />
        </div>
        <TableData
          columnsConfig={columns}
          respDataApi={handleRespDataApi}
          rowData={dataRows}
          path={API_PATH().master.fasop.path1}
          primaryKey={'id_ref_lokasi'}
          paging={{ show: false }}
        />
      </CardWidget>
    </>
  );
}
