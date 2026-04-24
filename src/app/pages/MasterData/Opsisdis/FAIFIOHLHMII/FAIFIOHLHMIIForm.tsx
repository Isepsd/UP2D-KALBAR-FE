import React, { useState } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import ButtonCancel from '@app/components/Button/ButtonCancel';

import { API_PATH } from '@app/services/_path.service';
import FormData from '@app/modules/Form/FormData';
import { FaiFiohlHmiField, IFaiFiohlHmi } from "@app/interface/master-data/fai-fiohl-hmi.interface";
import Button from '@app/components/Button/Button';
import FormInputSwitch from '@app/components/Input/FormInputSwitch';

export default function FAIFIOHLHMIIForm() {
  const [path] = useState(API_PATH().master.opsisdis.rekap_padam.fiohl);
  const [dataParams, setDataParams] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    nama: Yup.string().required('Nama wajib diisi'),
    status: Yup.boolean().required('Staus wajib dipilih'),
  });

  const [formModel] = useState<any>({});
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    watch,
    // formState: { errors },
  } = useForm<IFaiFiohlHmi>({
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
        fields={FaiFiohlHmiField}
        path={path}
        customLabel='state'
        onLoading={setLoading}
      >
        <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
          <Row className='mb-3'>
            <Col md="6">
              <Form.Group className='mb-3' controlId='nama'>
                <Form.Label>Nama</Form.Label>
                <Form.Control {...register('nama')} />
              </Form.Group>
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
