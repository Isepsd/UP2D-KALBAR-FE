import React, { useState } from 'react';
import { Form, Modal, Alert } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import ButtonCancel from '@app/components/Button/ButtonCancel';
import FormData from '@app/modules/Form/FormData';
import { IJadwalPemerliharaan, JadwalPemerliharaanFeild } from '@app/interface/opsisdis-jadwal-pemeliharaan-posting.interface';

import { API_PATH } from '@app/services/_path.service';
import moment from 'moment';
import Button from '@app/components/Button/Button';

export default function PostingForm({ handleClose, isAlreadyPosted,isKategori,isRelease }: any) {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();

  const validationSchema = Yup.object().shape({
    approvel_area: Yup.string().nullable(),
    tanggal_posting: Yup.string().nullable(),
    status_pekerjaan: Yup.string().nullable()

  });

  const formModel: any = {
    approvel_area: '',
    tanggal_posting: '',
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


  const isRotRob = isKategori === 'ROT' || isKategori === 'ROB';

  const canPosting =
    !isAlreadyPosted &&
    (
      !isRotRob || (isRotRob && isRelease === 1)
    );

  const onSubmitForm = (data: IJadwalPemerliharaan) => {

    if (isAlreadyPosted) {
      alert('Data yang sudah diposting tidak bisa diposting kembali.');
      return;
    }

    // 🚫 CEGAT ROT / ROB YANG BELUM RELEASE
    if ((isKategori === 'ROT' || isKategori === 'ROB') && isRelease !== 1) {
      alert('Data ROT / ROB harus direlease terlebih dahulu.');
      return;
    }


    // Jika konfirmasi diperlukan, tampilkan pesan konfirmasi sebelum melanjutkan
    if (isAlreadyPosted === 0) {

      data.approvel_area = '1';
      data.status_pekerjaan = 'USULAN PEKERJAAN';
      data.tanggal_posting = moment().utcOffset(7).format('YYYY-MM-DD HH:mm:ss');
      setDataParams(data);

      handleClose();
    }
  };

  return (
    <>
      {isAlreadyPosted === 1 && (
        <Alert variant="danger" className="text-center mb-4">
          <p>Data yang sudah diposting tidak bisa diposting kembali.</p>
        </Alert>
      )}

      {isRotRob && isRelease !== 1 && (
         <Alert variant="danger" className="text-center mb-4">
          <p>Data ROT ROB harus direlease dulu.</p>
        </Alert>
      )}

      {/* {(isAlreadyPosted === 0) && (isKategori === 'ROM' || isKategori === 'ROH' ) && ( */}
        {canPosting && (
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
              Apakah Anda yakin ingin diposting?
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
