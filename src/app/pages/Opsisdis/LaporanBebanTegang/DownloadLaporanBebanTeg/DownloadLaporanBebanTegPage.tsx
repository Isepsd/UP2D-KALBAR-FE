import React, { useState, useEffect } from 'react';
import { Col, Form, Row, Card, FormControl } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import fileDownload from 'js-file-download'
import { Button } from '@app/components';
import SelectAsyncDynamic from '@app/modules/SelectForm/SelectAsyncDynamic';
import SelectFormStatic from '@app/modules/SelectForm/SelectFormStatic';
import { JENIS_LOKASI } from '@app/configs/jenis-lokasi.config';

import axios from 'axios';
import { getAllDownload } from '@app/services/main.service';
import { API_PATH } from '@app/services/_path.service';
import moment from 'moment';
import { addNotification } from '@app/store/notification/notification.action';
import { notificationTemplate } from '@app/helper/notificationTemplate';
// import FileExplorer from './FileExplorer';

export default function DownloadLaporanBebanTegPage() {
  const source = axios.CancelToken.source();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [paramsGI, setParamsGI] = useState<any>();

  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    datum_start: Yup.string().required('Tanggal Awal wajib diisi'),
    datum_end: Yup.string().required('Tanggal Akhir wajib diisi'),
    pengukuran: Yup.string().required('Field wajib diisi'),
    dataBeban: Yup.string().required('Field wajib diisi'),
  });

  const [formModel] = useState<any>({
    datum_start: moment().subtract(1, 'day').format('YYYY-MM-DD'),
    datum_end: moment().subtract(1, 'day').format('YYYY-MM-DD'),
    id_parent_lokasi: "",
    pengukuran: ""
  });


  const {
    register,
    handleSubmit,
    // setValue,
    setError,
    formState,
    control
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: formModel,
  });
  const { errors }: any = formState || {};

  const watchJenisData = useWatch({ control, name: 'dataBeban' });
  const watchPengukuran = useWatch({ control, name: 'pengukuran' });
  const watchDate1 = useWatch({ control, name: 'datum_start' });

  /** SUBMIT FORM HANDLING */
  const onSubmitForm = (data: any) => {
    downloadXlsx(data);
  };

  /** NOTIFICATION HANDLER */
  const dispatchNotification = (msg: string = '', type: string = '') => {
    const notification = notificationTemplate(msg, type);
    dispatch(addNotification({ ...notification, message: msg, type: type }));
  };

  const downloadXlsx = async (params: any) => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    let path: any;
    setLoading(true)

    if (params.dataBeban == 'TRAFO GI' && params.waktu == '5') {
      path = API_PATH().opsisdis.laporan_beban.trafo_gi_5.jam + `/download`

    } else if (params.dataBeban == 'TRAFO GI' && params.waktu == '30') {
      path = API_PATH().opsisdis.pengukuran_beban.trafo_gi_non_ktt + `/download`

    } else if (params.dataBeban == 'TRAFO KTT' && params.waktu == '30') {
      path = API_PATH().opsisdis.pengukuran_beban.trafo_gi_ktt + `/download`

    } else if (params.dataBeban == 'PENYULANG') {
      path = API_PATH().opsisdis.pengukuran_beban.penyulang + `/download`

    } else if (params.dataBeban == 'PEMBANGKIT') {
      path = API_PATH().opsisdis.pengukuran_beban.pembangkit + `/download`

    } else if (params.dataBeban == 'KEYPOINT') {
      path = API_PATH().opsisdis.pengukuran_beban.keypoint + `/download`

    } else if (params.dataBeban == 'GARDU HUBUNG') {
      path = API_PATH().opsisdis.pengukuran_beban.gh + `/download`

    }

    if (path) {
      try {
        let req: any = await getAllDownload(path, params, source.token);
        const dataBlob = req?.data
        const headers = req?.headers
        let content: string = headers['content-disposition']
        const filename = content.replace("attachment; filename=", "").replaceAll('"', '')
        fileDownload(dataBlob, `${filename}_${watchPengukuran}_${moment().format('YYYY-MM-DD HHmmss')}.xlsx`)
        setLoading(false)
      } catch (err: any) {
        setLoading(false);
        dispatchNotification(`${err?.response?.statusText}`, 'danger');
      }
    } else {
      setError('waktu', {
        type: 'manual',
        message: 'Waktu Pengukuran belum dipilih !.',
      });
      setLoading(false);
    }
  };

  const options_beban = [
    { label: 'PEMBANGKIT', value: 'PEMBANGKIT' },
    { label: 'TRAFO GI', value: 'TRAFO GI' },
    // { label: 'TRAFO KTT', value: 'TRAFO KTT' },
    { label: 'PENYULANG', value: 'PENYULANG' },
    { label: 'KEYPOINT', value: 'KEYPOINT' },
    { label: 'GARDU HUBUNG', value: 'GARDU HUBUNG' },
  ]

  const options_pengukuran = [
    { label: 'Tegangan (kV)', value: 'v' },
    { label: 'Arus (A)', value: 'i' },
    { label: 'Daya Aktif (MW)', value: 'p' },
    { label: 'Daya Reaktif (Q)', value: 'q' },
    { label: 'Faktor Daya (Cos Q)', value: 'cosq' }
  ]

  const options_menit = [
    { label: 'Per 5 Menit', value: '5' },
    { label: 'Per 30 Menit', value: '30' },
  ]

  const selectGarduInduk = {
    fieldName: 'id_ref_lokasi_gi',
    pathServiceName: 'master.jaringan.ref_lokasi',
    labelField: 'nama_lokasi',
    valueField: 'id_ref_lokasi',
    placeholder: 'All',
  }

  const selectUP3 = {
    fieldName: 'id_up3',
    pathServiceName: 'master.jaringan.ref_lokasi',
    labelField: 'nama_lokasi',
    valueField: 'id_ref_lokasi',
    placeholder: 'All',
  }

  useEffect(() => {
    let paramsGI: any = {}
    setParamsGI(paramsGI)
  }, [])

  return (
    <>
      <Row className=''>
        <Col md={12} className='mb-4 position-static'>
          <Card className='card-widget position-static'>
            <Card.Header className='text-uppercase'>FILTER</Card.Header>
            <Card.Body>

              <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
                <Row>
                  <Col md={3} className="">
                    <Form.Group className='mb-2'>
                      <Form.Label>Tanggal Awal</Form.Label>
                      <FormControl
                        {...register('datum_start')}
                        type='date'
                        max={moment().format('YYYY-MM-DD')}
                        isInvalid={errors.datum_start}
                      />
                      <Form.Control.Feedback type='invalid'>
                        {errors?.datum_start?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={3} className="">
                    <Form.Group className='mb-2'>
                      <Form.Label>Tanggal Akhir</Form.Label>
                      <FormControl
                        {...register('datum_end')}
                        type='date'
                        min={watchDate1}
                        max={moment().format('YYYY-MM-DD')}
                        isInvalid={errors.datum_end}
                      />
                      <Form.Control.Feedback type='invalid'>
                        {errors?.datum_end?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={3} className="">
                    <Form.Group className='mb-2'>
                      <Form.Label>Data Beban</Form.Label>
                      <SelectFormStatic
                        fieldName='dataBeban'
                        isClearable={true}
                        errors={errors}
                        control={control}
                        options={options_beban}
                      />
                      <Form.Control.Feedback type='invalid'>
                        {errors?.dataBeban?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  {(watchJenisData != 'PEMBANGKIT') &&
                    <Col md={3} className="">
                      <Form.Group className='mb-2'>
                        <Form.Label>Gardu Induk</Form.Label>
                        <SelectAsyncDynamic
                          required={true}
                          {...selectGarduInduk}
                          isClearable={true}
                          errors={errors}
                          control={control}
                          queryParams={{
                            id_ref_jenis_lokasi: JENIS_LOKASI().gardu_induk,
                            page: -1,
                            limit: -1,
                            sort_by: "nama_lokasi",
                            ...paramsGI
                          }}
                        />
                      </Form.Group>
                    </Col>
                  }

                  { <Col md={3} className="">
                      <Form.Group className='mb-2'>
                        <Form.Label>UP3</Form.Label>
                        <SelectAsyncDynamic
                          required={true}
                          {...selectUP3}
                          isClearable={true}
                          errors={errors}
                          control={control}
                          queryParams={{
                            id_ref_jenis_lokasi: JENIS_LOKASI().up3,
                            page: -1,
                            limit: -1,
                            sort_by: "nama_lokasi",
                          }}
                        />
                      </Form.Group>
                    </Col>
                  }


                  {(watchJenisData == 'TRAFO GI') &&
                    <Col md={3} className="">
                      <Form.Group className='mb-2'>
                        <Form.Label>Waktu Pengukuran</Form.Label>
                        <SelectFormStatic
                          fieldName='waktu'
                          isClearable={true}
                          errors={errors}
                          control={control}
                          options={options_menit}
                        />
                        <Form.Control.Feedback type='invalid'>
                          {errors?.waktu?.message}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  }

                  <Col md={3} className="">
                    <Form.Group className='mb-2'>
                      <Form.Label>Nilai Pengukuran</Form.Label>
                      <SelectFormStatic
                        fieldName='pengukuran'
                        isClearable={true}
                        errors={errors}
                        control={control}
                        options={options_pengukuran}
                      />
                      <Form.Control.Feedback type='invalid'>
                        {errors?.pengukuran?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={2} className="mt-4">
                    <Button type='submit' onClick={handleSubmit} variant="primary" isLoading={loading} className='me-1 mt-2'>
                      <i className='fa fa-download me-1'></i> Download
                    </Button>
                  </Col>
                </Row>
              </Form>

            </Card.Body>
          </Card>
        </Col>
      </Row>



      {/* <FileExplorer /> */}
    </>
  );
}