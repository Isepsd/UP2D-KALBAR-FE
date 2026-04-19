import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import CardTitle from '@app/components/Card/CardTitle';
import BebanStatistic from '@app/modules/Dashboard/BebanStatistic';
import CardWidget from '@app/components/Card/CardWidget';
import { nanoid } from '@reduxjs/toolkit';
import LastEventUp3 from '@app/modules/Dashboard/LastEventUp3';
import GrafikKomulatif from '@app/modules/Dashboard/GrafikKomulatif';
import BebanSistem from '@app/modules/Dashboard/BebanSistem';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { API_PATH } from '@app/services/_path.service';
import TeganganTrafoBusbar from '@app/modules/Dashboard/TeganganTrafoBusbar';
import { getAllByPath } from '@app/services/main.service';
import { get } from 'lodash';
import axios from 'axios';
import TopBarLoader from '@app/components/Loader/TopBarLoader';

export default function KinerjaOpsisPage() {
  const [dataLastEvent, setDataLastEvent] = useState<any>()
  const [loading, setLoading] = useState<any>()
  const source = axios.CancelToken.source();
  /** BUSBAR REQ DATA */
  // const apiBusbarRequest = useApiRequest({
  //   url: API_PATH().dashboard.kinerja_opsis.tegangan_busbar,
  //   method: 'GET',
  // });

  /** FREQUENCY REQ DATA */
  // const apiFreqRequest = useApiRequest({
  //   url: API_PATH().dashboard.kinerja_opsis.frekuensi,
  //   method: 'GET',
  // });

  /** FREQUENCY REQ DATA */
  // const apiLastEvent = useApiRequest({
  //   url: API_PATH().dashboard.kinerja_opsis.last_event,
  //   method: 'GET',
  // });

  /** GET DATA PAGINATION */
  const getAllData = async () => {
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 300));

    try {

      const req: any = await getAllByPath(get(API_PATH(), "dashboard.kinerja_opsis.last_event"), {}, source.token);
      const { results } = req;
      setDataLastEvent(results)
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllData()
  }, [])

  return (
    <>
      <TopBarLoader isLoading={loading} />
      <Row className='gx-2 mb-1'>
        {/* LEFT  */}
        <Col md={8}>
          <div className='mb-2'>
            <BebanSistem
              title='Beban Sistem'
              path='dashboard.kinerja_opsis.beban_sistem'
              suffix='MW'
            />
          </div>
          <div className='mb-2'>
            <GrafikKomulatif
              path='dashboard.kinerja_opsis.beban_sistem_harian'
              title='Grafik Beban Sistem Hari ini'
              height='25rem'
              titleY=" MW"
            />
          </div>
          <TeganganTrafoBusbar />
          {/* <CardWidget
            className='mb-2'
            title='Tegangan Trafo Gardu Induk'
            height={'32.2rem'}
            isScroll={true}
          >
            {progressNumberParser(apiBusbarRequest?.response?.results, undefined, 'lokasi', 'nilai', 25)?.map((item: any) => (
              <div key={nanoid()}>
                <ProgressBarStats
                  title={item?.lokasi}
                  value={`${item?.value}%`}
                  width={`${item?.width}%`}
                  min={20.8}
                  max={21.5}
                  realValue={item?.value_2}                  
                ></ProgressBarStats>
              </div>
            ))}
          </CardWidget> */}
        </Col>

        {/* RIGHT  */}
        <Col md={4}>
          <BebanSistem
            title='Frekuensi Sistem'
            path='dashboard.kinerja_opsis.scd_frek_rtl'
            suffix='Hz'
            variant='primary'
            md={6}
            fieldValue="value_2"
            fieldLable="ref_frek.nama"
            filterParams={{
              page: "-1",
              limit: "-1"
            }}
          />
          {/* <CardWidget
            className={`mb-2`}
            title={`Frekuensi Sistem`}
            classNameBody=''
          >
            <CardInfo
              variant='primary'
              value={`${frekuensi} Hz`}
              suffix=""
              label={'Frekuensi'}
            />
          </CardWidget> */}
          {/* <LastEventUp3 /> */}
          <CardTitle title='LAST SISTEM UP3' className='mb-1' bg='' />
          <PerfectScrollbar style={{ height: '64.5rem' }}>
            <>
              {dataLastEvent?.map((item: any) => (
                <div key={nanoid()}>
                  <CardWidget
                    className={`mb-1`}
                    title={`Last Event UP3 ${item?.name}`}
                    height={'15rem'}
                    classNameBody='p-0'
                  >
                    <LastEventUp3 data={item?.data} />
                  </CardWidget>
                </div>
              ))}
            </>
          </PerfectScrollbar>
        </Col>
      </Row>

      <Row className='gx-2'>
        <Col md={4}>
          <CardWidget title={`Pembebanan Trafo`} height={'20rem'}>
            <BebanStatistic url={API_PATH().dashboard.kinerja_opsis.pembebanan_trafo} min={59} max={90} />
          </CardWidget>
        </Col>
        <Col md={4}>
          <CardWidget title={`Pembebanan Kopling Busbar`} height={'20rem'}>
            <BebanStatistic url={API_PATH().dashboard.kinerja_opsis.pembebanan_kopling} min={59} max={90} />
          </CardWidget>
        </Col>
        <Col md={4}>
          <CardWidget title={`Pembebanan Feeder`} height={'20rem'}>
            <BebanStatistic url={API_PATH().dashboard.kinerja_opsis.pembebanan_feeder} min={59} max={90} />
          </CardWidget>
        </Col>
      </Row>
    </>
  );
}
