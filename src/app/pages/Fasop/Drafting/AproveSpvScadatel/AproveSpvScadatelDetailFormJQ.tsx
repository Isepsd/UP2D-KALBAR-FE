import React, { useState } from 'react';
import { Col, Form, Modal } from 'react-bootstrap';

import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import FormData from '@app/modules/Form/FormData';
import ButtonCancel from '@app/components/Button/ButtonCancel';
import { API_PATH } from '@app/services/_path.service';
import Button from '@app/components/Button/Button';
import RequiredInfo from '@app/components/Info/RequiredInfo';
import {  ICdn,ICdnField } from '@app/interface/jaringan-cdn.interface';

import InputUpload from '@app/components/Upload/InputUpload';
import { useDispatch } from 'react-redux';
import { notificationTemplate } from '@app/helper/notificationTemplate';
import { addNotification } from '@app/store/notification/notification.action';

interface PelaksanaanWoDetailForm {filterParams:any
  handleClose: any
  dataSelected:any
}

function AproveSpvScadatelDetailFormJQ({dataSelected, handleClose,filterParams }: PelaksanaanWoDetailForm) {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();

  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    description: Yup.string().required("Nama dokumen wajib diisi"),
    url: Yup.string().nullable(),
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
  const { errors }: any = formState;
  const watchNamaFile = useWatch({ control, name: 'url' })
  const dispatch = useDispatch();
  /** NOTIFICATION HANDLER */
  const dispatchNotification = (msg: string = '', type: string = '') => {
    const notification = notificationTemplate(msg, type);
    dispatch(addNotification({ ...notification, message: msg, type: type }));
  };

  /** SUBMIT FORM HANDLING */
  const onSubmitForm = (data: ICdn) => {
    data.id_modules = filterParams
    // data.url = watchNamaFile
    data.root = 'portal'
data
    if (watchNamaFile) {
      setDataParams(data);
    } else {
      dispatchNotification("Belum Pilih File", 'danger');
    }
    handleClose();
  };

  const handleUploaded = (e: any) => {
    // console.log(e)
    setValue('url', e)
  }

  return (
    <>
      <FormData
        setError={setError}
        setValue={setValue}
        dataParams={dataParams}
        fields={ICdnField}
        path={API_PATH().cdn.cdn}
        onLoading={setLoading}
        customLabel={'hide'}
        isModal={true}
        overrideType={{ }}
        onGetDataResult={dataSelected}
      >
        <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
          <Modal.Body>
            <Form.Group as={Col} className='mb-3'>
              <Form.Label>
                Nama Dokumen <RequiredInfo />
              </Form.Label>
              <Form.Control
                {...register('description')}
                isInvalid={errors.description}
              />
              <Form.Control.Feedback type='invalid'>
                {errors?.description?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} className='mb-3'>
              <Form.Label>
                File <RequiredInfo />
              </Form.Label>
              <InputUpload 
              onUploaded={handleUploaded} 
              previewUrl={watchNamaFile} 
              folder={'drafting_wo_dok'} 
              accept=".vsdx,.vsd,application/pdf,image/*" />
              <Form.Control.Feedback type='invalid'>
                {errors?.urk?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <div className='d-flex gap-2'>
            <ButtonCancel type='modal' onClick={handleClose} variant='danger' />
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

export default AproveSpvScadatelDetailFormJQ