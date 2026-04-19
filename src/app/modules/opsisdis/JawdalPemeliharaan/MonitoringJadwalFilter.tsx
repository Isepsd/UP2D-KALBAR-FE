import React, { useState } from 'react';
import { Col, Form, FormControl, InputGroup, Row } from 'react-bootstrap';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import FiltersForm from '@app/modules/Filters/FilterForm';
import FilterActionButton from '@app/modules/Filters/FilterActionButton';
import moment from 'moment';

function MonitoringJadwalFilter() {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();

  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    datum_1_after: Yup.string().nullable(),
    datum_1_before: Yup.string().nullable(),
  });

  const [formModel] = useState<any>({
    datum_1_after: moment().subtract(1, 'day').format('YYYY-MM-DD[T]HH:mm'),
    datum_1_before: moment().format('YYYY-MM-DD[T]HH:mm'),
  });

  const {
    handleSubmit,
    register,
    setValue,
    setError,
    control,
    // formState,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: formModel,
  });

  const watchDatum1After = useWatch({ control, name: 'datum_1_after' });
  const watchDatum2Before = useWatch({ control, name: 'datum_1_before' });

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
          datum_1_before: moment().format('YYYY-MM-DD HH:mm'),
          datum_1_after: moment().subtract(1, 'day').format('YYYY-MM-DD HH:mm'),
          b3: '',
        }}
        overrideType={{ datum_1_before: 'date', datum_1_after: 'date' }}
      >
        <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
          <Row>
            <Col md={6} className='mb-3'>
              <Form.Group>
                <Form.Label>Range Tanggal</Form.Label>
                <InputGroup>
                  <FormControl
                    {...register('datum_1_after')}
                    type='datetime-local'
                    min={moment(watchDatum2Before)
                      .subtract(1, 'month')
                      .format('YYYY-MM-DD[T]HH:mm')}
                    max={watchDatum2Before}
                  />
                  <InputGroup.Text>
                    <i className='fa-solid fa-arrow-right'></i>
                  </InputGroup.Text>
                  <FormControl
                    {...register('datum_1_before')}
                    type='datetime-local'
                    min={watchDatum1After}
                    max={moment().format('YYYY-MM-DD[T]HH:mm')}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>

          <FilterActionButton
            loading={loading}
            onClickReset={() => onSubmitForm(null)}
          ></FilterActionButton>
        </Form>
      </FiltersForm>
    </>
  );
}

export default MonitoringJadwalFilter