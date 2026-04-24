import React, { useEffect, useState } from 'react';
import { Alert, Col, Form, Modal, Row } from 'react-bootstrap';

import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import ButtonCancel from '@app/components/Button/ButtonCancel';
import { API_PATH } from '@app/services/_path.service';
import Button from '@app/components/Button/Button';
import RequiredInfo from '@app/components/Info/RequiredInfo';
import FormInputControlColumn from '@app/components/Input/FormInputControlColumn';
// import InputDate from '@app/components/Date/InputDate';
import InputDateNew from "@app/components/Date/InputDateNewMin";
import SelectAsyncDynamic from '@app/modules/SelectForm/SelectAsyncDynamicOLD';
// import SelectAsyncDynamicOnChange from '@app/modules/SelectForm/SelectAsyncDynamicOnChange';
import SelectAsyncDynamicNewOnchangeGardu from '@app/modules/SelectForm/SelectAsyncDynamicNewOnchangeGardu';
import SelectAsyncDynamicNewOnchange from "@app/modules/SelectForm/SelectAsyncDynamicNewOnchange";
import { JENIS_LOKASI } from '@app/configs/jenis-lokasi.config';
import SelectFormStatic from '@app/modules/SelectForm/SelectFormStatic';
import { JADWAL, JENIS_PELAYANAN,
  KATEGORI_ROTBMH,SIFAT_PEKERJAAN_2 } from '@app/configs/select-options/jadwal_pemeliharaan_rotbmh.select';
import { timeFormSelect } from '@app/helper/time.helper';
// import { REGU_PETUGAS } from '@app/configs/regu-petugas';
import { IJadwalPemerliharaan, JadwalPemerliharaanFeild } from '@app/interface/opsisdis-jadwal-pemeliharaan-posting-rotbmh.interface';
import FormData from '@app/modules/Form/FormData';
import moment from 'moment';
import { getAllByPath } from "@app/services/main.service";
import axios from "axios";
import SelectAsyncDynamicNewOnchangeJenisPekerjaan from '@app/modules/SelectForm/SelectAsyncDynamicNewOnchangeJenisPekerjaan';
import SelectFormStaticNewOnchange from "@app/modules/SelectForm/SelectFormStaticNewOnchange";
import { Controller } from "react-hook-form";

// interface IFormUploadDocumentSLD {
//   garduInduk: any;
//   kelompok: string
// }

const OPTION_WILAYAH = [
  { label: 'BANTEN', value: 'BANTEN' },
  { label: 'TANGERANG', value: 'TANGERANG' },
];

function UsulanJadwalHarFormPage({
  dataSelected,
  // type,
  handleClose,
  isAlreadyApproved


}: any) {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();
  const [optionsTimes, setOptionsTimes] = useState<any>([]);
  const source = axios.CancelToken.source();



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
    sifat_pekerjaan: Yup.string().required(),
    jenis_pelayanan: Yup.string().nullable(),
    status_pekerjaan: Yup.string().nullable(),
    butuh_padam: Yup.string().nullable(),
    jam1: Yup.string().nullable(),
    jam2: Yup.string().nullable(),
    jam_buka: Yup.string().nullable(),
    jam_tutup: Yup.string().nullable(),
    jenis_jadwal: Yup.string().nullable(),
    id_pelaksana: Yup.string().required(),
    id_pengawas: Yup.string().nullable(),

    jumlah_gardu_padam: Yup.number().nullable(),
    id_posko: Yup.string().nullable(),
    id_pemilik_pekerjaan: Yup.string().nullable(),
    sifat_pekerjaan_2: Yup.string().required(),
    keterangan_detail_jenis_pekerjaan: Yup.string().nullable(),
    kategori_rotbmh: Yup.string().required(),
    ceklis_yantek: Yup.string().nullable(),
    ceklis_vendor: Yup.string().nullable(),
  });

  const [formModel, setFormModel] = useState<any>({
    tanggal: moment().format('YYYY-MM-DD'), // Set current date using moment
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
    // watch,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: formModel,
  });

  const { errors }: any = formState || {};
  const isReadOnly = dataSelected?.release_rotbmh === 1;
  
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
      
  const watchKategori = useWatch({ control, name: "kategori_rotbmh" });
    // ///////////////////////////////ROT
    //   const getMinDateROT = () => {
    //     const now = moment();
    
    //     // Minggu ke-4 November (anggap mulai tgl 22)
    //     const novemberFourthWeek = moment()
    //       .year(now.year())
    //       .month(10) // November
    //       .date(22)
    //       .startOf("day");
    
    //     // Kalau SUDAH minggu ke-4 November → lock ke tahun +2
    //     const targetYear = now.isSameOrAfter(novemberFourthWeek, "day")
    //       ? now.year() + 2
    //       : now.year() + 1;
    
    //     return moment()
    //       .year(targetYear)
    //       .startOf("year") // 1 Januari
    //       .format("YYYY-MM-DD");
    //   };
    
    
    
    //   const [minDateROT, setMinDateROT] = useState<string | undefined>(undefined);
    
    //   useEffect(() => {
    //     if (watchKategori !== "ROT") {
    //       setMinDateROT(undefined);
    //       return;
    //     }
    
    //     const minDate = getMinDateROT();
    //     setMinDateROT(minDate);
    
    //     const fields = ["tanggal", "periode_awal", "periode_akhir"] as const;
    
    //     fields.forEach((field) => {
    //       const value = watch(field);
    
    //       if (value && moment(value).isBefore(minDate, "day")) {
    //         setValue(field, minDate);
    //         handleInputChange(field, minDate);
    //       }
    //     });
    //   }, [watchKategori]);
    //   ///////////////////////////////ROT
    //   ///////////////////////////////ROB
    //   const getMinDateROB = () => {
    //     const now = moment();
    
    //     const daysInMonth = now.daysInMonth();
    
    //     // Mulai 3 hari terakhir bulan ini
    //     const lastThreeStart = moment()
    //       .year(now.year())
    //       .month(now.month())
    //       .date(daysInMonth - 2)
    //       .startOf("day");
    
    //     // Kalau sudah masuk 3 hari terakhir → lompat 2 bulan
    //     const addMonth = now.isSameOrAfter(lastThreeStart, "day") ? 2 : 1;
    
    //     return now
    //       .clone()
    //       .add(addMonth, "month")
    //       .startOf("month") // selalu tanggal 1
    //       .format("YYYY-MM-DD");
    //   };
    
    
    //   const [minDateROB, setMinDateROB] = useState<string | undefined>(undefined);
    //     useEffect(() => {
    //     if (watchKategori !== "ROB") {
    //       setMinDateROB(undefined);
    //       return;
    //     }
    
    //     const minDate = getMinDateROB();
    //     setMinDateROB(minDate);
    
    //     const fields = ["tanggal", "periode_awal", "periode_akhir"] as const;
    
    //     fields.forEach((field) => {
    //       const value = watch(field);
    
    //       if (value && moment(value).isBefore(minDate, "day")) {
    //         setValue(field, minDate);
    //         handleInputChange(field, minDate);
    //       }
    //     });
    //   }, [watchKategori]);
    //   ///////////////////////////////ROB
    //   //////////////////////////////ROM
    //     const getRangeDateROM = () => {
    //       const now = moment();
    //       const day = now.isoWeekday(); // 1=Senin ... 5=Jumat
    
    //       const thisMonday = now.clone().startOf("isoWeek");
    
    //       const weekOffset = day >= 5 ? 2 : 1;
    
    //       const targetMonday = thisMonday.clone().add(weekOffset, "weeks");
    
    //       return {
    //         min: targetMonday.format("YYYY-MM-DD"),
    //         max: targetMonday.clone().add(6, "days").format("YYYY-MM-DD"),
    //       };
    //     };
    
    //     const [minDateROM, setMinDateROM] = useState<string>();
    //     const [maxDateROM, setMaxDateROM] = useState<string>();
    //     useEffect(() => {
    //       if (watchKategori !== "ROM") {
    //         setMinDateROM(undefined);
    //         setMaxDateROM(undefined);
    //         return;
    //       }
    
    //       const { min, max } = getRangeDateROM();
    
    //       setMinDateROM(min);
    //       setMaxDateROM(max);
    
    //       const fields = ["tanggal", "periode_awal", "periode_akhir"] as const;
    
    //       fields.forEach((field) => {
    //         const value = watch(field);
    
    //         if (
    //           value &&
    //           (moment(value).isBefore(min, "day") ||
    //             moment(value).isAfter(max, "day"))
    //         ) {
    //           setValue(field, min);
    //           handleInputChange(field, min);
    //         }
    //       });
    //     }, [watchKategori]);
      
    //   //////////////////////////////ROM 
    //   //////////////////////////////ROH
    //   const getDateROH = () => {
    //     return moment()
    //       .add(1, "day")
    //       .startOf("day")
    //       .format("YYYY-MM-DD");
    //   };
    //   const [dateROH, setDateROH] = useState<string>();
    //   useEffect(() => {
    //     if (watchKategori !== "ROH") {
    //       setDateROH(undefined);
    //       return;
    //     }
    
    //     const rohDate = getDateROH();
    //     setDateROH(rohDate);
    
    //     const fields = ["tanggal", "periode_awal", "periode_akhir"] as const;
    
    //     fields.forEach((field) => {
    //       const value = watch(field);
    
    //       // apapun isinya → paksa ke besok
    //       if (value !== rohDate) {
    //         setValue(field, rohDate);
    //         handleInputChange(field, rohDate);
    //       }
    //     });
    //   }, [watchKategori]);
    
    //   //////////////////////////////ROH
    //   //////////////////////////////EMERGENCY
    //   const getDateEMERGENCY = () => {
    //     return moment()
    //       .startOf("day")
    //       .format("YYYY-MM-DD");
    //   };
    //   const [dateEmergency, setDateEmergency] = useState<string>();
    //   useEffect(() => {
    //     if (watchKategori !== "EMERGENCY") {
    //       setDateEmergency(undefined);
    //       return;
    //     }
    
    //     const emergencyDate = getDateEMERGENCY();
    //     setDateEmergency(emergencyDate);
    
    //     const fields = ["tanggal", "periode_awal", "periode_akhir"] as const;
    
    //     fields.forEach((field) => {
    //       const value = watch(field);
    
    //       // apapun isinya → paksa ke hari ini
    //       if (value !== emergencyDate) {
    //         setValue(field, emergencyDate);
    //         handleInputChange(field, emergencyDate);
    //       }
    //     });
    //   }, [watchKategori]);
    
    //   //////////////////////////////EMERGENCY
    
  const handleInputChange = (field: string, value: any) => {
    setFormModel((prevState: any) => {
      const newFormModel = { ...prevState, [field]: value };
      return newFormModel;
    });
  };

  const id_gardu = useWatch({ control, name: "id_gardu" });
  //////////////////////jumlah gardu padam
    const [jumlahGarduPadam, setJumlahGarduPadam] = useState<number>(0);
    useEffect(() => {
      if (!id_gardu) {
        setJumlahGarduPadam(0);
        setValue("jumlah_gardu_padam", 0); // optional kalau mau dikirim ke backend
        return;
      }
  
      const count =
        typeof id_gardu === "string"
          ? id_gardu.split(",").filter(Boolean).length
          : 0;
  
      setJumlahGarduPadam(count);
      setValue("jumlah_gardu_padam", count); // optional
    }, [id_gardu]);
  //////////////////////jumlah gardu padam
  const [alamatGardu, setAlamatGardu] = useState<{ id: string; alamat: string; pelanggan: number }[]>([]);
  // const fetchedGarduRef = useRef<Set<string>>(new Set());

  const fetchAlamatSingleGardu = async (garduId: string) => {
    try {
      const req: any = await getAllByPath(
        `${API_PATH().master.jaringan.ref_lokasi}/${garduId}`,
        {},
        source.token
      );

      let alamat = req?.results?.alamat ?? "";
      let pelanggan = req?.results?.jumlah_pelanggan ?? 0;
      alamat = alamat.replace(/^\[/, "").replace(/\]$/, "").replace(/'/g, "").trim();

      return { id: garduId, alamat, pelanggan: Number(pelanggan) };
    } catch (err) {
      console.error("❌ Error fetch gardu:", garduId, err);
      return { id: garduId, alamat: "", pelanggan: 0 };
    }
  };

  useEffect(() => {
    if (!id_gardu) {
      setAlamatGardu([]);
      setValue("wilayah_padam", "");
      handleInputChange("wilayah_padam", "");
      setValue("jml_pelanggan", 0);
      handleInputChange("jml_pelanggan", 0);
      return;
    }

    const ids: string[] = typeof id_gardu === "string" ? id_gardu.split(",") : [id_gardu];

    const fetchAll = async () => {
      const results = await Promise.all(ids.map((id: string) => fetchAlamatSingleGardu(id)));
      // langsung replace state dengan hasil fetch terakhir
      setAlamatGardu(results);
    };

    fetchAll();
  }, [id_gardu]);


  // Update form field alamat dan total pelanggan
  useEffect(() => {
    if (alamatGardu.length === 0) {
      setValue("wilayah_padam", "");
      handleInputChange("wilayah_padam", "");
      setValue("jml_pelanggan", 0);
      handleInputChange("jml_pelanggan", 0);
      return;
    }

    const combinedAlamat = alamatGardu.map((g) => g.alamat).join(", ");
    const totalPelanggan = alamatGardu.reduce((sum, g) => sum + g.pelanggan, 0);

    setValue("wilayah_padam", combinedAlamat);
    handleInputChange("wilayah_padam", combinedAlamat);
    setValue("jml_pelanggan", totalPelanggan);
    handleInputChange("jml_pelanggan", totalPelanggan);
  }, [alamatGardu]);

  /** Handle Form Submission */
  const onSubmitForm = (data: IJadwalPemerliharaan) => {

    // const currentDate = new Date(); // Ambil tanggal dan waktu saat ini
    // const formatDateTime = (date: Date) => {
    //   const year = date.getFullYear();
    //   const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Tambahkan 0 di depan jika perlu
    //   const day = date.getDate().toString().padStart(2, '0');
    //   const hours = date.getHours().toString().padStart(2, '0');
    //   const minutes = date.getMinutes().toString().padStart(2, '0');
    //   const seconds = date.getSeconds().toString().padStart(2, '0');
    //   return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
    // };
    const params = {
      ...data,
      id_gardu: !data.id_gardu || data.id_gardu === "-" ? null : data.id_gardu,
      jam_pekerjaan: `${data.jam1}-${data.jam2}`,
      butuh_padam: data.butuh_padam === 'true' ? 1 : 0,
      // status_pekerjaan: type,
      status_pekerjaan: data.status_pekerjaan,
      approvel_area: data.approvel_area,
      tanggal_posting: data.tanggal_posting,
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
  const watchGarduInduk = useWatch({ control, name: "id_gardu_induk" });
  const watchPenyulang = useWatch({ control, name: "id_penyulang" });
  const watchPadam = useWatch({ control, name: 'butuh_padam' });
  // const watchPengawas = useWatch({ control, name: "id" });

  // console.log(watchPengawas);

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

  // 1️⃣ Saat data edit datang
  useEffect(() => {
    if (dataSelected) {
      initForm(dataSelected);
      setValue("id_gardu", dataSelected.id_gardu);
    }
  }, [dataSelected]);

  // 2️⃣ Setelah penyulang muncul, pastikan gardu muncul juga
  useEffect(() => {
    if (watchPenyulang && dataSelected?.id_gardu && dataSelected?.nama_gardu) {
      const formattedValue = dataSelected.id_gardu;
      setValue("id_gardu", formattedValue);
    }
  }, [watchPenyulang, dataSelected, setValue]);

  /////////////////////////COLORING KATEGORI
      const kategoriBgMap: Record<string, string> = {
        ROT: "#0095ff",        // biru muda
        ROB: "#00ff15",        // hijau muda
        ROM: "#ffc400",        // kuning muda
        ROH: "#6600ff",        // ungu muda
        EMERGENCY: "#ff0026",  // merah muda
      };
    
      const kategoriBgColor =
      watchKategori && kategoriBgMap[watchKategori]
        ? kategoriBgMap[watchKategori]
        : "#212529";
      /////////////////////////COLORING KATEGORI
      /////////////////////////KUNCIAN JENIS JADWAL
      const KATEGORI_JADWAL_MAP: Record<
        string,
        { allowed: string[]; force?: string }
      > = {
        ROT: { allowed: ["TERENCANA"], force: "TERENCANA" },
        ROB: { allowed: ["TERENCANA"], force: "TERENCANA" },
    
        ROM: { allowed: ["SUSULAN"], force: "SUSULAN" },
        ROH: { allowed: ["SUSULAN"], force: "SUSULAN" },
    
        EMERGENCY: { allowed: ["SIAGA", "KOREKTIF"] },
      };
    
      const jadwalOptions = React.useMemo(() => {
        if (!watchKategori) return JADWAL();
    
        const config = KATEGORI_JADWAL_MAP[watchKategori];
        if (!config) return JADWAL();
    
        return JADWAL().filter((opt) =>
          config.allowed.includes(opt.value)
        );
      }, [watchKategori]);
      const isJadwalLocked = React.useMemo(() => {
      const config = KATEGORI_JADWAL_MAP[watchKategori];
      return !!config?.force;
    }, [watchKategori]);
    
    useEffect(() => {
      if (!watchKategori) return;
    
      const config = KATEGORI_JADWAL_MAP[watchKategori];
      if (!config) return;
    
      // 🔒 Kalau ada force → set otomatis
      if (config.force) {
        setValue("jenis_jadwal", config.force);
        handleInputChange("jenis_jadwal", config.force);
      }
    }, [watchKategori]);
    
      /////////////////////////KUNCIAN JENIS JADWAL

  return (
    <>

      {isAlreadyApproved === 1 ? (
        <Alert variant="danger" className="text-center mb-4">
          <p>Data yang sudah di Approve tidak bisa di Edit</p>
        </Alert>
      ) : (

        isAlreadyApproved === 0 && (
          <FormData
            setError={setError}
            setValue={setValue}
            dataParams={dataParams}
            fields={JadwalPemerliharaanFeild}
            path={API_PATH().opsisdis.jadwal_pemeliharaan.har_rotbmh}
            onLoading={setLoading}
            customLabel={'hide'}
            ids={'ids'}
            isModal
          // link='/opsisdis/jadwal-pemeliharaan/usulan-jadwal-har'

          // overrideType={{ tgl_upload: 'datetime' }}
          >
            <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>

              <Row>
                <Col md={6}>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label 
                    className="col-md-4 col-form-label"
                    style={{
                      color: kategoriBgColor,
                      fontWeight: 600,
                      transition: "color 0.3s ease",
                    }}>
                      Kategori
                    </Form.Label>
                    <Col md={8}
                    style={{
                      backgroundColor: kategoriBgColor,
                      borderRadius: "6px",
                      padding: "6px",
                      transition: "background-color 0.3s ease",
                    }}
                    >
                    <SelectFormStaticNewOnchange
                      control={control}
                      errors={errors}
                      fieldName={"kategori_rotbmh"}
                      options={KATEGORI_ROTBMH()}
                      // disabled={isReadOnly}
                      disabled={true}
                      onChange={(value) =>
                        handleInputChange("kategori_rotbmh", value)
                      } // Save data on selection change
                    />
                  </Col>
                </Form.Group>
                  {/* <Form.Group as={Row} className='mb-3'>
                    <Form.Label className="col-md-4 col-form-label">
                      Tanggal Usulan <RequiredInfo />
                    </Form.Label>
                    <Col md={8}>
                      <InputDate fieldName='tanggal' errors={errors} register={register} />
                    </Col>
                  </Form.Group> */}
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label className="col-md-4 col-form-label">
                      Tanggal Usulan
                    </Form.Label>
                    <Col md={8}>
                      <InputDateNew
                        errors={errors}
                        register={register}
                        type="date"
                        fieldName="tanggal"
                        step={1}
                        // min={
                        //   watchKategori === "ROT"
                        //     ? minDateROT
                        //     : watchKategori === "ROB"
                        //     ? minDateROB
                        //     : watchKategori === "ROM"
                        //     ? minDateROM
                        //     : watchKategori === "ROH"
                        //     ? dateROH
                        //     : watchKategori === "EMERGENCY"
                        //     ? dateEmergency
                        //     : undefined
                        // }
                        // max={
                        //   watchKategori === "ROM"
                        //     ? maxDateROM
                        //     : watchKategori === "ROH"
                        //     ? dateROH
                        //     : watchKategori === "EMERGENCY"
                        //     ? dateEmergency
                        //     : undefined
                        // }
                        disabled={true}
                        onChange={(e) =>
                          handleInputChange("tanggal", e.target.value)
                        } // Save data on input change
                        
                      />
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
                      ></SelectAsyncDynamic>
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
                          labelField={'nama_lokasi'}
                          valueField={'id_ref_lokasi'}
                          pathServiceName={'master.jaringan.ref_lokasi'}
                          queryParams={{
                            id_ref_jenis_lokasi_in: `${JENIS_LOKASI().penyulang},${JENIS_LOKASI().trafo_gi}`,
                            page: 1,
                            limit: 100,
                          }}
                          setValue={setValue}
                          isDisabled={!watchGarduInduk}
                          watchParent={watchGarduInduk}
                        // options={dataSelected?.penyulang}
                        ></SelectAsyncDynamic>
                      </Col>
                    </Form.Group>
                  }
                  {dataSelected && watchPenyulang && (
                    <Form.Group as={Row} className="mb-2">
                      <Form.Label className="col-md-4 col-form-label">
                        Gardu
                      </Form.Label>
                      <Col md={8}>
                        <SelectAsyncDynamicNewOnchangeGardu
                          fieldName="id_gardu"
                          fieldNameParent="id_penyulang"
                          control={control}
                          errors={errors}
                          labelField={"nama_lokasi"}
                          valueField={"id_ref_lokasi"}
                          pathServiceName={"master.jaringan.ref_lokasi"}
                          queryParams={{
                            id_ref_jenis_lokasi: JENIS_LOKASI().gardu_distribusi,
                            page: -1,
                            limit: -1,
                          }}
                          isMulti={true}
                          onChange={(joinedString) => {
                            handleInputChange("id_gardu", joinedString);
                            setValue("id_gardu", joinedString);
                          }}
                          setValue={setValue}
                          isDisabled={!watchPenyulang}
                          watchParent={watchPenyulang}
                          options={
                            dataSelected?.id_gardu && dataSelected?.nama_gardu
                              ? dataSelected.id_gardu.split(",").map((id: string, index: number) => ({
                                value: id.trim(),
                                label: dataSelected.nama_gardu.split(",")[index]?.trim(),
                              }))
                              : []
                          }

                        />
                        {jumlahGarduPadam > 0 && (
                          <small className="text-muted mt-1 d-block">
                            Jumlah Gardu Padam: <strong>{jumlahGarduPadam}</strong>
                          </small>
                        )}
                      </Col>
                    </Form.Group>
                  )}
                  <Form.Group as={Row} className='mb-3'>
                    <Form.Label className="col-md-4 col-form-label">
                      UP3  <RequiredInfo />
                    </Form.Label>
                    <Col md={8}>
                      <SelectAsyncDynamic
                        fieldName="id_area"
                        // fieldNameParent="id_penyulang"
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
                        // isDisabled={!watchPenyulang}
                        // watchParent={watchPenyulang}
                        options={dataSelected?.up3}
                      ></SelectAsyncDynamic>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className='mb-3'>
                    <Form.Label className="col-md-4 col-form-label">
                      Dibutuhkan Padam <RequiredInfo />
                    </Form.Label>
                    <Col md={6} className="d-flex align-items-center">
                      <Form.Check
                        type="switch"
                        id="butuh_padam"
                        {...register("butuh_padam")}
                        label={watchPadam ? "Ya" : "Tidak"}
                        className="ms-4" // Menambahkan margin kiri
                      />
                    </Col>
                  </Form.Group>


                  <FormInputControlColumn
                    labelName="JTM"
                    required={false}
                    placeholder="JTM"
                    isInvalid={errors?.jtm as boolean | undefined}
                    message={errors?.jtm?.message}
                    register={register('jtm')}
                    className='mb-3'
                    rows={4}
                    as={'textarea'}
                  />
                <Form.Group as={Row} className="mb-3">
                  <Form.Label className="col-md-4 col-form-label">
                    Posko
                  </Form.Label>
                  <Col md={8}>
                    <SelectAsyncDynamicNewOnchange
                      fieldName="id_posko"
                      // fieldNameParent="id_penyulang"
                      control={control}
                      errors={errors}
                      labelField={"nama"}
                      valueField={"id"}
                      isDisabled={isReadOnly}
                      pathServiceName={"master.siopak.master_posko"}
                      queryParams={{
                        // id_ref_jenis_lokasi: JENIS_LOKASI().up3,
                        page: 1,
                        limit: 30,
                      }}
                      onChange={(value) => handleInputChange("id_posko", value)} // Save data on selection change
                      setValue={setValue}
                      // isDisabled={!watchPenyulang}
                      // watchParent={watchPenyulang}
                    ></SelectAsyncDynamicNewOnchange>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label className="col-md-4 col-form-label">
                    Pemilik Pekerjaan
                  </Form.Label>
                  <Col md={8}>
                    <SelectAsyncDynamicNewOnchange
                      fieldName="id_pemilik_pekerjaan"
                      // fieldNameParent="id_penyulang"
                      control={control}
                      errors={errors}
                      labelField={"nama"}
                      valueField={"id"}
                      pathServiceName={"master.siopak.master_pemilik_pekerjaan"}
                      queryParams={{
                        // id_ref_jenis_lokasi: JENIS_LOKASI().up3,
                        page: 1,
                        limit: 30,
                      }}
                      onChange={(value) => handleInputChange("id_pemilik_pekerjaan", value)} // Save data on selection change
                      setValue={setValue}
                      isDisabled={isReadOnly}
                      // isDisabled={!watchPenyulang}
                      // watchParent={watchPenyulang}
                    ></SelectAsyncDynamicNewOnchange>
                  </Col>
                </Form.Group>
                </Col>
                <Col md={6}>
                <br></br>
                <br></br>
                <br></br>
                  {/* <Form.Group as={Row} className='mb-3'>
                    <Form.Label className="col-md-4 col-form-label">
                      Jadwal <RequiredInfo />
                    </Form.Label>
                    <Col md={8}>
                      <SelectFormStatic
                        control={control}
                        errors={errors}
                        fieldName={'jenis_jadwal'}
                        options={JADWAL()}
                      />
                    </Col>
                  </Form.Group> */}
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label className="col-md-4 col-form-label">
                      Jadwal
                    </Form.Label>
                    <Col md={8}>
                      <SelectFormStaticNewOnchange
                        control={control}
                        errors={errors}
                        fieldName={"jenis_jadwal"}
                        // options={JADWAL()}
                        options={jadwalOptions}
                        disabled={isReadOnly || isJadwalLocked}   // 🔒 INI KUNCIANNYA
                        // disabled={isReadOnly}
                        onChange={(value) =>
                          handleInputChange("jenis_jadwal", value)
                        } // Save data on selection change
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} className='mb-3'>
                    <Form.Label className="col-md-4 col-form-label">
                      Pengawas
                    </Form.Label>
                    <Col md={8}>
                      <Form.Control
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
                      {/* { selectedVendor === 1 || (selectedVendor === null && selectedYantek === null && selectedPelaksana != null) && (
                        <Form.Control
                          {...register("id_pelaksana")}
                          isInvalid={errors?.id_pelaksana as boolean | undefined}
                          onChange={(e) =>
                            handleInputChange("id_pelaksana", e.target.value)
                          }
                        />
                      )}
                      { selectedYantek === 1 && (
                        <SelectFormStaticNewOnchange
                          control={control}
                          errors={errors}
                          fieldName={"id_pelaksana"}
                          options={OPTION_PELAKSANA}
                          onChange={(value) => handleInputChange("id_pelaksana", value)}
                        ></SelectFormStaticNewOnchange>
                      )} */}
                      {(isVendor || (!isVendor && !isYantek && isEditMode)) && (
                        <Form.Control
                          {...register("id_pelaksana")}
                          isInvalid={errors?.id_pelaksana as boolean | undefined}
                          onChange={(e) =>
                            handleInputChange("id_pelaksana", e.target.value)
                          }
                        />
                      )}
    
                      {isYantek && (
                        <SelectFormStaticNewOnchange
                          control={control}
                          errors={errors}
                          fieldName={"id_pelaksana"}
                          options={OPTION_PELAKSANA}
                          onChange={(value) => handleInputChange("id_pelaksana", value)}
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
                        control={control}
                        errors={errors}
                        fieldName={'wilayah'}
                        options={OPTION_WILAYAH}
                      ></SelectFormStatic>
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} className="mb-3">
                    <Form.Label className="col-md-4 col-form-label">
                      Jenis Pekerjaan <RequiredInfo />
                    </Form.Label>
                    <Col md={8}>
                      <SelectAsyncDynamicNewOnchangeJenisPekerjaan
                        fieldName="sifat_pekerjaan"
                        // fieldNameParent="id_penyulang"
                        control={control}
                        errors={errors}
                        labelField={"name"}
                        valueField={"id_ref_jenis_pekerjaan"}
                        pathServiceName={"master.opsisdis.jenis_pekerjaan"}
                        queryParams={{
                          // id_ref_jenis_lokasi: JENIS_LOKASI().up3,
                          page: 1,
                          limit: 30,
                        }}
                        isMulti={true}
                        onChange={(value) => handleInputChange("sifat_pekerjaan", value)} // Save data on selection change
                        setValue={setValue}
                        // isDisabled={!watchPenyulang}
                        // watchParent={watchPenyulang}
                        options={dataSelected?.sifat_pekerjaan}
                      ></SelectAsyncDynamicNewOnchangeJenisPekerjaan>
                    </Col>
                  </Form.Group>


                  <FormInputControlColumn
                    labelName="Wilayah Padam"
                    required={false}
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
                    placeholder="Keterangan"
                    isInvalid={errors?.keterangan as boolean | undefined}
                    message={errors?.keterangan?.message}
                    register={register('keterangan')}
                    className='mb-3'
                    as='textarea'
                    rows="4"

                  />
                <Form.Group as={Row} className="mb-3">
                  <Form.Label className="col-md-4 col-form-label">
                    Sifat Pekerjaan <RequiredInfo />
                  </Form.Label>
                  <Col md={8}>
                    <SelectFormStaticNewOnchange
                      control={control}
                      errors={errors}
                      fieldName={"sifat_pekerjaan_2"}
                      options={SIFAT_PEKERJAAN_2()}
                      onChange={(value) =>
                        handleInputChange("sifat_pekerjaan_2", value)
                      } // Save data on selection change
                      disabled={isReadOnly}
                    />
                  </Col>
                </Form.Group>
                <FormInputControlColumn
                    labelName="Keterangan Detail Jenis Pekerjaan"
                    required={false}
                    placeholder="Keterangan Detail Jenis Pekerjaan"
                    isInvalid={errors?.keterangan_detail_jenis_pekerjaan as boolean | undefined}
                    message={errors?.keterangan_detail_jenis_pekerjaan?.message}
                    register={register('keterangan_detail_jenis_pekerjaan')}
                    className='mb-3'
                    as='textarea'
                    rows="4"

                  />
                </Col>
              </Row>

              <br></br>     
              <br></br>
              <br></br>        
              <Modal.Footer>
                <div className='d-flex gap-2'>
                  <ButtonCancel ids='ids' type="modal" onClick={handleClose} />
                  <Button type='submit' variant='primary' disabled={loading}>
                    Simpan
                  </Button>
                </div>
              </Modal.Footer>
            </Form>
          </FormData>
        )
      )}
    </>
  );
}

export default UsulanJadwalHarFormPage