import React, { useEffect, useState } from 'react';
import { getAllByPath } from '@app/services/main.service';
import { API_PATH } from '@app/services/_path.service';
import axios from 'axios';
import { get } from 'lodash';
import PieChartUP2DBANTEN from '../Highcharts/PieChartUP2DBANTEN';
import { Card, Row, Col,Button, Modal  } from 'react-bootstrap';
import TopBarLoader from '@app/components/Loader/TopBarLoader';
import CardInfoChildrenMonRtu from '@app/components/Card/CardInfoChildrenMonRtu';
import RTUOutOfPoolUP2DBANTEN from '@app/modules/Dashboard/RTUOutOfPoolUP2DBANTEN';
import TeleOutOfPoolUP2DBANTEN from '@app/modules/Dashboard/TeleOutOfPoolUP2DBANTEN';
import RTUOutOfPoolUP2DBANTENTable from '@app/modules/Dashboard/RTUOutOfPoolUP2DBANTENTable';
import MonitoringRTUDetailChart from '@app/pages/Dashboard/MonRTU/MonitoringRTUDetailChart';
// import moment from 'moment';

function GrafikKomulatifUP2DBANTENDami({ path = 'dashboard/fasop/monitoring-rtu/count' }: IGrafikKomulatif) {
  const [data, setData] = useState<any>([]);
  const [dataOOP, setDataOOP] = useState<any>([]);
  const [seriespie, setSeriespie] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const source = axios.CancelToken.source();
  const [showModal, setShowModal] = useState(false);
  const [clickedData, setClickedData] = useState<any>(null);

  const handlePieChartClick = (point: any, item: any) => {
    let modifiedKesimpulan = point.name;
  
    // Modifikasi kesimpulan menjadi VALID/INVALID
    if (point.name === 'NORMAL') {
      modifiedKesimpulan = 'VALID';
    } else if (point.name === 'OOP') {
      modifiedKesimpulan = 'INVALID';
    }
  
    // Menghapus kata "Total" dari nama item jika ada
    const cleanedParentName = item.name.replace(/^Total\s*/, '');
  
    // Simpan data yang di-klik
    setClickedData({
      ...point,
      name: modifiedKesimpulan,
      parentName: cleanedParentName, // Menyimpan nama level utama tanpa "Total"
    });
  
    // Tampilkan modal
    setShowModal(true);
  };
  
  
  
  const getAllData = async () => {
    setLoading(true);
    try {
      const params = { page: 1, limit: 1000 };
      const req: any = await getAllByPath(
        get(API_PATH(), path),
        params,
        source.token
      );
      const { results } = req;

      // Map data for cards
      let data = results?.total.map((d: any) => {
        d.max = d.value;
        d.icon = "fa fa-gear";
        d.sufixTitle = '';
        d.title = d?.name;
        d.classBgCard = 'bg-aqua';
        d.routeDetail = `detail/${d.name}`;
        // d.date = moment(d?.datum_2).format('DD-MM-YYYY HH:mm:ss');
        return d;
      });
      let dataOOP = results?.total_oop.map((d: any) => {
        d.max = d.value;
        d.icon = "fa fa-gear";
        d.sufixTitle = '';
        d.title = d?.name;
        d.classBgCard = 'bg-aqua';
        d.routeDetail = `detail/${d.name}`;
        // d.date = moment(d?.datum_2).format('DD-MM-YYYY HH:mm:ss');
        return d;
      });

     // Map data for pie chart
     const seriespie = results?.datachart?.map((item: any) => ({
      name: item.name,
      data: item.data.map((dataItem: any) => ({
        name: dataItem.name,
        y: dataItem.y || 0,
      })),
      total: item.total,  // Assuming `total` is part of item
    })) || [];

      setData(data);
      setDataOOP(dataOOP);
      setSeriespie(seriespie);
    } catch (err: any) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };
  const [showAllCharts, setShowAllCharts] = useState(false);

  // Fungsi untuk menampilkan lebih banyak chart
  const handleShowAllCharts = () => {
    setShowAllCharts(true);
  };

  // Fungsi untuk menyembunyikan chart kembali
  const handleHideCharts = () => {
    setShowAllCharts(false);
  };


  // Menentukan jumlah chart yang akan ditampilkan berdasarkan state
  const chartsToShow = showAllCharts ? seriespie : seriespie.slice(0, 2);

  useEffect(() => {
    // Fetch data initially
    getAllData();

    // Setup interval for fetching data every 10 seconds
    // const intervalId = setInterval(() => {
    //   getAllData();
    // }, 10000); // 10 seconds

    // Clear interval on component unmount
    return () => {
      // clearInterval(intervalId);
      source.cancel(); // Cancel ongoing requests
    };
  }, [path]);
  const handleClose = () => setShowModal(false);
  return (
    <>
      <TopBarLoader isLoading={loading} />
      <Row className='mb-2 gx-2'>
        <Col md={3}>
          <TeleOutOfPoolUP2DBANTEN />
        </Col>
        <Col md={6} sm>
          <Card className='card-widget'>
            <Card.Header className='text-uppercase'>Monitoring</Card.Header>
            <Card.Body>
              <Row>
                {data?.map((item: any, index: number) => (
                  <Col key={index} md={6} xs={12} className='mb-3 mb-md-0'>
                    <CardInfoChildrenMonRtu {...item} >
                      <div className='p-3'>
                        <div className="d-flex justify-content-center" style={{ fontSize: "3rem", fontWeight: 500 }}>{item?.max} {item?.sufixTitle}</div>
                        <div className="d-flex justify-content-center" style={{ fontSize: "1rem", fontWeight: 500 }}>{item?.date}</div>
                      </div>
                    </CardInfoChildrenMonRtu>
                  </Col>
                ))}
                {dataOOP?.map((item: any, index: number) => (
                  <Col key={index} md={6} xs={12} className='mb-3 mb-md-0'>
                    <CardInfoChildrenMonRtu {...item} >
                      <div className='p-3'>
                        <div className="d-flex justify-content-center" style={{ fontSize: "3rem", fontWeight: 500 }}>{item?.max} {item?.sufixTitle}</div>
                        <div className="d-flex justify-content-center" style={{ fontSize: "1rem", fontWeight: 500 }}>{item?.date}</div>
                      </div>
                    </CardInfoChildrenMonRtu>
                  </Col>
                ))}
              </Row>
              <Row className='mt-3'>
                    {loading ? (
                      'Loading charts...'
                    ) : (
                      chartsToShow.map((item: any) => (
                        <Col key={item.name} md={6} xs={12} className='mb-3 mb-md-4'>
                          <Card>
                            <Card.Body>
                            <PieChartUP2DBANTEN
                            title={item.name}
                            series={[item]}
                            loading={loading}
                            onclick={(point:any) => handlePieChartClick(point, item)} // Pass the click handler
                          />
                              <Card.Footer
                                className='text-center'
                                style={{
                                  backgroundColor: '#008080', // Tosca green background color
                                  color: '#fff', // White text color
                                  padding: '1rem', // Add some padding
                                  borderTop: '1px solid #ddd', // Optional border
                                  position: 'relative', // Position for pseudo-elements
                                  overflow: 'hidden', // Ensure pseudo-elements don't overflow
                                }}
                              >
                                <div className="icon-background">
                                  <i
                                    className="fa fa-cogs"
                                    style={{
                                      fontSize: '5rem',
                                      color: '#fff',
                                      position: 'absolute',
                                      top: '10px',
                                      left: '10px',
                                      opacity: 0.3,
                                    }}
                                  ></i>
                                  <i
                                    className="fa fa-bolt"
                                    style={{
                                      fontSize: '5rem',
                                      color: '#fff',
                                      position: 'absolute',
                                      bottom: '10px',
                                      right: '10px',
                                      opacity: 0.3,
                                    }}
                                  ></i>
                                </div>
                                <div
                                  className="font-weight-bold"
                                  style={{ fontSize: '2rem', color: '#fff', marginBottom: '0.5rem' }}
                                >
                                  {item.total}
                                </div>
                                <div
                                  className="font-weight-bold"
                                  style={{ fontSize: '1.5rem', color: '#fff' }}
                                >
                                  {item.name}
                                </div>
                              </Card.Footer>
                            </Card.Body>
                          </Card>
                        </Col>
                      ))
                    )}
                   <div className="text-center mt-3 mb-4">
                    {showAllCharts ? (
                      <Button onClick={handleHideCharts}>Hide</Button>
                    ) : (
                      seriespie.length > 2 && (
                        <Button onClick={handleShowAllCharts}>Show All</Button>
                      )
                    )}
                  </div>
                
                <RTUOutOfPoolUP2DBANTENTable />
                  
      {/* Modal to display when a chart point is clicked */}
     
           </Row>
   
            </Card.Body>
          </Card>
        </Col>
        <Modal show={showModal} onHide={handleClose} size="lg">
              <Modal.Header>
                <Modal.Title style={{ backgroundColor: '#008080', color: '#fff', padding: '10px', borderRadius: '5px', width: '100%' }}>
                  Daftar RTU GI OOP
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {clickedData && clickedData.name ? (
                  <MonitoringRTUDetailChart
                    filtervalues={{
                      nama_pointtype: clickedData.parentName, // Mengambil nama dari level utama
                      kesimpulan: clickedData.name, // VALID/INVALID dari klik sub-data
                    }}
                  />
                ) : (
                  'No data selected.'
                )}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>


        <Col md={3}>
          <RTUOutOfPoolUP2DBANTEN />
        </Col>
      </Row>
    </>
  );
}

export default GrafikKomulatifUP2DBANTENDami;

interface IGrafikKomulatif {
  path?: string;
  title?: any;
}
