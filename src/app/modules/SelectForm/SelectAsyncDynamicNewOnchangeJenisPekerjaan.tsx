import React, { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import axios from 'axios';
import { debounce, get, orderBy, uniqBy } from 'lodash';
import AsyncSelect from 'react-select/async';
import { getAllByPath } from '@app/services/main.service';
import { ReactSelectStyle } from '@app/configs/react-select.config';
import { API_PATH } from '@app/services/_path.service';

interface IOption {
  readonly value: string;
  readonly label: string;
}

function SelectAsyncDynamicNewOnchangeJenisPekerjaan({
  control,
  fieldName,
  fieldNameParent,
  watchParent,
  errors,
  placeholder = 'Pilih...',
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
  isLocked = false,
  styles = ReactSelectStyle,
  options,
  onChange,
}: ISelectAsyncDynamic) {
  const source = axios.CancelToken.source();
  const [selectOptions, setSelectOptions] = useState<IOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [idParent, setIdParent] = useState();
  const [inputValue, setInputValue] = useState('');
  const [pathService] = useState<string>(path ? path : get(API_PATH(), pathServiceName));

  const getSelectOptions = (inputVal: string, callback?: (options: IOption[]) => void) => {
    setLoading(true);

    try {
      const parentField = fieldNameParent ? { [fieldNameParent]: watchParent || null } : {};
      const params = {
        page: 1,
        keyword: inputVal || undefined,
        limit: 30,
        ...parentField,
        ...queryParams,
      };

      getAllByPath(pathService, params, source.token)
        .then((response: any) => {
          let data = response?.results.map((d: any) => ({
            label: d[labelField],
            value: d[valueField],
          }));

          data = orderBy(data, ['label'], ['asc']);
          setLoading(false);

          if (callback) callback(data);
          setSelectOptions(data);
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

  const loadOptions = (inputValue: string, callback: any) => {
    getSelectOptions(inputValue, (options) => {
      const filteredOptions = options.filter((option) =>
        option.label.toLowerCase().includes(inputValue.toLowerCase())
      );

      const combinedOptions = orderBy(uniqBy([...filteredOptions, ...selectOptions], 'value'), ['label'], ['asc']);
      callback(combinedOptions);
    });
  };

  const debouncedLoadOptions = debounce(loadOptions, 1000);

  useEffect(() => {
    if (idParent && watchParent && idParent !== watchParent) {
      if (setValue) setValue(fieldName, null);
    }
    setIdParent(watchParent);
    getSelectOptions('');
  }, [watchParent]);

  useEffect(() => {
    return () => {
      source.cancel();
    };
  }, []);

  useEffect(() => {
    if (options && selectOptions.length) {
      const checkOptionExist = selectOptions.find((opt) => opt.value === options[valueField]);
      if (!checkOptionExist) {
        const prependOptions = [{ label: options[labelField], value: options[valueField] }];
        setSelectOptions(orderBy(uniqBy([...prependOptions, ...selectOptions], 'value'), ['label'], ['asc']));
      }
    }
  }, [options, selectOptions]);

  return (
    <>
      <Controller
        control={control}
        defaultValue=""
        name={fieldName}
        rules={{ required }}
        render={({ field: { onChange: internalOnChange, value, ref } }) => {
          // ubah value agar support multiple
          const currentValue = isMulti
            ? selectOptions.filter((opt) =>
              (value ? value.split(',').map((v: string) => v.trim()) : []).includes(opt.label)
            )
            : selectOptions.find((opt) => opt.label === value) || null;


          return (
            <AsyncSelect
              placeholder={placeholder}
              ref={ref}
              value={currentValue}
              onChange={(selectedOption: any) => {
                if (!isLocked) {
                  if (isMulti) {
                    const stringValue = selectedOption
                      ? selectedOption.map((opt: any) => opt.label).join(', ')
                      : '';
                    internalOnChange(stringValue);
                    if (onChange) onChange(stringValue);
                  } else {
                    internalOnChange(selectedOption ? selectedOption.label : null);
                    if (onChange) onChange(selectedOption ? selectedOption.label : null);
                  }
                  setInputValue('');
                }
              }}
              onInputChange={(newValue, { action }) => {
                if (!isLocked && action === 'input-change') {
                  setInputValue(newValue);
                }
              }}
              classNamePrefix={`${get(errors, fieldName) ? 'is-invalid' : ''}`}
              loadOptions={debouncedLoadOptions}
              defaultOptions={orderBy(selectOptions, ['label'], ['asc'])}
              styles={styles}
              inputValue={inputValue}
              isLoading={loading}
              isDisabled={isDisabled || isLocked}
              isClearable={isClearable}
              isMulti={isMulti}
              isSearchable={!isLocked}
              onMenuOpen={() => {
                if (!isLocked && !isMulti) {
                  const selectedOption = selectOptions.find((opt) => opt.value === value);
                  if (selectedOption) {
                    setInputValue(selectedOption.label);
                  }
                }
              }}
            />
          );
        }}
      />
      {get(errors, fieldName) && (
        <div className="invalid-feedback d-block">
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
  isMulti?: boolean;
  required?: boolean;
  options?: any;
  defaultValue?: any;
  styles?: any;
  isLocked?: boolean;
  onChange?: (value: any) => void;
}

export default SelectAsyncDynamicNewOnchangeJenisPekerjaan;
