import React, { useState } from 'react';
import { Form, FormControl, InputGroup } from 'react-bootstrap';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import FiltersForm from '@app/modules/Filters/FilterForm';
import FilterActionButton from '@app/modules/Filters/FilterActionButton';
import moment from 'moment';

type Props = {
  isLaporan? : boolean;
  isStatusKirim? : boolean;
};

function ApktFilter({}: Props) {
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
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: formModel,
  });

  const watchDatum1After = useWatch({ control, name: 'datum_before' });
  const watchDatum2Before = useWatch({ control, name: 'datum_before' });

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
        fields={{
          status_laporan: '',
          nama_laporan: '',
          status_kirim_apkt: '',
          datum_before: moment().format('YYYY-MM-DD'),
          datum_after: moment().subtract(1, 'day').format('YYYY-MM-DD')
        }}
      >
        <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
        <Form.Group>
            <Form.Label>Datum</Form.Label>
            <InputGroup className='mb-3'>
              <FormControl
                {...register('datum_after')}
                type='date'
                min={moment(watchDatum2Before)
                  .subtract(1, 'month')
                  .format('YYYY-MM-DD')}
                max={watchDatum2Before}
              />
              <InputGroup.Text>
                <i className='fa-solid fa-arrow-right'></i>
              </InputGroup.Text>
              <FormControl
                {...register('datum_before')}
                type='date'
                min={watchDatum1After}
                max={moment().format('YYYY-MM-DD')}
              />
            </InputGroup>
          </Form.Group>

          <FilterActionButton
            loading={loading}
            onClickReset={() => onSubmitForm(null)}
          ></FilterActionButton>
        </Form>
      </FiltersForm>
    </>
  );
}

export default ApktFilter