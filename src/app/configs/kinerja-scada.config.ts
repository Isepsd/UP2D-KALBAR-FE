export const CONFIG_BOX_BULANAN = [
  {
    "label": "MASTER STATION",
    "value": "99",
    "suffix": "%",
    "variant": "success",
    path: "dashboard.kinerja_scada.kinerja_box.bulanan_master"
  },
  {
    "label": "RTU",
    "value": "99",
    "suffix": "%",
    "variant": "warning",
    path: "dashboard.kinerja_scada.kinerja_box.bulanan_rtu"
  },
  {
    "label": "TELEKOMUNIKASI",
    "value": "99",
    "suffix": "%",
    "variant": "primary",
    path: "dashboard.kinerja_scada.kinerja_box.bulanan_telkom"
  },
  {
    "label": "RC",
    "value": "99",
    "suffix": "%",
    "variant": "danger",
    path: "dashboard.kinerja_scada.kinerja_box.bulanan_rc"
  }
]

export const CONFIG_BOX_BULANAN_SCADA = [
  {
    "label": "MASTER",
    "value": "99",
    "suffix": "",
    "variant": "success",
    path: "dashboard.kinerja_scada.kinerja_box.bulanan_master"
  },
  {
    "label": "RTU",
    "value": "99",
    "suffix": "",
    "variant": "warning",
    path: "dashboard.kinerja_scada.kinerja_box.bulanan_rtu"
  },
  {
    "label": "TELEKOMUNIKASI",
    "value": "99",
    "suffix": "",
    "variant": "primary",
    path: "dashboard.kinerja_scada.kinerja_box.bulanan_telkom"
  },
  {
    "label": "TELESIGNAL",
    "value": "99",
    "suffix": "",
    "variant": "danger",
    path: "dashboard.kinerja_scada.kinerja_box.bulanan_rc"
  },
  {
    "label": "TELEMETERING",
    "value": "99",
    "suffix": "",
    "variant": "disgust",
    path: "dashboard.kinerja_scada.kinerja_box.bulanan_telemetring"
  }
]

export const CONFIG_BOX_KOMULATIF = [
  {
    "label": "MASTER STATION",
    "value": "99",
    "suffix": "%",
    "variant": "success",
    path: "dashboard.kinerja_scada.kinerja_box.komulatif_master"
  },
  {
    "label": "RTU",
    "value": "99",
    "suffix": "%",
    "variant": "warning",
    path: "dashboard.kinerja_scada.kinerja_box.komulatif_rtu"
  },
  {
    "label": "TELEKOMUNIKASI",
    "value": "99",
    "suffix": "%",
    "variant": "primary",
    path: "dashboard.kinerja_scada.kinerja_box.komulatif_telkom"
  },
  {
    "label": "RC",
    "value": "99",
    "suffix": "%",
    "variant": "danger",
    path: "dashboard.kinerja_scada.kinerja_box.komulatif_rc"
  },
]

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
export const CONFIG_GRAFIK_KOMULATIFRC = [

  {
    label: "RC",
    title: "GRAFIK REMOTE CONTROL TAHUN " + new Date().getFullYear(),
    path: "dashboard.kinerja_scada.grafik.rc"
  }
]

export const CONFIG_INFO_RTU = [
  {
    "label": "GI",
    "value": "10",
    "suffix": "",
    path: "dashboard.kinerja_scada.kinerja_box.rtu_komplikasi",
    filterParams: { "name": "RTU GI" }
  },
  {
    "label": "GH",
    "value": "9",
    "suffix": "",
    path: "dashboard.kinerja_scada.kinerja_box.rtu_komplikasi",
    filterParams: { "name": "RTU GH" }
  },
  {
    "label": "SSO",
    "value": "9",
    "suffix": "",
    path: "dashboard.kinerja_scada.kinerja_box.rtu_komplikasi",
    filterParams: { "name": "RTU SSO" }
  },
  {
    "label": "RCL",
    "value": "9",
    "suffix": "",
    path: "dashboard.kinerja_scada.kinerja_box.rtu_komplikasi",
    filterParams: { "name": "RTU RECLOSER" }
  },
]

export const CONFIG_RTU_POOL = [
  {
    "label": "RTU IN POOL",
    "value": "10",
    "suffix": "",
    path: "dashboard.kinerja_scada.kinerja_box.count_rtu_ip"
  },

  {
    "label": "RTU OUT POOL",
    "value": "10",
    "suffix": "",
    path: "dashboard.kinerja_scada.kinerja_box.count_rtu_oop"
  }
]