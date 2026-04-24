import React, { useState } from 'react';
import { Form, Modal, Alert } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import ButtonCancel from '@app/components/Button/ButtonCancel';
import FormData from '@app/modules/Form/FormData';
import { IFasopNoWO, IFasopNoWOField } from '@app/interface/jaringan-no-wo.interface';

import { API_PATH } from '@app/services/_path.service';
import moment from 'moment';
import Button from '@app/components/Button/Button';

export default function WoDraftingForm({ handleClose, isAlreadyPosted }: any) {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();

  const validationSchema = Yup.object().shape({
    posting_wo: Yup.string().nullable(),
    tgl_posting_wo: Yup.string().nullable(),
    id_trans_drafting_wo: Yup.string().nullable(),
  });

  const formModel: IFasopNoWO = {
    posting_wo: '',
    tgl_posting_wo: '',
    id_trans_drafting_wo: '',
  };

  const {
    handleSubmit,
    setValue,
    setError,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: formModel,
  });

  const searchParams = new URLSearchParams(window.location.search);
  const id = searchParams.get('id');

  const onSubmitForm = (data: IFasopNoWO) => {
    if (isAlreadyPosted) {
      alert('Data yang sudah diposting tidak bisa diposting kembali.');
      return;
    }

    // Jika konfirmasi diperlukan, tampilkan pesan konfirmasi sebelum melanjutkan
    if (isAlreadyPosted === 0) {
     
        data.id_trans_drafting_wo = id; // Pastikan id_trans_drafting_wo diatur dengan benar
        data.posting_wo = '1';
        data.tgl_posting_wo = moment().format('YYYY-MM-DD');
        data.progres = 'POSTING WO'
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

            {(isAlreadyPosted === 0 || isAlreadyPosted === 2) && (
              <FormData
                setError={setError}
                setValue={setValue}
                dataParams={dataParams}
                fields={IFasopNoWOField}
                path={API_PATH().fasop.drafting.wo_drafting}
                customLabel="hide"
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
