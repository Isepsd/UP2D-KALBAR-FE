import { ReactSelectStyle } from '@app/configs/react-select.config';
import React from 'react';
import { Controller } from 'react-hook-form';
import Select from 'react-select';

export default function SelectFormStatic({
  control,
  errors,
  fieldName,
  placeholder = 'Pilih...',
  options,
  defaultValue = '',
  disabled,
  isClearable=true,
}: ISelectFormStatic) {

  return (
    <>
      <Controller
        control={control}
        defaultValue={defaultValue}
        name={fieldName}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, value, ref } }) => (
          <Select
            placeholder={placeholder}
            styles={ReactSelectStyle}
            classNamePrefix={`${errors[fieldName] ? 'is-invalid' : ''}`}
            inputRef={ref}
            isDisabled={disabled}
            isClearable={isClearable}
            value={options.filter((c: any) => c.value == value)}
            onChange={(val: any) => onChange(val?.value)}
            options={options}
          />
        )}
      />
      {errors[fieldName] && (
        <div className='invalid-feedback d-block'>
          {errors[fieldName]?.message}
        </div>
      )}
    </>
  );
}

interface ISelectFormStatic {
  control: any;
  errors: any;
  fieldName: string;
  placeholder?: string;
  options: any;
  defaultValue?: any,
  disabled?: boolean;
  isClearable?: boolean;
}
