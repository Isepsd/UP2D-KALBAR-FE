import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import FiltersForm from '@app/modules/Filters/FilterForm';
import FilterActionButton from '@app/modules/Filters/FilterActionButton';
import Select from 'react-select';
import { ReactSelectStyle } from '@app/configs/react-select.config';
import { SELECT_UFR } from '@app/configs/select-options.config';

export default function Filter() {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();
  
  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    ufr: Yup.string(),
    // .typeError('Tanggal wajib diisi').required('Tanggal wajib diisi'),   
  });

  const [formModel] = useState<any>({});
  const optionData: any = SELECT_UFR()
  const {
    handleSubmit,
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
    setDataParams(data);
  };

  return (
    <>
      <FiltersForm
        setError={setError}
        setValue={setValue}
        dataParams={dataParams}
        onLoading={setLoading}
        fields={{ufr: null}}
      >
        <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
          <Form.Group className='mt-3' controlId='general_mode'>
            <Form.Label>UFR </Form.Label>
            <Controller
              control={control}
              defaultValue={'1,2'}
              name='ufr'
              rules={{
                required: false,
              }}
              render={({ field: { onChange, value, ref } }) => {
                let dataValue = []
                if(value) {
                  const res: any = value.split(',');
                  dataValue = res.map((e: any) => {
                    return { label: e, value: e}
                  })
                }
                
                return (
                  <Select
                    placeholder='Pilih UFR'
                    styles={ReactSelectStyle}
                    classNamePrefix={`${errors.ufr ? 'is-invalid' : ''}`}
                    inputRef={ref}
                    // value={optionData?.filter(
                    //   (c: any) => c.value == value
                    // )}
                    value={dataValue}
                    onChange={(val: any) => {
                      onChange(val.map(({value}: any) => value).join(','))
                    }}
                    options={optionData}
                    isMulti
                    isClearable={true}
                  />
              )}}
            />
            {errors.ufr && (
              <div className='invalid-feedback d-block'>
                {errors.ufr?.message}
              </div>
            )}
          </Form.Group>
          <FilterActionButton loading={loading} onClickReset={() => onSubmitForm(null)}></FilterActionButton>
        </Form>
      </FiltersForm>
    </>
  );
}
