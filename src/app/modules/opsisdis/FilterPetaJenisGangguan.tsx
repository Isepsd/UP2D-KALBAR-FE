import React, { useEffect, useState } from 'react';
import { Form, Row } from 'react-bootstrap';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import FiltersForm from '@app/modules/Filters/FilterForm';
import SelectAsyncDynamic from '@app/modules/SelectForm/SelectAsyncDynamic';
import FilterActionButton from '@app/modules/Filters/FilterActionButton';
import moment from 'moment';
// import { timeFormSelect } from '@app/helper/time.helper';
import qs from 'query-string';
import FInputDateRange from '../Filters/FInputDateRange';
import { JENIS_LOKASI } from '@app/configs/jenis-lokasi.config';

// interface IFilterPetaJenisGangguan {
//   labelParent: string;
//   id_jenis_lokasi: any
//   parentFiled?: string
// }

export default function FilterPetaJenisGangguan() {
  const queryParams = qs.parse(location.search);
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();
  // const [optionsTimes, setOptionsTimes] = useState<any>([]);
  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    date: Yup.string().typeError('Tanggal wajib diisi').required('Tanggal wajib diisi'),
    // time: Yup.string().typeError('Time wajib diisi').required('Time wajib diisi'),
    id_parent_lokasi: Yup.string().typeError('Unit pembangkit wajib diisi').required('Unit pembangkit wajib diisi'),
  });

  const [formModel] = useState<any>({
    date: null,
    id_parent_lokasi: null,
  });

  const {
    handleSubmit,
    setValue,
    setError,
    control,
    register,
    formState,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: formModel,
  });

  const { errors }: any = formState || {};
  /** SUBMIT FORM HANDLING */
  const onSubmitForm = (data: any) => {
    if (data?.date) {
      data.date = moment(data?.date).format('YYYY-MM-DD')
    }
    setDataParams(data);
  };

  useEffect(() => {
    setValue("date", queryParams?.date ? queryParams?.date : moment().format('YYYY-MM-DD'))
    setValue("id_parent_lokasi", queryParams?.id_parent_lokasi ? queryParams?.id_parent_lokasi : null)
  }, [queryParams?.date, queryParams?.id_parent_lokasi])

  // console.log("errors", errors);


  return (
    <>
      <FiltersForm
        setError={setError}
        setValue={setValue}
        dataParams={dataParams}
        onLoading={setLoading}
        fields={{ id_ref_lokasi: undefined }}
      >
        <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
          <Form.Group as={Row} className='mb-1'>
            <Form.Label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Tanggal</Form.Label>
            <div className="col-sm-10">
              <FInputDateRange
                control={control}
                dt1={'dt1'}
                dt2={'dt2'}
                register={register} />
            </div>
          </Form.Group>
          <Form.Group className='row mb-2'>
            <Form.Label htmlFor="inputEmail3" className="col-sm-2 col-form-label">UP3</Form.Label>
            <div className="col-sm-10">
              <SelectAsyncDynamic
                fieldName='id_parent_lokasi'
                pathServiceName='master.jaringan.ref_lokasi'
                labelField='nama_lokasi'
                valueField='id_ref_lokasi'
                placeholder='Pilih...'
                isClearable={true}
                errors={errors}
                control={control}
                queryParams={{
                  page: -1,
                  limit: 10,
                  sort_by: 'nama_lokasi',
                  id_ref_jenis_lokasi: JENIS_LOKASI().up3
                }}
              />
            </div>
          </Form.Group>
          <Form.Group className='row mb-2'>
            <Form.Label htmlFor="inputEmail3" className="col-sm-2 col-form-label">ULP</Form.Label>
            <div className="col-sm-10">
              <SelectAsyncDynamic
                fieldName='id_parent_lokasi'
                pathServiceName='master.jaringan.ref_lokasi'
                labelField='nama_lokasi'
                valueField='id_ref_lokasi'
                placeholder='Pilih...'
                isClearable={true}
                errors={errors}
                control={control}
                queryParams={{
                  page: -1,
                  limit: 10,
                  sort_by: 'nama_lokasi',
                  id_ref_jenis_lokasi: JENIS_LOKASI().ulp
                }}
              />
            </div>
          </Form.Group>

          <FilterActionButton className="justify-content-start" loading={loading} onClickReset={() => onSubmitForm(null)} />

        </Form>
      </FiltersForm>
    </>
  );
}
