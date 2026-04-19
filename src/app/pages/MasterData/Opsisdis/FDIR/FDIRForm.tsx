import React, { useState } from 'react';
import { Row, Col, Form } from 'react-bootstrap';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import ButtonCancel from '@app/components/Button/ButtonCancel';

import { API_PATH } from '@app/services/_path.service';
import FormData from '@app/modules/Form/FormData';
import Button from '@app/components/Button/Button';
import { FdirField, IFdir } from '@app/interface/master-data/fdir.interface';
import FormInputControl from '@app/components/Input/FormInputControl';
import FormInputSwitch from '@app/components/Input/FormInputSwitch';

export default function FDIRForm() {
  const [path] = useState(API_PATH().master.opsisdis.rekap_padam.fdir);
  const [dataParams, setDataParams] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    nama: Yup.string().required(),
    status: Yup.boolean().required(),
  });

  const [formModel] = useState<any>();
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    watch,
    formState: { errors },
  } = useForm<IFdir>({
    resolver: yupResolver(validationSchema),
    defaultValues: formModel,
  });

  const watchStatus = watch('status');

  const onSubmitForm = (data: any) => {
    setDataParams(data);
  };

  return (
    <>
      <FormData
        setError={setError}
        setValue={setValue}
        dataParams={dataParams}
        fields={FdirField}
        path={path}
        customLabel='state'
        onLoading={setLoading}
      >
        <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
          <Row className='mb-3'>
            <Col>
              <FormInputControl
                required={true}
                labelName='Nama'
                type='text'
                register={register('nama')}
                isInvalid={errors?.nama as boolean | undefined}
                message={errors?.nama?.message}
                placeholder='Nama'
              />
              <FormInputSwitch
                labelName='Status'
                register={register('status')}
                value={watchStatus}
                trueLabel='Active'
                falseLabel='Inactive'
              ></FormInputSwitch>
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
