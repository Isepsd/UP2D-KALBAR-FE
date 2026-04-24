import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import CardInfo from '@app/components/Card/CardInfo';
import TableData from '@app/modules/Table/TableData';
import { KINERJA_PENYULANG_STATISTIC_UP3 } from '@app/configs/react-table/dashboard/kinerja.cinfig';
import { API_PATH } from '@app/services/_path.service';
import JenisGangguan from '@app/modules/Dashboard/JenisGangguan';
import PenyebabGangguan from '@app/modules/Dashboard/PenyebabGangguan';
import HistoryGangguanPenyulang from '@app/modules/Dashboard/HistoryGangguanPenyulang';
import KapasitasPenyulang from '@app/modules/Dashboard/KapasitasPenyulang';
import TabelPenyulangTrip from '@app/modules/Dashboard/TabelPenyulangTrip';
import TabelPenyulang from '@app/modules/Dashboard/TabelPenyulang';
import Filter from './Filter';
import CardWidget from '@app/components/Card/CardWidget';
export default function KinerjaPenyulangPage() {
  const [dataRows, setDataRows] = useState<any>([]);
  const [columns] = useState<any>(KINERJA_PENYULANG_STATISTIC_UP3());
  const data = [
    {
      label: 'SAIDI',
      value: '99',
      suffix: '',
    },
    {
      label: 'saifi',
      value: '100',
      suffix: '',
    },
    {
      label: 'total ens',
      value: '995',
      suffix: '%',
    },
  ];

  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
      dataTableValue.push({
        key: item?.key ? item?.key : '-',
        durasi: item?.key ? item?.durasi : '-',
      });

      setDataRows(dataTableValue);
    });
  };
  return (
    <>
      <Row className='gx-2 mb-2'>
        <Col md={5}>
          <CardWidget title='Filter'>
            <Filter />
          </CardWidget>
        </Col>
        <Col md={7}>
          <CardWidget>
            <Row className='gx-3'>
              <Col md='3' sm>
                {data?.map((item: any, index: number) => (
                  <CardInfo
                    variant='info'
                    value={item?.value}
                    suffix={item?.suffix}
                    label={item?.label}
                    key={index}
                    height={'7.75rem'}
                  />
                ))}
              </Col>
              <Col md={9}>
                <TableData
                  columnsConfig={columns}
                  respDataApi={handleRespDataApi}
                  rowData={dataRows}
                  path={API_PATH().master.fasop.path1}
                  primaryKey={'id_ref_lokasi'}
                  paging={{ show: false }}
                  containerClass={'my-1 table table-responsive'}
                />
              </Col>
            </Row>
          </CardWidget>
        </Col>
      </Row>
      <Row className='gx-2'>
        <Col md={6} className='mb-3'>
          <JenisGangguan />
        </Col>
        <Col md={6} className='mb-3'>
          <PenyebabGangguan />
        </Col>
        <Col md={12} className='mb-3'>
          <HistoryGangguanPenyulang />
        </Col>
        <Col md={12} className='mb-3'>
          <KapasitasPenyulang />
        </Col>
        <Col md={12} className='mb-3'>
          <TabelPenyulangTrip />
        </Col>
        <Col md={12} className='mb-3'>
          <TabelPenyulang />
        </Col>
      </Row>
    </>
  );
}
