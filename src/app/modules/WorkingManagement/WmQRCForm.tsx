import React, { useState } from 'react';
import { Col, Form, Modal, Row } from 'react-bootstrap';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import FormData from '@app/modules/Form/FormData';
import ButtonCancel from '@app/components/Button/ButtonCancel';
import { API_PATH } from '@app/services/_path.service';
import Button from '@app/components/Button/Button';
import RequiredInfo from '@app/components/Info/RequiredInfo';
import { IWpQrc, WpQrcField } from '@app/interface/wp-qrc.interface';
import { useSelector } from 'react-redux';
import WmQrcQuestion from './WmQrcQuestion';

export default function WmQRCForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();
  const { currentUser } = useSelector((state: any) => state.auth);

  const [qrcDetails, setQrcDetails] = useState<any>();

  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    nama_user: Yup.string().required('Nama user wajib diisi'),
    nama_pekerjaan: Yup.string().required('Nama pekerjaan wajib diisi'),
    key_qrc: Yup.string().required('Key QRC wajib diisi'),
  });

  const [formModel] = useState<any>({ status: '1' });
  const {
    register,
    handleSubmit,
    // control,
    setValue,
    setError,
    formState,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: formModel,
  });

  const { errors }: any = formState || {};
  /** SUBMIT FORM HANDLING */
  const onSubmitForm = (data: IWpQrc) => {
    data.id_user_entri = currentUser?.id_user;
    data.qrc_details = qrcDetails?.map((item: any) => {
      return {
        ada: '1',
        id_wp_qrc: data?.id_wp_qrc,
        id_pertanyaan_qrc: item?.id_pertanyaan_qrc,
      };
    });
    setDataParams(data);
  };

  const handleAddQuestion = (e: any) => {
    const question = e;
    setQrcDetails(question);
  };

  return (
    <>
      <FormData
        setError={setError}
        setValue={setValue}
        dataParams={dataParams}
        fields={WpQrcField}
        path={API_PATH().working_permit.qrc}
        onLoading={setLoading}
        customLabel={'hide'}
        isModal={true}
        batch={false}
      >
        <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
          <Modal.Body>
            <Row>
              <Form.Group as={Col} className='mb-3'>
                <Form.Label>
                  User <RequiredInfo />
                </Form.Label>
                <Form.Control
                  {...register('nama_user')}
                  isInvalid={errors.nama_user}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.nama_user?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} className='mb-3'>
                <Form.Label>Vendor</Form.Label>
                <Form.Control
                  {...register('vendor')}
                  isInvalid={errors.vendor}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.vendor?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Form.Group className='mb-3'>
              <Form.Label>
                Nama Pekerjaan <RequiredInfo />
              </Form.Label>
              <Form.Control
                {...register('nama_pekerjaan')}
                isInvalid={errors.nama_pekerjaan}
              />
              <Form.Control.Feedback type='invalid'>
                {errors?.nama_pekerjaan?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Key QRC</Form.Label>
              <Form.Control
                {...register('key_qrc')}
                isInvalid={errors.key_qrc}
              />
              <Form.Control.Feedback type='invalid'>
                {errors?.key_qrc?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <hr className='my-4' />
            <h5>Questionnaire Risk Classification</h5>

            <WmQrcQuestion onRowChecked={handleAddQuestion}></WmQrcQuestion>
          </Modal.Body>

          <Modal.Footer>
            <div className='d-flex gap-2'>
              <ButtonCancel />
              <Button type='submit' variant='primary' isLoading={loading}>
                Simpan
              </Button>
            </div>
          </Modal.Footer>
        </Form>
      </FormData>
    </>
  );
}
