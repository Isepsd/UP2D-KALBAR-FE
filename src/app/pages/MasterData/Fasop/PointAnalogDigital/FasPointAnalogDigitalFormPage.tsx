import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';

import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import FormData from '@app/modules/Form/FormData';
import ButtonCancel from '@app/components/Button/ButtonCancel';
import { API_PATH } from '@app/services/_path.service';
import SelectAsyncDynamic from '@app/modules/SelectForm/SelectAsyncDynamic';
import { ActionFloating } from '@app/styled/action.styled';
import { FasopCPointField, IFasopCPoint } from '@app/interface/fasop-c-point.interface';
// import { JENIS_LOKASI } from '@app/configs/jenis-lokasi.config';
import FormInputControl from '@app/components/Input/FormInputControl';
import { get } from 'lodash';
import TopBarLoader from '@app/components/Loader/TopBarLoader';
// import FormatPesan from './FormatPesan';

const TIPE = {
  D: 'DIGITAL',
  A: 'ANALOG',
}

export default function FasPointAnalogDigitalFormPage() {
  const [dataParams, setDataParams] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [tipePoint, setTipePoint] = useState<any>();
  /** FORM  HANDLE
   */
  const validationSchema: any = Yup.object().shape({
    id_bay_lokasi: Yup.string().nullable(),
    id_ref_lokasi: Yup.string().nullable(),
    station: Yup.string().nullable(),
    nama_lokasi: Yup.string().nullable(),
    status: Yup.number().nullable().transform((_, v) => (v == 1 ? 1 : 0)),
  });
  const [formModel] = useState<any>({});

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    control,
    formState,
  } = useForm<IFasopCPoint>({
    resolver: yupResolver(validationSchema),
    defaultValues: formModel,
  });
  const { errors }: any = formState || {};
  const watchKinerja = useWatch({ control, name: 'kinerja' });
  const watchCaptureTelemetring = useWatch({ control, name: 'capture_telemetring' });
  const watchTipePointKelompok = useWatch({ control, name: 'point_type' });

  /** SUBMIT FORM HANDLING */
  const onSubmitForm = (data: IFasopCPoint) => {
    setDataParams(data);
  };

  useEffect(() => {
    if (watchTipePointKelompok) {
      const tipeP = get(TIPE, watchTipePointKelompok)
      setTipePoint(tipeP ? tipeP : 'NULL')
    } else {
      setTipePoint(false)
    }
  }, [watchTipePointKelompok])

  return (
    <>
      <TopBarLoader isLoading={loading} />
      <FormData
        setError={setError}
        setValue={setValue}
        dataParams={dataParams}
        fields={FasopCPointField}
        path={API_PATH().master.fasop.c_point}
        onLoading={setLoading}
      >
        <Col md='10' xs='12'>
          <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
            <Row>
              <Col sm>
                <Form.Group className='mb-3'>
                  <Form.Label>Jenis Point</Form.Label>
                  {
                    tipePoint &&
                    <SelectAsyncDynamic
                      fieldName='id_pointtype'
                      pathServiceName='master.fasop.point_type'
                      labelField='name'
                      valueField='id_pointtype'
                      placeholder='Pilih...'
                      errors={errors}
                      control={control}
                      queryParams={{ jenispoint: tipePoint }}
                    />
                  }
                </Form.Group>
              </Col>
              <Col sm>
                {/* <Form.Group className='mb-3'>
                  <Form.Label>Station</Form.Label>
                  <SelectAsyncDynamic
                    fieldName='point_number'
                    pathServiceName='master.fasop.c_point'
                    labelField='station'
                    valueField='point_number'
                    placeholder='Pilih...'
                    isClearable={true}
                    errors={errors}
                    control={control}
                  //   queryParams={{
                  //     id_ref_jenis_lokasi_in: `
                  //  ${JENIS_LOKASI().gardu_induk},
                  //  ${JENIS_LOKASI().trafo_gi},
                  //  ${JENIS_LOKASI().penyulang},
                  //  ${JENIS_LOKASI().zone},
                  //  ${JENIS_LOKASI().section},
                  //  ${JENIS_LOKASI().segment},
                  //  ${JENIS_LOKASI().gardu_distribusi},
                  //  ${JENIS_LOKASI().gardu_hubung},
                  //  ${JENIS_LOKASI().trafo_gd}`,
                  //     // page: 1,
                  //     // limit: 10
                  //   }}
                  />
                </Form.Group> */}
                 <Form.Group className="mb-3">
                  <Form.Label>Station</Form.Label>
                  <SelectAsyncDynamic
                    fieldName="id_ref_lokasi"
                    pathServiceName="master.jaringan.ref_lokasi"
                    labelField="nama_lokasi"
                    valueField="id_ref_lokasi"
                    placeholder="Pilih..."
                    isClearable={true}
                    errors={errors}
                    control={control}
                    queryParams={{
                      // jenispoint: tipePoint,
                      page: 1,
                      limit: 100,
                      path: "nama_lokasi",
                    }}
         
                  />
                </Form.Group>
              </Col>
              <Col sm>
                <Form.Group className='mb-3'>
                  <Form.Label>Bay</Form.Label>
                  <SelectAsyncDynamic
                    fieldName='id_bay_lokasi'
                    pathServiceName='master.jaringan.ref_lokasi'
                    labelField='nama_lokasi'
                    valueField='id_ref_lokasi'
                    placeholder='Pilih...'
                    isClearable={true}
                    errors={errors}
                    control={control}
                  //   queryParams={{
                  //     id_ref_jenis_lokasi_in: `
                  //  ${JENIS_LOKASI().gardu_induk},
                  //  ${JENIS_LOKASI().trafo_gi},
                  //  ${JENIS_LOKASI().penyulang},
                  //  ${JENIS_LOKASI().zone},
                  //  ${JENIS_LOKASI().section},
                  //  ${JENIS_LOKASI().segment},
                  //  ${JENIS_LOKASI().gardu_distribusi},
                  //  ${JENIS_LOKASI().gardu_hubung},
                  //  ${JENIS_LOKASI().trafo_gd}`,
                  //     // page: 1,
                  //     // limit: 10
                  //   }}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col sm>
                <FormInputControl
                  required={true}
                  labelName='Point Number'
                  type='text'
                  register={register('point_number')}
                  isInvalid={errors?.point_number as boolean | undefined}
                  message={errors?.point_number?.message}
                  placeholder='-'
                  readOnly
                />
              </Col>
              <Col sm>
                <FormInputControl
                  required={true}
                  labelName='Point Name'
                  type='text'
                  register={register('point_name')}
                  isInvalid={errors?.point_name as boolean | undefined}
                  message={errors?.point_name?.message}
                  placeholder='-'
                  readOnly
                />
              </Col>
            </Row>
            <Row>
              <Col sm>
                <FormInputControl
                  required={true}
                  labelName='Point Text'
                  type='text'
                  register={register('point_text')}
                  isInvalid={errors?.point_text as boolean | undefined}
                  message={errors?.point_text?.message}
                  placeholder='-'
                  readOnly
                />
              </Col>
              <Col sm>
                <FormInputControl
                  required={true}
                  labelName='Kelompok'
                  type='text'
                  register={register('point_type')}
                  isInvalid={errors?.point_type as boolean | undefined}
                  message={errors?.point_type?.message}
                  placeholder='-'
                  readOnly
                />
              </Col>
            </Row>
            <Row>
              <Col sm>
                <Form.Group>
                  <Form.Label>Capture Telemetring</Form.Label>
                  <div className='ms-3 py-2'>
                    <Form.Check
                      type='switch'
                      id='capture_telemetring'
                      {...register('capture_telemetring')}
                      label={watchCaptureTelemetring ? 'Ya' : 'Tidak'}
                    />
                  </div>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col sm>
                <Form.Group>
                  <Form.Label>Hitung Kinerja</Form.Label>
                  <div className='ms-3 py-2'>
                    <Form.Check
                      type='switch'
                      id='kinerja'
                      {...register('kinerja')}
                      label={watchKinerja ? 'Ya' : 'Tidak'}
                    />
                  </div>
                </Form.Group>
              </Col>
            </Row>
            <ActionFloating className='d-flex gap-2'>
              <Button type='submit' variant='primary' disabled={loading}>
                Simpan
              </Button>
              <ButtonCancel />
            </ActionFloating>
          </Form>
        </Col>
      </FormData>
    </>
  );
}
