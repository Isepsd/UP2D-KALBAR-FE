/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import CreatableSelect from 'react-select/creatable';

import { getAllByPath } from '@app/services/main.service';
import { API_PATH } from '@app/services/_path.service';
import axios from 'axios';
import TopBarLoader from '@app/components/Loader/TopBarLoader';
import { Controller, useWatch } from 'react-hook-form';
import InputUpload from '@app/components/Upload/InputUpload';

interface IFomDataAPDKeselamatan {
  register: any;
  dataSelected?: any;
  control: any;
  setValue?: any;
}

export default function FormDataKelengkapanPekerjaan({
  register,
  control,
  setValue,
}: // dataSelected
  IFomDataAPDKeselamatan) {
  const source = axios.CancelToken.source();

  const [loading, setLoading] = useState<boolean>(false);
  const [dataKlasifikasi, setDataKlasifikasi] = useState<any>();
  const typePekerjaan = ['klasifikasi', 'prosedur', 'lampiran'];

  /** GET DATA PAGINATION */
  const getAllData = async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    setLoading(true);

    // try {
    const params = {
      page: 1,
      limit: 100,
    };

    const req: any = await getAllByPath(
      API_PATH().master.working_permit.kel_pekerjaan,
      params,
      source.token
    );
    const { results } = req;
    let list_jobs: any = {
      klasifikasi: [],
      prosedur: [],
      lampiran: [],
    };
    // console.log("result", results);

    typePekerjaan.map((item: any) => {
      const result = results.filter((obj: any) => {
        return obj.kategori === item;
      });
      list_jobs[item] = result;
    });
    // console.log("list_jobs", list_jobs);

    setDataKlasifikasi(list_jobs);
    setLoading(false);
    //   } catch (err: any) {
    //     setLoading(false);
    //   }
  };

  useEffect(() => {
    getAllData();
    return () => {
      source.cancel();
    };
  }, []);

  const lampiran1 = useWatch({ control, name: 'lampiran1' });
  const lampiran2 = useWatch({ control, name: 'lampiran2' });
  const lampiran3 = useWatch({ control, name: 'lampiran3' });
  const lampiran4 = useWatch({ control, name: 'lampiran4' });
  const lampiran5 = useWatch({ control, name: 'lampiran5' });
  const klasifikasi10status = useWatch({ control, name: 'klasifikasi10status', });
  const prosedur10status = useWatch({ control, name: 'prosedur10status' });
  const lampiran1_path = useWatch({ control, name: 'lampiran1_path' });
  const lampiran2_path = useWatch({ control, name: 'lampiran2_path' });
  const lampiran3_path = useWatch({ control, name: 'lampiran3_path' });
  const lampiran4_path = useWatch({ control, name: 'lampiran4_path' });
  const lampiran5_path = useWatch({ control, name: 'lampiran5_path' });

  return (
    <>
      <TopBarLoader isLoading={loading} />
      <Row>
        {dataKlasifikasi?.klasifikasi.length > 0 && (
          <Col md='12' xs='12'>
            <Form.Group as={Row} className='mb-3'>
              <Form.Label column md='2'>
                Klasifikasi Pekerjaan
                <div>
                  <span className='small text-danger'>
                    *Pilih minimal 1
                  </span>
                </div>
              </Form.Label>
              <Col md='10'>
                <Row>
                  {dataKlasifikasi?.klasifikasi?.map(
                    (item: any, index: number) => (
                      <Col className='mb-2' md='4' key={index}>
                        <Form.Check
                          inline
                          {...register(
                            item?.alias != 'klasifikasi10'
                              ? item?.alias
                              : `${item?.alias}status`
                          )}
                          label={item?.name}
                          title='item?.alias'
                        />
                        {klasifikasi10status && item?.alias == "klasifikasi10" && (
                          <Form.Group as={Row} className='mb-3'>
                            {/* <Form.Label column md='2'>
                              &nbsp;
                            </Form.Label> */}
                            <Col md='12'>
                              <Controller
                                name='klasifikasi10'
                                render={({ field }) => (
                                  <CreatableSelect
                                    isMulti={true}
                                    {...field}
                                    options={[]}
                                    isClearable={true}
                                    placeholder='Ketik pekerjaan lainnya...'
                                  />
                                )}
                                control={control}
                                rules={{ required: false }}
                              />
                              <span className='small text-danger'>
                                *Untuk menambahkan pekerjaan lainnya, ketik pekerjaan lainnya kemudian
                                tekan enter
                              </span>
                            </Col>
                          </Form.Group>
                        )}
                      </Col>
                    )
                  )}
                </Row>
              </Col>
            </Form.Group>
          </Col>
        )}

        {dataKlasifikasi?.prosedur.length > 0 && (
          <Col md='12' xs='12'>
            <Form.Group as={Row} className='mb-3'>
              <Form.Label column md='2'>
                Prosedur Pekerjaan
                <div>
                  <span className='small text-danger'>
                    *Pilih minimal 1
                  </span>
                </div>
              </Form.Label>
              <Col md='10'>
                <Row>
                  {dataKlasifikasi?.prosedur?.map(
                    (item: any, index: number) => (
                      <Col className='mb-2' md='4' key={index}>
                        <Form.Check
                          inline
                          {...register(
                            item?.alias != 'prosedur10'
                              ? item?.alias
                              : `${item?.alias}status`
                          )}
                          label={item?.name}
                        />

                        {prosedur10status && item?.alias == "prosedur10" && (
                          <Form.Group as={Row} className='mb-3'>
                            {/* <Form.Label column md='2'>
                              &nbsp;
                            </Form.Label> */}
                            <Col md='12'>
                              <Controller
                                name='prosedur10'
                                render={({ field }) => (
                                  <CreatableSelect
                                    isMulti={true}
                                    {...field}
                                    options={[]}
                                    isClearable={true}
                                    placeholder='Ketik prosedur lainnya lainnya...'
                                  />
                                )}
                                control={control}
                                rules={{ required: false }}
                              />
                              <span className='small text-danger'>
                                *Untuk menambahkan prosedur lainnya, ketik prosedur lainnya kemudian
                                tekan enter
                              </span>
                            </Col>
                          </Form.Group>
                        )}
                      </Col>
                    )
                  )}
                </Row>
              </Col>
            </Form.Group>
          </Col>
        )}



        {dataKlasifikasi?.lampiran.length > 0 && (
          <Col md='12' xs='12'>
            <Form.Group as={Row} className='mb-3'>
              <Form.Label column md='2'>
                Lampiran Pekerjaan
                <div>
                  <span className='small text-danger'>
                    *Pilih minimal 1
                  </span>
                </div>
              </Form.Label>
              <Col md='10'>
                <Row>
                  {dataKlasifikasi?.lampiran?.map(
                    (item: any, index: number) => (
                      <Col className='mb-2' md='12' sm key={index}>
                        <Row>
                          <Col md='6'>
                            <Form.Check
                              className='py-2'
                              inline
                              {...register(item?.alias)}
                              label={item?.name}
                              title={item?.alias}
                            />
                          </Col>
                          {eval(item?.alias) && (
                            <Col md='6'>
                              <InputUpload
                                fieldName={`${item?.alias}_path`}
                                folder={'wp'}
                                setValue={setValue}
                                previewUrl={eval(`${item?.alias}_path`)}
                                accept='application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,
                            text/plain, application/pdf'
                              />
                            </Col>
                          )}
                        </Row>
                      </Col>
                    )
                  )}
                </Row>
              </Col>
            </Form.Group>
          </Col>
        )}
      </Row>
    </>
  );
}
