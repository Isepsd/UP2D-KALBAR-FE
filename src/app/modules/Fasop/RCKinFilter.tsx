import React, { useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';

import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import FiltersForm from '@app/modules/Filters/FilterForm';
import FilterActionButton from '@app/modules/Filters/FilterActionButton';
import InputDate from '@app/components/Date/InputDate';
import moment from 'moment';
// import { timeFormSelect } from '@app/helper/time.helper';
import SelectFormStatic from '@app/modules/SelectForm/SelectFormStatic';
import { FASOP_KINERJA } from '@app/configs/select-options/fasop-select';
import SelectAsyncDynamic from '@app/modules/SelectForm/SelectAsyncDynamic';
import { JENIS_LOKASI } from '@app/configs/jenis-lokasi.config';
import { API_PATH } from '@app/services/_path.service';

export default function RCKinFilter() {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();
  const options: any = FASOP_KINERJA();

  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    id_induk_pointtype: Yup.string().typeError('Data wajib diisi').nullable(),
    jenispoint: Yup.string().typeError('Data wajib diisi').nullable(),
    harian: Yup.string().nullable(),
    bulanan: Yup.string().nullable(),
    path1: Yup.string().nullable(),
    path2: Yup.string().nullable(),
    path3: Yup.string().nullable(),
    path4: Yup.string().nullable(),
    kinerja: Yup.string().nullable(),
    id_unit: Yup.string().nullable(),
  });

  const [formModel] = useState<any>({
    jenispoint: null,
    id_induk_pointtype: null,
    id_unit: null,
    harian: moment().format('YYYY-MM-DD'),
    bulanan: undefined,
    kinerja: 'HARIAN',
    path1: '',
    path2: '',
    path3: '',
    path4: '',
  });

  const { handleSubmit, setValue, setError, register, formState, control } =
    useForm({
      resolver: yupResolver(validationSchema),
      defaultValues: formModel,
    });
  const { errors }: any = formState || {};

  const watchKinerja = useWatch({ control, name: 'kinerja' });

  
  useEffect(() => {
    if (watchKinerja === "BULANAN") {
      // Update params for BULANAN
      const updatedParams = {
        ...formModel,
        bulanan: moment().format('YYYY-MM'),
        tanggal_akhir: moment().endOf('month').format('YYYY-MM-DD'), // Set to the first day of the month
        tanggal_mulai: moment().startOf('month').format('YYYY-MM-DD'), // Set to the first day of the previous month
      };
      delete updatedParams.harian;
      setDataParams(updatedParams);
    } else if (watchKinerja === "HARIAN") {
      // Update params for HARIAN
      const updatedParams = {
        ...formModel,
        harian: moment().subtract(1, 'days').format('YYYY-MM-DD'),
        tanggal_akhir:  moment().format('YYYY-MM-DD'),
        tanggal_mulai:  moment().subtract(1, 'days').format('YYYY-MM-DD'),
      };
      delete updatedParams.bulanan;
      setDataParams(updatedParams);
    }
  }, [watchKinerja]);
  /** SUBMIT FORM HANDLING */
  const onSubmitForm = (data: any) => {  


    let params = data;


    if (watchKinerja === "BULANAN") {
      const bulananStartDate = moment(params.bulanan, 'YYYY-MM').startOf('month');
      const bulananEndDate = moment(params.bulanan, 'YYYY-MM').endOf('month');
      params.tanggal_akhir = bulananEndDate.format('YYYY-MM-DD');
      params.tanggal_mulai = bulananStartDate.format('YYYY-MM-DD');
      // Remove 'harian' if it exists
      delete params.harian;
    } else if (watchKinerja === "HARIAN") {
      params. tanggal_akhir=  moment(params.harian).format('YYYY-MM-DD'),
      params.  tanggal_mulai=  moment(params.harian).subtract(1, 'days').format('YYYY-MM-DD'),
      // Remove 'bulanan' if it exists
      delete params.bulanan;
      // delete params.tanggal_mulai;
    }
    // setDataParams(params);
    setDataParams(() => {
      return { ...params }
    });
  };

  useEffect(() => {
    if (watchKinerja === 'HARIAN') {
      setValue('bulanan', null);
      setValue('harian', moment().format('YYYY-MM-DD'));
    } else {
      setValue('harian', null);
      setValue('bulanan', moment().format('YYYY-MM'));
    }
  }, [watchKinerja]);


  // console.log('errors', errors);
  return (
    <>
      <FiltersForm
        setError={setError}
        setValue={setValue}
        dataParams={dataParams}
        onLoading={setLoading}
        fields={{
          harian: moment().format('YYYY-MM-DD'),
          bulanan: undefined,
          tanggal_akhir: moment().format('YYYY-MM-DD'),
          tanggal_mulai: moment().subtract(1, 'day').format('YYYY-MM-DD'),
          path1: '',
          path2: '',
          path3: '',
          path4: '',
          id_induk_pointtype: null,
          jenispoint: null,
          id_unit:null,
        }}
      >
        <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
          <Row>
            <Col md={2}>
              <Form.Group className='mb-2'>
                <Form.Label>Kinerja SCADA</Form.Label>
                <SelectFormStatic
                  control={control}
                  errors={errors}
                  fieldName='kinerja'
                  placeholder='BULANAN'
                  options={options}
                  isClearable={false}
                />
              </Form.Group>
            </Col>
            <Col md={2}>
              {watchKinerja === 'HARIAN' && (
                <Form.Group className='mb-2'>
                  <Form.Label>Tanggal</Form.Label>
                  <InputDate
                    errors={errors}
                    register={register}
                    fieldName='harian'
                  />
                </Form.Group>
              )}
              {watchKinerja === 'BULANAN' && (
                <Form.Group className='mb-2'>
                  <Form.Label>Bulan</Form.Label>
                  <InputDate
                    errors={errors}
                    register={register}
                    type='month'
                    fieldName='bulanan'
                  />
                </Form.Group>
              )}
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
                    limit: 50,
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
                    limit: 50,
                    path: 'path3',
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
                    path: 'path4',
                  }}
                />
              </Form.Group>
            </Col>
            <Col md={2} className='mt-2'>
              <FilterActionButton
                className='justify-content-start'
                loading={loading}
              />
            </Col>
          </Row>
        </Form>
      </FiltersForm>
    </>
  );
}
