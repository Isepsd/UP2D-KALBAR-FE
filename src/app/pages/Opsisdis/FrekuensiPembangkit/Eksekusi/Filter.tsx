import React, { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import FiltersForm from '@app/modules/Filters/FilterForm';
import FilterActionButton from '@app/modules/Filters/FilterActionButton';
import InputDate from '@app/components/Date/InputDate';
import moment from 'moment';
import SelectAsyncDynamic from '@app/modules/SelectForm/SelectAsyncDynamic';
import SelectFormStatic from '@app/modules/SelectForm/SelectFormStatic';

export default function Filter() {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();

  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    date: Yup.date().typeError('Tanggal wajib diisi').required('Tanggal wajib diisi'),
    id_meter: Yup.string(),
  });

  const [formModel] = useState<any>({});
  const {
    handleSubmit,
    setValue,
    setError,
    register,
    control,
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
    setDataParams(data);
  };

  return (
    <>
      <FiltersForm
        setError={setError}
        setValue={setValue}
        dataParams={dataParams}
        onLoading={setLoading}
        fields={{ id_ref_lokasi: undefined }}
      >
        <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
          <Row>
            <Col md={4}>
              <Form.Group className='mb-2'>
                <Form.Label>Tanggal</Form.Label>
                <InputDate errors={errors} register={register} />
                <Form.Control.Feedback type='invalid'>
                  {errors?.date?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Nama Alat</Form.Label>
                <SelectAsyncDynamic
                  fieldName='id_meter'
                  pathServiceName='master.opsisdis.frequensi'
                  labelField='nama'
                  valueField='id_meter'
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
            <Col md={4}>
              <Form.Group>
                <Form.Label>Jenis Treshold</Form.Label>
                <SelectFormStatic
                  fieldName='jenis_treshold'
                  placeholder='Pilih...'
                  errors={errors}
                  control={control}
                  options={[
                    {label: 'Semua', value: 'all'},
                    {label: 'Upper', value: 'upper'},
                    {label: 'Lower', value: 'lower'}
                  ]}
                />
              </Form.Group>
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
