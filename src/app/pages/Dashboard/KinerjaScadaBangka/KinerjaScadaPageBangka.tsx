import React, { useMemo, useState } from 'react';
import { Col, Row } from 'react-bootstrap';

import GrafikKomulatifBabel from '@app/modules/Dashboard/GrafikKomulatifBabel';

import StatisticKinerjaScadaBangka from '@app/modules/Dashboard/StatisticKinerjaScadaBangka';

import {
  CONFIG_BOX_BULANAN,
  CONFIG_BOX_KOMULATIF,
  CONFIG_GRAFIK_KOMULATIF,
  CONFIG_INFO_RTU,CONFIG_BOX_BULANAN_LALU

} from '@app/configs/kinerja-scada-Bangka.config';

import CardWidget from '@app/components/Card/CardWidget';
import { nanoid } from '@reduxjs/toolkit';
export default function KinerjaScadaPage() {
  const [boxBulanan] = useState<any>(CONFIG_BOX_BULANAN);
  const [boxBulananlalu] = useState<any>(CONFIG_BOX_BULANAN_LALU);
  const [boxKomulatif] = useState<any>(CONFIG_BOX_KOMULATIF);
  const [grafikKomulatif] = useState<any>(CONFIG_GRAFIK_KOMULATIF);
  const [infoRTU] = useState<any>(CONFIG_INFO_RTU);
 
  const renderGrafikKomulatifBabel = useMemo(() => {
    return grafikKomulatif?.map((item: any) => {
      return (
        <div className='mb-2' key={nanoid()}>
          <GrafikKomulatifBabel path={item?.path} title={item?.title}  filterParams={item.filterParams}  />
        </div>
      );
    });
  }, [grafikKomulatif]);

  const renderBoxBulanan = useMemo(() => {
    return boxBulanan?.map((item: any) => {
      return (
        <Col md={3} key={nanoid()} className='mb-2'>
          <StatisticKinerjaScadaBangka
            key={nanoid()}
            variant={item?.variant}
            path={item?.path}
            suffix={item?.suffix}
            label={item?.label}
            filterParams={item?.filterParams}
            fieldName='value'
          />
        </Col>
      );
    });
  }, [grafikKomulatif]);



  const renderBoxBulananLalu = useMemo(() => {
    return boxBulananlalu?.map((item: any) => {
      return (
        <Col md={3} key={nanoid()} className='mb-2'>
          <StatisticKinerjaScadaBangka
            key={nanoid()}
            variant={item?.variant}
            path={item?.path}
            suffix={item?.suffix}
            label={item?.label}
            filterParams={item?.filterParams}
            fieldName='value'
          />
        </Col>
      );
    });
  }, [grafikKomulatif]);

  const renderBoxKomulatif = useMemo(() => {
    return boxKomulatif?.map((item: any) => {
      return (
        <Col md={3} key={nanoid()} className='mb-2'>
          <StatisticKinerjaScadaBangka
            key={nanoid()}
            variant={item?.variant}
            path={item?.path}
            suffix={item?.suffix}
            label={item?.label}
            filterParams={item?.filterParams}
            fieldName='value'
          />
        </Col>
      );
    });
  }, [grafikKomulatif]);

 

  return (
    <>
      {/* Kinerja SCADA ULTG Bangka  */}
      <Row className='mb-2 gx-2'>
        <Col md={8} sm>
          <CardWidget title='Kinerja SCADA ULTG Bangka'>
            <Row className='gx-1'>
              <Col md='12'>
                <div className='d-flex justify-content-left mt-2'>
                  <strong>BULAN INI</strong>
                </div>
              </Col>

              {renderBoxBulanan}
              <hr />
              <Col md='12'>
                <div className='d-flex justify-content-left mt-2'>
                  <strong>BULAN KEMARIN</strong>
                </div>
              </Col>

              {renderBoxBulananLalu}


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
               <StatisticKinerjaScadaBangka
                    key={index}
                    variant='primary'
                    path={item?.path}
                    suffix={item?.suffix}
                    label={item?.label}
                    filterParams={item?.filterParams}
                    fieldName='value'
                  />
                </Col>
              ))}
             
            </Row>
          </CardWidget>
        </Col>
      </Row>

      <Row className='gx-2'>
        <Col md={8} className='mb-4'>
          {renderGrafikKomulatifBabel}
        </Col>
        {/* <Col md={4}>
          <RTUOutOfPool />
        </Col> */}
      </Row>
    </>
  );
}
