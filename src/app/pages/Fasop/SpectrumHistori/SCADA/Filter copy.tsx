import React, { useEffect, useState } from 'react';
import { Col, Form, FormControl, InputGroup, Row } from 'react-bootstrap';

import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import moment from 'moment';
import FiltersForm from '@app/modules/Filters/FilterForm';
import FilterActionButton from '@app/modules/Filters/FilterActionButton';
import SelectFormStatic from '@app/modules/SelectForm/SelectFormStatic';
import SelectAsyncDynamic from '@app/modules/SelectForm/SelectAsyncDynamic';
import { JENIS_LOKASI } from '@app/configs/jenis-lokasi.config';


const KET_OPTIONS: any = [
  { label: 'VALID', value: 'VALID' },
  { label: 'INVALID', value: 'INVALID' }
]
export default function Filter({ optionsScada }: any) {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();
  // const [optionsTimes, setOptionsTimes] = useState<any>([]);
  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    tanggal_mulai: Yup.string().nullable(),
    tanggal_akhir: Yup.string().nullable(),
    path1: Yup.string().nullable(),
    path2: Yup.string().nullable(),
    path3: Yup.string().nullable(),
    path4: Yup.string().nullable(),
    path5: Yup.string().nullable(),
    id_unit: Yup.string().nullable(),
    id_pointtype: Yup.string().nullable(),
    kesimpulan:Yup.string().nullable(),
    id_induk_pointtype: Yup.string().typeError('Data wajib diisi').nullable(),
    jenispoint: Yup.string().typeError('Data wajib diisi').nullable(),
  });

  const [formModel] = useState<any>({
    tanggal_mulai: moment().subtract(1, 'day').format('YYYY-MM-DD'),
    tanggal_akhir: moment().format('YYYY-MM-DD'),
    path1: '',
    path2: '',
    path3: '',
    path4: '',
    path5: '',
    kesimpulan: '',
    jenispoint: null,
    id_pointtype: null,
    id_induk_pointtype: null,
    id_unit: null
  });

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

  const idPointWatch = useWatch({ control, name: 'id_induk_pointtype' });
  /** SUBMIT FORM HANDLING */
  const onSubmitForm = (data: any) => {
    let result = optionsScada?.filter((obj: any) => {
      return obj.value === idPointWatch;
    });
    data.jenispoint = result[0]?.jenis
    setDataParams(data);
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
        path1: '',
        path2: '',
        path3: '',
        path4: '',
        path5: '',
        id_pointtype: null,
        id_unit: null,
      
        kesimpulan: '', }}
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
            <Col md={2} className=''>
            <Form.Group  className='mb-2'>
                <Form.Label>Unit</Form.Label>
                <SelectAsyncDynamic
                  fieldName='id_unit'
                  pathServiceName='master.jaringan.ref_lokasi'
                  labelField='nama_lokasi'
                  valueField='id_ref_lokasi'
                  placeholder='Pilih...'
                  isClearable={true}
                  errors={errors}
                  control={control}
                  isSearchable={false}
                  queryParams={{ id_ref_jenis_lokasi_in: `${JENIS_LOKASI().ultg}`, showrc: true }}
                />
              </Form.Group>
              </Col>
            <Col md={2}>
              <Form.Group className='mb-2'>
                <Form.Label>Peralatan SCADA</Form.Label>
                <SelectFormStatic
                  control={control}
                  errors={errors}
                  fieldName="id_induk_pointtype"
                  placeholder='Pilih ...'
                  options={optionsScada}

                />
              </Form.Group>
            </Col>
            <Col md={2} className="">
      <Form.Group className='mb-2'>
        <Form.Label>Jenis Point</Form.Label>
        <SelectAsyncDynamic
          fieldName='id_pointtype'
          pathServiceName='master.fasop.point_type_get'
          labelField='name'
          valueField='id_pointtype'
          placeholder='Pilih...'
          isClearable={true}
          errors={errors}
          control={control}
          queryParams={{
            page: 1,
            limit: 10,
            is_induk:'ANAK',
            sort_by: '-id_pointtype',
          }}
        />
      </Form.Group>
    </Col>
            
            <Col md={2} className=''>
              <Form.Group className='mb-2'>
                <Form.Label>Lokasi (B1)</Form.Label>
                <SelectAsyncDynamic
                  fieldName='path1'
                  pathServiceName='fasop.laporan_scada.pathtext'
                  labelField='path_text'
                  valueField='path_text'
                  placeholder='Pilih...'
                  isClearable={true}
                  errors={errors}
                  control={control}
                  queryParams={{
                    page: -1,
                    limit: 50,
                    path: 'path1',
                  }}
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
            <Col md={2} className=''>
              <Form.Group className='mb-2'>
                <Form.Label>Element</Form.Label>
                <SelectAsyncDynamic
                  fieldName='path4'
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
                    path: 'path4',
                  }}
                />
              </Form.Group>
            </Col>
            <Col md={2} className=''>
              <Form.Group className='mb-2'>
                <Form.Label>Info</Form.Label>
                <SelectAsyncDynamic
                  fieldName='path5'
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
                    path: 'path5',
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
            <Col md={3} className="mt-2">
              <FilterActionButton className="justify-content-start" loading={loading} />
            </Col>
          </Row>
        </Form>
      </FiltersForm>
    </>
  );
}
