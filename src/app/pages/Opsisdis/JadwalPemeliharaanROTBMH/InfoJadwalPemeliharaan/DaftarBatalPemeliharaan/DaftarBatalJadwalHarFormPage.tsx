import React, { useEffect, useState } from 'react';
import { Col, Form, Modal, Row } from 'react-bootstrap';

import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import ButtonCancel from '@app/components/Button/ButtonCancel';
import { API_PATH } from '@app/services/_path.service';
import Button from '@app/components/Button/Button';
import RequiredInfo from '@app/components/Info/RequiredInfo';
import FormInputControlColumn from '@app/components/Input/FormInputControlColumn';
import InputDate from '@app/components/Date/InputDate';
import SelectAsyncDynamic from '@app/modules/SelectForm/SelectAsyncDynamicOLD';
import { JENIS_LOKASI } from '@app/configs/jenis-lokasi.config';
import SelectFormStatic from '@app/modules/SelectForm/SelectFormStatic';
import { JADWAL, JENIS_PELAYANAN } from '@app/configs/select-options/jadwal_pemeliharaan.select';
import { timeFormSelect } from '@app/helper/time.helper';
// import { REGU_PETUGAS } from '@app/configs/regu-petugas';
import { IJadwalPemerliharaan, JadwalPemerliharaanFeild } from '@app/interface/opsisdis-jadwal-pemeliharaan.interface';
import FormData from '@app/modules/Form/FormData';
import moment from 'moment';

// interface IFormUploadDocumentSLD {
//   garduInduk: any;
//   kelompok: string
// }

const OPTION_WILAYAH = [
  { label: 'BANTEN', value: 'BANTEN' },
  { label: 'TANGERANG', value: 'TANGERANG' },
];

function DaftarBatalJadwalHarFormPage({
  dataSelected,
  // type,
  handleClose,
  originalDataRef,
  changesubmit,

}: any) {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();
  const [optionsTimes, setOptionsTimes] = useState<any>([]);

  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    tanggal: Yup.string().nullable(),
    keterangan: Yup.string().nullable(),
    jam_pekerjaan: Yup.string().nullable(),
    jtm: Yup.string().nullable(),
    wilayah_padam: Yup.string().nullable(),
    wilayah: Yup.string().nullable(),
    id_penyulang: Yup.string().nullable(),
    id_gardu_induk: Yup.string().nullable(),
    id_gardu: Yup.string().nullable(),
    respon_apd: Yup.string().nullable(),
    id_area: Yup.string().nullable(),
    id: Yup.string().nullable(),
    sifat_pekerjaan: Yup.string().nullable(),
    jenis_pelayanan: Yup.string().nullable(),
    status_pekerjaan: Yup.string().nullable(),
    butuh_padam: Yup.string().nullable(),
    jam1: Yup.string().nullable(),
    jam2: Yup.string().nullable(),
    jam_buka: Yup.string().nullable(),
    jam_tutup: Yup.string().nullable(),
    jenis_jadwal: Yup.string().nullable(),
    id_pelaksana: Yup.string().nullable(),
    id_pengawas: Yup.string().nullable(),
  });

  const [formModel] = useState<any>({
    date: moment().format('YYYY-MM-DD'), // Set current date using moment
    jam1: '00:00', // Default Jam 1
    jam2: '00:00', // Default Jam 2
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

  const { errors }: any = formState || {};

  /** Handle Form Submission */
  const onSubmitForm = (data: IJadwalPemerliharaan) => {
    const params = {
      ...data,
      jam_pekerjaan: `${data.jam1}-${data.jam2}`,
      // butuh_padam: data.butuh_padam === 'true' ? 1 : 0,
      // status_pekerjaan: type,
      status_pekerjaan: data.status_pekerjaan,
      approvel_area: data.approvel_area,
      approvel_apd: data.approvel_apd,

      tanggal: data.date,
    };

    setDataParams(params);
    console.log('Form submission data:', params);
    originalDataRef.current = [];
    const newFilterValues = { /* tambahkan filter baru yang ingin digunakan */ };
    changesubmit(newFilterValues); // Panggil changesubmit
    handleClose(); // Close the form modal or perform any further actions.

  };

  useEffect(() => {
    // let times = timeFormSelect(96, 15)
    let times = timeFormSelect(48, 30)
    setOptionsTimes(times)

  }, [])

  // const watchGarduInduk = useWatch({ control, name: 'id_gardu_induk' });
  // const watchPenyulang = useWatch({ control, name: 'id_penyulang' });
  // const watchsumber = useWatch({ control, name: 'sumber' });
  const watchGarduInduk = useWatch({ control, name: "id_gardu_induk" });
  const watchPenyulang = useWatch({ control, name: "id_penyulang" });
  // const watchPengawas = useWatch({ control, name: "id" });

  // console.log(watchPengawas);

  const initForm = (data: any) => {
    Object.keys(JadwalPemerliharaanFeild).map((field: any) => {
      switch (field) {
        case 'jam_pekerjaan':
          if (data[field]) {
            let time = data[field].split(" - ");
            setValue('jam1', time[0]);
            setValue('jam2', time[1]);
          } else {
            setValue('jam1', '');
            setValue('jam2', '');
          }
          break;
        case 'keterangan':
        case 'jenis_jadwal':
        case 'jenis_pelayanan':
        case 'butuh_padam':
        case 'wilayah_padam':
        case 'wilayah':
        case 'jtm':
        // case 'tanggal':
        case 'id_pelaksana':
        case 'id_pengawas':
        case 'id_gardu_induk':
        case 'id_penyulang':
        case 'id_gardu':
        case 'id_area':
        case 'sifat_pekerjaan':
        case 'jam1':
        case 'jam2':
          // case 'id_og':
          // case 'id_ref_jenis_pekerjaan':

          setValue(field, data[field]);
          break;
        default:
          break;
      }
    });
  }

  useEffect(() => {
    if (dataSelected) {
      initForm(dataSelected)
    }

  }, [dataSelected])

  return (
    <>
      <FormData
        setError={setError}
        setValue={setValue}
        dataParams={dataParams}
        fields={JadwalPemerliharaanFeild}
        path={API_PATH().opsisdis.jadwal_pemeliharaan.har}
        onLoading={setLoading}
        customLabel={'hide'}
        isModal
      // link='/opsisdis/jadwal-pemeliharaan/usulan-jadwal-har'

      // overrideType={{ tgl_upload: 'datetime' }}
      >
        <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>

          <Row>
            <Col md={6}>
              <Form.Group as={Row} className='mb-3'>
                <Form.Label className="col-md-4 col-form-label">
                  Tanggal Usulan <RequiredInfo />
                </Form.Label>
                <Col md={8}>
                  <InputDate fieldName='tanggal' errors={errors} register={register} />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className='mb-3'>
                <Form.Label className="col-md-4 col-form-label">
                  Jam Pekerjaan <RequiredInfo />
                </Form.Label>
                <Col md={4}>
                  <SelectFormStatic
                    control={control}
                    errors={errors}
                    fieldName={'jam1'}
                    options={optionsTimes}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors?.jam1?.message}
                  </Form.Control.Feedback>
                </Col>
                <Col md={4}>
                  <SelectFormStatic
                    control={control}
                    errors={errors}
                    fieldName={'jam2'}
                    options={optionsTimes}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors?.jam2?.message}
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>
              {/* <Form.Group as={Row} className='mb-3'>
                  <Form.Label className="col-md-4 col-form-label">
                    sumber <RequiredInfo />
                  </Form.Label>
                  <Col md={8}>
                  <SelectFormStatic
                            control={control}
                            errors={errors}
                            fieldName={'sumber'}
                            options={option_sumber}
                          />
                  </Col>
                </Form.Group> */}
              <Form.Group as={Row} className='mb-2'>
                <Form.Label className="col-md-4 col-form-label">Gardu Induk</Form.Label>
                <Col md={8}>
                  <SelectAsyncDynamic
                    fieldName="id_gardu_induk"
                    control={control}
                    errors={errors}
                    labelField={'nama_lokasi'}
                    valueField={'id_ref_lokasi'}
                    pathServiceName={'master.jaringan.ref_lokasi'}
                    watchParent={watchGarduInduk}
                    queryParams={{
                      id_ref_jenis_lokasi: JENIS_LOKASI().gardu_induk,
                      page: 1,
                      limit: 20,
                      id_ref_lokasi: watchGarduInduk
                    }}
                    setValue={setValue}
                    options={dataSelected?.gardu_induk}
                  ></SelectAsyncDynamic>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className='mb-2'>
                <Form.Label className="col-md-4 col-form-label">Penyulang</Form.Label>
                <Col md={8}>
                  <SelectAsyncDynamic
                    fieldName="id_penyulang"
                    fieldNameParent="id_gardu_induk"
                    control={control}
                    errors={errors}
                    labelField={'nama_lokasi'}
                    valueField={'id_ref_lokasi'}
                    pathServiceName={'master.jaringan.ref_lokasi'}
                    queryParams={{
                      id_ref_jenis_lokasi: JENIS_LOKASI().penyulang,
                      page: 1,
                      limit: 10,
                    }}
                    setValue={setValue}
                    isDisabled={!watchGarduInduk}
                    watchParent={watchGarduInduk}
                    options={dataSelected?.penyulang}
                  ></SelectAsyncDynamic>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className='mb-2'>
                <Form.Label className="col-md-4 col-form-label">Gardu Distribusi</Form.Label>
                <Col md={8}>
                  <SelectAsyncDynamic
                    fieldName="id_gardu"
                    fieldNameParent="id_penyulang"
                    control={control}
                    errors={errors}
                    labelField={'nama_lokasi'}
                    valueField={'id_ref_lokasi'}
                    pathServiceName={'master.jaringan.ref_lokasi'}
                    queryParams={{
                      id_ref_jenis_lokasi: JENIS_LOKASI().gardu_distribusi,
                      page: 1,
                      limit: 10,
                    }}
                    setValue={setValue}
                    isDisabled={!watchPenyulang}
                    watchParent={watchPenyulang}
                    options={dataSelected?.gardu_distribusi}
                  ></SelectAsyncDynamic>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className='mb-3'>
                <Form.Label className="col-md-4 col-form-label">
                  Area Jaringan  <RequiredInfo />
                </Form.Label>
                <Col md={8}>
                  <SelectAsyncDynamic
                    fieldName="id_area"
                    // fieldNameParent="id_penyulang"
                    control={control}
                    errors={errors}
                    labelField={'nama_lokasi'}
                    valueField={'id_ref_lokasi'}
                    pathServiceName={'master.jaringan.ref_lokasi'}
                    queryParams={{
                      id_ref_jenis_lokasi: JENIS_LOKASI().up3,
                      page: 1,
                      limit: 10,
                    }}
                    setValue={setValue}
                    // isDisabled={!watchPenyulang}
                    // watchParent={watchPenyulang}
                    options={dataSelected?.up3}
                  ></SelectAsyncDynamic>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className='mb-3'>
                <Form.Label className="col-md-4 col-form-label">
                  Dibutuhkan Padam <RequiredInfo />
                </Form.Label>
                <Col md={8}>
                  <Form.Check
                    type='checkbox'
                    id="butuh_padam"
                    label=""
                    className='mt-2'
                    {...register('butuh_padam')}
                  />
                </Col>
              </Form.Group>


              <FormInputControlColumn
                labelName="JTM"
                required={false}
                placeholder="JTM"
                isInvalid={errors?.jtm as boolean | undefined}
                message={errors?.jtm?.message}
                register={register('jtm')}
                className='mb-3'
                rows={4}
                as={'textarea'}
              />

            </Col>
            <Col md={6}>
              <Form.Group as={Row} className='mb-3'>
                <Form.Label className="col-md-4 col-form-label">
                  Jadwal <RequiredInfo />
                </Form.Label>
                <Col md={8}>
                  <SelectFormStatic
                    control={control}
                    errors={errors}
                    fieldName={'jenis_jadwal'}
                    options={JADWAL()}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className='mb-3'>
                <Form.Label className="col-md-4 col-form-label">
                  Respon APD <RequiredInfo />
                </Form.Label>
                <Col md={8}>
                  <Form.Control
                    {...register('respon_apd')}
                    isInvalid={errors?.respon_apd as boolean | undefined}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className='mb-3'>
                <Form.Label className="col-md-4 col-form-label">
                  Pengawas  <RequiredInfo />
                </Form.Label>
                <Col md={8}>
                  <SelectAsyncDynamic
                    fieldName='id_pengawas'
                    pathServiceName='master.admin_ksa.pengawas'
                    labelField='nama'
                    valueField='id'
                    placeholder='Pilih...'
                    isClearable={true}
                    errors={errors}
                    control={control}
                    defaultValue={''}
                    queryParams={{
                      page: 1,
                      limit: 10,
                      sort_by: "nama",
                    }}
                    setValue={setValue}
                    options={dataSelected?.pengawas}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className='mb-3'>
                <Form.Label className="col-md-4 col-form-label">
                  Pelaksana  <RequiredInfo />
                </Form.Label>
                <Col md={8}>
                  <SelectAsyncDynamic
                    fieldName='id_pelaksana'
                    pathServiceName='master.admin_ksa.perusahaan'
                    labelField='nama'
                    valueField='id_perusahaan'
                    placeholder='Pilih...'
                    isClearable={true}
                    errors={errors}
                    control={control}
                    defaultValue={''}
                    queryParams={{
                      page: 1,
                      limit: 10,
                      sort_by: "nama",
                    }}
                    setValue={setValue}
                    options={dataSelected?.pelaksana}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className='mb-3'>
                <Form.Label className="col-md-4 col-form-label">
                  Wilayah <RequiredInfo />
                </Form.Label>
                <Col md={8}>
                  <SelectFormStatic
                    control={control}
                    errors={errors}
                    fieldName={'wilayah'}
                    options={OPTION_WILAYAH}
                  ></SelectFormStatic>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className='mb-3'>
                <Form.Label className="col-md-4 col-form-label">
                  Jenis Pekerjaan <RequiredInfo />
                </Form.Label>
                <Col md={8}>
                  <Form.Control
                    {...register('sifat_pekerjaan')}
                    isInvalid={errors?.sifat_pekerjaan as boolean | undefined}
                  />
                </Col>
              </Form.Group>


              <FormInputControlColumn
                labelName="Wilayah Padam"
                required={false}
                placeholder="Wilayah Padam"
                isInvalid={errors?.wilayah_padam as boolean | undefined}
                message={errors?.wilayah_padam?.message}
                register={register('wilayah_padam')}
                className='mb-3'
                rows={4}
                as={'textarea'}
              />
              <Form.Group as={Row} className='mb-3'>
                <Form.Label className="col-md-4 col-form-label">
                  Jenis Pelayanan <RequiredInfo />
                </Form.Label>
                <Col md={8}>
                  <SelectFormStatic
                    control={control}
                    errors={errors}
                    fieldName={'jenis_pelayanan'}
                    options={JENIS_PELAYANAN()}
                  />
                </Col>
              </Form.Group>
              <FormInputControlColumn
                labelName="Keterangan"
                required={false}
                placeholder="Keterangan"
                isInvalid={errors?.keterangan as boolean | undefined}
                message={errors?.keterangan?.message}
                register={register('keterangan')}
                className='mb-3'
                as='textarea'
                rows="4"

              />
            </Col>
          </Row>


          <Modal.Footer>
            <div className='d-flex gap-2'>
              <ButtonCancel onClick={handleClose} />
              <Button type='submit' variant='primary' disabled={loading}>
                Simpan
              </Button>
            </div>
          </Modal.Footer>
        </Form>
      </FormData>
    </>
  );
}

export default DaftarBatalJadwalHarFormPage