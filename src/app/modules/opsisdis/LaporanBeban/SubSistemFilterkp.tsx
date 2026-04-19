import React, { useEffect, useState } from 'react';
import { Col, Form, FormControl, InputGroup, Row } from 'react-bootstrap';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import moment from 'moment';

import FiltersForm from '@app/modules/Filters/FilterForm';
import FilterActionButton from '@app/modules/Filters/FilterActionButton';
import SelectAsyncDynamic from '@app/modules/SelectForm/SelectAsyncDynamic';
import { JENIS_LOKASI } from '@app/configs/jenis-lokasi.config';
import RequiredInfo from '@app/components/Info/RequiredInfo';
import { useSelector } from 'react-redux';
import { timeDiff } from '@app/helper/time.helper';



const selectKeypoint = {
  fieldName: 'id_ref_lokasi_kp',
  pathServiceName: 'master.jaringan.ref_lokasi',
  labelField: 'nama_lokasi',
  valueField: 'id_ref_lokasi',
  placeholder: 'Pilih...',
}


type Props = {
  tabActive: string;
  isTrafo?: boolean;
  isGH?: boolean;
  isKP?: boolean;
  isTrafoKTT?: boolean;
  isTrafoNonKTT?: boolean;
  isGarduInduk?: boolean;
  isGarduIndukPeny?: boolean;
  isArea?: boolean;
  isSubSistem?: boolean;
  isPenyulang?: boolean;
  isJenisLayanan?: boolean;
  isUID?: boolean;
  isUP2B?: boolean;
  isUnitPembangkit?: boolean
  isPembangkit?: boolean
  configFilter?: any
};

function SubSistemFilter({
  tabActive = 'beban_perjam',
 
  isKP = false,
 
 
  isGarduIndukPeny = false,
  
  configFilter = {}
}: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();


  const shapes: any = {};
  const models: any = {};

  const { activeFilters }: any = useSelector(
    (state: any) => state.ui
  );

  configFilter?.forEach(((parameter: any) => {
    shapes[parameter] = Yup.string().required('Data belum dipilih');
    models[parameter] = undefined
  }));

  const [formModel] = useState<any>({
    // datum_afters:moment().format('YYYY-MM-DD'),
    // datum_befores: moment().format('YYYY-MM-DD'),
    datum_afters: moment().format('YYYY-MM-DD'),
    datum_befores: moment().format('YYYY-MM-DD'),
    day_after: moment().subtract(29, 'day').format('YYYY-MM-DD'),
    day_before: moment().format('YYYY-MM-DD'),
    month_after: moment().startOf('year').format('YYYY-MM'),
    month_before: moment().format('YYYY-MM'),
    year_after: moment().subtract(4, 'year').format('YYYY'),
    year_before: moment().format('YYYY'),
    jenis_layanan: "NON KTT",
    id_lokasi: null,
    models
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
    //   datum_after: Yup.string()
    //   .test(
    //     "",
    //     "Maximal data hanya 3 hari",
    //     function(value: any) {
    //       const start = value?.replace('T', ' ');
    //       const { datum_before } = this.parent;
    //       return isSameOrBeforeDiff(start, datum_before);
    //     }
    //   ),
    // datum_before: Yup.string().nullable(),
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
  const { errors }: any = formState;
  const watchDatum1After = useWatch({ control, name: 'datum_afters' });
  const watchDatum2Before = useWatch({ control, name: 'datum_befores' });
  // const watchDate1After = useWatch({ control, name: 'date_after' });
  // const watchDate2Before = useWatch({ control, name: 'date_before' });
  const watchMonth1After = useWatch({ control, name: 'month_after' });
  const watchMonth2Before = useWatch({ control, name: 'month_before' });
  const watchSumber = useWatch({ control, name: 'id_parent_lokasi' });
 

  /** SUBMIT FORM HANDLING */
  const onSubmitForm = (data: any) => {
    let diff: any
    // if (data) {
    //   data.datum_before = moment(data?.datum_before).format('YYYY-MM-DD HH:mm')
    //   data.datum_after = moment(data?.datum_after).format('YYYY-MM-DD HH:mm')

    // }
    
    let valid = true;
    if (data) {
      switch (tabActive) {
        // ... (existing code)
  
        default:
          break;
      }
  
      if (valid) {
        // Set id_lokasi equal to id_ref_lokasi_kp
        data.id_lokasi = data.id_ref_lokasi_kp;
  
        setDataParams(() => {
          return { ...data };
        });
      }
    }
  
    if (data) {

      switch (tabActive) {
        case "beban_perjam":
          diff = timeDiff(
            moment(data?.datum_befores).format('YYYY-MM-DD'),
            moment(data?.datum_afters).format('YYYY-MM-DD'),
            "days"
          );
          // diff = timeDiff(
          //   moment(data?.datum_before).format('YYYY-MM-DD HH:mm'),
          //   moment(data?.datum_after).format('YYYY-MM-DD HH:mm'),
          //   "days"
          // );
          data.datum_before = `${data?.datum_befores} 23:59`
          data.datum_after = `${data?.datum_afters} 00:00`
          // delete data.datum_befores
          // delete data.datum_afters
          // delete data.year_before
          // delete data.year_after

          // delete data.month_after
          // delete data.month_before
          // delete data.day_after
          // delete data.day_before

          if (diff > 2) {
            valid = false;
            setError('datum_afters',
              {
                type: "manual",
                message: "Range tanggal maksimal 3 hari",
              })
          }

          break;
        case "beban_harian":
          diff = timeDiff(
            moment(data?.day_before).format('YYYY-MM-DD'),
            moment(data?.day_after).format('YYYY-MM-DD'),
            "days"
          );
          // delete data.datum_befores
          // delete data.datum_afters
          // delete data.year_before
          // delete data.year_after

          // delete data.month_after
          // delete data.month_before
          // delete data.datum_after
          // delete data.datum_before
          if (diff > 29) {
            valid = false;
            setError('day_after',
              {
                type: "manual",
                message: "Range tanggal maksimal 30 hari",
              })
          }

          break;
        case "beban_bulanan":
        case "puncak_bulanan":
          diff = timeDiff(
            moment(data?.month_before).format('YYYY-MM-DD'),
            moment(data?.month_after).format('YYYY-MM-DD'),
            "months"
          );
          // delete data.datum_befores
          // delete data.datum_afters
          // delete data.year_before
          // delete data.year_after

          // delete data.datum_after
          // delete data.datum_before
          // delete data.day_after
          // delete data.day_before
          if (diff > 16) {
            valid = false;
            setError('month_after',
              {
                type: "manual",
                message: "Maksimal 16 bulan",
              })
          }

          break;
        case "beban_tahunan":
        case "puncak_tahunan":
          diff = timeDiff(
            moment(data?.year_before).format('YYYY-MM-DD'),
            moment(data?.year_after).format('YYYY-MM-DD'),
            "years"
          );
          // delete data.datum_befores
          // delete data.datum_afters
          // delete data.datum_before
          // delete data.datum_after

          // delete data.month_after
          // delete data.month_before
          // delete data.day_after
          // delete data.day_before
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

          if (valid == true && diff > 4) {
            valid = false;
            setError('year_after',
              {
                type: "manual",
                message: "Range maksmimal 10 tahun",
              })
            setError('year_before',
              {
                type: "manual",
                message: "Range maksmimal 10 tahun",
              })
          }

          break;

        default:
          break;
      }
      if (valid) {
        // setDataParams(data);
        setDataParams(() => {
          return { ...data }
        });
      }
    }

  };

  useEffect(() => {
    if (activeFilters?.filters?.id_gardu_induk) {
      setValue("id_ref_lokasi_gi", activeFilters?.filters?.id_gardu_induk)
    }

    if (activeFilters?.filters?.id_parent_lokasi) {
      setValue("id_parent_lokasi", activeFilters?.filters?.id_parent_lokasi)
    }
    if (!activeFilters?.filters?.id_gardu_induk && activeFilters?.filters?.id_ref_lokasi_trafo_gi) {
      setValue("id_ref_lokasi_trafo_gi", activeFilters?.filters?.id_ref_lokasi_trafo_gi)
    }
    if (!activeFilters?.filters?.id_gardu_induk && activeFilters?.filters?.id_ref_lokasi_penyulang) {
      setValue("id_ref_lokasi_penyulang", activeFilters?.filters?.id_ref_lokasi_penyulang)
    }
    if (activeFilters?.filters?.id_gardu_induk && activeFilters?.filters?.id_ref_lokasi_gh) {
      setValue("id_ref_lokasi_gh", activeFilters?.filters?.id_ref_lokasi_gh)
    }

    if (activeFilters?.filters?.id_gardu_induk && activeFilters?.filters?.id_ref_lokasi_kp) {
      setValue("id_ref_lokasi_kp", activeFilters?.filters?.id_ref_lokasi_kp)
    }
  }, [activeFilters?.filters])

  // console.log("perjm errorr", errors);

  
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
          datum_afters: moment().format('YYYY-MM-DD'),
          datum_befores: moment().format('YYYY-MM-DD'),
          day_after: moment().subtract(29, 'day').format('YYYY-MM-DD'),
          day_before: moment().format('YYYY-MM-DD'),
          month_after: moment().startOf('year').format('YYYY-MM'),
          month_before: moment().format('YYYY-MM'),
          year_after: moment().subtract(4, 'year').format('YYYY'),
          year_before: moment().format('YYYY'),
          id_lokasi:null,
          ...models,
        }}
      >
        <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
          <Row>
            {
              tabActive == 'beban_perjam' && (
                <Col md={6} className='mb-3'>
                  <Form.Group>
                    <Form.Label>Range Tanggal</Form.Label>
                    <InputGroup>
                      <FormControl
                        {...register('datum_afters')}
                        type='date'
                        // min={moment(watchDatum2Before)
                        //   .subtract(2, 'day')
                        //   .format('YYYY-MM-DD HH:mm')}
                        // max={watchDatum2Before}
                      />
                      <InputGroup.Text>
                        <i className='fa-solid fa-arrow-right'></i>
                      </InputGroup.Text>
                      <FormControl
                        {...register('datum_befores')}
                        type='date'
                        // min={moment(watchDatum1After)
                        //   .subtract(2, 'day')
                        //   .format('YYYY-MM-DD')}
                        // max={moment().format('YYYY-MM-DD')}
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
              (tabActive == 'beban_harian') && (
                <>
                  <Col md={6} className='mb-3'>
                    <Form.Group>
                      <Form.Label>Range Tanggal</Form.Label>
                      <InputGroup>
                        <FormControl
                          {...register('day_after')}
                          type='date'
                        />
                        <InputGroup.Text>
                          <i className='fa-solid fa-arrow-right'></i>
                        </InputGroup.Text>
                        <FormControl
                          {...register('day_before')}
                          type='date'
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
              tabActive == 'puncak_tahunan' && (
                <>
                  <Col md={4} className='mb-3'>
                    <Form.Group>
                      <Form.Label>Range Tahun</Form.Label>
                      <InputGroup>
                        <FormControl
                          {...register('year_after')}
                          type='year'
                        />

                        <InputGroup.Text>
                          <i className='fa-solid fa-arrow-right'></i>
                        </InputGroup.Text>
                        <FormControl
                          {...register('year_before')}
                          type='year'
                        />
                      </InputGroup>
                    </Form.Group>
                  </Col>

                </>
              )
            }
            {
              tabActive == 'faktor_harian' && (
                <Col md={6} className='mb-3'>
                  <Form.Group>
                    <Form.Label>Range Tanggal</Form.Label>
                    <InputGroup>
                      <FormControl
                        {...register('datum_after')}
                        type='date'
                        min={moment(watchDatum2Before)
                          .subtract(1, 'month')
                          .format('YYYY-MM-DD HH:mm')}
                        max={watchDatum2Before}
                      />
                      <InputGroup.Text>
                        <i className='fa-solid fa-arrow-right'></i>
                      </InputGroup.Text>
                      <FormControl
                        {...register('datum_before')}
                        type='date'
                        min={watchDatum1After}
                        max={moment().format('YYYY-MM-DD HH:mm')}
                      />
                    </InputGroup>
                  </Form.Group>
                </Col>
              )
            }
            {
              tabActive == 'faktor_bulanan' && (
                <Col md={6} className='mb-3'>
                  <Form.Group>
                    <Form.Label>Range Tanggal</Form.Label>
                    <InputGroup>
                      <FormControl
                        {...register('datum_after')}
                        type='month'
                        min={moment(watchDatum2Before)
                          .subtract(1, 'month')
                          .format('YYYY-MM-DD HH:mm')}
                        max={watchDatum2Before}
                      />
                      <InputGroup.Text>
                        <i className='fa-solid fa-arrow-right'></i>
                      </InputGroup.Text>
                      <FormControl
                        {...register('datum_before')}
                        type='month'
                        min={watchDatum1After}
                        max={moment().format('YYYY-MM-DD HH:mm')}
                      />
                    </InputGroup>
                  </Form.Group>
                </Col>
              )
            }
        
          
          
        {isGarduIndukPeny &&
           <Col md={2}>
              <Form.Group className='mb-2'>
                <Form.Label>Sumber (GI/Penyulang)</Form.Label>
                <SelectAsyncDynamic
                  fieldName='id_parent_lokasi'
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
                    id_ref_jenis_lokasi_in: `${JENIS_LOKASI().gardu_induk},${JENIS_LOKASI().penyulang}`
                  }}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.id_parent_lokasi?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

      }
          
            
            {isKP && watchSumber &&
              <Col md={3}>
             <Form.Group className='mb-3'>
                  <Form.Label>KeyPoint<RequiredInfo /></Form.Label>
                  <SelectAsyncDynamic
                    required={true}
                    {...selectKeypoint}
                    isClearable={true}
                    errors={errors}
                    control={control}
                    queryParams={{
                      id_ref_jenis_lokasi: JENIS_LOKASI().keypoint,
                      sort_by: "nama_lokasi",
                      // fungsi_lokasi:"GH"
                      id_parent_lokasi: watchSumber,
                    }}
                    watchParent={watchSumber}

                  />
                </Form.Group>
              </Col>
          }
          </Row>
          <FilterActionButton
            loading={loading}
            onClickReset={() => onSubmitForm(null)}
            className="justify-content-start"
          />
        </Form>
      </FiltersForm>
    </>
  )
}

export default SubSistemFilter