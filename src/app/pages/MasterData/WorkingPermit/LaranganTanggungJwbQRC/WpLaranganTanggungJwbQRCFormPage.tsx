import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm, } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import ButtonCancel from '@app/components/Button/ButtonCancel';
import FormData from '@app/modules/Form/FormData';

import { ILaranganTanggungJawabRQC, FLaranganTanggungJawabRQC } from '@app/interface/working-permit.interface';
import RequiredInfo from '@app/components/Info/RequiredInfo';
import { API_PATH } from '@app/services/_path.service';

export default function WpLaranganTanggungJwbQRCFormPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();

  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    uraian: Yup.string().required('Uraian Wajib diisi'),
  });

  const [formModel] = useState<any>({ status: 1 });
  const { register, handleSubmit, setValue, setError, formState } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: formModel,
  });
  const { errors }: any = formState || {};
  const onSubmitForm = (data: ILaranganTanggungJawabRQC) => {
    setDataParams(data);
  };

  return (
    <>
      <FormData
        setError={setError}
        setValue={setValue}
        dataParams={dataParams}
        fields={FLaranganTanggungJawabRQC}
        path={API_PATH().master.working_permit.larangan_tanggung_jawab_qrc}
        customLabel='state'
        onLoading={setLoading}
      >
        <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
          <Form.Group className='mb-3'>
            <Form.Label>Uraian<RequiredInfo/></Form.Label>
            <Form.Control as={'textarea'} {...register('uraian')} isInvalid={errors.uraian} rows={5} />
            <Form.Control.Feedback type='invalid'>
              {errors?.uraian?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className='mt-4'>
            <Button type='submit' variant='primary' disabled={loading}>Simpan</Button>
            <ButtonCancel />
          </Form.Group>
        </Form>
      </FormData>
    </>
  );
}
