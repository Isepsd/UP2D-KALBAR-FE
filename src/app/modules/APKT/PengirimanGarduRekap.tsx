import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'

import CardSummary from '@app/components/Card/CardSummary'

import { API_PATH } from '@app/services/_path.service';
import axios from 'axios';
import { getAllByPath } from '@app/services/main.service';
import { get } from 'lodash';
import { setLoading } from '@app/store/reducers/ui';

const bgCard: any = {
  'Laporan Open': 'bg-primary',
  'Laporan Close': 'bg-secondary',
  'Gardu Nyala': 'bg-success',
  'Gardu Padam': 'bg-danger',
};

function PengirimanGarduRekap({ trigger }: any) {
  const [data, setData] = useState<any>([]);



  const source = axios.CancelToken.source();
  /** GET DATA PAGINATION */
  const getAllData = async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    setLoading(true);

    try {

      const req: any = await getAllByPath(
        get(API_PATH(), "apkt.trans_jar_box"),
        {},
        source.token
      );
      const { results } = req;

      let data = results?.map((item: any) => ({ ...item, classBgCard: bgCard[item.name] }))
      setData(data)
      setLoading(false);
    } catch (err: any) {
      // console.log("error",);

      setLoading(false);
    }
  };



  useEffect(() => {
    getAllData()
    // const timer = setInterval(() => {
    //   getAllData()
    // }, 30000);

    return () => {
      source.cancel()
      // clearInterval(timer)
    }
  }, [trigger])

  return (
    <>
      <Row className='gx-2'>
        {
          data.map((item: any, index: number) => (
            <Col key={index} className='mb-2 col-md-6'>
              <CardSummary {...item} sufixTitle="" secondTitle={item.name} value={item?.jlh} btnDetail={false} />
            </Col>
          ))
        }
      </Row>
    </>
  )
}

export default PengirimanGarduRekap