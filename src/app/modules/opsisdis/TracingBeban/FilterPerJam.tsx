import React, { useEffect, useState } from 'react';
import { Col, Form, FormControl, InputGroup, Row } from 'react-bootstrap';
import { useForm, useWatch, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import moment from 'moment';
import Select from 'react-select'

import { ReactSelectStyle } from '@app/configs/react-select.config';
import FiltersForm from '@app/modules/Filters/FilterForm';
import FilterActionButton from '@app/modules/Filters/FilterActionButton';
import SelectAsyncDynamic from '@app/modules/SelectForm/SelectAsyncDynamic';
import { JENIS_LOKASI } from '@app/configs/jenis-lokasi.config';
// import RequiredInfo from '@app/components/Info/RequiredInfo';
import { useSelector } from 'react-redux';
import { timeDiff } from '@app/helper/time.helper';

const selectGarduInduk = {
  fieldName: 'id_ref_lokasi_gi',
  pathServiceName: 'master.jaringan.ref_lokasi',
  labelField: 'nama_lokasi',
  valueField: 'id_ref_lokasi',
  placeholder: 'Pilih...',
}
const selectPemilik = {
  fieldName: 'pemilik',
  pathServiceName: 'master.jaringan.pemilik',
  labelField: 'nama',
  valueField: 'id_pemilik',
  placeholder: 'Pilih...',
}
const optionData = [
  { label: 'Semua', value: '' },
  { label: '=', value: '=' },
  { label: '>=', value: '>=' },
  { label: '<=', value: '<=' },
]

const beban_puncak = [
  { label: 'Avg', value: 'avg' },
  // { label: 'Min Harian', value: 'min' },
  // { label: 'Max Harian', value: 'max' },
  { label: 'Max Siang', value: 'max_siang' },
  { label: 'Min Siang', value: 'min_siang' },
  { label: 'Max Malam', value: 'max_malam' },
  { label: 'Min Malam', value: 'min_malam' },
]

const optionBebanPuncak: any = {
  beban_harian: [
    // { label: 'Semua', value: '' },
    // { label: 'Hari', value: 'hari' },
    ...beban_puncak,
  ],
  beban_bulanan: [
    { label: 'Semua', value: '' },
    // { label: 'Bulan', value: 'bulan' },
    ...beban_puncak,
  ],
  beban_tahunan: [
    { label: 'Semua', value: '' },
    // { label: 'Tahun', value: 'tahun' },
    ...beban_puncak,
  ],
  puncak_tahunan: [
    { label: 'Semua', value: '' },
    // { label: 'Tahun', value: 'tahun' },
    ...beban_puncak,
  ],
  puncak_bulanan: [
    { label: 'Semua', value: '' },
    // { label: 'Bulan', value: 'bulan' },
    ...beban_puncak,
  ],
}

const optionSatuan = [
  { label: 'MW', value: 'MW' },
  { label: 'Arus', value: 'Arus' },
]
const optionTegangan = [
  { label: '< 20,2', value: '<' },
  { label: '>= 20.2 & <= 20.7', value: '=' },
  { label: '> 20,7', value: '>' },
]

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
  isTrafoKTT?: boolean;
  isTrafoNonKTT?: boolean;
  isGarduInduk?: boolean;
  isBebanPuncak?: boolean;
  isOperator?: boolean;
  isTreshold?: boolean;
  isArea?: boolean;
  isSatuan?: boolean;
  isNilai?: boolean;
  isSubSistem?: boolean;
  isPenyulang?: boolean;
  isJenisLayanan?: boolean;
  isUID?: boolean;
  isUP2B?: boolean;
  configFilter?: any,
};

function FilterPerJam({
  tabActive = 'beban_perjam',
  isGarduInduk = false,
  isOperator = false,
  isTreshold = false,
  isBebanPuncak = false,
  isSatuan = false,
  isNilai = false,
  isUID = false,
  isTrafoNonKTT = false,
  isTrafoKTT = false,
  isPenyulang = false,
  configFilter = {}
}: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();

  const shapes: any = {};
  const models: any = {
    beban_puncak: "",
    operator: "",
    id_ref_lokasi_gi: "",
    id_ref_lokasi_penyulang: "",
    id_ref_lokasi_trafo_gi: "",
    satuan: null,
    nilai: null,
    tabActive: tabActive,
    menu: "tracing beban",
    // p_gte:null,
    // i_gte:null,
    // p_lte:null,
    // i_lte:null,
    // i_exact:null,
    // p_exact:null,
  };

  const { activeFilters } = useSelector(
    (state: any) => state.ui
  );

  configFilter?.forEach(((parameter: any) => {
    shapes[parameter] = Yup.string().required('Data belum dipilih');
    models[parameter] = undefined
  }));

  const [formModel] = useState<any>({
    datum_afters: moment().subtract(3, 'day').format('YYYY-MM-DD'),
    datum_befores: moment().format('YYYY-MM-DD'),
    day_after: moment().subtract(30, 'day').format('YYYY-MM-DD'),
    day_before: moment().format('YYYY-MM-DD'),
    month_after: moment().startOf('year').format('YYYY-MM'),
    month_before: moment().format('YYYY-MM'),
    year_after: moment().subtract(5, 'year').format('YYYY'),
    year_before: moment().format('YYYY'),
    jenis_layanan: "NON KTT",
    value: null,
    datum_before: null,
    datum_after: null,
    ...models
  });

  const validationSchema = Yup.object().shape({
    datum_afters: Yup.string().required("Data harus diisi"),
    datum_befores: Yup.string().required("Data harus diisi"),
    day_after: Yup.string().required("Data harus diisi"),
    day_before: Yup.string().required("Data harus diisi"),
    month_after: Yup.string().required("Data harus diisi"),
    month_before: Yup.string().required("Data harus diisi"),
    year_after: Yup.string().required("Data harus diisi"),
    year_before: Yup.string().required("Data harus diisi"),
    value: null,
    datum_before: null,
    datum_after: null,
    // tabActive: "beban_perjam",
    // menu: "tracing beban",  
    ...shapes
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
  const watchDatum1After = useWatch({ control, name: 'datum_afters' });
  const watchDatum2Before = useWatch({ control, name: 'datum_befores' });
  const watchDate2Before = useWatch({ control, name: 'date_before' });
  const watchMonth1After = useWatch({ control, name: 'month_after' });
  const watchMonth2Before = useWatch({ control, name: 'month_before' });
  const watchGarduInduk = useWatch({ control, name: 'id_ref_lokasi_gi' });

  /** SUBMIT FORM HANDLING */
  const onSubmitForm = (data: any) => {
    // console.log("data", data);
    let operator: any = ""
    let diff: any
    // if (data) {
    //   data.datum_before = moment(data?.datum_before).format('YYYY-MM-DD HH:mm')
    //   data.datum_after = moment(data?.datum_after).format('YYYY-MM-DD HH:mm')

    // }
    let valid = true;

    switch (tabActive) {
      case "beban_perjam":
      case "beban_perjam":
        diff = timeDiff(
          moment(data?.datum_befores).format('YYYY-MM-DD'),
          moment(data?.datum_afters).format('YYYY-MM-DD'),
          "days"
        );
        if (data?.datum_befores) {
          data.datum_before = `${data?.datum_befores} 23:59`
          data.datum_after = `${data?.datum_afters} 00:00`
        }


        if (diff > 3) {

          valid = false;
          setError('datum_afters',
            {
              type: "manual",
              message: "Range tanggal maksimal 3 hari",
            })
        }

        if (data?.satuan != "" && data?.operator != "" && data?.nilai != "") {
          operator = "i_"
          if (data?.satuan == "MW") {
            operator = "p_"
          }

          switch (data?.operator) {
            case ">=":
              operator = operator + "gte"
              break
            case "<=":
              operator = operator + "lte"
              break
            default:
              operator = operator + "exact"
              break;
          }
          data[operator] = data?.nilai
          // console.log("perjam if operator", operator);

        }
        delete data['beban_puncak']
        break;
      case "beban_harian":
        diff = timeDiff(
          moment(data?.day_before).format('YYYY-MM-DD'),
          moment(data?.day_after).format('YYYY-MM-DD'),
          "days"
        );
        if (diff > 30) {
          valid = false;
          setError('day_after',
            {
              type: "manual",
              message: "Range tanggal maksimal 30 hari",
            })
        }

        if (data?.satuan != "" && data?.operator != "" && data?.nilai != "" && data?.beban_puncak != "") {
          operator = "i_" + data?.beban_puncak + "_"
          if (data?.satuan == "MW") {
            operator = "p_" + data?.beban_puncak + "_"
          }

          switch (data?.operator) {
            case ">=":
              operator = operator + "gte"
              break
            case "<=":
              operator = operator + "lte"
              break
            default:
              operator = operator + "exact"
              break;
          }
          data[operator] = data?.nilai
        }

        break;
      case "puncak_bulanan":
        diff = timeDiff(
          moment(data?.month_before).format('YYYY-MM-DD'),
          moment(data?.month_after).format('YYYY-MM-DD'),
          "months"
        );
        if (diff > 16) {
          valid = false;
          setError('month_after',
            {
              type: "manual",
              message: "Maksimal 16 bulan",
            })
        }

        if (data?.satuan != "" && data?.operator != "" && data?.nilai != "" && data?.beban_puncak != "") {
          operator = "i_" + data?.beban_puncak + "_"
          if (data?.satuan == "MW") {
            operator = "p_" + data?.beban_puncak + "_"
          }

          switch (data?.operator) {
            case ">=":
              operator = operator + "gte"
              break
            case "<=":
              operator = operator + "lte"
              break
            default:
              operator = operator + "exact"
              break;
          }
          data[operator] = data?.nilai
        }
        break;
      case "puncak_tahunan":
        diff = timeDiff(
          moment(data?.year_before).format('YYYY-MM-DD'),
          moment(data?.year_after).format('YYYY-MM-DD'),
          "years"
        );
        // console.log("month ", 40);
        if (!data?.year_after && data?.year_after != "") {
          setError('year_after',
            {
              type: "manual",
              message: "Range tahun harus diisi",
            })
        }
        if (!data?.year_before && data?.year_before != "") {
          setError('year_after',
            {
              type: "manual",
              message: "Range tahun harus diisi",
            })
          setError('year_before',
            {
              type: "manual",
              message: "Range tahun harus diisi",
            })
        }

        if (valid == true && diff > 5) {
          valid = false;
          setError('year_after',
            {
              type: "manual",
              message: "Range year maksimal 30",
            })
          setError('year_before',
            {
              type: "manual",
              message: "Range year maksimal 30",
            })
        }
        if (data?.satuan != "" && data?.operator != "" && data?.nilai != "" && data?.beban_puncak != "") {
          operator = "i_" + data?.beban_puncak + "_"
          if (data?.satuan == "MW") {
            operator = "p_" + data?.beban_puncak + "_"
          }

          switch (data?.operator) {
            case ">=":
              operator = operator + "gte"
              break
            case "<=":
              operator = operator + "lte"
              break
            default:
              operator = operator + "exact"
              break;
          }
          data[operator] = data?.nilai
        }

        break;

      default:
        break;
    }

    if (valid) {
      setDataParams(data);
    }
  };

  useEffect(() => {
    if (activeFilters?.filters?.id_gardu_induk) {
      setValue("id_ref_lokasi_gi", activeFilters?.filters?.id_gardu_induk)
    }
    if (!activeFilters?.filters?.id_gardu_induk && activeFilters?.filters?.id_ref_lokasi_trafo_gi) {
      setValue("id_ref_lokasi_trafo_gi", activeFilters?.filters?.id_ref_lokasi_trafo_gi)
    }
    if (!activeFilters?.filters?.id_gardu_induk && activeFilters?.filters?.id_ref_lokasi_penyulang) {
      setValue("id_ref_lokasi_penyulang", activeFilters?.filters?.id_ref_lokasi_penyulang)
    }
  }, [activeFilters?.filters])

  useEffect(() => {
    setValue("beban_puncak", "")
    setValue("tabActive", "beban_perjam")
  }, [])

  // console.log("tabActive", tabActive);


  return (
    <>
      <FiltersForm
        setError={setError}
        setValue={setValue}
        dataParams={dataParams}
        onLoading={setLoading}
        fields={{
          datum_before: null,
          datum_after: null,
          datum_afters: moment().subtract(3, 'day').format('YYYY-MM-DD'),
          datum_befores: moment().format('YYYY-MM-DD'),
          day_after: moment().subtract(30, 'day').format('YYYY-MM-DD'),
          day_before: moment().format('YYYY-MM-DD'),
          month_after: moment().startOf('year').format('YYYY-MM'),
          month_before: moment().format('YYYY-MM'),
          year_after: moment().subtract(5, 'year').format('YYYY'),
          year_before: moment().format('YYYY'),
          operator: '',
          satuan: '',
          nilai: '',
          beban_puncak: '',
          tabActive: tabActive,
          menu: "tracing beban",
          ...models,
        }}
        overrideType={{}}
      >
        <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
          <Row>
            {
              tabActive == 'beban_perjam' && (
                <Col md={4} className='mb-3'>
                  <Form.Group>
                    <Form.Label>Range Tanggal</Form.Label>
                    <InputGroup>
                      <FormControl
                        {...register('datum_afters')}
                        type='date'
                        // min={moment(watchDatum2Before)
                        //   .subtract(2, 'day')
                        //   .format('YYYY-MM-DD HH:mm')}
                        max={watchDatum2Before}
                      />
                      <InputGroup.Text>
                        <i className='fa-solid fa-arrow-right'></i>
                      </InputGroup.Text>
                      <FormControl
                        {...register('datum_befores')}
                        type='date'
                        min={moment(watchDatum1After)
                          .subtract(2, 'day')
                          .format('YYYY-MM-DD HH:mm')}
                        max={moment().format('YYYY-MM-DD HH:mm')}
                      />
                    </InputGroup>
                  </Form.Group>
                  {errors.datum_afters && (
                    <div className='invalid-feedback d-block'>
                      {errors?.datum_afters?.message}
                    </div>
                  )}
                </Col>
              )
            }
            {
              tabActive == 'beban_harian' && (
                <>
                  <Col md={4} className='mb-3'>
                    <Form.Group>
                      <Form.Label>Range Tanggal</Form.Label>
                      <InputGroup>
                        <FormControl
                          {...register('day_after')}
                          type='date'
                          max={watchDate2Before}
                        />
                        <InputGroup.Text>
                          <i className='fa-solid fa-arrow-right'></i>
                        </InputGroup.Text>
                        <FormControl
                          {...register('day_before')}
                          type='date'
                          min={moment(watchDate2Before)
                            .subtract(31, 'day')
                            .format('YYYY-MM-DD')}
                          max={moment().format('YYYY-MM-DD')}
                        />
                      </InputGroup>
                    </Form.Group>
                    {errors.day_after && (
                      <div className='invalid-feedback d-block'>
                        {errors?.day_after?.message}
                      </div>
                    )}
                  </Col>
                </>
              )
            }
            {
              (tabActive == 'beban_bulanan' || tabActive == 'puncak_bulanan') && (
                <>
                  <Col md={4} className='mb-3'>
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
                    {errors.month_after && (
                      <div className='invalid-feedback d-block'>
                        {errors?.month_after?.message}
                      </div>
                    )}
                  </Col>
                </>
              )
            }
            {
              (tabActive == 'beban_tahunan' || tabActive == 'puncak_tahunan') && (
                <>
                  <Col md={4} className='mb-3'>
                    <Form.Group>
                      <Form.Label>Range Tahun</Form.Label>
                      <InputGroup>
                        <FormControl
                          {...register('year_after')}
                          type='number'
                        />
                        <InputGroup.Text>
                          <i className='fa-solid fa-arrow-right'></i>
                        </InputGroup.Text>
                        <FormControl
                          {...register('year_before')}
                          type='number'
                        />
                      </InputGroup>
                      {errors.year_after && (
                        <div className='invalid-feedback d-block'>
                          {errors?.year_after?.message}
                        </div>
                      )}
                      {errors.year_before && (
                        <div className='invalid-feedback d-block'>
                          {errors?.year_before?.message}
                        </div>
                      )}
                    </Form.Group>
                  </Col>
                </>
              )
            }
            {isUID &&
              <Col md={2}>
                <Form.Group className='mb-3'>
                  <Form.Label>Pemilik</Form.Label>
                  <SelectAsyncDynamic
                    {...selectPemilik}
                    isClearable={true}
                    errors={errors}
                    control={control}
                    queryParams={{
                      page: -1,
                      limit: -1,
                      id_ref_jenis_lokasi: `${JENIS_LOKASI().uid}`
                    }}
                  />
                </Form.Group>
              </Col>
            }
            {isGarduInduk &&
              <Col md={3}>
                <Form.Group className='mb-3'>
                  <Form.Label>Gardu Induk</Form.Label>
                  <SelectAsyncDynamic
                    required={true}
                    {...selectGarduInduk}
                    isClearable={true}
                    errors={errors}
                    control={control}
                    queryParams={{
                      page: -1,
                      limit: -1,
                      id_ref_jenis_lokasi: JENIS_LOKASI().gardu_induk
                    }}
                  />
                </Form.Group>
              </Col>
            }
            {isPenyulang && watchGarduInduk &&
              <Col md={3}>
                <Form.Group className='mb-3'>
                  <Form.Label>Penyulang</Form.Label>
                  <SelectAsyncDynamic
                    {...selectPenyulang}
                    isClearable={true}
                    errors={errors}
                    control={control}
                    fieldNameParent="id_gardu_induk"
                    queryParams={{
                      page: -1,
                      limit: -1,
                      id_ref_jenis_lokasi: JENIS_LOKASI().penyulang
                    }}
                    watchParent={watchGarduInduk}
                  />
                </Form.Group>
              </Col>
            }
            {isTrafoNonKTT && watchGarduInduk &&
              <Col md={3}>
                <Form.Group className='mb-3'>
                  <Form.Label>Trafo </Form.Label>
                  <SelectAsyncDynamic
                    required={true}
                    {...selectTrafo}
                    isClearable={true}
                    errors={errors}
                    control={control}
                    queryParams={{
                      id_ref_jenis_lokasi: JENIS_LOKASI().trafo_gi,
                      jenis_layanan: "NON KTT",
                      page: -1,
                      limit: -1,
                    }}
                    watchParent={watchGarduInduk}

                  />
                </Form.Group>
              </Col>
            }
            {isTrafoKTT && watchGarduInduk &&
              <Col md={3}>
                <Form.Group className='mb-3'>
                  <Form.Label>Trafo</Form.Label>
                  <SelectAsyncDynamic
                    required={true}
                    {...selectTrafo}
                    isClearable={true}
                    fieldNameParent="id_gardu_induk"
                    errors={errors}
                    control={control}
                    queryParams={{
                      id_ref_jenis_lokasi: JENIS_LOKASI().trafo_gi,
                      jenis_layanan: "KTT",
                      page: -1,
                      limit: -1,
                    }}
                    watchParent={watchGarduInduk}

                  />
                </Form.Group>
              </Col>
            }
            {isBebanPuncak &&
              <Col md={2}>
                <Form.Group className='mb-3'>
                  <Form.Label>Beban</Form.Label>
                  <Controller
                    control={control}
                    defaultValue={''}
                    name='beban_puncak'
                    rules={{
                      required: false,
                    }}
                    render={({ field: { onChange, value, ref } }) => (
                      <Select
                        placeholder='Pilih...'
                        styles={ReactSelectStyle}
                        classNamePrefix={`${errors.ufr ? 'is-invalid' : ''}`}
                        inputRef={ref}
                        value={optionBebanPuncak[tabActive || 'beban_harian']?.filter(
                          (c: any) => c.value == value
                        )}
                        onChange={(val: any) => onChange(val?.value)}
                        options={optionBebanPuncak[tabActive || 'beban_harian']}
                      // isClearable={true}
                      />
                    )}
                  />
                </Form.Group>
              </Col>
            }
            {isOperator &&
              <Col md={2}>
                <Form.Group className='mb-3'>
                  <Form.Label>Operator</Form.Label>
                  <Controller
                    control={control}
                    defaultValue={''}
                    name='operator'
                    rules={{
                      required: false,
                    }}
                    render={({ field: { onChange, value, ref } }) => (
                      <Select
                        placeholder='Pilih...'
                        styles={ReactSelectStyle}
                        classNamePrefix={`${errors.ufr ? 'is-invalid' : ''}`}
                        inputRef={ref}
                        value={optionData?.filter(
                          (c: any) => c.value == value
                        )}
                        onChange={(val: any) => onChange(val?.value)}
                        options={optionData}
                      // isClearable={true}
                      />
                    )}
                  />
                </Form.Group>
              </Col>
            }

            {isTreshold &&
              <Col md={2}>
                <Form.Group className='mb-3'>
                  <Form.Label>Treshold</Form.Label>
                  <Controller
                    control={control}
                    defaultValue={''}
                    name='treshold'
                    rules={{
                      required: false,
                    }}
                    render={({ field: { onChange, value, ref } }) => (
                      <Select
                        placeholder='Pilih...'
                        styles={ReactSelectStyle}
                        classNamePrefix={`${errors.ufr ? 'is-invalid' : ''}`}
                        inputRef={ref}
                        value={optionTegangan?.filter(
                          (c: any) => c.value == value
                        )}
                        onChange={(val: any) => onChange(val?.value)}
                        options={optionTegangan}
                        isClearable={true}
                      />
                    )}
                  />
                </Form.Group>

              </Col>
            }
            {isSatuan &&
              <Col md={2}>
                <Form.Group className='mb-3'>
                  <Form.Label>Satuan</Form.Label>
                  <Controller
                    control={control}
                    defaultValue={''}
                    name='satuan'
                    rules={{
                      required: false,
                    }}
                    render={({ field: { onChange, value, ref } }) => (
                      <Select
                        placeholder='Pilih...'
                        styles={ReactSelectStyle}
                        classNamePrefix={`${errors.ufr ? 'is-invalid' : ''}`}
                        inputRef={ref}
                        value={optionSatuan?.filter(
                          (c: any) => c.value == value
                        )}
                        onChange={(val: any) => onChange(val?.value)}
                        options={optionSatuan}
                      // isClearable={true}
                      />
                    )}
                  />
                </Form.Group>
              </Col>
            }
            {isNilai &&
              <Col md={2}>
                <Form.Group className='mb-3'>
                  <Form.Label>Nilai</Form.Label>
                  <Form.Control
                    {...register('nilai')}
                    placeholder="Enter Nilai"
                  />
                </Form.Group>
              </Col>
            }
          </Row>
          <FilterActionButton loading={loading} onClickReset={() => onSubmitForm(null)} className="justify-content-start" />
        </Form>
      </FiltersForm>
    </>
  )
}

export default FilterPerJam