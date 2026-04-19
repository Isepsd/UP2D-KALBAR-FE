import React, { useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';

import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import FiltersForm from '@app/modules/Filters/FilterForm';
import FilterActionButton from '@app/modules/Filters/FilterActionButton';
import SelectAsyncDynamic from '@app/modules/SelectForm/SelectAsyncDynamic';
import { JENIS_LOKASI } from '@app/configs/jenis-lokasi.config';

export default function FilterForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();
  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    id_gardu_induk: Yup.number().typeError("Gardu induk tidak valid").nullable(),
    keyword: Yup.string().nullable()
    // .typeError('Tanggal wajib diisi').required('Tanggal wajib diisi'),   
  });

  const [formModel] = useState<any>({});
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
    // console.log("data", data);

    setDataParams(data);
  };
  const watchGarduInduk = useWatch({ control, name: 'id_gardu_induk' });

  useEffect(() => {
    onSubmitForm(null)
  }, [watchGarduInduk])

  return (
    <>
      <FiltersForm
        setError={setError}
        setValue={setValue}
        dataParams={dataParams}
        onLoading={setLoading}
        fields={{ keyword: null, id_gardu_induk: null }}
      >
        <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
          <Row>
            <Col md={3} className="mt-2">
              <Form.Group className='' controlId='general_mode'>
                <Form.Label>Gardu Induk</Form.Label>
                <SelectAsyncDynamic
                  fieldName="id_gardu_induk"
                  control={control}
                  errors={errors}
                  labelField={'nama_lokasi'}
                  valueField={'id_ref_lokasi'}
                  pathServiceName={'master.jaringan.ref_lokasi'}
                  queryParams={{ id_ref_jenis_lokasi: JENIS_LOKASI().gardu_induk }}
                  setValue={setValue}
                />
                {errors.ufr && (
                  <div className='invalid-feedback d-block'>
                    {errors.id_gardu_induk?.message}
                  </div>
                )}
              </Form.Group>
            </Col>
            <Col md={3} className="mt-2">
              <Form.Group className='' controlId='general_mode'>
                <Form.Label>Keyword</Form.Label>
                <Form.Control
                  placeholder='cari penyulang'
                  {...register('keyword')}
                />
              </Form.Group>
            </Col>
            {/* <Col md={3} className="mt-2">
              <Form.Group className='' controlId='general_mode'>
                <Form.Label>UFR</Form.Label>
                <Controller
                  control={control}
                  defaultValue={''}
                  name='ufr'
                  rules={{
                    required: false,
                  }}
                  render={({ field: { onChange, value, ref } }) => (
                    <Select
                      placeholder='Pilih UFR'
                      styles={ReactSelectStyle}
                      classNamePrefix={`${errors.ufr ? 'is-invalid' : ''}`}
                      inputRef={ref}
                      value={optionData?.filter(
                        (c: any) => c.value == value
                      )}
                      onChange={(val: any) => onChange(val?.value)}
                      options={optionData}
                    // isClearable={true}
                    />
                  )}
                />
                {errors.ufr && (
                  <div className='invalid-feedback d-block'>
                    {errors.ufr?.message}
                  </div>
                )}
              </Form.Group>
            </Col> */}
            <Col md={3} className="mt-3">
              <FilterActionButton className="justify-content-start" loading={loading} onClickReset={() => onSubmitForm(null)} />

            </Col>
          </Row>
        </Form>
      </FiltersForm>
    </>
  );
}
