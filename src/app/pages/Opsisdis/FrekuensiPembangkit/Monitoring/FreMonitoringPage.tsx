import React, { useEffect, useState } from 'react'
import { Col, Row, Card } from 'react-bootstrap'
import moment from 'moment';
import CardInfoChildren from '@app/components/Card/CardInfoChildren'
import axios from 'axios';
import { getAllByPath } from '@app/services/main.service';
import TopBarLoader from '@app/components/Loader/TopBarLoader';

export default function FreMonitoringPage() {
  const source = axios.CancelToken.source();

  const [loading, setLoading] = useState<boolean>();
  const [data, setData] = useState<any>([]);
  /** GET DATA PAGINATION */
  const getAllData = async () => {
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 300));

    try {
      const params = {
        page: 1,
        limit: 1000
      };

      const req: any = await getAllByPath('opsisdis/frekuensi/scd-frek-rtl', params, source.token);

      const { results } = req;
      let data = results?.map((d: any) => {
        d.min = d.value_1;
        d.max = d.value_2;
        d.icon = "fa fa-gear";
        d.sufixTitle = 'Hz';
        d.title = d?.ref_frek.nama;
        d.classBgCard = 'bg-aqua';
        d.routeDetail = `detail/${d.id_meter}`
        d.date = moment(d?.datum_2).format('DD-MM-YYYY HH:mm:ss')
        // d.status = d?.statusdata_1 == "1" ? "Connected" : "Disconected"
        d.status = d?.statusdevice_2
        return d;
      });

      setData(data);
      setLoading(false);

      setTimeout(() => {
        getAllData()
      }, 5000);

    } catch (err: any) {
      setLoading(false);

      setTimeout(() => {
        getAllData();
      }, 5000);
    }
  };

  /** READ PAGINATION AND FILTER CHANGE */
  useEffect(() => {
    getAllData();
    return () => {
      source.cancel()
    }
  }, []);

  return (
    <>
      <TopBarLoader isLoading={loading} />

      <Row>
        <Col md={12} className='mb-4'>
          <Card className='card-widget'>
            <Card.Header className='text-uppercase'>Monitoring</Card.Header>
            <Card.Body>
              <Row>
                {
                  data?.map((item: any, index: number) => (
                    <Col key={index} md={3} xs={12} className='mb-3 mb-md-0'>
                      <CardInfoChildren {...item} >
                        <div className='p-3'>
                          <div className="d-flex justify-content-center" style={{ fontSize: "3rem", fontWeight: 500 }}>{item?.max} {item?.sufixTitle}</div>
                          <div className='d-flex justify-content-center' style={{ fontSize: "1.3rem", fontWeight: 500 }}>{item?.status}</div>
                          <div className="d-flex justify-content-center" style={{ fontSize: "1rem", fontWeight: 500 }}>{item?.date}</div>
                        </div>


                      </CardInfoChildren>

                      {/* <CardInfoChildren {...item} >
                        <div className='p-3'>
                          <div className='d-flex flex-row-reverse fs-7 align-middle'>
                            {item?.date} <i className="fa fa-calendar ms-2 me-2"></i>
                          </div>
                          <div className='d-flex flex-row-reverse' style={{ fontSize: "3rem", fontWeight: 500 }}>{item?.status}</div>
                        </div>
                        <div className="d-flex justify-content-center" style={{ fontSize: "2rem", fontWeight: 500 }}>{item?.max} {item?.sufixTitle}</div>
                      </CardInfoChildren> */}
                    </Col>
                  ))
                }
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>

  )
}
