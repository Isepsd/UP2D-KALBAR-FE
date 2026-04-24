import React, { useState } from 'react';
import { Col, Form, Row, FormControl, InputGroup } from 'react-bootstrap';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import moment from 'moment';

import FiltersForm from '@app/modules/Filters/FilterForm';
import FilterActionButton from '@app/modules/Filters/FilterActionButton';
import SelectAsyncDynamic from '@app/modules/SelectForm/SelectAsyncDynamic';

export default function LogTelegramFilter() {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();
  // const [optionsTimes, setOptionsTimes] = useState<any>([]);
  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    id_tel_bot: Yup.string().nullable(),
    id_tel_kontak: Yup.string().nullable(),
    after: Yup.string().nullable(),
    before: Yup.string().nullable(),
    
  });

  const [formModel] = useState<any>({
    datum_after: Yup.string().nullable(),
    datum_before: Yup.string().nullable(),
    after: Yup.string().nullable(),
    before: Yup.string().nullable(),
    id_tel_bot: null,
    id_tel_kontak: null,
  });

  const { handleSubmit, register, setValue, setError, control, formState } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: formModel,
  });
  const { errors }: any = formState || {};

  /** SUBMIT FORM HANDLING */
  const onSubmitForm = (data: any) => {
    const awal = data.after;
    const akhir = data.before;

    data.datum_after = awal + " 00:00:00";
    data.datum_before = akhir + " 23:59:59";

    // setLoading(true);
    setDataParams(() => {
      return { ...data };
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
        datum_after: moment().subtract(1, "day").format("YYYY-MM-DD") + " 00:00:00",
        datum_before: moment().format("YYYY-MM-DD") + " 23:59:59",
        after: moment().subtract(1, "day").format("YYYY-MM-DD"),
        before: moment().format("YYYY-MM-DD"),
        id_tel_bot: null, 
        id_tel_kontak: null }}
      >
        <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
          <Row>
          <Col md={3} className="">
              <Form.Group>
                <Form.Label>Range Tanggal</Form.Label>
                <InputGroup>
                  <FormControl
                    {...register("after")}
                    type="date"
                    defaultValue={moment(formModel.after).format(
                      "YYYY-MM-DD"
                    )}
                  // min={moment(watchDatum2Before)
                  //   .subtract(1, 'month')
                  //   .format('YYYY-MM-DD')}
                  // max={watchDatum2Before}
                  />
                  <InputGroup.Text>
                    <i className="fa-solid fa-arrow-right"></i>
                  </InputGroup.Text>
                  <FormControl
                    {...register("before")}
                    type="date"
                    defaultValue={moment(formModel.after).format(
                      "YYYY-MM-DD"
                    )}
                  // min={watchDatum1After}
                  // max={moment().format('YYYY-MM-DD')}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className='mb-2'>
                <Form.Label>Bot Telegram</Form.Label>
                <SelectAsyncDynamic
                  fieldName='id_tel_bot'
                  pathServiceName='master.fasop.tel_bot'
                  labelField='nama'
                  valueField='id_tel_bot'
                  placeholder='Pilih Bot'
                  isClearable={true}
                  errors={errors}
                  control={control}
                  queryParams={{
                    page: -1,
                    limit: -1,
                    sort_by: 'nama',
                  }}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className='mb-2'>
                <Form.Label>Kontak Telegram</Form.Label>
                <SelectAsyncDynamic
                  fieldName='id_tel_kontak'
                  pathServiceName='master.fasop.tel_kontak'
                  labelField='nama'
                  valueField='id_tel_kontak'
                  placeholder='Pilih Kontak'
                  isClearable={true}
                  errors={errors}
                  control={control}
                  queryParams={{
                    page: -1,
                    limit: -1,
                    sort_by: 'nama',
                  }}
                />
              </Form.Group>
            </Col>
            <Col md={2} className='mt-2'>
              <FilterActionButton
                className='justify-content-start'
                loading={loading}
              />
            </Col>
          </Row>
        </Form>
      </FiltersForm>
    </>
  );
}
