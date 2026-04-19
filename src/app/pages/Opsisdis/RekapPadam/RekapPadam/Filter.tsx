import React, { useState } from 'react';
import { Form, InputGroup, Row, Col } from 'react-bootstrap';
import Select from 'react-select'
import * as Yup from 'yup';

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { ReactSelectStyle } from '@app/configs/react-select.config';
import FiltersForm from '@app/modules/Filters/FilterForm';
import InputForm from '@app/components/Input/FormInputNoLabel';
import FilterActionButton from '@app/modules/Filters/FilterActionButton';
import moment from 'moment';

export default function Filter() {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();

  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    ufr: Yup.string(),
  });
  const [formModel] = useState<any>({
    status: '',
    tanggal_after: moment().subtract(3, 'd').format('YYYY-MM-DD'),
    tanggal_before: moment().format('YYYY-MM-DD')
  });

  const option_status = [
    { label: 'SEMUA', value: '' },
    { label: 'PADAM', value: 'Padam' },
    { label: 'NORMAL', value: 'Normal' },
    { label: 'NYALA BERTAHAP', value: 'Nyala Bertahap' },
  ];

  const {
    handleSubmit,
    control,
    formState,
    setValue,
    setError
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: formModel,
  });
  const { errors }: any = formState || {};

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
      >
        <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
          <Row>
            <Col md={4} className='mb-3'>
              <Form.Group>
                <Form.Label>Range Tanggal</Form.Label>
                <InputGroup>
                  <InputForm type='date' control={control} name={'tanggal_after'} />
                  <InputGroup.Text>
                    <i className='fa-solid fa-arrow-right'></i>
                  </InputGroup.Text>
                  <InputForm type='date' control={control} name={'tanggal_before'} />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col md={4} className='mb-3'>
              <Form.Group>
                <Form.Label>Status</Form.Label>
                <Controller
                    control={control}
                    defaultValue={''}
                    name='status'
                    rules={{
                      required: false,
                    }}
                    render={({ field: { onChange, ref } }) => (
                      <Select
                        placeholder='Pilih...'
                        styles={ReactSelectStyle}
                        classNamePrefix={`${errors.ufr ? 'is-invalid' : ''}`}
                        inputRef={ref}
                        onChange={(val: any) => onChange(val?.value)}
                        options={option_status}
                      />
                    )}
                  />
              </Form.Group>
            </Col>
          </Row>
          <FilterActionButton loading={loading} onClickReset={() => onSubmitForm(null)} />
        </Form>
      </FiltersForm>
    </>
  );
}
