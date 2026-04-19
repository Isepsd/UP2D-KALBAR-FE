import React, { useState } from 'react';
import { Row, Col, Form } from 'react-bootstrap';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import ButtonCancel from '@app/components/Button/ButtonCancel';

import { API_PATH } from '@app/services/_path.service';
import FormData from '@app/modules/Form/FormData';
import Button from '@app/components/Button/Button';
import { DispatcherField, IDispatcher } from '@app/interface/master-data/dispatcher.interface';
import FormInputControl from '@app/components/Input/FormInputControl';

export default function DispatcherForm() {
  const [path] = useState(
    API_PATH().master.opsisdis.rekap_padam.ref_ep_petugas
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();

  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    nama: Yup.string().required(),
    jenis: Yup.string().nullable(),
  });

  const [formModel] = useState<any>({});
  const { register, handleSubmit, setError, setValue, formState:{errors} } = useForm<IDispatcher>({
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
        fields={DispatcherField}
        path={path}
        customLabel='state'
        onLoading={setLoading}
      >
        <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
          <Row className='mb-3'>
            <Col md="6" sm> 
              <FormInputControl
                required={true}
                labelName='Nama'
                type='text'
                register={register('nama')}
                isInvalid={errors?.nama as boolean | undefined}
                message={errors?.nama?.message}
                placeholder='Nama'
              />
              <FormInputControl
                required={false}
                labelName='Jenis'
                type='text'
                register={register('jenis')}
                isInvalid={errors?.jenis as boolean | undefined}
                message={errors?.jenis?.message}
                placeholder='Jenis'
              />
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
