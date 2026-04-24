import { JENIS_LOKASI } from '@app/configs/jenis-lokasi.config';
import { ReactSelectStyle } from '@app/configs/react-select.config';
import { getAllByPath } from '@app/services/main.service';
import { API_PATH } from '@app/services/_path.service';
import axios from 'axios';
import { debounce, get } from 'lodash';
import React, { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import AsyncSelect from 'react-select/async';

export default function SelectRefLokasi({
  control,
  fieldName,
  watchParent,
  errors,
  placeholder = 'Pilih...',
  pathServiceName = "master.jaringan.ref_lokasi",
  jenisLokasi,
  queryParams = {},
  setValue,
  isDisabled = false
}: ISelectRefLokasi) {
  const source = axios.CancelToken.source();
  const [selectOptions, setSelectOptions] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [idParent, setIdParent] = useState()

  const getSelectOptions = (
    inputVal: any,
    callback: any = undefined
  ) => {
    setLoading(true);

    try {
      const params = {
        page: -1,
        limit: 10,
        id_ref_jenis_lokasi: (JENIS_LOKASI() as any)[jenisLokasi],
        status_listrik: 1,
        id_parent_lokasi: watchParent ? watchParent : null,
        keyword: inputVal ? inputVal : undefined,
        ...queryParams
      };

      if (queryParams?.id_ref_jenis_lokasi_in) {
        delete params.id_ref_jenis_lokasi;
      }

      getAllByPath(get(API_PATH(), pathServiceName), params, source.token)
        .then((response: any) => {
          let data = response?.results.map((d: any) => {
            return { ...d, label: d.nama_lokasi, value: d.id_ref_lokasi };
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

interface ISelectRefLokasi {
  jenisLokasi: string;
  pathServiceName?: string;
  queryParams?: any;
  fieldName: string;
  control: any;
  watchParent?: any;
  errors: any;
  placeholder?: string;
  setValue?: any
  isDisabled?: boolean;
}
