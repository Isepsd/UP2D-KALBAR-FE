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
import InputUpload from '@app/components/Upload/InputUpload';
import { IJadwalPemerliharaanDokumentasi, JadwalPemerliharaanDokumentasiFeild } from '@app/interface/opsisdis-jadwal-pemeliharaan.interface';

interface IInputFormDokumentasi {
  parent: any;
  modalDecline?: any;
}

function InputFormDokumentasi({ parent, modalDecline }: IInputFormDokumentasi) {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();

  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    nama_dok: Yup.string().required("Nama dokumen wajib diisi"),
    file_name: Yup.string().nullable(),
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
  const watchNamaFile = useWatch({ control, name: 'file_name' })

  /** SUBMIT FORM HANDLING */
  const onSubmitForm = (data: IJadwalPemerliharaanDokumentasi) => {
    data.id_trans_jadwal_har = parent?.id
    setDataParams(data);
  };

  const handleUploaded = (e: any) => { 
    setValue('file_name', e)
  }

  return (
    <>
      <FormData
        setError={setError}
        setValue={setValue}
        dataParams={dataParams}
        fields={JadwalPemerliharaanDokumentasiFeild}
        path={API_PATH().opsisdis.jadwal_pemeliharaan.dok}
        onLoading={setLoading}
        customLabel={'hide'}
        isModal={true}
        ids="id_detail"
      >
        <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
          <Modal.Body>
            <Form.Group as={Col} className='mb-3'>
              <Form.Label>
                Nama Dokumen <RequiredInfo />
              </Form.Label>
              <Form.Control
                {...register('nama_dok')}
                isInvalid={errors.keterangan}
              />
              <Form.Control.Feedback type='invalid'>
                {errors?.nama_dok?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} className='mb-3'>
              <Form.Label>
                File <RequiredInfo />
              </Form.Label>
              <InputUpload onUploaded={handleUploaded} previewUrl={watchNamaFile} folder={"jadwa-pemeliharaan"} accept=".vsdx,.vsd,application/pdf" />
              <Form.Control.Feedback type='invalid'>
                {errors?.file_name?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <div className='d-flex gap-2'>
              <ButtonCancel type='modal' ids='id_detail' onClick={modalDecline} />
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

export default InputFormDokumentasi