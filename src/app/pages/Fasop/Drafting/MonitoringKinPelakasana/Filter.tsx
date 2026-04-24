import React, { useState } from 'react';
import { Col, Form, Row  } from 'react-bootstrap';
import InputDate from '@app/components/Date/InputDate';
import { useForm} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import FiltersForm from '@app/modules/Filters/FilterForm';
import FilterActionButton from '@app/modules/Filters/FilterActionButton';

import moment from 'moment';
// import { timeFormSelect } from '@app/helper/time.helper';



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

  const { handleSubmit, setValue, setError, register, formState, } =
    useForm({
      resolver: yupResolver(validationSchema),
      defaultValues: formModel,
    });
  const { errors }: any = formState || {};

 
 
  /** SUBMIT FORM HANDLING */
  const onSubmitForm = (data: any) => {  


    let params = data;
      params.id_induk_pointtype = '3d391819-4288-4699-80f4-7ebd5ae0d733'

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
      
          thn_bln: moment().format("YYYY-MM") ,
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
          <Col md={2} className="">
          <Form.Group className='mb-2'>
                  <Form.Label>Bulan</Form.Label>
                  <InputDate 
                  errors={errors} register={register} 
                  type="month" 
                  fieldName="thn_bln" />
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
