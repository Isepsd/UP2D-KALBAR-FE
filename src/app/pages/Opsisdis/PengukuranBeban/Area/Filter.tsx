import React, { useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import FiltersForm from '@app/modules/Filters/FilterForm';
import FilterActionButton from '@app/modules/Filters/FilterActionButton';
import InputDate from '@app/components/Date/InputDate';
import moment from 'moment';
import InputCustomTime from '@app/components/Date/InputCustomTime';
import { timeFormSelect } from '@app/helper/time.helper';

export default function Filter() {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();
  const [optionsTimes, setOptionsTimes] = useState<any>([]);
  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    date: Yup.string(),
    // .typeError('Tanggal wajib diisi').required('Tanggal wajib diisi'),
    time: Yup.string()
    // .typeError('Time wajib diisi').required('Time wajib diisi'),
  });

  const [formModel] = useState<any>({});

  const {
    handleSubmit,
    setValue,
    setError,
    control,
    register,
    formState,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: formModel,
  });
  const { errors }: any = formState || {};

  /** SUBMIT FORM HANDLING */
  const onSubmitForm = (data: any) => {
    if (data?.date) {
      data.date = moment(data?.date).format('YYYY-MM-DD')
    }

    setDataParams(() => {
      return {
        ...data
      }
    });
  };
  useEffect(() => {
    let times = timeFormSelect(96, 30)
    setOptionsTimes(times)

  }, [])
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
            <Col md={4}>
              <Form.Group className='mb-2'>
                <Form.Label>Tanggal</Form.Label>
                <InputDate errors={errors} register={register} />
              </Form.Group>
            </Col>
            <Col md={4}>
              <InputCustomTime
                control={control}
                errors={errors}
                label="Time"
                options={optionsTimes} />
            </Col>
            <Col md={4} className="mt-2">
              <FilterActionButton className="justify-content-start" loading={loading} onClickReset={() => onSubmitForm(null)} />
            </Col>
          </Row>
        </Form>
      </FiltersForm>
    </>
  );
}
