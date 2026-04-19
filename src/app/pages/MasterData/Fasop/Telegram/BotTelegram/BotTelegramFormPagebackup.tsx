import React, { useState } from 'react';
import { Button, Col, Form } from 'react-bootstrap';

import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { IFasopTelegramBot, FasopTelegramBotField } from '@app/interface/fasop-telegram-bot.interface';

import FormData from '@app/modules/Form/FormData';
import ButtonCancel from '@app/components/Button/ButtonCancel';
import { API_PATH } from '@app/services/_path.service';

export default function BotTelegramFormPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();

  /** FORM  HANDLE
   */
  const validationSchema = Yup.object().shape({
    nama: Yup.string().required('Nama Wajib diisi'),
    chat_code: Yup.string()
      .typeError('Chat code Wajib diisi')
      .required('Chat code Wajib diisi'),
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
        fields={FasopTelegramBotField}
        path={API_PATH().master.fasop.telegram_bot}
        onLoading={setLoading}
      >
        <Col md="6" xs="12">
          <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
            <Form.Group className='mb-3'>
              <Form.Label>Nama</Form.Label>
              <Form.Control {...register('nama')} isInvalid={errors.nama} />
              <Form.Control.Feedback type='invalid'>
                {errors?.nama?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className='mb-3' style={{width:'50%'}}>
              <Form.Label>Chat Code</Form.Label>
              <Form.Control
                {...register('chat_code')}
                isInvalid={errors.chat_code}
              />
              <Form.Control.Feedback type='invalid'>
                {errors?.chat_code?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Aktif</Form.Label>
              <div className='ms-3 py-2'>
                <Form.Check
                  type='switch'
                  id='aktif'
                  {...register('status')}
                  label={watchStatus===true? 'Ya': 'Tidak'}
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
