import React, { useState } from 'react';
import { Card, Col, Row, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import FormData from '@app/modules/Form/FormData';

import {
  IInputJadwal,
  InputJadwalField,
} from '@app/interface/opsisdis-input-jadwal.interface';

import { API_PATH } from '@app/services/_path.service';
import InputJadwalFormFirst from '@app/modules/opsisdis/JawdalPemeliharaan/InputJadwalFormFirst';
import InputJadwalFormSecond from '@app/modules/opsisdis/JawdalPemeliharaan/InputJadwalFormSecond';
import DetailPelaporCard from '@app/modules/opsisdis/JawdalPemeliharaan/DetailPelaporCard';

function InputJadwalUP3Form() {
  const [dataParams, setDataParams] = useState<any>();

  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({});

  const [formModel] = useState<any>({ status_data: 0 });

  const { register, handleSubmit, setValue, setError, control, formState } =
    useForm({
      resolver: yupResolver(validationSchema),
      defaultValues: formModel,
    });
  const { errors }: any = formState || {};
  // const watchStatus = useWatch({ control, name: 'status_data' });

  /** SUBMIT FORM HANDLING */
  const onSubmitForm = (data: IInputJadwal) => {
    setDataParams(data);
  };


  return (
    <>
      <Row>
        <Col md={12} className='mb-4 position-static'>
          <Card style={{ borderColor: 'var(--success)' }}>
            <Card.Header className='bg-success font-weight-light text-white'>
              FORM USULAN PEMELIHARAAN
            </Card.Header>
            <Card.Body>
              <FormData
                setError={setError}
                setValue={setValue}
                dataParams={dataParams}
                fields={InputJadwalField}
                path={API_PATH().apkt.trans_jar}
                customLabel={'hide'}
                hideTitle
                batch={true}
              >
                <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
                  <Card
                    className='card-widget position-static mb-4'
                    style={{ border: '1px solid var(--black-50)' }}
                  >
                    <Card.Header
                      className='font-weight-light font-sise-large'
                      style={{ backgroundColor: 'var(--black-50)' }}
                    >
                      Detail Usulan Pemeliharaan
                    </Card.Header>
                    <Card.Body>
                      <InputJadwalFormFirst
                        control={control}
                        register={register}
                        errors={errors}
                        setValue={setValue}
                      />
                      <InputJadwalFormSecond register={register} />
                    </Card.Body>
                  </Card>

                  <DetailPelaporCard
                    control={control}
                    register={register}
                    errors={errors}
                  />
                </Form>
              </FormData>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default InputJadwalUP3Form;
