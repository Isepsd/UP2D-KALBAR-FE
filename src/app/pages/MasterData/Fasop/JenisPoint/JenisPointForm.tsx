import React, { useState } from 'react';
import { Col, Form, Modal, Row } from 'react-bootstrap';

import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { orderBy } from 'lodash';

import {
  FasopPointTypeField,
  IFasopPointType,
} from '@app/interface/fasop-pointtype.interface';

import FormData from '@app/modules/Form/FormData';
import ButtonCancel from '@app/components/Button/ButtonCancel';
import { API_PATH } from '@app/services/_path.service';
import SelectAsyncDynamic from '@app/modules/SelectForm/SelectAsyncDynamic';
import SelectFormStatic from '@app/modules/SelectForm/SelectFormStatic';
// import FormatPesan from '@app/modules/MasterData/FormatPesan';
import Button from '@app/components/Button/Button';
// import RequiredInfo from '@app/components/Info/RequiredInfo'; 

const jenisPointOptions: any = orderBy([
  { label: 'ANALOG', value: 'ANALOG' },
  { label: 'DIGITAL', value: 'DIGITAL' },
  { label: 'RTU', value: 'RTU' },
  { label: 'MASTER', value: 'MASTER' },
  { label: 'IP', value: 'IP' },
  { label: 'IED', value: 'IED' },
  { label: 'TELKOM', value: 'TELKOM' }
],['label'],['asc']);

export default function FasJenisPointFormPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();


  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Nama Wajib diisi'),
    jenispoint: Yup.string().required('Jenis point wajib diisi'),
    no_urut: Yup.number()
      .typeError('Nomor urut wajib diisi')
      .required('Nomor urut wajib diisi'),
    // log_his: Yup.number().transform((_, v) => (v == 1 ? 1 : 0)),
    show_grafik: Yup.number().transform((_, v) => (v == 1 ? 1 : 0)),
    // warna: Yup.string().nullable(),
    status: Yup.number().transform((_, v) => (v == 1 ? 1 : 0)),
    send_telegram: Yup.number().transform((_, v) => (v == 1 ? 1 : 0)),
    // durasi_perubahan: Yup.number()
    //   .typeError('No urut wajib diisi')
    //   .required('No urut wajib diisi'),
    format_pesan: Yup.string().when('send_telegram', {
      is: 1,
      then: Yup.string().required('Format pesan wajib diisi'),
    }),
  });

  const [formModel] = useState<any>({ status: '1' });
  const {
    register,
    handleSubmit,
    control,
    setValue,
    setError,
    formState,
  } = useForm<IFasopPointType>({
    resolver: yupResolver(validationSchema),
    defaultValues: formModel,
  });
  const { errors }: any = formState || {};
  /** WATCH / SUBSCRIBVE FORM CHANGES */
  const watchIdPointTypeID = useWatch({ control, name: 'id_pointtype' });

  /** SUBMIT FORM HANDLING */
  const onSubmitForm = (data: IFasopPointType) => {
    setDataParams(data);
  };
  
  return (
    <>
      <FormData
        setError={setError}
        setValue={setValue}
        dataParams={dataParams}
        fields={FasopPointTypeField}
        path={API_PATH().master.fasop.point_type}
        onLoading={setLoading}
        customLabel={'hide'}
        isModal={true}
      >
        <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
          <Modal.Body>
            <Row>
              <Form.Group as={Col} className='mb-3' hidden>
                <Form.Label>ID</Form.Label>
                <Form.Control defaultValue={watchIdPointTypeID} disabled />
              </Form.Group>
              <Form.Group as={Col} className='mb-3'>
                <Form.Label>Nama</Form.Label>
                <Form.Control {...register('name')} isInvalid={errors.name} />
                <Form.Control.Feedback type='invalid'>
                  {errors?.name?.message}
                </Form.Control.Feedback>
              </Form.Group> 
              <Form.Group as={Col} className='mb-3'>
                <Form.Label>Induk Jenis Point</Form.Label>
                <SelectAsyncDynamic
                  fieldName='id_induk_pointtype'
                  pathServiceName=''
                  path='master/fasop/point-type-get'
                  labelField='name'
                  valueField='id_pointtype'
                  placeholder='Pilih...'
                  isClearable={true}
                  errors={errors}
                  control={control}
                  isSearchable={false}
                  queryParams={{is_induk:'INDUK'}}
                />
              </Form.Group>
            </Row>
            <Row>
            <Form.Group as={Col} className='mb-3'>
                <Form.Label>Tipe Point</Form.Label>
                <SelectFormStatic
                  control={control}
                  errors={errors}
                  fieldName={'jenispoint'}
                  options={jenisPointOptions}
                ></SelectFormStatic>
              </Form.Group>
              <Form.Group as={Col} className='mb-3'>
                <Form.Label>Grup Telegram</Form.Label>
                <SelectAsyncDynamic
                  fieldName='id_telegram_group'
                  pathServiceName='master.fasop.telegram_group'
                  labelField='nama'
                  valueField='id_telegram_group'
                  placeholder='Pilih...'
                  isClearable={true}
                  errors={errors}
                  control={control}
                />
              </Form.Group>
              
            </Row>
            <Row>
              {/* <Form.Group as={Col} className='mb-3'>
                <Form.Label>Log Histori</Form.Label>
                <div className='ms-3 py-2'>
                  <Form.Check
                    type='switch'
                    id='log'
                    {...register('log_his')}
                    label='Ya'
                  />
                </div>
              </Form.Group> */}
              {/* <Form.Group as={Col} className='mb-3'>
                <Form.Label>Tampil Dashboard</Form.Label>
                <div className='ms-3 py-2'>
                  <Form.Check
                    type='switch'
                    id='tampilDashboard'
                    label='Ya'
                    {...register('show_grafik')}
                  />
                </div>
              </Form.Group> */}

             
              
              {/* <Form.Group as={Col} className='mb-3'>
                <Form.Label>No Urut</Form.Label>
                
                <Form.Control
                  {...register('no_urut')}
                  type='number'
                  isInvalid={errors.no_urut}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.no_urut?.message}
                </Form.Control.Feedback>
              </Form.Group> */}
              <Form.Group as={Col} className='mb-3'>
                <Form.Label>Aktif</Form.Label>
                <div className='ms-3 py-2'>
                  <Form.Check
                    type='switch'
                    id='aktif'
                    {...register('status')}
                    label='Ya'
                  />
                </div>
              </Form.Group>
              <Form.Group as={Col} className='mb-3'>
                <Form.Label>Kirim Telegram</Form.Label>
                <div className='ms-3 py-2'>
                  <Form.Check
                    type='switch'
                    id='kirimTelegram'
                    {...register('send_telegram')}
                    label='Ya'
                  />
                </div>
              </Form.Group>
            </Row>
            <Row>
              {/* <Form.Group className='mb-3 col-md-3'>
                <Form.Label>
                  Durasi Perubahan{' '}
                  <RequiredInfo
                    message='Dalam detik'
                    icon={'far fa-info-circle'}
                  ></RequiredInfo>
                </Form.Label>
                <Form.Control
                  {...register('durasi_perubahan')}
                  isInvalid={errors.durasi_perubahan}
                  type='number'
                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.durasi_perubahan?.message}
                </Form.Control.Feedback>
              </Form.Group> */}
              {/* <Form.Group className='mb-3 col-md-3'>
                <Form.Label>Warna</Form.Label>
                <Form.Control
                  type='color'
                  id='warna'
                  defaultValue=''
                  title='Pilih warna'
                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.warna?.message}
                </Form.Control.Feedback>
              </Form.Group> */}
             
            </Row>
            {/* <Form.Group className='mb-3'>
              <Form.Label>Format Pesan Telegram</Form.Label>
              <Form.Control
                {...register('format_pesan')}
                as='textarea'
                rows={4}
                isInvalid={errors.format_pesan}
              />
              <Form.Control.Feedback type='invalid'>
                {errors?.format_pesan?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <FormatPesan></FormatPesan> */}
          </Modal.Body>

          <Modal.Footer>
            <div className='d-flex gap-2'>
              <ButtonCancel type='modal' />
              <Button type='submit' variant='primary' isLoading={loading}>
                Simpan
              </Button>
            </div>
          </Modal.Footer>
        </Form>
      </FormData>
    </>
  );
}
