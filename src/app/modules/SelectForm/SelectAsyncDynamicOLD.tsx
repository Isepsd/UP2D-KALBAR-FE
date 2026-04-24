import React, { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import axios from 'axios';
import { debounce, get, orderBy } from 'lodash';
import AsyncSelect from 'react-select/async';
import { getAllByPath } from '@app/services/main.service';
import { ReactSelectStyle } from '@app/configs/react-select.config';
import { API_PATH } from '@app/services/_path.service';

interface IOption {
  readonly value: string;
  readonly label: string;
  readonly color?: string;
  readonly isFixed?: boolean;
  readonly isDisabled?: boolean;
}

function SelectAsyncDynamic({
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
  styles = ReactSelectStyle,
  options,
}: ISelectAsyncDynamic) {
  const source = axios.CancelToken.source();
  const [selectOptions, setSelectOptions] = useState<any>();
  const [selectOptionsTemp, setSelectOptionsTemp] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [idParent, setIdParent] = useState();
  const [pathService] = useState<string>(
    path ? path : get(API_PATH(), pathServiceName)
  );

  /** Fungsi utama fetch + search */
  const getSelectOptions = (
    inputVal: any,
    callback?: (options: IOption[]) => void
  ) => {
    setLoading(true);

    try {
      const parentField = fieldNameParent
        ? { [fieldNameParent]: watchParent ? watchParent : null }
        : {};

      // search pakai labelField
      const searchParam = inputVal ? { [labelField]: inputVal } : {};

      const params = {
        page: 1,
        limit: 30,
        ...parentField,
        ...queryParams,
        ...searchParam,
        sort_by: labelField,
      };

      if (isDisabled) {
        setLoading(false);
        return false;
      }

      getAllByPath(pathService, params, source.token)
        .then((response: any) => {
          let data = response?.results.map((d: any) => {
            let label: any = d[labelField];
            if (d?.jabatan?.nama) {
              label = `${d[labelField]} - ${d?.jabatan?.nama}`;
            }
            return {
              label: label,
              value: d[valueField],
            };
          });

          setLoading(false);
          if (callback && data) callback(data);

          setSelectOptions(data);
          setSelectOptionsTemp(data);
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

  /** Debounce untuk search */
  const debouncedSearchHandler:any = debounce(getSelectOptions, 800);

  /** Reset jika parent berubah */
  useEffect(() => {
    if (idParent && watchParent && idParent !== watchParent) {
      if (setValue) setValue(fieldName, null);
    }
    setIdParent(watchParent);
    getSelectOptions(undefined);
  }, [watchParent]);

  /** Cleanup axios cancel */
  useEffect(() => {
    return () => {
      source.cancel();
      setSelectOptions(undefined);
    };
  }, []);

  /** Inject default option jika belum ada */
  useEffect(() => {
    if (options && selectOptionsTemp) {
      const checkOptionExist = get(
        selectOptionsTemp.filter((f: any) => f?.value === options[valueField]),
        '0'
      );
      if (!checkOptionExist) {
        const prependOptions = [
          { label: options[labelField], value: options[valueField] },
        ];
        const merged = orderBy(
          [...prependOptions, ...(selectOptions || [])],
          ['label'],
          ['asc']
        );
        setSelectOptions(merged);
      }
    }
  }, [options, selectOptionsTemp]);

  return (
    <>
      <Controller
        control={control}
        defaultValue={''}
        name={fieldName}
        rules={{ required: required }}
        render={({ field: { onChange, value, ref } }) => (
          <>
            {isMulti ? (
              <AsyncSelect
                placeholder={placeholder}
                ref={ref}
                value={
                  value
                    ? value?.map(
                        (x: any) =>
                          selectOptions?.filter((y: any) => x === y.value)[0]
                      )
                    : []
                }
                onChange={(val: any) =>
                  onChange(val.map((x: any) => x.value))
                }
                classNamePrefix={`${
                  get(errors, fieldName) ? 'is-invalid' : ''
                }`}
                loadOptions={debouncedSearchHandler}
                defaultOptions={selectOptions}
                styles={styles}
                isLoading={loading}
                isDisabled={isDisabled}
                isClearable={isClearable}
                isMulti={isMulti}
              />
            ) : (
              <AsyncSelect
                placeholder={placeholder}
                ref={ref}
                value={selectOptions?.filter((c: any) => c.value === value)}
                onChange={(val: any) =>
                  onChange(val?.value ? val?.value : null)
                }
                classNamePrefix={`${
                  get(errors, fieldName) ? 'is-invalid' : ''
                }`}
                loadOptions={debouncedSearchHandler}
                defaultOptions={selectOptions}
                styles={styles}
                isLoading={loading}
                isDisabled={isDisabled}
                isClearable={isClearable}
              />
            )}
          </>
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

export default SelectAsyncDynamic;
