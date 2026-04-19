import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';

import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { IFasopTelegramBot } from '@app/interface/fasop-telegram-bot.interface';

import FormData from '@app/modules/Form/FormData';
import ButtonCancel from '@app/components/Button/ButtonCancel';
import { API_PATH } from '@app/services/_path.service';
import { ActionFloating } from '@app/styled/action.styled';
import { FasopCPointField } from '@app/interface/fasop-c-point.interface';

function FasPointRCTRIPFormPage() {
  const [dataParams, setDataParams] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  /** FORM  HANDLE
   */
  const validationSchema = Yup.object().shape({
    station: Yup.string().nullable(),
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
  const watchRc = useWatch({ control, name: 'rc' });
  const watchRcTelegram = useWatch({ control, name: 'rc_telegram' });

  const watchTrip = useWatch({ control, name: 'trip' });
  const watchTripTelegram = useWatch({ control, name: 'trip_telegram' });

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
        fields={FasopCPointField}
        path={API_PATH().master.fasop.c_point}
        onLoading={setLoading}
      >
        <Col md='10' xs='12'>
          <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
            <Row>
              <Form.Group as={Col} className='mb-3'>
                <Form.Label>Path 1</Form.Label>
                <Form.Control
                  {...register('path1')}
                  isInvalid={errors.path1}
                  readOnly
                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.path1?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} className='mb-3'>
                <Form.Label>Path 2</Form.Label>
                <Form.Control
                  {...register('path2')}
                  isInvalid={errors.path2}
                  readOnly
                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.path2?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} className='mb-3'>
                <Form.Label>Path 3</Form.Label>
                <Form.Control
                  {...register('path3')}
                  isInvalid={errors.path3}
                  readOnly
                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.path3?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} className='mb-3'>
                <Form.Label>Path 4</Form.Label>
                <Form.Control
                  {...register('path4')}
                  isInvalid={errors.path4}
                  readOnly
                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.path4?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group className='col-md-3 mb-3'>
                <Form.Label>RC</Form.Label>
                <div className='ms-3 py-2'>
                  <Form.Check
                    type='switch'
                    id='rc'
                    {...register('rc')}
                    label={watchRc ? 'Ya' : 'Tidak'}
                  />
                </div>
              </Form.Group>
              <Form.Group className='col-md-3 mb-3'>
                <Form.Label>Kirim RC ke Telegram</Form.Label>
                <div className='ms-3 py-2'>
                  <Form.Check
                    type='switch'
                    id='rc_telegram'
                    {...register('rc_telegram')}
                    label={watchRcTelegram ? 'Ya' : 'Tidak'}
                  />
                </div>
              </Form.Group>
              <Form.Group className='col-md-3 mb-3'>
                <Form.Label>Trip</Form.Label>
                <div className='ms-3 py-2'>
                  <Form.Check
                    type='switch'
                    id='trip'
                    {...register('trip')}
                    label={watchTrip ? 'Ya' : 'Tidak'}
                  />
                </div>
              </Form.Group>
              <Form.Group className='col-md-3 mb-3'>
                <Form.Label>Kirim Trip ke Telegram</Form.Label>
                <div className='ms-3 py-2'>
                  <Form.Check
                    type='switch'
                    id='trip_telegram'
                    {...register('trip_telegram')}
                    label={watchTripTelegram ? 'Ya' : 'Tidak'}
                  />
                </div>
              </Form.Group>
              
            </Row>


            <ActionFloating className='d-flex gap-2'>
              <Button type='submit' variant='primary' disabled={loading}>
                Simpan
              </Button>
              <ButtonCancel />
            </ActionFloating>
          </Form>
        </Col>
      </FormData>
    </>
  );
}

export default FasPointRCTRIPFormPage