import React, { useState } from 'react';
import { Row, Button, Form, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import FormData from '@app/modules/Form/FormData';
import ButtonCancel from '@app/components/Button/ButtonCancel';
// import { get } from 'lodash';
import RequiredInfo from '@app/components/Info/RequiredInfo';
import { API_PATH } from '@app/services/_path.service';
import { IModuleApi, IModuleApiFeild } from '@app/interface/master-data/moduleapi.interface ';
// import SelectAsyncDynamic from '@app/modules/SelectForm/SelectAsyncDynamic';
// import { getByIdPath } from '@app/services/main.service';
// import { useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';
// import { notificationTemplate } from '@app/helper/notificationTemplate';
// import { addNotification } from '@app/store/notification/notification.action';
// import { getObjectKeys } from '@app/helper/object.helper';
// import { pick } from 'lodash';
// import { useDispatch } from 'react-redux';

export default function ModuleApiForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();

  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    nama: Yup.string().typeError('Nama Wajib diisi').required('Nama Wajib diisi'),
  });

  const [formModel] = useState<any>();
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
  const onSubmitForm = (data: IModuleApi) => {
    setDataParams(data);
  };

  return (
    <>
      <FormData
        setError={setError}
        setValue={setValue}
        dataParams={dataParams}
        fields={IModuleApiFeild}
        path={API_PATH().master.external.extmodule}
        customLabel='state'
        onLoading={setLoading}
      >
        <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
          <Row className='mb-3'>
            <Col md='7' xs='12'>
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

