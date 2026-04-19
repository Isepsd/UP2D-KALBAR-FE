import React, { FC } from 'react';
import { Form } from 'react-bootstrap';
import { Controller } from 'react-hook-form';
import Select from 'react-select';
import { ReactSelectStyle } from '@app/configs/react-select.config';

type Props = {
  control: any
  errors: any
  label: string
  options: any
};

const InputCustomTime: FC<Props> = ({ control, errors, label, options = [] }) => {

  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <Controller
        control={control}
        defaultValue={''}
        name="time"
        rules={{
          required: true,
        }}
        render={({ field: { onChange, value, ref } }) => (
          <Select
            isClearable={true}
            placeholder={`Pilih ${label}`}
            styles={ReactSelectStyle}
            classNamePrefix={`${errors.time ? 'is-invalid' : ''
              }`}
            inputRef={ref}
            value={options.filter(
              (c: any) => c.value == value
            )}
            onChange={(val: any) => onChange(val?.value)}
            options={options}
          />
        )}
      />
      {errors.time && (
        <div className='invalid-feedback d-block'>
          {errors.time?.message}
        </div>
      )}
    </Form.Group>

  );
}



export default InputCustomTime;