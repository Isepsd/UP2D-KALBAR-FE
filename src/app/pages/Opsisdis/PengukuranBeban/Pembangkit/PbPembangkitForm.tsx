import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Row, Col, Button, Form, Tabs, Tab } from 'react-bootstrap';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import ButtonCancel from '@app/components/Button/ButtonCancel';
import FormData from '@app/modules/Form/FormData';

import { JaringanPenyulangField } from '@app/interface/jaringan-penyulang.interface';
import RequiredInfo from '@app/components/Info/RequiredInfo';
import { JENIS_LOKASI } from '@app/configs/jenis-lokasi.config';
import { API_PATH } from '@app/services/_path.service';
import SelectAsyncDynamic from '@app/modules/SelectForm/SelectAsyncDynamic';

export default function PbPembangkitForm() {
  const { id } = useParams();

  const { currentUser } = useSelector((state: any) => state.auth);

  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();

  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    id_unit_pembangkit: Yup.number().typeError('Belum pilih gardu induk').required('Belum pilih unit pembangkit'),
    id_pembangkit: Yup.number().typeError('Belum pilih Trafo').required('Belum pilih Pembangkit'),
    i: Yup.number().typeError('Arus harus diisi').required('Arus harus diisi'),
    v: Yup.number().typeError('Arus harus diisi').required('Arus harus diisi'),
    p: Yup.number().typeError('Arus harus diisi').required('Arus harus diisi'),
    q: Yup.number().typeError('Arus harus diisi').required('Arus harus diisi'),
    f: Yup.number().typeError('Arus harus diisi').required('Arus harus diisi'),
    // id_lokasi: Yup.number().typeError('Belum pilih UP3').required('Belum pilih UP3'),       
  });

  const [formModel] = useState<any>({ status_listrik: '1', lat: 0, lon: 0 });
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
  const { errors }: any = formState || {};
  const [key, setKey] = useState('info');

  /** SUBSCRIBE FORM CHANGES */
  const watchUnitPembangkit = useWatch({ control, name: 'id_unit_pembangkit' });

  const onSubmitForm = (data: any) => {
    data.id_parent_lokasi = data?.id_trafo_gi;
    data.id_ref_jenis_lokasi = JENIS_LOKASI().penyulang;
    data.tree_jaringan = 1;
    if (id) {
      data.id_user_update = currentUser.id_user
    } else {
      data.id_user_entri = currentUser.id_user
    }
    setDataParams(data);
  };

  return (
    <>
      <FormData
        setError={setError}
        setValue={setValue}
        dataParams={dataParams}
        fields={JaringanPenyulangField}
        path={API_PATH().master.jaringan.ref_lokasi}
        customLabel='state'
        onLoading={setLoading}
      >
        <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
          <Tabs
            id="form-frequensi"
            activeKey={key}
            onSelect={(k: any) => setKey(k)}
            className="mb-3"
          >
            <Tab eventKey="info" title="Info">
              <Row className='mb-3'>
                {/* LEFT COLUMN  */}
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Unit Pembangkit</Form.Label>
                    <SelectAsyncDynamic
                      fieldName='id_unit_pembangkit'
                      pathServiceName='master.jaringan.ref_lokasi'
                      labelField='nama_lokasi'
                      valueField='id_ref_lokasi'
                      placeholder='Pilih...'
                      isClearable={true}
                      errors={errors}
                      control={control}
                      queryParams={{
                        page: -1,
                        limit: 10,
                        sort_by: 'nama_lokasi',
                        id_ref_jenis_lokasi: JENIS_LOKASI().unit_pembangkit,
                      }}
                    />
                    <Form.Control.Feedback type='invalid'>
                      {errors?.id_unit_pembangkit?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Pembangkit</Form.Label>
                    <SelectAsyncDynamic
                      fieldName='id_pembangkit'
                      pathServiceName='master.jaringan.ref_lokasi'
                      labelField='nama_lokasi'
                      valueField='id_ref_lokasi'
                      placeholder='Pilih...'
                      isClearable={true}
                      errors={errors}
                      control={control}
                      watchParent={watchUnitPembangkit}
                      queryParams={{
                        page: -1,
                        limit: 10,
                        sort_by: 'nama_lokasi',
                        id_ref_jenis_lokasi: JENIS_LOKASI().pembangkit,
                      }}
                    />
                    <Form.Control.Feedback type='invalid'>
                      {errors?.id_pembangkit?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col md={3}>
                  <Form.Group controlId='nama_lokasi'>
                    <Form.Label>
                      Arus (A) <RequiredInfo />
                    </Form.Label>
                    <Form.Control
                      {...register('i')}
                      isInvalid={errors.i}
                    />
                    <Form.Control.Feedback type='invalid'>
                      {errors?.i?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group controlId='nama_lokasi'>
                    <Form.Label>
                      Tegangan (kV)<RequiredInfo />
                    </Form.Label>
                    <Form.Control
                      {...register('v')}
                      isInvalid={errors.v}
                    />
                    <Form.Control.Feedback type='invalid'>
                      {errors?.v?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Row className='mb-3'>
                <Col md={3}>
                  <Form.Group controlId='nama_lokasi'>
                    <Form.Label>
                      Daya Aktif (MW) <RequiredInfo />
                    </Form.Label>
                    <Form.Control
                      {...register('p')}
                      isInvalid={errors.p}
                    />
                    <Form.Control.Feedback type='invalid'>
                      {errors?.p?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group controlId='nama_lokasi'>
                    <Form.Label>
                      Daya Reactive (mvar) <RequiredInfo />
                    </Form.Label>
                    <Form.Control
                      {...register('q')}
                      isInvalid={errors.q}
                    />
                    <Form.Control.Feedback type='invalid'>
                      {errors?.q?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group controlId='nama_lokasi'>
                    <Form.Label>
                      Frekwensi (hz) <RequiredInfo />
                    </Form.Label>
                    <Form.Control
                      {...register('f')}
                      isInvalid={errors.f}
                    />
                    <Form.Control.Feedback type='invalid'>
                      {errors?.f?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

              </Row>
            </Tab>           
          </Tabs>


          <Form.Group className='mt-4'>
            <Button type='submit' variant='primary' disabled={loading}>Simpan</Button>
            <ButtonCancel />
          </Form.Group>
        </Form>
      </FormData>
    </>
  );
}
