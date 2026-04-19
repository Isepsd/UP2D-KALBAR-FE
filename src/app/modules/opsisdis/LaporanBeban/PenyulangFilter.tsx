import React, { useState } from 'react';
import { Col, Form, FormControl, InputGroup, Row } from 'react-bootstrap';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import moment from 'moment';

import FiltersForm from '@app/modules/Filters/FilterForm';
import FilterActionButton from '@app/modules/Filters/FilterActionButton';
import SelectAsyncDynamic from '@app/modules/SelectForm/SelectAsyncDynamic';
import SelectFormStatic from '@app/modules/SelectForm/SelectFormStatic';
import { JENIS_LOKASI } from '@app/configs/jenis-lokasi.config';
import RequiredInfo from '@app/components/Info/RequiredInfo';

const jenisLayananOptions: any = [
  { label: 'NON KTT', value: 'NON KTT' },
  { label: 'KTT', value: 'KTT' }
]
// const selectProps = {
//   fieldName: 'id_ref_lokasi',
//   pathServiceName: 'master.jaringan.ref_lokasi',
//   labelField: 'nama_lokasi',
//   valueField: 'id_ref_lokasi',
//   placeholder: 'Pilih...',
// }

const selectGarduInduk = {
  fieldName: 'id_ref_lokasi_gi',
  pathServiceName: 'master.jaringan.ref_lokasi',
  labelField: 'nama_lokasi',
  valueField: 'id_ref_lokasi',
  placeholder: 'Pilih...',
}

const selectPenyulang = {
  fieldName: 'id_ref_lokasi_penyulang',
  pathServiceName: 'master.jaringan.ref_lokasi',
  labelField: 'nama_lokasi',
  valueField: 'id_ref_lokasi',
  placeholder: 'Pilih...',
}
const selectTrafo = {
  fieldName: 'id_ref_lokasi_trafo_gi',
  pathServiceName: 'master.jaringan.ref_lokasi',
  labelField: 'nama_lokasi',
  valueField: 'id_ref_lokasi',
  placeholder: 'Pilih...',
}

type Props = {
  tabActive: string;
  isTrafo?: boolean;
  isGarduInduk?: boolean;
  isArea?: boolean;
  isSubSistem?: boolean;
  isPenyulang?: boolean;
  isJenisLayanan?: boolean;
};

function PenyulangFilter({
  tabActive = 'beban_perjam',
  isTrafo = false,
  isGarduInduk = false,
  isArea = false,
  isSubSistem = false,
  isPenyulang = false,
  isJenisLayanan = false,
}: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();

  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    month_after: Yup.string().nullable(),
    datum_1_before: Yup.string().nullable(),
    month_before: Yup.string().nullable(),
  });

  const [formModel] = useState<any>({
    month_after: moment().format('YYYY-MM'),
    month_before: moment().format('YYYY-MM'),
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
  const { errors }: any = formState || {};

  const watchMonth1After = useWatch({ control, name: 'month_after' });
  const watchMonth2Before = useWatch({ control, name: 'month_before' });
  const watchGarduInduk = useWatch({ control, name: 'id_ref_lokasi_gi' });

  /** SUBMIT FORM HANDLING */
  const onSubmitForm = (data: any) => {
    setDataParams(data);
  };

  return (
    <>
      <FiltersForm
        setError={setError}
        setValue={setValue}
        dataParams={dataParams}
        onLoading={setLoading}
        fields={{
          month_after: moment().format('YYYY-MM'),
          month_before: moment().format('YYYY-MM')
        }}
      >
        <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
          <Row>
            {
              tabActive == 'puncak_bulanan' && (
                <>
                  <Col md={6} className='mb-3'>
                    <Form.Group>
                      <Form.Label>Range Bulan</Form.Label>
                      <InputGroup>
                        <FormControl
                          {...register('month_after')}
                          type='month'
                          formTarget='yyyy-mm-dd'
                          placeholder='Pilih Tanggal'
                          max={watchMonth2Before}
                        />
                        <InputGroup.Text>
                          <i className='fa-solid fa-arrow-right'></i>
                        </InputGroup.Text>

                        <FormControl
                          {...register('month_before')}
                          type='month'
                          formTarget='yyyy-mm-dd'
                          placeholder='Pilih Tanggal'
                          min={moment(watchMonth1After)
                            .format('YYYY-MM')}
                          max={moment().format('YYYY-MM')}
                        />
                      </InputGroup>
                    </Form.Group>
                  </Col>
                </>
              )
            }
            {isGarduInduk &&
              <Col md={3}>
                <Form.Group className='mb-3'>
                  <Form.Label>Gardu Induk <RequiredInfo /></Form.Label>
                  <SelectAsyncDynamic
                    required={true}
                    {...selectGarduInduk}
                    isClearable={true}
                    errors={errors}
                    control={control}
                    queryParams={{ id_ref_jenis_lokasi: JENIS_LOKASI().gardu_induk }}
                  />
                </Form.Group>
              </Col>
            }
            {isTrafo &&
              <Col md={3}>
                <Form.Group className='mb-3'>
                  <Form.Label>Trafo <RequiredInfo /></Form.Label>
                  <SelectAsyncDynamic
                    required={true}
                    {...selectTrafo}
                    fieldNameParent="id_gardu_induk"
                    isClearable={true}
                    errors={errors}
                    control={control}
                    queryParams={{ id_ref_jenis_lokasi: JENIS_LOKASI().trafo_gi }}
                    watchParent={watchGarduInduk}

                  />
                </Form.Group>
              </Col>
            }

            {isJenisLayanan &&

              <Col md={3}>
                <Form.Group className='mb-3'>
                  <Form.Label>Jenis Layanan</Form.Label>
                  <SelectFormStatic
                    options={jenisLayananOptions}
                    fieldName='jenis_layanan'
                    placeholder='Pilih...'
                    errors={errors}
                    control={control}
                  />
                </Form.Group>
              </Col>
            }
            {isPenyulang &&
              <Col md={3}>
                <Form.Group className='mb-3'>
                  <Form.Label>Penyulang</Form.Label>
                  <SelectAsyncDynamic
                    {...selectPenyulang}
                    isClearable={true}
                    fieldNameParent="id_gardu_induk"
                    errors={errors}
                    control={control}
                    queryParams={{ id_ref_jenis_lokasi: JENIS_LOKASI().penyulang }}
                    watchParent={watchGarduInduk}
                  />
                </Form.Group>
              </Col>
            }
            {isArea &&
              <Col md={3}>
                <Form.Group className='mb-3'>
                  <Form.Label>Area</Form.Label>
                  <SelectAsyncDynamic
                    {...selectGarduInduk}
                    isClearable={true}
                    errors={errors}
                    control={control}
                    queryParams={{ id_ref_jenis_lokasi_in: `${JENIS_LOKASI().up2d},${JENIS_LOKASI().up3},${JENIS_LOKASI().ulp}` }}
                  />
                </Form.Group>
              </Col>
            }
            {isSubSistem &&
              <Col md={3}>
                <Form.Group className='mb-3'>
                  <Form.Label>Sub Sistem</Form.Label>
                  <SelectAsyncDynamic
                    {...selectGarduInduk}
                    isClearable={true}
                    errors={errors}
                    control={control}
                    queryParams={{ id_ref_jenis_lokasi_in: `${JENIS_LOKASI().up2d},${JENIS_LOKASI().up3},${JENIS_LOKASI().ulp}` }}
                  />
                </Form.Group>
              </Col>
            }

          </Row>
          <FilterActionButton loading={loading} onClickReset={() => onSubmitForm(null)}></FilterActionButton>
        </Form>
      </FiltersForm>
    </>
  )
}

export default PenyulangFilter