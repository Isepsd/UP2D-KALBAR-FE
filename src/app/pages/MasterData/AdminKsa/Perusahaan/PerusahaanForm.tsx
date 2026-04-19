import React, { useState } from 'react';
import { Row, Button, Form, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import ButtonCancel from '@app/components/Button/ButtonCancel';
import FormData from '@app/modules/Form/FormData';

import RequiredInfo from '@app/components/Info/RequiredInfo';
import { API_PATH } from '@app/services/_path.service';
import {
  AdminKSAPerusahaanField,
  IAdminKSAPerusahaan,
} from '@app/interface/admin-ksa-perusahaan.interface';

export default function JarPembangkitForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();

  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    nama: Yup.string().typeError('Nama Wajib diisi').required('Nama Wajib diisi'),
    nama_direktur: Yup.string().typeError('Nama Direktur Wajib diisi').required('Nama Direktur  Wajib diisi'),
    no_hp: Yup.string().typeError('No HP Wajib diisi').required('No HP Wajib diisi'),
    email: Yup.string().typeError('Email Wajib diisi').required('Email Wajib diisi'),
  });

  const [formModel] = useState<any>({ status_listrik: '1', lat: 0, lon: 0 });
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
  const onSubmitForm = (data: IAdminKSAPerusahaan) => {
    setDataParams(data);
  };

  return (
    <>
      <FormData
        setError={setError}
        setValue={setValue}
        dataParams={dataParams}
        fields={AdminKSAPerusahaanField}
        path={API_PATH().master.admin_ksa.perusahaan}
        customLabel='state'
        onLoading={setLoading}
      >
        <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
          <Row className='mb-3'>
            <Col md='7' xs='12'>
              <Form.Group className='mt-3'>
                <Form.Label>
                  Nama Perusahaan<RequiredInfo />
                </Form.Label>
                <Form.Control {...register('nama')} isInvalid={errors.nama} />
                <Form.Control.Feedback type='invalid'>
                  {errors?.nama?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className='mt-3'>
                <Form.Label>
                  Nama Direktur<RequiredInfo />
                </Form.Label>
                <Form.Control {...register('nama_direktur')} isInvalid={errors.nama_direktur} />
                <Form.Control.Feedback type='invalid'>
                  {errors?.nama_direktur?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className='mt-3'>
                <Form.Label>
                  Email
                </Form.Label>
                <Form.Control {...register('email')} isInvalid={errors.email} />
                <Form.Control.Feedback type='invalid'>
                  {errors?.email?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className='mt-3'>
                <Form.Label>
                  No Hp<RequiredInfo />
                </Form.Label>
                <Form.Control {...register('no_hp')} isInvalid={errors.no_hp} />
                <Form.Control.Feedback type='invalid'>
                  {errors?.no_hp?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className='mt-3'>
                <Form.Label>
                  Alamat<RequiredInfo />
                </Form.Label>
                <Form.Control as="textarea" {...register('alamat_kantor')} isInvalid={errors.alamat_kantor} rows={3} />
                <Form.Control.Feedback type='invalid'>
                  {errors?.alamat_kantor?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className='mt-4'>
            <Button type='submit' variant='primary' disabled={loading}>
              Simpan
            </Button>
            <ButtonCancel />
          </Form.Group>
        </Form>
      </FormData>
    </>
  );
}
