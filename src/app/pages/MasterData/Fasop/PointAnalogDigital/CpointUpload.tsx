import React, { useState, useEffect } from 'react';
import { Form, Modal, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import FormData from '@app/modules/Form/FormData';
import ButtonCancel from '@app/components/Button/ButtonCancel';
import { API_PATH } from '@app/services/_path.service';
import Button from '@app/components/Button/Button';
import RequiredInfo from '@app/components/Info/RequiredInfo';
import { PengukuranBebanUploadField } from '@app/interface/opsisdis_pengukuran_beban,interface';
import axios from 'axios';

function CpointUpload() {
  const { currentUser } = useSelector((state: any) => state.auth);
  const source = axios.CancelToken.source();

  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();

  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    file: Yup.mixed().required('Wajib diisi'),
  });

  const [formModel] = useState<any>({ status: '1' });
  const { register, handleSubmit, setValue, setError, formState } =
    useForm<any>({
      resolver: yupResolver(validationSchema),
      defaultValues: formModel,
    });
  const { errors }: any = formState || {};
  /** WATCH / SUBSCRIBVE FORM CHANGES */

  /** SUBMIT FORM HANDLING */
  const onSubmitForm = (data: any) => {
    const params: any = {
      ...data,
      file: data?.file[0],
      id_user_entri: currentUser.id_user,
    };

    setDataParams(params);
  };


  useEffect(() => {
    return () => {
      source.cancel('Request Canceled');
    };
  }, []);

  return (
    <>
      <FormData
        setError={setError}
        setValue={setValue}
        dataParams={dataParams}
        fields={PengukuranBebanUploadField}
        path={API_PATH().master.fasop.c_point}
        onLoading={setLoading}
        customLabel={'hide'}
        isModal={true}
        isFormData
      >
        <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
          <Modal.Body>
            <Row>
              <Form.Group className='mb-3'>
                <Form.Label>
                  Upload File
                  <RequiredInfo />
                </Form.Label>
                <Form.Control
                  isInvalid={errors?.file as boolean | undefined}
                  type='file'
                  {...register('file')}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.file?.message}
                </Form.Control.Feedback>
                {/* <i className='mt-4'>Upload file dengan extesion .xlsx</i> */}
              </Form.Group>
            </Row>
          </Modal.Body>

          <Modal.Footer>
            <div className='d-flex gap-2'>
              <ButtonCancel type='modal' />
              <Button
                type='submit'
                variant='primary'
                disabled={loading}
                isLoading={loading}
              >
                Simpan
              </Button>
            </div>
          </Modal.Footer>
        </Form>
      </FormData>
    </>
  );
}

export default CpointUpload;
