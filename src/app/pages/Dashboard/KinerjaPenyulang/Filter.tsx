import React, { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import FiltersForm from '@app/modules/Filters/FilterForm';
import FilterActionButton from '@app/modules/Filters/FilterActionButton';
import SelectAsyncDynamic from '@app/modules/SelectForm/SelectAsyncDynamic';
import { JENIS_LOKASI } from '@app/configs/jenis-lokasi.config';
import InputRangeDate from '@app/components/Date/InputRangeDate';

export default function Filter() {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();

  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    ufr: Yup.string(),
    // .typeError('Tanggal wajib diisi').required('Tanggal wajib diisi'),   
  });

  const [formModel] = useState<any>({});
  const {
    handleSubmit,
    setValue,
    setError,
    control,
    formState,
    register
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: formModel,
  });
  const { errors }: any = formState || {};
  /** SUBMIT FORM HANDLING */
  const onSubmitForm = (data: any) => {
    setDataParams(data);
  };

  return (
    <>
      <FiltersForm
        setError={setError}
        setValue={setValue}
        dataParams={dataParams}
        onLoading={setLoading}
      >
        <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
          <Row>
            <Col md={12} className="mb-3">

              <InputRangeDate control={control} register={register} />
            </Col>
            <Col md={6} className="mb-3">

              <Form.Group controlId='general_mode'>
                <Form.Label>UP3 </Form.Label>
                <SelectAsyncDynamic
                  fieldName='id_ref_lokasi'
                  pathServiceName='master.jaringan.ref_lokasi'
                  labelField='nama_lokasi'
                  valueField='id_penyulang'
                  placeholder='Pilih...'
                  isClearable={true}
                  errors={errors}
                  control={control}
                  queryParams={{
                    page: -1,
                    limit: 10,
                    id_ref_jenis_lokasi: JENIS_LOKASI().up3
                  }}
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">

              <Form.Group controlId='general_mode'>
                <Form.Label>Zona </Form.Label>
                <SelectAsyncDynamic
                  fieldName='id_ref_lokasi'
                  pathServiceName='master.jaringan.ref_lokasi'
                  labelField='nama_lokasi'
                  valueField='id_penyulang'
                  placeholder='Pilih...'
                  isClearable={true}
                  errors={errors}
                  control={control}
                  queryParams={{
                    page: -1,
                    limit: 10,
                    id_ref_jenis_lokasi: JENIS_LOKASI().zone
                  }}
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group controlId='general_mode'>
                <Form.Label>ULP </Form.Label>
                <SelectAsyncDynamic
                  fieldName='id_ref_lokasi'
                  pathServiceName='master.jaringan.ref_lokasi'
                  labelField='nama_lokasi'
                  valueField='id_penyulang'
                  placeholder='Pilih...'
                  isClearable={true}
                  errors={errors}
                  control={control}
                  queryParams={{
                    page: -1,
                    limit: 10,
                    id_ref_jenis_lokasi: JENIS_LOKASI().ulp
                  }}
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">

              <Form.Group controlId='general_mode'>
                <Form.Label>Penyulang/OG/RC </Form.Label>
                <SelectAsyncDynamic
                  fieldName='id_ref_lokasi'
                  pathServiceName='master.jaringan.ref_lokasi'
                  labelField='nama_lokasi'
                  valueField='id_penyulang'
                  placeholder='Pilih...'
                  isClearable={true}
                  errors={errors}
                  control={control}
                  queryParams={{
                    page: -1,
                    limit: 10,
                    id_ref_jenis_lokasi: JENIS_LOKASI().penyulang
                  }}
                />
              </Form.Group>
            </Col>
          </Row>
          <FilterActionButton loading={loading} onClickReset={() => onSubmitForm(null)}></FilterActionButton>
        </Form>
      </FiltersForm>
    </>
  );
}
