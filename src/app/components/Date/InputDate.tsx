import React, { FC } from 'react';
import { Form } from 'react-bootstrap';

type Props = {
  errors: any
  register: any
  type?: string
  fieldName?: string
  disabled?: boolean,
  step?: number
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
};

const InputDate: FC<Props> = ({ errors, register, type = "date", fieldName = "date", disabled = false, step = 0 ,onChange}) => {

  return (
    <div className={`icheck-primary`}>
      <Form.Control
        {...register(fieldName)}
        isInvalid={errors[fieldName] as boolean | undefined}
        type={type}
        disabled={disabled}
        step={step}
        onChange={onChange}
      />
      <Form.Control.Feedback type='invalid'>
        {errors[fieldName]?.message}
      </Form.Control.Feedback>
    </div>

  );
}

export default InputDate;