import React, { useEffect, useState } from 'react';
import { Col, Form, Modal, Row } from 'react-bootstrap';

import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import FormData from '@app/modules/Form/FormData';
import ButtonCancel from '@app/components/Button/ButtonCancel';
import { API_PATH } from '@app/services/_path.service';
import Button from '@app/components/Button/Button';
import RequiredInfo from '@app/components/Info/RequiredInfo';
import moment from 'moment';
import { JENIS_LOKASI } from '@app/configs/jenis-lokasi.config';
import { getByIdPath, postByPath } from '@app/services/main.service';
import axios from 'axios';
import { get } from 'lodash';
import SelectAsyncDynamic from '../SelectForm/SelectAsyncDynamic';
import { useSelector } from 'react-redux';
import { ApktTransJarHarField } from '@app/interface/apkt-trans-jar-har';

function PengirimanRencanaHARForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();
  const { callbackForm } = useSelector((state: any) => state.ui);

  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    gardu: Yup.number().typeError('Belum pilih gardu ').required('Belum pilih gardu'),
    pelaksana: Yup.number().typeError('Belum pilih pelaksana ').required('Belum pilih pelaksana'),
    lokasi: Yup.string().nullable(),
    penyulang: Yup.string().nullable(),
    ulp: Yup.string().nullable(),
    up3: Yup.string().nullable(),
    tgl_mulai_pelaksanaan: Yup.string().typeError("Data Eror").required("Data harus diisi"),
    tgl_selesai_pelaksanaan: Yup.string().typeError("Data Eror").required("Data harus diisi"),
  });

  const [formModel] = useState<any>({
    tgl_mulai_pelaksanaan: moment().format('YYYY-MM-DD[T]HH:mm'),
    tgl_selesai_pelaksanaan: moment().add(1, 'day').format('YYYY-MM-DD[T]HH:mm')
  });

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    control,
    formState,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: formModel,
  });
  const watchGardu = useWatch({ control, name: "gardu" });
  const { errors }: any = formState;
  const source = axios.CancelToken.source();
  /** SUBMIT FORM HANDLING */
  const onSubmitForm = (data: any) => {
    data.nama_laporan = "pemeliharaan";
    data.id_trans_jadwal_har = null
    data.tgl_laporan = moment().format("YYYY-MM-DD hh:mm:ss");
    // data.user_entri = currentUser?.id_user;
    data.tgl_user_entri = moment().format("YYYY-MM-DD hh:mm:ss");
    data.status_laporan = "open";
    data.jenis_laporan = "pemeliharaan"
    data.pelaksana = data?.pelaksana
    data.wilayah_padam = data?.lokasi ? data?.lokasi : '-'
    data.status_apkt_kirim = 1


    setDataParams(data);
  };

  const insertTransJarHarDet = async (data_jar_har: any) => {
    try {
      let params = {
        id_apkt_trans_jar: data_jar_har?.id_trans_jar_har,
        // id_trans_jadwal_har: null,
        gardu: watchGardu,
        status_apkt_kirim: 1,
        tgl_mulai_pelaksanaan: moment(data_jar_har?.tgl_mulai_pelaksanaan).format("YYYY-MM-DD hh:mm"),
        tgl_selesai_pelaksanaan: moment(data_jar_har?.tgl_selesai_pelaksanaan).format("YYYY-MM-DD hh:mm")
      }
      await postByPath(
        `${API_PATH().apkt.trans_jar_det_har}`,
        params,
        source.token
      );
    } catch (err: any) {
      setLoading(false);
    }
  }


  const getDetailGardu = async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    setLoading(true);

    try {
      const req: any = await getByIdPath(get(API_PATH(), "master.jaringan.ref_lokasi"), watchGardu, source.token);
      const { results } = req
      setValue('lokasi', results?.alamat)
      setValue('penyulang', results?.penyulang?.nama_lokasi)
      setValue('up3', results?.up3?.nama_lokasi)
      setValue('ulp', results?.ulp?.nama_lokasi)
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (watchGardu) {
      getDetailGardu()
    }
    return () => {
      source.cancel();
    };
  }, [watchGardu])

  useEffect(() => {
    if (callbackForm?.results) {
      insertTransJarHarDet(callbackForm?.results);
    }
  }, [callbackForm])

  return (
    <>
      <FormData
        setError={setError}
        setValue={setValue}
        dataParams={dataParams}
        fields={ApktTransJarHarField}
        path={API_PATH().apkt.trans_jar_har}
        onLoading={setLoading}
        customLabel={'hide'}
        isModal={true}
        batch={false}
      >
        <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
          <Modal.Body>
            <Row>
              <Form.Group as={Col} className='mb-3'>
                <Form.Label>
                  Gardu <RequiredInfo />
                </Form.Label>
                <SelectAsyncDynamic
                  fieldName='gardu'
                  pathServiceName='master.jaringan.ref_lokasi'
                  labelField='nama_lokasi'
                  valueField='id_ref_lokasi'
                  placeholder='Pilih...'
                  // isClearable={true}
                  errors={errors}
                  control={control}
                  queryParams={{
                    page: -1,
                    limit: 10,
                    sort_by: 'nama_lokasi',
                    id_ref_jenis_lokasi: JENIS_LOKASI().gardu_distribusi
                  }}
                />
              </Form.Group>
              <Form.Group as={Col} className='mb-3'>
                <Form.Label>
                  Lokasi
                </Form.Label>
                <Form.Control
                  {...register('lokasi')}
                  isInvalid={errors.lokasi}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.lokasi?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} className='mb-3'>
                <Form.Label>
                  UP3
                </Form.Label>
                <Form.Control
                  {...register('up3')}
                  isInvalid={errors.up3}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.up3?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} className='mb-3'>
                <Form.Label>
                  ULP
                </Form.Label>
                <Form.Control
                  {...register('ulp')}
                  isInvalid={errors.ulp}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.ulp?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} className='mb-3'>
                <Form.Label>
                  Penyulang
                </Form.Label>
                <Form.Control
                  {...register('penyulang')}
                  isInvalid={errors.penyulang}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.penyulang?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} className='mb-3'>
                <Form.Label>
                  Pelaksana <RequiredInfo />
                </Form.Label>
                <SelectAsyncDynamic
                  fieldName='pelaksana'
                  pathServiceName='master.admin_ksa.perusahaan'
                  labelField='nama'
                  valueField='id_perusahaan'
                  placeholder='Pilih...'
                  isClearable={true}
                  errors={errors}
                  control={control}
                  defaultValue={''}
                  queryParams={{
                    page: -1,
                    limit: 10,
                    sort_by: 'nama',
                  }}
                />

              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} className='mb-3'>
                <Form.Label>
                  Tgl Mulai Pelaksanaan
                </Form.Label>
                <Form.Control
                  {...register('tgl_mulai_pelaksanaan')} type='datetime-local'
                  isInvalid={errors.tgl_mulai_pelaksanaan}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.tgl_mulai_pelaksanaan?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} className='mb-3'>
                <Form.Label>
                  Tgl Selesai Pelaksanaan
                </Form.Label>
                <Form.Control
                  {...register('tgl_selesai_pelaksanaan')} type='datetime-local'
                  isInvalid={errors.tgl_selesai_pelaksanaan}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.tgl_selesai_pelaksanaan?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
          </Modal.Body>

          <Modal.Footer>
            <div className='d-flex gap-2'>
              <ButtonCancel type='modal' ids='id' />
              <Button type='submit' variant='primary' isLoading={loading}>
                Simpan
              </Button>
            </div>
          </Modal.Footer>
        </Form>
      </FormData>
    </>
  );
}

export default PengirimanRencanaHARForm