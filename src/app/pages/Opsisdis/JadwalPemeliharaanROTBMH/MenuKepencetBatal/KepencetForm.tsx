import React, { useState } from 'react';
import { Form, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import ButtonCancel from '@app/components/Button/ButtonCancel';
import FormData from '@app/modules/Form/FormData';
import { IJadwalPemerliharaan, JadwalPemerliharaanFeild } from '@app/interface/opsisdis-jadwal-pemeliharaan-posting.interface';

import { API_PATH } from '@app/services/_path.service';
import Button from '@app/components/Button/Button';

export default function PostingForm({ handleClose }: any) {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();

  const validationSchema = Yup.object().shape({
    approvel_apd: Yup.string().nullable(),
    tanggal_posting: Yup.string().nullable(),
    status_pekerjaan: Yup.string().nullable()

  });

  const formModel: any = {
    approvel_apd: '',
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

      data.approvel_apd = '1';
      setDataParams(data);

      handleClose();
  };

  return (
    <>
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
              Apakah Anda yakin ingin mencancel batal ini?
            </p>

            <Modal.Footer className="d-flex justify-content-center">
              <Button type="submit" variant="primary" isLoading={loading}>
                Simpan
              </Button>
              <ButtonCancel type="modal" onClick={handleClose} variant="danger" />
            </Modal.Footer>
          </Form>
        </FormData>
    </>
  );
}
