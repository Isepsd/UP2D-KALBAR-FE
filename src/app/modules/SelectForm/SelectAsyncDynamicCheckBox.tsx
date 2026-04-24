import React, { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import axios from 'axios';
import { debounce, get } from 'lodash';
import AsyncSelect from 'react-select/async';
import { getAllByPath } from '@app/services/main.service';
import { ReactSelectStyle } from '@app/configs/react-select.config';
import { API_PATH } from '@app/services/_path.service';
import { components } from 'react-select';

interface IOption {
  readonly value: string;
  readonly label: string;
  readonly color: string;
  readonly isFixed?: boolean;
  readonly isDisabled?: boolean;
}

const CustomOption = (props: any) => {
  return (
    <components.Option {...props}>
      <input
        type="checkbox"
        checked={props.isSelected}
        onChange={() => props.selectOption(props.data)}
        style={{ marginRight: 10 }}
      />
      {props.data.label}
    </components.Option>
  );
};

function SelectAsyncDynamicCheckBox({
  control,
  fieldName,
  fieldNameParent,
  watchParent,
  errors,
  placeholder = '',
  pathServiceName,
  path,
  labelField,
  valueField,
  queryParams = {},
  setValue,
  required = false,
  isDisabled = false,
  isClearable = true,
  isMulti = false,
  styles = ReactSelectStyle,
  options,
}: ISelectAsyncDynamic) {
  const source = axios.CancelToken.source();
  const [selectOptions, setSelectOptions] = useState<IOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [idParent, setIdParent] = useState<any>();
  const [pathService] = useState<string>(path ? path : get(API_PATH(), pathServiceName));

  const getSelectOptions = (
    inputVal: any,
    callback?: (options: IOption[]) => void
  ) => {
    setLoading(true);

    try {
      const parentField = fieldNameParent ? { [fieldNameParent]: watchParent ? watchParent : null } : {};

      const params = {
        page: 1,
        keyword: inputVal ? inputVal : undefined,
        limit: 30,
        ...parentField,
        ...queryParams,
        sort_by: labelField
      };

      // if (isDisabled) {
      //   setLoading(false);
      //   return;
      // }

      getAllByPath(pathService, params, source.token)
        .then((response: any) => {
          const newOptions = response?.results.map((d: any) => ({
            label: d[labelField],
            value: d[valueField],
            color: d.color || '' // Default to empty string if color is not provided
          }));

          // Merge and deduplicate options
          const combinedOptions = [...newOptions, ...selectOptions];
          const uniqueOptions = Array.from(new Map(combinedOptions.map(option => [option.value, option])).values());

          setLoading(false);
          if (callback) {
            callback(uniqueOptions);
          }

          setSelectOptions(uniqueOptions);
        })
        .catch(() => {
          setLoading(false);
          if (callback) callback([]);
          else setSelectOptions([]);
        });
    } catch {
      setLoading(false);
    }
  };

  const loadOptions = (keyword: string, callback: (options: IOption[]) => void) => {
    const parentField = fieldNameParent ? { [fieldNameParent]: watchParent ? watchParent : null } : {};
    const paramsRequest: any = {
      page: 1,
      size: 30,
      keyword: keyword ? keyword : undefined,
      ...queryParams,
      ...parentField,
    };

    getAllByPath(pathService, paramsRequest, source.token)
      .then((response: any) => {
        const newOptions = response?.results.map((d: any) => ({
          label: d[labelField],
          value: d[valueField],
          color: d.color || '' // Default to empty string if color is not provided
        }));

        // Merge and deduplicate options
        const combinedOptions = [...newOptions, ...selectOptions];
        const uniqueOptions = Array.from(new Map(combinedOptions.map(option => [option.value, option])).values());

        setSelectOptions(uniqueOptions);
        if (callback) callback(uniqueOptions);
      })
      .catch(() => {
        setLoading(false);
        if (callback) callback([]);
        else setSelectOptions([]);
      });
  };

  const debouncedSearchHandler = debounce(loadOptions, 1000);

  useEffect(() => {
    if (idParent && watchParent && idParent !== watchParent) {
      if (setValue) setValue(fieldName, null);
    }
    setIdParent(watchParent);
    getSelectOptions(undefined);
  }, [watchParent]);

  useEffect(() => {
    return () => {
      source.cancel();
      setSelectOptions([]);
    };
  }, []);

  useEffect(() => {
    if (options) {
      const checkOptionExist = selectOptions.find((f: IOption) => f?.value === options[valueField]);
      if (!checkOptionExist) {
        const newOption = [{ label: options[labelField], value: options[valueField], color: '' }];
        const combinedOptions = [...newOption, ...selectOptions];
        const uniqueOptions = Array.from(new Map(combinedOptions.map(option => [option.value, option])).values());
        setSelectOptions(uniqueOptions);
      }
    }
  }, [options, selectOptions]);

  return (
    <>
      <Controller
        control={control}
        defaultValue={[]}
        name={fieldName}
        rules={{ required: required }}
        render={({ field: { onChange, value, ref } }) => (
          <AsyncSelect
            placeholder={placeholder}
            ref={ref}
            value={isMulti
              ? selectOptions.filter((option: IOption) => value?.includes(option.value)) // Check for null or undefined value
              : selectOptions.find((c: IOption) => c.value === value)
            }
            onChange={(val: any) => {
              if (isMulti) {
                // For multi-select, update the value array as a comma-separated string
                const selectedValues = val ? val.map((x: any) => x.value).join(',') : '';
                onChange(selectedValues);
                setMenuIsOpen(true); // Keep dropdown open after selection
              } else {
                // For single select, update the value
                onChange(val ? val.value : null);
              }
            }}
            
            classNamePrefix={`${get(errors, fieldName) ? 'is-invalid' : ''}`}
            loadOptions={debouncedSearchHandler}
            defaultOptions={selectOptions}
            styles={styles}
            isLoading={loading}
            isDisabled={isDisabled}
            isClearable={isClearable}
            isMulti={isMulti}
            menuIsOpen={menuIsOpen} // Control dropdown open state
            onMenuOpen={() => setMenuIsOpen(true)} // Open dropdown
            onMenuClose={() => setMenuIsOpen(false)} // Close dropdown
            components={{ Option: CustomOption }} // Use custom option component
          />
        )}
      />

      {get(errors, fieldName) && (
        <div className='invalid-feedback d-block'>
          {get(errors, fieldName)?.message}
        </div>
      )}
    </>
  );
}

interface ISelectAsyncDynamic {
  pathServiceName: string;
  path?: string;
  labelField: any;
  valueField: any;
  queryParams?: any;
  fieldName: string;
  fieldNameParent?: string;
  watchParent?: any;
  control: any;
  errors: any;
  placeholder?: string;
  setValue?: any;
  isDisabled?: boolean;
  isClearable?: boolean;
  isSearchable?: boolean;
  isMulti?: boolean;
  required?: boolean;
  options?: any;
  defaultValue?: any;
  styles?: any;
}

export default SelectAsyncDynamicCheckBox;
