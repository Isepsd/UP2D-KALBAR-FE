import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { get } from 'lodash';

import FiltersForm from '@app/modules/Filters/FilterForm';
import SelectAsyncDynamic from '@app/modules/SelectForm/SelectAsyncDynamic';
import FilterActionButton from '@app/modules/Filters/FilterActionButton';
import moment from 'moment';

const selectProps: any = { fieldName: 'id_pointtype', pathServiceName: 'master.fasop.point_type', labelField: 'name', valueField: 'id_pointtype', placeholder: 'Pilih Jenis Point' }

type Props = {
  type: string;
  jenisPointType: any;
  keywordName?: string;
  keywordField?: string;
  isJenisPoint?: boolean;
};

function KinerjaFilter({
  type = 'bulan',
  jenisPointType = 'ANALOG',
  keywordName = '',
  keywordField = 'path3text',
  isJenisPoint = true
}: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();

  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    datum: Yup.string().nullable(),
    path1: Yup.string().nullable(),
    path3: Yup.string().nullable(),
  });

  const [formModel] = useState<any>({
    datum: moment().format('YYYY-MM-DD'),
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
  const watchDatum = useWatch({ control, name: 'datum' });

  /** SUBMIT FORM HANDLING */
  const onSubmitForm = (data: any) => {
    setDataParams(data);
  };

  useEffect(() => {
    if(type == 'bulanan'){
      const startOfMonth = moment(watchDatum).startOf('month').format('YYYY-MM-DD');
      const endOfMonth   = moment(watchDatum).endOf('month').format('YYYY-MM-DD');

      setValue('datum_after', startOfMonth)
      setValue('datum_before', endOfMonth)
      setValue('datum', moment(watchDatum).format('YYYY-MM'))
    } else {
      setValue('datum', moment().format('YYYY-MM-DD'))
      setValue('datum_after', '')
      setValue('datum_before', '')
    }
  }, [watchDatum, type])

  return (
    <>
      <FiltersForm
        setError={setError}
        setValue={setValue}
        dataParams={dataParams}
        onLoading={setLoading}
        fields={{
          id_pointtype: undefined,
          datum: moment().format('YYYY-MM-DD'),
          datum_before: moment().endOf('month').format('YYYY-MM-DD'),
          datum_after: moment().startOf('month').format('YYYY-MM-DD'),
          b1: '',
          b3: '',
          [keywordField]: '',
        }}
      >
        <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
          <Form.Group className='mb-3'>
            <Form.Label>Datum</Form.Label>
            <Form.Control 
              {...register('datum')}
              type={type == 'bulanan' ? 'month' : 'date'}
              max={moment().format('YYYY-MM-DD')} />
          </Form.Group>
          {
            keywordName && (
              <Form.Group className='mb-3'>
                <Form.Label>{keywordName}</Form.Label>
                <Form.Control {...register(keywordField)} placeholder={keywordName} />
              </Form.Group>
            )
          }
          {
            !keywordName && (
              <>
                <Form.Group className='mb-3'>
                  <Form.Label>B1</Form.Label>
                  <Form.Control {...register('path1')} placeholder='B1' />
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Form.Label>B3</Form.Label>
                  <Form.Control {...register('path3')} placeholder='B3' />
                </Form.Group>
              </>
            )
          }
          {
            isJenisPoint && (
              <Form.Group className='mb-3'>
                <Form.Label>Jenis Point</Form.Label>
                <SelectAsyncDynamic
                  {...selectProps}
                  isClearable={true}
                  errors={errors}
                  control={control}
                  queryParams={{page: -1, jenispoint: jenisPointType}}
                />
                <Form.Control.Feedback type='invalid'>
                  {get(errors, `${selectProps?.fieldName}.message`)}
                </Form.Control.Feedback>
              </Form.Group>
            )
          }

          <FilterActionButton
            loading={loading}
            onClickReset={() => onSubmitForm(null)}
          ></FilterActionButton>
        </Form>
      </FiltersForm>
    </>
  );
}

export default KinerjaFilter;
