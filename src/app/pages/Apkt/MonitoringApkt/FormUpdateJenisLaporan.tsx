import React, { useState } from 'react';
import { Col, Form, Modal } from 'react-bootstrap';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import ButtonCancel from '@app/components/Button/ButtonCancel';
import SelectFormStatic from "@app/modules/SelectForm/SelectFormStatic";
import { API_PATH } from '@app/services/_path.service';
import Button from '@app/components/Button/Button';
import RequiredInfo from '@app/components/Info/RequiredInfo';
import FormDataModal from '@app/modules/Form/FormDataModal';

interface IFormUpdateJenisLaporan {
  dataSelected?: any;
  setModal?: any;
}

function FormUpdateJenisLaporan({ dataSelected }: IFormUpdateJenisLaporan) {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();

  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    jenis_laporan: Yup.string().required("Jenis Laporan wajib diisi"),
  });

  const [formModel] = useState<any>({});

  const {
    // register,
    control,
    handleSubmit,
    setValue,
    setError,
    formState,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: formModel,
  });
  const { errors }: any = formState;
  /** NOTIFICATION HANDLER */


  /** SUBMIT FORM HANDLING */
  const onSubmitForm = (data: any) => {
    setDataParams(data);
  };

  const options = [
    { label: 'GANGGUAN', value: 'GANGGUAN' },
    { label: 'PEMELIHARAAN', value: 'PEMELIHARAAN' },
  ]

  return (
    <>
      <FormDataModal
        setError={setError}
        setValue={setValue}
        dataParams={dataParams}
        fields={{ jenis_laporan: "" }}
        path={API_PATH().apkt.trans_jar}
        onLoading={setLoading}
        customLabel={'hide'}
        dataSelected={dataSelected}
        isModal={true}
        ids="id_apkt_trans_jar"
      >
        <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
          <Modal.Body>
            <Form.Group as={Col} className='mb-3'>
              <Form.Label>
                Jenis Laporan <RequiredInfo />
              </Form.Label>
              {/* <Form.Control
                {...register('jenis_laporan')}
                isInvalid={errors.jenis_laporan}
              /> */}
               <SelectFormStatic
                control={control}
                errors={errors}
                fieldName={`jenis_laporan`}
                options={options}
              />
              <Form.Control.Feedback type='invalid'>
                {errors?.jenis_laporan?.message}
              </Form.Control.Feedback>
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

export default FormUpdateJenisLaporan