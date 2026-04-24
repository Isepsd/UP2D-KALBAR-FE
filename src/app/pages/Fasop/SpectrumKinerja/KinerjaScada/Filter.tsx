import React, { useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';

import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import FiltersForm from '@app/modules/Filters/FilterForm';
import FilterActionButton from '@app/modules/Filters/FilterActionButton';
import InputDate from '@app/components/Date/InputDate';
import moment from 'moment';
import SelectFormStatic from '@app/modules/SelectForm/SelectFormStatic';
import { FASOP_KINERJA } from '@app/configs/select-options/fasop-select';
import SelectAsyncDynamic from '@app/modules/SelectForm/SelectAsyncDynamic';
import { JENIS_LOKASI } from '@app/configs/jenis-lokasi.config';

export default function Filter({ optionsScada }: any) {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();
  const options: any = FASOP_KINERJA();

  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    harian: Yup.string().nullable(),
    bulanan: Yup.string().nullable(),
    path1text: Yup.string().nullable(),
    path2text: Yup.string().nullable(),
    path3text: Yup.string().nullable(),
    path4text: Yup.string().nullable(),
    path5text: Yup.string().nullable(),
    id_pointtype: Yup.string().nullable(),
    id_unit: Yup.string().nullable(),
    kinerja: Yup.string().nullable(),
    id_induk_pointtype: Yup.string().typeError('Data wajib diisi').nullable(),
    jenispoint: Yup.string().typeError('Data wajib diisi').nullable(),
  });

  const [formModel] = useState<any>({
    harian: moment().subtract(1, 'days').format('YYYY-MM-DD'), // Change made here
    bulanan: undefined,
    kinerja: "HARIAN",
    jenispoint: null,
    id_induk_pointtype: null,
    path1text: "",
    path2text: "",
    path3text: "",
    path4text: "",
    path5text: "",
    id_pointtype: null,
    id_unit: null
  });

  const {
    handleSubmit,
    setValue,
    setError,
    register,
    formState,
    control
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: formModel,
  });
  const { errors }: any = formState || {};
   const idPointWatch = useWatch({ control, name: 'id_induk_pointtype' });
  /** SUBMIT FORM HANDLING */
  const onSubmitForm = (data: any) => {
    let params = data;

    
    if (watchKinerja === "BULANAN") {
      params.thn_bln = moment(params.bulanan, 'YYYY-MM').format('YYYY-MM');
      // Remove 'datum' if it exists
      delete params.datum;
    } else if (watchKinerja === "HARIAN") {
      params.datum = params.harian
      // Remove 'thn_bln' if it exists
      delete params.thn_bln;
      delete params.bulanan;
    }
  
  
    let result = optionsScada?.filter((obj: any) => {
      return obj.value === idPointWatch;
    });
    data.jenispoint = result[0]?.jenis
    
    // setDataParams(params);
    setDataParams(() => {
      return { ...params }
    });
  };

  const watchKinerja = useWatch({ control, name: 'kinerja' });

  useEffect(() => {
    if (watchKinerja === "BULANAN") {
      // Update params for BULANAN
      const updatedParams = {
        ...formModel,
        thn_bln: moment().format('YYYY-MM'),
        bulanan: moment().format('YYYY-MM'),
      };
      delete updatedParams.datum;
      delete updatedParams.harian;
      setDataParams(updatedParams);
    } else if (watchKinerja === "HARIAN") {
      // Update params for HARIAN
      const updatedParams = {
        ...formModel,
        datum: moment().subtract(1, 'days').format('YYYY-MM-DD'),
        harian: moment().subtract(1, 'days').format('YYYY-MM-DD'),
      };
      delete updatedParams.thn_bln;
      delete updatedParams.bulanan;
      
      setDataParams(updatedParams);
    }
  }, [watchKinerja]);

  useEffect(() => {
    if (watchKinerja === "HARIAN") {
      setValue("bulanan", null);
      setValue("harian", moment().subtract(1, 'days').format('YYYY-MM-DD'));
    } else {
      setValue("harian", null);
      setValue("bulanan", moment().format('YYYY-MM'));
    }
  }, [watchKinerja]);


  

  

  // Additional useEffect to set default value for harian
  useEffect(() => {
    if (watchKinerja === "HARIAN") {
      setValue("harian", moment().subtract(1, 'days').format('YYYY-MM-DD'));
    }
  }, []); // Empty dependency array, so it runs only once on component mount

  return (
    <>
      <FiltersForm
        setError={setError}
        setValue={setValue}
        dataParams={dataParams}
        onLoading={setLoading}
        fields={{
          harian: moment().subtract(1, 'days').format('YYYY-MM-DD'), // Change made here
          bulanan: undefined,
          thn_bln: moment().format('YYYY-MM'),
          datum: moment().subtract(1, 'days').format('YYYY-MM-DD'),
          path1text: "",
          path2text: "",
          path3text: "",
          path4text: "",
          path5text: "",
          id_induk_pointtype: null, 
          jenispoint: null,
          id_pointtype: null,
          id_unit: null,
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
                  fieldName="kinerja"
                  placeholder='BULANAN'
                  options={options}
                  isClearable={false}
                />
              </Form.Group>
            </Col>
            <Col md={2}>
              {watchKinerja === "HARIAN" &&
                <Form.Group className='mb-2'>
                  <Form.Label>Tanggal</Form.Label>
                  <InputDate errors={errors} register={register} fieldName="harian" />
                </Form.Group>
              }
              {watchKinerja === "BULANAN" &&
                <Form.Group className='mb-2'>
                  <Form.Label>Bulan</Form.Label>
                  <InputDate errors={errors} register={register} type="month" fieldName="bulanan" />
                </Form.Group>
              }
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
                  queryParams={{ id_ref_jenis_lokasi_in: `${JENIS_LOKASI().up3}`, showrc: true }}
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
            
            <Col md={2} className="">
              <Form.Group className='mb-2'>
                <Form.Label>Lokasi (B1)</Form.Label>
                <SelectAsyncDynamic
                  fieldName='path1text'
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
            <Col md={2} className=''>
              <Form.Group className='mb-2'>
                <Form.Label>B2 (Station)</Form.Label>
                <SelectAsyncDynamic
                  fieldName='path2text'
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
                  fieldName='path3text'
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
                  fieldName='path4text'
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
            <Col md={2} className="">
              <Form.Group className='mb-2'>
                <Form.Label>Info</Form.Label>
                <SelectAsyncDynamic
                  fieldName='path5text'
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
                    path: 'path5text',
                  }}
                />
              </Form.Group>
            </Col>
            <Col md={1} className="mt-2">
              <FilterActionButton className="justify-content-start" loading={loading} />
            </Col>
          </Row>
        </Form>
      </FiltersForm>
    </>
  );
}
