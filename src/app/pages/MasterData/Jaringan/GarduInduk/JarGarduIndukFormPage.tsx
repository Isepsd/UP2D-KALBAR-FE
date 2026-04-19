import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Row, Col, Button, Form } from 'react-bootstrap';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import ButtonCancel from '@app/components/Button/ButtonCancel';
import FormData from '@app/modules/Form/FormData';

import { IJaringanGarduInduk, JarianganGarduIndukField } from '@app/interface/jaringan-gardu-induk.interface';
import RequiredInfo from '@app/components/Info/RequiredInfo';
import { JENIS_LOKASI } from '@app/configs/jenis-lokasi.config';
import { API_PATH } from '@app/services/_path.service';
import SelectAsyncDynamic from '@app/modules/SelectForm/SelectAsyncDynamic';
import SelectFormStatic from '@app/modules/SelectForm/SelectFormStatic';
import { JENIS_GI } from '@app/configs/select-options/jaringan.select';

export default function JarGarduIndukForm() {
  const { id } = useParams();

  const { currentUser } = useSelector((state: any) => state.auth);

  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();

  const [dataSelected, setSelectedData] = useState<any>()
  const optionDataJenisGI: any = JENIS_GI;
  // const optionDataFungsiScada: any = FUNGSI_SCADA;
  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    nama_lokasi: Yup.string().required('Nama Wajib diisi'),
    alamat: Yup.string().nullable(),
    id_unit_pembangkit: Yup.string().nullable(),
    id_pembangkit: Yup.string().nullable(),
    jenis_gi: Yup.string().required("Belum pilih jenis gi"),
    fungsi_scada: Yup.string().nullable(),
    ssot_number: Yup.string().nullable(),
    kode_lokasi: Yup.string(),
    status_listrik: Yup.string().nullable().transform((_, v) => (v == '1' ? '1' : '0')),
    lat: Yup.number().typeError("Latitude harus number").required('Latitude Wajib diisi'),
    lon: Yup.number().typeError("Longitude harus number").required('Longitude Wajib diisi'),
    id_up2b: Yup.number().typeError('Belum pilih UP2B').required('Belum pilih UP2B'),
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
  /** SUBSCRIBE CHANGES FORM */
  const watchUnitPembangkit = useWatch({ control, name: 'id_unit_pembangkit' });
  const watchProvince = useWatch({ control, name: 'id_ref_province' });
  const watchKabKota = useWatch({ control, name: 'id_ref_regency' });

  const onSubmitForm = (data: IJaringanGarduInduk) => {
    data.id_parent_lokasi = data?.id_pembangkit;
    data.id_ref_jenis_lokasi = JENIS_LOKASI().gardu_induk;
    data.tree_jaringan = 1;
    if (id) {
      data.id_user_update = currentUser.id_user
    } else {
      data.id_user_entri = currentUser.id_user
    }
    setDataParams(data);
  };

  return (
    <>
      <FormData
        setError={setError}
        setValue={setValue}
        dataParams={dataParams}
        fields={JarianganGarduIndukField}
        path={API_PATH().master.jaringan.ref_lokasi}
        customLabel='state'
        onLoading={setLoading}
        onGetDataResult={setSelectedData}
      >
        <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
          <Row className='mb-3'>
            <Col md="7">
              <Form.Group className='mt-3'>
                <Form.Label>
                  Unit Pembangkit <RequiredInfo />
                </Form.Label>
                <SelectAsyncDynamic
                  fieldName="id_unit_pembangkit"
                  placeholder='Pilih unit pembangkit'
                  control={control}
                  errors={errors}
                  labelField={'nama_lokasi'}
                  valueField={'id_ref_lokasi'}
                  pathServiceName={'master.jaringan.ref_lokasi'}
                  options={dataSelected?.unit_pembangkit}
                  queryParams={{
                    sort_by: 'nama_lokasi',
                    id_ref_jenis_lokasi: JENIS_LOKASI().unit_pembangkit
                  }}
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
                  Pembangkit <RequiredInfo />
                </Form.Label>
                <SelectAsyncDynamic
                  fieldName="id_pembangkit"
                  fieldNameParent='id_parent_lokasi'
                  placeholder='Pilih pembangkit'
                  control={control}
                  errors={errors}
                  watchParent={watchUnitPembangkit}
                  setValue={setValue}
                  labelField={'nama_lokasi'}
                  valueField={'id_ref_lokasi'}
                  pathServiceName={'master.jaringan.ref_lokasi'}
                  options={dataSelected?.parent_lokasi}
                  queryParams={{
                    sort_by: 'nama_lokasi',
                    id_ref_jenis_lokasi: JENIS_LOKASI().pembangkit
                  }}
                ></SelectAsyncDynamic>
              </Form.Group>
              <Form.Group className='mt-3'>
                <Form.Label>
                  UP2B <RequiredInfo />
                </Form.Label>
                <SelectAsyncDynamic
                  fieldName="id_up2b"
                  placeholder='Pilih UP2B'
                  control={control}
                  errors={errors}
                  labelField={'nama_lokasi'}
                  valueField={'id_ref_lokasi'}
                  pathServiceName={'master.jaringan.ref_lokasi'}
                  options={dataSelected?.id_up2b}
                  queryParams={{ sort_by: 'nama_lokasi', id_ref_jenis_lokasi: JENIS_LOKASI().up2b }}
                ></SelectAsyncDynamic>
              </Form.Group>
              <Form.Group className='mt-3' controlId='kode_lokasi'>
                <Form.Label>
                  Kode Gardu Induk<RequiredInfo />
                </Form.Label>
                <Form.Control
                  {...register('kode_lokasi')}
                  isInvalid={errors.kode_lokasi}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.kode_lokasi?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className='mt-3' controlId='nama_lokasi'>
                <Form.Label>
                  Nama Gardu Induk <RequiredInfo />
                </Form.Label>
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
                <Form.Control as='textarea' isInvalid={errors.alamat}  {...register('alamat')} rows={4} />
                <Form.Control.Feedback type='invalid'>
                  {errors?.alamat?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className='mt-3'>
                <Form.Label>
                  Jenis GI <RequiredInfo />
                </Form.Label>
                <SelectFormStatic
                  control={control}
                  errors={errors}
                  fieldName="jenis_gi"
                  placeholder='Pilih Jenis GI'
                  options={optionDataJenisGI}
                  defaultValue={dataSelected?.jenis_gi}

                ></SelectFormStatic>
              </Form.Group>

              <Form.Group className='mt-3'>
                <Form.Label>
                  Fungsi Scada <RequiredInfo />
                </Form.Label>
                <Form.Control
                  {...register('fungsi_scada')}
                  isInvalid={errors.fungsi_scada}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.fungsi_scada?.message}
                </Form.Control.Feedback>
                {/* <SelectFormStatic
                  control={control}
                  errors={errors}
                  fieldName="fungsi_scada"
                  placeholder='Pilih Fungsi Scada'
                  options={optionDataFungsiScada}
                  defaultValue={dataSelected?.fungsi_scada}

                ></SelectFormStatic> */}
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
                <Form.Control {...register('lat')} isInvalid={errors.lat} type='number' />
                <Form.Control.Feedback type='invalid'>
                  {errors?.lat?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className='mt-3' controlId='lon'>
                <Form.Label>Longitude <RequiredInfo /></Form.Label>
                <Form.Control {...register('lon')} isInvalid={errors.lon} type='number' />
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
