import React, { useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';

import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import FiltersForm from '@app/modules/Filters/FilterForm';
import SelectAsyncDynamic from '@app/modules/SelectForm/SelectAsyncDynamic';
import FilterActionButton from '@app/modules/Filters/FilterActionButton';
import InputDate from '@app/components/Date/InputDate';
import moment from 'moment';
import { JENIS_LOKASI } from '@app/configs/jenis-lokasi.config';
import { generatingData } from '@app/store/reducers/app';
import { useDispatch } from 'react-redux';
import SelectFormStatic from '@app/modules/SelectForm/SelectFormStatic';
import { omit } from 'lodash';

interface IFilter {
  setAdd?: any;
  optionsTimes: any;
  optionsUnitPembangkit: any;
}

export default function Filter({
  setAdd,
  optionsTimes,
  optionsUnitPembangkit
}: IFilter) {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();

  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    date: Yup.string()
      .typeError('Tanggal wajib diisi')
      .required('Tanggal wajib diisi'),
    id_parent_lokasi: Yup.string().typeError('Unit pembangkit wajib diisi').required('Unit pembangkit wajib diisi'),
    id_pembangkit: Yup.string().nullable(),
    time: Yup.string().nullable(), //.typeError('Time wajib diisi')
  });
  const dispatch = useDispatch();

  const [formModel] = useState<any>({});

  /** KEMBALIKAN DEFAULT FILTER KE SETINGAN AWAL */
  useEffect(() => {
    setDataParams({
      ...formModel,
      date: moment().format('YYYY-MM-DD'),
      id_parent_lokasi: optionsUnitPembangkit[0]?.value
      // time: moment().subtract(1, 'hour').format('HH:[00]'),
    });
    setValue('id_parent_lokasi', optionsUnitPembangkit[0]?.value)
  }, []);

  const {
    handleSubmit,
    setValue,
    setError,
    control,
    register,
    formState
  } =
    useForm({
      resolver: yupResolver(validationSchema),
      defaultValues: formModel,
    });
  const { errors }: any = formState || {};

  const watchInduk = useWatch({ control, name: 'id_parent_lokasi' });
  const watchLokasi = useWatch({ control, name: 'id_pembangkit' });
  const watchDate = useWatch({ control, name: 'date' });

  /** SUBMIT FORM HANDLING */
  const onSubmitForm = (data: any) => {
    if (data?.date) {
      data = omit(data,)
    }
    setDataParams(() => {
      return {
        ...data
      }
    });
  };

  useEffect(() => {
    setValue('id_pembangkit', null);
    dispatch(generatingData(null));
    setAdd(false);
  }, [watchInduk]);

  useEffect(() => {
    dispatch(generatingData(null));
    setAdd(false);
  }, [watchLokasi]);

  useEffect(() => {
    dispatch(generatingData(null));
    setAdd(false);
  }, [watchDate]);

  return (
    <>
      <FiltersForm
        setError={setError}
        setValue={setValue}
        dataParams={dataParams}
        onLoading={setLoading}
        fields={{
          id_pembangkit: undefined,
          time: undefined,
          id_parent_lokasi: optionsUnitPembangkit[0]?.value,
          date: moment().format("YYYY-MM-DD"),
        }}
      >
        <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
          <Row>
            <Col md={2}>
              <Form.Group className='mb-2'>
                <Form.Label>Tanggal</Form.Label>
                <InputDate errors={errors} register={register} />
                <Form.Control.Feedback type='invalid'>
                  {errors?.date?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Group>
                <Form.Label>Jam</Form.Label>
                <SelectFormStatic
                  control={control}
                  errors={errors}
                  fieldName={'time'}
                  isClearable={true}
                  options={optionsTimes}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className='mb-2'>
                <Form.Label>Unit Pembangkit</Form.Label>
                <SelectFormStatic
                  control={control}
                  errors={errors}
                  fieldName={'id_parent_lokasi'}
                  isClearable={false}
                  options={optionsUnitPembangkit}
                />
                {/* <SelectAsyncDynamic
                  fieldName='id_parent_lokasi'
                  pathServiceName='master.jaringan.ref_lokasi'
                  labelField='nama_lokasi'
                  valueField='id_ref_lokasi'
                  placeholder='SEMUA'
                  isClearable={true}
                  errors={errors}
                  control={control}
                  required={true}
                  queryParams={{
                    page: -1,
                    limit: 10,
                    sort_by: 'nama_lokasi',
                    [parentFiled]: (JENIS_LOKASI() as any)['unit_pembangkit'],
                  }}
                /> */}
                <Form.Control.Feedback type='invalid'>
                  {errors?.id_parent_lokasi?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className='mb-2'>
                <Form.Label>Pembangkit</Form.Label>
                <SelectAsyncDynamic
                  fieldName='id_pembangkit'
                  pathServiceName='master.jaringan.ref_lokasi'
                  labelField='nama_lokasi'
                  valueField='id_ref_lokasi'
                  placeholder='SEMUA'
                  isClearable={true}
                  errors={errors}
                  control={control}
                  watchParent={watchInduk}
                  queryParams={{
                    page: -1,
                    limit: 10,
                    sort_by: 'nama_lokasi',
                    id_ref_jenis_lokasi: (JENIS_LOKASI() as any)['pembangkit'],
                    id_parent_lokasi: watchInduk,
                  }}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.id_pembangkit?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={2} className='mt-2'>
              <FilterActionButton
                className='justify-content-start'
                loading={loading}
              // onClickReset={() => onSubmitForm(null)}
              />
            </Col>
          </Row>
        </Form>
      </FiltersForm>
    </>
  );
}
