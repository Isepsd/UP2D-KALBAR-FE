import React, { useState } from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import { useForm, } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import ButtonCancel from '@app/components/Button/ButtonCancel';
import FormData from '@app/modules/Form/FormData';

import { IPertanyaanRQC, FPertanyaanRQC } from '@app/interface/working-permit.interface';
import RequiredInfo from '@app/components/Info/RequiredInfo';
import { API_PATH } from '@app/services/_path.service';

export default function WpPertanyaanQRCFormPage() {
  
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();

  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    pertanyaan_qrc_point: Yup.number().typeError("Harus berupa angka").required('Point Wajib diisi'),
    pertanyaan_qrc: Yup.string().required('Pertanyaan Wajib diisi'),
  });

  const [formModel] = useState<any>({ status: 1 });
  const { register, handleSubmit, setValue, setError, formState } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: formModel,
  });
  const { errors }: any = formState || {};
  const onSubmitForm = (data: IPertanyaanRQC) => {
    setDataParams(data);
  };

  return (
    <>
      <FormData
        setError={setError}
        setValue={setValue}
        dataParams={dataParams}
        fields={FPertanyaanRQC}
        path={API_PATH().master.working_permit.pertanyaan_qrc}
        customLabel='state'
        onLoading={setLoading}
      >
        <Col md={6} xs={12}>
          <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
            <Form.Group className='mb-3'>
              <Form.Label>Pertanyaan<RequiredInfo /></Form.Label>
              <Form.Control as={'textarea'} {...register('pertanyaan_qrc')} isInvalid={errors.pertanyaan_qrc} />
              <Form.Control.Feedback type='invalid'>
                {errors?.pertanyaan_qrc?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Point<RequiredInfo /></Form.Label>
              <Form.Control type='number' {...register('pertanyaan_qrc_point')} isInvalid={errors.pertanyaan_qrc_point} />
              <Form.Control.Feedback type='invalid'>
                {errors?.pertanyaan_qrc_point?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className='mt-4'>
              <Button type='submit' variant='primary' disabled={loading}>Simpan</Button>
              <ButtonCancel />
            </Form.Group>
          </Form>
        </Col>
      </FormData>
    </>
  );
}
