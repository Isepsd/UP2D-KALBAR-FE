import React, { useState } from 'react';
import { Col, Form } from 'react-bootstrap';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { WpOnlinePekerjaField } from '@app/interface/wp-online-pekerja.interface';
import { API_PATH } from '@app/services/_path.service';

import FormData from '@app/modules/Form/FormData';
import Button from '@app/components/Button/Button';


export default function WmWpPekerjaForm({selected}:any) {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();

  /** FORM  HANDLE
   */
  const validationSchema = Yup.object().shape({
    nama_pekerja: Yup.string().required('Nama pekerja wajib diisi'),
  });

  const [formModel] = useState<any>({nomor_formulir: selected?.nomor_formulir, id_wp_online: selected?.id_wp_online});

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: formModel,
  });
  const { errors }: any = formState || {};

  /** SUBMIT FORM HANDLING */
  const onSubmitForm = (data: any) => {
    data.id_wp_online = selected?.id_wp_online
    delete data.nomor_formulir
    setDataParams(data);
  };

  return (
    <>
      <FormData
        setError={setError}
        setValue={setValue}
        dataParams={dataParams}
        fields={WpOnlinePekerjaField}
        path={API_PATH().working_permit.online_pekerja}
        onLoading={setLoading}
        customLabel='Pekerja'
        hideTitle={true}
        classContainer=""
        isModal={true}
      >
        <Col xs="12">
          <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
            <Form.Group className='mb-3'>
              <Form.Label>Nomor formulir</Form.Label>
              <Form.Control {...register('nomor_formulir')} isInvalid={errors.nomor_formulir} readOnly/>
              <Form.Control.Feedback type='invalid'>
                {errors?.nomor_formulir?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Nama Pekerja</Form.Label>
              <Form.Control {...register('nama_pekerja')} isInvalid={errors.nama_pekerja} />
              <Form.Control.Feedback type='invalid'>
                {errors?.nama_pekerja?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className='mt-4'>
              <Button type='submit' variant='primary' isLoading={loading} >
                Tambah
              </Button>
            </Form.Group>
          </Form>
        </Col>
      </FormData>
    </>
  );
}
