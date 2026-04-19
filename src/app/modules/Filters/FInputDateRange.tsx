import moment from 'moment';
import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { useWatch } from 'react-hook-form';

export default function FInputDateRange({
  register,
  dt1,
  dt2,
  control,
}: FInputDateRange) {
  const watchDateBefore = useWatch({ control, name: dt1 });
  const watchDateAfter = useWatch({ control, name: dt2 });

  return (
    <InputGroup className='mb-3'>
      <Form.Control
        {...register(dt1)}
        type='date'
        min={moment(watchDateBefore)
          .subtract(1, 'month')
          .format('YYYY-MM-DD')}
        max={watchDateBefore}
      />
      <InputGroup.Text>
        <i className='fa-solid fa-arrow-right'></i>
      </InputGroup.Text>
      <Form.Control
        {...register(dt2)}
        type='date'
        min={watchDateAfter}
        max={moment().format('YYYY-MM-DD')}
      />
    </InputGroup>
  );
}

interface FInputDateRange {
  register: any;
  dt1: any;
  dt2: any;
  control: any;
}
