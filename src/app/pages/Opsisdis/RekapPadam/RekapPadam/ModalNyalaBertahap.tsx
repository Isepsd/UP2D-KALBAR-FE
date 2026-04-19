import React, { useState } from 'react';
import { Card, Col, Row, Form, InputGroup } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import Button from '@app/components/Button/Button';
import InputForm from '@app/components/Input/FormInputNoLabel';
import ButtonCancel from '@app/components/Button/ButtonCancel';
import InputDate from '@app/components/Date/InputDate';
import { API_PATH } from '@app/services/_path.service';
import FormDataModal from '@app/modules/Form/FormDataModal';

function ModalNyalaBertahap({ idTransEp }: any) {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();

  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({});

  const { handleSubmit, setValue, setError, control, formState, register } = useForm({
    resolver: yupResolver(validationSchema)
  });
  const { errors }: any = formState || {};

  /** SUBMIT FORM HANDLING */
  const onSubmitForm = (data: any) => {
    const { beban_masuk, jam_masuk } = data;
    const params = {
      ...data,
      jam_masuk: jam_masuk,
      id_trans_ep: idTransEp,
      beban_masuk: Number(beban_masuk),
    };

    setDataParams(params);
  };

  // const getOnresult = () => {
  //   console.log("getOnresult");

  //   window.location.reload()
  // }

  return (
    <>
      <Row>
        <Col md={12} className='mb-4 position-static'>
          <Card>
            <Card.Body>
              <FormDataModal
                setError={setError}
                setValue={setValue}
                dataParams={dataParams}
                fields={{}}
                path={API_PATH().opsisdis.rekap_padam.tranf_ep_section}
                onLoading={setLoading}
                customLabel={'hide'}
                hideTitle
                batch={false}
                // onGetDataResult={getOnresult}
              >
                <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
                  <Form.Group as={Row} className='mb-3'>
                    <Form.Label column md={4}>Section</Form.Label>
                    <Col md={8}>
                      <InputForm control={control} name={'section'} />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className='mb-3'>
                    <Form.Label column md={4}>Jam Masuk</Form.Label>
                    <Col md={8}>
                      <InputDate
                        errors={errors}
                        register={register}
                        type="datetime-local"
                        fieldName="jam_masuk"
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className='mb-3'>
                    <Form.Label column md={4}>Beban Masuk</Form.Label>
                    <Col md={8}>
                      <InputGroup>
                        <InputForm control={control} placeholder='0.00' name={'beban_masuk'} />
                        <InputGroup.Text>mW</InputGroup.Text>
                      </InputGroup>
                    </Col>
                  </Form.Group>
                  <div className='gap-2 text-right'>
                    <ButtonCancel type='modal' ids='id' />
                    <Button
                      type='submit'
                      variant='primary'
                      className='ms-1'
                      isLoading={loading}
                    >
                      Simpan
                    </Button>
                  </div>
                </Form>
              </FormDataModal>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default ModalNyalaBertahap;
