import React, { useState, useEffect } from 'react';
import { Form, Modal, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import FormData from '@app/modules/Form/FormData';
import ButtonCancel from '@app/components/Button/ButtonCancel';
import { API_PATH } from '@app/services/_path.service';
import SelectAsyncDynamic from '@app/modules/SelectForm/SelectAsyncDynamic';
import Button from '@app/components/Button/Button';
import RequiredInfo from '@app/components/Info/RequiredInfo';
import { PengukuranBebanUploadField } from '@app/interface/opsisdis_pengukuran_beban,interface';
import { downloadFileStatic } from '@app/services/management-upload.service';
import axios from 'axios';
import fileDownload from 'js-file-download';

function PbEnergyUpload() {
  const { currentUser } = useSelector((state: any) => state.auth);
  const source = axios.CancelToken.source();

  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();

  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    customer_rid: Yup.number().typeError('Wajib diisi').required('Wajib diisi'),
    file: Yup.mixed().required('Wajib diisi'),
  });

  const [formModel] = useState<any>({ status: '1' });
  const { register, handleSubmit, control, setValue, setError, formState } =
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

  /** DYNAMIC EXPORT DATA */
  const downloadXlsx = async () => {
    const path = `/static/file/format_upload_pengukuran_trafo_ktt.xls`;
    try {
      let req: any = await downloadFileStatic(path, source.token);
      const dataBlob = req;
      fileDownload(dataBlob, `format_upload_pengukuran_trafo_ktt.xls`);
    } catch (err: any) {
      // console.log(err);

    }
  };

  return (
    <>
      <FormData
        setError={setError}
        setValue={setValue}
        dataParams={dataParams}
        fields={PengukuranBebanUploadField}
        path={API_PATH().opsisdis.pengukuran_beban.energy}
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
                  Customer RID
                  <RequiredInfo />
                </Form.Label>
                <SelectAsyncDynamic
                  fieldName='customer_rid'
                  pathServiceName='master.opsisdis.customer'
                  labelField='nama'
                  valueField='customer_rid'
                  placeholder='-- PILIH --'
                  isClearable={true}
                  errors={errors}
                  required={true}
                  control={control}
                  queryParams={{
                    page: -1,
                    limit: -1,
                    sort_by: 'nama',
                  }}
                />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>
                  Upload File Data Beban
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
              </Form.Group>
              <Form.Group className='mb-3'>
                <a className='text-primary cursor-pointer' onClick={downloadXlsx}>
                  <i>Download format</i>
                </a>
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

export default PbEnergyUpload;
