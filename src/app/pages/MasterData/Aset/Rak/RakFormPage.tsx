import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import ButtonCancel from '@app/components/Button/ButtonCancel';
import FormData from '@app/modules/Form/FormData';

import {IAsetRak, AsetRakField} from '@app/interface/aset-rak.interface';
import RequiredInfo from '@app/components/Info/RequiredInfo';
import { API_PATH } from '@app/services/_path.service';

export default function RakFormPage() {
  const { id } = useParams();

  const { currentUser } = useSelector((state: any) => state.auth);
  
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();

  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    nama: Yup.string().typeError('Nama Wajib diisi').required('Nama Wajib diisi'),
    status: Yup.number().nullable().transform((_, v) => (v == 1 ? 1 : 0)),
  });

  const [formModel] = useState<any>({ status: 1 });
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
  const { errors }: any = formState || {};
  const watchStatus = useWatch({ control, name: 'status' });

  const onSubmitForm = (data: IAsetRak) => {
    if(id){
      data.id_user_update = currentUser.id_user
    } else {
      data.id_user_entri = currentUser.id_user
    }
    setDataParams(data);
  };

  return (
    <>
      <FormData
        setError={setError}
        setValue={setValue}
        dataParams={dataParams}
        fields={AsetRakField}
        path={API_PATH().master.aset.ref_aset_rak}
        customLabel='state'
        onLoading={setLoading}
      >
        <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
          <Form.Group className='mt-3'>
            <Form.Label>Nama <RequiredInfo /></Form.Label>
            <Form.Control {...register('nama')} isInvalid={errors.nama} />
            <Form.Control.Feedback type='invalid'>{errors?.nama?.message}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className='mt-3'>
            <Form.Label>Status <RequiredInfo /></Form.Label>
            <div className='ms-3 py-2'>
              <Form.Check type='switch' id='aktif' {...register('status')} label={watchStatus ? 'Aktif': 'Tidak Aktif'} />
            </div>
          </Form.Group>
          <Form.Group className='mt-4'>
            <Button type='submit' variant='primary' disabled={loading}>Simpan</Button>
            <ButtonCancel />
          </Form.Group>
        </Form>
      </FormData>
    </>
  );
}
