import React, { useState } from 'react';
import { Col, Form, Row  ,InputGroup, FormControl} from 'react-bootstrap';

import { useForm ,useWatch} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import FiltersForm from '@app/modules/Filters/FilterForm';
import FilterActionButton from '@app/modules/Filters/FilterActionButton';

import moment from 'moment';
// import { timeFormSelect } from '@app/helper/time.helper';


import SelectAsyncDynamic from '@app/modules/SelectForm/SelectAsyncDynamic';
// import { JENIS_LOKASI } from '@app/configs/jenis-lokasi.config';
// import { API_PATH } from '@app/services/_path.service';

export default function RCKinFilter({onFilterChange}:any) {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();



  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    id_induk_pointtype: Yup.string().typeError('Data wajib diisi').nullable(),
    jenispoint: Yup.string().typeError('Data wajib diisi').nullable(),
    
    datum_range_after: Yup.string().nullable(),
    datum_range_before: Yup.string().nullable(),
    datum: Yup.string().nullable(),
    nama_pointtype: Yup.string().nullable(),
    path1: Yup.string().nullable(),
    path2: Yup.string().nullable(),
    path3: Yup.string().nullable(),
    path4: Yup.string().nullable(),
    id_unit: Yup.string().nullable(),
  });

  const [formModel] = useState<any>({
    jenispoint: null,
    id_induk_pointtype: null,
    id_unit: null,
    datum_range_after: moment().subtract(1, "day").format("YYYY-MM-DD") ,
    datum_range_before: moment().format("YYYY-MM-DD") ,
    path1: '',
    nama_pointtype: '',
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

  const watchPath1 = useWatch({ control, name: 'path1' });
  const watchPath2 = useWatch({ control, name: 'path2' });
  const watchPath3 = useWatch({ control, name: 'path3' });
  const watchPath4 = useWatch({ control, name: 'path4' });



  /** SUBMIT FORM HANDLING */
  const onSubmitForm = (data: any) => {  


    let params = data;
      params.id_induk_pointtype = '798be05c-4df2-4945-9a47-5745a0de66c6'

    // setDataParams(params);
    setDataParams(() => {
      return { ...params }
    });

    onFilterChange(params)
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
          datum_range_after: moment().subtract(1, "day").format("YYYY-MM-DD") ,
          datum_range_before: moment().format("YYYY-MM-DD") ,
          nama_pointtype: '',
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
          <Col md={3} className="">
              <Form.Group>
                <Form.Label>Range Tanggal</Form.Label>
                <InputGroup>
                  <FormControl
                    {...register("datum_range_after")}
                    type="date"
                    defaultValue={moment(formModel.after).format(
                      "YYYY-MM-DD"
                    )}
                  // min={moment(watchDatum2Before)
                  //   .subtract(1, 'month')
                  //   .format('YYYY-MM-DD')}
                  // max={watchDatum2Before}
                  />
                  <InputGroup.Text>
                    <i className="fa-solid fa-arrow-right"></i>
                  </InputGroup.Text>
                  <FormControl
                    {...register("datum_range_before")}
                    type="date"
                    defaultValue={moment(formModel.after).format(
                      "YYYY-MM-DD"
                    )}
                  // min={watchDatum1After}
                  // max={moment().format('YYYY-MM-DD')}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col md={2} className="">
                <Form.Group className='mb-2'>
                  <Form.Label>Tipe Point</Form.Label>
                  <SelectAsyncDynamic
                    fieldName='nama_pointtype'
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
                      id_induk_pointtype : "798be05c-4df2-4945-9a47-5745a0de66c6",
                      sort_by: 'name',
           
                    }}
                  />
                </Form.Group>
              </Col>
             
           
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
