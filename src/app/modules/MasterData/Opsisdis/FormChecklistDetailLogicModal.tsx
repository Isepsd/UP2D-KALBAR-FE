import React, { useState } from 'react';
import { Col, Form, Modal, Row } from 'react-bootstrap';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import ButtonCancel from '@app/components/Button/ButtonCancel';
import Button from '@app/components/Button/Button';
import RequiredInfo from '@app/components/Info/RequiredInfo';


import { API_PATH } from '@app/services/_path.service';
import { IFormChecklistDetailLogic, IFormChecklistDetailLogicField } from '@app/interface/opsisdis-form-checklist.interface';
import FormDataModal from '@app/modules/Form/FormDataModal';

function FormChecklistDetailLogicModal({ id_ref_pm_detail, dataSelected, modal }: any) {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();

  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    nilai_range: Yup.string().required('Nilai/Range Wajib diisi'),
    kesimpulan: Yup.string().required('Kesimpulan wajib diisi'),
  });

  const [formModel] = useState<any>({ status: '1' });

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: formModel,
  });

  const { errors }: any = formState;

  /** SUBMIT FORM HANDLING */
  const onSubmitForm = (data: IFormChecklistDetailLogic) => {
    data.id_ref_pm_detail = id_ref_pm_detail
    setDataParams(data);
  };

  return (
    <>
      <FormDataModal
        setError={setError}
        setValue={setValue}
        dataParams={dataParams}
        fields={IFormChecklistDetailLogicField}
        path={API_PATH().master.opsisdis.pm.ref_pm_detail_logic}
        onLoading={setLoading}
        customLabel={'hide'}
        isModal={true}
        batch={false}
        ids="id_ref_pm_detail_logic"
        overrideType={{ tanggal: 'date' }}
        redirectSubmitted={true}
        dataSelected={dataSelected}
        modal={modal}
      >
        <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
          <Modal.Body>
            <Row>
              <Col md={6}>
                <Form.Group className='mb-3'>
                  <Form.Label>
                    Nilai/Range <RequiredInfo />
                  </Form.Label>
                  <Form.Control
                    {...register('nilai_range')}
                    isInvalid={errors.nilai_range}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors?.nilai_range?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className='mb-3'>
                  <Form.Label>
                    Kesimpulan
                  </Form.Label>
                  <Form.Control
                    {...register('kesimpulan')}
                    isInvalid={errors.kesimpulan}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors?.kesimpulan?.message}
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

export default FormChecklistDetailLogicModal