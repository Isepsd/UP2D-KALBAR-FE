import React, { useEffect, useState } from 'react';
import { Alert, Col, Form, FormControl, Modal, Row } from 'react-bootstrap';

import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import ButtonCancel from '@app/components/Button/ButtonCancel';
import { API_PATH } from '@app/services/_path.service';
import Button from '@app/components/Button/Button';
import RequiredInfo from '@app/components/Info/RequiredInfo';
import FormInputControlColumn from '@app/components/Input/FormInputControlColumn';
import InputDate from '@app/components/Date/InputDate';
import SelectAsyncDynamic from '@app/modules/SelectForm/SelectAsyncDynamicHmm';
import { JENIS_LOKASI } from '@app/configs/jenis-lokasi.config';
import SelectFormStatic from '@app/modules/SelectForm/SelectFormStatic';
import { JADWAL, JENIS_PELAYANAN } from '@app/configs/select-options/jadwal_pemeliharaan.select';
import { timeFormSelect } from '@app/helper/time.helper';
// import { REGU_PETUGAS } from '@app/configs/regu-petugas';
import { IJadwalPemerliharaan, JadwalPemerliharaanFeild } from '@app/interface/opsisdis-jadwal-pemeliharaan-update.interface';
import FormData from '@app/modules/Form/FormData';
import moment from 'moment';
import SelectFormStaticNewOnchange from "@app/modules/SelectForm/SelectFormStaticNewOnchange";
import { Controller } from "react-hook-form";
// import { postByPath, getAllByPath } from '@app/services/main.service';
// import { get } from 'lodash';
// import axios from 'axios';

// interface IFormUploadDocumentSLD {
//   garduInduk: any;
//   kelompok: string
// }

const OPTION_WILAYAH = [
  { label: 'BANTEN', value: 'BANTEN' },
  { label: 'TANGERANG', value: 'TANGERANG' },
];
const OPTION_STATUS = [
  { label: 'PELAKSANAAN', value: 'PELAKSANAAN' },
  { label: 'SUDAH DILAKSANAKAN', value: 'SUDAH DILAKSANAKAN' },
  { label: 'SUDAH MANUVER', value: 'SUDAH MANUVER' },
  { label: 'BATAL DILAKSANAKAN', value: 'BATAL DILAKSANAKAN' }
];


function UpdateJadwalHarFormPage({
  dataSelected,
  isAlreadyApproved,
  handleClose,


}: any) {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();
  const [optionsTimes, setOptionsTimes] = useState<any>([]);
  // const source = axios.CancelToken.source();

  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    tanggal: Yup.string().nullable(),
    keterangan: Yup.string().nullable(),
    jam_pekerjaan: Yup.string().nullable(),
    jtm: Yup.string().nullable(),
    wilayah_padam: Yup.string().nullable(),
    wilayah: Yup.string().nullable(),
    id_penyulang: Yup.string().nullable(),
    id_gardu_induk: Yup.string().nullable(),
    id_gardu: Yup.string().nullable(),
    respon_apd: Yup.string().nullable(),
    id_area: Yup.string().nullable(),
    id: Yup.string().nullable(),
    sifat_pekerjaan: Yup.string().nullable(),
    jenis_pelayanan: Yup.string().nullable(),
    status_pekerjaan: Yup.string().nullable(),
    butuh_padam: Yup.string().nullable(),
    jam1: Yup.string().nullable(),
    jam2: Yup.string().nullable(),
    jam_buka: Yup.string().nullable(),
    jam_tutup: Yup.string().nullable(),
    jenis_jadwal: Yup.string().nullable(),
    id_pelaksana: Yup.string().nullable(),
    id_pengawas: Yup.string().nullable(),
    periode_awal: Yup.string().nullable(),
    periode_akhir: Yup.string().nullable(),
    lokasi: Yup.string().nullable(),
    ceklis_yantek: Yup.string().nullable(),
    ceklis_vendor: Yup.string().nullable(),
  });

  const [formModel] = useState<any>({
    tanggal: moment().format('YYYY-MM-DD'), // Set current date using moment
    periode_awal: moment().format('YYYY-MM-DD'), // Set current date using moment
    periode_akhir: moment().format('YYYY-MM-DD'), // Set current date using moment
    jam_buka: moment().format('YYYY-MM-DD HH:MM:SS'), // Set current date using moment
    jam_tutup: moment().format('YYYY-MM-DD HH:MM:SS'), // Set current date using moment
    jam1: '00:00', // Default Jam 1
    jam2: '00:00', // Default Jam 2
  });

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
  const watchPadam = useWatch({ control, name: 'butuh_padam' });
  const watchGarduInduk = useWatch({ control, name: "id_gardu_induk" });
  const watchPenyulang = useWatch({ control, name: "id_penyulang" });
  const statusPekerjaan = useWatch({ control, name: 'status_pekerjaan' });
  const jamTutupValue = useWatch({ control, name: 'jam_tutup' });
  const jamBukaValue = useWatch({ control, name: 'jam_buka' });
  ///////////////////////////////////CEKLIS YANTEK VENDOR
  const OPTION_PELAKSANA = [
    { label: "Yandal PLN ES", value: "Yandal PLN ES" },
    { label: "Yandal PT SAJ", value: "Yandal PT SAJ" },
    { label: "Harsus PLN ES", value: "Harsus PLN ES" },
    { label: "Harsus PT SAJ", value: "Harsus PT SAJ" },
  ];

  const selectedYantek = useWatch({ control, name: "ceklis_yantek" });
  const selectedVendor = useWatch({ control, name: "ceklis_vendor" });
  const selectedPelaksana = useWatch({ control, name: "id_pelaksana" });
  // const isFirstRender = useRef(true);

  // useEffect(() => {
  //   if (isFirstRender.current) {
  //     isFirstRender.current = false;
  //     return;
  //   }

  //   setValue("id_pelaksana", "");
  // }, [selectedVendor, selectedYantek]);

  const isVendor = selectedVendor === 1;
  const isYantek = selectedYantek === 1;
  const isEditMode = selectedPelaksana != null;
///////////////////////////////////CEKLIS YANTEK VENDOR

  // const watchTanggal = useWatch({ control, name: 'tanggal' });
  // const [currentTime, setCurrentTime] = useState(() => {
  //   const now = new Date();
  //   return now.toLocaleTimeString('id-ID', { hour12: false });
  // });

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     const now = new Date();
  //     setCurrentTime(now.toLocaleTimeString('id-ID', { hour12: false }));
  //   }, 1000);
  //   return () => clearInterval(timer);
  // }, []);


  // console.log('wadidaw', namaLokasi)

  /** Handle Form Submission */
  const onSubmitForm = (data: IJadwalPemerliharaan) => {
    // const currentTime = new Date();
    // const formattedTime = currentTime.toTimeString().split(" ")[0]; // Format: HH:MM:SS

    // const jamBukaWithTime = `${data.jam_buka} ${formattedTime}`;
    // const jamTutupWithTime = `${data.jam_tutup} ${formattedTime}`;

    const params = {
      ...data,
      jam_pekerjaan: `${data.jam1}-${data.jam2}`,
      // jam_buka: jamBukaWithTime,
      // jam_tutup: jamTutupWithTime,
      // status_pekerjaan: type,
      // status_pekerjaan: data.status_pekerjaan,
      tanggal: data.tanggal,
    };

    setDataParams(params);
    console.log('Form submission data:', params);

    handleClose(); // Close the form modal or perform any further actions.

  };


  useEffect(() => {
    // let times = timeFormSelect(96, 15)
    let times = timeFormSelect(48, 30)
    setOptionsTimes(times)

  }, [])

  // const watchGarduInduk = useWatch({ control, name: 'id_gardu_induk' });
  // const watchPenyulang = useWatch({ control, name: 'id_penyulang' });
  // const watchsumber = useWatch({ control, name: 'sumber' });


  // const watchPengawas = useWatch({ control, name: "id" });



  // const [selectedDateMulai, setSelectedDateMulai] = useState("");
  // const [selectedDateSelesai, setSelectedDateSelesai] = useState("");

  // useEffect(() => {
  //   const todayDateMulai = moment().format("YYYY-MM-DD"); // Tanggal hari ini selalu digunakan
  //   setSelectedDateMulai(todayDateMulai);
  // }, []); // Gunakan dependency array kosong agar hanya dijalankan saat pertama kali render

  // useEffect(() => {
  //   const todayDateSelesai = moment().format("YYYY-MM-DD"); // Tanggal hari ini selalu digunakan
  //   setSelectedDateSelesai(todayDateSelesai);
  // }, []); // Gunakan dependency array kosong agar hanya dijalankan saat pertama kali render

  const initForm = (data: any) => {
    Object.keys(JadwalPemerliharaanFeild).map((field: any) => {
      switch (field) {
        case 'jam_pekerjaan':
          if (data[field]) {
            let time = data[field].split(" - ");
            setValue('jam1', time[0]);
            setValue('jam2', time[1]);
          } else {
            setValue('jam1', '');
            setValue('jam2', '');
          }
          break;
        case 'keterangan':
        case 'jenis_jadwal':
        case 'jenis_pelayanan':
        case 'butuh_padam':
        case 'wilayah_padam':
        case 'wilayah':
        case 'jtm':
        case 'tanggal':
        // case 'periode_awal':
        // case 'periode_akhir':
        case 'id_pelaksana':
        case 'id_pengawas':
        case 'id_gardu_induk':
        case 'id_penyulang':
        case 'id_gardu':
        case 'id_area':
        case 'sifat_pekerjaan':

          // case 'id_og':
          // case 'id_ref_jenis_pekerjaan':

          setValue(field, data[field]);
          break;
        default:
          break;
      }
    });
  }

  useEffect(() => {
    if (dataSelected) {
      initForm(dataSelected)
    }

  }, [dataSelected])

  return (
    <>

      {isAlreadyApproved === 2 ? (
        <Alert variant="danger" className="text-center mb-4">
          <p>Pemeliharaan di batalkan, data tidak bida di Update</p>
        </Alert>
      ) : (

        isAlreadyApproved === 1 && (
          <FormData
            setError={setError}
            setValue={setValue}
            dataParams={dataParams}
            fields={JadwalPemerliharaanFeild}
            path={API_PATH().opsisdis.jadwal_pemeliharaan.har_rotbmh}
            onLoading={setLoading}
            customLabel={'hide'}
            ids='ids'
            isModal
          // link='/opsisdis/jadwal-pemeliharaan/usulan-jadwal-har'

          // overrideType={{ tgl_upload: 'datetime' }}
          >
            <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>

              <Row>
                <Col md={6}>
                  <Form.Group as={Row} className='mb-3'>
                    <Form.Label className="col-md-4 col-form-label">
                      Tanggal Usulan <RequiredInfo />
                    </Form.Label>
                    <Col md={8}>
                      <InputDate
                        fieldName='tanggal'
                        errors={errors}
                        register={register}
                        disabled={true}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} className='mb-3'>
                    <Form.Label className="col-md-4 col-form-label">
                      Periode Awal <RequiredInfo />
                    </Form.Label>
                    <Col md={8}>
                      <FormControl
                        {...register("periode_awal")}
                        type="date"
                        defaultValue={moment(formModel.periode_awal).format("YYYY-MM-DD")}
                        disabled // Menambahkan properti disabled untuk membuat input tidak aktif
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} className='mb-3'>
                    <Form.Label className="col-md-4 col-form-label">
                      Periode Akhir <RequiredInfo />
                    </Form.Label>
                    <Col md={8}>
                      <FormControl
                        {...register("periode_akhir")}
                        type="date"
                        defaultValue={moment(formModel.periode_akhir).format(
                          "YYYY-MM-DD"
                        )}
                        disabled
                      // min={watchDatum1After}
                      // max={moment().format('YYYY-MM-DD')}
                      />
                      {/* <InputDate
                    errors={errors}
                    register={register}
                    fieldName='periode_akhir'
                  /> */}
                    </Col>
                  </Form.Group>


                  <Form.Group as={Row} className='mb-3'>
                    <Form.Label className="col-md-4 col-form-label">
                      Jam Pekerjaan <RequiredInfo />
                    </Form.Label>
                    <Col md={4}>
                      <SelectFormStatic
                        control={control}
                        errors={errors}
                        fieldName={'jam1'}
                        options={optionsTimes}
                        disabled
                      />
                      <Form.Control.Feedback type='invalid'>
                        {errors?.jam1?.message}
                      </Form.Control.Feedback>
                    </Col>
                    <Col md={4}>
                      <SelectFormStatic
                        control={control}
                        errors={errors}
                        fieldName={'jam2'}
                        options={optionsTimes}
                        disabled
                      />
                      <Form.Control.Feedback type='invalid'>
                        {errors?.jam2?.message}
                      </Form.Control.Feedback>
                    </Col>
                  </Form.Group>
                  {/* <Form.Group as={Row} className='mb-3'>
                  <Form.Label className="col-md-4 col-form-label">
                    sumber <RequiredInfo />
                  </Form.Label>
                  <Col md={8}>
                  <SelectFormStatic
                            control={control}
                            errors={errors}
                            fieldName={'sumber'}
                            options={option_sumber}
                          />
                  </Col>
                </Form.Group> */}

                  <Form.Group as={Row} className='mb-2'>
                    <Form.Label className="col-md-4 col-form-label">Gardu Induk</Form.Label>
                    <Col md={8}>
                      <SelectAsyncDynamic
                        fieldName="id_gardu_induk"
                        control={control}
                        errors={errors}
                        isDisabled={true}  // Menambahkan kondisi isDisabled
                        labelField={'nama_lokasi'}
                        valueField={'id_ref_lokasi'}
                        pathServiceName={'master.jaringan.ref_lokasi'}
                        watchParent={watchGarduInduk}
                        queryParams={{
                          id_ref_jenis_lokasi: JENIS_LOKASI().gardu_induk,
                          page: 1,
                          limit: 100,
                          id_ref_lokasi: watchGarduInduk
                        }}
                        setValue={setValue}
                        options={dataSelected?.gardu_induk}
                      />
                    </Col>
                  </Form.Group>


                  {watchGarduInduk != null &&
                    <Form.Group as={Row} className='mb-2'>
                      <Form.Label className="col-md-4 col-form-label">Penyulang</Form.Label>
                      <Col md={8}>
                        <SelectAsyncDynamic
                          fieldName="id_penyulang"
                          fieldNameParent="id_gardu_induk"
                          control={control}
                          errors={errors}
                          isLocked={true}
                          labelField={'nama_lokasi'}
                          valueField={'id_ref_lokasi'}
                          pathServiceName={'master.jaringan.ref_lokasi'}
                          queryParams={{
                            id_ref_jenis_lokasi: JENIS_LOKASI().penyulang,
                            page: 1,
                            limit: 200,
                          }}
                          setValue={setValue}
                          isDisabled={!watchGarduInduk}
                          watchParent={watchGarduInduk}
                          options={dataSelected?.penyulang}
                        ></SelectAsyncDynamic>
                      </Col>
                    </Form.Group>
                  }

                  {watchPenyulang != null &&
                    <Form.Group as={Row} className='mb-2'>
                      <Form.Label className="col-md-4 col-form-label">Gardu</Form.Label>
                      <Col md={8}>
                        <SelectAsyncDynamic
                          fieldName="id_gardu"
                          fieldNameParent="id_penyulang"
                          control={control}
                          errors={errors}
                          isLocked={true}
                          // isDisabled={true}
                          labelField={'nama_lokasi'}
                          valueField={'id_ref_lokasi'}
                          pathServiceName={'master.jaringan.ref_lokasi'}
                          queryParams={{
                            id_ref_jenis_lokasi: JENIS_LOKASI().gardu_distribusi,
                            page: 1,
                            limit: 200,
                          }}
                          setValue={setValue}
                          isDisabled={!watchPenyulang}
                          watchParent={watchPenyulang}
                          options={dataSelected?.gardu_distribusi}
                        ></SelectAsyncDynamic>
                      </Col>
                    </Form.Group>
                  }
                  <Form.Group as={Row} className='mb-3'>
                    <Form.Label className="col-md-4 col-form-label">
                      UP3  <RequiredInfo />
                    </Form.Label>
                    <Col md={8}>
                      <SelectAsyncDynamic
                        fieldName="id_area"
                        // fieldNameParent="id_penyulang"
                        // isLocked={true}
                        isDisabled={true}
                        control={control}
                        errors={errors}
                        labelField={'nama_lokasi'}
                        valueField={'id_ref_lokasi'}
                        pathServiceName={'master.jaringan.ref_lokasi'}
                        queryParams={{
                          id_ref_jenis_lokasi: JENIS_LOKASI().up3,
                          page: 1,
                          limit: 10,
                        }}
                        setValue={setValue}

                        // watchParent={watchPenyulang}
                        options={dataSelected?.up3}
                      ></SelectAsyncDynamic>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3 align-items-center">
                    <Form.Label className="col-md-4 col-form-label">
                      Dibutuhkan Padam
                    </Form.Label>
                    <Col md={6} className="d-flex align-items-center">
                      <Form.Check
                        type="switch"
                        id="butuh_padam"
                        {...register("butuh_padam")}
                        label={watchPadam ? "Ya" : "Tidak"}
                        className="ms-4" // Menambahkan margin kiri
                        disabled
                      />
                    </Col>
                  </Form.Group>

                  <FormInputControlColumn
                    labelName="JTM"
                    required={false}
                    readOnly={true}
                    placeholder="JTM"
                    isInvalid={errors?.jtm as boolean | undefined}
                    message={errors?.jtm?.message}
                    register={register('jtm')}
                    className='mb-3'
                    rows={4}
                    as={'textarea'}
                  />

                  <Form.Group as={Row} className='mb-3'>
                    <Form.Label className="col-md-4 col-form-label">
                      Status Pekerjaan <RequiredInfo />
                    </Form.Label>
                    <Col md={8}>
                      <SelectFormStatic
                        control={control}
                        errors={errors}
                        fieldName={'status_pekerjaan'}
                        options={OPTION_STATUS}
                      ></SelectFormStatic>
                    </Col>
                  </Form.Group>


                  <Form.Group as={Row} className='mb-3'>
                    <Form.Label className="col-md-4 col-form-label">
                      Realisasi Padam <RequiredInfo />
                    </Form.Label>
                    <Col md={8}>
                      <FormControl
                        {...register("jam_buka")}
                        type="datetime-local"
                        // value={selectedDateMulai}
                        // onChange={(e) => setSelectedDateMulai(e.target.value)}
                        disabled={statusPekerjaan === "SUDAH DILAKSANAKAN"}
                      />
                      {statusPekerjaan === "PELAKSANAAN" && !jamBukaValue && (
                        <Form.Text className="text-danger">
                          Pilih Tanggal Realisasi Padam
                        </Form.Text>
                      )}
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} className='mb-3'>
                    <Form.Label className="col-md-4 col-form-label">
                      Realisasi Nyala <RequiredInfo />
                    </Form.Label>
                    <Col md={8}>
                      <FormControl
                        {...register("jam_tutup")}
                        type="datetime-local"
                        // value={selectedDateSelesai}
                        // onChange={(e) => setSelectedDateSelesai(e.target.value)}
                        disabled={statusPekerjaan === "PELAKSANAAN"}
                      />
                      {statusPekerjaan === "SUDAH DILAKSANAKAN" && !jamTutupValue && (
                        <Form.Text className="text-danger">
                          Pilih Tanggal Realisasi Nyala
                        </Form.Text>
                      )}
                    </Col>
                  </Form.Group>


                </Col>
                <Col md={6}>
                  <Form.Group as={Row} className='mb-3'>
                    <Form.Label className="col-md-4 col-form-label">
                      Jadwal <RequiredInfo />
                    </Form.Label>
                    <Col md={8}>
                      <SelectFormStatic
                        disabled={true}
                        control={control}
                        errors={errors}
                        fieldName={'jenis_jadwal'}
                        options={JADWAL()}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} className='mb-3'>
                    <Form.Label className="col-md-4 col-form-label">
                      Respon APD <RequiredInfo />
                    </Form.Label>
                    <Col md={8}>
                      <Form.Control
                        disabled={true}
                        {...register('respon_apd')}
                        isInvalid={errors?.respon_apd as boolean | undefined}
                      />
                    </Col>
                  </Form.Group>

                  {/* <Form.Group as={Row} className='mb-3'>
                <Form.Label className="col-md-4 col-form-label">
                  Pengawas  <RequiredInfo />
                </Form.Label>
                <Col md={8}>
                  <SelectAsyncDynamic
                    fieldName='id_pengawas'
                    pathServiceName='master.admin_ksa.pengawas'
                    labelField='nama'
                    valueField='id'
                    placeholder='Pilih...'
                    isClearable={true}
                    errors={errors}
                    control={control}
                    defaultValue={''}
                    queryParams={{
                      page: 1,
                      limit: 10,
                      sort_by: "nama",
                    }}
                    setValue={setValue}
                    options={dataSelected?.pengawas}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className='mb-3'>
                <Form.Label className="col-md-4 col-form-label">
                  Pelaksana  <RequiredInfo />
                </Form.Label>
                <Col md={8}>
                  <SelectAsyncDynamic
                    fieldName='id_pelaksana'
                    pathServiceName='master.admin_ksa.perusahaan'
                    labelField='nama'
                    valueField='id_perusahaan'
                    placeholder='Pilih...'
                    isClearable={true}
                    errors={errors}
                    control={control}
                    defaultValue={''}
                    queryParams={{
                      page: 1,
                      limit: 10,
                      sort_by: "nama",
                    }}
                    setValue={setValue}
                    options={dataSelected?.pelaksana}
                  />
                </Col>
              </Form.Group> */}

                  <Form.Group as={Row} className='mb-3'>
                    <Form.Label className="col-md-4 col-form-label">
                      Pengawas
                    </Form.Label>
                    <Col md={8}>
                      <Form.Control
                        disabled={true}
                        {...register('id_pengawas')}
                        isInvalid={errors?.id_pengawas as boolean | undefined}
                      />
                    </Col>
                  </Form.Group>

                  {/* <Form.Group as={Row} className='mb-3'>
                    <Form.Label className="col-md-4 col-form-label">
                      Pelaksana
                    </Form.Label>
                    <Col md={8}>
                      <Form.Control
                        disabled={true}
                        {...register('id_pelaksana')}
                        isInvalid={errors?.id_pelaksana as boolean | undefined}
                      />
                    </Col>
                  </Form.Group> */}

                  <Form.Group as={Row} className="mb-3">
                                <Form.Label className="col-md-4 col-form-label">
                                  Ceklis Wajib diisi
                                </Form.Label>
                                <Col md={4}>
                                  <Controller
                                    name="ceklis_yantek"
                                    control={control}
                                    defaultValue={0}
                                    render={({ field }) => (
                                      <Form.Check
                                        type="checkbox"
                                        label="Yantek"
                                        checked={field.value === 1}
                                        // onChange={(e) => field.onChange(e.target.checked ? 1 : 0)}
                                        onChange={(e) => {
                                          const checked = e.target.checked ? 1 : 0;
                                          field.onChange(checked);
                  
                                          if (checked === 1) {
                                            setValue("ceklis_vendor", 0);
                                            setValue("id_pelaksana", ""); // reset juga
                                          }
                                        }}
                                        className="m-2"
                                      />
                                    )}
                                  />
                                </Col>
                                <Col md={4}>
                                  <Controller
                                    name="ceklis_vendor"
                                    control={control}
                                    defaultValue={0}
                                    render={({ field }) => (
                                      <Form.Check
                                        type="checkbox"
                                        label="Vendor"
                                        checked={field.value === 1}
                                        // onChange={(e) => field.onChange(e.target.checked ? 1 : 0)}
                                        onChange={(e) => {
                                          const checked = e.target.checked ? 1 : 0;
                                          field.onChange(checked);
                  
                                          if (checked === 1) {
                                            setValue("ceklis_yantek", 0);
                                            setValue("id_pelaksana", ""); // reset juga
                                          }
                                        }}
                                        className="m-2"
                                      />
                                    )}
                                  />
                                </Col>
                              </Form.Group>      
                  
                              <Form.Group as={Row} className="mb-3">
                              <Form.Label className="col-md-4 col-form-label">
                                Pelaksana
                              </Form.Label>
                              <Col md={8}>
                                {(isVendor || (!isVendor && !isYantek && isEditMode)) && (
                                  <Form.Control
                                    {...register("id_pelaksana")}
                                    isInvalid={errors?.id_pelaksana as boolean | undefined}
                                    // onChange={(e) =>
                                    //   handleInputChange("id_pelaksana", e.target.value)
                                    // }
                                  />
                                )}
              
                                {isYantek && (
                                  <SelectFormStaticNewOnchange
                                    control={control}
                                    errors={errors}
                                    fieldName={"id_pelaksana"}
                                    options={OPTION_PELAKSANA}
                                    // onChange={(value) => handleInputChange("id_pelaksana", value)}
                                  />
                                )}
                              </Col>
                            </Form.Group>

                  <Form.Group as={Row} className='mb-3'>
                    <Form.Label className="col-md-4 col-form-label">
                      Wilayah <RequiredInfo />
                    </Form.Label>
                    <Col md={8}>
                      <SelectFormStatic
                        disabled={true}
                        control={control}
                        errors={errors}
                        fieldName={'wilayah'}
                        options={OPTION_WILAYAH}
                      ></SelectFormStatic>
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} className='mb-3'>
                    <Form.Label className="col-md-4 col-form-label">
                      Jenis Pekerjaan <RequiredInfo />
                    </Form.Label>
                    <Col md={8}>
                      <Form.Control
                        disabled={true}
                        {...register('sifat_pekerjaan')}
                        isInvalid={errors?.sifat_pekerjaan as boolean | undefined}
                      />
                    </Col>
                  </Form.Group>


                  <FormInputControlColumn
                    labelName="Wilayah Padam"
                    required={false}
                    readOnly={true}
                    placeholder="Wilayah Padam"
                    isInvalid={errors?.wilayah_padam as boolean | undefined}
                    message={errors?.wilayah_padam?.message}
                    register={register('wilayah_padam')}
                    className='mb-3'
                    rows={4}
                    as={'textarea'}
                  />
                  <Form.Group as={Row} className='mb-3'>
                    <Form.Label className="col-md-4 col-form-label">
                      Jenis Pelayanan <RequiredInfo />
                    </Form.Label>
                    <Col md={8}>
                      <SelectFormStatic
                        disabled={true}
                        control={control}
                        errors={errors}
                        fieldName={'jenis_pelayanan'}
                        options={JENIS_PELAYANAN()}
                      />
                    </Col>
                  </Form.Group>
                  <FormInputControlColumn
                    labelName="Keterangan"
                    required={false}
                    readOnly={true}
                    placeholder="Keterangan"
                    isInvalid={errors?.keterangan as boolean | undefined}
                    message={errors?.keterangan?.message}
                    register={register('keterangan')}
                    className='mb-3'
                    as='textarea'
                    rows="4"
                  />
                  <Form.Group as={Row} className='mb-3'>
                    <Form.Label className="col-md-4 col-form-label">
                      Kode P <RequiredInfo />
                    </Form.Label>
                    <Col md={8}>
                      <Form.Control
                        disabled={false}
                        {...register('kode_p')}
                        isInvalid={errors?.kode_p as boolean | undefined}
                      />
                    </Col>
                  </Form.Group>

                </Col>
              </Row>


              <Modal.Footer>
                <div className='d-flex gap-2'>
                  <Button type='submit' variant='primary' disabled={loading}>
                    Update
                  </Button>
                  <ButtonCancel onClick={handleClose} />
                </div>
              </Modal.Footer>
            </Form>
          </FormData>
        )
      )}
    </>
  );
}

export default UpdateJadwalHarFormPage