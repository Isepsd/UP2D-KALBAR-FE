import React, { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import axios from 'axios';
import { debounce, get, orderBy} from 'lodash';
import AsyncSelect from 'react-select/async';
import { getAllByPath } from '@app/services/main.service';
import { ReactSelectStyle } from '@app/configs/react-select.config';
import { API_PATH } from '@app/services/_path.service';

interface IOption {
  readonly value: string;
  readonly label: string;
  readonly color: string;
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
  // sortBy = 'name',
  // sortType = 'asc',
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
  const [pathService] = useState<string>(path ? path : get(API_PATH(), pathServiceName))

  const getSelectOptions = (
    inputVal: any,
    callback?: (options: IOption[]) => void
  ) => {

    setLoading(true);

    try {
      const parentField = fieldNameParent ? { [fieldNameParent]: watchParent ? watchParent : null } : {}

      const params = {
        page: 1,
        // sort_by: sortType == 'desc' ? '-' : '' + sortBy,
        keyword: inputVal ? inputVal : undefined,
        limit: 30,
        ...parentField,
        ...queryParams,
        sort_by: labelField
      };

      if (isDisabled) {
        setLoading(false)
        return false
      }

      getAllByPath(pathService, params, source.token)
        .then((response: any) => {
          let data = response?.results.map((d: any) => {
            let label: any = d[labelField]
            if (d?.jabatan?.nama) {
              label = `${d[labelField]} - ${d?.jabatan?.nama}`
            }
            return {
              label: label,
              value: d[valueField]
            };
          });

          setLoading(false);
          if (callback && data) {
            callback(data);
          }

          setSelectOptions(data);
          setSelectOptionsTemp(data)
        })
        .catch(function () {
          setLoading(false);
          if (callback) callback([]);
          else setSelectOptions([]);
        });
    } catch {
      setLoading(false);
    }
  };

  const loadOptions = (keyword: string, callback: any) => {
    const parentField = fieldNameParent ? { [fieldNameParent]: watchParent ? watchParent : null } : {}
    const paramsRequest: any = {
      page: 1,
      size: 30,
      keyword: keyword ? keyword : undefined,
      ...queryParams,
      ...parentField,
    };
    // console.log('masuk');
    getAllByPath(pathService, paramsRequest, source.token)
      .then((response: any) => {
        let data = response?.results.map((d: any) => {
          return { label: d[labelField], value: d[valueField] };
        });

        const newOptions = [...data, ...selectOptions]
        // setSelectOptions(orderBy(uniqBy(newOptions, 'value'), 'label', 'asc'))
        // selectOptionsTemp(orderBy(uniqBy(newOptions, 'value'), 'label', 'asc'))
        setSelectOptions(newOptions);
        setSelectOptionsTemp(newOptions)
        if (callback) callback(data);
      })
      .catch(function () {
        setLoading(false)
        if (callback) callback([]);
        else {
          setSelectOptions([]);
          setSelectOptionsTemp([])
        }
      });
  };

  /** SEARCH HANDLER AND DEBOUNCE */
  // const debouncedSearchHandler = debounce(getSelectOptions, 1000);
  const debouncedSearchHandler = debounce(loadOptions, 1000);

  useEffect(() => {
    if (idParent && watchParent && idParent != watchParent) {
      if (setValue) setValue(fieldName, null);
    }
    setIdParent(watchParent);
    getSelectOptions(undefined);
  }, [watchParent]);

  useEffect(() => {
    return () => {
      source.cancel();
      setSelectOptions(undefined);
    };
  }, []);


  useEffect(() => {
    if (options && selectOptionsTemp) {
      const checkOptionExist = get(selectOptionsTemp.filter((f: any) => f?.value == options[valueField]), '0')
      if (!checkOptionExist) {
        const prepandOptions = [{ label: options[labelField], value: options[valueField] }]
        const o = orderBy([...prepandOptions, ...selectOptions], ['label'], ['asc'])
        setSelectOptions(o)
      }
    }
  }, [options, selectOptionsTemp])

  return (
    <>
      <Controller
        control={control}
        defaultValue={''}
        name={fieldName}
        rules={{
          required: required,
        }}
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
                        selectOptions?.filter(
                          (y: any) => x == y.value
                        )[0]
                    )
                    : []
                }
                onChange={(val: any) =>
                  onChange(val.map((x: any) => x.value))
                }
                classNamePrefix={`${get(errors, fieldName) ? 'is-invalid' : ''}`}
                loadOptions={debouncedSearchHandler}
                defaultOptions={selectOptions}
                styles={styles}
                isLoading={loading}
                isDisabled={isDisabled}
                isClearable={isClearable}
                isMulti={isMulti}
              />
            ) : (
              <>
                <AsyncSelect
                  placeholder={placeholder}
                  ref={ref}
                  value={selectOptions?.filter((c: any) => c.value == value)}
                  onChange={(val: any) => { onChange(val?.value ? val?.value : null); }}
                  classNamePrefix={`${get(errors, fieldName) ? 'is-invalid' : ''}`}
                  loadOptions={debouncedSearchHandler}
                  defaultOptions={selectOptions}
                  styles={styles}
                  isLoading={loading}
                  isDisabled={isDisabled}
                  isClearable={isClearable}
                /></>
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
  labelField: any,
  valueField: any,
  queryParams?: any;
  // sortBy?: string,
  // sortType?: string;
  fieldName: string;
  fieldNameParent?: string;
  watchParent?: any;
  control: any;
  errors: any;
  placeholder?: string;
  setValue?: any
  isDisabled?: boolean;
  isClearable?: boolean;
  isSearchable?: boolean;
  isMulti?: boolean;
  required?: boolean
  options?: any
  defaultValue?: any;
  styles?: any
}

export default SelectAsyncDynamic;
