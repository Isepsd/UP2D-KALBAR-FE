import React, { useEffect, useState } from 'react';
import { Card, Form, Row, Col } from 'react-bootstrap';
// import Button from '@app/components/Button/Button';
import { getAllByPath } from '@app/services/main.service';
import { API_PATH } from '@app/services/_path.service';
import TopBarLoader from '@app/components/Loader/TopBarLoader';
import axios from 'axios';
import TableData from "@app/modules/Table/TableData";
import TableDataListAction from '@app/modules/Table/TableDataListAction';
import moment from 'moment';
import ChartDs from './ChartDs';
import NoData from '@app/components/Error/NoData';
import { HIS_TRIP_DASHBOARD_COLUMNSS } from '@app/configs/react-table/fasop/spectrum-history.column';
import { timeFormatSec } from '@app/helper/time.helper';
import { Badge } from 'react-bootstrap';
export default function ResponsePembangkitPage() {
    const source = axios.CancelToken.source();
    const [loading, setLoading] = useState(false);
    const [dataTripAiron, settripAiron] = useState<any>([]);
    const [dataTripAirof, settripAirof] = useState<any>([]);
    const [dataTrip150kv20kv, settrip150kv20kv] = useState<any>([]);
    const [dataTrip150kv, settrip150kv] = useState<any>([]);
    const [columns,setColumns] = useState<any>(HIS_TRIP_DASHBOARD_COLUMNSS());
    const [dataRows, setDataRows] = useState<any>([]);
    // const [dataRtu, setdataRtu] = useState<any>([]);
    // const [dataSe, setdataSe] = useState<any>([]);
    // const [dataTrip, setdataTrip] = useState<any>([]);
    // const [dataEksFrek, setdataEksFrek] = useState<any>([]);
    // const [dataEksTeg, setdataEksTeg] = useState<any>([]);
    // const [dataTelesignal, setdataTelesignal] = useState<any>([]);
    // const [dataMaster, setdataMaster] = useState<any>([]);
    // const [dataRC, setdataRC] = useState<any>([]);


    // const [currentDate, setCurrentDate] = useState(moment().format('YYYY'));
    // const [dt1, setDt1] = useState(moment().subtract(5, 'minutes').format('HH:mm'));
    // const [dt2, setDt2] = useState(moment().format('HH:mm'));


    const handleRespDataApi = (data: any) => {
          let dataTableValue: any = [];
          data?.forEach((item: any) => {
            dataTableValue.push({
              ...item,
              b1: item?.path1,
              b2: item?.path2,
              b3: item?.path3,
              element: item?.path4,
              tanggal_awal: timeFormatSec(item.datum_1),
              tanggal_akhir: timeFormatSec(item.datum_2),
              // ocr: item?.ocr,
              
              status_beban:item?.i,
              status_ifr:item?.ifr,
              status_ifs: item?.ifs,
              status_ift:item?.ift,
              status_ifn: item?.ifn,
              status_ocr: (
                <Badge bg={item?.ocr === 1 ? 'success' : 'danger'} className="text-white">
                  {item?.ocr === 1 ? 'ON' : 'OFF'}
                </Badge>
              ),
              status_gfr: (
                <Badge bg={item?.gfr === 1 ? 'success' : 'danger'} className="text-white">
                  {item?.gfr === 1 ? 'ON' : 'OFF'}
                </Badge>
              ),
              cbtr: (
                <Badge bg={item?.cbtr === 1 ? 'success' : 'danger'} className="text-white">
                  {item?.cbtr === 1 ? 'ON' : 'OFF'}
                </Badge>
              )
            });
          });
      
          setDataRows(dataTableValue)
        }
      
    /** GET DATA  */
    const getAllTripAiron = async () => {
        setLoading(true);

        try {
            const req: any = await getAllByPath(API_PATH().dashboard.kinerja_scada.trip.grafiktransmisi, { }, source.token);
            const { results } = req;
            settripAiron(results)

            setLoading(false);
        } catch (err: any) {
            setLoading(false);
        }

    };
    const getAllTripAirof = async () => {
        setLoading(true);

        try {
            const req: any = await getAllByPath(API_PATH().dashboard.kinerja_scada.trip.grafiktransmisi, { }, source.token);
            const { results } = req;
            settripAirof(results)

            setLoading(false);
        } catch (err: any) {
            setLoading(false);
        }

    };
    const getAllTrip150kv = async () => {
        setLoading(true);

        try {
            const req: any = await getAllByPath(API_PATH().dashboard.kinerja_scada.trip.grafik150kv, { }, source.token);
            const { results } = req;
            settrip150kv(results)

            setLoading(false);
        } catch (err: any) {
            setLoading(false);
        }

    };
    const getAllTrip150kv20kv = async () => {
        setLoading(true);

        try {
            const req: any = await getAllByPath(API_PATH().dashboard.kinerja_scada.trip.grafik150kv, { }, source.token);
            const { results } = req;
            settrip150kv20kv(results)

            setLoading(false);
        } catch (err: any) {
            setLoading(false);
        }

    };


    

    useEffect(() => {
        // setCurrentDate(moment().format('YYYY'));
        // setDt1(moment().subtract(5, 'minutes').format('HH:mm'));
        // setDt2(moment().format('HH:mm'));

        getAllTripAiron();
        getAllTripAirof();
        getAllTrip150kv();
        getAllTrip150kv20kv();
       
        return () => {
            source.cancel('Request cancelled');
        };
    }, []);
    // console.log(dataTelemetring.series)

    const handleFormSubmit = (e: any) => {
        e.preventDefault();
        // Perform form submission logic here
        getAllTripAiron();
        getAllTripAirof();
        getAllTrip150kv();
        getAllTrip150kv20kv();
        // getAllDataRtu();
        // getAllDataTrip();
        // getAllDataEksFrek();
        // getAllDataTelesignal();
        // getAllDataMaster();
        // getAllDataSe();
        // getAllDataRC();
        // getAllDataEksTeg();
    };

    return (
        <>
            <TopBarLoader isLoading={loading} />
            <Card className='card-widget'>
                <Card.Header>  <h4>Dashboard Kehandalan Transmisi</h4> </Card.Header>
                <Card.Body>
                    <Form className='d-flex flex-column align-items-center mb-4' onSubmit={handleFormSubmit}>
                        <Row className='align-items-center'>
                            {/* <Col xs='auto'>
                                <InputGroup className='mb-2'>
                                    <InputGroup.Text>TAHUN</InputGroup.Text>
                                    <Form.Control type='years' name='tahun' value={currentDate} onChange={(e) => setCurrentDate(e.target.value)} />
                                </InputGroup>
                            </Col>

                            <Col xs='auto'>
                                <Button type='submit' className='mb-2'> Tampilkan </Button>
                            </Col> */}

                            {/* Add the "Print Page" button */}
                            {/* <Col xs='auto'>
                                <Button type='button' className='mb-2' onClick={() => window.print()}> Print Page </Button>
                            </Col> */}
                        </Row>
                    </Form>

                    <Row>
                        {/* {data?.map((i: any, index: number) => ( */}

                        <Col md={6} key={1} className='mb-4'>
                            <ChartDs titles={'Trip 150KV'} series={dataTrip150kv.series} categories={dataTrip150kv.categories} typeChart='column' />
                        </Col>
                        <Col md={6} key={1} className='mb-4'>
                            <ChartDs titles={'Trip 150KV Trafo OR Trip INC 20KV'} series={dataTrip150kv20kv.series} categories={dataTrip150kv20kv.categories} typeChart='column' />
                        </Col>
                        <Col md={6} key={1} className='mb-4'>
                            <ChartDs titles={'Trip + AR ON'} series={dataTripAiron.series} categories={dataTripAiron.categories} typeChart='column' />
                        </Col>
                        <Col md={6} key={1} className='mb-4'>
                            <ChartDs titles={'Trip + AR OFF'} series={dataTripAirof.series} categories={dataTripAirof.categories} typeChart='column' />
                        </Col>
                     


                        {/* <ChartDs titles={'RTU'} series={data.series} categories={data.categories} typeChart='line' /> */}
                        {/* {data?.map((i: any, index: number) => (
                            <Col md={6} key={index} className='mb-4'>

                                {i?.series?.length > 0 && (
                                    <div className='border'>
                                        <ChartDs titles={i.unit} series={i.series} categories={i.categories} typeChart='line' />
                                    </div>
                                )}
                                {i?.series?.length === 0 && (
                                    <>
                                        <h4 className="text-center font-weight-light">{i.unit}</h4>
                                        <div className="position-relative"><NoData /></div>
                                    </>
                                )}

                            </Col>
                        ))} */}

                        {dataTripAiron?.length === 0 && (
                            <>
                                <div className='border'>
                                    <div className="position-relative"><NoData /></div>
                                </div>
                            </>
                        )}
                        {dataTrip150kv?.length === 0 && (
                            <>
                                <div className='border'>
                                    <div className="position-relative"><NoData /></div>
                                </div>
                            </>
                        )}
                        {dataTripAirof?.length === 0 && (
                            <>
                                <div className='border'>
                                    <div className="position-relative"><NoData /></div>
                                </div>
                            </>
                        )}
                        {dataTrip150kv20kv?.length === 0 && (
                            <>
                                <div className='border'>
                                    <div className="position-relative"><NoData /></div>
                                </div>
                            </>
                        )}

    <TableDataListAction add={false} columns={columns} setColumns={setColumns} filterLayout="card" ></TableDataListAction>
      <TableData columnsConfig={columns} respDataApi={handleRespDataApi} rowData={dataRows} path={API_PATH().dashboard.kinerja_scada.trip.listtransmisi} primaryKey={'id_his_trip'} filterParams={{
        datum_1_after: moment().subtract(1, 'day').format('YYYY-MM-DD HH:mm:ss'),
        datum_1_before: moment().format('YYYY-MM-DD HH:mm:ss'),
        sort_by: "datum_1",
        cek_trip:1 
      }} deleteConfirmation />
      
                    </Row>
                </Card.Body>
            </Card>
        </>
    );
}
