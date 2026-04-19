import React, { useState } from 'react';
import { Col, Form, Modal, Row } from 'react-bootstrap';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import FormData from '@app/modules/Form/FormData';
import ButtonCancel from '@app/components/Button/ButtonCancel';
import { API_PATH } from '@app/services/_path.service';
import Button from '@app/components/Button/Button';
import RequiredInfo from '@app/components/Info/RequiredInfo';
import SelectAsyncDynamic from '../SelectForm/SelectAsyncDynamic';
import { IWpSOPnJSA, WpSOPnJSAField } from '@app/interface/wp-sopjsa.interface';
import InputUpload from '@app/components/Upload/InputUpload';

export default function WmSOPForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();

  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    id_wp_master_bagian: Yup.number()
      .nullable()
      .transform((_, val) => (val === Number(val) ? val : null)),
    judul_pekerjaan: Yup.string().required('Judul pekerjaan wajib diisi'),
    nomor: Yup.string().nullable(),
  });

  const [formModel] = useState<any>({ status: '1' });
  const {
    register,
    handleSubmit,
    control,
    setValue,
    setError,
    formState: { errors },
    watch
  } = useForm<IWpSOPnJSA>({
    resolver: yupResolver(validationSchema),
    defaultValues: formModel,
  });

  const watchNamaFile = watch('nama_file')
  
  // console.log(watchNamaFile)
  /** SUBMIT FORM HANDLING */
  const onSubmitForm = (data: IWpSOPnJSA) => {
    setDataParams(data);
  };

  return (
    <>
      <FormData
        setError={setError}
        setValue={setValue}
        dataParams={dataParams}
        fields={WpSOPnJSAField}
        path={API_PATH().working_permit.sop_jsa}
        onLoading={setLoading}
        customLabel={'hide'}
        isModal={true}
        overrideType={{ tanggal: 'date' }}
      >
        <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
          <Modal.Body>
            <Row>
              <Form.Group as={Col} className='mb-3'>
                <Form.Label>
                  Judul Pekerjaan <RequiredInfo />
                </Form.Label>
                <Form.Control
                  {...register('judul_pekerjaan')}
                  isInvalid={errors?.judul_pekerjaan as boolean | undefined}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.judul_pekerjaan?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} className='mb-3'>
                <Form.Label>
                  Nomor
                </Form.Label>
                <Form.Control
                  {...register('nomor')}
                  isInvalid={errors?.nomor as boolean | undefined}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.nomor?.message}
                </Form.Control.Feedback>
              </Form.Group> 
            </Row>
            <Form.Group className='mb-3'>
                <Form.Label>Bagian</Form.Label>
                <SelectAsyncDynamic
                  fieldName='id_wp_master_bagian'
                  pathServiceName='master.working_permit.bagian'
                  labelField='name'
                  valueField='id_wp_master_bagian'
                  placeholder='Pilih...'
                  errors={errors}
                  control={control}
                  queryParams={{ sort_by: 'name' }}
                />
              </Form.Group>
            <Form.Group as={Col} className='mb-3'>
              <Form.Label>
                File
              </Form.Label>
              <InputUpload previewUrl={watchNamaFile} folder={"sop"} accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,
text/plain, application/pdf" />
              <Form.Control.Feedback type='invalid'>
                {errors?.nama_file?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <hr className='my-2' />
            <table className='table'>
              <tbody>
                <tr>
                  <th colSpan={4} >
                    SOP &amp; JOB SAFETY ANALYSIS
                  </th>
                </tr>
                <tr>
                  <th >No</th>
                  <th>Langkah Pekerjaan</th>
                  <th>Bahaya &amp; Resiko</th>
                  <th>Pengendalian</th>
                </tr>
                {Array.from(Array(15).keys()).map((i: any) => (
                  <tr className='pad' key={i}>
                    <td >{i + 1}</td>
                    <td>
                      <Form.Control
                        {...register(`langkah${i + 1}` as any)}
                        size='sm'
                      />
                    </td>
                    <td>
                      <Form.Control
                        {...register(`potensi${i + 1}` as any)}
                        size='sm'
                      />
                    </td>
                    <td>
                      <Form.Control
                        {...register(`pengendalian${i + 1}` as any)}
                        size='sm'
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Modal.Body>

          <Modal.Footer>
            <div className='d-flex gap-2'>
              <ButtonCancel type='modal' ids='id' />
              <Button type='submit' variant='primary' isLoading={loading}>
                Simpan
              </Button>
            </div>
          </Modal.Footer>
        </Form>
      </FormData>
    </>
  );
}
