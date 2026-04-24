import { ReactSelectStyle } from '@app/configs/react-select.config';
import { getAllByPath } from '@app/services/main.service';
import { API_PATH } from '@app/services/_path.service';
import axios from 'axios';
import { debounce } from 'lodash';
import React, { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import AsyncSelect from 'react-select/async';

function SelectJenisAsset({
  control,
  errors,
  fieldName,
  pathServiceName,
  labelField = 'nama_aset_jenis',
  valueField = 'id_ref_aset_jenis',
  placeholder = 'Pilih Jenis',
}: ISelectPembangkit) {
  const source = axios.CancelToken.source();
  const [selectOptions, setSelectOptions] = useState<any>();
  const [loading, setLoading] = useState(false);

  const getSelectOptions = (inputVal: any, callback: any = undefined) => {
    setLoading(true);

    try {
      const params = {
        page: -1,
        keyword: inputVal ? inputVal : undefined,
      };

      getAllByPath((API_PATH() as any).master.aset[pathServiceName], params, source.token)
        .then((response: any) => {
          let data = response?.results.map((d: any) => {
            return { ...d, label: d[labelField], value: d[valueField] };
          });

          setLoading(false);
          if (callback) callback(data);
          else setSelectOptions(data);
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
    getSelectOptions(undefined);
  }, []);

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
          />
        )}
      />
      {errors[fieldName] && (
        <div className='invalid-feedback d-block'>
          {errors[fieldName].message}
        </div>
      )}
    </>
  );
}

export default SelectJenisAsset

interface ISelectPembangkit {
  control: any;
  errors: any;
  fieldName: any,
  pathServiceName: any,
  labelField: any,
  valueField: any,
  placeholder?: string;
}
