import React from 'react';
import { Form } from 'react-bootstrap';
import { UseFormRegisterReturn } from 'react-hook-form';

export default function FormInputSwitch({
  className='mt-2',
  value,
  register,
  labelName,
  trueLabel = 'Yes',
  falseLabel = 'No',
}: IFormInputSwitch) {
  return (
    <>
      <Form.Group  className={className}>
        {labelName && <Form.Label>{labelName}</Form.Label>}
        <div className='form-switch d-flex align-items-center gap-3'>
          <input className='form-check-input' type='checkbox' {...register} />
          <label className='form-check-label ps-3 mt-1'>
            {value ? trueLabel : falseLabel}
          </label>
        </div>
      </Form.Group>
    </>
  );
}

interface IFormInputSwitch {
  className?: string;
  labelName?: string;
  trueLabel?: string;
  falseLabel?: string;
  value: any;
  register: UseFormRegisterReturn;
}
