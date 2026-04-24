import React, { useState } from 'react';
import { Form, Modal, Alert } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import ButtonCancel from '@app/components/Button/ButtonCancel';
import FormData from '@app/modules/Form/FormData';
import { IJadwalPemerliharaan, JadwalPemerliharaanFeild } from '@app/interface/opsisdis-jadwal-pemeliharaan-release.interface';

import { API_PATH } from '@app/services/_path.service';
// import moment from 'moment';
import Button from '@app/components/Button/Button';

export default function PostingForm({ handleClose, isAlreadyPosted, isROTB }: any) {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();

  const validationSchema = Yup.object().shape({
    release_rotbmh: Yup.string().nullable(),
    jenis_jadwal: Yup.string().nullable(),
    status_pekerjaan: Yup.string().nullable()

  });

  const formModel: any = {
    release_rotbmh: '',
    jenis_jadwal: '',
    status_pekerjaan: '',
  };

  const {
    handleSubmit,
    setValue,
    setError,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: formModel,
  });

  const onSubmitForm = (data: IJadwalPemerliharaan) => {

    if (isAlreadyPosted) {
      alert('Data yang sudah direlease tidak bisa direlease kembali.');
      return;
    }

    // Jika konfirmasi diperlukan, tampilkan pesan konfirmasi sebelum melanjutkan
    if (isAlreadyPosted === 0 || isAlreadyPosted === null || isAlreadyPosted === '') {

      data.release_rotbmh = '1';
      data.status_pekerjaan = 'RELEASE PEKERJAAN';
      data.jenis_jadwal = 'TERENCANA';
      // data.tanggal_posting = moment().utcOffset(7).format('YYYY-MM-DD HH:mm:ss');
      setDataParams(data);

      handleClose();
    }
  };

  return (
    <>
      {isAlreadyPosted === 1 && (
        <Alert variant="danger" className="text-center mb-4">
          <p>Data yang sudah direlease tidak bisa direlease kembali.</p>
        </Alert>
      )}
      {isROTB === 'ROM' || isROTB === 'ROH' ||isROTB === '' || isROTB === null && (
        <Alert variant="danger" className="text-center mb-4">
          <p>Data yang direlease hanya ROT atau ROB.</p>
        </Alert>
      )}

      {(isAlreadyPosted === 0 || isAlreadyPosted === null || isAlreadyPosted === '') && (isROTB === 'ROT' || isROTB === 'ROB') && (
        <FormData
          setError={setError}
          setValue={setValue}
          dataParams={dataParams}
          fields={JadwalPemerliharaanFeild}
          path={API_PATH().opsisdis.jadwal_pemeliharaan.har_rotbmh}
          customLabel="hide"
          ids='ids'
          isModal
          onLoading={setLoading}
        >
          <Form noValidate onSubmit={handleSubmit(onSubmitForm)} className="px-4 py-3">
            <p className="text-center mb-4 fs-5 fw-bold text-primary">
              Apakah Anda yakin ingin direlease?
            </p>

            <Modal.Footer className="d-flex justify-content-center">
              <Button type="submit" variant="primary" isLoading={loading}>
                Simpan
              </Button>
              <ButtonCancel type="modal" onClick={handleClose} variant="danger" />
            </Modal.Footer>
          </Form>
        </FormData>
      )}
    </>
  );
}
