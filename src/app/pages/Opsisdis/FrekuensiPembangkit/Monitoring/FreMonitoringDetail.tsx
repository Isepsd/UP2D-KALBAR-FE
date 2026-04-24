import React, { useEffect, useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import moment from 'moment';
import axios from 'axios';
import TopBarLoader from '@app/components/Loader/TopBarLoader';
import { getAllByPath, getByIdPath } from '@app/services/main.service';
import CardInfoChildren from '@app/components/Card/CardInfoChildren'
import { useParams } from 'react-router-dom';
import WiHighchartsSpline from '@app/components/Widgets/WiHighchartsSpline';


function FreMonitoringDetail() {
  const { id } = useParams();
  const source = axios.CancelToken.source();

  const [loading, setLoading] = useState<boolean>();
  const [data, setData] = useState<any>([]);
  const [dataChart, setDataChart] = useState<any>([]);
  const [categories, setCategories] = useState<any>([]);
  const [label, setLabel] = useState<string>('');
  const [pagination] = useState<any>({
    perPage: 10,
    offset: 0,
    currentPage: 1,
    pageCount: 10,
    totalData: 0,
    marginPagesDisplayed: 2,
    pageRangeDisplayed: 7,
  });

  /** GET APPLICATION */
  const getDataById = async () => {
    setLoading(true);
    try {
      const req: any = await getByIdPath(
        'opsisdis/frekuensi/scd-frek-rtl',
        id,
        source.token
      );
      const { results } = req;
      let data: any = [
        { value: results?.value_2, date: moment(results?.datum_2).format('DD-MM-YYYY HH:mm:ss'), icon: "fa fa-gear", sufixTitle: 'Hz', title: 'real time', classBgCard: 'bg-aqua' },
        { value: results?.min_value, date: moment(results?.datum_2).format('DD-MM-YYYY HH:mm:ss'), icon: "fa fa-gear", sufixTitle: 'Hz', title: 'min', classBgCard: 'bg-aqua' },
        { value: results?.max_value, date: moment(results?.datum_2).format('DD-MM-YYYY HH:mm:ss'), icon: "fa fa-gear", sufixTitle: 'Hz', title: 'max', classBgCard: 'bg-aqua' }
      ]

      setLabel(results?.ref_frek.nama)
      setData(data)

      setTimeout(() => {
        getDataById();
      }, 5000);

    } catch {
      setLoading(false);

      setTimeout(() => {
        getDataById();
      }, 5000);
    }
  };

  const getDataChartById = async () => {
    try {

      let params = {
        id_meter: id,
        page: pagination.currentPage,
        limit: pagination.perPage,
        // datum_2: moment().format("YYYY-MM-DD")
      }
      const req: any = await getAllByPath(
        'opsisdis/frekuensi/scd-trans-frek-5m',
        params,
        source.token
      );
      const { results } = req;

      let cat: any = []
      let datac: any = []
      results?.map((d: any) => {
        cat.push(moment(d?.datum_2).format('DD-MM-YYYY HH:mm:ss'))
        datac.push(d.value_2)
      });
      // if (pagination.currentPage > 2 && pagination.currentPage % 3 == 0) {
      //   cat = cat.slice(pagination.currentPage)
      //   datac = datac.slice(pagination.currentPage)
      // }


      setCategories(cat)
      setDataChart(datac)

      setTimeout(() => {
        getDataChartById();
      }, 5000);
    } catch {
      setTimeout(() => {
        getDataChartById();
      }, 5000);
    }
  };

  // const timer = () => {
  //   setPagination(
  //     {
  //       ...pagination,
  //       currentPage: pagination.currentPage++
  //     }
  //   )
  // };


  /** READ PAGINATION AND FILTER CHANGE */
  useEffect(() => {
    getDataById();
    getDataChartById();

    // const refreshData = setInterval(() => {
    //   getDataById();
    //   getDataChartById();
    // }, 5000);
    return () => {
      source.cancel()
      // clearInterval(refreshData)
    }
  }, []);

  // useEffect(() => {
  //   getDataChartById();
  // }, [pagination.currentPage]);

  return (
    <>
      <TopBarLoader isLoading={loading} />
      <Row>
        <Col md={12} className='mb-4'>
          <Card className='card-widget'>
            <Card.Header className='text-uppercase'>Monitoring {label}</Card.Header>
            <Card.Body>
              <Row>
                {
                  data?.map((item: any, index: number) => (
                    <Col key={index} md={3} xs={12} className='mb-4'>
                      <CardInfoChildren {...item} detail={false} >
                        <div className='p-3'>
                          <div className="d-flex justify-content-center" style={{ fontSize: "3rem", fontWeight: 500 }}>{item?.value} {item?.sufixTitle}</div>
                          <div className="d-flex justify-content-center" style={{ fontSize: "1rem", fontWeight: 500 }}>{item?.date}</div>
                        </div>
                      </CardInfoChildren>
                    </Col>
                  ))
                }
                <Col md={12} className="mt-3">
                  <div style={{ height: '60vh' }}>
                    <WiHighchartsSpline
                      name="Frequensi"
                      data={dataChart}
                      categories={categories} legend={true} />
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

    </>
  )
}

export default FreMonitoringDetail