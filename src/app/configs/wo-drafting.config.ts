export const CONFIG_GRAFIK_KOMULATIF = [
  {
    label: "Master",
    title: "GRAFIK MASTER STATION TAHUN " + new Date().getFullYear(),
    path: "dashboard.kinerja_scada.komulatif.master"
  },
  {
    label: "RTU",
    title: "GRAFIK RTU (GSM) TAHUN " + new Date().getFullYear(),
    path: "dashboard.kinerja_scada.komulatif.rtu"
  },
  {
    label: "TELEKOMUNIKASI",
    title: "GRAFIK TELEKOMUNIKASI (FIBER) TAHUN " + new Date().getFullYear(),
    path: "dashboard.kinerja_scada.komulatif.telkom"
  },

]


export const CONFIG_BOX_KOMULATIF = [
  {
    "label": "Kinerja SPV Scada",
    "value": "99",
    "suffix": "%",
    "variant": "success",
    path: "fasop.drafting.persentase",

    "fieldName": "kinerja_spv_scada"
  },
  {
    "label": "Kinerja SPV Bidang",
    "value": "99",
    "suffix": "%",
    "variant": "warning",
    path: "fasop.drafting.persentase",
    // "filterParams": "kinerja_spv_data",
    "fieldName": "kinerja_spv_data"
  },
  {
    "label": "Kinerja SPV Opsis",
    "value": "99",
    "suffix": "%",
    "variant": "primary",
    path: "fasop.drafting.persentase",

    "fieldName": "kinerja_spv_opsis"
  },
  {
    "label": "Kinerja Master",
    "value": "99",
    "suffix": "%",
    "variant": "danger",
    path: "fasop.drafting.persentase",

    "fieldName": "kinerja_pelaksana"
  },
];

