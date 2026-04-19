import React, { useState } from 'react';
import { Button, Col, Form } from 'react-bootstrap';

import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import {
  IFasopTelegramBot,
} from '@app/interface/fasop-telegram-bot.interface';

import FormData from '@app/modules/Form/FormData';
import ButtonCancel from '@app/components/Button/ButtonCancel';
import { API_PATH } from '@app/services/_path.service';
import SelectAsyncDynamic from '@app/modules/SelectForm/SelectAsyncDynamic';
import { FasopTelegramGroupField } from '@app/interface/fasop-telegram-group.interface';

export default function GroupTelegramFormPage() {
  const [dataParams, setDataParams] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  /** FORM  HANDLE
   */
  const validationSchema = Yup.object().shape({
    nama: Yup.string().required('Nama Wajib diisi'),
    id_chat: Yup.number()
      .typeError('Id Chat Wajib diisi')
      .required('Id Chat Wajib diisi'),
    status: Yup.number()
      .nullable()
      .transform((_, v) => (v == 1 ? 1 : 0)),
  });

  const [formModel] = useState<any>({});

  const {
    register,
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
  const watchStatus = useWatch({ control, name: 'status' });

  /** SUBMIT FORM HANDLING */
  const onSubmitForm = (data: IFasopTelegramBot) => {
    setDataParams(data);
  };

  return (
    <>
      <FormData
        setError={setError}
        setValue={setValue}
        dataParams={dataParams}
        fields={FasopTelegramGroupField}
        path={API_PATH().master.fasop.telegram_group}
        onLoading={setLoading}
      >
        <Col md='6' xs='12'>
          <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
            <Form.Group className='mb-3'>
              <Form.Label>Nama</Form.Label>
              <Form.Control {...register('nama')} isInvalid={errors.nama} />
              <Form.Control.Feedback type='invalid'>
                {errors?.nama?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Bot</Form.Label>
              <SelectAsyncDynamic
                fieldName='id_telegram_bot'
                pathServiceName='master.fasop.telegram_bot'
                labelField='nama'
                valueField='id_telegram_bot'
                placeholder='Pilih...'
                isClearable={true}
                errors={errors}
                control={control}
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>ID Chat</Form.Label>
              <Form.Control
                {...register('id_chat')}
                isInvalid={errors.id_chat}
                type="number"
              />
              <Form.Control.Feedback type='invalid'>
                {errors?.id_chat?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Aktif</Form.Label>
              <div className='ms-3 py-2'>
                <Form.Check
                  type='switch'
                  id='aktif'
                  {...register('status')}
                  label={watchStatus === true ? 'Ya' : 'Tidak'}
                />
              </div>
            </Form.Group>
            <Form.Group className='mt-4'>
              <Button type='submit' variant='primary' disabled={loading}>
                Simpan
              </Button>
              <ButtonCancel />
            </Form.Group>
          </Form>
        </Col>
      </FormData>
    </>
  );
}
