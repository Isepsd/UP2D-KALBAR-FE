import React from 'react';
import { Form } from 'react-bootstrap';
import { Controller } from 'react-hook-form';

const FormInputControl: React.FC<{
  required?: boolean;
  placeholder?: string;
  isInvalid?: boolean | undefined;
  message?: any;
  as?: any;
  control: any;
  name: string;
  type?: 'text' | 'password' | 'number' | 'color' | 'email' | 'tel' | 'date';
  disabled?: boolean;
}> = ({
  placeholder,
  isInvalid,
  message,
  as = undefined,
  type = 'text',
  control,
  name,
  required = false,
  disabled = false,
}) => {
  return (
    <>
      <Controller
        control={control}
        name={name}
        rules={{
          required: required,
        }}
        render={({ field: { onChange, value } }) => (
          <Form.Control
            type={type ?? 'text'}
            as={as}
            onChange={({ target: { value: v } }) => {
              onChange(v);
            }}
            value={value === null ? undefined : value}
            isInvalid={isInvalid}
            placeholder={placeholder ?? ''}
            disabled={disabled}  
          />
        )}
      />
      <Form.Control.Feedback type='invalid'>{message}</Form.Control.Feedback>
    </>
  );
};

export default FormInputControl;
