import React, {useMemo, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import moment from 'moment';
import StatisticKinerjaScada from '@app/modules/Dashboard/StatisticKinerjaScada';
import GrafikKomulatifUP2DBANTEN from '@app/modules/Dashboard/GrafikKomulatifUP2DBANTEN';
// import GrafikKomulatifUP2DBANTENInfo from '@app/modules/Dashboard/GrafikKomulatifUP2DBANTENInfo';
import Filter from './Filter';
// import StatisticKinerjaScadaUP2DBANTEN from '@app/modules/Dashboard/StatisticKinerjaScadaUP2DBANTEN';
import CardWidget from '@app/components/Card/CardWidget';
import { nanoid } from '@reduxjs/toolkit';
import RTUOutOfPool from '@app/modules/Dashboard/RTUOutOfPool';
import {
  CONFIG_INFO_RTU,
  CONFIG_RTU_POOL,
} from '@app/configs/kinerja-scada.config';
import {
  CONFIG_GRAFIK_KOMULATIF,
} from '@app/configs/kinerja-scada-UP2D.config';

export default function KinerjaScadaPage() {

  const [grafikKomulatif] = useState<any>(CONFIG_GRAFIK_KOMULATIF);
  const [rtuPool] = useState<any>(CONFIG_RTU_POOL);
  const [infoRTU] = useState<any>(CONFIG_INFO_RTU);
  const [filterValues, setFilterValues] = useState<any>({
    kinerja_scada: 'SCADA',
    nama_induk_pointtype: 'RTU',
    tahun: moment().format('YYYY'),
    bulan:'',
  });

  const handleFilterChange = (newFilterValues: any) => {
    setFilterValues(newFilterValues);
  };



  const pathMap:any = {
    SCADA: 'dashboard_up2d_banten.kinerja_scada',
    RC: 'dashboard_up2d_banten.kinerja_rc',
    TRIP: 'dashboard_up2d_banten.kinerja_trip',
  };

  const getPathBasedOnKinerjaScada = (basePath: string) => {
    return pathMap[filterValues.kinerja_scada] || `${basePath}.default`; // Default path or handle unknown cases
  };
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
      <CardWidget title='Filter'>
        <Filter onFilterChange={handleFilterChange} />
      </CardWidget>
      <hr />
    

      <hr />
      <Row className='gx-2'>
        <Col md={8} className='mb-4'>
          {grafikKomulatif?.map((item: any) => (
            <div className='mb-2' key={nanoid()}>
              <GrafikKomulatifUP2DBANTEN
                path={getPathBasedOnKinerjaScada(item?.basePath)} // Update path dynamically
                title={item?.title}
                filterParams={{ ...item?.filterParams, ...filterValues }}
              />
            </div>
          ))}
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
                  <RTUOutOfPool />
                </Col>
                  
             
      </Row>
     
    </>
  );
}
