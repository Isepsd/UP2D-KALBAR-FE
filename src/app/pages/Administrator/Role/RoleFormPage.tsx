import React, { useState } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import ButtonCancel from '@app/components/Button/ButtonCancel';
import FormData from '@app/modules/Form/FormData';

import RequiredInfo from '@app/components/Info/RequiredInfo';
import { API_PATH } from '@app/services/_path.service';
import { RoleField } from '@app/interface/role.interface';
import Button from '@app/components/Button/Button';

export default function RoleFormPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();

  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Role name wajib disi'),
    description: Yup.string().nullable(),
    // level: Yup.number()
    //   .typeError('Level wajib diisi')
    //   .required('Level wajib diisi'),
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
  const onSubmitForm = (data: any) => {
    const params = {
      ...data,
      privileges: data?.privileges ? data?.privileges : '',
    };
    setDataParams(params);
  };

  return (
    <>
      <FormData
        setError={setError}
        setValue={setValue}
        dataParams={dataParams}
        fields={RoleField}
        path={API_PATH().admin.role}
        customLabel='state'
        onLoading={setLoading}
      >
        <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
          <Row className='mb-3'>
            <Col md="6">
              <Form.Group className='mb-3' controlId='name'>
                <Form.Label>Nama hak akses <RequiredInfo /></Form.Label>
                <Form.Control
                  type='text'
                  {...register('name')}
                  isInvalid={errors.name}
                  placeholder='Hak akses'
                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.name?.message}
                </Form.Control.Feedback>
              </Form.Group>

              {/* <Form.Group className='mb-3' controlId='level'>
                <Form.Label>Level <RequiredInfo /></Form.Label>
                <Form.Control
                  type='number'
                  {...register('level')}
                  isInvalid={errors.level}
                  placeholder='Level'
                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.level?.message}
                </Form.Control.Feedback>
              </Form.Group> */}

              <Form.Group className='mt-3' controlId='about'>
                <Form.Label>Deskripsi</Form.Label>
                <Form.Control
                  {...register('description')}
                  as='textarea'
                  rows={3}
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className='mt-4'>
            <Button type='submit' variant='primary' isLoading={loading}>
              Save
            </Button>
            <ButtonCancel />
          </Form.Group>
        </Form>
      </FormData>
    </>
  );
}
