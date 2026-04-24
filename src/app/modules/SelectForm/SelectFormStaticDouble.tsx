import { ReactSelectStyle } from '@app/configs/react-select.config';
import React from 'react';
import { Controller } from 'react-hook-form';
import Select from 'react-select';

export default function SelectFormStaticDouble({
  control,
  errors,
  fieldName,
  placeholder = 'Pilih...',
  options,
  defaultValue = '',
  isMulti = false,        // BARU: aktifkan multi select
  disabled,
  isClearable=true,
}: ISelectFormStaticDouble) {

  return (
    <>
      <Controller
        control={control}
        name={fieldName}
        defaultValue={defaultValue}
        rules={{ required: isMulti ? false : true }} // sesuaikan kebutuhan
        render={({ field: { onChange, value, ref } }) => {
          // Konversi value jadi format yang diterima react-select
          let selectedValues: any = [];

          if (isMulti) {
            if (Array.isArray(value)) {
              selectedValues = value;
            } else if (typeof value === 'string' && value) {
              selectedValues = value.split(',').filter(Boolean);
            }
            // Cari option yang sesuai
            selectedValues = options.filter((opt: any) =>
              selectedValues.includes(opt.value?.toString())
            );
          } else {
            selectedValues = options.find((opt: any) => opt.value == value) || null;
          }

          return (
            <Select
              placeholder={placeholder}
              styles={ReactSelectStyle}
              classNamePrefix={`${errors[fieldName] ? 'is-invalid' : ''}`}
              inputRef={ref}
              isDisabled={disabled}
              isClearable={isClearable}
              isMulti={isMulti} // INI YANG BIKIN BISA PILIH BANYAK
              value={selectedValues}
              onChange={(selected: any) => {
                if (isMulti) {
                  // Kirim string pake koma: "1,2,3"
                  const values = selected ? selected.map((item: any) => item.value) : [];
                  onChange(values.join(','));
                } else {
                  onChange(selected?.value || '');
                }
              }}
              options={options}
            />
          );
        }}
      />
      {errors[fieldName] && (
        <div className='invalid-feedback d-block'>
          {errors[fieldName]?.message}
        </div>
      )}
    </>
  );
}

interface ISelectFormStaticDouble {
  control: any;
  errors: any;
  fieldName: string;
  placeholder?: string;
  options: any;
  defaultValue?: any,
  disabled?: boolean;
  isClearable?: boolean;
  isMulti?: boolean;     // BARU: default false (single), true = multi
}
