import RequiredInfo from '@app/components/Info/RequiredInfo';
import TopBarLoader from '@app/components/Loader/TopBarLoader';
import SelectRefLokasi from '@app/modules/SelectForm/SelectRefLokasi';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import BarChart from '@app/modules/Highcharts/BarChart'
import PieChart from '@app/modules/Highcharts/PieChart'
import Penyulang from '@app/modules/APKT/Penyulang';
import GarduDistribusi from '@app/modules/APKT/GarduDistribusi';
import SelectAsyncDynamic from '@app/modules/SelectForm/SelectAsyncDynamic';
import { JENIS_LOKASI } from '@app/configs/jenis-lokasi.config';

export default function DashboardAsetPage() {
  const source = axios.CancelToken.source();
  const path = "master/jaringan/ref-lokasi"

  const [loading, setLoading] = useState<boolean>();


  /** FORM  SCHEMA */
  const validationSchema = Yup.object().shape({
    id_uid: Yup.number().typeError('Belum pilih unit induk').required('Belum unit induk'),
    id_ulp_1: Yup.number().nullable().transform((_, val) => val === Number(val) ? val : null),
    id_up3_1: Yup.number().nullable().transform((_, val) => val === Number(val) ? val : null),
  });


  const [formModel] = useState<any>({ status_listrik: '1' });

  const {
    handleSubmit,
    setValue,
    control,
    clearErrors,
    formState,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: formModel,
  });
  const { errors }: any = formState || {};
  const watchUnitInduk = useWatch({ control, name: 'id_uid' });
  const watchUP3_1 = useWatch({ control, name: 'id_up3_1' });
  /** SUBMIT FORM HANDLING */
  const onSubmitForm = (data: any) => {
    // console.log("data", data);
    data;
    clearErrors("id_uid");
  };

  useEffect(() => {
    // console.log("data", path);
    path;

    setLoading(false);
    return () => {
      source.cancel()
    }
  }, [])

  const seriesPie = [
    {
      name: 'Penyebab Gangguan',
      data: [
        {
          name: 'POHON',
          y: 12,
        },
        {
          name: 'LAYANG-LAYANG',
          y: 45,
        },
        {
          name: 'BENCANA ALAM',
          y: 50,
        }
      ]
    }
  ]

  return (
    <>
      <TopBarLoader isLoading={loading} />
      <Card bg="Success">
        <Card.Header>Dashboard Aset</Card.Header>
        <Card.Body>
          <Row>
            <Col className='col-md-12 mb-2'>
              <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
                <Row className='mb-3'>
                  <Col>
                    {/* <Form.Group className='mt-3'>
                      <Form.Label>
                        UID/UIW/UP2D <RequiredInfo />
                      </Form.Label>
                      <SelectRefLokasi
                        fieldName="id_uid"
                        jenisLokasi="uid"
                        placeholder='Pilih unit induk'
                        control={control}
                        errors={errors}
                      ></SelectRefLokasi>
                    </Form.Group> */}
                    <Form.Group className='mt-3'>
                      <Form.Label>UIW</Form.Label>
                      <SelectAsyncDynamic
                        fieldName="id_uid"
                        control={control}
                        errors={errors}
                        labelField={'nama_lokasi'}
                        valueField={'id_ref_lokasi'}
                        pathServiceName={'master.jaringan.ref_lokasi'}
                        queryParams={{
                          id_ref_jenis_lokasi_in: `${JENIS_LOKASI().uiw}`,
                        }}
                        setValue={setValue}
                      />
                    </Form.Group>

                  </Col>
                  <Col>
                    <Form.Group className='mt-3'>
                      <Form.Label>
                        UP3 <RequiredInfo />
                      </Form.Label>
                      <SelectAsyncDynamic
                        fieldName="id_up3_1"
                        control={control}
                        errors={errors}
                        labelField={'nama_lokasi'}
                        valueField={'id_ref_lokasi'}
                        pathServiceName={'master.jaringan.ref_lokasi'}
                        queryParams={{
                          id_ref_jenis_lokasi_in: `${JENIS_LOKASI().up3}`,
                        }}
                        setValue={setValue}
                        watchParent={watchUnitInduk}
                        fieldNameParent="id_uid"
                      />
                    </Form.Group>

                  </Col>
                  <Col>
                    <Form.Group className='mt-3'>
                      <Form.Label>
                        ULP <RequiredInfo />
                      </Form.Label>
                      <SelectRefLokasi
                        fieldName="id_ulp_1"
                        jenisLokasi="ulp"
                        placeholder='Pilih ULP'
                        control={control}
                        watchParent={watchUP3_1}
                        errors={errors}
                        setValue={setValue}
                        isDisabled={!watchUP3_1}
                      ></SelectRefLokasi>
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className='mt-4'>
                  <Button type='submit' variant='primary'>
                    Cari
                  </Button>
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <hr />
      <Row>
        <Col md={12} className='mb-4'>
          <Card bg="Success" className="text-center">
            <Card.Header>Dashboard Aset Distribusi</Card.Header>
            <Card.Body>
              <div style={{ height: '40vh' }}>
                <BarChart />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} sm={12} className='mb-4'>
          <Card bg="Success" className="text-center">
            <Card.Header>Penyulang</Card.Header>
            <Card.Body>
              <div style={{ height: '27vh' }}>
                <Penyulang />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} sm={12} className='mb-4'>
          <Card bg="Success" className="">
            <Card.Header>Gardu Distribusi</Card.Header>
            <Card.Body>
              <div style={{ height: '27vh' }}>
                <GarduDistribusi />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={6} sm={12} className='mb-4'>
          <Card bg="Success" className="text-center">
            <Card.Header>KMS Penyulang terisi/tidak</Card.Header>
            <Card.Body>
              <div style={{ height: '40vh' }}>
                <PieChart series={seriesPie} />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} sm={12} className="mb-4">
          <Card bg="Success" className="text-center">
            <Card.Header>Koordinat Gardu Distribusi terisi/tidak</Card.Header>
            <Card.Body>
              <div style={{ height: '40vh' }}>
                <PieChart series={seriesPie} />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  )
}
