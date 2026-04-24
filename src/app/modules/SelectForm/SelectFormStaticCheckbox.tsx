import { ReactSelectStyle } from '@app/configs/react-select.config';
import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import Select from 'react-select';
import { components } from 'react-select';

// Custom Checkbox Component
const CheckboxOption = (props: any) => {
  return (
    <components.Option {...props}>
      <input
        type="checkbox"
        checked={props.isSelected}
        onChange={() => null} // Prevent checkbox from changing directly
        style={{ marginRight: 10 }}
      />
      {props.data.label}
    </components.Option>
  );
};

export default function SelectFormStaticCheckbox({
  control,
  errors,
  fieldName,
  placeholder = '',
  options,
  defaultValue = [],
  disabled,
  isClearable = true,
}: ISelectFormStatic) {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const handleMenuOpen = () => {
    setMenuIsOpen(true);
  };

  const handleMenuClose = () => {
    setMenuIsOpen(false);
  };

  return (
    <>
      <Controller
        control={control}
        defaultValue={defaultValue}
        name={fieldName}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, value, ref } }) => {
          // Ensure value is an array for easier handling
          const selectedValues = typeof value === 'string' ? value.split(',') : [];

          return (
            <Select
              placeholder={placeholder}
              styles={ReactSelectStyle}
              classNamePrefix={`${errors[fieldName] ? 'is-invalid' : ''}`}
              inputRef={ref}
              isDisabled={disabled}
              isClearable={isClearable}
              isMulti
              menuIsOpen={menuIsOpen} // Control dropdown open state
              onMenuOpen={handleMenuOpen} // Open dropdown
              onMenuClose={handleMenuClose} // Close dropdown
              value={options.filter((c: any) => selectedValues.includes(c.value))}
              onChange={(val: any) => {
                // Convert the selected values to a comma-separated string
                const updatedValues = val ? val.map((item: any) => item.value) : [];
                onChange(updatedValues.join(','));
                handleMenuOpen(); // Keep dropdown open after selection
              }}
              options={options}
              components={{ Option: CheckboxOption }}
              closeMenuOnSelect={false} // Keep menu open after selection
            />
          );
        }}
      />

      {errors[fieldName] && (
        <div className="invalid-feedback d-block">
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
  options: any[];
  defaultValue?: any[];
  disabled?: boolean;
  isClearable?: boolean;
}
