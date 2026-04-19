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
import { IOpsisdisSLD, OpsisdisSLDField } from '@app/interface/opsisdis-sld';
import InputUpload from '@app/components/Upload/InputUpload';
import { useDispatch } from 'react-redux';
import { notificationTemplate } from '@app/helper/notificationTemplate';
import { addNotification } from '@app/store/notification/notification.action';

interface IFormUploadDocumentSLD {
  garduInduk: any;
  kelompok: string
}

function FormUploadDocumentSLD({ garduInduk, kelompok }: IFormUploadDocumentSLD) {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();

  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    keterangan: Yup.string().required("Nama dokumen wajib diisi"),
    nama_file: Yup.string().nullable(),
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
  const watchNamaFile = useWatch({ control, name: 'nama_file' })
  const dispatch = useDispatch();
  /** NOTIFICATION HANDLER */
  const dispatchNotification = (msg: string = '', type: string = '') => {
    const notification = notificationTemplate(msg, type);
    dispatch(addNotification({ ...notification, message: msg, type: type }));
  };

  /** SUBMIT FORM HANDLING */
  const onSubmitForm = (data: IOpsisdisSLD) => {
    data.id_gardu_induk = garduInduk?.id_ref_lokasi
    data.kelompok = kelompok
    if (watchNamaFile) {
      setDataParams(data);
    } else {
      dispatchNotification("Belum Pilih File", 'danger');
    }
  };

  const handleUploaded = (e: any) => {
    // console.log(e)
    setValue('nama_file', e)
  }

  return (
    <>
      <FormData
        setError={setError}
        setValue={setValue}
        dataParams={dataParams}
        fields={OpsisdisSLDField}
        path={API_PATH().opsisdis.sld}
        onLoading={setLoading}
        customLabel={'hide'}
        isModal={true}
        overrideType={{ tgl_upload: 'datetime' }}
      >
        <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
          <Modal.Body>
            <Form.Group as={Col} className='mb-3'>
              <Form.Label>
                Nama Dokumen <RequiredInfo />
              </Form.Label>
              <Form.Control
                {...register('keterangan')}
                isInvalid={errors.keterangan}
              />
              <Form.Control.Feedback type='invalid'>
                {errors?.keterangan?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} className='mb-3'>
              <Form.Label>
                File <RequiredInfo />
              </Form.Label>
              <InputUpload onUploaded={handleUploaded} previewUrl={watchNamaFile} folder={kelompok.toLowerCase()} accept=".vsdx,.vsd,application/pdf" />
              <Form.Control.Feedback type='invalid'>
                {errors?.nam_file?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <div className='d-flex gap-2'>
              <ButtonCancel type='modal' ids='id' />
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

export default FormUploadDocumentSLD