import React, { useState } from 'react';
import { Col, Form, FormControl, InputGroup, Row } from 'react-bootstrap';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import FiltersForm from '@app/modules/Filters/FilterForm';
import FilterActionButton from '@app/modules/Filters/FilterActionButton';
import moment from 'moment';
// import SelectAsyncDynamic from '../SelectForm/SelectAsyncDynamic';


function SoeFilter() {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>({
    tanggal_akhir: moment().format('YYYY-MM-DD HH:mm:ss'),
    tanggal_mulai: moment().subtract(1, 'hour').format('YYYY-MM-DD HH:mm:ss'),
  });

  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    tanggal_akhir: Yup.string().nullable(),
    tanggal_mulai: Yup.string().nullable(),
    path1: Yup.string().nullable(),
    path2: Yup.string().nullable(),
    path3: Yup.string().nullable(),
    info: Yup.string().nullable(),
    element: Yup.string().nullable(),
    value: Yup.string().nullable(),

  });

  const [formModel] = useState<any>({
    tanggal_akhir: moment().format('YYYY-MM-DD HH:mm:ss'),
    tanggal_mulai: moment().subtract(1, 'hour').format('YYYY-MM-DD HH:mm:ss'),
    path4: '',

  });

  const {
    handleSubmit,
    register,
    setValue,
    setError,
    control,
    formState,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: formModel,
  });
  const { errors }: any = formState || {};

  /** SUBMIT FORM HANDLING */
  const onSubmitForm = (data: any) => {
    // setDataParams(data);
    setDataParams(() => {
      return { ...data }
    });
  };

  const watchDateMulai = useWatch({ control, name: 'tanggal_mulai' });
  const watchDateAkhir = useWatch({ control, name: 'tanggal_akhir' });

  return (
    <>
      <FiltersForm
        setError={setError}
        setValue={setValue}
        dataParams={dataParams}
        onLoading={setLoading}
        fields={{
          tanggal_akhir: moment().format('YYYY-MM-DD HH:mm:ss'),
          tanggal_mulai: moment().subtract(1, 'hour').format('YYYY-MM-DD HH:mm:ss'),
          path4: '',
      
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
                    type='datetime-local'
                    max={watchDateAkhir}
                  />
                  <InputGroup.Text>
                    <i className='fa-solid fa-arrow-right'></i>
                  </InputGroup.Text>
                  <FormControl
                    {...register('tanggal_akhir')}
                    type='datetime-local'
                    min={watchDateMulai}
                    max={moment().format('YYYY-MM-DD')}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
           
            <Col md={4} className='mb-3'>
          
              <Form.Group  className='mb-1'>
            
            <Form.Label>
                    Element
            </Form.Label>
            <Col md={12}>
                    <Form.Control
                      {...register('path4')}
                      isInvalid={errors.path4}
                    />
                    <Form.Control.Feedback type='invalid'>
                      {errors?.path4?.message}
                    </Form.Control.Feedback>
                
                    </Col>
          </Form.Group>
    
            </Col>
           
          </Row>

          <Row>
            <Col md={4}>
              <Form.Group className='mb-3'>
                <FilterActionButton
                  textSubmit='Filter'
                  loading={loading}
                  top=""
                />
              </Form.Group>

            </Col>
          </Row>

        </Form>
      </FiltersForm>
    </>
  );
}

export default SoeFilter;
