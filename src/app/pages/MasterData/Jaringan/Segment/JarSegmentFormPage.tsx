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

import { IJaringanSegment, JaringanSegmentField } from '@app/interface/jaringan-segment.interface';
import RequiredInfo from '@app/components/Info/RequiredInfo';
import { JENIS_LOKASI } from '@app/configs/jenis-lokasi.config';
import { API_PATH } from '@app/services/_path.service';
import { getByIdPath } from '@app/services/main.service';
import SelectAsyncDynamic from '@app/modules/SelectForm/SelectAsyncDynamic';

export default function JarSegmentForm() {
  const source = axios.CancelToken.source();

  const { id } = useParams();

  const { currentUser } = useSelector((state: any) => state.auth);

  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();
  const [dataSelected, setDataSelected] = useState<any>();

  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    nama_lokasi: Yup.string().required('Nama Wajib diisi'),
    alamat: Yup.string().nullable(),
    kode_gardu: Yup.string().nullable(),
    jumlah_pelanggan: Yup.string().nullable(),
    id_gardu_induk: Yup.number().typeError('Belum pilih gardu induk').required('Belum pilih gardu induk'),
    id_trafo_gi: Yup.number().typeError('Belum pilih Trafo').required('Belum pilih Trafo'),
    id_penyulang: Yup.number().typeError('Belum pilih penyulang').required('Belum pilih penyulang'),
    kva: Yup.string().nullable(),
    id_section: Yup.number().typeError('Belum pilih section').required('Belum pilih section'),
    status_listrik: Yup.string().nullable().transform((_, v) => (v == '1' ? '1' : '0')),
    // lat: Yup.number().typeError("Latitude harus number").required('Latitude Wajib diisi'),
    // lon: Yup.number().typeError("Longitude harus number").required('Longitude Wajib diisi'),
    id_uid: Yup.number().nullable().transform((_, val) => val === Number(val) ? val : null),
    id_ulp_1: Yup.number().nullable().transform((_, val) => val === Number(val) ? val : null),
    id_up3_1: Yup.number().nullable().transform((_, val) => val === Number(val) ? val : null),
    panjang_jaringan: Yup.number().typeError("Data harus number"),
  });

  const [formModel] = useState<any>({ status_listrik: '1', lat: 0, lon: 0, id_ref_province: process.env.ADM_PROVINCE });
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
  // const watchGarduInduk = useWatch({ control, name: 'id_gardu_induk' });
  const watchTrafoGI = useWatch({ control, name: 'id_trafo_gi' });
  const watchPenyulang = useWatch({ control, name: 'id_penyulang' });
  const watchZone = useWatch({ control, name: 'id_zone' });
  const watchProvince = useWatch({ control, name: 'id_ref_province' });
  const watchKabKota = useWatch({ control, name: 'id_ref_regency' });

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

  const onSubmitForm = (data: IJaringanSegment) => {
    data.id_parent_lokasi = data?.id_section;
    // data.id_ref_jenis_lokasi = JENIS_LOKASI().segment;
    // data.jenis_jaringan = ""
    data.id_ref_jenis_lokasi = JENIS_LOKASI().keypoint;
    data.fungsi_lokasi = 'SEGMENT';
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
        fields={JaringanSegmentField}
        path={API_PATH().master.jaringan.ref_lokasi}
        customLabel='state'
        onLoading={setLoading}
        onGetDataResult={setDataSelected}
      >
        <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
          <Row className='mb-3'>
            {/* LEFT COLUMN  */}
            <Col md="7">
              <Form.Group className='mt-3'>
                <Form.Label>
                  Gardu Induk <RequiredInfo />
                </Form.Label>
                <SelectAsyncDynamic
                  fieldName="id_gardu_induk"
                  control={control}
                  errors={errors}
                  labelField={'nama_lokasi'}
                  valueField={'id_ref_lokasi'}
                  pathServiceName={'master.jaringan.ref_lokasi'}
                  queryParams={{ id_ref_jenis_lokasi: JENIS_LOKASI().gardu_induk }}
                  setValue={setValue}
                  options={dataSelected?.gardu_induk}
                ></SelectAsyncDynamic>
              </Form.Group>
              <Form.Group className='mt-3'>
                <Form.Label>
                  Trafo <RequiredInfo />
                </Form.Label>
                <SelectAsyncDynamic
                  fieldName="id_trafo_gi"
                  control={control}
                  errors={errors}
                  labelField={'nama_lokasi'}
                  valueField={'id_ref_lokasi'}
                  pathServiceName={'master.jaringan.ref_lokasi'}
                  queryParams={{ id_ref_jenis_lokasi: JENIS_LOKASI().trafo_gi }}
                  setValue={setValue}
                  options={dataSelected?.trafo_gi}
                ></SelectAsyncDynamic>
              </Form.Group>
              <Form.Group className='mt-3'>
                <Form.Label>
                  Penyulang <RequiredInfo />
                </Form.Label>
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
              <Form.Group className='mt-3'>
                <Form.Label>
                  Zone
                </Form.Label>
                <SelectAsyncDynamic
                  fieldName="id_zone"
                  fieldNameParent="id_penyulang"
                  control={control}
                  errors={errors}
                  labelField={'nama_lokasi'}
                  valueField={'id_ref_lokasi'}
                  pathServiceName={'master.jaringan.ref_lokasi'}
                  queryParams={{ id_ref_jenis_lokasi: JENIS_LOKASI().zone }}
                  setValue={setValue}
                  isDisabled={!watchPenyulang}
                  watchParent={watchPenyulang}
                  options={dataSelected?.zone}
                ></SelectAsyncDynamic>
              </Form.Group>
              <Form.Group className='mt-3' controlId='id_section'>
                <Form.Label>Section <RequiredInfo /></Form.Label>
                <SelectAsyncDynamic
                  fieldName="id_section"
                  fieldNameParent="id_zone"
                  control={control}
                  errors={errors}
                  labelField={'nama_lokasi'}
                  valueField={'id_ref_lokasi'}
                  pathServiceName={'master.jaringan.ref_lokasi'}
                  queryParams={{ id_ref_jenis_lokasi: JENIS_LOKASI().section }}
                  setValue={setValue}
                  isDisabled={!watchZone}
                  watchParent={watchZone}
                  options={dataSelected?.zone}
                ></SelectAsyncDynamic>
              </Form.Group>
              <Form.Group className='mt-3' controlId='nama_lokasi'>
                <Form.Label>Nama Segment<RequiredInfo /></Form.Label>
                <Form.Control
                  {...register('nama_lokasi')}
                  isInvalid={errors.nama_lokasi}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.nama_lokasi?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className='mt-3' controlId='alamat'>
                <Form.Label>Coverage </Form.Label>
                <Form.Control
                  as="textarea"
                  {...register('alamat')}
                  isInvalid={errors.alamat}
                  rows={4}
                />
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
              <Form.Group className='mt-3'>
                <Form.Label>Provinsi </Form.Label>
                <SelectAsyncDynamic
                  fieldName="id_ref_province"
                  control={control}
                  errors={errors}
                  labelField={'name'}
                  valueField={'id_ref_province'}
                  pathServiceName={'master.adm_wilayah.provinsi'}
                  queryParams={{ sort_by: 'name' }}
                  setValue={setValue}
                  options={dataSelected?.ref_province}
                ></SelectAsyncDynamic>
              </Form.Group>

              <Form.Group className='mt-3'>
                <Form.Label>Kab/Kota </Form.Label>
                <SelectAsyncDynamic
                  fieldName="id_ref_regency"
                  fieldNameParent="id_ref_province"
                  control={control}
                  errors={errors}
                  labelField={'name'}
                  valueField={'id_ref_regency'}
                  pathServiceName={'master.adm_wilayah.kota_kab'}
                  watchParent={watchProvince}
                  isDisabled={!watchProvince}
                  queryParams={{ sort_by: 'name' }}
                  setValue={setValue}
                  options={dataSelected?.ref_regency}
                ></SelectAsyncDynamic>
              </Form.Group>

              <Form.Group className='mt-3'>
                <Form.Label>Kecamatan </Form.Label>
                <SelectAsyncDynamic
                  fieldName="id_ref_district"
                  fieldNameParent="id_ref_regency"
                  control={control}
                  errors={errors}
                  labelField={'name'}
                  valueField={'id_ref_district'}
                  pathServiceName={'master.adm_wilayah.kecamatan'}
                  watchParent={watchKabKota}
                  isDisabled={!watchKabKota}
                  queryParams={{ sort_by: 'name' }}
                  setValue={setValue}
                  options={dataSelected?.ref_district}
                ></SelectAsyncDynamic>
              </Form.Group>

              {/* <Form.Group className='mt-3' controlId='lat'>
                <Form.Label>Latitude <RequiredInfo /></Form.Label>
                <Form.Control
                  {...register('lat')}
                  isInvalid={errors.lat}
                  type="number"
                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.lat?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className='mt-3' controlId='lon'>
                <Form.Label>Longitude <RequiredInfo /></Form.Label>
                <Form.Control
                  {...register('lon')}
                  isInvalid={errors.lon}
                  type="number"
                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.lon?.message}
                </Form.Control.Feedback>
              </Form.Group> */}
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
            {/* !END LEFT COLUMN  */}
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
