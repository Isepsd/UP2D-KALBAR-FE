import React, { useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';

import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import FiltersForm from '@app/modules/Filters/FilterForm';
import FilterActionButton from '@app/modules/Filters/FilterActionButton';
import SelectFormStatic from '@app/modules/SelectForm/SelectFormStatic';
import SelectAsyncDynamic from '@app/modules/SelectForm/SelectAsyncDynamic';
import { JENIS_LOKASI } from '@app/configs/jenis-lokasi.config';
export default function Filter({ optionsScada }: any) {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();
  // const [optionsTimes, setOptionsTimes] = useState<any>([]);
  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    id_induk_pointtype: Yup.string().typeError('Data wajib diisi').nullable(),
    jenispoint: Yup.string().typeError('Data wajib diisi').nullable(),
  });

  const [formModel] = useState<any>({
    jenispoint: null,
    id_induk_pointtype: null
  });

  const {
    handleSubmit,
    setValue,
    setError,
    control,
    formState,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: formModel,
  });
  const { errors }: any = formState || {};

  const idPointWatch = useWatch({ control, name: 'id_induk_pointtype' });
  /** SUBMIT FORM HANDLING */
  const onSubmitForm = (data: any) => {
    let result = optionsScada?.filter((obj: any) => {
      return obj.value === idPointWatch;
    });
    data.jenispoint = result[0]?.jenis
    setDataParams(data);
  };

  useEffect(() => {
    setDataParams({
      ...formModel,
      id_induk_pointtype: optionsScada[0]?.value,
      jenispoint: optionsScada[0]?.jenis
      // time: moment().subtract(1, 'hour').format('HH:[00]'),
    });
    setValue('id_induk_pointtype', optionsScada[0]?.value)
    setValue('jenispoint', optionsScada[0]?.jenis)
  }, [optionsScada]);

  return (
  <FiltersForm
    setError={setError}
    setValue={setValue}
    dataParams={dataParams}
    onLoading={setLoading}
    fields={{ id_induk_pointtype: null, jenispoint: null }}
  >
    <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
      <Row className="align-items-end">
        
        {/* 🔹 FILTER */}
        <Col md={8}>
          
          {/* Peralatan SCADA */}
          <Form.Group className="mt-3">
            <Form.Label>Peralatan SCADA</Form.Label>
            <SelectFormStatic
              control={control}
              errors={errors}
              fieldName="id_induk_pointtype"
              placeholder="Pilih ..."
              options={optionsScada}
            />
          </Form.Group>

          {/* UP3 */}
          <Form.Group className="mt-3" controlId="id_up3_1">
            <Form.Label>UP3</Form.Label>
            <SelectAsyncDynamic
              fieldName="id_up3_1"
              fieldNameParent="id_uid"
              control={control}
              errors={errors}
              labelField="nama_lokasi"
              valueField="id_ref_lokasi"
              pathServiceName="master.jaringan.ref_lokasi"
              queryParams={{ id_ref_jenis_lokasi: JENIS_LOKASI().up3 }}
              setValue={setValue}
            />
          </Form.Group>

        </Col>

        {/* 🔹 BUTTON */}
        <Col md={4} className="mt-3">
          <FilterActionButton
            className="justify-content-start"
            loading={loading}
          />
        </Col>

      </Row>
    </Form>
  </FiltersForm>
);
}
