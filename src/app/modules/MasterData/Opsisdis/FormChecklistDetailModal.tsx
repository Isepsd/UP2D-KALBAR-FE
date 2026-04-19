import React, { useState } from 'react';
import { Col, Form, Modal, Row } from 'react-bootstrap';

import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import ButtonCancel from '@app/components/Button/ButtonCancel';
import Button from '@app/components/Button/Button';
import RequiredInfo from '@app/components/Info/RequiredInfo';
import SelectFormStatic from '@app/modules/SelectForm/SelectFormStatic';


import { API_PATH } from '@app/services/_path.service';
import { IFormChecklistDetailField, IFormChecklistDetail } from '@app/interface/opsisdis-form-checklist.interface';
import SelectAsyncDynamic from '@app/modules/SelectForm/SelectAsyncDynamic';
import FormDataModal from '@app/modules/Form/FormDataModal';

const STATUS_OPTIONS: any = [
  { label: 'Judul/Label', value: '0' },
  { label: 'Posting/Masukan', value: '1' }
]

function FormChecklistDetailModal({ id_ref_pm, dataselected, modal }: any) {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();

  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    nama: Yup.string().required('Uraian Tugas Wajib diisi'),
    satuan: Yup.string(),
    nilai_acuan: Yup.string(),
    id_induk_ref_pm_detail: Yup.string(),
    induk: Yup.string().required("Sebagai Belum dipilih"),
    no_urut: Yup.string(),
    tipe_data: Yup.string(),
    nilai_pemeriksaan: Yup.string(),
  });

  const [formModel] = useState<any>({ induk: '0' });

  const {
    register,
    handleSubmit,
    control,
    setValue,
    setError,
    formState,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: formModel,
  });

  const { errors }: any = formState;

  /** SUBMIT FORM HANDLING */
  const onSubmitForm = (data: IFormChecklistDetail) => {
    setDataParams(data);
  };

  const watchStatus = useWatch({ control, name: 'sebagai' });

  return (
    <>
      <FormDataModal
        setError={setError}
        setValue={setValue}
        dataParams={dataParams}
        fields={IFormChecklistDetailField}
        path={API_PATH().master.opsisdis.pm.ref_pm_detail}
        onLoading={setLoading}
        customLabel={'hide'}
        isModal={true}
        batch={false}
        overrideType={{ tanggal: 'date' }}
        dataSelected={dataselected}
        redirectSubmitted={true}
        modal={modal}
      >
        <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
          <Modal.Body>
            <Form.Group className='mb-3'>
              <Form.Label>
                Uraian Detail Tugas <RequiredInfo />
              </Form.Label>
              <Form.Control
                {...register('nama')}
                isInvalid={errors.nama}
              />
              <Form.Control.Feedback type='invalid'>
                {errors?.nama?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Row>
              <Col md={4}>
                <Form.Group className='mb-3'>
                  <Form.Label>Sebagai</Form.Label>
                  <SelectFormStatic
                    control={control}
                    errors={errors}
                    fieldName={'induk'}
                    options={STATUS_OPTIONS}
                  ></SelectFormStatic>
                  <Form.Control.Feedback type='invalid'>
                    {errors?.induk?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className='mb-3'>
                  <Form.Label>
                    No Urut
                  </Form.Label>
                  <Form.Control
                    {...register('no_urut')} type='number'
                    isInvalid={errors.no_urut}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors?.no_urut?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              {watchStatus == "1" && <Col md={4}>
                <Form.Group className='mb-3'>
                  <Form.Label>
                    Tipe Data
                  </Form.Label>
                  <Form.Control
                    {...register('tipe_data')}
                    isInvalid={errors.tipe_data}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors?.tipe_data?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              }
            </Row>
            {watchStatus == "1" &&
              <Row>
                <Col md={4}>
                  <Form.Group className='mb-3'>
                    <Form.Label>
                      Nama Induk
                    </Form.Label>
                    <SelectAsyncDynamic
                      fieldName='id_induk_ref_pm_detail'
                      pathServiceName='master.opsisdis.pm.ref_pm_detail'
                      labelField='nama'
                      valueField='id_ref_pm_detail'
                      placeholder='Pilih...'
                      errors={errors}
                      control={control}
                      queryParams={{ id_ref_pm: id_ref_pm }}
                    />
                    <Form.Control.Feedback type='invalid'>
                      {errors?.id_induk_ref_pm_detail?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className='mb-3'>
                    <Form.Label>
                      Nilai Acuan
                    </Form.Label>
                    <Form.Control
                      {...register('nilai_acuan')}
                      isInvalid={errors.nilai_acuan}
                    />
                    <Form.Control.Feedback type='invalid'>
                      {errors?.nilai_acuan?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className='mb-3'>
                    <Form.Label>
                      Satuan
                    </Form.Label>
                    <Form.Control
                      {...register('satuan')}
                      isInvalid={errors.satuan}
                    />
                    <Form.Control.Feedback type='invalid'>
                      {errors?.satuan?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
            }
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
      </FormDataModal>
    </>
  );
}

export default FormChecklistDetailModal