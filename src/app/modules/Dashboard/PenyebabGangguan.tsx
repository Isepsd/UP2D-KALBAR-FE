import CardWidget from '@app/components/Card/CardWidget';
import { KINERJA_PENYULANG_PENYEBAB_GANGGUAN } from '@app/configs/react-table/dashboard/kinerja.cinfig';
import { API_PATH } from '@app/services/_path.service';
import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import BarChart from '../Highcharts/BarChart';
import PieChart from '../Highcharts/PieChart';
import TableData from '../Table/TableData';

export default function PenyebabGangguan() {
  const [dataRows, setDataRows] = useState<any>([]);
  const [columns] = useState<any>(KINERJA_PENYULANG_PENYEBAB_GANGGUAN());
  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
      dataTableValue.push({
        fgtm: item?.key ? item?.key : 'POHON',
        jumlah: item?.key ? item?.durasi : '12',
      });
      dataTableValue.push({
        fgtm: item?.key ? item?.key : 'LAYANG-LAYANG',
        jumlah: item?.key ? item?.durasi : '45',
      });
      dataTableValue.push({
        fgtm: item?.key ? item?.key : 'BENCANA ALAM',
        jumlah: item?.key ? item?.durasi : '50',
      });
    });
    // console.log('dataTableValue', dataTableValue);

    setDataRows(dataTableValue);
  };
  const series = [
    {
      name: 'Penyebab Gangguan',
      data: [12, 45, 50],
    },
  ];
  const categories = ['POHON', 'LAYANG-LAYANG', 'BENCANA ALAM'];

  const seriesPie = [
    {
      name: 'Penyebab Gangguan',
      data: [
        {
          name: 'POHON',
          y: 12,
        },
        {
          name: 'LAYANG-LAYANG',
          y: 45,
        },
        {
          name: 'BENCANA ALAM',
          y: 50,
        },
      ],
    },
  ];

  return (
    <>
      <CardWidget title='PenyEbab/indikasi gangguan'>
        <div style={{ height: '20rem' }}>
          <BarChart series={series} categories={categories} type='column' />
        </div>
        <div style={{height:'24.5rem'}}>
          <Row>
            <Col md={7}>
              <TableData
                columnsConfig={columns}
                respDataApi={handleRespDataApi}
                rowData={dataRows}
                path={API_PATH().master.fasop.path1}
                primaryKey={'id_ref_lokasi'}
                paging={{ show: false }}
              />
            </Col>
            <Col md={5}>
              <PieChart series={seriesPie} />
            </Col>
          </Row>
        </div>
      </CardWidget>
    </>
  );
}
