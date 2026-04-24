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
  thn_bln: Yup.string().nullable(),
  });

  const [formModel] = useState<any>({
  
    thn_bln: moment().format("YYYY-MM") ,
 
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
      
          thn_bln: moment().format("YYYY-MM") ,
       
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
