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
// import InputDate from '@app/components/Date/InputDate';
import SelectAsyncDynamic from '@app/modules/SelectForm/SelectAsyncDynamic';
import { JENIS_LOKASI } from '@app/configs/jenis-lokasi.config';
import SelectFormStatic from '@app/modules/SelectForm/SelectFormStatic';
import { JADWAL, JENIS_PELAYANAN } from '@app/configs/select-options/jadwal_pemeliharaan.select';
import { timeFormSelect } from '@app/helper/time.helper';
import { REGU_PETUGAS } from '@app/configs/regu-petugas';
import { IJadwalPemerliharaan, JadwalPemerliharaanFeild } from '@app/interface/opsisdis-jadwal-pemeliharaan.interface';
import FormDataModal from '@app/modules/Form/FormDataModal';

// interface IFormUploadDocumentSLD {
//   garduInduk: any;
//   kelompok: string
// }

const option_sumber = [
  { label: '-', value: '' },
  { label: 'PERALATAN', value: 'PERALATAN' },
  { label: 'LBS MANUAL', value: 'LBS MANUAL' },
];

function InputJadwalForm({
  dataSelected,
  type
}: any) {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();
  const [optionsTimes, setOptionsTimes] = useState<any>([]);

  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    keterangan: Yup.string().nullable(),
    lbs_manual: Yup.string().nullable(),
    // id_gardu_induk: Yup.number().typeError("Data belum dipilih").required("Data belum dipilih"),
    id_og: Yup.number().nullable(),
    id_penyulang: Yup.string().nullable(),
    id_gardu: Yup.string().nullable(),
    id_up3: Yup.number().typeError("Data belum dipilih").required("Data belum dipilih"),
    // pekerjaan: Yup.number().typeError("Data belum dipilih").required("Data belum dipilih"),
    pengawas: Yup.string().nullable(),
    date: Yup.string().typeError("Data belum dipilih").required("Data belum dipilih"),
    jam1: Yup.string().typeError("Data belum dipilih").required("Data belum dipilih"),
    jam2: Yup.string().typeError("Data belum dipilih").required("Data belum dipilih"),
    jenis_jadwal: Yup.string().typeError("Data belum dipilih").required("Data belum dipilih"),
    jenis_pelayanan: Yup.string().typeError("Data belum dipilih").required("Data belum dipilih"),
    id_pelaksana: Yup.string().typeError("Data belum dipilih").required("Data belum dipilih"),
    id_ref_jenis_pekerjaan: Yup.string().typeError("Data belum dipilih").required("Data belum dipilih"),
    butuh_padam: Yup.string().nullable(),
    wilayah_padam: Yup.string().required("Wilayah padam wajib diisi"),
    wilayah: Yup.string().nullable()
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
  /** SUBMIT FORM HANDLING */
  const onSubmitForm = (data: IJadwalPemerliharaan) => {
    let params: any = data;
    params.jam_pekerjaan = `${params?.jam1}-${params?.jam2}`;
    params.butuh_padam = data?.butuh_padam == 'true' ? 1 : 0
    params.status_pekerjaan = type
    params.tgl = data.date
    // params.status_pekerjaan = 'Rencana pemeliharaan'

    setDataParams(params);
  };

  useEffect(() => {
    let times = timeFormSelect(96, 15)
    setOptionsTimes(times)

  }, [])

  // const watchGarduInduk = useWatch({ control, name: 'id_gardu_induk' });
  // const watchPenyulang = useWatch({ control, name: 'id_penyulang' });
  const watchsumber = useWatch({ control, name: 'sumber' });

  const initForm = (data: any) => {
    Object.keys(JadwalPemerliharaanFeild).map((field: any) => {
      switch (field) {

        case 'jam_pekerjaan':
          let time = data[field].split("-")
          setValue('jam1', time[0]);
          setValue('jam2', time[1]);
          break;
        case 'keterangan':
        case 'jenis_jadwal':
        case 'jenis_pelayanan':
        case 'butuh_padam':
        case 'wilayah_padam':
        case 'wilayah':
        case 'jtm':
        case 'tgl':
        case 'id_pelaksana':
        case 'id_pengawas':
        case 'id_gardu_induk':
        case 'id_penyulang':
        case 'id_gardu':
        case 'id_up3':
        case 'id_og':
        case 'id_ref_jenis_pekerjaan':
          
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
      <FormDataModal
        setError={setError}
        setValue={setValue}
        dataParams={dataParams}
        fields={JadwalPemerliharaanFeild}
        path={API_PATH().opsisdis.jadwal_pemeliharaan.har}
        onLoading={setLoading}
        customLabel={'hide'}
        isModal={true}
        ids="id_trans_jadwal_har"
      // overrideType={{ tgl_upload: 'datetime' }}
      >
        <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
          <Modal.Body>
            <Row>
              <Col md={6}>
                {/* <Form.Group as={Row} className='mb-3'>
                  <Form.Label className="col-md-4 col-form-label">
                    Tanggal Usulan <RequiredInfo />
                  </Form.Label>
                  <Col md={8}>
                    <InputDate errors={errors} register={register} />
                  </Col>
                </Form.Group> */}
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
                      {errors?.date1?.message}
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
                      {errors?.date2?.message}
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className='mb-3'>
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
                </Form.Group>
                {watchsumber === "PERALATAN" &&
                <Form.Group as={Row} className='mb-3'>
                  <Form.Label className="col-md-4 col-form-label">
                    Peralatan
                  </Form.Label>
                  <Col md={8}>
                  <SelectAsyncDynamic
                  fieldName='id_og'
                  pathServiceName='master.jaringan.ref_lokasi'
                  labelField='nama_lokasi'
                  valueField='id_ref_lokasi'
                  placeholder='Pilih...'
                  isClearable={true}
                  errors={errors}
                  control={control}
                  queryParams={{
                    page: -1,
                    limit: 10,
                    sort_by: 'nama_lokasi',
                    id_ref_jenis_lokasi_in: `${JENIS_LOKASI().penyulang},${JENIS_LOKASI().zone},${JENIS_LOKASI().gardu_distribusi}`
                  }}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.id_parent_lokasi?.message}
                </Form.Control.Feedback>
                   
                  </Col>
                </Form.Group>}
                {watchsumber === "LBS MANUAL" &&
                <Form.Group as={Row} className='mb-3'>
                  <Form.Label className="col-md-4 col-form-label">
                    LBS Manual
                  </Form.Label>
                  <Col md={8}>
                  
                            <Form.Control
                              {...register('lbs_manual')}
                              isInvalid={errors?.lbs_manual as boolean | undefined}
                            />
                          
                  </Col>
                </Form.Group>}
                <Form.Group as={Row} className='mb-3'>
                  <Form.Label className="col-md-4 col-form-label">
                    Area Jaringan  <RequiredInfo />
                  </Form.Label>
                  <Col md={8}>
                    <SelectAsyncDynamic
                      fieldName='id_up3'
                      pathServiceName='master.jaringan.ref_lokasi'
                      labelField='nama_lokasi'
                      valueField='id_ref_lokasi'
                      placeholder='Pilih...'
                      isClearable={true}
                      errors={errors}
                      control={control}
                      defaultValue={''}
                      queryParams={{
                        page: -1,
                        limit: 10,
                        sort_by: 'nama_lokasi',
                        "id_ref_jenis_lokasi": (JENIS_LOKASI() as any)['up3'],

                      }}

                    />
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
                    Pengawas <RequiredInfo />
                  </Form.Label>
                  <Col md={8}>
                  <Form.Control
                              {...register('pengawas')}
                              isInvalid={errors?.pengawas as boolean | undefined}
                            />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className='mb-3'>
                  <Form.Label className="col-md-4 col-form-label">
                    Pelaksana <RequiredInfo />
                  </Form.Label>
                  <Col md={8}>
                  <Form.Control
                              {...register('pengawas')}
                              isInvalid={errors?.pengawas as boolean | undefined}
                            />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className='mb-3'>
                  <Form.Label className="col-md-4 col-form-label">
                    Jenis Pekerjaan <RequiredInfo />
                  </Form.Label>
                  <Col md={8}>
                    <SelectAsyncDynamic
                      fieldName='id_ref_jenis_pekerjaan'
                      pathServiceName='master.opsisdis.jadwal_pemeliharaan.jenis_pekerjaan'
                      labelField='name'
                      valueField='id_ref_jenis_pekerjaan'
                      placeholder='Pilih...'
                      isClearable={true}
                      errors={errors}
                      control={control}
                      defaultValue={''}
                      queryParams={{
                        page: -1,
                        limit: 10,
                        sort_by: 'name',
                        "id_ref_jenis_pekerjaan": (REGU_PETUGAS() as any)['pengawas'],
                      }}
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
      </FormDataModal>
    </>
  );
}

export default InputJadwalForm