import React, { useState } from 'react';
import { Form, Modal, Row } from 'react-bootstrap';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import FormData from '@app/modules/Form/FormData';
import ButtonCancel from '@app/components/Button/ButtonCancel';
import { API_PATH } from '@app/services/_path.service';
import SelectAsyncDynamic from '@app/modules/SelectForm/SelectAsyncDynamic';
import Button from '@app/components/Button/Button';
import {
  FasopKinerjaScadaFiled,
  IFasopKinerjaScada,
} from '@app/interface/fasop-kinerja-scada.interface';
import RequiredInfo from '@app/components/Info/RequiredInfo';

function PbTrafoGIUploadForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();

  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    id_gardu_induk: Yup.number()
      .typeError('Wajib diisi')
      .required('Wajib diisi'),
    id_trafo: Yup.number().typeError('Wajib diisi').required('Wajib diisi'),
    file: Yup.string().required('Wajib diisi'),
  });

  const [formModel] = useState<any>({ status: '1' });
  const { handleSubmit, control, setValue, setError, formState } =
    useForm<IFasopKinerjaScada>({
      resolver: yupResolver(validationSchema),
      defaultValues: formModel,
    });
  const { errors }: any = formState || {};
  /** WATCH / SUBSCRIBVE FORM CHANGES */

  /** SUBMIT FORM HANDLING */
  const onSubmitForm = (data: IFasopKinerjaScada) => {
    setDataParams(data);
  };

  return (
    <>
      <FormData
        setError={setError}
        setValue={setValue}
        dataParams={dataParams}
        fields={FasopKinerjaScadaFiled}
        path={API_PATH().master.fasop.kinerja_scada}
        onLoading={setLoading}
        customLabel={'hide'}
        isModal={true}
      >
        <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
          <Modal.Body>
            <Row>
              <Form.Group className='mb-3'>
                <Form.Label>
                  Gardu
                  <RequiredInfo />
                </Form.Label>
                <SelectAsyncDynamic
                  fieldName='id_pointtype'
                  pathServiceName=''
                  path='master/fasop/point-type-get'
                  labelField='name'
                  valueField='id_pointtype'
                  placeholder='Pilih...'
                  isClearable={true}
                  errors={errors}
                  control={control}
                  isSearchable={false}
                  queryParams={{ is_induk: 'INDUK' }}
                />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>
                  Trafo
                  <RequiredInfo />
                </Form.Label>
                <SelectAsyncDynamic
                  fieldName='id_pointtype'
                  pathServiceName=''
                  path='master/fasop/point-type-get'
                  labelField='name'
                  valueField='id_pointtype'
                  placeholder='Pilih...'
                  isClearable={true}
                  errors={errors}
                  control={control}
                  isSearchable={false}
                  queryParams={{ is_induk: 'INDUK' }}
                />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>
                  File
                  <RequiredInfo />
                </Form.Label>
                <Form.Control type='file' />
              </Form.Group>
            </Row>
          </Modal.Body>

          <Modal.Footer>
            <div className='d-flex gap-2'>
              <ButtonCancel type='modal' />
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

export default PbTrafoGIUploadForm;
