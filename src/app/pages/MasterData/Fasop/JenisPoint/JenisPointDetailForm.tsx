import React, { useState } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { FasopPointTypeStateField, IFasopPointTypeState } from '@app/interface/fasop-pointtype-state.interface';

import FormData from '@app/modules/Form/FormData';
import ButtonCancel from '@app/components/Button/ButtonCancel';
import { API_PATH } from '@app/services/_path.service';
import { useSearchParams } from 'react-router-dom';

export default function JenisPointDetailForm() {
  const [dataParams, setDataParams] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  let [searchParams] = useSearchParams();

  /** FORM  HANDLE
   */
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Label wajib diisi'), 
    status: Yup.number()
      .nullable()
      .transform((_, v) => (v == 1 ? 1 : 0)),
    valid: Yup.number()
      .nullable()
      .transform((_, v) => (v == 1 ? 1 : 0)),
    quality_code: Yup.string().nullable(),
    statekey: Yup.number()
      .required()
      .required('Value wajib diisi'),
  });

  const [formModel] = useState<any>({});

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: formModel,
  });
  const { errors }: any = formState || {};
  /** SUBMIT FORM HANDLING */
  const onSubmitForm = (data: IFasopPointTypeState) => {
    const parent:any = searchParams.get("point_type") 
    setDataParams({...data, id_pointtype:parseInt(parent)});
  };

  return (
    <>
      <FormData
        setError={setError}
        setValue={setValue}
        dataParams={dataParams}
        fields={FasopPointTypeStateField}
        path={API_PATH().master.fasop.point_type_state}
        onLoading={setLoading}
        isModal={true}
        ids='ids'
      >
        <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
          <Modal.Body>
            <Row>
              <Form.Group className='mb-3 col-md-6'>
                <Form.Label>Value</Form.Label>
                <Form.Control
                  {...register('statekey')}
                  isInvalid={errors.statekey}
                  type='number'
                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.statekey?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} className='mb-3'>
                <Form.Label>State Label</Form.Label>
                <Form.Control {...register('name')} isInvalid={errors.name} />
                <Form.Control.Feedback type='invalid'>
                  {errors?.name?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row> 
              <Form.Group as={Col} className='mb-3'>
                <Form.Label>Quality Code</Form.Label>
                <Form.Control
                  {...register('quality_code')}
                  isInvalid={errors.quality_code}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.quality_code?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} className='mb-3'>
                <Form.Label>Normal/Up/Valid</Form.Label>
                <div className='ms-3 py-2'>
                  <Form.Check
                    type='switch'
                    id='normalValid'
                    label='Ya'
                    {...register('valid')}
                  />
                </div>
              </Form.Group>
              <Form.Group as={Col} className='mb-3'>
                <Form.Label>Aktif</Form.Label>
                <div className='ms-3 py-2'>
                  <Form.Check
                    type='switch'
                    id='aktif'
                    label='Ya'
                    {...register('status')}
                  />
                </div>
              </Form.Group>
            </Row>
          </Modal.Body>

          <Modal.Footer>
            <ButtonCancel type='modal' />
            <Button type='submit' variant='primary' disabled={loading}>
              Simpan
            </Button>
          </Modal.Footer>
        </Form>
      </FormData>
    </>
  );
}
