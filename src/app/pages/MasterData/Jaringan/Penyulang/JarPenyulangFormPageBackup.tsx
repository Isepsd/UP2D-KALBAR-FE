import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Row, Col, Form } from 'react-bootstrap';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import ButtonCancel from '@app/components/Button/ButtonCancel';
import FormData from '@app/modules/Form/FormData';

import { IJaringanPenyulang, JaringanPenyulangField } from '@app/interface/jaringan-penyulang.interface';
import RequiredInfo from '@app/components/Info/RequiredInfo';
import { JENIS_LOKASI } from '@app/configs/jenis-lokasi.config';
import { OPTIONS_JENIS_JARINGAN, OPTIONS_STATUS_JARINGAN } from '@app/configs/select-options.config';

import { API_PATH } from '@app/services/_path.service';
import SelectAsyncDynamic from '@app/modules/SelectForm/SelectAsyncDynamic';
import Button from '@app/components/Button/Button';
import SelectFormStatic from '@app/modules/SelectForm/SelectFormStatic';
import FormMappingScada from '@app/modules/MasterData/FormMappingScada';
import { OPTIONS_FUNGSI_PERALATAN, OPTIONS_JENIS_PENYULANG } from '@app/configs/select-options/jaringan.select';

export default function JarPenyulangForm() {
  const { id } = useParams();

  const { currentUser } = useSelector((state: any) => state.auth);

  const statusJaringanOptions = OPTIONS_STATUS_JARINGAN();
  const jenisJaringanOptions = OPTIONS_JENIS_JARINGAN();
  const jenisPenyulang = OPTIONS_JENIS_PENYULANG;
  const fungsiLokasi = OPTIONS_FUNGSI_PERALATAN;

  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();
  const [dataSelected, setDataSelected] = useState<any>();

  /** FORM  HANDLE */
  const validationSchema: any = Yup.object().shape({
    nama_lokasi: Yup.string().required('Nama Wajib diisi'),
    alamat: Yup.string().required('Data Wajib diisi'),
    id_gardu_induk: Yup.number().typeError('Belum pilih gardu induk').required('Belum pilih gardu induk'),
    id_trafo_gi: Yup.number().typeError('Belum pilih Trafo').required('Belum pilih Trafo'),
    id_uid: Yup.number().typeError('Belum pilih unit induk').required('Belum pilih unit induk'),
    id_up3_1: Yup.number().typeError('Belum pilih UP3').required('Belum pilih UP3'),
    id_ulp_1: Yup.number().nullable(),
    jenis_jaringan: Yup.string().nullable(),
    jenis_penyulang: Yup.string().nullable(),
    fungsi_lokasi: Yup.string().nullable(),
    status_penyulang: Yup.string().nullable(),
    status_listrik: Yup.string().nullable().transform((_, v) => (v == '1' ? '1' : '0')),
    rekon_beban: Yup.string().nullable().transform((_, v) => (v == '1' ? '1' : '0')),
    // lat: Yup.number().typeError("Latitude harus number").required('Latitude Wajib diisi'),
    // lon: Yup.number().typeError("Longitude harus number").required('Longitude Wajib diisi'),
    pemilik: Yup.string().nullable().required('Pemilik Wajib diisi'),
    i_max: Yup.string().nullable().required('Arus max Wajib diisi'),
    dcc: Yup.string().nullable().required('DCC Wajib diisi'),
    // id_i: Yup.string().required('ID Arus harus diisi'),
    // id_v: Yup.string().required('ID Tegangan harus diisi'),
    // id_p: Yup.string().required('ID Daya harus diisi'),
    // id_amr: Yup.string().required('ID AMR harus diisi'),
    // id_portal_ext: Yup.string().required('ID Portal EXT harus diisi'),
    // ratio_ct: Yup.number().typeError('Data ini harus bilangan bulat').required('Data ini harus diisi'),
    // ratio_vt: Yup.number().typeError('Data ini harus bilangan bulat').required('Data ini harus diisi'),
    // faktor_kali: Yup.string().nullable().required('Faktor Kali harus diisi'),

    sinkron_data: Yup.string().required('Sinkron data harus diisi'),
    id_i: Yup.string().nullable(),
    kode_lokasi: Yup.string(),
    id_v: Yup.string().nullable(),
    id_p: Yup.string().nullable(),
    id_amr: Yup.string().nullable(),
    id_portal_ext: Yup.string().nullable(),
    panjang_jaringan: Yup.number().typeError("Data harus number"),
    jumlah_pelanggan: Yup.number().typeError("Data harus number"),
    // no_urut: Yup.string().typeError("Data harus angka").required('No Urut Cell harus diisi'),
    url_webservice: Yup.string().nullable()
  });

  const [formModel] = useState<any>({ status_listrik: '1', lat: 0, lon: 0, id_ref_province: process.env.ADM_PROVINCE, rekon_beban: "0" });
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
  const watchUnitInduk = useWatch({ control, name: 'id_uid' });
  const watchUP3_1 = useWatch({ control, name: 'id_up3_1' });
  // const watchProvince = useWatch({ control, name: 'id_ref_province' });
  // const watchKabKota = useWatch({ control, name: 'id_ref_regency' });

  const onSubmitForm = (data: IJaringanPenyulang) => {
    data.id_parent_lokasi = data?.id_trafo_gi;
    data.id_ref_jenis_lokasi = JENIS_LOKASI().penyulang;
    data.tree_jaringan = 1;
    if (id) {
      data.id_user_update = currentUser.id_user
    } else {
      data.id_user_entri = currentUser.id_user
    }
    setDataParams(data);
  };

  // console.log("errors", errors);


  return (
    <>
      <FormData
        setError={setError}
        setValue={setValue}
        dataParams={dataParams}
        fields={JaringanPenyulangField}
        path={API_PATH().master.jaringan.ref_lokasi}
        customLabel='state'
        onLoading={setLoading}
        onGetDataResult={setDataSelected}
      >
        <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
          <Row className='mb-3'>
            {/* LEFT COLUMN  */}
            <Col md="7">
              <Form.Group className='mt-3' controlId='kode_lokasi'>
                <Form.Label>
                  Kode Penyulang <RequiredInfo />
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
                  Nama Penyulang <RequiredInfo />
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
                <Form.Label>
                  Coverage
                </Form.Label>
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
                <Form.Label>
                  Gardu Induk <RequiredInfo />
                </Form.Label>
                <SelectAsyncDynamic
                  fieldName="id_gardu_induk"
                  fieldNameParent="id_ulp_1"
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
              <Form.Group className='mt-3' controlId='status_jaringan'>
                <Form.Label>Jenis Jaringan</Form.Label>
                <SelectFormStatic
                  control={control}
                  errors={errors}
                  fieldName={'jenis_jaringan'}
                  options={jenisJaringanOptions}
                ></SelectFormStatic>
              </Form.Group>
              <Form.Group className='mt-3' controlId='status_penyulang'>
                <Form.Label>Status Penyulang</Form.Label>
                <SelectFormStatic
                  control={control}
                  errors={errors}
                  fieldName={'status_penyulang'}
                  options={statusJaringanOptions}
                ></SelectFormStatic>
              </Form.Group>
              <Form.Group className='mt-3' controlId='jenis_peralatan'>
                <Form.Label>Jenis Penyulang</Form.Label>
                {/* <Form.Control
                  {...register('jenis_peralatan')}
                  isInvalid={errors.nama_lokasi}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.jenis_peralatan?.message}
                </Form.Control.Feedback> */}
                <SelectFormStatic
                  control={control}
                  errors={errors}
                  fieldName={'jenis_peralatan'}
                  options={jenisPenyulang}
                ></SelectFormStatic>
              </Form.Group>
              <Form.Group className='mt-3' controlId='status_jaringan'>
                <Form.Label>Fungsi Lokasi</Form.Label>
                <SelectFormStatic
                  control={control}
                  errors={errors}
                  fieldName={'fungsi_lokasi'}
                  options={fungsiLokasi}
                ></SelectFormStatic>
              </Form.Group>



              <Form.Group className='mt-3' controlId='pemilik'>
                <Form.Label>
                  Pemilik<RequiredInfo />
                </Form.Label>
                <SelectAsyncDynamic
                  fieldName='pemilik'
                  pathServiceName='master.jaringan.pemilik'
                  labelField='nama'
                  valueField='nama'
                  placeholder='Pilih...'
                  isClearable={true}
                  errors={errors}
                  control={control}
                  queryParams={{
                    page: -1,
                    limit: -1,
                    status: 1
                  }}
                />
              </Form.Group>
              <Form.Group className='mt-3' controlId='i_max'>
                <Form.Label>
                  Arus Max (A)<RequiredInfo />
                </Form.Label>
                <Form.Control
                  {...register('i_max')}
                  isInvalid={errors.i_max}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.i_max?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className='mt-3' controlId='jumlah_pelanggan'>
                <Form.Label>
                  Total Pelanggan<RequiredInfo />
                </Form.Label>
                <Form.Control
                  {...register('jumlah_pelanggan')}
                  isInvalid={errors.jumlah_pelanggan}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.jumlah_pelanggan?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className='mt-3'>
                <Form.Label>
                  Unit Induk <RequiredInfo />
                </Form.Label>
                <SelectAsyncDynamic
                  fieldName="id_uid"
                  control={control}
                  errors={errors}
                  labelField={'nama_lokasi'}
                  valueField={'id_ref_lokasi'}
                  pathServiceName={'master.jaringan.ref_lokasi'}
                  queryParams={{ id_ref_jenis_lokasi: JENIS_LOKASI().uiw }}
                  setValue={setValue}
                  options={dataSelected?.uid}
                ></SelectAsyncDynamic>
              </Form.Group>
              <Form.Group className='mt-3'>
                <Form.Label>
                  UP3/UP2D <RequiredInfo />
                </Form.Label>
                <SelectAsyncDynamic
                  fieldName="id_up3_1"
                  fieldNameParent="id_uid"
                  control={control}
                  errors={errors}
                  labelField={'nama_lokasi'}
                  valueField={'id_ref_lokasi'}
                  pathServiceName={'master.jaringan.ref_lokasi'}
                  queryParams={{ id_ref_jenis_lokasi: JENIS_LOKASI().up3 }}
                  setValue={setValue}
                  watchParent={watchUnitInduk}
                  isDisabled={!watchUnitInduk}
                  options={dataSelected?.up3_1}
                ></SelectAsyncDynamic>
              </Form.Group>
              <Form.Group className='mt-3'>
                <Form.Label>
                  ULP
                </Form.Label>
                <SelectAsyncDynamic
                  fieldName="id_ulp_1"
                  fieldNameParent="id_up3_1"
                  control={control}
                  errors={errors}
                  labelField={'nama_lokasi'}
                  valueField={'id_ref_lokasi'}
                  pathServiceName={'master.jaringan.ref_lokasi'}
                  queryParams={{ id_ref_jenis_lokasi: JENIS_LOKASI().ulp }}
                  setValue={setValue}
                  watchParent={watchUP3_1}
                  isDisabled={!watchUP3_1}
                  options={dataSelected?.ulp_1}
                ></SelectAsyncDynamic>
              </Form.Group>
              <Form.Group className='mt-3' controlId='dcc'>
                <Form.Label>
                  DCC<RequiredInfo />
                </Form.Label>
                <Form.Control
                  {...register('dcc')}
                  isInvalid={errors.dcc}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.dcc?.message}
                </Form.Control.Feedback>
              </Form.Group>
              {/* <Form.Group className='mt-3' controlId='ratio_ct'>
                <Form.Label>
                  Ratio CT
                </Form.Label>
                <Form.Control
                  type="number"
                  {...register('ratio_ct')}
                  isInvalid={errors.ratio_ct}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.ratio_ct?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className='mt-3' controlId='ratio_vt'>
                <Form.Label>
                  Ratio VT
                </Form.Label>
                <Form.Control
                  type="number"
                  {...register('ratio_vt')}
                  isInvalid={errors.ratio_vt}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.ratio_vt?.message}
                </Form.Control.Feedback>
              </Form.Group> */}
              {/* <Form.Group className='mt-3' controlId='faktor_kali'>
                <Form.Label>
                  Faktor Kali<RequiredInfo />
                </Form.Label>
                <Form.Control
                  {...register('faktor_kali')}
                  isInvalid={errors.faktor_kali}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.faktor_kali?.message}
                </Form.Control.Feedback>
              </Form.Group> */}
              {/* <Form.Group className='mt-3'>
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
              </Form.Group> */}

              {/* <Form.Group className='mt-3' controlId='lat'>
                <Form.Label>
                  Latitude <RequiredInfo />
                </Form.Label>
                <Form.Control
                  {...register('lat')}
                  isInvalid={errors.lat}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.lat?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className='mt-3' controlId='lon'>
                <Form.Label>
                  Longitude <RequiredInfo />
                </Form.Label>
                <Form.Control
                  {...register('lon')}
                  isInvalid={errors.lon}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.lon?.message}
                </Form.Control.Feedback>
              </Form.Group> */}
              {/* <Form.Group className='mt-3' controlId='kva'>
                <Form.Label>KVA</Form.Label>
                <Form.Control
                  {...register('kva')}
                  isInvalid={errors.kva}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.kva?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className='mt-3' controlId='phase'>
                <Form.Label>Phase</Form.Label>
                <Form.Control
                  {...register('phase')}
                  isInvalid={errors.phase}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.phase?.message}
                </Form.Control.Feedback>
              </Form.Group> */}
              {/* <Form.Group className='mt-3' controlId='no_urut'>
                <Form.Label>No Urut Cell</Form.Label>
                <Form.Control
                  type="number"
                  {...register('no_urut')}
                  isInvalid={errors.no_urut}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.no_urut?.message}
                </Form.Control.Feedback>
              </Form.Group> */}
              <Form.Group className='mt-3' controlId='rekon_beban'>
                <Form.Label>Rekon Beban</Form.Label>
                <div>
                  <Form.Check
                    {...register('rekon_beban')}
                    inline
                    type='radio'
                    value='1'
                    label='Iya'
                  />
                  <Form.Check
                    {...register('rekon_beban')}
                    inline
                    type='radio'
                    value='0'
                    label='Tidak'
                  />
                </div>
                <Form.Control.Feedback type='invalid'>
                  {errors?.rekon_beban?.message}
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
            <Col md="5">
              <FormMappingScada
                control={control}
                errors={errors}
                register={register}
                dataSelected={dataSelected}
              />
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
