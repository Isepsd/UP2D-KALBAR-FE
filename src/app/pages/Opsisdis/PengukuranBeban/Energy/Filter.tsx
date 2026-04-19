import React, { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import FiltersForm from '@app/modules/Filters/FilterForm';
import SelectAsyncDynamic from '@app/modules/SelectForm/SelectAsyncDynamic';
import FilterActionButton from '@app/modules/Filters/FilterActionButton';
import InputDate from '@app/components/Date/InputDate';
import moment from 'moment';
// import { timeFormSelect } from '@app/helper/time.helper';
// import SelectFormStatic from '@app/modules/SelectForm/SelectFormStatic';

export default function Filter() {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>({
    date: moment().format("YYYY-MM-DD"),
  });
  // const [optionsTimes, setOptionsTimes] = useState<any>([]);

  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    date: Yup.string().typeError('Tanggal wajib diisi'),
    // time: Yup.string().typeError('Time wajib diisi'),
    customer_id: Yup.string().typeError('Customer belum dipilih'),
  });

  const [formModel] = useState<any>({
    date: moment().format("YYYY-MM-DD"),
    // time: optionsTimes[0]?.value
  });

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
    // if (data?.date) {
    //   data.date = moment(data?.date).format('YYYY-MM-DD')
    // }
    setDataParams(() => {
      return {
        ...data
      }
    });
  };

  // useEffect(() => {
  //   let times = timeFormSelect(96, 15)
  //   setOptionsTimes(times)
  //   setDataParams({
  //     date: moment().format("YYYY-MM-DD"),
  //     time: times[0].value
  //   })
  //   setFormModel({
  //     date: moment().format("YYYY-MM-DD"),
  //     time: times[0].value
  //   })
  // }, [])

  return (
    <>
      <FiltersForm
        setError={setError}
        setValue={setValue}
        dataParams={dataParams}
        onLoading={setLoading}
        fields={{
          customer_rid: undefined,
          date: moment().format("YYYY-MM-DD"),
          // time: optionsTimes[0]?.value
        }}
      >
        <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
          <Row>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Customer</Form.Label>
                <SelectAsyncDynamic
                  fieldName='customer_rid'
                  pathServiceName='master.opsisdis.customer'
                  labelField='nama'
                  valueField='customer_rid'
                  placeholder='Pilih...'
                  isClearable={true}
                  errors={errors}
                  control={control}
                  required={false}
                  queryParams={{
                    page: -1,
                    limit: 10,
                    sort_by: 'nama',
                  }}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.customer_rid?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Tanggal</Form.Label>
                <InputDate type='date' errors={errors} register={register} />
                <Form.Control.Feedback type='invalid'>
                  {errors?.date?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            {/* <Col md={3}>
              <Form.Group>
                <Form.Group className='mb-2'>
                  <Form.Label>Jam</Form.Label>
                  <SelectFormStatic
                    control={control}
                    errors={errors}
                    fieldName={'time'}
                    isClearable={false}
                    options={optionsTimes}
                  />
                </Form.Group>
              </Form.Group>
            </Col> */}
            <Col md={3} className="mt-2">
              <FilterActionButton className="justify-content-start" loading={loading} />
            </Col>
          </Row>
        </Form>
      </FiltersForm>
    </>
  );
}
