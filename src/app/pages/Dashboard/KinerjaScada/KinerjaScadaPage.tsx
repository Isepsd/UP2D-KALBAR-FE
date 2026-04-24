import React, { useMemo, useState } from 'react';
import { Col, Row } from 'react-bootstrap';

import GrafikKomulatif from '@app/modules/Dashboard/GrafikKomulatif';
import StatisticKinerjaScada from '@app/modules/Dashboard/StatisticKinerjaScada';
import {
  CONFIG_BOX_BULANAN,
  CONFIG_BOX_KOMULATIF,
  CONFIG_GRAFIK_KOMULATIF,
  CONFIG_INFO_RTU,
  CONFIG_RTU_POOL,
} from '@app/configs/kinerja-scada.config';
import RTUOutOfPool from '@app/modules/Dashboard/RTUOutOfPool';
// import TMTSOutOfPool from '@app/modules/Dashboard/TMTSOutOfPool';
import CardWidget from '@app/components/Card/CardWidget';
import { nanoid } from '@reduxjs/toolkit';
export default function KinerjaScadaPage() {
  const [boxBulanan] = useState<any>(CONFIG_BOX_BULANAN);
  const [boxKomulatif] = useState<any>(CONFIG_BOX_KOMULATIF);
  const [grafikKomulatif] = useState<any>(CONFIG_GRAFIK_KOMULATIF);
  const [infoRTU] = useState<any>(CONFIG_INFO_RTU);
  const [rtuPool] = useState<any>(CONFIG_RTU_POOL);

  const renderGrafikKomulatif = useMemo(() => {
    return grafikKomulatif?.map((item: any) => {
      return (
        <div className='mb-2' key={nanoid()}>
          <GrafikKomulatif path={item?.path} title={item?.title} />
        </div>
      );
    });
  }, [grafikKomulatif]);

  const renderBoxBulanan = useMemo(() => {
    return boxBulanan?.map((item: any) => {
      return (
        <Col md={3} key={nanoid()} className='mb-2'>
          <StatisticKinerjaScada
            key={nanoid()}
            variant={item?.variant}
            path={item?.path}
            suffix={item?.suffix}
            label={item?.label}
            fieldName='nilai_bulanan'
          />
        </Col>
      );
    });
  }, [grafikKomulatif]);

  const renderBoxKomulatif = useMemo(() => {
    return boxKomulatif?.map((item: any) => {
      return (
        <Col md={3} key={nanoid()} className='mb-2'>
          <StatisticKinerjaScada
            key={nanoid()}
            variant={item?.variant}
            path={item?.path}
            suffix={item?.suffix}
            label={item?.label}
            fieldName='nilai_komulatif'
          />
        </Col>
      );
    });
  }, [grafikKomulatif]);

  const renderInfoRTU = useMemo(() => {
    return rtuPool?.map((item: any) => {
      return (
        <Col md={6} key={nanoid()} className='mb-2'>
          <StatisticKinerjaScada
            key={nanoid()}
            variant='primary'
            path={item?.path}
            suffix={item?.suffix}
            label={item?.label}
            fieldName='value'
            height='7.65rem'
          />
        </Col>
      );
    });
  }, [grafikKomulatif]);

  return (
    <>
      {/* KINERJA SCADA  */}
      <Row className='mb-2 gx-2'>
        <Col md={8} sm>
          <CardWidget title='Kinerja SCADA'>
            <Row className='gx-1'>
              <Col md='12'>
                <div className='d-flex justify-content-left mt-2'>
                  <strong>BULAN INI</strong>
                </div>
              </Col>

              {renderBoxBulanan}

              <Col md='12'>
                <hr />

                <div className='d-flex justify-content-left'>
                  <strong>KOMULATIF TAHUN {new Date().getFullYear()} SAMPAI BULAN INI</strong>
                </div>
              </Col>

              {renderBoxKomulatif}
            </Row>
          </CardWidget>
        </Col>
        <Col md={4} sm>
          <CardWidget title='JUMLAH RTU'>
            <Row className='gx-1'>
              {/* <Col md='12'>
                <div className='d-flex justify-content-left mt-2'>
                  <strong>Jumlah RTU Sudah Integrasi SCADA</strong>
                </div>
              </Col> */}
              {infoRTU?.map((item: any, index: number) => (
                <Col md={3} key={index} className='mb-2'>
                  <StatisticKinerjaScada
                    key={index}
                    variant='primary'
                    path={item?.path}
                    filterParams={item?.filterParams}
                    suffix={item?.suffix}
                    label={item?.label}
                    fieldName='value'
                  />
                </Col>
              ))}
              <hr className='my-3' />

              {renderInfoRTU}
            </Row>
          </CardWidget>
        </Col>
      </Row>

      <Row className='gx-2'>
        <Col md={8} className='mb-4'>
          {renderGrafikKomulatif}
        </Col>
        <Col md={4}>
          <RTUOutOfPool />
          {/* <TMTSOutOfPool /> */}
        </Col>
       
      </Row>
      
    </>
  );
}
