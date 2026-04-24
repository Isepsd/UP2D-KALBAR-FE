import React, { useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Select from 'react-select';
import { ReactSelectStyle } from '@app/configs/react-select.config';
import { Button, ButtonCancel } from '@app/components';
import { useParams } from 'react-router-dom';

const jabatanOptions: any = [
  { label: 'A', value: 'A' },
  { label: 'B', value: 'B' },
  { label: 'C', value: 'C' },
  { label: 'D', value: 'D' },
  { label: 'E', value: 'E' }
]

function FasIPFormPage() {
  const { id } = useParams();

  const label = "IP"
  
  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    state: Yup.number().typeError("Harus berupa angka").required('State Wajib diisi'),
    group_ping: Yup.number().typeError("Harus berupa angka").required('Group Ping Wajib diisi'),
    jenis_point: Yup.number().typeError("Harus berupa angka").required('Jenis Point Wajib diisi'),
  });

  const [formModel] = useState<any>({ status: '1' });
  const {
    register,
    handleSubmit,
    control,
    formState,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: formModel,
  });
  const { errors }: any = formState || {};
  const onSubmitForm = (data: any) => {
    // console.log(data);
    data;
    
  };
  
  return (
    <Row className='animate__animated animate__fadeIn'>
      <div className='col-md-12'>
        <div className='ms-md-4'>
          <h5 className='py-1'>
            <i className='fa-solid fa-circle-info'></i> {id ? 'Update' : 'Tambah'} {label}
          </h5>
          <hr />
          <div className='row'>
            <div className='col-12 col-md-9'>
              <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
                <Row>
                  <Form.Group as={Col} className='mb-3'>
                    <Form.Label>Nama</Form.Label>
                    <Form.Control {...register('point')} />
                    <Form.Control.Feedback type='invalid'>
                      {errors?.pertanyaan?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} className='mb-3'>
                    <Form.Label>IP 1</Form.Label>
                    <Form.Control {...register('ip1')} />
                    <Form.Control.Feedback type='invalid'>
                      {errors?.pertanyaan?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} className='mb-3'>
                    <Form.Label>IP 2</Form.Label>
                    <Form.Control {...register('ip2')} />
                    <Form.Control.Feedback type='invalid'>
                      {errors?.pertanyaan?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group as={Col} className='mb-3'>
                    <Form.Label>State</Form.Label>
                    <Controller
                      control={control}
                      defaultValue={''}
                      name='state'
                      rules={{
                        required: true,
                      }}
                      render={({ field: { onChange, value, ref } }) => (
                        <Select
                          placeholder='Pilih State'
                          styles={ReactSelectStyle}
                          classNamePrefix={`${errors.state ? 'is-invalid' : ''
                            }`}
                          inputRef={ref}
                          value={jabatanOptions.filter(
                            (c: any) => c.value == value
                          )}
                          onChange={(val: any) => onChange(val?.value)}
                          options={jabatanOptions}
                        />
                      )}
                    />
                    {errors.state && (
                      <div className='invalid-feedback d-block'>
                        {errors.state?.message}
                      </div>
                    )}
                  </Form.Group>
                  <Form.Group as={Col} className='mb-3'>
                    <Form.Label>Group Ping</Form.Label>
                    <Controller
                      control={control}
                      defaultValue={''}
                      name='group_ping'
                      rules={{
                        required: true,
                      }}
                      render={({ field: { onChange, value, ref } }) => (
                        <Select
                          placeholder='Pilih Group Ping'
                          styles={ReactSelectStyle}
                          classNamePrefix={`${errors.group_ping ? 'is-invalid' : ''
                            }`}
                          inputRef={ref}
                          value={jabatanOptions.filter(
                            (c: any) => c.value == value
                          )}
                          onChange={(val: any) => onChange(val?.value)}
                          options={jabatanOptions}
                        />
                      )}
                    />
                    {errors.group_ping && (
                      <div className='invalid-feedback d-block'>
                        {errors.group_ping?.message}
                      </div>
                    )}
                  </Form.Group>
                  <Form.Group as={Col} className='mb-3'>
                    <Form.Label>Aktif</Form.Label>
                    <div className='ms-3 py-2'>
                      <Form.Check type="switch" id="aktif" label="Ya" />
                    </div>
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group as={Col} className='mb-3'>
                    <Form.Label>Jenis Point</Form.Label>
                    <Controller
                      control={control}
                      defaultValue={''}
                      name='jenis_point'
                      rules={{
                        required: true,
                      }}
                      render={({ field: { onChange, value, ref } }) => (
                        <Select
                          placeholder='Pilih Jenis Point'
                          styles={ReactSelectStyle}
                          classNamePrefix={`${errors.jenis_point ? 'is-invalid' : ''
                            }`}
                          inputRef={ref}
                          value={jabatanOptions.filter(
                            (c: any) => c.value == value
                          )}
                          onChange={(val: any) => onChange(val?.value)}
                          options={jabatanOptions}
                        />
                      )}
                    />
                    {errors.jenis_point && (
                      <div className='invalid-feedback d-block'>
                        {errors.jenis_point?.message}
                      </div>
                    )}
                  </Form.Group>
                  <Form.Group as={Col} className='mb-3'>
                    <Form.Label>Kinerja</Form.Label>
                    <div className='ms-3 py-2'>
                      <Form.Check type="switch" id="kinerja" label="Ya" />
                    </div>
                  </Form.Group>
                  <Form.Group as={Col} className='mb-3'>
                    <Form.Label>Kirim Telegram</Form.Label>
                    <div className='ms-3 py-2'>
                      <Form.Check type="switch" id="kirimTelegram" label="Ya" />
                    </div>
                  </Form.Group>
                </Row>

                <Form.Group className='mt-4'>
                  <Button type='submit' variant='primary'>Simpan</Button>
                  <ButtonCancel />
                </Form.Group>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </Row>
  )
}

export default FasIPFormPage
