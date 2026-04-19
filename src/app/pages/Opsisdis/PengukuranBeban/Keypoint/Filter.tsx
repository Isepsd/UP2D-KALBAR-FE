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
// import { timeFormSelect } from '@app/helper/time.helper';
import { JENIS_LOKASI } from '@app/configs/jenis-lokasi.config';

import { generatingData } from '@app/store/reducers/app';
import { useDispatch } from 'react-redux';
import SelectFormStatic from '@app/modules/SelectForm/SelectFormStatic';

interface IFilter {
  setAdd: any
  optionsTimes?: any[any]
  optionsGarduInduk: any[any]
}

export default function Filter(
  {
    setAdd,
    optionsTimes,
    optionsGarduInduk
  }: IFilter) {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>({
    date: moment().format("YYYY-MM-DD"),
    id_parent_lokasi: optionsGarduInduk[0]?.value,
    // time: optionsTimes[0]?.value
  });
  const dispatch = useDispatch();
  // const [optionsTimes, setOptionsTimes] = useState<any>([]);
  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    date:Yup.string().nullable(),
    id_parent_lokasi: Yup.string().nullable(),
    id_keypoint: Yup.string().nullable(),
    nama_lokasi: Yup.string().nullable(),
    time: Yup.string().nullable(),
  });

  const [formModel] = useState<any>({
    date: moment().format("YYYY-MM-DD"),
    id_parent_lokasi: optionsGarduInduk[0]?.value,
    time: undefined,
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
  const watchSumber = useWatch({ control, name: 'id_parent_lokasi' });
  
  const watchLokasi = useWatch({ control, name: 'id_keypoint' });
  const watchDate = useWatch({ control, name: 'date' });


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
    // setValue("id_parent_lokasi", null)
    setValue("id_keypoint", null)
    dispatch(generatingData(null))
    setAdd(false)
  }, [])

  useEffect(() => {
    dispatch(generatingData(null))
    setAdd(false)
  }, [watchLokasi, watchDate])

  return (
    <>
      <FiltersForm
        setError={setError}
        setValue={setValue}
        dataParams={dataParams}
        onLoading={setLoading}
        fields={{
          date: moment().format("YYYY-MM-DD"),
          id_parent_lokasi: optionsGarduInduk[0]?.value,
          id_keypoint: null,
          time: undefined,
          nama_lokasi: Yup.string().nullable(),
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
              <Form.Group className='mb-2'>
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
            <Col md={2}>
              <Form.Group className='mb-2'>
                <Form.Label>Sumber (GI/Penyulang)</Form.Label>
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
                    id_ref_jenis_lokasi_in: `${JENIS_LOKASI().gardu_induk},${JENIS_LOKASI().penyulang}`
                  }}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.id_parent_lokasi?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Group className='mb-2'>
                <Form.Label>Keypoint</Form.Label>
                <SelectAsyncDynamic
                  fieldName='id_keypoint'
                  pathServiceName='master.jaringan.ref_lokasi'
                  labelField='nama_lokasi'
                  valueField='id_ref_lokasi'
                  placeholder='SEMUA'
                  isClearable={true}
                  errors={errors}
                  control={control}
                  // defaultValue={''}
                  watchParent={watchSumber}
                  queryParams={{
                    page: -1,
                    limit: -1,
                    sort_by: 'nama_lokasi',
                    id_ref_jenis_lokasi: JENIS_LOKASI().keypoint,
                    id_parent_lokasi: watchSumber
                   
                    // fungsi_lokasi: 'GH'
                  }}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.id_keypoint?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={2} className="mt-2">
              <FilterActionButton className="justify-content-start" loading={loading} />
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
