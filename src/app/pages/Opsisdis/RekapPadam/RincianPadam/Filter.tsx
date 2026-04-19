import React, { useState } from 'react';
import { Col, Form, FormControl, Row } from 'react-bootstrap';

import { Controller, useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import FiltersForm from '@app/modules/Filters/FilterForm';
import SelectAsyncDynamic from '@app/modules/SelectForm/SelectAsyncDynamic';
import FilterActionButton from '@app/modules/Filters/FilterActionButton';
import Select from 'react-select';
import { ReactSelectStyle } from '@app/configs/react-select.config';
import { SELECT_JENIS_PADAM, SELECT_ZONA } from '@app/configs/select-options.config';
import moment from 'moment';

export default function Filter({ onFilter }: any) {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();
  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    ufr: Yup.string(),
    // .typeError('Tanggal wajib diisi').required('Tanggal wajib diisi'),   
  });

  const [formModel] = useState<any>({
    date: moment().format('YYYY-MM-DD'),
    time_start: moment().set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).format('HH:mm:ss'),
    time_end: moment().set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).format('HH:mm:ss'),
  });
  const optionDataPadam: any = SELECT_JENIS_PADAM()
  const optionDataZonaListrik: any = SELECT_ZONA()
  const {
    register,
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
  const watchTimeStart = useWatch({ control, name: 'time_start' });
  const watchTimeEnd = useWatch({ control, name: 'time_end' });
  const watchPenyebab = useWatch({ control, name: 'jenis_padam' });

  /** SUBMIT FORM HANDLING */
  const onSubmitForm = (data: any) => {
    onFilter(data)
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
            <Col md={4}>
              <Form.Group className='mt-3' controlId='general_mode'>
                <Form.Label>Tanggal</Form.Label>
                <FormControl
                  {...register('date')}
                  type='date'
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className='mt-3' controlId='general_mode'>
                <Form.Label>Waktu Mulai </Form.Label>
                <FormControl
                  {...register('time_start')}
                  type='time'
                  max={watchTimeEnd}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className='mt-3' controlId='general_mode'>
                <Form.Label>Waktu Selesai</Form.Label>
                <FormControl
                  {...register('time_end')}
                  type='time'
                  min={watchTimeStart}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className='mt-3' controlId='general_mode'>
                <Form.Label>Jenis Padam</Form.Label>
                <Controller
                  control={control}
                  defaultValue={''}
                  name='jenis_padam'
                  rules={{
                    required: false,
                  }}
                  render={({ field: { onChange, value, ref } }) => (
                    <Select
                      placeholder='Pilih Jenis Padam'
                      styles={ReactSelectStyle}
                      classNamePrefix={`${errors.ufr ? 'is-invalid' : ''
                        }`}
                      inputRef={ref}
                      value={optionDataPadam?.filter(
                        (c: any) => c.value == value
                      )}
                      onChange={(val: any) => onChange(val?.value)}
                      options={optionDataPadam}
                      isClearable={true}
                    />
                  )}
                />
                {errors.ufr && (
                  <div className='invalid-feedback d-block'>
                    {errors.ufr?.message}
                  </div>
                )}
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className='mt-3' controlId='general_mode'>
                <Form.Label>Indikasi </Form.Label>
                <SelectAsyncDynamic
                  required={true}
                  fieldName={'id_indikasi'}
                  pathServiceName={
                    'opsisdis.rekap_padam.ref_ep_indikasi'
                  }
                  labelField={'nama'}
                  valueField={'id_ref_ep_indikasi'}
                  placeholder={'Pilih...'}
                  isClearable={true}
                  errors={errors}
                  control={control}
                  queryParams={{ page: -1, jenis: watchPenyebab }}
                  watchParent={watchPenyebab}
                />
                {errors.ufr && (
                  <div className='invalid-feedback d-block'>
                    {errors.ufr?.message}
                  </div>
                )}
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className='mt-3' controlId='general_mode'>
                <Form.Label>Zona Listrik</Form.Label>
                <Controller
                  control={control}
                  defaultValue={''}
                  name='ufr'
                  rules={{
                    required: false,
                  }}
                  render={({ field: { onChange, value, ref } }) => (
                    <Select
                      placeholder='Pilih Zona Listrik'
                      styles={ReactSelectStyle}
                      classNamePrefix={`${errors.ufr ? 'is-invalid' : ''
                        }`}
                      inputRef={ref}
                      value={optionDataZonaListrik?.filter(
                        (c: any) => c.value == value
                      )}
                      onChange={(val: any) => onChange(val?.value)}
                      options={optionDataZonaListrik}
                      isClearable={true}
                    />
                  )}
                />
                {errors.ufr && (
                  <div className='invalid-feedback d-block'>
                    {errors.ufr?.message}
                  </div>
                )}
              </Form.Group>
            </Col>
          </Row>
          <FilterActionButton loading={loading} onClickReset={() => onSubmitForm(null)}></FilterActionButton>
        </Form>
      </FiltersForm>
    </>
  );
}
