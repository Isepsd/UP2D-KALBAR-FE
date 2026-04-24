import React, { useEffect, useState,useRef } from "react";
import { Col, Form, Modal, Row } from "react-bootstrap";

import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import ButtonCancel from "@app/components/Button/ButtonCancel";
import { API_PATH } from "@app/services/_path.service";
import Button from "@app/components/Button/Button";
// import RequiredInfo from '@app/components/Info/RequiredInfo';
import FormInputControlColumnNew from "@app/components/Input/FormInputControlColumnNew";
import InputDateNew from "@app/components/Date/InputDateNewMin";
import SelectAsyncDynamicNewOnchange from "@app/modules/SelectForm/SelectAsyncDynamicNewOnchange";
import SelectAsyncDynamicNewOnchangeGardu from "@app/modules/SelectForm/SelectAsyncDynamicNewOnchangeGardu";
import { JENIS_LOKASI } from "@app/configs/jenis-lokasi.config";
import SelectFormStaticNewOnchange from "@app/modules/SelectForm/SelectFormStaticNewOnchange";
import SelectAsyncDynamicNewOnchangeJenisPekerjaan from "@app/modules/SelectForm/SelectAsyncDynamicNewOnchangeJenisPekerjaan";
import {
  JADWAL,
  JENIS_PELAYANAN,
  KATEGORI_ROTBMH,
  SIFAT_PEKERJAAN_2,
  // JENIS_PEKERJAAN,
} from "@app/configs/select-options/jadwal_pemeliharaan_rotbmh.select";
import { timeFormSelect } from "@app/helper/time.helper";
// import { REGU_PETUGAS } from '@app/configs/regu-petugas';
import { getAllByPath, postByPath } from "@app/services/main.service";
import {
  IJadwalPemerliharaan,
  JadwalPemerliharaanFeild,
} from "@app/interface/opsisdis-jadwal-pemeliharaan-rotbmh.interface";
import FormDatajadwalPemeliharaan from "@app/modules/Form/FormDatajadwalPemeliharaan";
import moment from "moment";
import axios from "axios";
import ModalConfirmJadwal from "@app/components/Modals/ModalConfirmJadwal";
import { Controller } from "react-hook-form";
// import SelectFormStatic from "@app/modules/SelectForm/SelectFormStatic";
import RequiredInfo from '@app/components/Info/RequiredInfo';

const OPTION_WILAYAH = [
  { label: "BANTEN", value: "BANTEN" },
  { label: "TANGERANG", value: "TANGERANG" },
];



function UsulanJadwalHarFormPage({
  dataSelected,
  id_user_created,
  handleClose,
  // lastInputData,
}:

  any) {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();
  const [optionsTimes, setOptionsTimes] = useState<any>([]);
  const source = axios.CancelToken.source();
  const [showConfirm, setShowConfirm] = useState(false);
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
    id_gardu: Yup.string()
      .nullable()
      .optional(),
    respon_apd: Yup.string().nullable(),
    id_area: Yup.string().nullable(),
    id: Yup.string().nullable(),
    sifat_pekerjaan: Yup.string().required(),
    jenis_pelayanan: Yup.string().nullable(),
    status_pekerjaan: Yup.string().nullable(),
    butuh_padam: Yup.string()
      .nullable()
      .transform((_, v) => (v == "1" ? "1" : "0")),
    jam1: Yup.string().nullable(),
    jam2: Yup.string().nullable(),
    jam_buka: Yup.string().nullable(),
    jam_tutup: Yup.string().nullable(),
    jenis_jadwal: Yup.string().nullable(),
    id_pelaksana: Yup.string().required(),
    id_pengawas: Yup.string().nullable(),
    id_user_created: Yup.string().nullable(),
    periode_awal: Yup.string().nullable(),
    periode_akhir: Yup.string().nullable(),
    jml_pelanggan: Yup.string().nullable(),

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
    tanggal: moment().format("YYYY-MM-DD"), // Set current date using moment
    periode_awal: moment().format("YYYY-MM-DD"), // Set current date using moment
    periode_akhir: moment().format("YYYY-MM-DD"), // Set current date using moment
    jam1: "00:00", // Default Jam 1
    jam2: "00:00", // Default Jam 2
    id_user_created: "",
    ceklis_yantek: 0,
    ceklis_vendor: 0,
  });

  const { register, handleSubmit, setValue, setError, control, formState, watch } =
    useForm({
      resolver: yupResolver(validationSchema),
      defaultValues: formModel,
    });


  const { errors }: any = formState || {};
  const watchPadam = useWatch({ control, name: "butuh_padam" });
  const id_ref_lokasi = useWatch({ control, name: "id_penyulang" });
  const allValues = useWatch({ control });
  const watchKategori = useWatch({ control, name: "kategori_rotbmh" });
  const [lockedRanges, setLockedRanges] = useState<
    { start: string; end: string }[]
  >([]);
    ///////////////////////////////////CEKLIS YANTEK VENDOR
    const OPTION_PELAKSANA = [
      { label: "Yandal PLN ES", value: "Yandal PLN ES" },
      { label: "Yandal PT SAJ", value: "Yandal PT SAJ" },
      { label: "Harsus PLN ES", value: "Harsus PLN ES" },
      { label: "Harsus PT SAJ", value: "Harsus PT SAJ" },
    ];

    const selectedYantek = useWatch({ control, name: "ceklis_yantek" });
    const selectedVendor = useWatch({ control, name: "ceklis_vendor" });
    useEffect(() => {
      setValue("id_pelaksana", "");
    }, [selectedVendor, selectedYantek]);
    ///////////////////////////////////CEKLIS YANTEK VENDOR

  ///////////////////////////////ROT
  const getMinDateROT = () => {
    const now = moment();

    // Minggu ke-4 November (anggap mulai tgl 22)
    const novemberFourthWeek = moment()
      .year(now.year())
      .month(10) // November
      .date(22)
      .startOf("day");

    // Kalau SUDAH minggu ke-4 November → lock ke tahun +2
    const targetYear = now.isSameOrAfter(novemberFourthWeek, "day")
      ? now.year() + 2
      : now.year() + 1;

    return moment()
      .year(targetYear)
      .startOf("year") // 1 Januari
      .format("YYYY-MM-DD");
  };



  const [minDateROT, setMinDateROT] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (watchKategori !== "ROT") {
      setMinDateROT(undefined);
      return;
    }

    const minDate = getMinDateROT();
    setMinDateROT(minDate);

    const fields = ["tanggal", "periode_awal", "periode_akhir"] as const;

    fields.forEach((field) => {
      const value = watch(field);

      if (value && moment(value).isBefore(minDate, "day")) {
        setValue(field, minDate);
        handleInputChange(field, minDate);
      }
    });
  }, [watchKategori]);
  ///////////////////////////////ROT
  ///////////////////////////////ROB
  const getMinDateROB = () => {
    const now = moment();

    const daysInMonth = now.daysInMonth();

    // Mulai 3 hari terakhir bulan ini
    const lastThreeStart = moment()
      .year(now.year())
      .month(now.month())
      .date(daysInMonth - 2)
      .startOf("day");

    // Kalau sudah masuk 3 hari terakhir → lompat 2 bulan
    const addMonth = now.isSameOrAfter(lastThreeStart, "day") ? 2 : 1;

    return now
      .clone()
      .add(addMonth, "month")
      .startOf("month") // selalu tanggal 1
      .format("YYYY-MM-DD");
  };


  const [minDateROB, setMinDateROB] = useState<string | undefined>(undefined);
    useEffect(() => {
    if (watchKategori !== "ROB") {
      setMinDateROB(undefined);
      return;
    }

    const minDate = getMinDateROB();
    setMinDateROB(minDate);

    const fields = ["tanggal", "periode_awal", "periode_akhir"] as const;

    fields.forEach((field) => {
      const value = watch(field);

      if (value && moment(value).isBefore(minDate, "day")) {
        setValue(field, minDate);
        handleInputChange(field, minDate);
      }
    });
  }, [watchKategori]);
  ///////////////////////////////ROB
  //////////////////////////////ROM
    const getRangeDateROM = () => {
      const now = moment();
      const day = now.isoWeekday(); // 1=Senin ... 5=Jumat

      const thisMonday = now.clone().startOf("isoWeek");

      const weekOffset = day >= 5 ? 2 : 1;

      const targetMonday = thisMonday.clone().add(weekOffset, "weeks");

      return {
        min: targetMonday.format("YYYY-MM-DD"),
        max: targetMonday.clone().add(6, "days").format("YYYY-MM-DD"),
      };
    };

    const [minDateROM, setMinDateROM] = useState<string>();
    const [maxDateROM, setMaxDateROM] = useState<string>();
    useEffect(() => {
      if (watchKategori !== "ROM") {
        setMinDateROM(undefined);
        setMaxDateROM(undefined);
        return;
      }

      const { min, max } = getRangeDateROM();

      setMinDateROM(min);
      setMaxDateROM(max);

      const fields = ["tanggal", "periode_awal", "periode_akhir"] as const;

      fields.forEach((field) => {
        const value = watch(field);

        if (
          value &&
          (moment(value).isBefore(min, "day") ||
            moment(value).isAfter(max, "day"))
        ) {
          setValue(field, min);
          handleInputChange(field, min);
        }
      });
    }, [watchKategori]);
  
  //////////////////////////////ROM 
  //////////////////////////////ROH
  const getDateROH = () => {
    return moment()
      .add(1, "day")
      .startOf("day")
      .format("YYYY-MM-DD");
  };
  const [dateROH, setDateROH] = useState<string>();
  const isROHBlockedBySiaga = () => {
    const rohDate = getDateROH(); // besok (YYYY-MM-DD)

    return lockedRanges.some((range) =>
      moment(rohDate).isBetween(range.start, range.end, "day", "[]")
    );
  };

  useEffect(() => {
    if (watchKategori !== "ROH") {
      setDateROH(undefined);
      return;
    }

    const rohDate = getDateROH();
    setDateROH(rohDate);

    const fields = ["tanggal", "periode_awal", "periode_akhir"] as const;

    fields.forEach((field) => {
      const value = watch(field);

      // apapun isinya → paksa ke besok
      if (value !== rohDate) {
        setValue(field, rohDate);
        handleInputChange(field, rohDate);
      }
    });
  }, [watchKategori]);

  const kategoriOptions = KATEGORI_ROTBMH().map((opt) =>
    opt.value === "ROH"
      ? { ...opt, isDisabled: isROHBlockedBySiaga() }
      : opt
  );

  //////////////////////////////ROH
  //////////////////////////////EMERGENCY
  const getDateEMERGENCY = () => {
    return moment()
      .startOf("day")
      .format("YYYY-MM-DD");
  };
  const [dateEmergency, setDateEmergency] = useState<string>();
  useEffect(() => {
    if (watchKategori !== "EMERGENCY") {
      setDateEmergency(undefined);
      return;
    }

    const emergencyDate = getDateEMERGENCY();
    setDateEmergency(emergencyDate);

    const fields = ["tanggal", "periode_awal", "periode_akhir"] as const;

    fields.forEach((field) => {
      const value = watch(field);

      // apapun isinya → paksa ke hari ini
      if (value !== emergencyDate) {
        setValue(field, emergencyDate);
        handleInputChange(field, emergencyDate);
      }
    });
  }, [watchKategori]);

  //////////////////////////////EMERGENCY
  ///////////////////////////////MASA SIAGA
  useEffect(() => {
    const fetchMasaSiaga = async () => {
      try {
        const res: any = await getAllByPath(
          API_PATH().master.opsisdis.penyebab_gangguan,
          { page: 1, limit: 100 },
          source.token
        );

        const ranges =
          res?.results?.map((item: any) => ({
            start: item.tanggal_awal,
            end: item.tanggal_akhir,
          })) || [];

        setLockedRanges(ranges);
      } catch (err) {
        console.error("Gagal fetch masa siaga", err);
        setLockedRanges([]);
      }
    };

    fetchMasaSiaga();

    return () => {
      source.cancel();
    };
  }, []);

  const sanitizeDateByKategori = (date: string) => {
    let current = moment(date);

    // Emergency bebas
    if (watchKategori === "EMERGENCY") {
      return current.format("YYYY-MM-DD");
    }

    // 1️⃣ Validasi masa siaga
    lockedRanges.forEach((range) => {
      if (current.isBetween(range.start, range.end, "day", "[]")) {
        current = moment(range.end).add(1, "day");
      }
    });

    // 2️⃣ Validasi aturan kategori
    if (watchKategori === "ROT" && minDateROT) {
      if (current.isBefore(minDateROT, "day")) {
        current = moment(minDateROT);
      }
    }

    if (watchKategori === "ROB" && minDateROB) {
      if (current.isBefore(minDateROB, "day")) {
        current = moment(minDateROB);
      }
    }

    if (watchKategori === "ROM" && minDateROM && maxDateROM) {
      if (
        current.isBefore(minDateROM, "day") ||
        current.isAfter(maxDateROM, "day")
      ) {
        current = moment(minDateROM);
      }
    }

    if (watchKategori === "ROH" && dateROH) {
      current = moment(dateROH);
    }

    return current.format("YYYY-MM-DD");
  };

  const getFallbackDate = () => {
    // PRIORITAS:
    // 1. min kategori
    // 2. max kategori
    // 3. hari ini

    if (watchKategori === "ROT") return minDateROT;
    if (watchKategori === "ROB") return minDateROB;
    if (watchKategori === "ROM") return minDateROM;
    if (watchKategori === "ROH") return dateROH;
    if (watchKategori === "EMERGENCY") return dateEmergency;

    return moment().format("YYYY-MM-DD");
  };
  useEffect(() => {
    const current = lastDateRef.current ?? getFallbackDate();
    if (!current) return;

    const sanitized = sanitizeDateByKategori(current);

    // ⛔ STOP kalau tidak berubah
    if (sanitized === current) return;

    if (watchKategori !== "EMERGENCY") {
      alert("Tanggal disesuaikan dengan aturan kategori / masa siaga");
    }

    lastDateRef.current = sanitized;
    setValue("tanggal", sanitized, { shouldDirty: true });
    handleInputChange("tanggal", sanitized);

    setValue("periode_awal", sanitized, { shouldDirty: true });
    handleInputChange("periode_awal", sanitized);

    setValue("periode_akhir", sanitized, { shouldDirty: true });
    handleInputChange("periode_akhir", sanitized);
  }, [
    watchKategori,
    lockedRanges,
    minDateROT,
    minDateROB,
    minDateROM,
    maxDateROM,
    dateROH,
  ]);

const lastDateRef = useRef<string | null>(null);

  useEffect(() => {
    const base = lastDateRef.current ?? getFallbackDate();
    if (!base) return;

    const sanitized = sanitizeDateByKategori(base);

    if (sanitized === base) return; // ⛔ ini KUNCI

    if (watchKategori !== "EMERGENCY") {
      alert("Tanggal disesuaikan dengan aturan kategori / masa siaga");
    }

    lastDateRef.current = sanitized;
    setValue("tanggal", sanitized, { shouldDirty: true });
    handleInputChange("tanggal", sanitized);

    setValue("periode_awal", sanitized, { shouldDirty: true });
    handleInputChange("periode_awal", sanitized);

    setValue("periode_akhir", sanitized, { shouldDirty: true });
    handleInputChange("periode_akhir", sanitized);
  }, [
    watchKategori,
    lockedRanges,
    minDateROT,
    minDateROB,
    minDateROM,
    maxDateROM,
    dateROH,
  ]);

  ///////////////////////////////MASA SIAGA
  useEffect(() => {
    // console.log("💡 watch semua field:", allValues);
    // console.log("💡 watch id_gardu:", allValues.id_gardu);
  }, [allValues]);

  // console.log("wadidaw id na", id_ref_lokasi);

  const [namaPusat, setnamaPusat] = useState<any>();
  const [namaRegional, setnamaRegional] = useState<any>();
  const [namaPemilik, setnamaPemilik] = useState<any>();
  const [namaPengelola, setnamaPengelola] = useState<any>();

  const fetchNoWO = async () => {
    if (!id_ref_lokasi) {
      console.warn("id_ref_lokasi is undefined, skipping fetch.");
      return;
    }

    setLoading(true); // Set loading state sebelum fetch
    try {
      const req: any = await getAllByPath(
        `${API_PATH().master.jaringan.ref_lokasi}/${id_ref_lokasi}`,
        {},
        source.token
      );
      const results1 = req?.results.id_pusat ?? null;
      const results2 = req?.results.id_regional ?? null;
      const results3 = req?.results.id_pemilik ?? null;
      const results4 = req?.results.id_pengelola ?? null;

      setnamaPusat(results1);
      setnamaRegional(results2);
      setnamaPemilik(results3);
      setnamaPengelola(results4);
    } catch (error) {
      console.error("Error fetching no_wo:", error);
      setnamaPusat(null);
      setnamaRegional(null);
      setnamaPemilik(null);
      setnamaPengelola(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNoWO();
  }, [id_ref_lokasi]);

  // --------------------------------------------------------------------------------------------------------------AMBIL ALAMAT SAMA JUMLAH PELANGGAN

  const id_gardu = useWatch({ control, name: "id_gardu" });
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
      let nama_lokasi = req?.results?.nama_lokasi ?? "";
      nama_lokasi = nama_lokasi.replace(/^\[/, "").replace(/\]$/, "").replace(/'/g, "").trim();
      return { id: garduId, alamat,nama_lokasi, pelanggan: Number(pelanggan) };
    } catch (err) {
      console.error("❌ Error fetch gardu:", garduId, err);
      return { id: garduId, alamat: "", nama_lokasi: "", pelanggan: 0 };
    }
  };

  useEffect(() => {
    if (!id_gardu) {
      setAlamatGardu([]);
      setValue("wilayah_padam", "");
      handleInputChange("wilayah_padam", "");
      setValue("jml_pelanggan", 0);
      handleInputChange("jml_pelanggan", 0);
      setValue("jtm", "");
      handleInputChange("jtm", "");
      return;
    }

    const ids: string[] = typeof id_gardu === "string" ? id_gardu.split(",") : [id_gardu];

    const fetchAll = async () => {
      const results = await Promise.all(ids.map((id: string) => fetchAlamatSingleGardu(id)));
      // langsung replace state dengan hasil fetch terakhir
      setAlamatGardu(results);
      setNamaGardu(results);
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

  // -------------------------------------------------------------------------------------------------------------- TUTUP AMBIL ALAMAT SAMA JUMLAH PELANGGAN

  useEffect(() => {
    const savedData = localStorage.getItem("formData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setFormModel(parsedData); // Update state, jangan langsung setValue
      // console.log("📦 Data form ditemukan di localStorage:", parsedData);
    }
  }, []);

  useEffect(() => {
    if (formModel) {
      // console.log("🧠 formModel berubah, menerapkan ke form:", formModel);
      Object.keys(formModel).forEach((key) => {
        setValue(key, formModel[key]);
      });
    }
  }, [formModel, setValue]);

  // Menyimpan data ke localStorage setiap kali ada perubahan pada formModel
  useEffect(() => {
    if (formModel) {
      // console.log("💾 Menyimpan formModel ke localStorage:", formModel);
      localStorage.setItem("formData", JSON.stringify(formModel));
    }
  }, [formModel]);

  const handleInputChange = (field: string, value: any) => {
    setFormModel((prevState: any) => {
      const newFormModel = { ...prevState, [field]: value };
      return newFormModel;
    });
  };


  const onSubmitForm = (data: IJadwalPemerliharaan) => {
    // Memeriksa dan mengisi nilai default untuk bidang yang perlu diisi
    const filledData = {
      ...data,
      jtm: data.jtm || "-",
      id_gardu: !data.id_gardu || data.id_gardu === "-" ? null : data.id_gardu,
      id_gardu_induk: data.id_gardu_induk || null,
      id_penyulang: data.id_penyulang || null,
      id_pengawas: data.id_pengawas || "-",
      id_pusat: namaPusat,
      id_regional: namaRegional,
      id_pemilik: namaPemilik,
      id_pengelola: namaPengelola,
      wilayah: data.wilayah || "-",
      wilayah_padam: data.wilayah_padam || "-",
      jenis_pelayanan: data.jenis_pelayanan || "-",
      keterangan: data.keterangan || "-",
      respon_apd: data.respon_apd || "-",
      jenis_jadwal: data.jenis_jadwal || "-",
      jml_pelanggan: data.jml_pelanggan || "0",
      jam_pekerjaan: `${data.jam1}-${data.jam2}`, // Misalnya ini diisi secara terpisah
      status_pekerjaan: data.status_pekerjaan,
      approvel_area: data.approvel_area,
      approvel_apd: data.approvel_apd,
      approvel_uid: data.approvel_uid,
      id_user_created: id_user_created.id_inputer,
      inputer: id_user_created.fullname,
      tanggal: data.tanggal,
      periode_awal: data.periode_awal,
      periode_akhir: data.periode_akhir,
      saidi: data.saidi,
      saifi: data.saifi,
      jumlah_gardu_padam: jumlahGarduPadam,
      ceklis_yantek: data.ceklis_yantek,
      ceklis_vendor: data.ceklis_vendor,
    };

    // Mengatur data parameter untuk digunakan atau dikirimkan ke API
    setDataParams(filledData);

    handleClose(); // Menutup modal formulir atau melakukan tindakan lebih lanjut.
  };

  useEffect(() => {
    // let times = timeFormSelect(96, 15)
    let times = timeFormSelect(48, 30);
    setOptionsTimes(times);
  }, []);


  const watchGarduInduk = useWatch({ control, name: "id_gardu_induk" });
  const watchPenyulang = useWatch({ control, name: "id_penyulang" });
  // const watchPengawas = useWatch({ control, name: "id" });
  const jtmValue = useWatch({ control, name: "jtm" });
  const JenisPekerjaan = useWatch({ control, name: "sifat_pekerjaan" });
  const WilayahPadam = useWatch({ control, name: "wilayah_padam" });
  const Keterangan = useWatch({ control, name: "keterangan" });
  const penyulangReady = useWatch({ control, name: "id_penyulang" }) || dataSelected?.id_penyulang;
  const [garduInitialized, setGarduInitialized] = useState(false);

  useEffect(() => {
    if (dataSelected && penyulangReady && !garduInitialized) {
      if (dataSelected.id_penyulang) {
        setValue('id_penyulang', dataSelected.id_penyulang);
      }

      if (dataSelected.id_gardu && dataSelected.nama_gardu) {
        const idGarduArr: string[] = dataSelected.id_gardu.split(',');
        const namaGarduArr: string[] = dataSelected.nama_gardu.split(',');

        const values = idGarduArr.map((v: string, i: number) => ({
          value: v.replace(/-/g, ''),
          label: namaGarduArr[i]?.trim() || v,
        }));

        // console.log("💡 normalized id_gardu dengan label:", values);

        // Simpan sesuai kebutuhan komponen Select
        setValue('id_gardu', values.map(v => v.value).join(','));
      }

      setGarduInitialized(true);
    }
  }, [dataSelected, penyulangReady, setValue, garduInitialized]);

  // -------------------------------------------------------------------------------------------------- CEK ESTIMASI

  const watchAll = watch();

  useEffect(() => {
    const {
      id_area,
      periode_awal,
      periode_akhir,
      jam1,
      jam2,
      jml_pelanggan,
    } = watchAll;

    const isReady =
      id_area && periode_awal && periode_akhir && jam1 && jam2 && jml_pelanggan;

    // ✅ kalau salah satu field kosong → reset SAIDI SAIFI
    // ✅ kalau salah satu field kosong → reset SAIDI/SAIFI tapi jangan hapus data lain
    if (!isReady) {
      // console.log("⚠️ Field belum lengkap → reset SAIDI & SAIFI ke 0");
      setFormModel((prev: any) => ({
        ...prev,
        saifi: 0,
        saidi: 0,
      }));
      return;
    }


    const fetchEstimasi = async () => {
      setLoading(true);

      try {
        console.log("📦 Data dikirim ke API cek-estimasi:");
        console.log({
          id_area,
          periode_awal,
          periode_akhir,
          jam1,
          jam2,
          jml_pelanggan,
        });

        const res: any = await postByPath(
          API_PATH().opsisdis.jadwal_pemeliharaan.cek_estimasi,
          {
            id_area,
            periode_awal,
            periode_akhir,
            jam1,
            jam2,
            jml_pelanggan,
          },
          source.token
        );

        const payload = res;

        // ✅ merge hasil estimasi ke formModel (tidak replace total)
        setFormModel((prev: any) => ({
          ...prev,
          ...payload,
        }));
        setShowConfirm(false);
      } catch (err: any) {
        if (axios.isCancel(err)) {
          console.log("⛔ Request dibatalkan");
        } else {
          console.error("❌ ERROR cek-estimasi:", err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEstimasi();

    return () => source.cancel("Request dibatalkan karena field berubah");
  }, [
    watchAll.id_area,
    watchAll.periode_awal,
    watchAll.periode_akhir,
    watchAll.jam1,
    watchAll.jam2,
    watchAll.jml_pelanggan,
  ]);


  // -------------------------------------------------------------------------------------------------- TUTUP CEK ESTIMASI

  const [isWilayahPadamOverLimit, setIsWilayahPadamOverLimit] = useState(false);
  const [isKeteranganOverLimit, setIsKeteranganOverLimit] = useState(false);
  const [isJtmOverLimit, setIsJtmOverLimit] = useState(false);
  // const [isSifatPekerjaanOverLimit, setIsSifatPekerjaanOverLimit] =
  useState(false);

  useEffect(() => {
    setIsJtmOverLimit((jtmValue?.length || 0) > 250);
    // setIsSifatPekerjaanOverLimit((JenisPekerjaan?.length || 0) > 250);
    setIsWilayahPadamOverLimit((WilayahPadam?.length || 0) > 250);
    setIsKeteranganOverLimit((Keterangan?.length || 0) > 250);
  }, [jtmValue, JenisPekerjaan, WilayahPadam, Keterangan]);

  // console.log(watchPengawas);

  const initForm = (data: any) => {
    Object.keys(JadwalPemerliharaanFeild).map((field: any) => {
      switch (field) {
        case "jam_pekerjaan":
          if (data[field]) {
            let time = data[field].split(" - ");
            setValue("jam1", time[0]);
            setValue("jam2", time[1]);
          } else {
            setValue("jam1", "");
            setValue("jam2", "");
          }
          break;
        case "keterangan":
        case "jenis_jadwal":
        case "jenis_pelayanan":
        case "butuh_padam":
        case "wilayah_padam":
        case "wilayah":
        case "jtm":
        // case 'tanggal':
        case "id_pelaksana":
        case "id_pengawas":
        case "id_gardu_induk":
        case "id_penyulang":
        case "id_gardu":
        case "id_area":
        case "sifat_pekerjaan":
        case "jam1":
        case "jam2":
          // case 'id_og':
          // case 'id_ref_jenis_pekerjaan':

          setValue(field, data[field]);
          break;
        default:
          break;
      }
    });
  };

  useEffect(() => {
    if (dataSelected) {
      // console.log("🧩 dataSelected terdeteksi berubah:", dataSelected);
      initForm(dataSelected);
      // console.log("⚠️ dataSelected kosong atau undefined");
    }
  }, [dataSelected]);
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
  /////////////////////////NGE SET GARDU KE JTM
  const [namaGarduDipilih, setNamaGarduDipilih] = useState<string[]>([]);
  const [namaGardu, setNamaGardu] = useState<{ id: string; nama_lokasi: string; pelanggan: number }[]>([]);
  // console.log('butuh_padam : ',watchPadam);
  useEffect(() => {
    if (namaGardu.length === 0) {
      setNamaGarduDipilih([]);
      return;
    }

    const names = namaGardu
      .map((g) => g.nama_lokasi)
      .filter(Boolean);

    setNamaGarduDipilih(names);
  }, [namaGardu]);

  useEffect(() => {
    // hanya jalan kalau butuh padam = 1
    // if (watchPadam !== 1) return;
    if (watchPadam !== true) return;
    if (watchPadam === true && namaGarduDipilih.length === 0) return;

    // kalau belum ada gardu → kosongkan
    if (namaGarduDipilih.length === 0) {
      setValue("jtm", "");
      handleInputChange("jtm", "");
      return;
    }

    const jtmText = namaGarduDipilih.join(", ");

    setValue("jtm", jtmText);
    handleInputChange("jtm", jtmText);
  }, [watchPadam,namaGarduDipilih]);

  /////////////////////////NGE SET GARDU KE JTM
  return (
    <>
      <FormDatajadwalPemeliharaan
        setError={setError}
        setValue={setValue}
        dataParams={dataParams}
        fields={JadwalPemerliharaanFeild}
        path={API_PATH().opsisdis.jadwal_pemeliharaan.har_rotbmh}
        onLoading={setLoading}
        customLabel={"hide"}
        ids={"ids"}
        isModal
      // link='/opsisdis/jadwal-pemeliharaan/usulan-jadwal-har'

      // overrideType={{ tgl_upload: 'datetime' }}
      >
        <Form id="formUsulan" noValidate onSubmit={handleSubmit(onSubmitForm)}>
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
                    // options={KATEGORI_ROTBMH()}
                    options={kategoriOptions}
                    onChange={(value) =>
                      handleInputChange("kategori_rotbmh", value)
                    } // Save data on selection change
                  />
                </Col>
              </Form.Group>
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
                    min={
                      watchKategori === "ROT"
                        ? minDateROT
                        : watchKategori === "ROB"
                        ? minDateROB
                        : watchKategori === "ROM"
                        ? minDateROM
                        : watchKategori === "ROH"
                        ? dateROH
                        : watchKategori === "EMERGENCY"
                        ? dateEmergency
                        : undefined
                    }
                    max={
                      watchKategori === "ROM"
                        ? maxDateROM
                        : watchKategori === "ROH"
                        ? dateROH
                        : watchKategori === "EMERGENCY"
                        ? dateEmergency
                        : undefined
                    }
                    // onChange={(e) =>
                    //   handleInputChange("tanggal", e.target.value)
                    // } // Save data on input change
                    onChange={(e) => {
                      const value = e.target.value;
                      const sanitized = sanitizeDateByKategori(value);

                      if (sanitized !== value && watchKategori !== "EMERGENCY") {
                        alert("Tanggal tidak valid, disesuaikan otomatis");
                      }

                      lastDateRef.current = sanitized;
                      setValue("tanggal", sanitized, { shouldDirty: true });
                      handleInputChange("tanggal", sanitized);
                    }}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label className="col-md-4 col-form-label">
                  Tanggal Awal Pekerjaan
                </Form.Label>
                <Col md={8}>
                  <InputDateNew
                    errors={errors}
                    register={register}
                    type="date"
                    fieldName="periode_awal"
                    step={1}
                    min={
                      watchKategori === "ROT"
                        ? minDateROT
                        : watchKategori === "ROB"
                        ? minDateROB
                        : watchKategori === "ROM"
                        ? minDateROM
                        : watchKategori === "ROH"
                        ? dateROH
                        : watchKategori === "EMERGENCY"
                        ? dateEmergency
                        : undefined
                    }
                    max={
                      watchKategori === "ROM"
                        ? maxDateROM
                        : watchKategori === "ROH"
                        ? dateROH
                        : watchKategori === "EMERGENCY"
                        ? dateEmergency
                        : undefined
                    }
                    // onChange={(e) =>
                    //   handleInputChange("periode_awal", e.target.value)
                    // } // Save data on input change
                    onChange={(e) => {
                      const value = e.target.value;
                      const sanitized = sanitizeDateByKategori(value);

                      if (sanitized !== value && watchKategori !== "EMERGENCY") {
                        alert("Tanggal tidak valid, disesuaikan otomatis");
                      }

                      lastDateRef.current = sanitized;
                      setValue("periode_awal", sanitized, { shouldDirty: true });
                      handleInputChange("periode_awal", sanitized);
                    }}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label className="col-md-4 col-form-label">
                  Tanggal Akhir Pekerjaan
                </Form.Label>
                <Col md={8}>
                  <InputDateNew
                    errors={errors}
                    register={register}
                    type="date"
                    fieldName="periode_akhir"
                    step={1}
                    min={
                      watchKategori === "ROT"
                        ? minDateROT
                        : watchKategori === "ROB"
                        ? minDateROB
                        : watchKategori === "ROM"
                        ? minDateROM
                        : watchKategori === "ROH"
                        ? dateROH
                        : watchKategori === "EMERGENCY"
                        ? dateEmergency
                        : undefined
                    }
                    max={
                      watchKategori === "ROM"
                        ? maxDateROM
                        : watchKategori === "ROH"
                        ? dateROH
                        : watchKategori === "EMERGENCY"
                        ? dateEmergency
                        : undefined
                    }
                    // onChange={(e) =>
                    //   handleInputChange("periode_akhir", e.target.value)
                    // } // Save data on input change
                    onChange={(e) => {
                      const value = e.target.value;
                      const sanitized = sanitizeDateByKategori(value);

                      if (sanitized !== value && watchKategori !== "EMERGENCY") {
                        alert("Tanggal tidak valid, disesuaikan otomatis");
                      }

                      lastDateRef.current = sanitized;
                      setValue("periode_akhir", sanitized, { shouldDirty: true });
                      handleInputChange("periode_akhir", sanitized);
                    }}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label className="col-md-4 col-form-label">
                  Jam Pekerjaan
                </Form.Label>
                <Col md={4}>
                  <SelectFormStaticNewOnchange
                    control={control}
                    errors={errors}
                    fieldName={"jam1"}
                    options={optionsTimes}
                    onChange={(value) => handleInputChange("jam1", value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors?.jam1?.message}
                  </Form.Control.Feedback>
                </Col>
                <Col md={4}>
                  <SelectFormStaticNewOnchange
                    control={control}
                    errors={errors}
                    fieldName={"jam2"}
                    options={optionsTimes}
                    onChange={(value) => handleInputChange("jam2", value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors?.jam2?.message}
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-2">
                <Form.Label className="col-md-4 col-form-label">
                  Gardu Induk
                </Form.Label>
                <Col md={8}>
                  <SelectAsyncDynamicNewOnchange
                    fieldName="id_gardu_induk"
                    control={control}
                    errors={errors}
                    labelField={"nama_lokasi"}
                    valueField={"id_ref_lokasi"}
                    pathServiceName={"master.jaringan.ref_lokasi"}
                    watchParent={watchGarduInduk}
                    queryParams={{
                      id_ref_jenis_lokasi: JENIS_LOKASI().gardu_induk,
                      page: -1,
                      limit: -1,
                      id_ref_lokasi: watchGarduInduk,
                    }}
                    setValue={setValue}
                    options={dataSelected?.gardu_induk}
                    onChange={(value) =>
                      handleInputChange("id_gardu_induk", value)
                    } // Save data on selection change
                  ></SelectAsyncDynamicNewOnchange>
                </Col>
              </Form.Group>
              {watchGarduInduk != null && (
                <Form.Group as={Row} className="mb-2">
                  <Form.Label className="col-md-4 col-form-label">
                    Penyulang
                  </Form.Label>
                  <Col md={8}>
                    <SelectAsyncDynamicNewOnchange
                      fieldName="id_penyulang"
                      fieldNameParent="id_gardu_induk"
                      control={control}
                      errors={errors}
                      labelField={"nama_lokasi"}
                      valueField={"id_ref_lokasi"}
                      pathServiceName={"master.jaringan.ref_lokasi"}
                      queryParams={{
                        id_ref_jenis_lokasi_in: `${JENIS_LOKASI().penyulang},${JENIS_LOKASI().trafo_gi
                          }`,
                        page: 1,
                        limit: 200,
                      }}
                      onChange={(value) =>
                        handleInputChange("id_penyulang", value)
                      }
                      setValue={setValue}
                      isDisabled={!watchGarduInduk}
                      watchParent={watchGarduInduk}
                    // options={dataSelected?.penyulang}
                    ></SelectAsyncDynamicNewOnchange>
                  </Col>
                </Form.Group>
              )}
              {watchPenyulang != null && (
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
                        page: 1,
                        limit: 100,
                      }}
                      isMulti={true}
                      onChange={(joinedString) => { // ✅ sudah string
                        // console.log("✅ onChange diterima di parent:", joinedString);
                        handleInputChange("id_gardu", joinedString);
                        setValue("id_gardu", joinedString);
                      }}
                      setValue={setValue}
                      isDisabled={!watchPenyulang}
                      watchParent={watchPenyulang}
                      options={dataSelected?.gardu_distribusi}
                    ></SelectAsyncDynamicNewOnchangeGardu>
                    {jumlahGarduPadam > 0 && (
                      <small className="text-muted mt-1 d-block">
                        Jumlah Gardu Padam: <strong>{jumlahGarduPadam}</strong>
                      </small>
                    )}
                  </Col>
                </Form.Group>
              )}
              <Form.Group as={Row} className="mb-3">
                <Form.Label className="col-md-4 col-form-label">
                  UP3
                </Form.Label>
                <Col md={8}>
                  <SelectAsyncDynamicNewOnchange
                    fieldName="id_area"
                    // fieldNameParent="id_penyulang"
                    control={control}
                    errors={errors}
                    labelField={"nama_lokasi"}
                    valueField={"id_ref_lokasi"}
                    pathServiceName={"master.jaringan.ref_lokasi"}
                    queryParams={{
                      id_ref_jenis_lokasi: JENIS_LOKASI().up3,
                      page: 1,
                      limit: 10,
                    }}
                    onChange={(value) => handleInputChange("id_area", value)} // Save data on selection change
                    setValue={setValue}
                    // isDisabled={!watchPenyulang}
                    // watchParent={watchPenyulang}
                    options={dataSelected?.up3}
                  ></SelectAsyncDynamicNewOnchange>
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
                  // onChange={(e) => handleInputChange('butuh_padam', e.target.value)}
                  />
                </Col>
              </Form.Group>

              <FormInputControlColumnNew
                labelName="JTM"
                required={false}
                placeholder="JTM"
                isInvalid={errors?.jtm || isJtmOverLimit}
                message={
                  errors?.jtm?.message ||
                  (isJtmOverLimit ? "Karakter tidak boleh lebih dari 250" : "")
                }
                register={register("jtm")}
                className="mb-3"
                rows={4}
                as={"textarea"}
                onChange={(e) => handleInputChange("jtm", e.target.value)}
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
                    disabled={isJadwalLocked}   // 🔒 INI KUNCIANNYA
                    onChange={(value) =>
                      handleInputChange("jenis_jadwal", value)
                    } // Save data on selection change
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label className="col-md-4 col-form-label">
                  Pengawas
                </Form.Label>
                <Col md={8}>
                  <Form.Control
                    {...register("id_pengawas")}
                    isInvalid={errors?.id_pengawas as boolean | undefined}
                    onChange={(e) =>
                      handleInputChange("id_pengawas", e.target.value)
                    }
                  />
                </Col>
              </Form.Group>

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
                        // onChange={(e) => {
                        //   const checked = e.target.checked ? 1 : 0;
                        //   field.onChange(checked);

                        //   if (checked === 1) {
                        //     setValue("ceklis_vendor", 0);
                        //     setValue("id_pelaksana", ""); // reset juga
                        //   }
                        // }}
                        onChange={(e) => {
                          const checked = e.target.checked ? 1 : 0;

                          // ✅ pakai handleInputChange
                          handleInputChange("ceklis_yantek", checked);

                          if (checked === 1) {
                            handleInputChange("ceklis_vendor", 0);

                            // ⚠️ OPTIONAL (hati-hati reset)
                            handleInputChange("id_pelaksana", "");
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
                        // onChange={(e) => {
                        //   const checked = e.target.checked ? 1 : 0;
                        //   field.onChange(checked);

                        //   if (checked === 1) {
                        //     setValue("ceklis_yantek", 0);
                        //     setValue("id_pelaksana", ""); // reset juga
                        //   }
                        // }}
                        onChange={(e) => {
                          const checked = e.target.checked ? 1 : 0;

                          // ✅ pakai handleInputChange
                          handleInputChange("ceklis_vendor", checked);

                          if (checked === 1) {
                            handleInputChange("ceklis_yantek", 0);

                            // ⚠️ OPTIONAL (hati-hati reset)
                            handleInputChange("id_pelaksana", "");
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
                { selectedVendor === 1 && (
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
                  // <SelectFormStatic
                  //   control={control}
                  //   errors={errors}
                  //   fieldName={`id_pelaksana`}
                  //   options={OPTION_PELAKSANA}
                  // />
                )}
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label className="col-md-4 col-form-label">
                  Wilayah
                </Form.Label>
                <Col md={8}>
                  <SelectFormStaticNewOnchange
                    control={control}
                    errors={errors}
                    fieldName={"wilayah"}
                    options={OPTION_WILAYAH}
                    onChange={(value) => handleInputChange("wilayah", value)}
                  ></SelectFormStaticNewOnchange>
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

              {id_gardu != null && (
                <FormInputControlColumnNew
                  labelName="Wilayah Padam"
                  required={false}
                  placeholder="Wilayah Padam"
                  isInvalid={!!errors?.wilayah_padam || isWilayahPadamOverLimit}
                  message={
                    errors?.wilayah_padam?.message ||
                    (isWilayahPadamOverLimit
                      ? "Karakter tidak boleh lebih dari 250."
                      : "")
                  }
                  register={register("wilayah_padam")}
                  className="mb-3"
                  rows={4}
                  as={"textarea"}
                  onChange={(e) =>
                    handleInputChange("wilayah_padam", e.target.value)
                  }
                />
              )}

              <Form.Group as={Row} className="mb-3">
                <Form.Label className="col-md-4 col-form-label">
                  Jenis Pelayanan
                </Form.Label>
                <Col md={8}>
                  <SelectFormStaticNewOnchange
                    control={control}
                    errors={errors}
                    fieldName={"jenis_pelayanan"}
                    options={JENIS_PELAYANAN()}
                    onChange={(value) =>
                      handleInputChange("jenis_pelayanan", value)
                    }
                  />
                </Col>
              </Form.Group>

              <FormInputControlColumnNew
                labelName="Keterangan"
                required={false}
                placeholder="Keterangan"
                isInvalid={!!errors?.keterangan || isKeteranganOverLimit}
                message={
                  errors?.keterangan?.message ||
                  (isKeteranganOverLimit
                    ? "Karakter tidak boleh lebih dari 250."
                    : "")
                }
                register={register("keterangan")}
                className="mb-3"
                as="textarea"
                rows="4"
                onChange={(e) =>
                  handleInputChange("keterangan", e.target.value)
                }
              />
              <Form.Group as={Row} className="mb-3">
                <Form.Label className="col-md-4 col-form-label">
                  Sifat Pekerjaan
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
                  />
                </Col>
              </Form.Group>
              <FormInputControlColumnNew
                labelName="Keterangan Detail Jenis Pekerjaan"
                required={false}
                placeholder="Keterangan Detail Jenis Pekerjaan"
                isInvalid={!!errors?.keterangan_detail_jenis_pekerjaan || isKeteranganOverLimit}
                message={
                  errors?.keterangan_detail_jenis_pekerjaan?.message ||
                  (isKeteranganOverLimit
                    ? "Karakter tidak boleh lebih dari 250."
                    : "")
                }
                register={register("keterangan_detail_jenis_pekerjaan")}
                className="mb-3"
                as="textarea"
                rows="4"
                onChange={(e) =>
                  handleInputChange("keterangan_detail_jenis_pekerjaan", e.target.value)
                }
              />
            </Col>
          </Row>
          <br></br>     
          <br></br>
          <br></br> 
          <Modal.Footer>
            <div className="d-flex gap-2">
              <ButtonCancel onClick={handleClose} />
              <Button variant="primary" disabled={loading} onClick={() => setShowConfirm(true)}>
                Simpan
              </Button>
            </div>
          </Modal.Footer>
        </Form>
        {/* 🔹 TAMBAHKAN: Modal konfirmasi */}
        <ModalConfirmJadwal
          show={showConfirm} // 🔹 kontrol muncul/tidak modal
          onCancel={() => setShowConfirm(false)} // 🔹 cancel modal
          onConfirm={() => {
            setShowConfirm(false);
            // 🔹 request submit form -> validasi Yup jalan
            (document.getElementById("formUsulan") as HTMLFormElement)
              ?.requestSubmit();
          }}
          register={register} // 🔹 kirim register
          errors={errors}     // 🔹 kirim errors
          handleInputChange={handleInputChange} // 🔹 kirim handler
          formModel={formModel} // 🔹 kirim state form utama
        />

      </FormDatajadwalPemeliharaan>
    </>
  );
}

export default UsulanJadwalHarFormPage;
