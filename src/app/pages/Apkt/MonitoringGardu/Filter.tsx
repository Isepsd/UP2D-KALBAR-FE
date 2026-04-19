import React, { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import FiltersForm from '@app/modules/Filters/FilterForm';
import FilterActionButton from '@app/modules/Filters/FilterActionButton';
import SelectAsyncDynamic from '@app/modules/SelectForm/SelectAsyncDynamic';
import SelectFormStatic from '@app/modules/SelectForm/SelectFormStatic';

export default function Filter() {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();

  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({

    path1: Yup.string().nullable(),
    path2: Yup.string().nullable(),
    path3: Yup.string().nullable(),
    status_2: Yup.string().nullable(),

  });

  const [formModel] = useState<any>({
    path1: "",
    path2: "",
    path3: "",
    status_2: ""
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
    // setDataParams(data);
    setDataParams(() => {
      return { ...data }
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
          path1: "",
          path2: "",
          path3: "",
          status_2: "",
        }}
      >
        <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
          <Row>
            <Col md={3} className="">
              <Form.Group className='mb-2'>
                <Form.Label>Lokasi (B1)</Form.Label>
                <SelectAsyncDynamic
                  fieldName='path1'
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
                    path: 'path1text',
                  }}
                />
              </Form.Group>

            </Col>
            <Col md={3} className="">
              <Form.Group className='mb-2'>
                <Form.Label>Station (B2)</Form.Label>
                <SelectAsyncDynamic
                  fieldName='path2'
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
                <Form.Label>Nama Gardu (B3)</Form.Label>
                <SelectAsyncDynamic
                  fieldName='path3'
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
            <Col md={2}>
              <Form.Group className='mb-3'>
                <Form.Label>Status Listrik</Form.Label>
                <SelectFormStatic
                  control={control}
                  errors={errors}
                  fieldName="status_2"
                  placeholder="All"
                  options={[{ label: "Nyala", value: "up" }, { label: "Padam", value: "down" }]}
                  isClearable={true}
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
