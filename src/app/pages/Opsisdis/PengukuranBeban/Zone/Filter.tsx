import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import FiltersForm from '@app/modules/Filters/FilterForm';
import SelectAsyncDynamic from '@app/modules/SelectForm/SelectAsyncDynamic';
import { JENIS_LOKASI } from '@app/configs/jenis-lokasi.config';
import FilterActionButton from '@app/modules/Filters/FilterActionButton';
import InputDate from '@app/components/Date/InputDate';
import moment from 'moment';

export default function Filter() {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();

  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    date: Yup.date().typeError('Tanggal wajib diisi').required('Tanggal wajib diisi'),
  });

  const [formModel] = useState<any>({});

  const {
    handleSubmit,
    setValue,
    setError,
    control,
    register,
    formState,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: formModel,
  });
  const { errors }: any = formState || {};

  /** SUBMIT FORM HANDLING */
  const onSubmitForm = (data: any) => {
    if (data?.date) {
      data.date = moment(data?.date).format('DD-MM-YYYY')
    }
    setDataParams(() => {
      return {
        ...data
      }
    });
  };

  return (
    <>
      <FiltersForm
        setError={setError}
        setValue={setValue}
        dataParams={dataParams}
        onLoading={setLoading}
        fields={{ id_gardu_induk: undefined }}
      >
        <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
          <Form.Group>
            <Form.Label>Tanggal</Form.Label>
            <InputDate errors={errors} register={register} />
            <Form.Control.Feedback type='invalid'>
              {errors?.date?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Gardu Induk</Form.Label>
            <SelectAsyncDynamic
              fieldName='id_gardu_induk'
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
                id_ref_jenis_lokasi: JENIS_LOKASI().gardu_induk,
              }}
            />
            <Form.Control.Feedback type='invalid'>
              {errors?.id_unit_pembangkit?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <FilterActionButton loading={loading} onClickReset={() => onSubmitForm(null)}></FilterActionButton>
        </Form>
      </FiltersForm>
    </>
  );
}
