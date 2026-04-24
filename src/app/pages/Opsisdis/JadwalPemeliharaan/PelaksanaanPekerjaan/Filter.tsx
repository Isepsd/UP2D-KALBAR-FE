import React, { useState } from 'react';
import { Col, Form, FormControl, InputGroup, Row } from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import moment from 'moment';
import Select from 'react-select'

import FiltersForm from '@app/modules/Filters/FilterForm';
import FilterActionButton from '@app/modules/Filters/FilterActionButton';
import { ReactSelectStyle } from '@app/configs/react-select.config';
import { STATUS_PELAKSANA } from '@app/configs/select-options/jadwal_pemeliharaan.select';
import { JENIS_LOKASI } from '@app/configs/jenis-lokasi.config';

type Props = {
  isButuhPadam?: boolean;
  isWilayah?: boolean;
  isStatusPek?: boolean;
};

const optionWilayah = Object.keys(JENIS_LOKASI()).map((e) => {
  const jns: any = JENIS_LOKASI();
  return { label: e.replace(/_/g, ' ').toUpperCase(), value: jns[e] }
})
optionWilayah.unshift({ label: 'SEMUA', value: '' })

function Filter({
  isButuhPadam = false,
  isWilayah = false,
  isStatusPek = false,
}: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();

  const [formModel] = useState<any>({
    tgl_after: moment().subtract(1, 'days').format('YYYY-MM-DD'),
    tgl_before: moment().format('YYYY-MM-DD'),
    butuh_padam: false,
    status_pekerjaan: null,
    id_up3: null,
  });

  const validationSchema = Yup.object().shape({
    tgl_after: Yup.string().required("Data harus diisi"),
    tgl_before: Yup.string().required("Data harus diisi"),
  });

  const {
    handleSubmit,
    register,
    setValue,
    setError,
    control,
    formState,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: formModel,
  });
  const { errors }: any = formState;

  /** SUBMIT FORM HANDLING */
  const onSubmitForm = (data: any) => {
    if (data) {
      data.tgl_before = moment(data?.tgl_before).format('YYYY-MM-DD')
      data.tgl_after = moment(data?.tgl_after).format('YYYY-MM-DD')
      data.butuh_padam = data?.butuh_padam ? 1 : 0
      data.wilayah = data?.wilayah
      data.status_pekerjaan = data?.status_pekerjaan
    }
    let valid = true;

    if (valid) {
      setDataParams(data);
    }
  };

  return (
    <>
      <FiltersForm
        setError={setError}
        setValue={setValue}
        dataParams={dataParams}
        onLoading={setLoading}
        fields={{
          tgl_after: moment().subtract(1, 'days').format('YYYY-MM-DD'),
          tgl_before: moment().format('YYYY-MM-DD'),
          butuh_padam: false,
          status_pekerjaan: null,
          id_up3: null,
        }}
      >
        <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
          <Row>
            <Col md={4} className='mb-3'>
              <Form.Group>
                <Form.Label>Range Tanggal</Form.Label>
                <InputGroup>
                  <FormControl
                    {...register('tgl_after')}
                    type='date'
                  />
                  <InputGroup.Text>
                    <i className='fa-solid fa-arrow-right'></i>
                  </InputGroup.Text>
                  <FormControl
                    {...register('tgl_before')}
                    type='date'
                  />
                </InputGroup>
              </Form.Group>
              {errors.day_after && (
                <div className='invalid-feedback d-block'>
                  {errors?.day_after?.message}
                </div>
              )}
            </Col>
            {isButuhPadam && (
              <Col md={2} className='pt-4'>
                <div className='text-center mt-3'>
                  <Controller
                    control={control}
                    defaultValue={''}
                    name='butuh_padam'
                    rules={{
                      required: false,
                    }}
                    render={({ field: { value } }) => (
                      <>
                        <input
                          id='butuh-padam'
                          type='checkbox'
                          value={value}
                          onChange={(e) => {
                            // console.log('e', e.target.checked);
                            setValue('butuh_padam', e.target.checked);
                          }}
                          className='form-check-input'
                        />
                        <label
                          htmlFor='butuh-padam'
                          className='form-check-label'
                        >
                          Butuh Padam
                        </label>
                      </>
                    )}
                  />
                </div>
              </Col>
            )}
            {isWilayah && (
              <Col md={2}>
                <Form.Group className='mb-3'>
                  <Form.Label>Wilayah</Form.Label>
                  <Controller
                    control={control}
                    defaultValue={''}
                    name='id_up3'
                    rules={{
                      required: false,
                    }}
                    render={({ field: { onChange, value, ref } }) => (
                      <Select
                        placeholder='Pilih...'
                        styles={ReactSelectStyle}
                        classNamePrefix={`${errors.ufr ? 'is-invalid' : ''}`}
                        inputRef={ref}
                        value={optionWilayah?.filter(
                          (c: any) => c.value == value
                        )}
                        onChange={(val: any) => onChange(val?.value)}
                        options={optionWilayah}
                      // isClearable={true}
                      />
                    )}
                  />
                </Form.Group>
              </Col>
            )}
            {isStatusPek && (
              <Col md={2}>
                <Form.Group className='mb-3'>
                  <Form.Label>Status Pelaksanaan</Form.Label>
                  <Controller
                    control={control}
                    defaultValue={''}
                    name='status_pekerjaan'
                    rules={{
                      required: false,
                    }}
                    render={({ field: { onChange, value, ref } }) => (
                      <Select
                        placeholder='Pilih...'
                        styles={ReactSelectStyle}
                        classNamePrefix={`${errors.ufr ? 'is-invalid' : ''}`}
                        inputRef={ref}
                        value={STATUS_PELAKSANA()?.filter(
                          (c: any) => c.value == value
                        )}
                        onChange={(val: any) => onChange(val?.value)}
                        options={STATUS_PELAKSANA()}
                      // isClearable={true}
                      />
                    )}
                  />
                </Form.Group>
              </Col>
            )}
          </Row>
          <FilterActionButton loading={loading} onClickReset={() => onSubmitForm(null)}></FilterActionButton>
        </Form>
      </FiltersForm>
    </>
  )
}

export default Filter