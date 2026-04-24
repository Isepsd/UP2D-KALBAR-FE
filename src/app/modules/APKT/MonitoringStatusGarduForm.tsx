import React, { useEffect, useState } from 'react';
import { Form, Modal } from 'react-bootstrap';

import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import ButtonCancel from '@app/components/Button/ButtonCancel';
import { API_PATH } from '@app/services/_path.service';
import Button from '@app/components/Button/Button';
import RequiredInfo from '@app/components/Info/RequiredInfo';
import { GarduStatusField, IGarduStatus } from '@app/interface/management-status-gardu.interface';
import FormDataModal from '../Form/FormDataModal';

function MonitoringStatusGarduForm({ dataSelected }: any) {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();

  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    point_name: Yup.string().required('Point Name wajib diisi'),
    nama_gardu: Yup.string().required('Nama gardu wajib diisi'),
    status_2: Yup.string().nullable(),
    status_gardu: Yup.number().nullable().transform((_, v) => (v == 1 ? 1 : 0)),
  });

  const [formModel] = useState<any>({ status_gardu: 0 });

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
  const { errors }: any = formState;
  const watchStatus2 = useWatch({ control, name: 'status_2' });

  /** SUBMIT FORM HANDLING */
  const onSubmitForm = (data: IGarduStatus) => {
    data.status_2 = data?.status_gardu ? 'up' : 'down'
    setDataParams(data);
  };

  const initForm = (data: any) => {
    Object.keys(GarduStatusField).map((field: any) => {
      switch (field) {
        case "status_gardu":
          setValue(field, data?.status_2 == "up" ? 1 : 0);
          break;
        default:
          setValue(field, data[field]);
          break;
      }
    });
  }

  useEffect(() => {
    if (dataSelected) {
      initForm(dataSelected)
    }

  }, [dataSelected])


  return (
    <>
      <FormDataModal
        setError={setError}
        setValue={setValue}
        dataParams={dataParams}
        fields={GarduStatusField}
        path={API_PATH().apkt.monitoring_gardu_status}
        onLoading={setLoading}
        customLabel={'hide'}
        isModal={true}
        batch={false}
        overrideType={{ tanggal: 'date' }}
        ids="id_scd_statusgardu"
        dataSelected={dataSelected}
      >
        <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
          <Modal.Body>
            <Form.Group className='mb-3'>
              <Form.Label>
                Point Name <RequiredInfo />
              </Form.Label>
              <Form.Control
                {...register('point_name')} disabled
                isInvalid={errors.point_name}
              />
              <Form.Control.Feedback type='invalid'>
                {errors?.point_name?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>
                Nama Gardu <RequiredInfo />
              </Form.Label>
              <Form.Control
                {...register('nama_gardu')}
                isInvalid={errors.nama_gardu}
              />
              <Form.Control.Feedback type='invalid'>
                {errors?.nama_gardu?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className='mt-3'>
              <Form.Label>Status <RequiredInfo /></Form.Label>
              <div className='ms-3 py-2'>
                <Form.Check type='switch' id='status' {...register('status_gardu')} label={watchStatus2 == "up" ? 'Nyala' : 'Padam'} />
              </div>
            </Form.Group>
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

export default MonitoringStatusGarduForm