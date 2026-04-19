import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getObjectKeys, objectKeyChanger } from '@app/helper/object.helper';
import { get, pick, size, isEqual } from 'lodash';
import qs from 'query-string';
import { useDispatch } from 'react-redux';
import { setActiveFilters } from '@app/store/reducers/ui';
import moment from 'moment';

interface IFiltersForm {
  children?: any;
  setError: any;
  setValue: any;
  dataParams: any;
  fields?: any;
  onLoading?: any;
  customLabel?: any;
  overrideType?: any;
}

function FiltersForm({
  children,
  setValue,
  dataParams,
  fields = {},
  overrideType,
}: IFiltersForm) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryParams = qs.parse(location.search);
  const previousParams = useRef(queryParams); // Store previous query params

  /** Update URL if dataParams changes significantly */
  useEffect(() => {
    if (dataParams) {
      // console.log("IF FiltersForm dataParams", dataParams);
      const params = Object.fromEntries(Object.entries(dataParams).filter(value => value[1]))
      const qParams = objectKeyChanger(params, 'id_', '__');
      // console.log("qParams", qParams);

      navigate({
        search: '?' + qs.stringify(qParams),
      });
    }
  }, [dataParams]);

  /** INIT FILTERS QUERY PARAMS */
  useEffect(() => {
    if (location?.search) {
      initDataForm(queryParams);
    } else {
      initDataForm(undefined);
    }
  }, [location?.search]);

  /** INIT DATA FORM EDIT OR NEW DATA */
  const initDataForm = (data: any = undefined) => {
    // Mengubah dan memetakan data yang diterima menjadi valueData, mengganti '__' menjadi 'id_'
    const valueData = data ? pick(objectKeyChanger(data, '__', 'id_'), getObjectKeys(fields)) : fields;
  
    // Menetapkan nilai ke form tanpa pengecualian untuk id
    Object.keys(valueData).map((field: any) => {
      const overrideCheck = get(overrideType, field);
      let v = overrideCheck === 'string' ? `${valueData[field]}` : valueData[field];
      v = overrideCheck === 'int' ? parseInt(valueData[field]) : v;
      v = overrideCheck === 'float' ? parseFloat(valueData[field]) : v;
      v = overrideCheck === 'date' ? moment(valueData[field], 'YYYY-MM-DD HH:mm').format('YYYY-MM-DD[T]HH:mm') : v;
  
      setValue(field, v);
    });
  
    // Filter data untuk menyimpan nilai-nilai yang tidak kosong
    const f: any = Object.keys(valueData)
      ?.filter((key: any) => valueData[key])
      .reduce((cur, key) => {
        const overrideCheck = get(overrideType, key);
        let val: any = valueData[key];
        if (overrideCheck === 'date') val = moment(valueData[key]).format('YYYY-MM-DD HH:mm');
  
        return { ...cur, [key]: val };
      }, {});
  
    // Hapus hanya kunci yang benar-benar tidak diperlukan
    if (f?.operator && f?.satuan && f?.nilai) {
      delete f.operator;
      delete f.satuan;
      delete f.nilai;
    }
  
    // Membuat objek aktif dengan filter yang valid
    const active = { filters: f, count: size(f) };
  
    // Dispatch hanya jika filter berubah
    if (!isEqual(active.filters, previousParams.current)) {
      dispatch(setActiveFilters(active));
      previousParams.current = active.filters; // Update reference for comparison
    }
  };
  

  useEffect(() => {
    return () => {
      dispatch(setActiveFilters({ filters: {}, count: 0 }));
    };
  }, [dispatch]);

  return (
    <>
      {children}
    </>
  );
}

export default FiltersForm;
