import React, { useState } from 'react';
import { Row, Button, Form, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import ButtonCancel from '@app/components/Button/ButtonCancel';
import FormData from '@app/modules/Form/FormData';

import RequiredInfo from '@app/components/Info/RequiredInfo';
import { API_PATH } from '@app/services/_path.service';
import { AdminKSAJabatanField, IAdminKSAJabatan } from '@app/interface/admin-ksa-jabatan.interface';

export default function JarPembangkitForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();

  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    nama: Yup.string()
      .typeError('Nama jabatan wajib diisi')
      .required('Nama jabatan wajib diisi'),
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
  const onSubmitForm = (data: IAdminKSAJabatan) => {
    setDataParams(data);
  };

  return (
    <>
      <FormData
        setError={setError}
        setValue={setValue}
        dataParams={dataParams}
        fields={AdminKSAJabatanField}
        path={API_PATH().master.admin_ksa.jabatan}
        customLabel='state'
        onLoading={setLoading}
      >
        <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
          <Row className='mb-3'>
            <Col md='6' xs='12'>
              <Form.Group className='mt-3'>
                <Form.Label>
                  Nama Jabatan<RequiredInfo />
                </Form.Label>
                <Form.Control {...register('nama')} isInvalid={errors.nama} />
                <Form.Control.Feedback type='invalid'>
                  {errors?.nama?.message}
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
