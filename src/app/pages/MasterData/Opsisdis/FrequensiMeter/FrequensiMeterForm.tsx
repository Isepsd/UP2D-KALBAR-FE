import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Button, Form, Tabs, Tab } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { Controller, useForm,useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import TopBarLoader from '@app/components/Loader/TopBarLoader';
import { addNotification } from '@app/store/notification/notification.action';
import { notificationTemplate } from '@app/helper/notificationTemplate';
import ButtonCancel from '@app/components/Button/ButtonCancel';
import Select from 'react-select';

import { ReactSelectStyle } from '@app/configs/react-select.config';
import {
  getByIdPath,
  postByPath,
  putByPath,
} from '@app/services/main.service';
import { API_PATH } from '@app/services/_path.service';
import { SERIAL_BAUT_RATE, SERIAL_MODE, SERIAL_PARITY, SERIAL_RTS, SERIAL_STOP_BITS } from '@app/configs/select-options.config';
import SelectFormStatic from '@app/modules/SelectForm/SelectFormStatic';

export default function FrequensiMeterForm() {
  const dispatch = useDispatch();
  const source = axios.CancelToken.source();
  const navigate = useNavigate();
  const { id } = useParams();

  const path = API_PATH().master.opsisdis.frequensi
  const label = "Frequensi Meter "

  const { currentUser } = useSelector((state: any) => state.auth);
  const [dataSelected, setDataSelected] = useState<any>()
  const [loadingForm, setLoadingForm] = useState<boolean>(false);


  const [key, setKey] = useState('general');

  const options_sumber = [
    { label: 'SCADA', value: 'scada' },
    { label: 'POWER METER', value: 'power' },
    
  
  ]

  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    nama:Yup.string().nullable(),
    lokasi: Yup.string().nullable(),
    status: Yup.string().nullable(),

    general_koneksi: Yup.string().nullable(),
    general_slaveid:Yup.string().nullable(),
    general_address:Yup.string().nullable(),
    general_scale: Yup.string().nullable(),
    general_mode: Yup.string().nullable(),
    general_logging: Yup.string().nullable(),
    general_interval_logging: Yup.string().nullable(),

    serial_port: Yup.string().nullable(),
    serial_baudrate: Yup.string().nullable(),
    serial_parity: Yup.string().nullable(),
    serial_stopbits: Yup.string().nullable(),
    point_number: Yup.string().nullable(),
    path1: Yup.string().nullable(),
    path2: Yup.string().nullable(),
    path3: Yup.string().nullable(),
    serial_bytesize: Yup.string().nullable(),
    serial_xonxoff: Yup.string().nullable(),
    ip_port:Yup.string().nullable(),
    ip_host: Yup.string().nullable(),
  });
  // const koneksi: any = KONEKSI_KE_ALAT()
  // const serial: any = SERIAL_PORT()
  const baut_rate: any = SERIAL_BAUT_RATE()
  const parity: any = SERIAL_PARITY()
  const stop_bits: any = SERIAL_STOP_BITS()
  const mode: any = SERIAL_MODE()
  const rts: any = SERIAL_RTS()
  const [formModel] = useState<any>({ status: '1', general_logging: '1' });
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: formModel,
  });
  const { errors }: any = formState || {};
  const onSubmitForm = (data: any) => {
    upsertData(data);
  };

  const watchJenisData = useWatch({ control, name: 'datascada' });
  useEffect(() => {
    if (id) getDataById();
    return () => {
      source.cancel('Request Canceled');
    };
  }, []);

  /** GET EDIT DATA */
  const getDataById = async () => {
    try {
      const req: any = await getByIdPath(
        path,
        id,
        source.token
      );
      setDataSelected(req?.results);
      initDataForm(req?.results);
    } catch { }
  };

  const initDataForm = (data: any) => {
    if (data) {
      Object.keys(data).map((field: any) => {
        switch (field) {
          case 'status':
          case 'general_logging':
            setValue(field, String(data[field]));
            break;
          default:
            setValue(field, data[field]);
            break;
        }
      });
    }
  };

  /** PUT / UPDATE DATA REQUEST */
  const upsertData = async (params: any) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    setLoadingForm(true);
    try {
      if (id) {
        params.id_user_update = currentUser.id_user
        await putByPath(path, params, id, source.token)
      } else {
        params.id_user_entri = currentUser.id_user
        await postByPath(path, params, source.token);
      }
      setLoadingForm(false);
      navigate(-1);
      dispatchNotification(
        `Success ${id ? 'update' : 'add'} ${label}`,
        'success'
      );
    } catch (err: any) {
      setLoadingForm(false);
      dispatchNotification(
        `Failed ${id ? 'update' : 'add'} ${label}`,
        'danger'
      );
    }
  };

  /** NOTIFICATION HANDLER */
  const dispatchNotification = (msg: string = '', type: string = '') => {
    const notification = notificationTemplate(msg, type);
    dispatch(addNotification({ ...notification, message: msg, type: type }));
  };

  // console.log("errros",errors);
  

  return (
    <>
      <TopBarLoader isLoading={loadingForm} />

      <Row className='animate__animated animate__fadeIn'>
        <div className='col-md-12'>
          <div className='ms-md-4'>
            <h5 className='py-1'>
              <i className='fa-solid fa-circle-info'></i> {dataSelected?.id ? 'Ubah' : 'Tambah'} {label}
            </h5>
            <hr />

            <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>


              <Row>
              <Col md={3} className="mb-3">
                    <Form.Group className='mb-2'>
                      <Form.Label>Sumber Data</Form.Label>
                      <SelectFormStatic
                        fieldName='datascada'
                        isClearable={true}
                        errors={errors}
                        control={control}
                        options={options_sumber}
                      />
                      <Form.Control.Feedback type='invalid'>
                        {errors?.dataBeban?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  {(watchJenisData == 'power') &&
                  
                <Tabs
                  id="form-frequensi"
                  activeKey={key}
                  onSelect={(k: any) => setKey(k)}
                  className="mb-3"
                >
                   
               
                  <Tab eventKey="general" title="General">
                    <Row className='mb-3'>
                      
                      <Col md={4}>
                        
                        <Form.Group className='mt-3' controlId='nama'>
                          <Form.Label>Nama</Form.Label>
                          <Form.Control
                            {...register('nama')}
                            isInvalid={errors.nama}
                          />
                          <Form.Control.Feedback type='invalid'>
                            {errors?.nama?.message}
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className='mt-3' controlId='lokasi'>
                          <Form.Label>Lokasi</Form.Label>
                          <Form.Control
                            isInvalid={errors.lokasi}
                            {...register('lokasi')}
                          />
                          <Form.Control.Feedback type='invalid'>
                            {errors?.lokasi?.message}
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className='mt-3' controlId='general_scale'>
                          <Form.Label>Scale</Form.Label>
                          <Form.Control
                            isInvalid={errors.general_scale}
                            {...register('general_scale')}
                            type="number"
                          />
                          <Form.Control.Feedback type='invalid'>
                            {errors?.general_scale?.message}
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className='mt-3' controlId='status'>
                          <Form.Label>Status</Form.Label>
                          <div>
                            <Form.Check
                              {...register('status')}
                              inline
                              type='radio'
                              value='1'
                              label='Active'
                            />
                            <Form.Check
                              {...register('status')}
                              inline
                              type='radio'
                              value='0'
                              label='Inactive'
                            />
                          </div>
                          <Form.Control.Feedback type='invalid'>
                            {errors?.status?.message}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group className='mt-3' controlId='general_koneksi'>
                          <Form.Label>Koneksi Ke Alat</Form.Label>
                          <Form.Control
                            isInvalid={errors.general_koneksi}
                            {...register('general_koneksi')}
                          />
                          <Form.Control.Feedback type='invalid'>
                            {errors?.general_koneksi?.message}
                          </Form.Control.Feedback>
                          {/* <Controller
                            control={control}
                            defaultValue={''}
                            name='general_koneksi'
                            rules={{
                              required: true,
                            }}
                            render={({ field: { onChange, value, ref } }) => (
                              <Select
                                placeholder='Pilih koneksi'
                                styles={ReactSelectStyle}
                                classNamePrefix={`${errors.general_koneksi ? 'is-invalid' : ''
                                  }`}
                                inputRef={ref}
                                value={koneksi?.filter(
                                  (c: any) => c.value == value
                                )}
                                onChange={(val: any) => onChange(val?.value)}
                                options={koneksi}
                                isClearable={true}
                              />
                            )}
                          />
                          {errors.general_koneksi && (
                            <div className='invalid-feedback d-block'>
                              {errors.general_koneksi?.message}
                            </div>
                          )} */}
                        </Form.Group>
                        <Form.Group className='mt-3' controlId='general_slaveid'>
                          <Form.Label>Slave ID</Form.Label>
                          <Form.Control
                            isInvalid={errors.general_slaveid}
                            {...register('general_slaveid')}
                            type="number"
                          />
                          <Form.Control.Feedback type='invalid'>
                            {errors?.general_slaveid?.message}
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className='mt-3' controlId='general_address'>
                          <Form.Label>Modbus Addres</Form.Label>
                          <Form.Control
                            isInvalid={errors.general_address}
                            type="number"
                            {...register('general_address')}
                          />
                          <Form.Control.Feedback type='invalid'>
                            {errors?.general_address?.message}
                          </Form.Control.Feedback>
                        </Form.Group>


                      </Col>
                      <Col md={4}>
                        <Form.Group className='mt-3' controlId='general_mode'>
                          <Form.Label>Mode</Form.Label>
                          <Controller
                            control={control}
                            defaultValue={''}
                            name='general_mode'
                            rules={{
                              required: true,
                            }}
                            render={({ field: { onChange, value, ref } }) => (
                              <Select
                                placeholder='Pilih Mode'
                                styles={ReactSelectStyle}
                                classNamePrefix={`${errors.general_mode ? 'is-invalid' : ''
                                  }`}
                                inputRef={ref}
                                value={mode?.filter(
                                  (c: any) => c.value == value
                                )}
                                onChange={(val: any) => onChange(val?.value)}
                                options={mode}
                                isClearable={true}
                              />
                            )}
                          />
                          {errors.general_mode && (
                            <div className='invalid-feedback d-block'>
                              {errors.general_mode?.message}
                            </div>
                          )}
                        </Form.Group>
                        <Form.Group className='mt-3' controlId='general_interval_logging'>
                          <Form.Label>Interval Logging (Detik)</Form.Label>
                          <Form.Control
                            isInvalid={errors.general_interval_logging}
                            {...register('general_interval_logging')}
                            type="number"
                          />
                          <Form.Control.Feedback type='invalid'>
                            {errors?.general_interval_logging?.message}
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className='mt-3' controlId='general_logging'>
                          <Form.Label>Logging</Form.Label>
                          <div className='mt-2'>
                            <Form.Check
                              {...register('general_logging')}
                              inline
                              type='radio'
                              value='1'
                              label='True'
                            />
                            <Form.Check
                              {...register('general_logging')}
                              inline
                              type='radio'
                              value='0'
                              label='False'
                            />
                          </div>
                          <Form.Control.Feedback type='invalid'>
                            {errors?.general_logging?.message}
                          </Form.Control.Feedback>
                        </Form.Group>

                      </Col>
                    </Row>
                  </Tab>

                  <Tab eventKey="serial" title="Serial Port">
                    <Row>
                      <Col md={4}>
                        <Form.Group className='mt-3' controlId='serial_port'>
                          <Form.Label>Port</Form.Label>
                          <Form.Control
                            isInvalid={errors.serial_port}
                            {...register('serial_port')}
                          />
                          <Form.Control.Feedback type='invalid'>
                            {errors?.serial_port?.message}
                          </Form.Control.Feedback>
                          {/* <Controller
                            control={control}
                            defaultValue={''}
                            name='port'
                            rules={{
                              required: true,
                            }}
                            render={({ field: { onChange, value, ref } }) => (
                              <Select
                                placeholder='Pilih Protocol Mode'
                                styles={ReactSelectStyle}
                                classNamePrefix={`${errors.serial_port ? 'is-invalid' : ''
                                  }`}
                                inputRef={ref}
                                value={serial?.filter(
                                  (c: any) => c.value == value
                                )}
                                onChange={(val: any) => onChange(val?.value)}
                                options={serial}
                                isClearable={true}
                              />
                            )}
                          />
                          {errors.serial_port && (
                            <div className='invalid-feedback d-block'>
                              {errors.serial_port?.message}
                            </div>
                          )} */}
                        </Form.Group>
                        <Form.Group className='mt-3' controlId='serial_parity'>
                          <Form.Label>Parity</Form.Label>
                          <Controller
                            control={control}
                            defaultValue={''}
                            name='serial_parity'
                            rules={{
                              required: true,
                            }}
                            render={({ field: { onChange, value, ref } }) => (
                              <Select
                                placeholder='Pilih Parity'
                                styles={ReactSelectStyle}
                                classNamePrefix={`${errors.serial_parity ? 'is-invalid' : ''
                                  }`}
                                inputRef={ref}
                                value={parity?.filter(
                                  (c: any) => c.value == value
                                )}
                                onChange={(val: any) => onChange(val?.value)}
                                options={parity}
                                isClearable={true}
                              />
                            )}
                          />
                          {errors.serial_parity && (
                            <div className='invalid-feedback d-block'>
                              {errors.serial_parity?.message}
                            </div>
                          )}
                        </Form.Group>

                      </Col>
                      <Col md={4}>
                        <Form.Group className='mt-3' controlId='serial_baudrate'>
                          <Form.Label>Baud Rate</Form.Label>
                          <Controller
                            control={control}
                            defaultValue={''}
                            name='serial_baudrate'
                            rules={{
                              required: true,
                            }}
                            render={({ field: { onChange, value, ref } }) => (
                              <Select
                                placeholder='Pilih Baut Rate'
                                styles={ReactSelectStyle}
                                classNamePrefix={`${errors.serial_baudrate ? 'is-invalid' : ''
                                  }`}
                                inputRef={ref}
                                value={baut_rate?.filter(
                                  (c: any) => c.value == value
                                )}
                                onChange={(val: any) => onChange(val?.value)}
                                options={baut_rate}
                                isClearable={true}
                              />
                            )}
                          />
                          {errors.serial_baudrate && (
                            <div className='invalid-feedback d-block'>
                              {errors.serial_baudrate?.message}
                            </div>
                          )}
                        </Form.Group>
                        <Form.Group className='mt-3' controlId='serial_bytesize'>
                          <Form.Label>Byte Size</Form.Label>
                          <Form.Control
                            isInvalid={errors.serial_bytesize}
                            {...register('serial_bytesize')}
                          />
                          <Form.Control.Feedback type='invalid'>
                            {errors?.serial_bytesize?.message}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group className='mt-3' controlId='serial_stopbits'>
                          <Form.Label>Stop Bits</Form.Label>

                          <SelectFormStatic
                            control={control}
                            errors={errors}
                            fieldName="serial_stopbits"
                            options={stop_bits}
                            placeholder="-"
                            isClearable={true}
                          />
                        </Form.Group>
                        <Form.Group className='mt-3' controlId='serial_xonxoff'>
                          <Form.Label>RTS Control</Form.Label>
                          <SelectFormStatic
                            control={control}
                            errors={errors}
                            fieldName="serial_xonxoff"
                            options={rts}
                            placeholder="-"
                            isClearable={true}
                          />                        
                        </Form.Group>
                      </Col>
                    </Row>
                  </Tab>
                  <Tab eventKey="tcp" title="TCP/IP">
                    <Row>
                      <Col md={4}>
                        <Form.Group className='mt-3' controlId='ip_host'>
                          <Form.Label>IP Host</Form.Label>
                          <Form.Control
                            isInvalid={errors.ip_host}
                            {...register('ip_host')}
                          />
                          <Form.Control.Feedback type='invalid'>
                            {errors?.ip_host?.message}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group className='mt-3' controlId='ip_port'>
                          <Form.Label>IP Port</Form.Label>
                          <Form.Control
                            isInvalid={errors.ip_port}
                            {...register('ip_port')}
                          />
                          <Form.Control.Feedback type='invalid'>
                            {errors?.ip_port?.message}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>
                  </Tab>
 
                 
                </Tabs>
}
{(watchJenisData == 'scada') &&
                    <Row>
                      <Col md={4}>
                        <Form.Group className='mt-3' controlId='point_number'>
                          <Form.Label>Point Number</Form.Label>
                          <Form.Control
                            isInvalid={errors.point_number}
                            {...register('point_number')}
                          />
                          <Form.Control.Feedback type='invalid'>
                            {errors?.point_number?.message}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group className='mt-3' controlId='path1'>
                          <Form.Label>Path1</Form.Label>
                          <Form.Control
                            isInvalid={errors.path1}
                            {...register('path1')}
                          />
                          <Form.Control.Feedback type='invalid'>
                            {errors?.path1?.message}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group className='mt-3' controlId='path2'>
                          <Form.Label>Path2</Form.Label>
                          <Form.Control
                            isInvalid={errors.path2}
                            {...register('path2')}
                          />
                          <Form.Control.Feedback type='invalid'>
                            {errors?.path2?.message}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group className='mt-3' controlId='path3'>
                          <Form.Label>Path3</Form.Label>
                          <Form.Control
                            isInvalid={errors.path3}
                            {...register('path3')}
                          />
                          <Form.Control.Feedback type='invalid'>
                            {errors?.path3?.message}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      
                    </Row>
                }
              </Row>

              <Form.Group className='mt-4'>
                <Button type='submit' variant='primary'>
                  Save
                </Button>
                <ButtonCancel />
              </Form.Group>
            </Form>
          </div>
        </div>
      </Row>
    </>
  );
}
