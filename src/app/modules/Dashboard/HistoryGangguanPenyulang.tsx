import CardWidget from '@app/components/Card/CardWidget';
import { KINERJA_PENYULANG_HISTORY_GANGGUAN_PENYULANG } from '@app/configs/react-table/dashboard/kinerja.cinfig';
import { API_PATH } from '@app/services/_path.service';
import React, { useState } from 'react';
import TableData from '../Table/TableData';

export default function HistoryGangguanPenyulang() {
  const [dataRows, setDataRows] = useState<any>([]);
  const [columns] = useState<any>(
    KINERJA_PENYULANG_HISTORY_GANGGUAN_PENYULANG()
  );
  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
      dataTableValue.push({
        bulan: item?.key ? item?.key : 'JUNI',
        tanggal: item?.key ? item?.durasi : '8',
        penyulang: item?.key ? item?.durasi : 'OG KAGE',
        trip: item?.key ? item?.durasi : '0.8',
        indikasi: item?.key ? item?.durasi : 'RG>>',
        rct: item?.key ? item?.durasi : '1',
        ens: item?.key ? item?.durasi : '',
        cuaca: item?.key ? item?.durasi : 'CERAH',
        fr: item?.key ? item?.durasi : '394',
        fs: item?.key ? item?.durasi : '122',
        fn: item?.key ? item?.durasi : '258',
        ft: item?.key ? item?.durasi : '120',
        kelompok: item?.key ? item?.durasi : 'SUTM-LAYANAN',
        gangguan: item?.key ? item?.durasi : '',
        keterangan: item?.key ? item?.durasi : 'GT J',
      });
    });
    setDataRows(dataTableValue);
  };

  return (
    <>
      <CardWidget title='Histori Gangguan Penyulang' classNameBody='p-0'>
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
