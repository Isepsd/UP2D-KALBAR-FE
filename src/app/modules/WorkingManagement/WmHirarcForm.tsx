import React, { useState } from 'react';
import { Form, Modal } from 'react-bootstrap';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import FormData from '@app/modules/Form/FormData';
import ButtonCancel from '@app/components/Button/ButtonCancel';
import { API_PATH } from '@app/services/_path.service';
import Button from '@app/components/Button/Button';
import RequiredInfo from '@app/components/Info/RequiredInfo';
import { IWpHirarc, WpHirarcField } from '@app/interface/wp-hirarc.interface';
import SelectAsyncDynamic from '../SelectForm/SelectAsyncDynamic';

export default function WmHirarcForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();

  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    id_wp_master_bagian: Yup.number()
      .nullable()
      .transform((_, val) => (val === Number(val) ? val : null)),
    pekerjaan: Yup.string().required(),
    lokasi_pekerjaan: Yup.string().required(),
    tanggal: Yup.string().required(),
  });

  const [formModel] = useState<any>({ status: '1' });
  
  const {
    register,
    handleSubmit,
    control,
    setValue,
    setError,
    formState,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: formModel,
  });
  const { errors }: any = formState || {};
  /** SUBMIT FORM HANDLING */
  const onSubmitForm = (data: IWpHirarc) => {
    setDataParams(data);
  };

  return (
    <>
      <FormData
        setError={setError}
        setValue={setValue}
        dataParams={dataParams}
        fields={WpHirarcField}
        path={API_PATH().working_permit.hirarc}
        onLoading={setLoading}
        customLabel={'hide'}
        isModal={true}
        batch={true}
        overrideType={{tanggal:'date'}}
      >
        <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
          <Modal.Body>
            <Form.Group className='mb-3'>
              <Form.Label>Bagian</Form.Label>
              <SelectAsyncDynamic
                fieldName='id_wp_master_bagian'
                pathServiceName='master.working_permit.bagian'
                labelField='name'
                valueField='id_wp_master_bagian'
                placeholder='Pilih...'
                errors={errors}
                control={control}
                queryParams={{ sort_by: 'name' }}
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>
                Pekerjaan <RequiredInfo />
              </Form.Label>
              <Form.Control
                {...register('pekerjaan')}
                isInvalid={errors.pekerjaan}
              />
              <Form.Control.Feedback type='invalid'>
                {errors?.pekerjaan?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>
                Lokasi Pekerjaan <RequiredInfo />
              </Form.Label>
              <Form.Control
                {...register('lokasi_pekerjaan')}
                isInvalid={errors.lokasi_pekerjaan}
              />
              <Form.Control.Feedback type='invalid'>
                {errors?.lokasi_pekerjaan?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Tanggal <RequiredInfo />
              </Form.Label>
              <Form.Control
                {...register('tanggal')}
                isInvalid={errors.tanggal}
                type='date'
                formTarget='yyyy-mm-dd'
                placeholder='Pilih Tanggal'
              />
              <Form.Control.Feedback type='invalid'>
                {errors?.tanggal?.message}
              </Form.Control.Feedback>
            </Form.Group>
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
      </FormData>
    </>
  );
}
