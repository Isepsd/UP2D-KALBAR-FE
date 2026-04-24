import React, { useEffect, useState } from 'react';
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
import qs from 'query-string';

interface IFilter {
  labelParent: string;
  id_jenis_lokasi: any
  parentFiled?: string
}

export default function Filter({ labelParent, parentFiled = "id_ref_jenis_lokasi", id_jenis_lokasi }: IFilter) {
  const queryParams = qs.parse(location.search);
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();
  // const [optionsTimes, setOptionsTimes] = useState<any>([]);
  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    date: Yup.string().typeError('Tanggal wajib diisi').required('Tanggal wajib diisi'),
    // time: Yup.string().typeError('Time wajib diisi').required('Time wajib diisi'),
    id_parent_lokasi: Yup.string().typeError('Unit pembangkit wajib diisi').required('Unit pembangkit wajib diisi'),
  });

  const [formModel] = useState<any>({
    date: null,
    id_parent_lokasi: null,
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
    if (data?.date) {
      data.date = moment(data?.date).format('YYYY-MM-DD')
    }
    setDataParams(data);
  };

  useEffect(() => {
    setValue("date", queryParams?.date ? queryParams?.date : moment().format('YYYY-MM-DD'))
    setValue("id_parent_lokasi", queryParams?.id_parent_lokasi ? queryParams?.id_parent_lokasi : null)
  }, [queryParams?.date, queryParams?.id_parent_lokasi])

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
            <Col md={3}>
              <Form.Group className='mb-2'>
                <Form.Label>Tanggal</Form.Label>
                <InputDate errors={errors} register={register} />
                <Form.Control.Feedback type='invalid'>
                  {errors?.date?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className='mb-2'>
                <Form.Label>{labelParent}</Form.Label>
                <SelectAsyncDynamic
                  fieldName='id_parent_lokasi'
                  pathServiceName='master.jaringan.ref_lokasi'
                  labelField='nama_lokasi'
                  valueField='id_ref_lokasi'
                  placeholder='Pilih...'
                  isClearable={true}
                  errors={errors}
                  control={control}
                  queryParams={{
                    page: -1,
                    limit: 10,
                    sort_by: 'nama_lokasi',
                    [parentFiled]: `${id_jenis_lokasi}`,
                  }}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.id_parent_lokasi?.message}
                </Form.Control.Feedback>
              </Form.Group>

            </Col>
            <Col md={4} className="mt-2">
              <FilterActionButton className="justify-content-start" loading={loading} onClickReset={() => onSubmitForm(null)} />

            </Col>
            {/* <InputCustomTime
            control={control}
            errors={errors}
            label="Time"
            options={optionsTimes} /> */}
          </Row>
        </Form>
      </FiltersForm>
    </>
  );
}
