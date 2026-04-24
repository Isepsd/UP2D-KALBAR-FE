import React, { useState } from 'react';
import { Col, Form, Modal } from 'react-bootstrap';

import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Alert } from 'react-bootstrap';

import FormData from '@app/modules/Form/FormData';
import ButtonCancel from '@app/components/Button/ButtonCancel';
import { API_PATH } from '@app/services/_path.service';
import Button from '@app/components/Button/Button';
// import RequiredInfo from '@app/components/Info/RequiredInfo';
import { IJadwalPemerliharaanDokumentasi, JadwalPemerliharaanDokumentasiFeild } from '@app/interface/opsisdis-jadwal-pemeliharaan.interface';
import InputUpload from '@app/components/Upload/InputUpload';
import { useDispatch } from 'react-redux';
import { notificationTemplate } from '@app/helper/notificationTemplate';
import { addNotification } from '@app/store/notification/notification.action';

interface IFormUploadDocument {
  trans_jadwal_har_id: any;
  handleClose: any;
}

function DaftarManuverPemeliharaanDetailForm({ trans_jadwal_har_id, handleClose }: IFormUploadDocument) {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();

  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    trans_jadwal_har_dok_id: Yup.string().nullable(),
    nama_dok: Yup.string().nullable(),
    nama_file: Yup.string().nullable(),
    datum_created: Yup.string().nullable(),
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
  const onSubmitForm = (data: IJadwalPemerliharaanDokumentasi) => {

    data.trans_jadwal_har_id = trans_jadwal_har_id
    if (watchNamaFile) {
      setDataParams(data);
    }
    handleClose();


  };

  const handleUploaded = (e: any) => {
    // console.log('Upload response:', e); // Lihat respons dari upload

    if (typeof e === 'string' && e.includes('/portal/upload_dokumen/')) {
      // Jika respons adalah URL yang mengindikasikan upload berhasil
      setValue('nama_file', e); // Simpan URL file yang berhasil diupload
      dispatchNotification('Upload File Berhasil!', 'success');
      // console.log('Upload berhasil:', e);
    } else {
      // Jika respons tidak sesuai
      dispatchNotification('Upload File Gagal!', 'danger');
      // console.log('Upload gagal');
    }
  };

  const id = trans_jadwal_har_id
  const isAllreadyId = {
    trans_jadwal_har_id: id
  };

  // console.log('trans_jadwal_har_id:', trans_jadwal_har_id);
  // console.log('isAllreadyId.trans_jadwal_har_id:', isAllreadyId.trans_jadwal_har_id);
  return (
    <>
      {isAllreadyId.trans_jadwal_har_id === null && (
        <Alert variant="danger" className="text-center mb-4">
          Silahkan Pilih Jadwal Pemeliharaan Terlebih Dahulu!
        </Alert>
      )}
      {isAllreadyId.trans_jadwal_har_id && (
        <FormData
          setError={setError}
          setValue={setValue}
          dataParams={dataParams}
          fields={JadwalPemerliharaanDokumentasiFeild}
          path={API_PATH().opsisdis.jadwal_pemeliharaan.dok}
          onLoading={setLoading}
          customLabel={'hide'}
          isModal
          link='/opsisdis/jadwal-pemeliharaan/usulan-jadwal-har'
          overrideType={{ created_at: 'datetime' }}
        >
          <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>

            <Form.Group as={Col} className='mb-3'>
              <Form.Label>
                Nama Dokumen
              </Form.Label>
              <Form.Control
                {...register('nama_dok')}
                isInvalid={errors.nama_dok}
              />
              <Form.Control.Feedback type='invalid'>
                {errors?.nama_dok?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} className='mb-3'>
              <Form.Label>
                File
              </Form.Label>
              <InputUpload
                fieldName='nama_file'
                onUploaded={handleUploaded}
                previewUrl={watchNamaFile}
                folder={'upload_dokumen'}
                accept=".vsdx,.vsd,.pdf,application/pdf,image/*,.xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv,application/csv" />
              <Form.Control.Feedback type='invalid'>
                {errors?.nama_file?.message}
              </Form.Control.Feedback>
            </Form.Group>


            <Modal.Footer>
              <div className='d-flex gap-2'>
                <ButtonCancel onClick={handleClose} />
                <Button type='submit' variant='primary' isLoading={loading}>
                  Simpan
                </Button>
              </div>
            </Modal.Footer>
          </Form>
        </FormData>
      )}
    </>
  );
}

export default DaftarManuverPemeliharaanDetailForm