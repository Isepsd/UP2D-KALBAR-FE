import React, { useState } from 'react';
import { Col, Form, InputGroup, Modal, Row } from 'react-bootstrap';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import FormData from '@app/modules/Form/FormData';
import ButtonCancel from '@app/components/Button/ButtonCancel';
import { API_PATH } from '@app/services/_path.service';
import SelectAsyncDynamic from '@app/modules/SelectForm/SelectAsyncDynamic';
import Button from '@app/components/Button/Button';
import { FasopKinerjaScadaFiled, IFasopKinerjaScada } from '@app/interface/fasop-kinerja-scada.interface';
import RequiredInfo from '@app/components/Info/RequiredInfo';
import { JENIS_LOKASI } from '@app/configs/jenis-lokasi.config';

export default function KinerjaScadaForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();


  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    tahun: Yup.number().typeError('Harus angka').required('Wajib diisi'),
    // id_unit: Yup.number().typeError('Harus angka').required('Wajib diisi'),
    t_01: Yup.number().typeError('Harus angka').required('Wajib diisi').min(0, "Min 0").max(100, "Max 100"),
    t_02: Yup.number().typeError('Harus angka').required('Wajib diisi').min(0, "Min 0").max(100, "Max 100"),
    t_03: Yup.number().typeError('Harus angka').required('Wajib diisi').min(0, "Min 0").max(100, "Max 100"),
    t_04: Yup.number().typeError('Harus angka').required('Wajib diisi').min(0, "Min 0").max(100, "Max 100"),
    t_05: Yup.number().typeError('Harus angka').required('Wajib diisi').min(0, "Min 0").max(100, "Max 100"),
    t_06: Yup.number().typeError('Harus angka').required('Wajib diisi').min(0, "Min 0").max(100, "Max 100"),
    t_07: Yup.number().typeError('Harus angka').required('Wajib diisi').min(0, "Min 0").max(100, "Max 100"),
    t_08: Yup.number().typeError('Harus angka').required('Wajib diisi').min(0, "Min 0").max(100, "Max 100"),
    t_09: Yup.number().typeError('Harus angka').required('Wajib diisi').min(0, "Min 0").max(100, "Max 100"),
    t_10: Yup.number().typeError('Harus angka').required('Wajib diisi').min(0, "Min 0").max(100, "Max 100"),
    t_11: Yup.number().typeError('Harus angka').required('Wajib diisi').min(0, "Min 0").max(100, "Max 100"),
    t_12: Yup.number().typeError('Harus angka').required('Wajib diisi').min(0, "Min 0").max(100, "Max 100"),
    // id_pointtype: Yup.number().typeError('Harus angka').required('Wajib diisi'),
  });

  const [formModel] = useState<any>({ status: '1' });
  const {
    register,
    handleSubmit,
    control,
    setValue,
    setError,
    formState,
  } = useForm<IFasopKinerjaScada>({
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
              <Form.Group as={Col} className='mb-3'>
                <Form.Label>Tahun<RequiredInfo /></Form.Label>
                <Form.Control
                  {...register('tahun')}
                  isInvalid={errors.tahun} />
                <Form.Control.Feedback type='invalid'>
                  {errors?.tahun?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} className='mb-3'>
                <Form.Label>Jenis Point<RequiredInfo /></Form.Label>
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
                  queryParams={{ is_induk: 'INDUK', showrc: true }}
                />
              </Form.Group>
              <Form.Group as={Col} className='mb-3'>
                <Form.Label>Unit</Form.Label>
                <SelectAsyncDynamic
                  fieldName='id_unit'
                  pathServiceName=''
                  path={API_PATH().master.jaringan.ref_lokasi}
                  labelField='nama_lokasi'
                  valueField='id_ref_lokasi'
                  placeholder='Pilih...'
                  isClearable={true}
                  errors={errors}
                  control={control}
                  isSearchable={false}
                  queryParams={{ id_ref_jenis_lokasi_in: `${JENIS_LOKASI().uiw},${JENIS_LOKASI().up3},${JENIS_LOKASI().ulp}, ${JENIS_LOKASI().up2d}, ${JENIS_LOKASI().up3b}, ${JENIS_LOKASI().up2b}, ${JENIS_LOKASI().ultg}, ${JENIS_LOKASI().upt}`, showrc: true }}
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} className='mb-3'>
                <Form.Label>Januari<RequiredInfo /></Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    {...register('t_01')}
                    type='number'
                    isInvalid={errors.t_01}
                  />
                  <InputGroup.Text id="t_01">%</InputGroup.Text>
                  <Form.Control.Feedback type='invalid'>
                    {errors?.t_01?.message}
                  </Form.Control.Feedback>
                </InputGroup>


              </Form.Group>
              <Form.Group as={Col} className='mb-3'>
                <Form.Label>Februari<RequiredInfo /></Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    {...register('t_02')}
                    type='number'
                    isInvalid={errors.t_02}
                  />
                  <InputGroup.Text id="t_02">%</InputGroup.Text>
                  <Form.Control.Feedback type='invalid'>
                    {errors?.t_02?.message}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} className='mb-3'>
                <Form.Label>Maret<RequiredInfo /></Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    {...register('t_03')}
                    type='number'
                    isInvalid={errors.t_03}
                  />
                  <InputGroup.Text id="t_03">%</InputGroup.Text>
                  <Form.Control.Feedback type='invalid'>
                    {errors?.t_03?.message}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} className='mb-3'>
                <Form.Label>April<RequiredInfo /></Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    {...register('t_04')}
                    type='number'
                    isInvalid={errors.t_04}
                  />
                  <InputGroup.Text id="t_04">%</InputGroup.Text>
                  <Form.Control.Feedback type='invalid'>
                    {errors?.t_04?.message}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} className='mb-3'>
                <Form.Label>Mei<RequiredInfo /></Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    {...register('t_05')}
                    type='number'
                    isInvalid={errors.t_05}
                  />
                  <InputGroup.Text id="t_05">%</InputGroup.Text>
                  <Form.Control.Feedback type='invalid'>
                    {errors?.t_05?.message}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} className='mb-3'>
                <Form.Label>Juni<RequiredInfo /></Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    {...register('t_06')}
                    type='number'
                    isInvalid={errors.t_06}
                  />
                  <InputGroup.Text id="t_06">%</InputGroup.Text>
                  <Form.Control.Feedback type='invalid'>
                    {errors?.t_06?.message}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Row>   <Row>
              <Form.Group as={Col} className='mb-3'>
                <Form.Label>Juli<RequiredInfo /></Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    {...register('t_07')}
                    type='number'
                    isInvalid={errors.t_07}
                  />
                  <InputGroup.Text id="t_07">%</InputGroup.Text>
                  <Form.Control.Feedback type='invalid'>
                    {errors?.t_07?.message}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} className='mb-3'>
                <Form.Label>Agustus<RequiredInfo /></Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    {...register('t_08')}
                    type='number'
                    isInvalid={errors.t_08}
                  />
                  <InputGroup.Text id="t_08">%</InputGroup.Text>
                  <Form.Control.Feedback type='invalid'>
                    {errors?.t_08?.message}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} className='mb-3'>
                <Form.Label>September<RequiredInfo /></Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    {...register('t_09')}
                    type='number'
                    isInvalid={errors.t_09}
                  />
                  <InputGroup.Text id="t_09">%</InputGroup.Text>
                  <Form.Control.Feedback type='invalid'>
                    {errors?.t_09?.message}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} className='mb-3'>
                <Form.Label>Oktober<RequiredInfo /></Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    {...register('t_10')}
                    type='number'
                    isInvalid={errors.t_10}
                  />
                  <InputGroup.Text id="t_10">%</InputGroup.Text>
                  <Form.Control.Feedback type='invalid'>
                    {errors?.t_10?.message}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} className='mb-3'>
                <Form.Label>November<RequiredInfo /></Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    {...register('t_11')}
                    type='number'
                    isInvalid={errors.t_11}
                  />
                  <InputGroup.Text id="t_11">%</InputGroup.Text>
                  <Form.Control.Feedback type='invalid'>
                    {errors?.t_11?.message}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} className='mb-3'>
                <Form.Label>Desember<RequiredInfo /></Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    {...register('t_12')}
                    type='number'
                    isInvalid={errors.t_12}
                  />
                  <InputGroup.Text id="t_12">%</InputGroup.Text>
                  <Form.Control.Feedback type='invalid'>
                    {errors?.t_12?.message}
                  </Form.Control.Feedback>
                </InputGroup>
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
