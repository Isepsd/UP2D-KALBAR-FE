import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { get } from 'lodash';

import FiltersForm from '@app/modules/Filters/FilterForm';
import SelectAsyncDynamic from '@app/modules/SelectForm/SelectAsyncDynamic';
import FilterActionButton from '@app/modules/Filters/FilterActionButton';

interface ISelectProps {
  fieldName: string;
  pathServiceName: string;
  labelField: string;
  valueField: string;
  placeholder: string;
}

type Props = {
  selectProps?: ISelectProps;
  queryParams?: any;
  fieldKeyword?: string
  isJenisPoint?: boolean
}

function RealtimeFilter({
  selectProps = { fieldName: 'id_pointtype', pathServiceName: 'master.fasop.point_type', labelField: 'name', valueField: 'id_pointtype', placeholder: 'Pilih...' }, 
  queryParams = { page: -1 },
  fieldKeyword = 'path3text',
  isJenisPoint = false
}: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();

  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({});

  const [formModel] = useState<any>({});

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
    setDataParams(data);
  };

  return (
    <>
      <FiltersForm
        setError={setError}
        setValue={setValue}
        dataParams={dataParams}
        onLoading={setLoading}
        fields={{ [selectProps.fieldName]: undefined, [fieldKeyword]: '' }}
      >
        <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
          <Form.Group className="mb-3">
            <Form.Label>Point Name</Form.Label>
            <Form.Control {...register(fieldKeyword)} placeholder="Nama" />
          </Form.Group>
          {
            isJenisPoint && (
              <Form.Group className="mb-3">
                <Form.Label>Jenis Point</Form.Label>
                <SelectAsyncDynamic
                  {...selectProps}
                  isClearable={true}
                  errors={errors}
                  control={control}
                  queryParams={queryParams}
                />
                <Form.Control.Feedback type='invalid'>
                  {get(errors, `${selectProps?.fieldName}.message`)}
                </Form.Control.Feedback>
              </Form.Group>
            )
          }
          <FilterActionButton loading={loading} onClickReset={()=>onSubmitForm(null)}></FilterActionButton>
        </Form>
      </FiltersForm>
    </>
  );
}

export default RealtimeFilter