import CardWidget from '@app/components/Card/CardWidget';
import { KINERJA_PENYULANG_JENIS_GANGGUAN } from '@app/configs/react-table/dashboard/kinerja.cinfig';
import { API_PATH } from '@app/services/_path.service';
import React, { useState } from 'react';
import BarChart from '../Highcharts/BarChart';
import TableData from '../Table/TableData';

export default function JenisGangguan() {
  const [dataRows, setDataRows] = useState<any>([]);
  const [columns] = useState<any>(KINERJA_PENYULANG_JENIS_GANGGUAN());
  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
      dataTableValue.push({
        ulp: item?.key ? item?.key : 'ULP Pontianak',
        penyulang: item?.key ? item?.durasi : 'OG KAGE',
        jumlah: item?.key ? item?.durasi : '7',
        avg_rct: item?.key ? item?.durasi : '4',
        permanen: item?.key ? item?.durasi : '4',
        sesaat: item?.key ? item?.durasi : '3',
        ens: item?.key ? item?.durasi : '7812',
        agv_rct: item?.key ? item?.durasi : '44.1',
      });
      dataTableValue.push({
        ulp: item?.key ? item?.key : 'ULP Pontianak',
        penyulang: item?.key ? item?.durasi : 'KANWIL',
        jumlah: item?.key ? item?.durasi : '7',
        avg_rct: item?.key ? item?.durasi : '4',
        permanen: item?.key ? item?.durasi : '5',
        sesaat: item?.key ? item?.durasi : '2',
        ens: item?.key ? item?.durasi : '7812',
        agv_rct: item?.key ? item?.durasi : '44.1',
      });
    });

    setDataRows(dataTableValue);
  };
  const series = [
    {
      name: 'PERMANEN',
      data: [4, 5],
    },
    {
      name: 'SESAAT',
      data: [3, 2],
    },
  ];
  const categories = ['OG KAGE', 'KANWIL'];

  return (
    <CardWidget title='Jenis gangguan'>
      <div style={{ height: '20rem' }}>
        <BarChart series={series} categories={categories} type='column' />
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
  );
}
