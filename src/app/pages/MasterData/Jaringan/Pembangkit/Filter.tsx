import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import FiltersForm from '@app/modules/Filters/FilterForm';
import SelectAsyncDynamic from '@app/modules/SelectForm/SelectAsyncDynamic';
import { JENIS_LOKASI } from '@app/configs/jenis-lokasi.config';
import FilterActionButton from '@app/modules/Filters/FilterActionButton';

export default function Filter() {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();

  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({});

  const [formModel] = useState<any>({});

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
        fields={{ id_parent_lokasi: undefined }}
      >
        <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
          <Form.Group>
            <Form.Label>Unit Pembangkit</Form.Label>
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
                id_ref_jenis_lokasi: JENIS_LOKASI().unit_pembangkit,
              }}
            />
            <Form.Control.Feedback type='invalid'>
              {errors?.id_parent_lokasi?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <FilterActionButton className={'justify-content-start'} loading={loading} onClickReset={()=>onSubmitForm(null)}></FilterActionButton>
        </Form>
      </FiltersForm>
    </>
  );
}
