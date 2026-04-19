import React, { useState } from 'react';
import { Col, Form, FormControl, InputGroup, Row } from 'react-bootstrap';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { get } from 'lodash';

import FiltersForm from '@app/modules/Filters/FilterForm';
import SelectAsyncDynamic from '@app/modules/SelectForm/SelectAsyncDynamic';
import FilterActionButton from '@app/modules/Filters/FilterActionButton';
import moment from 'moment';
import { JENIS_LOKASI } from '@app/configs/jenis-lokasi.config';
interface ISelectProps {
  fieldName: string;
  pathServiceName: string;
  labelField: string;
  valueField: string;
  placeholder: string;
}

type Props = {
  selectProps: ISelectProps;
  queryParams: any;
  fieldKeyword?: string;
  isJenisPoint?: boolean;
};

function HistoryFilter({
  selectProps = {
    fieldName: 'id_pointtype',
    pathServiceName: 'master.jaringan.ref_lokasi',
    labelField: 'nama_lokasi',
    valueField: 'id_ref_lokasi',
    placeholder: 'Pilih...',
  },
  queryParams = { page: -1 },
  isJenisPoint = true,
}: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();

  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    datum_1_after: Yup.string().nullable(),
    datum_1_before: Yup.string().nullable(),
    id_unit: Yup.string().nullable(),
  });

  const [formModel] = useState<any>({
    datum_1_after: moment().subtract(1, 'day').format('YYYY-MM-DD HH:mm:ss'),
    datum_1_before: moment().format('YYYY-MM-DD HH:mm:ss'),
    path1text: "",
    path2text: "",
    path3text: "",
    path4text: "",
    id_unit: null,
  });

  const {
    handleSubmit,
    register,
    setValue,
    setError,
    control,
    formState,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: formModel,
  });
  const { errors }: any = formState || {};
  const watchDatum1After = useWatch({ control, name: 'datum_1_after' });
  const watchDatum2Before = useWatch({ control, name: 'datum_1_before' });

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
          datum_1_before: moment().format('YYYY-MM-DD HH:mm:ss'),
          datum_1_after: moment().subtract(1, 'day').format('YYYY-MM-DD HH:mm:ss'),
          path1text: "",
          path2text: "",
          path3text: "",
          path4text: "",
          id_unit:null,
        }}
      // overrideType={{ datum_1_before: 'date', datum_1_after: 'date' }}
      >
        <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
          <Row>
            <Col md={6}>
              <Form.Group className='mb-2'>
                <Form.Label>Range Tanggal</Form.Label>
                <InputGroup className='mb-3'>
                  <FormControl
                    {...register('datum_1_after')}
                    type='datetime-local'
                    max={watchDatum2Before}
                  />
                  <InputGroup.Text>
                    <i className='fa-solid fa-arrow-right'></i>
                  </InputGroup.Text>
                  <FormControl
                    {...register('datum_1_before')}
                    type='datetime-local'
                    min={watchDatum1After}
                    max={moment().format('YYYY-MM-DD HH:mm:ss')}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col md={2} className=''>
            <Form.Group  className='mb-2'>
                <Form.Label>Unit</Form.Label>
                <SelectAsyncDynamic
                  fieldName='id_unit'
                  pathServiceName='master.jaringan.ref_lokasi'
                  labelField='nama_lokasi'
                  valueField='id_ref_lokasi'
                  placeholder='Pilih...'
                  isClearable={true}
                  errors={errors}
                  control={control}
                  isSearchable={false}
                  queryParams={{ id_ref_jenis_lokasi_in: `${JENIS_LOKASI().ultg}`, showrc: true }}
                />
              </Form.Group>
              </Col>
            <Col md={2} className="">
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
                    page: -1,
                    limit: -1,
                    path: 'path1text',
                  }}
                />
              </Form.Group>

            </Col>
            <Col md={2} className="">
              <Form.Group className='mb-2'>
                <Form.Label>Tegangan (B2)</Form.Label>
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
            <Col md={2} className="">
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

            <Col md={2} className="">
              <Form.Group className='mb-2'>
                <Form.Label>Element</Form.Label>
                <SelectAsyncDynamic
                  fieldName='path4text'
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
          </Row>
          {isJenisPoint && (
            <Col md={5} >
              <Form.Group className='mb-2'>
                <Form.Label>Jenis Point</Form.Label>
                <SelectAsyncDynamic
                  {...selectProps}
                  isClearable={true}
                  errors={errors}
                  control={control}
                  queryParams={queryParams}
                />
                <Form.Control.Feedback type='invalid'>
                  {get(errors, `${selectProps?.fieldName}.message`)}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          )}
          {/* <Form.Group className='mb-3'>
            <Form.Label>{keywordName}</Form.Label>
            <Form.Control {...register(fieldKeyword)} placeholder='Nama' />
          </Form.Group> */}

          <FilterActionButton
            loading={loading}
            onClickReset={() => onSubmitForm(null)}
          ></FilterActionButton>
        </Form>
      </FiltersForm>
    </>
  );
}

export default HistoryFilter;
