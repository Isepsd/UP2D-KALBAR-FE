import React, { useState } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import ButtonCancel from '@app/components/Button/ButtonCancel';
import FormData from '@app/modules/Form/FormData';

import { IJaringanVIP, JaringanVIPField } from '@app/interface/jaringan-pelanggan-vip.interface';
import RequiredInfo from '@app/components/Info/RequiredInfo';
import { JENIS_LOKASI } from '@app/configs/jenis-lokasi.config';
import { API_PATH } from '@app/services/_path.service';
import SelectAsyncDynamic from '@app/modules/SelectForm/SelectAsyncDynamic';
import SelectFormStatic from '@app/modules/SelectForm/SelectFormStatic';
import Button from '@app/components/Button/Button';


export default function JarPelangganVipFormPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataSelected, setDataSelected] = useState<any>();
  const [dataParams, setDataParams] = useState<any>();

  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    id_ref_lokasi: Yup.number().typeError('Belum pilih Penyulang/KP').required('Belum pilih Penyulang/KP'),
    idpel: Yup.number().typeError('ID Pelanggan wajib diisi').required('ID Pelanggan wajib diisi'),
    nama: Yup.string().typeError('Nama wajib diisi').required('Nama wajib diisi'),
    nama_section: Yup.string().typeError('Nama Section wajib diisi').required('Nama Section wajib diisi'),
    alamat: Yup.string().nullable(),
    no_kontak: Yup.string().nullable(),
    daya_tersambung: Yup.number().typeError("Daya Tersambung harus number").required('Daya Tersambung Wajib diisi'),
    satuan_daya_tersambung: Yup.string().nullable(),
    id_up3: Yup.number().typeError('Belum pilih UP3').required('Belum pilih UP3'),
    id_ulp: Yup.number().typeError('Belum pilih ULP').required('Belum pilih ULP'),
    id_ultg: Yup.number().typeError('Belum pilih ULTG').required('Belum pilih ULTG'),
  });

  const [formModel] = useState<any>({});
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
  const watchUP3 = useWatch({ control, name: 'id_up3' });
  const watchStatus = useWatch({ control, name: 'status' });

  const onSubmitForm = (data: IJaringanVIP) => {
    setDataParams(data);
  };


  return (
    <>
      <FormData
        setError={setError}
        setValue={setValue}
        dataParams={dataParams}
        fields={JaringanVIPField}
        path={API_PATH().master.jaringan.pelanggan_vip}
        customLabel='state'
        onLoading={setLoading}
        onGetDataResult={setDataSelected}
      >
        <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
          <Row className='mb-3'>
            {/* LEFT COLUMN  */}
            <Col md="7">

              <Form.Group className='mt-3' controlId='id_ref_lokasi'>
                <Form.Label>
                  Penyulang/KP <RequiredInfo />
                </Form.Label>
                <SelectAsyncDynamic
                  fieldName="id_ref_lokasi"
                  control={control}
                  errors={errors}
                  labelField={'nama_lokasi'}
                  valueField={'id_ref_lokasi'}
                  pathServiceName={'master.jaringan.ref_lokasi'}
                  queryParams={{ sort_by: 'id_ref_jenis_lokasi', id_ref_jenis_lokasi_in: `${JENIS_LOKASI().penyulang},${JENIS_LOKASI().keypoint}` }}
                  setValue={setValue}
                  options={dataSelected?.ref_lokasi}
                ></SelectAsyncDynamic>
              </Form.Group>

              <Form.Group className='mt-3' controlId='nama_section'>
                <Form.Label>
                  Nama Section<RequiredInfo />
                </Form.Label>
                <Form.Control
                  {...register('nama_section')}
                  isInvalid={errors.nama_section}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.nama_section?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className='mt-3' controlId='nama'>
                <Form.Label>
                  Nama Pelanggan<RequiredInfo />
                </Form.Label>
                <Form.Control
                  {...register('nama')}
                  isInvalid={errors.nama}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.nama?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className='mt-3' controlId='idpel'>
                <Form.Label> ID Pelanggan<RequiredInfo /> </Form.Label>
                <Form.Control
                  {...register('idpel')}
                  isInvalid={errors.idpel}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.idpel?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className='mt-3' controlId='alamat'>
                <Form.Label>  Alamat  </Form.Label>
                <Form.Control
                  as='textarea'
                  {...register('alamat')}
                  isInvalid={errors.alamat}
                  style={{ height: '8rem' }}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.alamat?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className='mt-3' controlId='no_kontak'>
                <Form.Label> No Kontak  </Form.Label>
                <Form.Control
                  {...register('no_kontak')}
                  isInvalid={errors.no_kontak}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.no_kontak?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className='mt-3' controlId='daya_tersambung'>
                <Form.Label>
                  Daya Tersambung <RequiredInfo />
                </Form.Label>
                <Form.Control
                  {...register('daya_tersambung')}
                  isInvalid={errors.daya_tersambung}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.daya_tersambung?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className='mt-3' controlId='satuan_daya_tersambung'>
                <Form.Label>Satuan Daya Tersambung</Form.Label>
                <SelectFormStatic
                  control={control}
                  errors={errors}
                  fieldName='satuan_daya_tersambung'
                  placeholder='Pilih'
                  options={[
                    { label: 'VA', value: 'VA' },
                    { label: 'KVA', value: 'KVA' },
                    { label: 'MVA', value: 'MVA' },
                  ]}
                  isClearable={true}
                />
              </Form.Group>

              <Form.Group className='mt-3' controlId='id_up3'>
                <Form.Label> UP3 <RequiredInfo />  </Form.Label>
                <SelectAsyncDynamic
                  fieldName="id_up3"
                  control={control}
                  errors={errors}
                  labelField={'nama_lokasi'}
                  valueField={'id_ref_lokasi'}
                  pathServiceName={'master.jaringan.ref_lokasi'}
                  queryParams={{ id_ref_jenis_lokasi: JENIS_LOKASI().up3 }}
                  setValue={setValue}
                  options={dataParams?.up3}
                ></SelectAsyncDynamic>
              </Form.Group>

              <Form.Group className='mt-3' controlId='id_ulp'>
                <Form.Label> ULP </Form.Label>
                <SelectAsyncDynamic
                  fieldName="id_ulp"
                  fieldNameParent="id_up3_1"
                  control={control}
                  errors={errors}
                  labelField={'nama_lokasi'}
                  valueField={'id_ref_lokasi'}
                  pathServiceName={'master.jaringan.ref_lokasi'}
                  queryParams={{ id_ref_jenis_lokasi: JENIS_LOKASI().ulp }}
                  setValue={setValue}
                  watchParent={watchUP3}
                  isDisabled={!watchUP3}
                  options={dataSelected?.id_ulp}
                ></SelectAsyncDynamic>
              </Form.Group>

              <Form.Group className='mt-3' controlId='id_ultg'>
                <Form.Label> ULTG <RequiredInfo /> </Form.Label>
                <SelectAsyncDynamic
                  fieldName="id_ultg"
                  control={control}
                  errors={errors}
                  options={dataSelected?.id_ultg}
                  labelField={'nama_lokasi'}
                  valueField={'id_ref_lokasi'}
                  pathServiceName={'master.jaringan.ref_lokasi'}
                  queryParams={{ sort_by: 'nama_lokasi', id_ref_jenis_lokasi: JENIS_LOKASI().ultg }}
                ></SelectAsyncDynamic>
              </Form.Group>

              <Form.Group className='mt-3' controlId='status'>
                <Form.Label>Status</Form.Label>
                <div className='ms-3 py-2'>
                  <Form.Check
                    type='switch'
                    id='status'
                    {...register('status')}
                    label={watchStatus ? 'Aktif' : 'Tidak Aktif'}
                  />
                </div>
                <Form.Control.Feedback type='invalid'>
                  {errors?.status?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
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