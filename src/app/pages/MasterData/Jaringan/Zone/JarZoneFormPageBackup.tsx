import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Row, Col, Button, Form } from 'react-bootstrap';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios';

import ButtonCancel from '@app/components/Button/ButtonCancel';
import FormData from '@app/modules/Form/FormData';

import { IJaringanZone, JaringanZoneField } from '@app/interface/jaringan-zone.interface';
import RequiredInfo from '@app/components/Info/RequiredInfo';
import SelectRefLokasi from '@app/modules/SelectForm/SelectRefLokasi';
import { JENIS_LOKASI } from '@app/configs/jenis-lokasi.config';
import { API_PATH } from '@app/services/_path.service';
import { getByIdPath } from '@app/services/main.service';
import SelectAsyncDynamic from '@app/modules/SelectForm/SelectAsyncDynamic';
import SelectFormStatic from '@app/modules/SelectForm/SelectFormStatic';

export default function JarZoneForm() {
  const source = axios.CancelToken.source();

  const { id } = useParams();

  const { currentUser } = useSelector((state: any) => state.auth);

  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();
  const OPTION_ZONA = [
    { label: 'Zona 1', value: 'Zona 1' },
    { label: 'Zona 2', value: 'Zona 2' },
  ]
  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    nama_lokasi: Yup.string().required('Nama Wajib diisi'),
    alamat: Yup.string().nullable(),
    zona: Yup.string().nullable(),
    id_gardu_induk: Yup.number().typeError('Belum pilih gardu induk').required('Belum pilih gardu induk'),
    id_trafo_gi: Yup.number().typeError('Belum pilih Trafo').required('Belum pilih Trafo'),
    id_penyulang: Yup.number().typeError('Belum pilih penyulang').required('Belum pilih penyulang'),
    status_listrik: Yup.string().nullable().transform((_, v) => (v == '1' ? '1' : '0')),
    // lat: Yup.number().typeError("Latitude harus number").required('Latitude Wajib diisi'),
    // lon: Yup.number().typeError("Longitude harus number").required('Longitude Wajib diisi'),
    id_uid: Yup.number().nullable().transform((_, val) => val === Number(val) ? val : null),
    id_ulp_1: Yup.number().nullable().transform((_, val) => val === Number(val) ? val : null),
    id_up3_1: Yup.number().nullable().transform((_, val) => val === Number(val) ? val : null),
    panjang_jaringan: Yup.number().typeError("Data harus number"),
  });
  const [dataSelected, setDataSelected] = useState<any>();
  const [formModel] = useState<any>({ status_listrik: '1', lat: 0, lon: 0 });
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
  const { errors }: any = formState || {};
  /** SUBSCRIBE FORM CHANGES */
  const watchGarduInduk = useWatch({ control, name: 'id_gardu_induk' });
  const watchTrafoGI = useWatch({ control, name: 'id_trafo_gi' });
  const watchPenyulang = useWatch({ control, name: 'id_penyulang' });

  useEffect(() => {
    if (watchPenyulang) {
      getDataPenyulangById();
    }
  }, [watchPenyulang])

  useEffect(() => {
    return () => {
      source.cancel('Request Canceled');
    };
  }, []);

  const onSubmitForm = (data: IJaringanZone) => {
    data.id_parent_lokasi = data?.id_penyulang;
    data.id_ref_jenis_lokasi = JENIS_LOKASI().zone;
    data.jenis_jaringan = ""
    data.tree_jaringan = 1;
    if (id) {
      data.id_user_update = currentUser.id_user
    } else {
      data.id_user_entri = currentUser.id_user
    }
    setDataParams(data);
  };

  /** GET EDIT DATA */
  const getDataPenyulangById = async () => {
    try {
      const req: any = await getByIdPath(API_PATH().master.jaringan.ref_lokasi, watchPenyulang, source.token);
      setValue("id_uid", req?.results?.id_uid?.id_ref_lokasi)
      setValue("id_up3_1", req?.results?.id_up3_1?.id_ref_lokasi)
      setValue("id_ulp_1", req?.results?.id_ulp_1?.id_ref_lokasi)
    } catch { }
  };

  return (
    <>
      <FormData
        setError={setError}
        setValue={setValue}
        dataParams={dataParams}
        fields={JaringanZoneField}
        path={API_PATH().master.jaringan.ref_lokasi}
        customLabel='state'
        onLoading={setLoading}
        onGetDataResult={setDataSelected}
      >
        <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
          <Row className='mb-3'>
            {/*  LEFT COLUMN  */}
            <Col>
              <Form.Group className='mt-3' controlId='nama_lokasi'>
                <Form.Label>Nama Zone<RequiredInfo /></Form.Label>
                <Form.Control {...register('nama_lokasi')} isInvalid={errors.nama_lokasi} />
                <Form.Control.Feedback type='invalid'>
                  {errors?.nama_lokasi?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className='mt-3' controlId='alamat'>
                <Form.Label>Coverage </Form.Label>
                <Form.Control as='textarea' {...register('alamat')} isInvalid={errors.alamat} />
                <Form.Control.Feedback type='invalid'>
                  {errors?.alamat?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className='mt-3' controlId='panjang_jaringan'>
                <Form.Label>
                  Panjang Jaringan
                </Form.Label>
                <Form.Control
                  type="number"
                  {...register('panjang_jaringan')}
                  isInvalid={errors.panjang_jaringan}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.panjang_jaringan?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className='mt-3' controlId='zona'>
                <Form.Label>Zona <RequiredInfo /></Form.Label>
                <SelectFormStatic
                  control={control}
                  errors={errors}
                  fieldName="zona"
                  options={OPTION_ZONA}
                  placeholder="-"
                  isClearable={true}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.zona?.message}
                </Form.Control.Feedback>
              </Form.Group>
              {/* 
              <Form.Group className='mt-3' controlId='lon'>
                <Form.Label>Longitude <RequiredInfo /></Form.Label>
                <Form.Control {...register('lon')} isInvalid={errors.lon} type="number" />
                <Form.Control.Feedback type='invalid'>
                  {errors?.lon?.message}
                </Form.Control.Feedback>
              </Form.Group> */}
            </Col>
            {/* ! END LEFT COLUMN  */}

            {/* RIGHT COLUMN  */}
            <Col>
              <Form.Group className='mt-3'>
                <Form.Label>
                  Gardu Induk <RequiredInfo />
                </Form.Label>
                <SelectRefLokasi
                  fieldName="id_gardu_induk"
                  jenisLokasi="gardu_induk"
                  placeholder='Pilih gardu induk'
                  control={control}
                  errors={errors}
                  setValue={setValue}
                ></SelectRefLokasi>
              </Form.Group>
              <Form.Group className='mt-3'>
                <Form.Label>
                  Trafo <RequiredInfo />
                </Form.Label>
                <SelectAsyncDynamic
                  fieldName="id_trafo_gi"
                  fieldNameParent="id_gardu_induk"
                  control={control}
                  errors={errors}
                  labelField={'nama_lokasi'}
                  valueField={'id_ref_lokasi'}
                  pathServiceName={'master.jaringan.ref_lokasi'}
                  queryParams={{ id_ref_jenis_lokasi: JENIS_LOKASI().trafo_gi }}
                  setValue={setValue}
                  isDisabled={!watchGarduInduk}
                  watchParent={watchGarduInduk}
                  options={dataSelected?.trafo_gi}
                ></SelectAsyncDynamic>
              </Form.Group>
              <Form.Group className='mt-3'>
                <Form.Label>Penyulang <RequiredInfo /></Form.Label>
                <SelectAsyncDynamic
                  fieldName="id_penyulang"
                  fieldNameParent="id_trafo_gi"
                  control={control}
                  errors={errors}
                  labelField={'nama_lokasi'}
                  valueField={'id_ref_lokasi'}
                  pathServiceName={'master.jaringan.ref_lokasi'}
                  queryParams={{ id_ref_jenis_lokasi: JENIS_LOKASI().penyulang }}
                  setValue={setValue}
                  isDisabled={!watchTrafoGI}
                  watchParent={watchTrafoGI}
                  options={dataSelected?.penyulang}
                ></SelectAsyncDynamic>
              </Form.Group>
              <Form.Group className='mt-3' controlId='status'>
                <Form.Label>Status</Form.Label>
                <div>
                  <Form.Check
                    {...register('status_listrik')}
                    inline
                    type='radio'
                    value='1'
                    label='Active'
                  />
                  <Form.Check
                    {...register('status_listrik')}
                    inline
                    type='radio'
                    value='0'
                    label='Inactive'
                  />
                </div>
                <Form.Control.Feedback type='invalid'>
                  {errors?.status?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className='mt-4'>
            <Button type='submit' variant='primary' disabled={loading}>Simpan</Button>
            <ButtonCancel />
          </Form.Group>
        </Form>
      </FormData>
    </>
  );
}
