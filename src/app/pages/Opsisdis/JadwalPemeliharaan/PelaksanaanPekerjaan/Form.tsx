import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import Button from '@app/components/Button/Button';
import ButtonCancel from '@app/components/Button/ButtonCancel';
import RequiredInfo from '@app/components/Info/RequiredInfo';
import SelectFormStatic from '@app/modules/SelectForm/SelectFormStatic';
// import SelectAsyncDynamic from '@app/modules/SelectForm/SelectAsyncDynamic';
import {
  InputJadwalField,
} from '@app/interface/opsisdis-input-jadwal.interface';

// import {
//   OPTIONS_SIFAT_PEMELIHARAAN,
//   OPTIONS_LEVEL_PEMELIHARAAN,
//   OPTIONS_KONDISI_PEKERJAAN,
// } from '@app/configs/select-options.config';
import { STATUS_PELAKSANAAN } from '@app/configs/select-options/jadwal_pemeliharaan.select';
import { API_PATH } from '@app/services/_path.service';
import moment from 'moment';
import FormDataModal from '@app/modules/Form/FormDataModal';

function UpdateProgressForm({ dataSelected }: any) {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();
  const [options, setOptions] = useState<any>([])
  // const sifatPemeliharaanOptions: any = OPTIONS_SIFAT_PEMELIHARAAN();
  // const levelPemeliharaanOptions: any = OPTIONS_LEVEL_PEMELIHARAAN();
  // const kondisiPekerjaanOptions: any = OPTIONS_KONDISI_PEKERJAAN();

  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    status: Yup.string().required("Data ini belum dipilih"),
    jam_buka: Yup.string().required("Data ini belum diisi").typeError("Format tidak sesuai"),
    jam_tutup: Yup.string().required("Data ini belum diisi").typeError("Format tidak sesuai"),
  });
  const status_progress = dataSelected?.status_pekerjaan ? (dataSelected?.status_pekerjaan).replace(' ', '_').toLowerCase() : '';
  const [formModel] = useState<any>({
    status_data: 0,
    status_progress: status_progress,
  });

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    control,
    formState
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: formModel,
  });
  const { errors }: any = formState || {};

  // const watchStatus = useWatch({ control, name: 'status_data' });

  /** SUBMIT FORM HANDLING */
  const onSubmitForm = (data: any) => {
    data.status_pekerjaan = data.status
    data.jam_buka=data.jam_buka
    data.jam_tutup=data.jam_tutup
    setDataParams(data);
  };


  useEffect(() => {
    let dataOptins: any = STATUS_PELAKSANAAN().filter((e) => e.type === 'pelaksanaan')
    setOptions(dataOptins)

  }, [dataSelected])


  return (
    <>
      <Row>
        <Col md={12} className='mb-4 position-static'>
          <Card>
            <Card.Body>
              <FormDataModal
                setError={setError}
                setValue={setValue}
                dataParams={dataParams}
                fields={InputJadwalField}
                path={API_PATH().opsisdis.jadwal_pemeliharaan.har}
                onLoading={setLoading}
                customLabel={'hide'}
                hideTitle
                batch={false}
                ids="id_trans_jadwal_har"
                dataSelected={dataSelected}
              >
                <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className='mb-3'>
                        <Form.Label>
                          Tanggal Usulan Pekerjaan
                        </Form.Label>
                        <div className='font-weight-bold'>
                          {dataSelected?.tgl_entri ? moment(dataSelected?.tgl_entri, 'YYYY-MM-DD').format('DD-MM-YYYY') : '-'}
                        </div>
                      </Form.Group>
                      <Form.Group className='mb-3'>
                        <Form.Label>
                          Periode Mulai Pekerjaan
                        </Form.Label>
                        <div className='font-weight-bold'>
                          {dataSelected.tgl_mulai ? moment(dataSelected?.tgl_mulai, 'YYYY-MM-DD').format('DD-MM-YYYY') : '-'}
                        </div>
                      </Form.Group>
                      <Form.Group className='mb-3'>
                        <Form.Label>Jam Pekerjaan</Form.Label>
                        <div className='font-weight-bold'>
                          {dataSelected.jam_pekerjaan || '-'}
                        </div>
                      </Form.Group>
                      <Form.Group className='mb-3'>
                        <Form.Label>GI</Form.Label>
                        <div className='font-weight-bold'>
                          {dataSelected.gardu_induk?.nama_gardu_induk || '-'}
                        </div>
                      </Form.Group>
                      <Form.Group className='mb-3'>
                        <Form.Label>Penyulang</Form.Label>
                        <div className='font-weight-bold'>
                          {dataSelected.penyulang?.nama_penyulang || '-'}
                        </div>
                      </Form.Group>
                      <Form.Group className='mb-3'>
                        <Form.Label>Gardu</Form.Label>
                        <div className='font-weight-bold'>{dataSelected.gardu?.nama_gardu || '-'}</div>
                      </Form.Group>
                      <Form.Group className='mb-3'>
                        <Form.Label>Area Jaringan</Form.Label>
                        <div className='font-weight-bold'>{dataSelected.up3?.nama_up3 || '-'}</div>
                      </Form.Group>
                      <Form.Group className='mb-3'>
                        <Form.Label>JTM</Form.Label>
                        <div className='font-weight-bold'>{dataSelected.jtm || '-'}</div>
                      </Form.Group>
                      <Form.Group className='mb-3'>
                        <Form.Label>Jadwal</Form.Label>
                        <div className='font-weight-bold'>{dataSelected.jadwal || '-'}</div>
                      </Form.Group>
                      <Form.Group className='mb-3'>
                        <Form.Label>
                          Realisasi Padam
                        </Form.Label>
                        <Form.Control
                          {...register('jam_buka')}
                          type='datetime-local'
                          isInvalid={errors.jam_buka ? true : false}
                        />
                        <Form.Control.Feedback type='invalid'>
                          {errors?.jam_buka?.message}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group className='mb-3'>
                        <Form.Label>Status Progress</Form.Label>
                        <SelectFormStatic
                          control={control}
                          errors={errors}
                          fieldName={'status'}
                          options={options}
                        ></SelectFormStatic>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className='mb-3'>
                        <Form.Label>
                          Periode Akhir Pekerjaan
                          <RequiredInfo />
                        </Form.Label>
                        <div className='font-weight-bold'>
                          {dataSelected.tgl_akhir ? moment(dataSelected.tgl_akhir, 'YYYY-MM-DD').format('DD-MM-YYYY') : '-'}
                        </div>
                      </Form.Group>
                      <Form.Group className='mb-3'>
                        <Form.Label>
                          Pengawasan
                        </Form.Label>
                        <div className='font-weight-bold'>
                          {dataSelected.pengawas?.fullname || '-'}
                        </div>
                      </Form.Group>
                      <Form.Group className='mb-3'>
                        <Form.Label>Pelaksana</Form.Label>
                        <div className='font-weight-bold'>
                          {dataSelected.pelaksana?.name || '-'}
                        </div>
                      </Form.Group>
                      <Form.Group className='mb-3'>
                        <Form.Label>Wilayah</Form.Label>
                        <div className='font-weight-bold'>
                          {dataSelected.wilayah || '-'}
                        </div>
                      </Form.Group>
                      <Form.Group className='mb-3'>
                        <Form.Label>Jenis Pelaksanaan</Form.Label>
                        <div className='font-weight-bold'>
                          {dataSelected.jenis_pelaksana || '-'}
                        </div>
                      </Form.Group>
                      <Form.Group className='mb-3'>
                        <Form.Label>Wilayah Padam</Form.Label>
                        <div className='font-weight-bold'>
                          {dataSelected.wilayah_padam || '-'}
                        </div>
                      </Form.Group>
                      <Form.Group className='mb-3'>
                        <Form.Label>Jenis Pelayanan</Form.Label>
                        <div className='font-weight-bold'>
                          {dataSelected.jenis_pelayanan || '-'}
                        </div>
                      </Form.Group>
                      <Form.Group className='mb-3'>
                        <Form.Label>Keterangan</Form.Label>
                        <div className='font-weight-bold'>
                          {dataSelected.keterangan || '-'}
                        </div>
                      </Form.Group>
                      <Form.Group className='mb-3'>
                        <Form.Label>Keterangan Approve</Form.Label>
                        <div className='font-weight-bold'>
                          {dataSelected.keterangan_approve || '-'}
                        </div>
                      </Form.Group>
                      <Form.Group className='mb-3'>
                        <Form.Label>Realisasi Nyata</Form.Label>
                        <Form.Control
                          {...register('jam_tutup')}
                          type='datetime-local'
                          isInvalid={errors.jam_tutup ? true : false}
                        />
                        <Form.Control.Feedback type='invalid'>
                          {errors?.jam_tutup?.message}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <div className='d-flex gap-2'>
                    <ButtonCancel type='modal' ids='id' />
                    <Button type='submit' variant='primary' isLoading={loading}>
                      Simpan
                    </Button>
                  </div>
                </Form>
              </FormDataModal>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default UpdateProgressForm;
