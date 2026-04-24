import React, { useState } from 'react';
import { Col, Form, Modal, Row } from 'react-bootstrap';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import ButtonCancel from '@app/components/Button/ButtonCancel';
import Button from '@app/components/Button/Button';
import RequiredInfo from '@app/components/Info/RequiredInfo';
import SelectAsyncDynamic from '@app/modules/SelectForm/SelectAsyncDynamic';
import SelectFormStatic from '@app/modules/SelectForm/SelectFormStatic';

import { API_PATH } from '@app/services/_path.service';
import { IFormChecklist, IFormChecklistField } from '@app/interface/opsisdis-form-checklist.interface';
import FormDataModal from '@app/modules/Form/FormDataModal';

const STATUS_OPTIONS: any = [
  { label: 'Active', value: '1' },
  { label: 'Non Active', value: '0' }
]
const LEVEL_OPTIONS: any = [
  { label: '1', value: 1 },
  { label: '2', value: 2 }
]

interface IFormChecklistModal {
  modal: any
  dataSelected: any
}

function FormChecklistModal({
  modal,
  dataSelected
}: IFormChecklistModal) {
  const [loading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();

  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    nama: Yup.string().required('Uraian Tugas Wajib diisi'),
    level_pm: Yup.number().typeError("Level belum dipilih").required('Level belum dipilih'),
    id_ref_aset_jenis: Yup.number().typeError("kategori belum dipilih").required('Kategori belum dipilih'),
    status: Yup.number().typeError("Status belum dipilih").required('Status belum dipilih'),

  });

  const [formModel] = useState<any>({ status: '1' });

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
  const onSubmitForm = (data: IFormChecklist) => {
    setDataParams(data);
  };

  return (
    <>
      <FormDataModal
        setError={setError}
        setValue={setValue}
        dataParams={dataParams}
        fields={IFormChecklistField}
        path={API_PATH().master.opsisdis.pm.ref_pm}
        customLabel={'hide'}
        isModal={true}
        batch={false}
        overrideType={{ tanggal: 'date' }}
        modal={modal}
        dataSelected={dataSelected}
        ids="id_ref_pm"
      >
        <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
          <Modal.Body>
            <Form.Group className='mb-3'>
              <Form.Label>
                Uraian Tugas <RequiredInfo />
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
                  <Form.Label>Level</Form.Label>
                  <SelectFormStatic
                    control={control}
                    errors={errors}
                    fieldName="level_pm"
                    placeholder='Pilih...'
                    options={LEVEL_OPTIONS}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className='mb-3'>
                  <Form.Label>Kategori</Form.Label>
                  <SelectAsyncDynamic
                    fieldName='id_ref_aset_jenis'
                    pathServiceName='master.aset.ref_aset_jenis'
                    labelField='nama_aset_jenis'
                    valueField='id_ref_aset_jenis'
                    placeholder='Pilih...'
                    errors={errors}
                    control={control}
                    queryParams={{ sort_by: 'nama_aset_jenis' }}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className='mb-3'>
                  <Form.Label>Status</Form.Label>
                  <SelectFormStatic
                    control={control}
                    errors={errors}
                    fieldName={'status'}
                    options={STATUS_OPTIONS}
                  ></SelectFormStatic>
                  <Form.Control.Feedback type='invalid'>
                    {errors?.status?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
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

export default FormChecklistModal