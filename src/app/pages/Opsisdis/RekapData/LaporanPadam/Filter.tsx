import React, { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';

import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import FiltersForm from '@app/modules/Filters/FilterForm';
import FilterActionButton from '@app/modules/Filters/FilterActionButton';
import Select from 'react-select';
import { ReactSelectStyle } from '@app/configs/react-select.config';
import { SELECT_GANGGUAN } from '@app/configs/select-options.config';


export default function Filter() {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();
  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    status: Yup.string(),
    // .typeError('Tanggal wajib diisi').required('Tanggal wajib diisi'),   
  });

  const [formModel] = useState<any>({});
  const optionData: any = SELECT_GANGGUAN()
  const {
    handleSubmit,
    setValue,
    setError,
    control,
    formState,
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
            <Col md={3}>
              <Form.Group className='' controlId='general_mode'>
                <Form.Label>Status</Form.Label>
                <Controller
                  control={control}
                  defaultValue={''}
                  name='status'
                  rules={{
                    required: false,
                  }}
                  render={({ field: { onChange, value, ref } }) => (
                    <Select
                      placeholder='Pilih Status'
                      styles={ReactSelectStyle}
                      classNamePrefix={`${errors.status ? 'is-invalid' : ''
                        }`}
                      inputRef={ref}
                      value={optionData?.filter(
                        (c: any) => c.value == value
                      )}
                      onChange={(val: any) => onChange(val?.value)}
                      options={optionData}
                      isClearable={true}
                    />
                  )}
                />
                {errors.status && (
                  <div className='invalid-feedback d-block'>
                    {errors.status?.message}
                  </div>
                )}
              </Form.Group>
            </Col>
            <Col md={2} className="mt-2">
              <FilterActionButton className="justify-content-start" loading={loading} onClickReset={() => onSubmitForm(null)} />
            </Col>
          </Row>

        </Form>
      </FiltersForm>
    </>
  );
}
