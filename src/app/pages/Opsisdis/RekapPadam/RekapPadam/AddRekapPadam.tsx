import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Form, InputGroup } from 'react-bootstrap';
import { useForm, useWatch } from 'react-hook-form';
import axios from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

import FormData from '@app/modules/Form/FormData';
import { getAllByPath } from '@app/services/main.service';
import Button from '@app/components/Button/Button';
import SelectFormStatic from '@app/modules/SelectForm/SelectFormStatic';
import SelectAsyncDynamic from '@app/modules/SelectForm/SelectAsyncDynamic';
import InputDate from '@app/components/Date/InputDate';
import {
  AddRekapPadamField,
} from '@app/interface/rekap-padam/add-form-rekap-padam.interface';

import { API_PATH } from '@app/services/_path.service';
import FormInputControlColumn from '@app/components/Input/FormInputControlColumn';

const option_penyebab = [
  { label: '-', value: '' },
  { label: 'TRIP', value: 'TRIP' },
  { label: 'BUKA', value: 'BUKA' },
];

const option_gangguan_padam = [
  { label: '-', value: '' },
  { label: 'MELUAS', value: 'MELUAS' },
  { label: 'PERALATAN', value: 'PERALATAN' },
  { label: 'LBS MANUAL', value: 'LBS MANUAL' },
];

const option_jenis_padam = [
  { label: '-', value: '' },
  { label: 'TERENCANA', value: 'TERENCANA' },
  { label: 'TIDAK TERENCANA', value: 'TIDAK TERENCANA' },
];

const option_jenis_peralatan = [
  { label: '-', value: '' },
  { label: 'PENYULANG', value: 'PENYULANG' },
  { label: 'ZONA', value: 'ZONA' },

];

function AddRekapPadam() {
  const source = axios.CancelToken.source();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [
    dataParams,
    setDataParams
  ] = useState<any>();

  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    no_apkt: Yup.string().nullable(),
    keterangan: Yup.string().nullable(),
    beban_padam: Yup.number().typeError("Beban harus number"),
    // r: Yup.number().typeError("R harus number").required("Data harus diisi"),
    // s: Yup.number().typeError("R harus number").required("Data harus diisi"),
    // t: Yup.number().typeError("R harus number").required("Data harus diisi"),
    // n: Yup.number().typeError("R harus number").required("Data harus diisi"),
    tanggal: Yup.string().required("Tanggal belum dipilih"),
    // jam: Yup.string().required("Jam belum dipilih"),
    // menit: Yup.string().required("Menit belum dipilih"),
    // detik: Yup.string().required("Detik belum dipilih"),
    // millisecond: Yup.string().required("Millisecond harus diisi"),
    id_up3: Yup.string().nullable().typeError("Tipe data salah"),
    id_ulp: Yup.string().nullable().typeError("Tipe data salah"),
    up3: Yup.string().nullable().typeError("Tipe data salah"),
    ulp: Yup.string().nullable().typeError("Tipe data salah"),
    total_gardu_padam: Yup.string().nullable(),
    pelanggan_tm: Yup.string().nullable(),
    wilayah_padam: Yup.string().nullable(),
    jml_gangguan_bulan: Yup.string().nullable(),
    jml_gangguan_tahun: Yup.string().nullable(),
    jenis_padam: Yup.string().nullable(),
  });

  const [formModel] = useState<any>({
    status_data: 0,
    tanggal: moment().format("YYYY-MM-DD HH:mm:ss")
  });

  const { handleSubmit, setValue, setError, control, formState, register } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: formModel,
  });
  const { errors }: any = formState || {};
  const watchPenyebab = useWatch({ control, name: 'penyebab' });
  const watchJenisPeralatan = useWatch({ control, name: 'jenis_keypoint' });
  const watchPeralatan = useWatch({ control, name: 'id_keypoint' });
  const watchJenisPadam = useWatch({ control, name: "jenis_padam" });
  const watchGangguanPadam = useWatch({ control, name: "gangguan_padam" });

  /** SUBMIT FORM HANDLING */
  const onSubmitForm = (data: any) => {
    const { tanggal }: any = data;
    // const { jam, menit, detik, millisecond, tanggal }: any = data;

    const params: any = {
      ...data,
      // no_apkt: data?.no_apkt,
      // beban_padam: data?.beban_padam,
      // id_ref_ep_ag_hmi: data?.id_ref_ep_ag_hmi,
      // id_ref_ep_indikasi: data?.id_ref_ep_indikasi,
      // id_keypoint: data?.id_keypoint,
      // jenis_padam: data?.jenis_padam,
      // jenis_keypoint: data?.jenis_keypoint,
      // penyebab: data?.penyebab,
      // r: data?.r,
      // s: data?.s,
      // t: data?.t,
      // n: data?.n,
      // id_ref_ep_cuaca: data?.id_ref_ep_cuaca,
      // [paramsJam]: `${tanggal} ${jam}:${menit}:${detik}.${millisecond}`, //2022-08-29T06:33:46.491Z
      jam_padam: moment(tanggal).format("YYYY-MM-DD HH:mm:ss"), //2022-08-29T06:33:46.491Z
    }
    params.tanggal = moment(tanggal).format("YYYY-MM-DD")

    setDataParams(params);
  };

  const getSelectOptions = async (id_keypoint: any) => {
    try {
      await getAllByPath(
        API_PATH().opsisdis.rekap_padam.tranf_ep_peralatan_detail + id_keypoint,
        {},
        source.token
      )
        .then((response: any) => {
          const { results, status } = response;
          if (status === 200) {
            const {
              gardu_induk,
              up3,
              ulp,
              total_gardu_padam,
              pelanggan_tm,
              pelanggan_vip,
              alamat,
              total_gangguan_month,
              total_gangguan_year,
            } = results;
            setValue('gardu_induk', gardu_induk?.nama_lokasi);
            setValue('id_up3', up3?.id_ref_lokasi);
            setValue('id_ulp', ulp?.id_ref_lokasi);
            setValue('up3', up3?.nama_lokasi);
            setValue('ulp', ulp?.nama_lokasi);
            setValue('total_gardu_padam', total_gardu_padam);
            setValue('pelanggan_tm', pelanggan_tm);
            setValue('pelanggan_vip', pelanggan_vip);
            setValue('wilayah_padam', alamat);
            setValue('jml_gangguan_bulan', total_gangguan_month);
            setValue('jml_gangguan_tahun', total_gangguan_year);
          }
        })
        .catch(function (e: any) {
          console.log('e', e);
        });
    } catch { }
  };

  useEffect(() => {
    if (watchPeralatan) {
      getSelectOptions(watchPeralatan);
    }
  }, [watchPeralatan]);

  useEffect(() => {
    if (watchPenyebab === 'TRIP') {
      setValue('jenis_padam', 'TIDAK TERENCANA');
    } else if (watchPenyebab === 'BUKA') {
      setValue('jenis_padam', 'TERENCANA');
    }
  }, [watchPenyebab]);

  useEffect(() => {

    switch (watchGangguanPadam) {
      case "MELUAS":
        setValue("jenis_keypoint", null)
        setValue("id_keypoint", null)

        break;
      case "PERALATAN":
        setValue("lbs_manual", null)

        break;
      case "LBS MANUAL":
        setValue("id_keypoint", null)
        setValue("jenis_keypoint", null)
        setValue("wilayah_padam", null)
        break;

      default:
        break;
    }
  }, [watchGangguanPadam]);




  // console.log("erorr", errors);

  return (
    <>
      <Row>
        <Col md={12} className='mb-4 position-static'>
          <Card>
            <Card.Body>
              <FormData
                setError={setError}
                setValue={setValue}
                dataParams={dataParams}
                fields={AddRekapPadamField}
                path={API_PATH().opsisdis.rekap_padam.trans_ep}
                onLoading={setLoading}
                customLabel={'hide'}
                hideTitle
                batch={false}
                idUserEntri={true}
              >
                <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
                  <Row>
                    <Col md={12}>
                      <FormInputControlColumn
                        labelName="No. APKT"
                        placeholder="No. APKT"
                        isInvalid={errors?.no_apkt as boolean | undefined}
                        message={errors?.no_apkt?.message}
                        register={register('no_apkt')}
                        className='mb-3'
                        column1={2}
                        column2={2}
                      />
                      {/* <InputDateWithMillisecond
                        control={control}
                        errors={errors}
                        register={register}
                        label="Jam Padam"
                        fieldDate="tanggal"
                        fieldHours="jam"
                        fieldMinutes="menit"
                        fieldSecond="detik"
                        fieldMilliSecond="millisecond"
                      /> */}
                      <Form.Group as={Row} className='mb-3'>
                        <Form.Label column md={2}>
                          Jam Padam
                        </Form.Label>
                        <Col md={3}>
                          <InputDate
                            errors={errors}
                            register={register}
                            type="datetime-local"
                            fieldName="jam_padam"
                          />
                        </Col>
                      </Form.Group>
                      <Form.Group as={Row} className='mb-3'>
                        <Form.Label column md={2}>
                          Penyebab
                        </Form.Label>
                        <Col md={2}>
                          <SelectFormStatic
                            control={control}
                            errors={errors}
                            fieldName={'penyebab'}
                            options={option_penyebab}
                          />
                        </Col>
                        <Form.Label column md={2}>
                          Jenis Padam
                        </Form.Label>
                        <Col md={2} className='mb-3'>
                          <SelectFormStatic
                            control={control}
                            errors={errors}
                            fieldName={'jenis_padam'}
                            options={option_jenis_padam}
                          />
                        </Col>
                        {watchPenyebab === 'BUKA' &&
                          <Col md={4}>
                            <FormInputControlColumn
                              labelName="Keterangan"
                              placeholder="Keterangan"
                              isInvalid={errors?.keterangan as boolean | undefined}
                              message={errors?.keterangan?.message}
                              register={register('keterangan')}
                              type='text'
                              as='textarea'
                              rows={3}
                              className='mb-3'
                              column1={6}
                              column2={6}
                            />
                          </Col>
                        }
                      </Form.Group>
                      <Form.Group as={Row} className='mb-3'>
                        <Form.Label column md={2}>
                          Beban Padam
                        </Form.Label>
                        <Col md={2}>
                          <InputGroup>
                            <Form.Control
                              type={'text'}
                              {...register('beban_padam')}
                              isInvalid={errors?.beban_padam as boolean | undefined}
                              placeholder={'Beban Padam'}
                            />
                            <Form.Control.Feedback type='invalid'>{errors?.beban_padam?.message}</Form.Control.Feedback>
                            <InputGroup.Text>A</InputGroup.Text>
                          </InputGroup>
                        </Col>
                      </Form.Group>
                      <Form.Group as={Row} className='mb-3'>
                        <Form.Label column md={2}>
                          Indikasi
                        </Form.Label>
                        <Col md={2}>
                          <SelectAsyncDynamic
                            required={true}
                            fieldName={'id_ref_ep_indikasi'}
                            pathServiceName={
                              'opsisdis.rekap_padam.ref_ep_indikasi'
                            }
                            labelField={'nama'}
                            valueField={'id_ref_ep_indikasi'}
                            placeholder={'Pilih...'}
                            isClearable={false}
                            errors={errors}
                            control={control}
                            queryParams={{ page: -1 }}
                            watchParent={watchJenisPadam}
                            fieldNameParent="jenis"
                          />
                        </Col>
                      </Form.Group>
                      {watchPenyebab === 'TRIP' && (
                        <>
                          <Form.Group as={Row} className='mb-3'>
                            <Form.Label column md={2}>
                              Arus Gangguan:
                            </Form.Label>
                            <Col md={2}>
                              <InputGroup>
                                <InputGroup.Text id='basic-addon1'>
                                  R
                                </InputGroup.Text>
                                <Form.Control
                                  type={'number'}
                                  {...register('r')}
                                  isInvalid={errors?.r as boolean | undefined}
                                  placeholder={'0.00'}
                                />
                                <InputGroup.Text id='basic-addon1'>
                                  A
                                </InputGroup.Text>
                              </InputGroup>
                            </Col>
                            <Col md={2}>
                              <InputGroup>
                                <InputGroup.Text id='basic-addon1'>
                                  S
                                </InputGroup.Text>
                                <Form.Control
                                  type={'number'}
                                  {...register('s')}
                                  isInvalid={errors?.s as boolean | undefined}
                                  placeholder={'0.00'}
                                />
                                <InputGroup.Text id='basic-addon1'>
                                  A
                                </InputGroup.Text>
                              </InputGroup>
                            </Col>
                            <Col md={2}>
                              <InputGroup>
                                <InputGroup.Text id='basic-addon1'>
                                  T
                                </InputGroup.Text>
                                <Form.Control
                                  type={'number'}
                                  {...register('t')}
                                  isInvalid={errors?.t as boolean | undefined}
                                  placeholder={'0.00'}
                                />
                                <InputGroup.Text id='basic-addon1'>
                                  A
                                </InputGroup.Text>
                              </InputGroup>
                            </Col>
                            <Col md={2}>
                              <InputGroup>
                                <InputGroup.Text id='basic-addon1'>
                                  N
                                </InputGroup.Text>
                                <Form.Control
                                  type={'number'}
                                  {...register('n')}
                                  isInvalid={errors?.n as boolean | undefined}
                                  placeholder={'0.00'}
                                />
                                <InputGroup.Text id='basic-addon1'>
                                  A
                                </InputGroup.Text>
                              </InputGroup>
                            </Col>
                          </Form.Group>
                          <Form.Group as={Row} className='mb-5'>
                            <Form.Label column md={2}>
                              FAI arus gangguan HMI
                            </Form.Label>
                            <Col md={2}>
                              <SelectAsyncDynamic
                                required={true}
                                fieldName={'id_ref_ep_ag_hmi'}
                                pathServiceName={
                                  'master.opsisdis.rekap_padam.ag_hmi'
                                }
                                labelField={'nama'}
                                valueField={'id_ref_ep_ag_hmi'}
                                placeholder={'Pilih...'}
                                isClearable={true}
                                errors={errors}
                                control={control}
                                queryParams={{ page: -1 }}
                              />
                            </Col>
                          </Form.Group>
                        </>
                      )}
                      <div className='mb-3 mt-5'>
                        <strong>Peralatan Padam</strong>
                      </div>
                      <Form.Group as={Row} className='mb-3'>
                        <Form.Label column md={2}>
                          Gangguan Padam
                        </Form.Label>
                        <Col md={2}>
                          <SelectFormStatic
                            control={control}
                            errors={errors}
                            fieldName={'gangguan_padam'}
                            options={option_gangguan_padam}
                          />
                        </Col>
                      </Form.Group>
                      {watchGangguanPadam === "LBS MANUAL" &&
                        < Form.Group as={Row} className='mb-3'>
                          <Form.Label column md={2}>
                            LBS Manual
                          </Form.Label>
                          <Col md={2}>
                            <Form.Control
                              {...register('lbs_manual')}
                              isInvalid={errors?.lbs_manual as boolean | undefined}
                            />
                          </Col>
                        </Form.Group>
                      }
                      {watchGangguanPadam === "MELUAS" &&
                        <Form.Group as={Row} className='mb-3'>
                          <Form.Label column md={2}>
                            GANGGUAN MELUAS
                          </Form.Label>
                          <Col md={2}>
                            <Form.Control
                              {...register('lbs_manual')}
                              isInvalid={errors?.lbs_manual as boolean | undefined}
                            />
                          </Col>
                        </Form.Group>
                      }

                      {watchGangguanPadam === "PERALATAN" &&

                        <>
                          <Form.Group as={Row} className='mb-3'>
                            <Form.Label column md={2}>
                              Jenis Peralatan
                            </Form.Label>
                            <Col md={2}>
                              <SelectFormStatic
                                control={control}
                                errors={errors}
                                fieldName={'jenis_keypoint'}
                                options={option_jenis_peralatan}
                              />
                            </Col>
                          </Form.Group>
                          <Form.Group as={Row} className='mb-3'>
                            <Form.Label column md={2}>
                              Peralatan
                            </Form.Label>
                            <Col md={3}>
                              {watchJenisPeralatan == "PENYULANG" &&
                                <SelectAsyncDynamic
                                  required={true}
                                  fieldName='id_keypoint'
                                  pathServiceName='master.jaringan.ref_lokasi'
                                  labelField='nama_lokasi'
                                  valueField='id_ref_lokasi'
                                  placeholder={'Pilih...'}
                                  isClearable={true}
                                  errors={errors}
                                  control={control}
                                  queryParams={{
                                    page: -1,
                                    limit: 10,
                                    id_ref_jenis_lokasi: 6
                                  }}
                                />
                              }
                              {(watchJenisPeralatan == "ZONA") &&
                                <SelectAsyncDynamic
                                  required={true}
                                  fieldName='id_keypoint'
                                  pathServiceName='master.jaringan.ref_lokasi'
                                  labelField='nama_lokasi'
                                  valueField='id_ref_lokasi'
                                  placeholder={'Pilih...'}
                                  isClearable={true}
                                  errors={errors}
                                  control={control}
                                  queryParams={{
                                    page: -1,
                                    // id_ref_jenis_lokasi: 7
                                    fungsi_lokasi:'zone'
                                  }}
                                />
                              }

                              {/* {(watchJenisPeralatan == "RECLOSER") &&
                                <SelectAsyncDynamic
                                  required={true}
                                  fieldName='id_keypoint'
                                  pathServiceName='master.jaringan.ref_lokasi'
                                  labelField='nama_lokasi'
                                  valueField='id_ref_lokasi'
                                  placeholder={'Pilih...'}
                                  isClearable={true}
                                  errors={errors}
                                  control={control}
                                  queryParams={{
                                    page: -1,
                                    id_ref_jenis_lokasi: 31
                                  }}
                                />
                              }
                              {watchJenisPeralatan == "MOTORIZED" &&
                                <SelectAsyncDynamic
                                  required={true}
                                  fieldName='id_keypoint'
                                  pathServiceName='master.jaringan.ref_lokasi'
                                  labelField='nama_lokasi'
                                  valueField='id_ref_lokasi'
                                  placeholder={'Pilih...'}
                                  isClearable={true}
                                  errors={errors}
                                  control={control}
                                  queryParams={{
                                    page: -1,
                                    id_ref_jenis_lokasi: 6,
                                  }}
                                />
                              } */}
                            </Col>
                          </Form.Group>
                          <Form.Group as={Row} className='mb-3'>
                            {watchJenisPeralatan == 'MOTORIZED' && (
                              <>
                                <Form.Label column md={2}>
                                  Zona
                                </Form.Label>
                                <Col md={2}>
                                  <Form.Control
                                    type={'text'}
                                    {...register('zona')}
                                    isInvalid={errors?.zona as boolean | undefined}
                                  />
                                </Col>
                              </>
                            )}
                            {(watchJenisPeralatan == 'GH') && (
                              <>
                                <Form.Label column md={2}>
                                  Gardu Hubung
                                </Form.Label>
                                <Col md={2}>
                                  <Form.Control
                                    type={'text'}
                                    {...register('gardu_hubung')}
                                    isInvalid={errors?.gardu_hubung as boolean | undefined}
                                  />
                                </Col>
                              </>
                            )}

                            {(watchJenisPeralatan == 'GH' ||
                              watchJenisPeralatan == 'MOTORIZED' ||
                              watchJenisPeralatan == 'RECLOSER') && (
                                <>
                                  <Form.Label column md={2}>
                                    Penyulang GI
                                  </Form.Label>
                                  <Col md={2}>
                                    <Form.Control
                                      type={'text'}
                                      {...register('penyulang_gi')}
                                      isInvalid={errors?.penyulang_gi as boolean | undefined}
                                    />
                                  </Col>
                                </>
                              )}

                            <Form.Label column md={2}>
                              Gardu Induk
                            </Form.Label>
                            <Col md={2}>
                              <Form.Control
                                type={'text'}
                                {...register('gardu_induk')}
                                isInvalid={errors?.gardu_induk as boolean | undefined}
                              />
                            </Col>
                          </Form.Group>
                          <Form.Group as={Row} className='mb-3'>
                            {(watchJenisPeralatan == 'GH' ||
                              watchJenisPeralatan == 'GI' ||
                              watchJenisPeralatan == 'MOTORIZED' ||
                              watchJenisPeralatan == 'RECLOSER') && (
                                <>
                                  <Form.Label column md={2}>
                                    UP3
                                  </Form.Label>
                                  <Col md={2}>
                                    <Form.Control
                                      type={'text'}
                                      {...register('up3')}
                                      isInvalid={errors?.up3 as boolean | undefined}
                                    />

                                  </Col>
                                </>
                              )}
                            {(watchJenisPeralatan == 'GH' ||
                              watchJenisPeralatan == 'GI' ||
                              watchJenisPeralatan == 'MOTORIZED' ||
                              watchJenisPeralatan == 'RECLOSER') && (
                                <>
                                  <Form.Label column md={2}>
                                    ULP
                                  </Form.Label>
                                  <Col md={2}>
                                    <Form.Control
                                      type={'text'}
                                      {...register('ulp')}
                                      isInvalid={errors?.ulp as boolean | undefined}
                                    />
                                  </Col>
                                </>
                              )}
                            {(watchJenisPeralatan == 'GH' ||
                              watchJenisPeralatan == 'GI' ||
                              watchJenisPeralatan == 'MOTORIZED' ||
                              watchJenisPeralatan == 'RECLOSER') && (
                                <>
                                  <Form.Label column md={2}>
                                    Gardu Padam
                                  </Form.Label>
                                  <Col md={2}>
                                    <Form.Control
                                      type={'text'}
                                      {...register('total_gardu_padam')}
                                      isInvalid={errors?.total_gardu_padam as boolean | undefined}
                                    />
                                  </Col>
                                </>
                              )}
                          </Form.Group>
                        </>
                      }
                      <Form.Group as={Row} className='mb-3'>
                        {(watchJenisPeralatan == 'GH' ||
                          watchJenisPeralatan == 'GI' ||
                          watchJenisPeralatan == 'MOTORIZED' ||
                          watchJenisPeralatan == 'RECLOSER') && (
                            <>
                              {/* <Form.Label column md={2}>
                                Pelanggan TM
                              </Form.Label>
                              <Col md={2}>
                                <Form.Control
                                  type={'text'}
                                  {...register('pelanggan_tm')}
                                  isInvalid={errors?.pelanggan_tm as boolean | undefined}
                                />
                              </Col> */}
                            </>
                          )}
                        {(watchJenisPeralatan == 'GH' ||
                          watchJenisPeralatan == 'GI' ||
                          watchJenisPeralatan == 'MOTORIZED' ||
                          watchJenisPeralatan == 'RECLOSER') && (
                            <>
                              {/* <Form.Label column md={2}>
                                Pelanggan VIP
                              </Form.Label>
                              <Col md={2}>
                                <Form.Control
                                  type={'text'}
                                  {...register('pelanggan_vip')}
                                  isInvalid={errors?.pelanggan_tm as boolean | undefined}
                                />
                              </Col> */}
                            </>
                          )}
                        {(watchJenisPeralatan == 'GH' ||
                          watchJenisPeralatan == 'GI' ||
                          watchJenisPeralatan == 'MOTORIZED' ||
                          watchJenisPeralatan == 'RECLOSER') && (
                            <>
                              <Form.Label column md={2}>
                                Wilayah Padam
                              </Form.Label>
                              <Col md={2}>
                                <Form.Control
                                  type={'text'}
                                  as="textarea"
                                  rows={3}
                                  {...register('wilayah_padam')}
                                  isInvalid={errors?.wilayah_padam as boolean | undefined}
                                />
                              </Col>
                            </>
                          )}
                      </Form.Group>
                      <div className='mb-3'>
                        <strong>Indikator</strong>
                      </div>
                      <Form.Group as={Row} className='mb-3'>
                        <Form.Label
                          column
                          md={watchPenyebab === 'TRIP' ? 3 : 2}
                        >
                          Cuaca
                        </Form.Label>
                        <Col md={2}>
                          <SelectAsyncDynamic
                            required={true}
                            fieldName={'id_ref_ep_cuaca'}
                            pathServiceName={
                              'opsisdis.rekap_padam.ref_ep_cuaca'
                            }
                            labelField={'nama'}
                            valueField={'id_ref_ep_cuaca'}
                            placeholder={'Pilih...'}
                            isClearable={true}
                            errors={errors}
                            control={control}
                            queryParams={{ page: -1, jenis: watchPenyebab }}
                            watchParent={watchPenyebab}
                          />
                        </Col>
                      </Form.Group>
                      {watchPenyebab === 'TRIP' && (
                        <>
                          <Form.Group as={Row} className='mb-3'>
                            <Form.Label column md={3}>
                              Jumlah gangguan dalam{' '}
                              {moment().format('MMM YYYY')}
                            </Form.Label>
                            <Col md={2}>
                              <Form.Control
                                type={'number'}
                                {...register('jml_gangguan_bulan')}
                                isInvalid={errors?.jml_gangguan_bulan as boolean | undefined}
                              />
                            </Col>
                          </Form.Group>
                          <Form.Group as={Row} className='mb-3'>
                            <Form.Label column md={3}>
                              Jumlah gangguan dalam {moment().format('YYYY')}
                            </Form.Label>
                            <Col md={2}>
                              <Form.Control
                                type={'text'}
                                {...register('jml_gangguan_tahun')}
                                isInvalid={errors?.jml_gangguan_tahun as boolean | undefined}
                              />
                            </Col>
                          </Form.Group>
                        </>
                      )}
                    </Col>
                  </Row>
                  <div className='d-flex gap-2'>
                    <Button type='submit' variant='primary' isLoading={loading}>
                      Simpan
                    </Button>
                    <a className='btn btn-danger' type='button'
                      onClick={() => { navigate('/opsisdis/rekap-padam/rekap') }}>
                      Back
                    </a>
                  </div>

                </Form>
              </FormData>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default AddRekapPadam;
