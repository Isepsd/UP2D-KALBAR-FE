import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Tabs, Tab } from 'react-bootstrap';
import axios from 'axios';
import moment from 'moment';

import { getByIdPath } from '@app/services/main.service';

import { API_PATH } from '@app/services/_path.service';
import { useNavigate, useParams } from 'react-router-dom';
import TableNyalaBertahap from './TableNyalaBertahap';
import TablePeralatanFIOHL from './TabelPeralatanFIOHL';
import TablePeralatanRC from './TablePeralatanRC';
import TopBarLoader from '@app/components/Loader/TopBarLoader';


function DetailRekapPadam() {
  const source = axios.CancelToken.source();
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>()
  const { id } = useParams();
  const navigate = useNavigate();
  /** GET EDIT DATA */
  const getDataById = async () => {
    setLoading(true);
    try {
      const req: any = await getByIdPath(
        API_PATH().opsisdis.rekap_padam.trans_ep, id,
        source.token
      );
      // console.log("req", req);

      setData(req?.results)

      setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDataById()
  }, [])


  return (
    <>
      <TopBarLoader isLoading={loading} />
      <Row>
        <Col md={12} className='mb-4 position-static'>
          <Card>
            <Card.Body>
              <Tabs
                defaultActiveKey="info"
                id="uncontrolled-tab-example"
                className="mb-3"
              >
                <Tab eventKey="info" title="Info Padam Aktif">
                  <Row>
                    <Col md={6}>
                      <Row>
                        <Col md={3} className="mb-1"><strong>No. Event</strong></Col>
                        <Col md={9} className="mb-2">{data?.no_event || "-"}</Col>
                        <Col md={3} className="mb-1"><strong>No APKT</strong></Col>
                        <Col md={9} className="mb-2">{data?.no_apkt || "-"}</Col>
                        <Col md={3} className="mb-1"><strong> Jam Padam</strong></Col>
                        <Col md={9} className="mb-2">{data?.jam_padam ? moment(data?.jam_padam).format("DD MMM YYYY HH:mm:ss") : "-"}</Col>
                        <Col md={3} className="mb-1"><strong>Penyebab</strong></Col>
                        <Col md={9} className="mb-2">{data?.penyebab || "-"}</Col>
                        <Col md={3} className="mb-1"><strong>Jenis Padam</strong></Col>
                        <Col md={9} className="mb-2">{data?.jenis_padam || "-"}</Col>

                        <Col md={3} className="mb-1"><strong>Keterangan</strong></Col>
                        <Col md={9} className="mb-2">{data?.keterangan || "-"}</Col>
                        <Col md={3} className="mb-1"><strong> Beban Padam</strong></Col>
                        <Col md={9} className="mb-2">{data?.beban_padam || "-"}</Col>
                        <Col md={3} className="mb-1"><strong>Indikasi</strong></Col>
                        <Col md={9} className="mb-2">{data?.ref_ep_indikasi?.nama || "-"}</Col>
                      </Row>
                      <Row>

                        <Col md={3} className="mb-1"><strong>FAI arus gangguan HMI</strong></Col>
                        <Col md={8} className="mb-2">{data?.ref_fai_arus_ggn_hmi?.nama || "-"}</Col>

                        <div className='mb-3 mt-5'>
                          <strong>Peralatan Padam</strong>
                        </div>

                        <Col md={3} className="mb-1"><strong> LBS Manual</strong></Col>
                        <Col md={8} className="mb-2">{data?.lbs_manual || "-"}</Col>
                        <Col md={3} className="mb-1"><strong>Jenis Peralatan</strong></Col>
                        <Col md={8} className="mb-2">{data?.jenis_keypoint || "-"}</Col>
                        <Col md={3} className="mb-1"><strong>Peralatan</strong></Col>
                        <Col md={8} className="mb-2">{data?.keypoint?.nama_lokasi || "-"}</Col>
                        <Col md={3} className="mb-1"><strong>Zona</strong></Col>
                        <Col md={8} className="mb-2">{data?.zone || "-"}</Col>
                        <Col md={3} className="mb-1"><strong>Gardu Hubung</strong></Col>
                        <Col md={8} className="mb-2">{data?.zone || "-"}</Col>
                        <Col md={3} className="mb-1"><strong>Penyulang GI</strong></Col>
                        <Col md={8} className="mb-2">{data?.zone || "-"}</Col>
                        <Col md={3} className="mb-1"><strong>Gardu Induk</strong></Col>
                        <Col md={8} className="mb-2">{data?.zone || "-"}</Col>
                        <Col md={3} className="mb-1"><strong>UP3</strong></Col>
                        <Col md={8} className="mb-2">{data?.zone || "-"}</Col>
                        <Col md={3} className="mb-1"><strong>ULP</strong></Col>
                        <Col md={8} className="mb-2">{data?.zone || "-"}</Col>
                        <Col md={3} className="mb-1"><strong> Gardu Padam</strong></Col>
                        <Col md={8} className="mb-2">{data?.total_gardu_padam || "-"}</Col>
                        <Col md={3} className="mb-1"><strong> Pelanggan TM</strong></Col>
                        <Col md={8} className="mb-2">{data?.pelanggan_tm || "-"}</Col>
                        <Col md={3} className="mb-1"><strong>   Pelanggan VIP</strong></Col>
                        <Col md={8} className="mb-2">{data?.pelanggan_vip || "-"}</Col>
                        <Col md={3} className="mb-1"><strong> Wilayah Padam</strong></Col>
                        <Col md={8} className="mb-2">{data?.pelanggan_vip || "-"}</Col>


                      </Row>
                    </Col>
                    <Col md={6}>
                      <strong>Arus Gangguan</strong>
                      <Row>
                        <Col className="mb-1 ms-2"><strong>R</strong></Col>
                        <Col className="mb-1  ms-2"><strong>S</strong></Col>
                        <Col className="mb-1  ms-2"><strong>T</strong></Col>
                        <Col className="mb-1  ms-2"><strong>N</strong></Col>
                      </Row>
                      <Row>
                        <Col className="mb-2  ms-2">{data?.r || "-"}</Col>
                        <Col className="mb-2  ms-2 ">{data?.s || "-"}</Col>
                        <Col className="mb-2  ms-2">{data?.t || "-"}</Col>
                        <Col className="mb-2  ms-2">{data?.n || "-"}</Col>
                      </Row>

                      <Row>
                        <Col md={5} className="mb-1"><strong>Jam Normal</strong></Col>
                        <Col md={7} className="mb-2">{data?.jam_normal ? moment(data?.jam_normal).format("DD MMM YYYY HH:mm:ss") : "-"}</Col>
                      </Row>
                      <Col md={12}>
                        <Card className='card-widget position-static'>
                          <Card.Header className='text-uppercase'>
                            Nyala Bertahap
                          </Card.Header>
                          <Card.Body>
                            {id &&
                              <TableNyalaBertahap idTransEp={id} update={false} />
                            }
                          </Card.Body>
                        </Card>
                      </Col>

                      <Row>
                        <Col md={5} className="mb-1"><strong>Cuaca</strong></Col>
                        <Col md={7} className="mb-2">{data?.cuaca || "-"}</Col>
                      </Row>
                      <div className='mb-3'>
                        <strong>Total Gangguan</strong>
                      </div>
                      <Row>
                        <Col md={5} className="mb-1"><strong>Total gangguan 1 bulan</strong></Col>
                        <Col md={7} className="mb-2">{data?.cuaca || "-"}</Col>
                        <Col md={5} className="mb-1"><strong>Total gangguan dalam 1 tahun</strong></Col>
                        <Col md={7} className="mb-2">{data?.cuaca || "-"}</Col>
                      </Row>
                    </Col>
                  </Row>

                </Tab>
                <Tab eventKey="profile" title="Pemeriksaan Lanjutan">
                  <Row>
                    <Col md={6}>
                      <Row>
                        <Col md={5}>
                          <strong>Kategori Gangguan</strong>
                        </Col>
                        <Col md={7}>{data?.ref_gangguan?.nama}</Col>
                        <Col md={5}>
                          <strong>Penyebab Gangguan</strong>
                        </Col>
                        <Col md={7}>{data?.ref_gangguan?.nama}</Col>
                        <Col md={5}>
                          <strong>Gangguan Ditemukan</strong>
                        </Col>
                        <Col md={7}>{data?.ref_gangguan?.nama}</Col>
                        <Col md={5}>
                          <strong>Keterangan Gangguan</strong>
                        </Col>
                        <Col md={7}>{data?.ref_gangguan?.nama}</Col>

                        <Col md={5}>
                          <strong>FAI Arus Gangguan HMI</strong>
                        </Col>
                        <Col md={7}>{data?.ref_gangguan?.nama}</Col>
                        <Col md={4}>
                          <strong>ACO Kerja</strong>
                        </Col>
                        <Col md={7}>{data?.ref_gangguan?.nama}</Col>
                      </Row>
                      <div>
                        {id &&
                          <>
                            <TablePeralatanRC
                              create={false}
                              update={false}
                              idTransEp={id}
                            />

                          </>
                        }
                      </div>
                    </Col>
                    <Col md={6}>
                      <Row>
                        <Col md={4}>
                          <strong>Kategori Gangguan</strong>
                        </Col>
                        <Col md={8}>{data?.ref_gangguan?.nama}</Col>
                        <Col md={4}>
                          <strong>Penyebab Gangguan</strong>
                        </Col>
                        <Col md={8}>{data?.ref_gangguan?.nama}</Col>
                        <Col md={4}>
                          <strong>Gangguan Ditemukan</strong>
                        </Col>
                        <Col md={8}>{data?.ref_gangguan?.nama}</Col>

                        <Col md={4}>
                          <strong>Dispatcher DCC 1</strong>
                        </Col>
                        <Col md={8}>{data?.ref_gangguan?.nama}</Col>
                        <Col md={4}>
                          <strong>Dispatcher DCC 2</strong>
                        </Col>
                        <Col md={8}>{data?.ref_gangguan?.nama}</Col>
                        <Col md={4}>
                          <strong>Dispatcher DCC 3</strong>
                        </Col>
                        <Col md={8}>{data?.ref_gangguan?.nama}</Col>
                      </Row>
                      <div>
                        {id &&
                          <>

                            <TablePeralatanFIOHL
                              create={false}
                              update={false}
                              idTransEp={id}
                            />
                          </>
                        }
                      </div>
                    </Col>
                  </Row>
                </Tab>
              </Tabs>
              <div className='d-flex gap-2'>
                <a className='btn btn-danger' type='button' onClick={() => { navigate(-1) }}>
                  Back
                </a>
              </div>

            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default DetailRekapPadam;
