import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Row, Col, Form } from 'react-bootstrap';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios';

import ButtonCancel from '@app/components/Button/ButtonCancel';
import FormData from '@app/modules/Form/FormData';

import { IJaringanTrafoGD, JaringanTrafoGDField } from '@app/interface/jaringan-trafo-gd.interface';
import RequiredInfo from '@app/components/Info/RequiredInfo';
import { JENIS_LOKASI } from '@app/configs/jenis-lokasi.config';
import { API_PATH } from '@app/services/_path.service';
import { getByIdPath } from '@app/services/main.service';
import SelectAsyncDynamic from '@app/modules/SelectForm/SelectAsyncDynamic';
import Button from '@app/components/Button/Button';

export default function JarTrafoGDForm() {
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
    ssot_number: Yup.string().nullable(),
    id_gardu_induk: Yup.number().typeError('Belum pilih gardu induk').required('Belum pilih gardu induk'),
    id_trafo_gi: Yup.number().typeError('Belum pilih Trafo').required('Belum pilih Trafo'),
    id_penyulang: Yup.number().typeError('Belum pilih penyulang').required('Belum pilih penyulang'),
    // id_zone: Yup.number().typeError('Belum pilih zone').required('Belum pilih zone'),
    // id_section: Yup.number().typeError('Belum pilih section').required('Belum pilih section'),
    // id_segment: Yup.number().typeError('Belum pilih segment').required('Belum pilih segmemt'),
    // id_gardu_distribusi: Yup.number().typeError("Belum pilih gardu distribusi").required('Belum pilih gardu distribusi'),
    status_listrik: Yup.string().nullable().transform((_, v) => (v == '1' ? '1' : '0')),
    lat: Yup.number().typeError("Latitude harus number").required('Latitude Wajib diisi'),
    lon: Yup.number().typeError("Longitude harus number").required('Longitude Wajib diisi'),
    id_uid: Yup.number().nullable().transform((_, val) => val === Number(val) ? val : null),
    id_ulp_1: Yup.number().nullable().transform((_, val) => val === Number(val) ? val : null),
    id_up3_1: Yup.number().nullable().transform((_, val) => val === Number(val) ? val : null),
  });

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
  const watchZone = useWatch({ control, name: 'id_zone' });
  const watchSection = useWatch({ control, name: 'id_section' });
  const watchSegment = useWatch({ control, name: 'id_segment' });
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

  const onSubmitForm = (data: IJaringanTrafoGD) => {
    data.id_parent_lokasi = data?.id_gardu_distribusi;
    data.id_ref_jenis_lokasi = JENIS_LOKASI().trafo_gd;
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
        fields={JaringanTrafoGDField}
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
                <Form.Group className='mt-3' controlId='ssot_number'>
                              <Form.Label>
                                Kode SSOT
                              </Form.Label>
                              <Form.Control
                                {...register('ssot_number')}
                                isInvalid={errors.ssot_number}
                              />
                              <Form.Control.Feedback type='invalid'>
                                {errors?.ssot_number?.message}
                              </Form.Control.Feedback>
                            </Form.Group>
              <Form.Group className='mt-3'>
                <Form.Label>
                  Trafo <RequiredInfo />
                </Form.Label>
                <SelectAsyncDynamic
                  fieldName="id_trafo_gi"
                  fieldNameParent="id_parent_lokasi"
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
                <Form.Label>
                  Penyulang <RequiredInfo />
                </Form.Label>
                <SelectAsyncDynamic
                  fieldName="id_penyulang"
                  fieldNameParent="id_parent_lokasi"
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
                  fieldNameParent="id_parent_lokasi"
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
                <Form.Label>Section</Form.Label>
                <SelectAsyncDynamic
                  fieldName="id_section"
                  fieldNameParent="id_parent_lokasi"
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
              <Form.Group className='mt-3'>
                <Form.Label>Segment</Form.Label>
                <SelectAsyncDynamic
                  fieldName="id_segment"
                  fieldNameParent="id_parent_lokasi"
                  control={control}
                  errors={errors}
                  labelField={'nama_lokasi'}
                  valueField={'id_ref_lokasi'}
                  pathServiceName={'master.jaringan.ref_lokasi'}
                  queryParams={{ id_ref_jenis_lokasi: JENIS_LOKASI().segment }}
                  setValue={setValue}
                  isDisabled={!watchSection}
                  watchParent={watchSection}
                  options={dataSelected?.segment}
                ></SelectAsyncDynamic>
              </Form.Group>
              <Form.Group className='mt-3'>
                <Form.Label>Gardu distribusi <RequiredInfo />
                </Form.Label>
                <SelectAsyncDynamic
                  fieldName="id_gardu_distribusi"
                  fieldNameParent="id_parent_lokasi"
                  control={control}
                  errors={errors}
                  labelField={'nama_lokasi'}
                  valueField={'id_ref_lokasi'}
                  pathServiceName={'master.jaringan.ref_lokasi'}
                  queryParams={{ id_ref_jenis_lokasi: JENIS_LOKASI().gardu_distribusi }}
                  setValue={setValue}
                  isDisabled={!watchSegment}
                  watchParent={watchSegment}
                  options={dataSelected?.gardu_distribusi}
                ></SelectAsyncDynamic>
              </Form.Group>

              <Form.Group className='mt-3' controlId='nama_lokasi'>
                <Form.Label>Nama Trafo GD<RequiredInfo /></Form.Label>
                <Form.Control
                  {...register('nama_lokasi')}
                  isInvalid={errors.nama_lokasi}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.nama_lokasi?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className='mt-3' controlId='alamat'>
                <Form.Label>Alamat </Form.Label>
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

              <Form.Group className='mt-3' controlId='lat'>
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
            {/* !END LEFT COLUMN  */}
          </Row>
          <Form.Group className='mt-4'>
            <Button type='submit' variant='primary' isLoading={loading}>Simpan</Button>
            <ButtonCancel />
          </Form.Group>
        </Form>
      </FormData>
    </>
  );
}
