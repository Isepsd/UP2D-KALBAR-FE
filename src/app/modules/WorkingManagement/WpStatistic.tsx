import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';

import CardSummary from '@app/components/Card/CardSummary';
import axios from 'axios';
import { getAllByPath } from '@app/services/main.service';


function WpStatistic() {
  const source = axios.CancelToken.source();
  const [data, setData] = useState<any>([
    {
      id: 'total',
      value: 0,
      sufixTitle: '',
      secondTitle: 'TOTAL WP',
      classBgCard: 'bg-info',
      routeDetail: '/wm/view-data/-1',
      // routeDetail: '/wm/working-permit',
    },
    {
      id: 'belumdisetujui',
      value: 0,
      sufixTitle: '',
      secondTitle: 'WP BELUM DISETUJUI',
      classBgCard: 'bg-danger',
      routeDetail: '/wm/view-data/3',
      // routeDetail: '/wm/approval-k3l',
    },
    {
      id: 'disetujui',
      value: 0,
      sufixTitle: '',
      secondTitle: 'WP DISETUJUI',
      classBgCard: 'bg-yellow',
      routeDetail: '/wm/view-data/6',
      // routeDetail: '/wm/approval-close',
    },
    {
      id: 'close',
      value: 0,
      sufixTitle: '',
      secondTitle: 'WP CLOSE',
      classBgCard: 'bg-success',
      routeDetail: '/wm/view-data/7',
      // routeDetail: '/wm/wp-close',
    },
  ])

  /** GET DATA  */
  const getAllData = async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    try {
      const req: any = await getAllByPath(
        'working-permit/online/online-dashboard',
        {},
        source.token
      );

      const { results } = req;
      let newData = data
      newData[0].value = results?.total
      newData[1].value = results?.disetujui
      newData[2].value = results?.belumdisetujui
      newData[3].value = results?.close
      setData([...newData])

    } catch (err: any) {
    }
  };

  useEffect(() => {
    getAllData()

    return () => {
      source.cancel()
      setData([])
    }
  }, [])


  return (
    <>
      <Row>
        {data.map((item: any, index: number) => (
          <Col key={index} md={3} xs={12} className='mb-3 mb-md-0'>
            <CardSummary {...item} />
          </Col>
        ))}
      </Row>
    </>
  );
}

export default WpStatistic;
