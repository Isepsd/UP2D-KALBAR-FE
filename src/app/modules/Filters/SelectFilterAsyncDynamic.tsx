import React, { useEffect, useState } from 'react';
import { Controller, useWatch } from 'react-hook-form';
import axios from 'axios';
import { debounce, get } from 'lodash';
import AsyncSelect from 'react-select/async';
import { ReactSelectStyle } from '@app/configs/react-select.config';
import { getAllByPath } from '@app/services/main.service';
import { API_PATH } from '@app/services/_path.service';

interface ISelectFilterAsyncDynamic {
  pathServiceName?: string;
  labelField: any,
  valueField: any,
  queryParams?: any;
  sortBy?: string,
  sortType?: string;
  fieldName: string;
  watchParentField?: any;
  control: any;
  errors: any;
  placeholder?: string;
  setValue?: any
  isDisabled?: boolean; 
}

function SelectFilterAsyncDynamic({
  control, 
  errors,
  fieldName,
  watchParentField,
  placeholder = 'Pilih...',
  pathServiceName = "",
  labelField,
  valueField,
  queryParams = {},
  sortBy = 'nama',
  sortType = 'asc',
  setValue,
  isDisabled = false
}: ISelectFilterAsyncDynamic) {
  const source = axios.CancelToken.source();
  const [selectOptions, setSelectOptions] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [idParent, setIdParent] = useState()
  const watchParent = useWatch({ control, name: watchParentField });

  const getSelectOptions = (
    inputVal: any,
    callback: any = undefined
  ) => {
    setLoading(true);

    try {
      const params = {
        page: 1,
        limit:15,
        sort_by: sortBy,
        sort_type: sortType,
        keyword: inputVal ? inputVal : undefined,
        ...queryParams
      };

      getAllByPath(get(API_PATH(), pathServiceName), params, source.token)
        .then((response: any) => {
          let data = response?.results.map((d: any) => {
            return { label: d[labelField], value: d[valueField] };
          });

          setLoading(false);
          setSelectOptions(data);
        })
        .catch(function () {
          if (callback) callback([]);
          else setSelectOptions([]);
        });
    } catch {
      setLoading(false);
    }
  };

  /** SEARCH HANDLER AND DEBOUNCE */
  const debouncedSearchHandler = debounce(getSelectOptions, 1000);

  useEffect(() => {
    if (idParent != watchParent) {
      if (setValue) setValue(fieldName, null)
    }
    setIdParent(watchParent)
    getSelectOptions(undefined);
  }, [watchParent]);

  useEffect(() => {
    return () => {
      source.cancel();
      setSelectOptions(undefined);
    };
  }, []);
  return (
    <>
      <Controller
        control={control}
        defaultValue={''}
        name={fieldName}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, value, ref } }) => (
          <AsyncSelect
            placeholder={placeholder}
            inputRef={ref}
            value={selectOptions?.filter((c: any) => c.value == value)}
            onChange={(val: any) => onChange(val?.value)}
            classNamePrefix={`${errors[fieldName] ? 'is-invalid' : ''}`}
            loadOptions={debouncedSearchHandler}
            defaultOptions={selectOptions}
            styles={ReactSelectStyle}
            isLoading={loading}
            isDisabled={isDisabled}
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

export default SelectFilterAsyncDynamic