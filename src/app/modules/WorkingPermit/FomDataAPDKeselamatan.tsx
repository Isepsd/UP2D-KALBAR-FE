import React, { useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';

import { getAllByPath } from '@app/services/main.service';
import { API_PATH } from '@app/services/_path.service';
import axios from 'axios';
import TopBarLoader from '@app/components/Loader/TopBarLoader';
import { useWatch, Controller } from 'react-hook-form';
import CreatableSelect from 'react-select/creatable';

interface IFomDataAPDKeselamatan {
  register: any
  dataSelected: any,
  control: any
}


export default function FomDataAPDKeselamatan({
  register,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  dataSelected,
  control
}: IFomDataAPDKeselamatan) {
  const source = axios.CancelToken.source();

  const [loading, setLoading] = useState<boolean>(false);
  const [dataKlasifikasi, setDataKlasifikasi] = useState<any>();
  const typeKeselatan = [
    "pelindung",
    "perlengkapan",
  ]
  /** GET DATA PAGINATION */
  const getAllData = async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    setLoading(true);

    try {
      const params = {
        page: 1,
        limit: 100,
      };

      const req: any = await getAllByPath(API_PATH().master.working_permit.kel_keselamatan, params, source.token);
      const { results } = req;
      let list_jobs: any = {
        pelindung: [],
        perlengkapan: [],
      };
      // console.log("results kes", results);

      typeKeselatan.map((item: any) => {
        const result = results.filter((obj: any) => {
          return obj.kategori === item;
        });
        list_jobs[item] = result
      })
      // console.log("list_jobs kes", list_jobs);

      setDataKlasifikasi(list_jobs);
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllData()
    return () => {
      source.cancel();
    };
  }, []);

  const perlengkapan5Status = useWatch({ control, name: 'perlengkapan5status', });
  const pelindung12Status = useWatch({ control, name: 'pelindung12status' });

  return (
    <>
      <TopBarLoader isLoading={loading} />
      <Row>
        {dataKlasifikasi?.pelindung.length > 0 &&
          <Col md='12' xs='12'>
            <Form.Group as={Row} className='mb-3'>
              <Form.Label column md="2">
                Klasifikasi Pelindung
                <div>
                  <span className='small text-danger'>
                    *Pilih minimal 1
                  </span>
                </div>
              </Form.Label>
              <Col md="10" >
                <Row>
                  {
                    dataKlasifikasi?.pelindung?.map((item: any, index: number) => (
                      <Col className='mb-2' md="4" key={index}>
                        <Form.Check inline
                          {...register(
                            item?.alias != 'pelindung12'
                              ? item?.alias
                              : `${item?.alias}status`
                          )} label={item?.name} />

                        {pelindung12Status && item?.alias == "pelindung12" && (
                          <Form.Group as={Row} className='mb-3'>
                            {/* <Form.Label column md='2'>
                              &nbsp;
                            </Form.Label> */}
                            <Col md='12'>
                              <Controller
                                name='pelindung12'
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
                    ))
                  }
                </Row>
              </Col>
            </Form.Group>
          </Col>
        }



        {dataKlasifikasi?.perlengkapan.length > 0 &&
          <Col md='12' xs='12'>
            <Form.Group as={Row} className='mb-3'>
              <Form.Label column md="2">
                Klasifikasi Perlengkapan
                <div>
                  <span className='small text-danger'>
                    *Pilih minimal 1
                  </span>
                </div>
              </Form.Label>
              <Col md="10" >
                <Row>
                  {
                    dataKlasifikasi?.perlengkapan?.map((item: any, index: number) => (
                      <Col className='mb-2' md="4" key={index}>
                        <Form.Check inline
                          {...register(
                            item?.alias != 'perlengkapan5'
                              ? item?.alias
                              : `${item?.alias}status`
                          )}
                          label={item?.name} />
                        {perlengkapan5Status && item?.alias == 'perlengkapan5' && (
                          <Form.Group as={Row} className='mb-3'>
                            {/* <Form.Label column md='2'>
                              &nbsp;
                            </Form.Label> */}
                            <Col md='12'>
                              <Controller
                                name='perlengkapan5'
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
                    ))
                  }
                </Row>
              </Col>
            </Form.Group>
          </Col>
        }


      </Row>
    </>
  );
}
