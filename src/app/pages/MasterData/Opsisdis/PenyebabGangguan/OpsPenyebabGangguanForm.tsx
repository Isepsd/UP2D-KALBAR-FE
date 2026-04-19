import React, { useState } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import ButtonCancel from '@app/components/Button/ButtonCancel';

import { API_PATH } from '@app/services/_path.service';
import SelectAsyncDynamic from '@app/modules/SelectForm/SelectAsyncDynamic';
import { get } from 'lodash';
import FormData from '@app/modules/Form/FormData';
import {
  IPenyebabGangguan,
  PenyebabGangguanField,
} from '@app/interface/master-data/penyebaba-gangguan.interface';
import FormInputControl from '@app/components/Input/FormInputControl';

export default function OpsPenyebabGangguanForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();

  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    id_ref_ep_kat_ggn: Yup.string().required(),
    nama: Yup.string().required(),
    status: Yup.string().required(),
  });

  const [formModel] = useState<any>({ status: '1' });
  const { register, handleSubmit, setValue, control, setError, formState } =
    useForm<IPenyebabGangguan>({
      resolver: yupResolver(validationSchema),
      defaultValues: formModel,
    });
  const { errors }: any = formState || {};

  const onSubmitForm = (data: IPenyebabGangguan) => {
    const params = {
      ...data,
      status: data?.status ? '1' : '0',
    };
    setDataParams(params);
  };

  return (
    <>
      <FormData
        setError={setError}
        setValue={setValue}
        dataParams={dataParams}
        fields={PenyebabGangguanField}
        path={API_PATH().master.opsisdis.rekap_padam.penyebab_gangguan}
        customLabel='state'
        onLoading={setLoading}
      >
        <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
          <Row className='mb-3'>
            <Col md='6'>
              <FormInputControl
                required={true}
                labelName='Nama'
                type='text'
                register={register('nama')}
                isInvalid={errors?.nama as boolean | undefined}
                message={errors?.nama?.message}
                placeholder='Nama'
              />
              <Form.Group className='mt-3 mb-3' controlId='alamat'>
                <Form.Label>Kategori Gangguan</Form.Label>
                <SelectAsyncDynamic
                  fieldName='id_ref_ep_kat_ggn'
                  pathServiceName='master.opsisdis.rekap_padam.penyebab_gangguan'
                  labelField='nama'
                  valueField='id_ref_ep_kat_ggn'
                  placeholder='Pilih...'
                  isClearable={true}
                  errors={errors}
                  control={control}
                />
                <Form.Control.Feedback type='invalid'>
                  {get(errors, `id_ref_ep_kat_ggn.message`)}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Label>Status</Form.Label>
              <div>
                <Form.Check
                  {...register('status')}
                  inline
                  type='radio'
                  value='1'
                  label='Active'
                />
                <Form.Check
                  {...register('status')}
                  inline
                  type='radio'
                  value='0'
                  label='Inactive'
                />
              </div>
              <Form.Control.Feedback type='invalid'>
                {errors?.gender?.message}
              </Form.Control.Feedback>
            </Col>
          </Row>

          <Form.Group className='mt-4'>
            <Button type='submit' variant='primary' disabled={loading}>
              Save
            </Button>
            <ButtonCancel />
          </Form.Group>
        </Form>
      </FormData>
    </>
  );
}
