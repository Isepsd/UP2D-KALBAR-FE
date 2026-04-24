import React, { useState } from 'react';
import { Form, Modal, Alert } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import ButtonCancel from '@app/components/Button/ButtonCancel';
import FormData from '@app/modules/Form/FormData';
import { IFasopNoWO, IFasopNoWOField } from '@app/interface/jaringan-no-wo.interface';
import moment from 'moment';
import { API_PATH } from '@app/services/_path.service';
import Button from '@app/components/Button/Button';

export default function WoDraftingPelaksanaanForm({id_user_mulai_wo, handleClose, isAlreadyPelaksanaan }: any) {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();

  const validationSchema = Yup.object().shape({
    posting_wo: Yup.string().nullable(),
    progres: Yup.string().nullable(),
    tgl_mulai_wo: Yup.string().nullable(),
    id_user_mulai_wo: Yup.string().nullable(),
  });

  const formModel: IFasopNoWO = {
    posting_wo: '',
    progres: '',
    tgl_mulai_wo: '',
    id_user_mulai_wo: '',
  
  };

  const {
    handleSubmit,
    setValue,
    setError,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: formModel,
  });



  const onSubmitForm = (data:any) => {
    if (isAlreadyPelaksanaan === 3) {
      alert('Data yang sudah diambil tidak bisa diambil kembali.');
      return;
    }
  
   
    data.posting_wo = '3';
    data.progres = 'PELAKSANAAN WO'
    data.tgl_mulai_wo = moment().format('YYYY-MM-DD');
    data.st_mulai_wo = 1;
    data.id_user_mulai_wo=id_user_mulai_wo.id_user_mulai_wo ;
    setDataParams(data);
    console.log("Data Params:", data); // Log data before closing modal
    
    // Delay handleClose to ensure PUT request gets sent
    setTimeout(() => handleClose(), 500);
  };
  

  return (
    <>
      {isAlreadyPelaksanaan === 3 && (
        <Alert variant="danger" className="text-center mb-4">
          <p>Data yang sudah diambil tidak bisa diambil kembali.</p>
        </Alert>
      )}
      {isAlreadyPelaksanaan === 4 && (
        <Alert variant="danger" className="text-center mb-4">
          <p>Data yang sudah diposting tidak bisa diambil kembali.</p>
        </Alert>
      )}

      {isAlreadyPelaksanaan === 1 && (
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
              Apakah Wo Akan Di Ambil ?
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
