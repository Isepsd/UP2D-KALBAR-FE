import React, { useState } from 'react';
import { Col, Form, Row  } from 'react-bootstrap';
import InputDate from '@app/components/Date/InputDate';
import { useForm,useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import SelectAsyncDynamicNew from '@app/modules/SelectForm/SelectAsyncDynamic';
import FiltersForm from '@app/modules/Filters/FilterForm';
import FilterActionButton from '@app/modules/Filters/FilterActionButton';

import moment from 'moment';
// import { timeFormSelect } from '@app/helper/time.helper';
import SelectFormStaticNew from '@app/modules/SelectForm/SelectFormStaticNew';

import SelectAsyncDynamic from '@app/modules/SelectForm/SelectAsyncDynamic';
// import { JENIS_LOKASI } from '@app/configs/jenis-lokasi.config';
// import { API_PATH } from '@app/services/_path.service';

export default function RCKinFilter({onFilterChange}:any) {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();

  const OPTION_BULAN = [
    { label: 'Januari', value: '01' },
    { label: 'Februari', value: '02' },
    { label: 'Maret', value: '03' },
    { label: 'April', value: '04' },
    { label: 'Mei', value: '05' },
    { label: 'Juni', value: '06' },
    { label: 'Juli', value: '07' },
    { label: 'Agustus', value: '08' },
    { label: 'September', value: '09' },
    { label: 'Oktober', value: '10' },
    { label: 'November', value: '11' },
    { label: 'Desember', value: '12' },
  ];
  
  const OPTION_KINERJA = [
    { label: 'SCADA', value: 'SCADA' },
    { label: 'RC', value: 'RC' },
    { label: 'TRIP', value: 'TRIP' },
   
  ];
  

  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    nama_induk_pointtype: Yup.string().typeError('Data wajib diisi').nullable(),
    jenispoint: Yup.string().typeError('Data wajib diisi').nullable(),
    bulan: Yup.string().nullable(),
    tahun: Yup.string().nullable(),
    nama_pointtype: Yup.string().nullable(),
    id_unit: Yup.string().nullable(),
  });

  const [formModel] = useState<any>({
    jenispoint: null,
    nama_induk_pointtype: null,
    id_unit: null,
    bulan: moment().format("MM") ,
    tahun: moment().format("YYYY") ,
    nama_pointtype: '',
    kinerja_scada: 'SCADA',
  });

  const { handleSubmit, setValue, setError, register, formState, control } =
    useForm({
      resolver: yupResolver(validationSchema),
      defaultValues: formModel,
    });
  const { errors }: any = formState || {};

  const idPointWatch = useWatch({ control, name: 'nama_induk_pointtype' });
  const OPTIONKINERJA = useWatch({ control, name: 'kinerja_scada' });
  const watchPath1 = useWatch({ control, name: 'path1' });
  const watchPath2 = useWatch({ control, name: 'path2' });
  // const watchPath3 = useWatch({ control, name: 'path3' });
  // const watchPath4 = useWatch({ control, name: 'path4' });


 
  /** SUBMIT FORM HANDLING */
  const onSubmitForm = (data: any) => {
    let params = { ...data };
  
    // Jika bulan di-unselect, set parameter untuk semua bulan
    if (params.bulan === '') {
      // Kirim parameter untuk semua bulan atau hilangkan bulan dari params
      delete params.bulan; // Atau set params.bulan = null jika itu lebih sesuai dengan backend Anda
    }
  
    setDataParams(() => params);
  
    // Kirim parameter ke parent component
    onFilterChange(params);
  };
  

  // console.log('errors', errors);
  return (
    <>
      <FiltersForm
        setError={setError}
        setValue={setValue}
        dataParams={dataParams}
        onLoading={setLoading}
        fields={{
      
          // datum_range_after: moment().format('YYYY-MM-DD'),
          // datum_range_before: moment().subtract(1, 'day').format('YYYY-MM-DD'),
          bulan: '', // Set default bulan saat ini
          tahun: moment().format("YYYY") ,
          nama_induk_pointtype: 'RTU',
          kinerja_scada: 'SCADA',
          nama_pointtype: '',
          jenispoint: null,
          id_unit:null,
        }}
      >
        <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
          <Row>
          <Col md={1}  className="">
          <Form.Group className='mb-2'>
                  <Form.Label>tahun</Form.Label>
                  <InputDate 
                  errors={errors} register={register} 
                  type="year" 
                  fieldName="tahun" 
           
                  />
                </Form.Group>
            </Col>
          <Col md={2} className="">
          <Form.Group className='mb-2'>
                <Form.Label>Bulan</Form.Label>
                <SelectFormStaticNew
                  control={control}
                  errors={errors}
                  fieldName={'bulan'}
                  options={OPTION_BULAN}
                  placeholder="-"
                  isClearable={true}
                />
              </Form.Group>
            </Col>
          <Col md={2} className="">
          <Form.Group className='mb-2'>
                <Form.Label>Jenis Kinerja</Form.Label>
                <SelectFormStaticNew
                  control={control}
                  errors={errors}
                  fieldName={'kinerja_scada'}
                  options={OPTION_KINERJA}
                  placeholder="-"
                  isClearable={true}
                />
              </Form.Group>
            </Col>
            {(OPTIONKINERJA === "RC" || OPTIONKINERJA === "TRIP") && (
  <Col md={2} className="">
    <Form.Group className='mb-2'>
      <Form.Label>Lokasi (B1)</Form.Label>
      <SelectAsyncDynamic
        fieldName='path1'
        pathServiceName='fasop.laporan_scada.path'
        labelField='pathname'
        valueField='pathname'
        placeholder='Pilih...'
        isClearable={true}
        errors={errors}
        control={control}
        queryParams={{
          page: 1,
          limit: 10,
          path: 'path1',
        }}
      />
    </Form.Group>
  </Col>
)}

{(OPTIONKINERJA === "RC" || OPTIONKINERJA === "TRIP") && (
  <Col md={2} className="">
    <Form.Group className='mb-2'>
      <Form.Label>Tegangan (B2)</Form.Label>
      <SelectAsyncDynamic
        fieldName='path2'
        pathServiceName='fasop.laporan_scada.path'
        labelField='pathname'
        valueField='pathname'
        placeholder='Pilih...'
        isClearable={true}
        errors={errors}
        control={control}
        watchParent={watchPath1}
        queryParams={{
          page: 1,
          limit: 10,
          path: 'path2',
          ...(watchPath1 ? { path1: watchPath1 } : {}),
        }}
      />
    </Form.Group>
  </Col>
)}

{(OPTIONKINERJA === "RC" || OPTIONKINERJA === "TRIP") && (
  <Col md={2} className="">
    <Form.Group className='mb-2'>
      <Form.Label>Bay (B3)</Form.Label>
      <SelectAsyncDynamic
        fieldName='path3'
        pathServiceName='fasop.laporan_scada.path'
        labelField='pathname'
        valueField='pathname'
        placeholder='Pilih...'
        isClearable={true}
        errors={errors}
        control={control}
        watchParent={watchPath2}
        queryParams={{
          page: 1,
          limit: 10,
          path: 'path3',
          ...(watchPath1 ? { path1: watchPath1 } : {}),
          ...(watchPath2 ? { path2: watchPath2 } : {}),
        }}
      />
    </Form.Group>
  </Col>
)}

{/* {(OPTIONKINERJA === "RC" || OPTIONKINERJA === "TRIP") && (
  <Col md={2} className="">
    <Form.Group className='mb-2'>
      <Form.Label>Element</Form.Label>
      <SelectAsyncDynamic
        fieldName='path4'
        pathServiceName='fasop.laporan_scada.path'
        labelField='pathname'
        valueField='pathname'
        placeholder='Pilih...'
        isClearable={true}
        errors={errors}
        control={control}
        watchParent={watchPath3}
        queryParams={{
          page: 1,
          limit: 10,
          path: 'path4',
          ...(watchPath1 ? { path1: watchPath1 } : {}),
          ...(watchPath2 ? { path2: watchPath2 } : {}),
          ...(watchPath3 ? { path3: watchPath3 } : {}),
        }}
      />
    </Form.Group>
  </Col>
)}

{(OPTIONKINERJA === "RC" || OPTIONKINERJA === "TRIP") && (
  <Col md={2} className="">
    <Form.Group className='mb-2'>
      <Form.Label>Info</Form.Label>
      <SelectAsyncDynamic
        fieldName='path5'
        pathServiceName='fasop.laporan_scada.path'
        labelField='pathname'
        valueField='pathname'
        placeholder='Pilih...'
        isClearable={true}
        errors={errors}
        control={control}
        watchParent={watchPath4}
        queryParams={{
          page: 1,
          limit: 10,
          path: 'path5',
          ...(watchPath1 ? { path1: watchPath1 } : {}),
          ...(watchPath2 ? { path2: watchPath2 } : {}),
          ...(watchPath3 ? { path3: watchPath3 } : {}),
          ...(watchPath4 ? { path4: watchPath4 } : {}),
        }}
      />
    </Form.Group>
  </Col>
)} */}

              {OPTIONKINERJA === "SCADA" && (
            <Col md={2} className="">
                <Form.Group className='mb-2'>
                  <Form.Label>Tipe Point</Form.Label>
                  <SelectAsyncDynamic
                    fieldName='nama_induk_pointtype'
                    pathServiceName='master.fasop.point_type'
                    labelField='name'
                    valueField='name'
                    placeholder='Pilih...'
                    isClearable={true}
                    errors={errors}
                    control={control}
                    queryParams={{
                      page: -1,
                      limit: -1,
                      induk: 1,
                      sort_by: 'name',
           
                    }}
                  />
                </Form.Group>
              </Col>
                )}
              {OPTIONKINERJA === "SCADA" && (
              <Col md={3} className="">
                <Form.Group className='mb-2'>
                  <Form.Label>Jenis Point</Form.Label>
                  <SelectAsyncDynamicNew
                    fieldName='nama_pointtype'
                    pathServiceName='master.fasop.point_type'
                    labelField='name'
                    valueField='name'
                    placeholder='Pilih...'
                    isClearable={true}
                    errors={errors}
                    control={control}
                    watchParent={
                      idPointWatch
                    }
                    queryParams={{
                      page: 1,
                      limit: 10,
                      induk:0,
                      sort_by: '-name',
                      nama_induk_pointtype: idPointWatch
                    }}
                  />
                </Form.Group>
              </Col>
               )}
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
