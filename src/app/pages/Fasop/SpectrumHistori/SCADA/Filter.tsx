import React, { useEffect, useState } from 'react';
import { Col, Form, FormControl, InputGroup, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import FiltersForm from '@app/modules/Filters/FilterForm';
import FilterActionButton from '@app/modules/Filters/FilterActionButton';
import moment from 'moment';
import SelectFormStatic from '@app/modules/SelectForm/SelectFormStatic';
import SelectAsyncDynamic from '@app/modules/SelectForm/SelectAsyncDynamic';


const KET_OPTIONS: any = [
  { label: 'VALID', value: 'VALID' },
  { label: 'INVALID', value: 'INVALID' }
]



function Filter({
  optionsScada
}: any) {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();

  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    tanggal_mulai: Yup.string().nullable(),
    tanggal_akhir: Yup.string().nullable(),
    path2: Yup.string().nullable(),
    path3: Yup.string().nullable(),
    kesimpulan:Yup.string().nullable(),
    id_induk_pointtype: Yup.string().typeError('Data wajib diisi').nullable(),
    jenispoint: Yup.string().typeError('Data wajib diisi').nullable(),
  });


  const [formModel] = useState<any>({
    tanggal_mulai: moment().subtract(1, 'day').format('YYYY-MM-DD'),
    tanggal_akhir: moment().format('YYYY-MM-DD'),
    path2: '',
    path3: '',
    kesimpulan: '',
    jenispoint: null,
    id_induk_pointtype: null
  });

  const {
    handleSubmit,
    register,
    setValue,
    setError,
    control,
    formState
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: formModel,
  });
  const { errors }: any = formState || {};
  // const watchDatum1After = useWatch({ control, name: 'datum_1_after' });
  // const watchDatum2Before = useWatch({ control, name: 'datum_1_before' });

  /** SUBMIT FORM HANDLING */
  const onSubmitForm = (data: any) => {
    // setDataParams(data);
    setDataParams(() => {
      return { ...data }
    });
  };

  useEffect(() => {
    setDataParams({
      ...formModel,
      id_induk_pointtype: optionsScada[0]?.value,
      jenispoint: optionsScada[0]?.jenis
      // time: moment().subtract(1, 'hour').format('HH:[00]'),
    });
    setValue('id_induk_pointtype', optionsScada[0]?.value)
    setValue('jenispoint', optionsScada[0]?.jenis)
  }, [optionsScada]);

  return (
    <>
      <FiltersForm
        setError={setError}
        setValue={setValue}
        dataParams={dataParams}
        onLoading={setLoading}
        fields={{
          tanggal_akhir: moment().format('YYYY-MM-DD'),
          tanggal_mulai: moment().subtract(1, 'day').format('YYYY-MM-DD'),
          id_induk_pointtype: null, jenispoint: null,
          path2: '',
          path3: '',
          kesimpulan: '',
        }}
        overrideType={{ datum_1_before: 'date', datum_1_after: 'date' }}
      >
        <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
          <Row>
            <Col md={4} className='mb-3'>
              <Form.Group>
                <Form.Label>Range Tanggal</Form.Label>
                <InputGroup>
                  <FormControl
                    {...register('tanggal_mulai')}
                    type='date'
                    // min={moment(watchDatum2Before)
                    //   .subtract(1, 'month')
                    //   .format('YYYY-MM-DD')}
                    // max={watchDatum2Before}
                  />
                  <InputGroup.Text>
                    <i className='fa-solid fa-arrow-right'></i>
                  </InputGroup.Text>
                  <FormControl
                    {...register('tanggal_akhir')}
                    type='date'
                    // min={watchDatum1After}
                    // max={moment().format('YYYY-MM-DD')}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Group className='mb-2'>
                <Form.Label>Peralatan SCADA</Form.Label>
                <SelectFormStatic
                  control={control}
                  errors={errors}
                  fieldName='id_induk_pointtype'
                  placeholder='Pilih ...'
                  options={optionsScada}
                />
              </Form.Group>
            </Col>
            <Col md={2} className=''>
              <Form.Group className='mb-2'>
                <Form.Label>B2 (Station)</Form.Label>
                <SelectAsyncDynamic
                  fieldName='path2'
                  pathServiceName='fasop.laporan_scada.pathtext'
                  labelField='path_text'
                  valueField='path_text'
                  placeholder='Pilih...'
                  isClearable={true}
                  errors={errors}
                  control={control}
                  queryParams={{
                    page: -1,
                    limit: -1,
                    path: 'path2',
                  }}
                />
              </Form.Group>
            </Col>
            <Col md={2} className=''>
              <Form.Group className='mb-2'>
                <Form.Label>Bay (B3)</Form.Label>
                <SelectAsyncDynamic
                  fieldName='path3'
                  pathServiceName='fasop.laporan_scada.pathtext'
                  labelField='path_text'
                  valueField='path_text'
                  placeholder='Pilih...'
                  isClearable={true}
                  errors={errors}
                  control={control}
                  queryParams={{
                    page: -1,
                    limit: -1,
                    path: 'path3',
                  }}
                />
              </Form.Group>
            </Col>
            <Col md={2}>
                <Form.Group className='mb-3'>
                  <Form.Label>Keterangan</Form.Label>
                  <SelectFormStatic
                    control={control}
                    errors={errors}
                    fieldName={'kesimpulan'}
                    options={KET_OPTIONS}
                  ></SelectFormStatic>
                  <Form.Control.Feedback type='invalid'>
                    {errors?.kesimpulan?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            
            <Col md={1}>
              <Form.Label></Form.Label>
              <FilterActionButton
                textSubmit='Filter'
                loading={loading}
                top='mt-2'
              />
            </Col>
          </Row>
        </Form>
      </FiltersForm>
    </>
  );
}

export default Filter;
