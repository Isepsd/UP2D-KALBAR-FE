import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Row, Col, Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import ButtonCancel from '@app/components/Button/ButtonCancel';
import FormData from '@app/modules/Form/FormData';

import { IJaringanTrafoGI, JaringanTrafoGIField } from '@app/interface/jaringan-trafo-gi.interface';
import RequiredInfo from '@app/components/Info/RequiredInfo';
import SelectRefLokasi from '@app/modules/SelectForm/SelectRefLokasi';
import { JENIS_LOKASI } from '@app/configs/jenis-lokasi.config';
import { API_PATH } from '@app/services/_path.service';
import SelectAsyncDynamic from '@app/modules/SelectForm/SelectAsyncDynamic';
import SelectFormStatic from '@app/modules/SelectForm/SelectFormStatic';
import { JENIS_TRAFO, JENIS_LAYANAN, STATUS_TRAFO } from '@app/configs/select-options/jaringan.select';
import FormMappingScada from '@app/modules/MasterData/FormMappingScada';

export default function JarTrafoGIForm() {
  const { id } = useParams();

  const { currentUser } = useSelector((state: any) => state.auth);

  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();
  const [dataSelected, setDataSelected] = useState<any>();
  const optionData = JENIS_TRAFO;
  const optionDataStatus = STATUS_TRAFO;
  const optionDataJenisLayanan = JENIS_LAYANAN;

  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    nama_lokasi: Yup.string().nullable().required('Nama Wajib diisi'),
    // alamat: Yup.string().nullable(),
    id_gardu_induk: Yup.number().typeError('Belum pilih gardu induk').required('Belum pilih gardu induk'),
    coverage: Yup.string().nullable(),
    // kva: Yup.string().nullable(),
    phase: Yup.string().nullable(),
    status_listrik: Yup.string().nullable().transform((_, v) => (v == '1' ? '1' : '0')),
    lat: Yup.number().typeError("Latitude harus number").required('Latitude Wajib diisi'),
    lon: Yup.number().typeError("Longitude harus number").required('Longitude Wajib diisi'),
    kapasitas: Yup.number().typeError("Kapasitas harus number").required('Kapasitas Wajib diisi'),
    sub_sistem: Yup.number().typeError("Sub sistem harus number").required('Sub sistem Wajib diisi'),
    pemilik: Yup.string().nullable().required('Pemilik Wajib diisi'),
    status_trafo: Yup.string().nullable(),
    jenis_trafo: Yup.string().nullable().required('Belum pilih  jenis trafo'),
    // i_max: Yup.string().nullable().required('I max harus diisi'),
    // ratio_ct: Yup.string().nullable(),
    // ratio_vt: Yup.string().nullable(),
    // fk_meter_pembanding: Yup.string().nullable(),
    // primer_tegangan_max: Yup.string().nullable(),
    // primer_tegangan_min: Yup.string().nullable(),
    // sekunder_tegangan_min: Yup.string().nullable(),
    // sekunder_tegangan_max: Yup.string().nullable(),
    sinkron_data: Yup.string().nullable().required('Sinkron data harus diisi'),
    jenis_layanan: Yup.string().nullable().required('Belum Pilih Jenis Layanan'),
    // id_i: Yup.string().required('ID Arus harus diisi'),
    // id_v: Yup.string().required('ID Tegangan harus diisi'),
    // id_p: Yup.string().required('ID Daya harus diisi'),
    // id_amr: Yup.string().required('ID AMR harus diisi'),
    // id_portal_ext: Yup.string().required('ID Portal EXT harus diisi'),
    // url_webservice: Yup.string().required('URL Webservice harus diisi'),

    id_i: Yup.string().nullable(),
    ssot_number: Yup.string().nullable(),
    id_v: Yup.string().nullable(),
    // id_p: Yup.string().nullable(),
    id_amr: Yup.string().nullable(),
    id_portal_ext: Yup.string().nullable(),
    url_webservice: Yup.string().nullable(),
    def_pengukuran_teg_primer: Yup.string().nullable(),
    def_pengukuran_teg_sekunder: Yup.string().nullable(),
    // no_urut: Yup.string().nullable(),
    def_nilai_cosq: Yup.string().nullable(),
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
  // const watchProvince = useWatch({ control, name: 'id_ref_province' });
  // const watchKabKota = useWatch({ control, name: 'id_ref_regency' });

  const onSubmitForm = (data: IJaringanTrafoGI) => {
    data.id_parent_lokasi = data?.id_gardu_induk;
    data.id_ref_jenis_lokasi = JENIS_LOKASI().trafo_gi;
    data.tree_jaringan = 1;
    if (id) {
      data.id_user_update = currentUser.id_user
    } else {
      data.id_user_entri = currentUser.id_user
    }
    let ratio_ct = data?.ratio_ct ? data?.ratio_ct : 0
    let ratio_vt = data?.ratio_vt ? data?.ratio_vt : 0
    data.fk_meter = ratio_vt * ratio_ct;

    setDataParams(data);
  };

  // console.log("errors", errors);


  return (
    <>
      <FormData
        setError={setError}
        setValue={setValue}
        dataParams={dataParams}
        fields={JaringanTrafoGIField}
        path={API_PATH().master.jaringan.ref_lokasi}
        customLabel='state'
        onLoading={setLoading}
        onGetDataResult={setDataSelected}
      >
        <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
          <Row className='mb-3'>
            {/* LEFT COLUMN  */}
            <Col md="7">

              <Form.Group className='mt-3' controlId='nama_lokasi'>
                <Form.Label>
                  Trafo<RequiredInfo />
                </Form.Label>
                <Form.Control
                  {...register('nama_lokasi')}
                  isInvalid={errors.nama_lokasi}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.nama_lokasi?.message}
                </Form.Control.Feedback>
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
              {/* <Form.Group className='mt-3' controlId='alamat'>
                <Form.Label>
                  Alamat
                </Form.Label>
                <Form.Control
                  as='textarea'
                  rows={4}
                  {...register('alamat')}
                  isInvalid={errors.alamat}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.alamat?.message}
                </Form.Control.Feedback>
              </Form.Group> */}

              <Form.Group className='mt-3' controlId='kapasitas'>
                <Form.Label>
                  Kapasitas (MVA) <RequiredInfo />
                </Form.Label>
                <Form.Control
                  {...register('kapasitas')}
                  type="number"
                  isInvalid={errors.kapasitas}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.kapasitas?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className='mt-3' controlId='sub_sistem'>
                <Form.Label>
                  Sub Sistem<RequiredInfo />
                </Form.Label>
                <SelectAsyncDynamic
                  fieldName='sub_sistem'
                  pathServiceName='master.jaringan.ref_lokasi'
                  labelField='nama_lokasi'
                  valueField='id_ref_lokasi'
                  placeholder='Pilih...'
                  isClearable={true}
                  errors={errors}
                  control={control}
                  queryParams={{
                    page: -1,
                    limit: -1,
                    status: 1,
                    id_ref_jenis_lokasi: (JENIS_LOKASI() as any)['subsistem'],
                  }}
                />
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
                {/* <Form.Control
                  {...register('pemilik')}
                  isInvalid={errors.pemilik}
                /> */}
                <Form.Control.Feedback type='invalid'>
                  {errors?.pemilik?.message}
                </Form.Control.Feedback>
              </Form.Group>
              {/* <Form.Group className='mt-3' controlId='coverage'>
                <Form.Label>
                  Coverage<RequiredInfo />
                </Form.Label>
                <Form.Control
                  as='textarea'
                  rows={4}
                  {...register('coverage')}
                  isInvalid={errors.coverage}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.coverage?.message}
                </Form.Control.Feedback>
              </Form.Group> */}
              <Form.Group className='mt-3' controlId='status_trafo'>
                <Form.Label>
                  Status Trafo
                </Form.Label>
                <SelectFormStatic
                  control={control}
                  errors={errors}
                  fieldName="status_trafo"
                  placeholder='Pilih Status Trafo'
                  options={optionDataStatus}
                  defaultValue={dataSelected?.status_trafo}

                ></SelectFormStatic>
                {/* <Form.Control
                  {...register('status_trafo')}
                  isInvalid={errors.status_trafo}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.status_trafo?.message}
                </Form.Control.Feedback> */}
              </Form.Group>

              <Form.Group className='mt-3'>
                <Form.Label>
                  Jenis Trafo <RequiredInfo />
                </Form.Label>
                <SelectFormStatic
                  control={control}
                  errors={errors}
                  fieldName="jenis_trafo"
                  placeholder='Pilih Trafo'
                  options={optionData}
                  defaultValue={dataSelected?.jenis_trafo}

                ></SelectFormStatic>
              </Form.Group>
              {/* <Form.Group className='mt-3' controlId='i_max'>
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
              </Form.Group> */}
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
              {/* <Form.Group className='mt-3' controlId='fk_meter_pembanding'>
                <Form.Label>
                  FK Meter Pembanding
                </Form.Label>
                <Form.Control
                  {...register('fk_meter_pembanding')}
                  isInvalid={errors.fk_meter_pembanding}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.fk_meter_pembanding?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className='mt-3' controlId='primer_tegangan_max'>
                <Form.Label>
                  Primer Tegangan Max (kV)
                </Form.Label>
                <Form.Control
                  {...register('primer_tegangan_max')}
                  isInvalid={errors.primer_tegangan_max}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.primer_tegangan_max?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className='mt-3' controlId='sekunder_tegangan_max'>
                <Form.Label>
                  Sekunder Tegangan Max (kV)
                </Form.Label>
                <Form.Control
                  {...register('sekunder_tegangan_max')}
                  isInvalid={errors.sekunder_tegangan_max}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.sekunder_tegangan_max?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className='mt-3' controlId='primer_tegangan_min'>
                <Form.Label>
                  Primer Tegangan Min (kV)
                </Form.Label>
                <Form.Control
                  {...register('primer_tegangan_min')}
                  isInvalid={errors.primer_tegangan_min}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.primer_tegangan_min?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className='mt-3' controlId='sekunder_tegangan_min'>
                <Form.Label>
                  Sekunder Tegangan Min (kV)
                </Form.Label>
                <Form.Control
                  {...register('sekunder_tegangan_min')}
                  isInvalid={errors.sekunder_tegangan_min}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.sekunder_tegangan_min?.message}
                </Form.Control.Feedback>
              </Form.Group> */}
              <Form.Group className='mt-3' controlId='def_pengukuran_teg_primer'>
                <Form.Label>
                  Default Pengukuran Tegangan Primer
                </Form.Label>
                <Form.Control
                  {...register('def_pengukuran_teg_primer')}
                  isInvalid={errors.def_pengukuran_teg_primer}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.def_pengukuran_teg_primer?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className='mt-3' controlId='def_pengukuran_teg_sekunder'>
                <Form.Label>
                  Default Pengukuran Tegangan Sekunder
                </Form.Label>
                <Form.Control
                  {...register('def_pengukuran_teg_sekunder')}
                  isInvalid={errors.def_pengukuran_teg_sekunder}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.def_pengukuran_teg_sekunder?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className='mt-3' controlId='def_nilai_cosq'>
                <Form.Label>
                  Default Nilai COS PHI
                </Form.Label>
                <Form.Control
                  {...register('def_nilai_cosq')}
                  isInvalid={errors.def_nilai_cosq}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.def_nilai_cosq?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className='mt-3'>
                <Form.Label>
                  Jenis Layanan <RequiredInfo />
                </Form.Label>
                <SelectFormStatic
                  control={control}
                  errors={errors}
                  fieldName="jenis_layanan"
                  placeholder='Pilih Jenis Layanan'
                  options={optionDataJenisLayanan}
                  defaultValue={dataSelected?.jenis_layanan}

                ></SelectFormStatic>
              </Form.Group>
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
                  type="number"
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
                  type="number"
                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.lon?.message}
                </Form.Control.Feedback>
              </Form.Group> */}
              {/* <Form.Group className='mt-3' controlId='kva'>
                <Form.Label>kVA</Form.Label>
                <Form.Control
                  {...register('kva')}
                  isInvalid={errors.kva}
                  type="number"
                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.kva?.message}
                </Form.Control.Feedback>
              </Form.Group> */}
              {/* <Form.Group className='mt-3' controlId='phase'>
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
                <Form.Label>No Urut</Form.Label>
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
                    isInvalid={errors.status_listrik}
                  />
                  <Form.Check
                    {...register('status_listrik')}
                    inline
                    type='radio'
                    value='0'
                    label='Inactive'
                    isInvalid={errors.status_listrik}
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
