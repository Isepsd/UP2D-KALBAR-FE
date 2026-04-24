import React, { useState } from 'react';
import { Col, Form, FormControl, InputGroup, Row } from 'react-bootstrap';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import FiltersForm from '@app/modules/Filters/FilterForm';
import FilterActionButton from '@app/modules/Filters/FilterActionButton';
import moment from 'moment';
import SelectAsyncDynamic from '../SelectForm/SelectAsyncDynamic';
import { JENIS_LOKASI } from '@app/configs/jenis-lokasi.config';
import { API_PATH } from '@app/services/_path.service';

function RCFilter() {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();

  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    datum_1_after: Yup.string().nullable(),
    datum_1_before: Yup.string().nullable(),
    id_unit: Yup.string().nullable(),

  });

  const [formModel] = useState<any>({
    tanggal_mulai: moment().subtract(1, 'day').format('YYYY-MM-DD'),
    tanggal_akhir: moment().format('YYYY-MM-DD'),
    path1: "",
    path2: "",
    path3: "",
    path4: "",
    id_unit: null,
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

  const watchDateMulai = useWatch({ control, name: 'tanggal_mulai' });
  const watchDateAkhir = useWatch({ control, name: 'tanggal_akhir' });
  const { errors }: any = formState || {};
  /** SUBMIT FORM HANDLING */
  const onSubmitForm = (data: any) => {
    // setDataParams(data);
    setDataParams(() => {
      return { ...data }
    });

  };
  // console.log("errors", errors);
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
          path1: "",
          path2: "",
          path3: "",
          path4: "",
          id_unit: null,
        }}
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
                    max={watchDateAkhir}
                  />
                  <InputGroup.Text>
                    <i className='fa-solid fa-arrow-right'></i>
                  </InputGroup.Text>
                  <FormControl
                    {...register('tanggal_akhir')}
                    type='date'
                    min={watchDateMulai}
                    max={moment().format('YYYY-MM-DD')}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col md={2} className=''>
            <Form.Group  className='mb-2'>
                <Form.Label>Unit</Form.Label>
                <SelectAsyncDynamic
                  fieldName='id_unit'
                  pathServiceName=''
                  path={API_PATH().master.jaringan.ref_lokasi}
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
            <Col md={2} className="">
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
                    limit: -1,
                    path: 'path1text',
                  }}
                />
              </Form.Group>

            </Col>
            <Col md={2} className="">
              <Form.Group className='mb-2'>
                <Form.Label>Tegangan (B2)</Form.Label>
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
                    path: 'path2text',
                  }}
                />
              </Form.Group>

            </Col>
            <Col md={2} className="">
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
                    path: 'path3text',
                  }}
                />
              </Form.Group>
            </Col>
              <Col md={2} className="">
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
                    path: 'path4text',
                  }}
                />
              </Form.Group>
            </Col>

            <Col>
              <Form.Label></Form.Label>
              <FilterActionButton
                textSubmit='Filter'
                loading={loading}
                top="mt-2"
              />
            </Col>
          </Row>

        </Form>
      </FiltersForm>
    </>
  );
}

export default RCFilter;
