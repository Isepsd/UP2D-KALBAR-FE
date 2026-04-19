import React, { useState ,} from 'react';
import { Col, Form, Row } from 'react-bootstrap';

import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
// import isEmpty from 'lodash/isEmpty';

import FiltersForm from '@app/modules/Filters/FilterForm';
import FilterActionButton from '@app/modules/Filters/FilterActionButton';
import SelectAsyncDynamic from '@app/modules/SelectForm/SelectAsyncDynamic';
import SelectFormStatic from '@app/modules/SelectForm/SelectFormStatic';
// import { API_PATH } from '@app/services/_path.service';
export default function Filter({ optionsScada }: any) {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();
  // const [data, setData] = useState(null); 
  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    path1: Yup.string().nullable(),
    path2: Yup.string().nullable(),
    path3: Yup.string().nullable(),
    path4: Yup.string().nullable(),
    path5: Yup.string().nullable(),
    id_pointtype: Yup.string().nullable(),
    id_induk_pointtype: Yup.string().nullable(),
    jenispoint: Yup.string().nullable(),

  });

  const [formModel] = useState<any>({
    path1: "",
    path2: "",
    path3: "",
    path4: "",
    path5: "",
    jenispoint: null,
    id_induk_pointtype: null,
    ismapping: null,
    id_pointtype: null,
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
    let result = optionsScada?.filter((obj: any) => {
      return obj.value === idPointWatch;
    });
    data.jenispoint = result[0]?.jenis
    // setDataParams(params);
    setDataParams(() => {
      return { ...params }
    });
  };

  const idPointWatch = useWatch({ control, name: 'id_induk_pointtype' });
  // const id_pointtypewatch = useWatch({ control, name: 'id_pointtype' });


  
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
          path4: "",
          path5: "",
          id_pointtype:null,
          jenispoint: null,
          id_induk_pointtype: null,
          ismapping: null,
        }}
      >
        <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
          <Row>
            <Col md={3} className="">
              <Form.Group className='mb-2'>
                <Form.Label>Peralatan SCADA</Form.Label>
                <SelectFormStatic
                  control={control}
                  errors={errors}
                  isClearable={true}
                  fieldName="id_induk_pointtype"
                  placeholder='Pilih ...'
                  options={optionsScada}
                />
              </Form.Group>

            </Col>
         
            <Col md={3} className="">
      <Form.Group className='mb-2'>
        <Form.Label>Jenis Point</Form.Label>
        <SelectAsyncDynamic
          fieldName='id_pointtype'
          pathServiceName='master.fasop.point_type_get'
          labelField='name'
          valueField='id_pointtype'
          placeholder='Pilih...'
          isClearable={true}
          errors={errors}
          control={control}
          queryParams={{
            page: 1,
            limit: 10,
            is_induk:'ANAK',
            sort_by: '-id_pointtype',
          }}
        />
      </Form.Group>
    </Col>
            
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
                <Form.Label>Tegangan (B2)</Form.Label>
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
                <Form.Label>Bay (B3)</Form.Label>
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
            <Col md={3} className="">
              <Form.Group className='mb-2'>
                <Form.Label>Element</Form.Label>
                <SelectAsyncDynamic
                  fieldName='path4'
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
                    path: 'path4text',
                  }}
                />
              </Form.Group>

            </Col>
            <Col md={3} className="">
              <Form.Group className='mb-2'>
                <Form.Label>Info</Form.Label>
                <SelectAsyncDynamic
                  fieldName='path5'
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
                    path: 'path5text',
                  }}
                />
              </Form.Group>
            </Col>
            <Col md={3} className="">
              <Form.Group className='mb-2'>
                <Form.Label>Status Mapping</Form.Label>
                <SelectFormStatic
                  control={control}
                  errors={errors}
                  fieldName='ismapping'
                  placeholder='All'
                  options={[
                    { label: 'Sudah Mapping', value: 1 },
                    { label: 'Belum Mapping', value: 2 },
                  ]}
                  isClearable={true}
                />
              </Form.Group>
            </Col>

            <Col md={2} className="mt-2">
              <FilterActionButton className="justify-content-start" loading={loading} />
            </Col>
          </Row>
        </Form>
      </FiltersForm >
    </>
  );
}
