import React, { useState } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import SelectAsyncDynamic from '@app/modules/SelectForm/SelectAsyncDynamic';
import ButtonCancel from '@app/components/Button/ButtonCancel';
import FormData from '@app/modules/Form/FormData';

import RequiredInfo from '@app/components/Info/RequiredInfo';
import { API_PATH } from '@app/services/_path.service';
import { IUserTokenField } from '@app/interface/master-data/usertoken.interface';
import Button from '@app/components/Button/Button';

export default function RoleFormPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();

  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    nama: Yup.string().required('Role name wajib disi'),

    // level: Yup.number()
    //   .typeError('Level wajib diisi')
    //   .required('Level wajib diisi'),
  });

  const [formModel] = useState<any>({ status_listrik: '1', lat: 0, lon: 0 });
  const {
    register,
    control,
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
        fields={IUserTokenField}
        path={API_PATH().master.external.usertoken}
        customLabel='state'
        onLoading={setLoading}
      >
        <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
          <Row className='mb-3'>
            <Col md="6">
              <Form.Group className='mt-3'>
                <Form.Label>
                  Nama<RequiredInfo />
                </Form.Label>
                <Form.Control {...register('nama')} isInvalid={errors.nama} />
                <Form.Control.Feedback type='invalid'>
                  {errors?.name?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row className='mb-3'>
            <Col md="6">
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

              < Form.Group className='mt-3'>
                <Form.Label>User <RequiredInfo /></Form.Label>
                <SelectAsyncDynamic
                  fieldName="id_user"
                  control={control}
                  errors={errors}
                  labelField={'fullname'}
                  valueField={'id_user'}
                  pathServiceName={'admin.user'}

                  queryParams={{ sort_by: 'name' }}
                  setValue={setValue}
                // options={dataSelected?.id_user}
                ></SelectAsyncDynamic>
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
