import React, { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import Button from '@app/components/Button/Button';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { JENIS_LOKASI } from '@app/configs/jenis-lokasi.config';
import {
  FasopPath3Field,
  IFasopPath3,
} from '@app/interface/fasop-path-3.interface';

import FormData from '@app/modules/Form/FormData';
import ButtonCancel from '@app/components/Button/ButtonCancel';
import { API_PATH } from '@app/services/_path.service';
import SelectAsyncDynamic from '@app/modules/SelectForm/SelectAsyncDynamic';

export default function Path3FormPage() {
  const [dataParams, setDataParams] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    path3: Yup.string().nullable(),
    status: Yup.number()
      .typeError('Status harus number')
      .required('Status Wajib diisi'),
    id_ref_lokasi: Yup.number()
      .nullable()
      .transform((_, val) => (val === Number(val) ? val : null)),
  });

  const [formModel] = useState<any>({});
  const {
    register,
    handleSubmit,
    setValue,
    control,
    setError,
    formState,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: formModel,
  });
 
  const { errors }: any = formState || {};

  /** SUBMIT FORM HANDLING */
  const onSubmitForm = (data: IFasopPath3) => {
    setDataParams(data);
  };

  return (
    <>
      <FormData
        setError={setError}
        setValue={setValue}
        dataParams={dataParams}
        fields={FasopPath3Field}
        path={API_PATH().master.fasop.path3}
        onLoading={setLoading}
        overrideType={{status:'string'}}
      >
        <Col md='8' xs='12'>
          <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
            <Row>
              <Form.Group as={Col} className='mb-3'>
                <Form.Label>Path 3</Form.Label>
                <Form.Control
                  {...register('path3')}
                  isInvalid={errors.path3}
                  readOnly
                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.path3?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} className='mb-3'>
                <Form.Label>Station</Form.Label>
                <SelectAsyncDynamic
                  fieldName='id_ref_lokasi'
                  pathServiceName='master.jaringan.ref_lokasi'
                  labelField='nama_lokasi'
                  valueField='id_ref_lokasi'
                  placeholder='Pilih...'
                  isClearable={true}
                  errors={errors}
                  control={control}
                  queryParams={{
                    id_ref_jenis_lokasi_in: `
                          ${JENIS_LOKASI().trafo_gi},
                          ${JENIS_LOKASI().penyulang},
                          ${JENIS_LOKASI().zone}`,
                  }}
                />
              </Form.Group>
            </Row>
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

            <Form.Group className='mt-4'>
              <Button type='submit' variant='primary' isLoading={loading}>
                Simpan
              </Button>
              <ButtonCancel />
            </Form.Group>
          </Form>
        </Col>
      </FormData>
    </>
  );
}
