import React, { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import FiltersForm from '@app/modules/Filters/FilterForm';
import FilterActionButton from '@app/modules/Filters/FilterActionButton';
import FInputDateRange from '@app/modules/Filters/FInputDateRange';

export default function Filter() {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();

  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({});

  const [formModel] = useState<any>({});

  const { handleSubmit, register, setValue, setError, control } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: formModel,
  });

  /** SUBMIT FORM HANDLING */
  const onSubmitForm = (data: any) => {
    setDataParams(data);
  };

  return (
    <>
      <FiltersForm
        setError={setError}
        setValue={setValue}
        dataParams={dataParams}
        onLoading={setLoading}
        fields={{ station: '', dt1: null, dt2: null, bay: '' }}
      >
        <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
          <Form.Group>
            <Form.Label>Datum</Form.Label>
            <FInputDateRange
              control={control}
              dt1={'dt1'}
              dt2={'dt2'}
              register={register}
            ></FInputDateRange>
          </Form.Group>
          <Row>
            <Form.Group as={Col} className='mb-3'>
              <Form.Label>Station</Form.Label>
              <Form.Control {...register('station')} placeholder='Station' />
            </Form.Group>
            <Form.Group as={Col} className='mb-3'>
              <Form.Label>Bay</Form.Label>
              <Form.Control {...register('bay')} placeholder='Bay' />
            </Form.Group>
          </Row>
          <FilterActionButton
            loading={loading}
            onClickReset={() => onSubmitForm(null)}
          ></FilterActionButton>
        </Form>
      </FiltersForm>
    </>
  );
}
