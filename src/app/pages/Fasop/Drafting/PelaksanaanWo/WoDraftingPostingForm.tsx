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

export default function WoDraftingPelaksanaanForm({id_user_selesai_wo, handleClose, isAlreadyPosted }: any) {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();

  const validationSchema = Yup.object().shape({
    posting_wo: Yup.string().nullable(),
    progres: Yup.string().nullable(),
    tgl_selesai_wo: Yup.string().nullable(),
    st_selesai_wo: Yup.string().nullable(),
    id_user_selesai_wo: Yup.string().nullable(),
    approve_spv_scada: Yup.string().nullable(),
    approve_spv_data: Yup.string().nullable(),
    approve_spv_opsis: Yup.string().nullable(),
  });

  const formModel: IFasopNoWO = {
    posting_wo: '',
    progres: '',
    tgl_selesai_wo: '',
    st_selesai_wo: '',
    id_user_selesai_wo: '',
    approve_spv_scada: '',
    approve_spv_data: '',
    approve_spv_opsis: '',

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
    if (isAlreadyPosted === 4) {
      alert('Data yang sudah diposting tidak bisa diposting kembali.');
      return;
    }
  
   
    data.posting_wo = '4';
    data.progres='MENUNGGU APPROVE SPV'
    data.tgl_selesai_wo= moment().format("YYYY-MM-DD"),
    data.st_selesai_wo=1
    data.id_user_selesai_wo=id_user_selesai_wo.id_user_mulai_wo 
    data.approve_spv_scada = 'Belum di setujui',
		data.approve_spv_data = 'Belum di setujui',
		data.approve_spv_opsis = 'Belum di setujui'


    setDataParams(data);
    console.log("Data Params:", data); // Log data before closing modal
    
    // Delay handleClose to ensure PUT request gets sent
    setTimeout(() => handleClose(), 500);
  };
  

  return (
    <>
     {isAlreadyPosted === 4 && (
        <Alert variant="danger" className="text-center mb-4">
        <p>Data yang sudah diposting tidak bisa diposting kembali.</p>

        </Alert>
      )}
      {isAlreadyPosted === 1 && (
            <Alert variant="danger" className="text-center mb-4">
              <p>Data Belum Di Ambil.</p>
            </Alert>
          )}



      {isAlreadyPosted === 3 && (
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
