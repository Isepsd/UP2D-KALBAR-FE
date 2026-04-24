import React, { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import FiltersForm from '@app/modules/Filters/FilterForm';
import FilterActionButton from '@app/modules/Filters/FilterActionButton';
import SelectAsyncDynamic from '@app/modules/SelectForm/SelectAsyncDynamic';

export default function Filter() {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();

  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    path1text: Yup.string().nullable(),
    path2text: Yup.string().nullable(),
    path3text: Yup.string().nullable(),

  });

  const [formModel] = useState<any>({
    path1text: "",
    path2text: "",
    path3text: "",
  });


  const {
    handleSubmit,
    setValue,
    setError,
    formState,
    control
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: formModel,
  });
  const { errors }: any = formState || {};
  /** SUBMIT FORM HANDLING */
  const onSubmitForm = (data: any) => {
    let params = data;
    if (data?.kinerja === "BULANAN") {
      delete params.harian;
    } else {
      delete params.bulanan;
    }
    // setDataParams(params);
    setDataParams(() => {
      return { ...params }
    });
  };


  return (
    <>
      <FiltersForm
        setError={setError}
        setValue={setValue}
        dataParams={dataParams}
        onLoading={setLoading}
        fields={{
          path1text: "",
          path2text: "",
          path3text: "",
        }}
      >
        <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
          <Row>
            <Col md={3} className="">
              <Form.Group className='mb-2'>
                <Form.Label>Lokasi (B1)</Form.Label>
                <SelectAsyncDynamic
                  fieldName='path1text'
                  pathServiceName='fasop.laporan_scada.pathtext'
                  labelField='path_text'
                  valueField='path_text'
                  placeholder='Pilih...'
                  isClearable={true}
                  errors={errors}
                  control={control}
                  queryParams={{
                    // page: 1,
                    // limit: 30,
                    path: 'path1text',
                  }}
                />
              </Form.Group>

            </Col>
            <Col md={3} className="">
              <Form.Group className='mb-2'>
                <Form.Label>B2 (Station)</Form.Label>
                <SelectAsyncDynamic
                  fieldName='path2text'
                  pathServiceName='fasop.laporan_scada.pathtext'
                  labelField='path_text'
                  valueField='path_text'
                  placeholder='Pilih...'
                  isClearable={true}
                  errors={errors}
                  control={control}
                  queryParams={{
                    page: -1,
                    limit: -1,
                    path: 'path2text',
                  }}
                />
              </Form.Group>

            </Col>
            <Col md={3} className="">
              <Form.Group className='mb-2'>
                <Form.Label>Bay (B3)</Form.Label>
                <SelectAsyncDynamic
                  fieldName='path3text'
                  pathServiceName='fasop.laporan_scada.pathtext'
                  labelField='path_text'
                  valueField='path_text'
                  placeholder='Pilih...'
                  isClearable={true}
                  errors={errors}
                  control={control}
                  queryParams={{
                    page: -1,
                    limit: -1,
                    path: 'path3text',
                  }}
                />
              </Form.Group>

            </Col>
            <Col md={2} className="mt-2">
              <FilterActionButton className="justify-content-start" loading={loading} />

            </Col>
          </Row>
        </Form>
      </FiltersForm>
    </>
  );
}
