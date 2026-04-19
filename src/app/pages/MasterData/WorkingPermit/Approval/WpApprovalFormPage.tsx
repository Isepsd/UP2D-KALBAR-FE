import React, { useState } from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import { useForm, } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import ButtonCancel from '@app/components/Button/ButtonCancel';
import FormData from '@app/modules/Form/FormData';
import SelectAsyncDynamic from '@app/modules/SelectForm/SelectAsyncDynamic';

import { IApprovalManagementWp, FApprovalManagementWp } from '@app/interface/working-permit.interface';
import RequiredInfo from '@app/components/Info/RequiredInfo';
import { API_PATH } from '@app/services/_path.service';

export default function WpApprovalFormPage() {
  
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();

  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    id_jabatan: Yup.number().typeError("Belum pilih jabatan").required('Jabatan Wajib diisi'),
    id_user: Yup.number().typeError("Belum pilih Pegawai").required('Nama Pegawai Wajib diisi'),
    id_departemen: Yup.number().typeError("Belum pilih bagian").required('Bagian Wajib diisi'),
  });

  const [formModel] = useState<any>({ status: 1 });
  const { handleSubmit, setValue, setError, control, formState, } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: formModel,
  });
  const { errors }: any = formState || {};
  const onSubmitForm = (data: IApprovalManagementWp) => {
    setDataParams(data);
  };

  return (
    <>
      <FormData
        setError={setError}
        setValue={setValue}
        dataParams={dataParams}
        fields={FApprovalManagementWp}
        path={API_PATH().master.working_permit.approval_management_wp}
        customLabel='state'
        onLoading={setLoading}
      >
        <Col md={6} xs={12}>
          <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
            <Form.Group className='mb-3'>
              <Form.Label>Jabatan<RequiredInfo/></Form.Label>
              <SelectAsyncDynamic 
                fieldName='id_jabatan' 
                pathServiceName='master.admin_ksa.jabatan'
                labelField='nama'
                valueField='id_jabatan'
                placeholder='Pilih Jabatan'
                errors={errors} 
                control={control} 
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Pegawai<RequiredInfo/></Form.Label>
              <SelectAsyncDynamic 
                fieldName='id_user' 
                pathServiceName='admin.user'
                labelField='fullname'
                valueField='id_user'
                placeholder='Pilih Pegawai'
                errors={errors} 
                control={control} 
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Bagian<RequiredInfo/></Form.Label>
              <SelectAsyncDynamic 
                fieldName='id_departemen' 
                pathServiceName='master.admin_ksa.departemen'
                labelField='nama'
                valueField='id_departemen'
                placeholder='Pilih Bagian'
                errors={errors} 
                control={control} 
              />
            </Form.Group>
            <Form.Group className='mt-4'>
              <Button type='submit' variant='primary' disabled={loading}>Simpan</Button>
              <ButtonCancel />
            </Form.Group>
          </Form>
        </Col>
      </FormData>
    </>
  );
}
