import React, { useState } from 'react';
import { Card, Col, Row, Form } from 'react-bootstrap';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import Button from '@app/components/Button/Button';
import InputUpload from '@app/components/Upload/InputUpload';
import InputForm from '@app/components/Input/FormInputNoLabel';
import ButtonCancel from '@app/components/Button/ButtonCancel';
import { API_PATH } from '@app/services/_path.service';

import { IUploadImageRekapPadamField, UploadImageRekapPadamField } from '@app/interface/opsisi-rekap-padam.interface';
import FormDataModal from '@app/modules/Form/FormDataModal';

function ModalPhoto({ dataSelected }: any) {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();

  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({});

  const [formModel] = useState<any>({
  });

  const { handleSubmit, setValue, setError, control } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: formModel,
  });
  const watchNamaFile = useWatch({ control, name: 'nama_file' });

  /** SUBMIT FORM HANDLING */
  const onSubmitForm = (data: IUploadImageRekapPadamField) => {
    const params = {
      // ...dataSelected,
      id_trans_ep: dataSelected?.id_trans_ep,
      ...data,
    }
    setDataParams(params);
  };

  const handleUploaded = (e: any) => {
    setValue('photo', e);
  };


  // useEffect(() => {
  //   console.log("dataSelected", dataSelected);

  // }, [dataSelected])

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
                fields={UploadImageRekapPadamField}
                path={API_PATH().opsisdis.rekap_padam.trans_ep}
                onLoading={setLoading}
                customLabel={'hide'}
                dataSelected={dataSelected}
                hideTitle
                batch={false}
                ids='id_trans_ep'
              >
                <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
                  <Form.Group className='mb-3'>
                    <Form.Label>Foto</Form.Label>
                    <InputUpload
                      onUploaded={handleUploaded}
                      previewUrl={watchNamaFile}
                      folder={'rekap-padam'}
                      accept=".png,.jpeg,.jpg"
                    />
                  </Form.Group>
                  <Form.Group className='mb-3'>
                    <Form.Label>Latitude</Form.Label>
                    <InputForm control={control} name={'lat'} />
                  </Form.Group>
                  <Form.Group className='mb-3'>
                    <Form.Label>Longitude</Form.Label>
                    <InputForm control={control} name={'lon'} />
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

export default ModalPhoto;
