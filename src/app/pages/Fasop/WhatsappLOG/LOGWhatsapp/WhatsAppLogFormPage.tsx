import React, { useState } from 'react';
import { Button, Col, Form } from 'react-bootstrap';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { IFasopWhatsappLog } from '@app/interface/fasop-whatsapp-log.interface';

import FormData from '@app/modules/Form/FormData';
import ButtonCancel from '@app/components/Button/ButtonCancel';
import { API_PATH } from '@app/services/_path.service';
import SelectAsyncDynamic from '@app/modules/SelectForm/SelectAsyncDynamic';
import { FasopWhatsappLogField } from '@app/interface/fasop-whatsapp-log.interface';

export default function GroupTelegramFormPage() {
  const [dataParams, setDataParams] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    id_wa_bot: Yup.number().nullable(),
    id_wa_kontak: Yup.number().nullable(),
    msg: Yup.string().nullable(),
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

  /** SUBMIT FORM HANDLING */
  const onSubmitForm = (data: IFasopWhatsappLog) => {
    setDataParams(data);
  };

  return (
    <>
      <FormData
        setError={setError}
        setValue={setValue}
        dataParams={dataParams}
        fields={FasopWhatsappLogField}
        path={API_PATH().master.fasop.whatsapp.log}
        onLoading={setLoading}
      >
        <Col md='6' xs='12'>
          <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
          <Form.Group className='mb-3'>
                            <Form.Label>Bot</Form.Label>
                            <SelectAsyncDynamic
                                fieldName='id_wa_bot'
                                pathServiceName='master.fasop.whatsapp.bot'
                                // path='master/fasop/whatsapp/bot'
                                labelField='nama'
                                valueField='id_wa_bot'
                                placeholder='Pilih...'
                                isClearable={true}
                                errors={errors}
                                control={control}
                                isSearchable={false}
                            />
                        </Form.Group>


            <Form.Group className='mb-3'>
              <Form.Label>Nama Kontak</Form.Label>
              <SelectAsyncDynamic
                fieldName='id_wa_kontak'
                pathServiceName='master.fasop.whatsapp.kontak'
                labelField='nama'
                valueField='id_wa_kontak'
                placeholder='Pilih...'
                isClearable={true}
                errors={errors}
                control={control}
              />
            </Form.Group>

            <Form.Group className='mt-3' controlId='msg'>
              <Form.Label>Pesan </Form.Label>
              <Form.Control as='textarea' isInvalid={errors.msg}  {...register('msg')} rows={4} />
              <Form.Control.Feedback type='invalid'>
                {errors?.msg?.message}
              </Form.Control.Feedback>
            </Form.Group>


            <Form.Group className='mt-4'>
              <Button type='submit' variant='primary' disabled={loading}> Kirim </Button>
              <ButtonCancel />
            </Form.Group>
          </Form>
        </Col>
      </FormData>
    </>
  );
}
