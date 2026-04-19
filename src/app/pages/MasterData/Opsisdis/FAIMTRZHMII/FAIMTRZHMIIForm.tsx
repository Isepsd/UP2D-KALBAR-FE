import React, { useState } from 'react';
import { Row, Col, Form } from 'react-bootstrap';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import ButtonCancel from '@app/components/Button/ButtonCancel';

import { API_PATH } from '@app/services/_path.service';
import FormData from '@app/modules/Form/FormData';
import Button from '@app/components/Button/Button';
import {
  FaiMtrzHmiField,
  IFaiMtrzHmi,
} from '@app/interface/master-data/fai-mtrz-hmi.interface';
import FormInputControl from '@app/components/Input/FormInputControl';

export default function FAIMTRZHMIIForm() {
  const [path] = useState(API_PATH().master.opsisdis.rekap_padam.fai_mtrz);
  const [dataParams, setDataParams] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    nama: Yup.string().required(),
    status: Yup.number().required(),
  });

  const [formModel] = useState<any>({});
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<IFaiMtrzHmi>({
    resolver: yupResolver(validationSchema),
    defaultValues: formModel,
  });

  const onSubmitForm = (data: any) => {
    setDataParams(data);
  };

  return (
    <>
      <FormData
        setError={setError}
        setValue={setValue}
        dataParams={dataParams}
        fields={FaiMtrzHmiField}
        path={path}
        customLabel='state'
        onLoading={setLoading}
        overrideType={{ status: 'string' }}
      >
        <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
          <Row className='mb-3'>
            <Col md='6' sm>
              <FormInputControl
                required={true}
                labelName='Nama'
                type='text'
                register={register('nama')}
                isInvalid={errors?.nama as boolean | undefined}
                message={errors?.nama?.message}
                placeholder='Nama'
              />
              <Form.Group>
                <Form.Label>Status</Form.Label>
                <div>
                  <Form.Check
                    {...register('status')}
                    inline
                    type='radio'
                    value='1'
                    label='Active'
                  />
                  <Form.Check
                    {...register('status')}
                    inline
                    type='radio'
                    value='0'
                    label='Inactive'
                  />
                </div>
                <Form.Control.Feedback type='invalid'>
                  {errors?.status?.message}
                </Form.Control.Feedback>
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
