import React, { useState } from 'react';
import { Form, Modal,Alert } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import ButtonCancel from '@app/components/Button/ButtonCancel';
import FormData from '@app/modules/Form/FormData';
import { IFasopApproveWO, IFasopApproveWOField } from '@app/interface/jaringan-spv-scadatel.interface';
import moment from 'moment';
import { API_PATH } from '@app/services/_path.service';
import Button from '@app/components/Button/Button';

export default function AproveSpvScadatelFormApproveJQ({id_spv_scada, handleClose, isAlreadyPelaksanaan,isAlreadyApprove }: any) {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();

  const validationSchema = Yup.object().shape({
    approve_spv_scada: Yup.string().nullable(),
    progres: Yup.string().nullable(),
    tgl_approve_spv_scada: Yup.string().nullable(),
    id_spv_scada: Yup.string().nullable(),
  });

  const formModel: IFasopApproveWO = {
    approve_spv_scada: '',
    progres: '',
    tgl_approve_spv_scada: '',
    id_spv_scada: '',
  
  };

  const {
    handleSubmit,
    setValue,
    setError,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: formModel,
  });



  const onSubmitForm = (data:IFasopApproveWO) => {

   
    data.approve_spv_scada= 'Di Setujui',
    data.progres= 'CLOSING WO',
    data.tgl_approve_spv_scada=moment().format("YYYY-MM-DD"),
    data.id_spv_scada= id_spv_scada.id_user_mulai_wo,
   setDataParams(data);
    console.log("Data Params:", data); // Log data before closing modal
    
    // Delay handleClose to ensure PUT request gets sent
    setTimeout(() => handleClose(), 500);
  };
  console.log(isAlreadyApprove)

  return (
    <>
      {isAlreadyApprove === 'Di Setujui' ? (
        <Alert variant="danger" className="text-center mb-4">
          <p>Data Menunggu Di Approve SPV Bidang</p>
        </Alert>
      ) : (
        isAlreadyPelaksanaan === 4 && (
          <FormData
            setError={setError}
            setValue={setValue}
            dataParams={dataParams}
            fields={IFasopApproveWOField}
            path={API_PATH().fasop.drafting.wo_drafting}
            customLabel="hide"
            isModal
            onLoading={setLoading}
          >
            <Form noValidate onSubmit={handleSubmit(onSubmitForm)} className="px-4 py-3">
              <p className="text-center mb-4 fs-5 fw-bold text-primary">
                Apakah Wo Akan Di Approve?
              </p>
  
              <Modal.Footer className="d-flex justify-content-center">
                <Button type="submit" variant="primary" isLoading={loading}>
                  Simpan
                </Button>
                <ButtonCancel type="modal" onClick={handleClose} variant="danger" />
              </Modal.Footer>
            </Form>
          </FormData>
        )
      )}
    </>
  );
}  
