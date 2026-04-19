import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getObjectKeys, objectKeyChanger } from '@app/helper/object.helper';
import { get, pick, size } from 'lodash';
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
    const valueData = data ? pick(objectKeyChanger(data, '__', 'id_'), getObjectKeys(fields)) : fields;
    Object.keys(valueData).map((field: any) => {
      const overrideCheck = get(overrideType, field);
      let v = overrideCheck == 'string' ? `${valueData[field]}` : valueData[field];
      v = overrideCheck == 'int' ? parseInt(valueData[field]) : v;
      v = overrideCheck == 'float' ? parseFloat(valueData[field]) : v;
      v = overrideCheck == 'date' ? moment(valueData[field], 'YYYY-MM-DD HH:mm').format('YYYY-MM-DD[T]HH:mm') : v;

      setValue(field, v);
    });

    const f: any = Object.keys(valueData)
      ?.filter((key: any) => valueData[key])
      .reduce((cur, key) => {
        const overrideCheck = get(overrideType, key);
        let val: any = valueData[key]
        if (overrideCheck == 'date') val = moment(valueData[key]).format('YYYY-MM-DD HH:mm')

        return Object.assign(cur, { [key]: val });
      }, {});

    // Tracing Beban  
    // if ((f?.beban_puncak == 'hari') || (f?.beban_puncak == 'bulan') || (f?.beban_puncak == 'tahun') || (f?.beban_puncak == undefined || f?.beban_puncak == '')) {
    //   if (f?.operator == '=' && f?.satuan == 'Arus') {
    //     f.i_exact = f.nilai;
    //   }

    //   if (f?.operator == '>=' && f?.satuan == 'Arus') {
    //     f.i_gte = f.nilai;
    //   }

    //   if (f?.operator == '<=' && f?.satuan == 'Arus') {
    //     f.i_lte = f.nilai;
    //   }

    //   if (f?.operator == '=' && f?.satuan == 'MW') {
    //     f.p_exact = f.nilai;
    //   }

    //   if (f?.operator == '>=' && f?.satuan == 'MW') {
    //     f.p_gte = f.nilai;
    //   }

    //   if (f?.operator == '<=' && f?.satuan == 'MW') {
    //     f.p_lte = f.nilai;
    //   }
    // }
    // else if (f?.beban_puncak == 'max_siang') {
    //   console.log("max_siang");

    //   if (f?.operator == '=' && f?.satuan == 'Arus') {
    //     f.i_max_siang_exact = f.nilai;
    //   }

    //   if (f?.operator == '>=' && f?.satuan == 'Arus') {
    //     f.i_max_siang_gte = f.nilai;
    //   }

    //   if (f?.operator == '<=' && f?.satuan == 'Arus') {
    //     f.i_max_siang_lte = f.nilai;
    //   }

    //   if (f?.operator == '=' && f?.satuan == 'MW') {
    //     f.p_max_siang_exact = f.nilai;
    //   }

    //   if (f?.operator == '>=' && f?.satuan == 'MW') {
    //     f.p_max_siang_gte = f.nilai;
    //   }

    //   if (f?.operator == '<=' && f?.satuan == 'MW') {
    //     f.p_max_siang_lte = f.nilai;
    //   }
    // } else if (f?.beban_puncak == 'max_malam') {
    //   console.log("max_malam");
    //   if (f?.operator == '=' && f?.satuan == 'Arus') {
    //     f.i_max_malam_exact = f.nilai;
    //   }

    //   if (f?.operator == '>=' && f?.satuan == 'Arus') {
    //     f.i_max_malam_gte = f.nilai;
    //   }

    //   if (f?.operator == '<=' && f?.satuan == 'Arus') {
    //     f.i_max_malam_lte = f.nilai;
    //   }

    //   if (f?.operator == '=' && f?.satuan == 'MW') {
    //     f.p_max_malam_exact = f.nilai;
    //   }

    //   if (f?.operator == '>=' && f?.satuan == 'MW') {
    //     f.p_max_malam_gte = f.nilai;
    //   }

    //   if (f?.operator == '<=' && f?.satuan == 'MW') {
    //     f.p_max_malam_lte = f.nilai;
    //   }
    // }
    // else if (f?.beban_puncak == 'min_siang') {
    //   console.log("min_siang");

    //   if (f?.operator == '=' && f?.satuan == 'Arus') {
    //     f.i_min_siang_exact = f.nilai;
    //   }

    //   if (f?.operator == '>=' && f?.satuan == 'Arus') {
    //     f.i_min_siang_gte = f.nilai;
    //   }

    //   if (f?.operator == '<=' && f?.satuan == 'Arus') {
    //     f.i_min_siang_lte = f.nilai;
    //   }

    //   if (f?.operator == '=' && f?.satuan == 'MW') {
    //     f.p_min_siang_exact = f.nilai;
    //   }

    //   if (f?.operator == '>=' && f?.satuan == 'MW') {
    //     f.p_min_siang_gte = f.nilai;
    //   }

    //   if (f?.operator == '<=' && f?.satuan == 'MW') {
    //     f.p_min_siang_lte = f.nilai;
    //   }
    // } else if (f?.beban_puncak == 'min_malam') {
    //   console.log("min_malam");
    //   if (f?.operator == '=' && f?.satuan == 'Arus') {
    //     f.i_min_malam_exact = f.nilai;
    //   }

    //   if (f?.operator == '>=' && f?.satuan == 'Arus') {
    //     f.i_min_malam_gte = f.nilai;
    //   }

    //   if (f?.operator == '<=' && f?.satuan == 'Arus') {
    //     f.i_min_malam_lte = f.nilai;
    //   }

    //   if (f?.operator == '=' && f?.satuan == 'MW') {
    //     f.p_min_malam_exact = f.nilai;
    //   }

    //   if (f?.operator == '>=' && f?.satuan == 'MW') {
    //     f.p_min_malam_gte = f.nilai;
    //   }

    //   if (f?.operator == '<=' && f?.satuan == 'MW') {
    //     f.p_min_malam_lte = f.nilai;
    //   }
    // } else if (f?.beban_puncak == 'avg') {
    //   console.log("avg");
    //   if (f?.operator == '=' && f?.satuan == 'Arus') {
    //     f.i_avg_exact = f.nilai;
    //   }

    //   if (f?.operator == '>=' && f?.satuan == 'Arus') {
    //     f.i_avg_gte = f.nilai;
    //   }

    //   if (f?.operator == '<=' && f?.satuan == 'Arus') {
    //     f.i_avg_lte = f.nilai;
    //   }

    //   if (f?.operator == '=' && f?.satuan == 'MW') {
    //     f.p_avg_exact = f.nilai;
    //   }

    //   if (f?.operator == '>=' && f?.satuan == 'MW') {
    //     f.p_avg_gte = f.nilai;
    //   }

    //   if (f?.operator == '<=' && f?.satuan == 'MW') {
    //     f.p_avg_lte = f.nilai;
    //   }
    // }


    if (f?.operator && f?.satuan && f?.nilai) {
      delete f.operator;
      delete f.satuan;
      delete f.nilai;
    }

    // if(f?.beban_puncak) {
    //   delete f.beban_puncak;
    // }

    const active = { filters: f, count: size(f) };
    dispatch(setActiveFilters(active));
  };

  useEffect(() => {
    return () => {
      dispatch(setActiveFilters({ filters: {}, count: 0 }))
    }
  }, [])


  return (
    <>
      {children}
    </>
  );
}

export default FiltersForm;
