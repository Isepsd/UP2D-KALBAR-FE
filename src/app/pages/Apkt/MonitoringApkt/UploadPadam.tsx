import React, { useState, useEffect } from 'react';
import { Form, Modal, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import ButtonCancel from '@app/components/Button/ButtonCancel';
import { API_PATH } from '@app/services/_path.service';
import Button from '@app/components/Button/Button';
import RequiredInfo from '@app/components/Info/RequiredInfo';
import axios from 'axios';
import FormDataModal from '@app/modules/Form/FormDataModal';
import { get } from 'lodash';
import moment from 'moment';
import { UpdatePadamField } from '@app/interface/apkt-trans-jar.interface';

function UploadPadam({ dataRowsSelect }: any) {
  const { currentUser } = useSelector((state: any) => state.auth);
  const source = axios.CancelToken.source();

  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, 
    setDataParams
  ] = useState<any>();

  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    date: Yup.string().required("Data Harus diisi"),
    // id_apkt_trans_jar: Yup.number().typeError("Data harus diisi"),
    // ids: Yup.array().typeError("Data harus diisi")
  });

  const [formModel] = useState<any>({
    date: moment().format("YYYY-MM-DD HH:mm:ss"),
    event: "update_nyala"
  });
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
      id_user_entri: currentUser.id_user,
    };
    
    let ids: any = []
    dataRowsSelect?.map((item: any) => {
      params.id_apkt_trans_jar = item?.id_apkt_trans_jar
      item?.children?.map((items: any) => {
        ids.push(items?.id_apkt_trans_jar_det)

      })
      ids.push(item?.id_apkt_trans_jar_det)
    })
    params.ids = ids;
    // console.log('params', params);
    setDataParams(params);
  };



  useEffect(() => {
    return () => {
      source.cancel('Request Canceled');
    };
  }, []);



  return (
    <>
      <FormDataModal
        setError={setError}
        setValue={setValue}
        dataParams={dataParams}
        fields={UpdatePadamField}
        path={get(API_PATH(), "apkt.trans_jar_detail")}
        onLoading={setLoading}
        customLabel={'hide'}
        isModal={true}
      >
        <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
          <Modal.Body>
            <Row>
              <Form.Group className='mb-3'>
                <Form.Label>
                  Tanggal
                  <RequiredInfo />
                </Form.Label>
                <Form.Control
                  isInvalid={errors?.date as boolean | undefined}
                  type='datetime-local'
                  formTarget='YYYY-MM-DD HH:mm:ss'
                  {...register('date')}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.date?.message}
                </Form.Control.Feedback>
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
      </FormDataModal>
    </>
  );
}

export default UploadPadam;
