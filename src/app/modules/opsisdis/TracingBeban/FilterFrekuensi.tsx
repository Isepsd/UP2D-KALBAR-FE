import React, { useEffect, useState } from "react";
import { Col, Form, FormControl, InputGroup, Row } from "react-bootstrap";
import { useForm, useWatch, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import moment from "moment";
import Select from "react-select";

import { ReactSelectStyle } from "@app/configs/react-select.config";
import FiltersForm from "@app/modules/Filters/FilterForm";
import FilterActionButton from "@app/modules/Filters/FilterActionButton";
import SelectAsyncDynamic from "@app/modules/SelectForm/SelectAsyncDynamic";
import { JENIS_LOKASI } from "@app/configs/jenis-lokasi.config";
// import RequiredInfo from '@app/components/Info/RequiredInfo';
import { useSelector } from "react-redux";
import { timeDiff } from "@app/helper/time.helper";
// import { useSearchParams } from 'react-router-dom';
// import SelectFormStatic from "@app/modules/SelectForm/SelectFormStatic";

// const selectGarduInduk = {
//   fieldName: 'id_ref_lokasi_gi',
//   pathServiceName: 'master.jaringan.ref_lokasi',
//   labelField: 'nama_lokasi',
//   valueField: 'id_ref_lokasi',
//   placeholder: 'Pilih...',
// }
const selectUP2B = {
  fieldName: "id_ref_lokasi_up2b",
  pathServiceName: "master.jaringan.ref_lokasi",
  labelField: "nama_lokasi",
  valueField: "id_ref_lokasi",
  placeholder: "Pilih...",
};

const optionData = [
  // { label: 'Semua', value: '' },
  { label: "=", value: "=" },
  { label: ">=", value: ">=" },
  { label: "<=", value: "<=" },
];

const beban_puncak = [
  { label: "Avg", value: "avg" },
  // { label: 'Min Harian', value: 'min' },
  // { label: 'Max Harian', value: 'max' },
  { label: "Max Siang", value: "max_siang" },
  { label: "Min Siang", value: "min_siang" },
  { label: "Max Malam", value: "max_malam" },
  { label: "Min Malam", value: "min_malam" },
];

const optionBebanPuncak: any = {
  beban_harian: [
    // { label: 'Semua', value: '' },
    // { label: 'Hari', value: 'hari' },
    ...beban_puncak,
  ],
  beban_bulanan: [
    // { label: 'Semua', value: '' },
    // { label: 'Bulan', value: 'bulan' },
    ...beban_puncak,
  ],
  beban_tahunan: [
    // { label: 'Semua', value: '' },
    // { label: 'Tahun', value: 'tahun' },
    ...beban_puncak,
  ],
  puncak_tahunan: [
    // { label: 'Semua', value: '' },
    // { label: 'Tahun', value: 'tahun' },
    ...beban_puncak,
  ],
  puncak_bulanan: [
    // { label: 'Semua', value: '' },
    // { label: 'Bulan', value: 'bulan' },
    ...beban_puncak,
  ],
};

const optionSatuan = [
  { label: "KV", value: "KV" },
  { label: "MW", value: "MW" }, 
  { label: "Arus", value: "Arus" },
];
const optionSatuanArea = [{ label: "MW", value: "MW" }];
const optionTegangan = [
  { label: "< 20,2", value: "<" },
  { label: ">= 20.2 & <= 20.7", value: "=" },
  { label: "> 20,7", value: ">" },
];

const selectUP3 = {
  fieldName: "id_ref_lokasi_up3",
  pathServiceName: "master.jaringan.ref_lokasi",
  labelField: "nama_lokasi",
  valueField: "id_ref_lokasi",
  placeholder: "Pilih...",
};

const selectUnitPembangkit = {
  fieldName: 'id_ref_lokasi_unit_pembangkit',
  pathServiceName: 'master.jaringan.ref_lokasi',
  labelField: 'nama_lokasi',
  valueField: 'id_ref_lokasi',
  placeholder: 'Pilih...',
}
const selectPembangkit = {
  fieldName: 'id_ref_lokasi_pembangkit',
  pathServiceName: 'master.jaringan.ref_lokasi',
  labelField: 'nama_lokasi',
  valueField: 'id_ref_lokasi',
  placeholder: 'Pilih...',
}
const selectSubSistem = {
  fieldName: "id_ref_lokasi_subsistem",
  pathServiceName: "master.jaringan.ref_lokasi",
  labelField: "nama_lokasi",
  valueField: "id_ref_lokasi",
  placeholder: "Pilih...",
};

const selectUID = {
  fieldName: "id_ref_lokasi_uid",
  pathServiceName: "master.jaringan.ref_lokasi",
  labelField: "nama_lokasi",
  valueField: "id_ref_lokasi",
  placeholder: "Pilih...",
};

const selectPenyulang = {
  fieldName: 'id_ref_lokasi_penyulang',
  pathServiceName: 'master.jaringan.ref_lokasi',
  labelField: 'nama_lokasi',
  valueField: 'id_ref_lokasi',
  placeholder: 'Pilih...',
}
const selectGarduInduk = {
  fieldName: 'id_ref_lokasi_gi',
  pathServiceName: 'master.jaringan.ref_lokasi',
  labelField: 'nama_lokasi',
  valueField: 'id_ref_lokasi',
  placeholder: 'Pilih...',
}
const selectTrafo = {
  fieldName: "id_ref_lokasi_trafo_gi",
  pathServiceName: "master.jaringan.ref_lokasi",
  labelField: "nama_lokasi",
  valueField: "id_ref_lokasi",
  placeholder: "Pilih...",
};

const selectGarduHubung = {
  fieldName: 'id_ref_lokasi_gh',
  pathServiceName: 'master.jaringan.ref_lokasi',
  labelField: 'nama_lokasi',
  valueField: 'id_ref_lokasi',
  placeholder: 'Pilih...',
}
const selectKeypoint = {
  fieldName: 'id_ref_lokasi_keypoint',
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
  isSatuanArea?: boolean;
  isNilai?: boolean;
  isSubSistem?: boolean;
  isUnitPembangkit?: boolean
  isPembangkit?: boolean
  isPenyulang?: boolean;
  isGH?: boolean;
  isKP?: boolean;
  isJenisLayanan?: boolean;
  isUID?: boolean;
  isUP2B?: boolean;
  configFilter?: any;
  page?: any;
  optionsGarduInduk?: any[any];
};

function SubSistemFilter({
  tabActive = "!beban_perjam",
  page = "",
  isGarduInduk = false,
  isOperator = false,
  isTreshold = false,
  isBebanPuncak = false,
  isSatuan = false,
  isUnitPembangkit = false,
  isPembangkit = false,
  isGH = false,
  isKP = false,
  isSatuanArea = false,
  isNilai = false,
  isUID = false,
  isTrafoNonKTT = false,
  isTrafoKTT = false,
  isTrafo = false,
  isArea = false,
  isUP2B = false,
  isPenyulang = false,
  isSubSistem = false,
  configFilter = {},
  optionsGarduInduk = [],
}: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [optionsOperator, setOptionsOperator] = useState<any>(optionData);
  // const [dataParams, setDataParams] = useState<any>();
  // let [searchParams, setSearchParams] = useSearchParams();

  const shapes: any = {};
  const models: any = {
    datum_afters: moment().subtract(2, "day").format("YYYY-MM-DD"),
    datum_befores: moment().format("YYYY-MM-DD"),
    day_after: moment().subtract(29, "day").format("YYYY-MM-DD"),
    day_before: moment().format("YYYY-MM-DD"),
    month_after: moment().startOf("year").format("YYYY-MM"),
    month_before: moment().format("YYYY-MM"),
    year_after: moment().subtract(4, "year").format("YYYY"),
    year_before: moment().format("YYYY"),
    jenis_layanan: "KTT",
    value: null,
    datum_before: moment().format("YYYY-MM-DD") + " 23:59",
    datum_after: moment().subtract(2, "day").format("YYYY-MM-DD") + " 00:00",

    beban_puncak: "",
    id_ref_lokasi_gi: page !== "tracing-beban-ktt" ? optionsGarduInduk[0]?.value : "",
    id_ref_lokasi_penyulang: "",
    id_ref_lokasi_trafo_gi: "",
    id_ref_lokasi_up3: "",
    id_ref_lokasi_up2b: "",
    id_ref_lokasi_subsistem: "",
    id_ref_lokasi_uid: "",
    p_exact: "",
    p_gte: "",
    p_lte: "",
    p_avg_lte: "",
    p_avg_exact: "",
    p_avg_gte: "",
    p_max_siang_lte: "",
    p_max_siang_exact: "",
    p_max_siang_gte: "",
    p_min_siang_lte: "",
    p_min_siang_exact: "",
    p_min_siang_gte: "",
    p_max_malam_lte: "",
    p_max_malam_exact: "",
    p_max_malam_gte: "",
    p_min_malam_lte: "",
    p_min_malam_exact: "",
    p_min_malam_gte: "",

    i_exact: "",
    i_gte: "",
    i_lte: "",
    i_avg_lte: "",
    i_avg_exact: "",
    i_avg_gte: "",
    i_max_siang_lte: "",
    i_max_siang_exact: "",
    i_max_siang_gte: "",
    i_min_siang_lte: "",
    i_min_siang_exact: "",
    i_min_siang_gte: "",
    i_max_malam_lte: "",
    i_max_malam_exact: "",
    i_max_malam_gte: "",
    i_min_malam_lte: "",
    i_min_malam_exact: "",
    i_min_malam_gte: "",
    nilai: "",
    operator: "",
    satuan: "",
    // tabActive: null,
    // menu: "tracing beban",
    // p_gte:null,
    // i_gte:null,
    // p_lte:null,
    // i_lte:null,
    // i_exact:null,
    // p_exact:null,
  };

  const { activeFilters } = useSelector((state: any) => state.ui);

  configFilter?.forEach((parameter: any) => {
    shapes[parameter] = Yup.string().required("Data belum dipilih");
    models[parameter] = undefined;
  });

  const [formModel] = useState<any>({
    // datum_afters: moment().subtract(2, 'day').format('YYYY-MM-DD'),
    // datum_befores: moment().format('YYYY-MM-DD'),
    // day_after: moment().subtract(29, 'day').format('YYYY-MM-DD'),
    // day_before: moment().format('YYYY-MM-DD'),
    // month_after: moment().startOf('year').format('YYYY-MM'),
    // month_before: moment().format('YYYY-MM'),
    // year_after: moment().subtract(4, 'year').format('YYYY'),
    // year_before: moment().format('YYYY'),
    // jenis_layanan: "NON KTT",
    // value: null,
    // datum_before: null,
    // datum_after: null,
    ...models,
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
    p_exact: "",
    p_gte: "",
    p_lte: "",
    p_avg_lte: "",
    p_avg_exact: "",
    p_avg_gte: "",
    p_max_siang_lte: "",
    p_max_siang_exact: "",
    p_max_siang_gte: "",
    p_min_siang_lte: "",
    p_min_siang_exact: "",
    p_min_siang_gte: "",
    p_max_malam_lte: "",
    p_max_malam_exact: "",
    p_max_malam_gte: "",
    p_min_malam_lte: "",
    p_min_malam_exact: "",
    p_min_malam_gte: "",

    i_exact: "",
    i_gte: "",
    i_lte: "",
    i_avg_lte: "",
    i_avg_exact: "",
    i_avg_gte: "",
    i_max_siang_lte: "",
    i_max_siang_exact: "",
    i_max_siang_gte: "",
    i_min_siang_lte: "",
    i_min_siang_exact: "",
    i_min_siang_gte: "",
    i_max_malam_lte: "",
    i_max_malam_exact: "",
    i_max_malam_gte: "",
    i_min_malam_lte: "",
    i_min_malam_exact: "",
    i_min_malam_gte: "",
    nilai: "",
    operator: "",
    satuan: "",
    ...shapes,
  });

  const { handleSubmit, register, setValue, setError, control, formState } =
    useForm({
      resolver: yupResolver(validationSchema),
      defaultValues: formModel,
    });

  const { errors }: any = formState || {};
  const watchDatum1After = useWatch({ control, name: "datum_afters" });
  const watchDatum2Before = useWatch({ control, name: "datum_befores" });
  const watchDate2Before = useWatch({ control, name: "date_before" });
  const watchMonth1After = useWatch({ control, name: "month_after" });
  const watchMonth2Before = useWatch({ control, name: "month_before" });
  const watchGarduInduk = useWatch({ control, name: "id_ref_lokasi_gi" });
  const watchGarduInduk_GH = useWatch({ control, name: 'id_ref_lokasi_gi' });
  const watchGarduInduk_KP = useWatch({ control, name: 'id_ref_lokasi_gi' });
  const watchTabActive = useWatch({ control, name: "beban_puncak" });
  const watchSatuan = useWatch({ control, name: "satuan" });
  const watchUnitPembangkit = useWatch({ control, name: 'id_ref_lokasi_unit_pembangkit' });

  useEffect(() => {
    console.log("activeFilters?.filters", activeFilters?.filters);

    // if (Object.keys(activeFilters?.filters).length > 0) {
    //   onSubmitForm(activeFilters?.filters)
    // }
    if (activeFilters?.filters?.id_gardu_induk) {
      setValue("id_ref_lokasi_gi", activeFilters?.filters?.id_gardu_induk);
    }
    if (
      !activeFilters?.filters?.id_gardu_induk &&
      activeFilters?.filters?.id_ref_lokasi_trafo_gi
    ) {
      setValue(
        "id_ref_lokasi_trafo_gi",
        activeFilters?.filters?.id_ref_lokasi_trafo_gi
      );
    }
    if (
      !activeFilters?.filters?.id_gardu_induk &&
      activeFilters?.filters?.id_ref_lokasi_penyulang
    ) {
      setValue(
        "id_ref_lokasi_penyulang",
        activeFilters?.filters?.id_ref_lokasi_penyulang
      );
    }

    if (!activeFilters?.filters?.id_gardu_induk && activeFilters?.filters?.id_ref_lokasi_gh) {
      setValue("id_ref_lokasi_gh", activeFilters?.filters?.id_ref_lokasi_gh)
    }

    if (!activeFilters?.filters?.id_gardu_induk && activeFilters?.filters?.id_ref_lokasi_keypoint) {
      setValue("id_ref_lokasi_keypoint", activeFilters?.filters?.id_ref_lokasi_keypoint)
    }
    // if (tabActive === "beban_perjam") {
    //   setValue("beban_puncak", "")
    //   setValue("operator", "")
    //   setValue("satuan", "")
    //   setValue("nilai", "")

    //   setValue("p_exact", "")
    //   setValue("p_gte", "")
    //   setValue("p_lte", "")
    //   setValue("p_avg_lte", "")
    //   setValue("p_avg_exact", "")
    //   setValue("p_avg_gte", "")
    //   setValue("p_max_siang_lte", "")
    //   setValue("p_max_siang_exact", "")
    //   setValue("p_max_siang_gte", "")
    //   setValue("p_min_siang_lte", "")
    //   setValue("p_min_siang_exact", "")
    //   setValue("p_min_siang_gte", "")
    //   setValue("p_max_malam_lte", "")
    //   setValue("p_max_malam_exact", "")
    //   setValue("p_max_malam_gte", "")
    //   setValue("p_min_malam_lte", "")
    //   setValue("p_min_malam_exact", "")
    //   setValue("p_min_malam_gte", "")

    //   setValue("i_exact", "")
    //   setValue("i_gte", "")
    //   setValue("i_lte", "")
    //   setValue("i_avg_lte", "")
    //   setValue("i_avg_exact", "")
    //   setValue("i_avg_gte", "")
    //   setValue("i_max_siang_lte", "")
    //   setValue("i_max_siang_exact", "")
    //   setValue("i_max_siang_gte", "")
    //   setValue("i_min_siang_lte", "")
    //   setValue("i_min_siang_exact", "")
    //   setValue("i_min_siang_gte", "")
    //   setValue("i_max_malam_lte", "")
    //   setValue("i_max_malam_exact", "")
    //   setValue("i_max_malam_gte", "")
    //   setValue("i_min_malam_lte", "")
    //   setValue("i_min_malam_exact", "")
    //   setValue("i_min_malam_gte", "")
    // }

    // if (tabActive === "beban_perjam") {
    //   setValue("beban_puncak", "")
    //   searchParams.delete("beban_puncak")
    //   searchParams.append("beban_puncak", "")
    //   setSearchParams(searchParams)
    // }
  }, [activeFilters?.filters]);
  useEffect(() => {
    if (tabActive === "beban_perjam") {
      setValue("beban_puncak", "");
      setValue("operator", "");
      setValue("satuan", "");
      setValue("nilai", "");

      setValue("p_exact", "");
      setValue("p_gte", "");
      setValue("p_lte", "");
      setValue("p_avg_lte", "");
      setValue("p_avg_exact", "");
      setValue("p_avg_gte", "");
      setValue("p_max_siang_lte", "");
      setValue("p_max_siang_exact", "");
      setValue("p_max_siang_gte", "");
      setValue("p_min_siang_lte", "");
      setValue("p_min_siang_exact", "");
      setValue("p_min_siang_gte", "");
      setValue("p_max_malam_lte", "");
      setValue("p_max_malam_exact", "");
      setValue("p_max_malam_gte", "");
      setValue("p_min_malam_lte", "");
      setValue("p_min_malam_exact", "");
      setValue("p_min_malam_gte", "");

      setValue("i_exact", "");
      setValue("i_gte", "");
      setValue("i_lte", "");
      setValue("i_avg_lte", "");
      setValue("i_avg_exact", "");
      setValue("i_avg_gte", "");
      setValue("i_max_siang_lte", "");
      setValue("i_max_siang_exact", "");
      setValue("i_max_siang_gte", "");
      setValue("i_min_siang_lte", "");
      setValue("i_min_siang_exact", "");
      setValue("i_min_siang_gte", "");
      setValue("i_max_malam_lte", "");
      setValue("i_max_malam_exact", "");
      setValue("i_max_malam_gte", "");
      setValue("i_min_malam_lte", "");
      setValue("i_min_malam_exact", "");
      setValue("i_min_malam_gte", "");
    }
  }, [tabActive]);

  const defaultValues = {
    // datum_before: null,
    // datum_after: null,
    // datum_afters: moment().subtract(2, 'day').format('YYYY-MM-DD'),
    // datum_befores: moment().format('YYYY-MM-DD'),
    // day_after: moment().subtract(29, 'day').format('YYYY-MM-DD'),
    // day_before: moment().format('YYYY-MM-DD'),
    // month_after: moment().startOf('year').format('YYYY-MM'),
    // month_before: moment().format('YYYY-MM'),
    // year_after: moment().subtract(4, 'year').format('YYYY'),
    // year_before: moment().format('YYYY'),
    // operator: '',
    // satuan: '',
    // nilai: '',

    beban_puncak: watchTabActive,
    // id_gardu_induk: optionsGarduInduk[0]?.value,
    ...models,
  };

  const [dataParams, setDataParams] = useState<any>(defaultValues);

  /** SUBMIT FORM HANDLING */
  const onSubmitForm = (data: any) => {
    // console.log("data", data);
    let operator: any = "";
    let diff: any;
    // if (data) {
    //   data.datum_before = moment(data?.datum_before).format('YYYY-MM-DD HH:mm')
    //   data.datum_after = moment(data?.datum_after).format('YYYY-MM-DD HH:mm')

    // }
    let valid = true;
    delete data.p_exact;
    delete data.p_gte;
    delete data.p_lte;
    delete data.p_avg_lte;
    delete data.p_avg_exact;
    delete data.p_avg_gte;
    delete data.p_max_siang_lte;
    delete data.p_max_siang_exact;
    delete data.p_max_siang_gte;
    delete data.p_min_siang_lte;
    delete data.p_min_siang_exact;
    delete data.p_min_siang_gte;
    delete data.p_max_malam_lte;
    delete data.p_max_malam_exact;
    delete data.p_max_malam_gte;
    delete data.p_min_malam_lte;
    delete data.p_min_malam_exact;
    delete data.p_min_malam_gte;

    delete data.i_exact;
    delete data.i_gte;
    delete data.i_lte;
    delete data.i_avg_lte;
    delete data.i_avg_exact;
    delete data.i_avg_gte;
    delete data.i_max_siang_lte;
    delete data.i_max_siang_exact;
    delete data.i_max_siang_gte;
    delete data.i_min_siang_lte;
    delete data.i_min_siang_exact;
    delete data.i_min_siang_gte;
    delete data.i_max_malam_lte;
    delete data.i_max_malam_exact;
    delete data.i_max_malam_gte;
    delete data.i_min_malam_lte;
    delete data.i_min_malam_exact;
    delete data.i_min_malam_gte;

    switch (tabActive) {
      case "beban_perjam":
        diff = timeDiff(
          moment(data?.datum_befores).format("YYYY-MM-DD"),
          moment(data?.datum_afters).format("YYYY-MM-DD"),
          "days"
        );
        delete data["beban_puncak"];
        data.datum_before = `${data?.datum_befores} 23:59`;
        data.datum_after = `${data?.datum_afters} 00:00`;

        if (diff > 2) {
          valid = false;
          setError("datum_afters", {
            type: "manual",
            message: "Range tanggal maksimal 3 hari",
          });
        }

        if (data?.satuan != "" && data?.operator != "" && data?.nilai != "") {
          operator = "i_";
          if (data?.satuan == "MW") {
            operator = "p_";
          }

          switch (data?.operator) {
            case ">=":
              operator = operator + "gte";
              break;
            case "<=":
              operator = operator + "lte";
              break;
            default:
              operator = operator + "exact";
              break;
          }
          data[operator] = data?.nilai;
          console.log("perjam if operator", operator);
        }

        break;
      case "beban_harian":
        diff = timeDiff(
          moment(data?.day_before).format("YYYY-MM-DD"),
          moment(data?.day_after).format("YYYY-MM-DD"),
          "days"
        );
        if (diff > 29) {
          valid = false;
          setError("day_after", {
            type: "manual",
            message: "Range tanggal maksimal 30 hari",
          });
        }

        if (
          data?.satuan != "" &&
          data?.operator != "" &&
          data?.nilai != "" &&
          data?.beban_puncak != ""
        ) {
          operator = "i_" + data?.beban_puncak + "_";
          if (data?.satuan == "MW") {
            operator = "p_" + data?.beban_puncak + "_";
          }

          switch (data?.operator) {
            case ">=":
              operator = operator + "gte";
              break;
            case "<=":
              operator = operator + "lte";
              break;
            default:
              operator = operator + "exact";
              break;
          }
          data[operator] = data?.nilai;
        }

        break;
      case "puncak_bulanan":
        if (data?.month_before && data?.month_after) {
          diff = timeDiff(
            moment(data?.month_before).format("YYYY-MM-DD"),
            moment(data?.month_after).format("YYYY-MM-DD"),
            "months"
          );
        }

        if (diff > 12) {
          valid = false;
          setError("month_after", {
            type: "manual",
            message: "Maksimal 12 bulan",
          });
        }

        if (
          data?.satuan != "" &&
          data?.operator != "" &&
          data?.nilai != "" &&
          data?.beban_puncak != ""
        ) {
          operator = "i_" + data?.beban_puncak + "_";
          if (data?.satuan == "MW") {
            operator = "p_" + data?.beban_puncak + "_";
          }

          switch (data?.operator) {
            case ">=":
              operator = operator + "gte";
              break;
            case "<=":
              operator = operator + "lte";
              break;
            default:
              operator = operator + "exact";
              break;
          }
          data[operator] = data?.nilai;
        }
        break;
      case "puncak_tahunan":
        diff = data?.year_before - data?.year_after;
        if (!data?.year_after && data?.year_after != "") {
          setError("year_after", {
            type: "manual",
            message: "Range tahun harus diisi",
          });
        }
        if (!data?.year_before && data?.year_before != "") {
          setError("year_after", {
            type: "manual",
            message: "Range tahun harus diisi",
          });
        }

        if (valid == true && diff > 9) {
          valid = false;
          setError("year_after", {
            type: "manual",
            message: "Range year maksimal 5 tahun",
          });
        }
        if (
          data?.satuan != "" &&
          data?.operator != "" &&
          data?.nilai != "" &&
          data?.beban_puncak != ""
        ) {
          operator = "i_" + data?.beban_puncak + "_";
          if (data?.satuan == "MW") {
            operator = "p_" + data?.beban_puncak + "_";
          }

          switch (data?.operator) {
            case ">=":
              operator = operator + "gte";
              break;
            case "<=":
              operator = operator + "lte";
              break;
            default:
              operator = operator + "exact";
              break;
          }
          data[operator] = data?.nilai;
        }

        break;

      default:
        break;
    }

    if (valid) {
      console.log("data parmas", data);

      setDataParams(() => {
        return {
          ...data,
        };
      });
    }
  };

  useEffect(() => {
    console.log("useEffect defaultValues", defaultValues);

    onSubmitForm(defaultValues);
  }, []);

  useEffect(() => {
    switch (page) {
      case "tracing-beban-penyulang":
      case "tracing-beban-gh":
      case "tracing-beban-kp":
      case "tracing-beban-trafo-gi":
      case "tracing-beban-ktt":
        let dataOptions: any = optionData;
        if (watchSatuan === "Arus") {
          dataOptions = []
          optionData?.map((item: any) => {
            if (item?.label !== "=") {
              dataOptions.push(item)
            }
          });
        }
        setOptionsOperator(dataOptions);
        break;

      default:
        break;
    }
  }, [watchSatuan, page]);

  return (
    <>
      <FiltersForm
        setError={setError}
        setValue={setValue}
        dataParams={dataParams}
        onLoading={setLoading}
        fields={defaultValues}
      >
        <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
          <Row>
            {tabActive == "beban_perjam" && (
              <Col md={4} className="mb-3">
                <Form.Group>
                  <Form.Label>Range Tanggal</Form.Label>
                  <InputGroup>
                    <FormControl
                      {...register("datum_afters")}
                      type="date"
                      // min={moment(watchDatum2Before)
                      //   .subtract(2, 'day')
                      //   .format('YYYY-MM-DD HH:mm')}
                      max={watchDatum2Before}
                    />
                    <InputGroup.Text>
                      <i className="fa fa-arrow-right"></i>
                    </InputGroup.Text>
                    <FormControl
                      {...register("datum_befores")}
                      type="date"
                      min={moment(watchDatum1After)
                        .subtract(2, "day")
                        .format("YYYY-MM-DD HH:mm")}
                      max={moment().format("YYYY-MM-DD HH:mm")}
                    />
                  </InputGroup>
                </Form.Group>
                {errors.datum_afters && (
                  <div className="invalid-feedback d-block">
                    {errors?.datum_afters?.message}
                  </div>
                )}
              </Col>
            )}
            {tabActive == "beban_harian" && (
              <>
                <Col md={4} className="mb-3">
                  <Form.Group>
                    <Form.Label>Range Tanggal</Form.Label>
                    <InputGroup>
                      <FormControl
                        {...register("day_after")}
                        type="date"
                        max={watchDate2Before}
                      />
                      <InputGroup.Text>
                        <i className="fa fa-arrow-right"></i>
                      </InputGroup.Text>
                      <FormControl
                        {...register("day_before")}
                        type="date"
                        min={moment(watchDate2Before)
                          .subtract(31, "day")
                          .format("YYYY-MM-DD")}
                        max={moment().format("YYYY-MM-DD")}
                      />
                    </InputGroup>
                  </Form.Group>
                  {errors.day_after && (
                    <div className="invalid-feedback d-block">
                      {errors?.day_after?.message}
                    </div>
                  )}
                </Col>
              </>
            )}
            {(tabActive == "beban_bulanan" ||
              tabActive == "puncak_bulanan") && (
                <>
                  <Col md={4} className="mb-3">
                    <Form.Group>
                      <Form.Label>Range Bulan</Form.Label>
                      <InputGroup>
                        <FormControl
                          {...register("month_after")}
                          type="month"
                          formTarget="yyyy-mm-dd"
                          placeholder="Pilih Tanggal"
                          max={watchMonth2Before}
                        />
                        <InputGroup.Text>
                          <i className="fa fa-arrow-right"></i>
                        </InputGroup.Text>
                        <FormControl
                          {...register("month_before")}
                          type="month"
                          formTarget="yyyy-mm-dd"
                          placeholder="Pilih Tanggal"
                          min={moment(watchMonth1After).format("YYYY-MM")}
                          max={moment().format("YYYY-MM")}
                        />
                      </InputGroup>
                    </Form.Group>
                    {errors.month_after && (
                      <div className="invalid-feedback d-block">
                        {errors?.month_after?.message}
                      </div>
                    )}
                  </Col>
                </>
              )}
            {(tabActive == "beban_tahunan" ||
              tabActive == "puncak_tahunan") && (
                <>
                  <Col md={4} className="mb-3">
                    <Form.Group>
                      <Form.Label>Range Tahun</Form.Label>
                      <InputGroup>
                        <FormControl {...register("year_after")} type="number" />
                        <InputGroup.Text>
                          <i className="fa fa-arrow-right"></i>
                        </InputGroup.Text>
                        <FormControl {...register("year_before")} type="number" />
                      </InputGroup>
                      {errors.year_after && (
                        <div className="invalid-feedback d-block">
                          {errors?.year_after?.message}
                        </div>
                      )}
                      {errors.year_before && (
                        <div className="invalid-feedback d-block">
                          {errors?.year_before?.message}
                        </div>
                      )}
                    </Form.Group>
                  </Col>
                </>
              )}
            {isUID && (
              <Col md={2}>
                <Form.Group className="mb-3">
                  <Form.Label>Unit Induk</Form.Label>
                  <SelectAsyncDynamic
                    {...selectUID}
                    isClearable={true}
                    errors={errors}
                    control={control}
                    queryParams={{
                      page: -1,
                      limit: -1,
                      id_ref_jenis_lokasi: `${JENIS_LOKASI().uiw}`,
                      sort_by: "nama_lokasi"
                    }}
                  />
                </Form.Group>
              </Col>
            )}
            {isArea && (
              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Label>UP3</Form.Label>
                  <SelectAsyncDynamic
                    {...selectUP3}
                    isClearable={true}
                    errors={errors}
                    control={control}
                    queryParams={{
                      page: -1,
                      limit: -1,
                      id_ref_jenis_lokasi: `${JENIS_LOKASI().up3}`,
                      sort_by: "nama_lokasi"
                    }}
                  />
                </Form.Group>
              </Col>
            )}

{isUnitPembangkit &&
              <Col md={3}>
                <Form.Group className='mb-3'>
                  <Form.Label>Unit Pembangkit </Form.Label>
                  <SelectAsyncDynamic
                    required={true}
                    {...selectUnitPembangkit}
                    isClearable={true}
                    errors={errors}
                    control={control}
                    queryParams={{
                      id_ref_jenis_lokasi: JENIS_LOKASI().unit_pembangkit,
                      page: -1,
                      limit: -1,
                      sort_by: "nama_lokasi"
                    }}
                  />
                </Form.Group>
              </Col>
            }
            {isPembangkit && watchUnitPembangkit &&
              <Col md={3}>
                <Form.Group className='mb-3'>
                  <Form.Label>Pembangkit </Form.Label>
                  <SelectAsyncDynamic
                    required={false}
                    {...selectPembangkit}
                    isClearable={true}
                    errors={errors}
                    control={control}
                    fieldNameParent="id_unit_pembangkit"
                    queryParams={{
                      id_ref_jenis_lokasi: JENIS_LOKASI().pembangkit,
                      page: -1,
                      limit: -1,
                      sort_by: "nama_lokasi"
                    }}
                    watchParent={watchUnitPembangkit}
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
                      id_ref_jenis_lokasi: JENIS_LOKASI().gardu_induk,
                      page: -1,
                      limit: -1,
                      sort_by: "nama_lokasi",
                      
                    }}
                  />
                </Form.Group>
              </Col>
            }
            {isUP2B && (
              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Label>UP2B</Form.Label>
                  <SelectAsyncDynamic
                    {...selectUP2B}
                    isClearable={true}
                    errors={errors}
                    control={control}
                    queryParams={{ id_ref_jenis_lokasi: `${JENIS_LOKASI().up2b}`, sort_by: "nama_lokasi" }}
                  />
                </Form.Group>
              </Col>
            )}
            {isPenyulang && watchGarduInduk && (
              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Label>Penyulang</Form.Label>
                  <SelectAsyncDynamic
                    {...selectPenyulang}
                    isClearable={true}
                    errors={errors}
                    control={control}
                    fieldNameParent="id_gardu_induk"
                    queryParams={{ id_ref_jenis_lokasi: JENIS_LOKASI().penyulang, sort_by: "nama_lokasi" }}
                    watchParent={watchGarduInduk}
                  />
                </Form.Group>
              </Col>
            )}


{isGH && watchGarduInduk_GH &&
              <Col md={3}>
             <Form.Group className='mb-3'>
                  <Form.Label>Gardu Hubung </Form.Label>
                  <SelectAsyncDynamic
                    required={true}
                    {...selectGarduHubung}
                    isClearable={true}
                    errors={errors}
                    control={control}
                    queryParams={{
                      id_ref_jenis_lokasi: JENIS_LOKASI().keypoint,
                      sort_by: "nama_lokasi",
                      fungsi_lokasi:"GH"
                    }}
                    watchParent={watchGarduInduk}

                  />
                </Form.Group>
              </Col>
          }

{isKP && watchGarduInduk_KP &&
              <Col md={3}>
             <Form.Group className='mb-3'>
                  <Form.Label>KeyPoint</Form.Label>
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
                    }}
                    watchParent={watchGarduInduk}

                  />
                </Form.Group>
              </Col>
          }
            {isTrafoNonKTT && watchGarduInduk && (
              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Label>No Trafo </Form.Label>
                  <SelectAsyncDynamic
                    required={true}
                    {...selectTrafo}
                    isClearable={true}
                    errors={errors}
                    control={control}
                    fieldNameParent="id_gardu_induk"
                    queryParams={{
                      id_ref_jenis_lokasi: JENIS_LOKASI().trafo_gi,
                      jenis_layanan: "NON KTT",
                      page: -1,
                      limit: -1,
                      sort_by: "nama_lokasi"
                    }}
                    watchParent={watchGarduInduk}
                  />
                </Form.Group>
              </Col>
            )}
            {isTrafo && watchGarduInduk && (
              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Label>No Trafo </Form.Label>
                  <SelectAsyncDynamic
                    required={true}
                    {...selectTrafo}
                    isClearable={true}
                    errors={errors}
                    control={control}
                    fieldNameParent="id_gardu_induk"
                    queryParams={{
                      id_ref_jenis_lokasi: JENIS_LOKASI().trafo_gi,
                      page: -1,
                      limit: -1,
                      sort_by: "nama_lokasi"
                    }}
                    watchParent={watchGarduInduk}
                  />
                </Form.Group>
              </Col>
            )}
            {isTrafoKTT && watchGarduInduk && (
              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Label>Nama KTT</Form.Label>
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
                      sort_by: "nama_lokasi"
                    }}
                    watchParent={watchGarduInduk}
                  />
                </Form.Group>
              </Col>
            )}

            {isSubSistem && (
              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Label>Sub Sistem</Form.Label>
                  <SelectAsyncDynamic
                    {...selectSubSistem}
                    isClearable={true}
                    errors={errors}
                    control={control}
                    queryParams={{
                      page: -1,
                      limit: - 1,
                      id_ref_jenis_lokasi: `${JENIS_LOKASI().subsistem}`,
                      sort_by: "nama_lokasi"
                    }}
                  />
                </Form.Group>
              </Col>
            )}
            {isBebanPuncak && (
              <Col md={2}>
                <Form.Group className="mb-3">
                  <Form.Label>Beban</Form.Label>
                  <Controller
                    control={control}
                    defaultValue={""}
                    name="beban_puncak"
                    rules={{
                      required: false,
                    }}
                    render={({ field: { onChange, value, ref } }) => (
                      <Select
                        placeholder="Pilih..."
                        styles={ReactSelectStyle}
                        classNamePrefix={`${errors.ufr ? "is-invalid" : ""}`}
                        inputRef={ref}
                        value={optionBebanPuncak[
                          tabActive || "beban_harian"
                        ]?.filter((c: any) => c.value == value)}
                        onChange={(val: any) => onChange(val?.value)}
                        options={optionBebanPuncak[tabActive || "beban_harian"]}
                      // isClearable={true}
                      />
                    )}
                  />
                </Form.Group>
              </Col>
            )}
            {isSatuan && (
              <Col md={2}>
                <Form.Group className="mb-3">
                  <Form.Label>Satuan</Form.Label>
                  <Controller
                    control={control}
                    defaultValue={""}
                    name="satuan"
                    rules={{
                      required: false,
                    }}
                    render={({ field: { onChange, value, ref } }) => (
                      <Select
                        placeholder="Pilih..."
                        styles={ReactSelectStyle}
                        classNamePrefix={`${errors.ufr ? "is-invalid" : ""}`}
                        inputRef={ref}
                        value={optionSatuan?.filter(
                          (c: any) => c.value == value
                        )}
                        onChange={(val: any) => onChange(val?.value)}
                        options={optionSatuan}
                        isClearable={true}
                      />
                    )}
                  />
                </Form.Group>
              </Col>
            )}
            {isSatuanArea && (
              <Col md={2}>
                <Form.Group className="mb-3">
                  <Form.Label>Satuan</Form.Label>
                  <Controller
                    control={control}
                    defaultValue={""}
                    name="satuan"
                    rules={{
                      required: false,
                    }}
                    render={({ field: { onChange, value, ref } }) => (
                      <Select
                        placeholder="Pilih..."
                        styles={ReactSelectStyle}
                        classNamePrefix={`${errors.ufr ? "is-invalid" : ""}`}
                        inputRef={ref}
                        value={optionSatuanArea?.filter(
                          (c: any) => c.value == value
                        )}
                        onChange={(val: any) => onChange(val?.value)}
                        options={optionSatuanArea}
                        isClearable={true}
                      />
                    )}
                  />
                </Form.Group>
              </Col>
            )}
            {isOperator && (
              <Col md={2}>
                <Form.Group className="mb-3">
                  <Form.Label>Operator</Form.Label>
                  <Controller
                    control={control}
                    defaultValue={""}
                    name="operator"
                    rules={{
                      required: false,
                    }}
                    render={({ field: { onChange, value, ref } }) => (
                      <Select
                        placeholder="Pilih..."
                        styles={ReactSelectStyle}
                        classNamePrefix={`${errors.operator ? "is-invalid" : ""
                          }`}
                        inputRef={ref}
                        value={optionsOperator?.filter(
                          (c: any) => c.value == value
                        )}
                        onChange={(val: any) => onChange(val?.value)}
                        options={optionsOperator}
                        isClearable={true}
                      />
                    )}
                  />
                </Form.Group>
              </Col>
            )}

            {isTreshold && (
              <Col md={2}>
                <Form.Group className="mb-3">
                  <Form.Label>Treshold</Form.Label>
                  <Controller
                    control={control}
                    defaultValue={""}
                    name="treshold"
                    rules={{
                      required: false,
                    }}
                    render={({ field: { onChange, value, ref } }) => (
                      <Select
                        placeholder="Pilih..."
                        styles={ReactSelectStyle}
                        classNamePrefix={`${errors.treshold ? "is-invalid" : ""
                          }`}
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
            )}

            {isNilai && (
              <Col md={2}>
                <Form.Group className="mb-3">
                  <Form.Label>Nilai</Form.Label>
                  <Form.Control
                    {...register("nilai")}
                    placeholder="Enter Nilai"
                  />
                </Form.Group>
              </Col>
            )}
          </Row>
          <FilterActionButton
            loading={loading}
            onClickReset={() => onSubmitForm(defaultValues)}
            className="justify-content-start"
          />
        </Form>
      </FiltersForm>
    </>
  );
}

export default SubSistemFilter;
