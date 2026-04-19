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

import { IIJaringanPengamananSutm, IJaringanPengamananSutmField } from '@app/interface/pengaman-sutm.interface';
import RequiredInfo from '@app/components/Info/RequiredInfo';
import { JENIS_LOKASI } from '@app/configs/jenis-lokasi.config';
import { API_PATH } from '@app/services/_path.service';
import { getByIdPath } from '@app/services/main.service';
import SelectAsyncDynamic from '@app/modules/SelectForm/SelectAsyncDynamic';
import Button from '@app/components/Button/Button';
import SelectFormStatic from '@app/modules/SelectForm/SelectFormStatic';
import { FUNGSI_SCADA_SUTM,JENSI_PERALATAN,FUNGSI_LOKASI,OPTIONS_ZONA,JENIS_GARDU_GH } from '@app/configs/select-options/jaringan.select';
import FormMappingScada from '@app/modules/MasterData/FormMappingScada';

function JarPengamananSutmForm() {
  const source = axios.CancelToken.source();

  const { id } = useParams();

  const { currentUser } = useSelector((state: any) => state.auth);

  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();
  const [dataSelected, setDataSelected] = useState<any>();

  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    nama_lokasi: Yup.string().required('Nama Wajib diisi'),
    // kode_gardu: Yup.string().nullable(),
    jumlah_pelanggan: Yup.string().nullable(),
    kva: Yup.string().nullable(),
    alamat: Yup.string().nullable(),
    // fungsi_scada: Yup.string().required("Data belum dipilih"),
    fungsi_lokasi: Yup.string().required("Data belum dipilih"),
    // id_gardu_induk: Yup.number().typeError('Belum pilih gardu induk').required('Belum pilih gardu induk'),
    // id_trafo_gi: Yup.number().typeError('Belum pilih Trafo').required('Belum pilih Trafo'),
    id_penyulang: Yup.number().typeError('Belum pilih penyulang').required('Belum pilih penyulang'),
    // id_zone: Yup.number().typeError('Belum pilih zone').required('Belum pilih zone'),
    // id_section: Yup.number().typeError('Belum pilih section').required('Belum pilih section'),
    // id_segment: Yup.number().typeError('Belum pilih segment').required('Belum pilih segmemt'),
    status_listrik: Yup.string().nullable().transform((_, v) => (v == '1' ? '1' : '0')),
    lat: Yup.number().typeError("Latitude harus number").required('Latitude Wajib diisi'),
    lon: Yup.number().typeError("Longitude harus number").required('Longitude Wajib diisi'),
    id_uid: Yup.number().nullable().transform((_, val) => val === Number(val) ? val : null),
    id_ulp_1: Yup.number().nullable().transform((_, val) => val === Number(val) ? val : null),
    id_up3_1: Yup.number().nullable().transform((_, val) => val === Number(val) ? val : null),
    sinkron_data: Yup.string().nullable(),
    id_i: Yup.string().nullable(),
    id_v: Yup.string().nullable(),
    id_p: Yup.string().nullable(),
    id_amr: Yup.string().nullable(),
    id_portal_ext: Yup.string().nullable(),
    rekon_beban: Yup.string().nullable().transform((_, v) => (v == '1' ? '1' : '0')),
  });

  const [formModel] = useState<any>({ status_listrik: '1', lat: 0, lon: 0, id_ref_province: process.env.ADM_PROVINCE });
  const { register, handleSubmit, setValue, setError, control,  formState } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: formModel,
  });
  const { errors }: any = formState || {};
  /** SUBSCRIBE FORM CHANGES */
  // const watchGarduInduk = useWatch({ control, name: 'id_gardu_induk' });
  // const watchTrafoGI = useWatch({ control, name: 'id_trafo_gi' });
  const watchPenyulang = useWatch({ control, name: 'id_penyulang' });
  // const watchZone = useWatch({ control, name: 'id_zone' });
  // const watchSection = useWatch({ control, name: 'id_section' });
  const watchUnitInduk = useWatch({ control, name: 'id_uid' });
  const watchUP3_1 = useWatch({ control, name: 'id_up3_1' });
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

  const onSubmitForm = (data: IIJaringanPengamananSutm) => {
    data.id_parent_lokasi = data?.id_penyulang;
    data.id_ref_jenis_lokasi = JENIS_LOKASI().keypoint;
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
      setValue("id_trafo_gi", req?.results?.parent_lokasi?.id_ref_lokasi)
      setValue("id_gardu_induk", req?.results?.parent_lokasi?.id_parent_lokasi)
      // setValue("id_uid", req?.results?.id_uid?.id_ref_lokasi)
      // setValue("id_up3_1", req?.results?.id_up3_1?.id_ref_lokasi)
      // setValue("id_ulp_1", req?.results?.id_ulp_1?.id_ref_lokasi)
    } catch { }
  };

  return (
    <>
      <FormData
        setError={setError}
        setValue={setValue}
        dataParams={dataParams}
        fields={IJaringanPengamananSutmField}
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
                <Form.Label>Kode KP <RequiredInfo /></Form.Label>
                <Form.Control {...register('kode_lokasi')} isInvalid={errors.kode_lokasi} />
                <Form.Control.Feedback type='invalid'> {errors?.kode_lokasi?.message} </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className='mt-3' controlId='nama_lokasi'>
                <Form.Label>Nama KP <RequiredInfo /></Form.Label>
                <Form.Control {...register('nama_lokasi')} isInvalid={errors.nama_lokasi} />
                <Form.Control.Feedback type='invalid'> {errors?.nama_lokasi?.message} </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className='mt-3'>
                <Form.Label> Fungsi Lokasi <RequiredInfo /> </Form.Label>
                <SelectFormStatic
                  control={control}
                  errors={errors}
                  fieldName="fungsi_lokasi"
                  placeholder='Pilih Fungsi Lokasi'
                  options={FUNGSI_LOKASI}
                  defaultValue={dataSelected?.fungsi_lokasi}
                />
                <Form.Control.Feedback type='invalid'> {errors?.fungsi_lokasi?.message} </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className='mt-3'>
                <Form.Label> Penyulang <RequiredInfo /> </Form.Label>
                <SelectAsyncDynamic
                  fieldName="id_penyulang"
                  control={control}
                  errors={errors}
                  labelField={'nama_lokasi'}
                  valueField={'id_ref_lokasi'}
                  pathServiceName={'master.jaringan.ref_lokasi'}
                  queryParams={{ id_ref_jenis_lokasi: JENIS_LOKASI().penyulang }}
                  setValue={setValue}
                  options={dataSelected?.penyulang}
                  isClearable={true}
                ></SelectAsyncDynamic>
              </Form.Group>

              <Form.Group className='mt-3' controlId='jenis_peralatan'>
                <Form.Label>Jenis Peralatan<RequiredInfo /></Form.Label>
                <SelectFormStatic
                  control={control}
                  errors={errors}
                  fieldName={'jenis_peralatan'}
                  options={JENSI_PERALATAN}
                  placeholder="Pilih Jenis Peralatan"
                  isClearable={true}
                />
              </Form.Group>

              <Form.Group className='mt-3'>
                <Form.Label> Fungsi Scada <RequiredInfo /> </Form.Label>
                <SelectFormStatic
                  control={control}
                  errors={errors}
                  fieldName="fungsi_scada"
                  placeholder='Pilih Fungsi Scada'
                  options={FUNGSI_SCADA_SUTM}
                  defaultValue={dataSelected?.fungsi_scada}
                  isClearable={true}
                />
                <Form.Control.Feedback type='invalid'> {errors?.fungsi_scada?.message} </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className='mt-3' controlId='zona'>
                <Form.Label> Zona </Form.Label>
                <SelectFormStatic
                  control={control}
                  errors={errors}
                  fieldName="zona"
                  options={OPTIONS_ZONA}
                  isClearable={true}
                />
                <Form.Control.Feedback type='invalid'> {errors?.zona?.message} </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className='mt-3' controlId='jenis_gardu'>
                <Form.Label>Jenis Gardu</Form.Label>
                <SelectFormStatic
                  control={control}
                  errors={errors}
                  fieldName="jenis_gardu"
                  options={JENIS_GARDU_GH}
                  placeholder="Pilih ..."
                  isClearable={true}
                />
                <Form.Control.Feedback type='invalid'> {errors?.jenis_gardu?.message} </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className='mt-3' controlId='alamat'>
                <Form.Label> Coverage </Form.Label>
                <Form.Control  as="textarea" {...register('alamat')} isInvalid={errors.alamat} rows={4} />
                <Form.Control.Feedback type='invalid'> {errors?.alamat?.message} </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className='mt-3' controlId='panjang_jaringan'>
                <Form.Label>Panjang Jaringan</Form.Label>
                <Form.Control type="number" {...register('panjang_jaringan')} isInvalid={errors.panjang_jaringan} />
                <Form.Control.Feedback type='invalid'> {errors?.panjang_jaringan?.message} </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className='mt-3' controlId='jumlah_pelanggan'>
                <Form.Label>Jumlah Pelanggan</Form.Label>
                <Form.Control type="number" {...register('jumlah_pelanggan')} isInvalid={errors.jumlah_pelanggan} />
                <Form.Control.Feedback type='invalid'> {errors?.jumlah_pelanggan?.message} </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className='mt-3' controlId='kva'>
                <Form.Label>Total Daya(kVA) </Form.Label>
                <Form.Control {...register('kva')}  isInvalid={errors.kva} />
                <Form.Control.Feedback type='invalid'> {errors?.kva?.message} </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className='mt-3'>
                <Form.Label> Unit Induk </Form.Label>
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
                  isClearable={true}
                ></SelectAsyncDynamic>
              </Form.Group>

              <Form.Group className='mt-3'>
                <Form.Label> UP3/UP2D  </Form.Label>
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
                  isClearable={true}
                ></SelectAsyncDynamic>
              </Form.Group>

              <Form.Group className='mt-3'>
                <Form.Label> ULP </Form.Label>
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
                  isClearable={true}
                ></SelectAsyncDynamic>
              </Form.Group>

              <Form.Group className='mt-3' controlId='pemilik'>
                <Form.Label> Pemilik </Form.Label>
                <SelectAsyncDynamic
                  fieldName='pemilik'
                  pathServiceName='master.jaringan.pemilik'
                  labelField='nama'
                  valueField='nama'
                  placeholder='Pilih...'
                  isClearable={true}
                  errors={errors}
                  control={control}
                  queryParams={{ page: -1, limit: -1, status: 1 }}
                />
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
                  isClearable={true}
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
                  isClearable={true}
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
                  isClearable={true}
                ></SelectAsyncDynamic>
              </Form.Group>

              <Form.Group className='mt-3' controlId='lat'>
                <Form.Label>Latitude <RequiredInfo /></Form.Label>
                <Form.Control  {...register('lat')} isInvalid={errors.lat} type="number" />
                <Form.Control.Feedback type='invalid'> {errors?.lat?.message} </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className='mt-3' controlId='lon'>
                <Form.Label>Longitude <RequiredInfo /></Form.Label>
                <Form.Control {...register('lon')}  isInvalid={errors.lon}  type="number" />
                <Form.Control.Feedback type='invalid'> {errors?.lon?.message} </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className='mt-3' controlId='rekon_beban'>
                <Form.Label>Rekon Beban</Form.Label>
                <div>
                  <Form.Check {...register('rekon_beban')} inline type='radio' value='1' label='Iya' />
                  <Form.Check {...register('rekon_beban')} inline type='radio'  value='0' label='Tidak' />
                </div>
                <Form.Control.Feedback type='invalid'> {errors?.rekon_beban?.message} </Form.Control.Feedback>
              </Form.Group>
              
              <Form.Group className='mt-3' controlId='status'>
                <Form.Label>Status</Form.Label>
                <div>
                  <Form.Check {...register('status_listrik')} inline  type='radio' value='1' label='Active' />
                  <Form.Check {...register('status_listrik')} inline type='radio' value='0' label='Inactive' />
                </div>
                <Form.Control.Feedback type='invalid'>  {errors?.status?.message} </Form.Control.Feedback>
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

export default JarPengamananSutmForm