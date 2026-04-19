import { addLeadingZeros } from "@app/helper/number.helper";
import moment from "moment";

export const NO = () => [{ Header: 'No', accessor: 'number', minWidth: '50px', disableFilters: true, show: true, fixed: true }]
export const ACTION_COLUMN = () => [{ Header: 'Aksi', accessor: 'action', minWidth: '20px', maxWidth: '20px', canFilter: false, show: true, hideColumn: true }];
export const B1 = () => [{ Header: 'B1 (Lokasi)', accessor: 'b1', minWidth: '150px', disableFilters: true, show: true }]
export const B2 = () => [{ Header: 'B2 (Tegangan)', accessor: 'b2', minWidth: '150px', disableFilters: true, show: true }]
export const B3 = () => [{ Header: 'B3 (Bay)', accessor: 'b3', minWidth: '150px', disableFilters: true, show: true }]
export const KINERJA = () => [{ Header: 'Kinerja', accessor: 'kinerja', minWidth: '150px', disableFilters: true, show: true }]
export const JENIS_POINT = () => [{ Header: 'Jenis Point', accessor: 'jenis_point', minWidth: '150px', disableFilters: true, show: true }]
export const JENIS_LOKASI = () => [{ Header: 'Jenis Lokasi', accessor: 'jenis_lokasi', minWidth: '150px', disableFilters: true, show: true }]

export const GARDU_INDUK = () => [{ Header: 'Gardu Induk', accessor: 'gi', show: true, disableFilters: true, allowEditing: true, allowUpdating: true, minWidth: 140, enabled: false, fixed: true }]
export const UNIT_PEMBANGKIT = () => [{ Header: 'Unit Pembangkit', accessor: 'unit_pembangkit', show: true, disableFilters: true, allowEditing: true, allowUpdating: true, minWidth: 140, enabled: false, fixed: true }]
export const PEMBANGKIT = () => [{ Header: 'Pembangkit', accessor: 'pembangkit', show: true, disableFilters: true, allowEditing: true, allowUpdating: true, minWidth: 140, enabled: false, fixed: true }]
export const DATETIME = () => [{ Header: 'Tanggal', accessor: 'datum', show: true, disableFilters: true, allowEditing: true, allowUpdating: true, minWidth: 140, enabled: false, fixed: true }]
export const DATE = () => [{ Header: 'Tanggal', accessor: 'date', show: true, disableFilters: true, allowEditing: true, allowUpdating: true, minWidth: 140, enabled: false, fixed: true }]
export const MONTH_YEAR = () => [{ Header: 'Bulan Tahun', accessor: 'month_year', show: true, disableFilters: true, allowEditing: true, allowUpdating: true, minWidth: 140, enabled: false, cssClass: "", fixed: true }]
export const YEAR = () => [{ Header: 'Tahun', accessor: 'year', show: true, disableFilters: true, allowEditing: true, allowUpdating: true, minWidth: 140, enabled: false, fixed: true }]
export const PENYULANG = () => [{ Header: 'Penyulang', accessor: 'penyulang', show: true, disableFilters: true, allowEditing: true, allowUpdating: true, minWidth: 140, enabled: false, fixed: true }]
// export const KODE_PENYULANG = () => [{ Header: 'Kode Penyulang', accessor: 'kode_penyulang', show: true, disableFilters: true, allowEditing: true, allowUpdating: true, minWidth: 140, enabled: false, fixed: true }]
export const TRAFO = () => [{ Header: 'Trafo', accessor: 'trafo', show: true, disableFilters: true, allowEditing: true, allowUpdating: true, minWidth: 140, enabled: false, fixed: true }]
export const TRAFO_KTT = () => [{ Header: 'Trafo', accessor: 'trafo', show: true, disableFilters: true, allowEditing: true, allowUpdating: true, minWidth: 140, enabled: false, fixed: true }]
export const KODE_TRAFO = () => [{ Header: 'Kode Trafo', accessor: 'kode_trafo', show: true, disableFilters: true, allowEditing: true, allowUpdating: true, minWidth: 140, enabled: false, fixed: true }]
export const LOAD_FAKTOR = () => [{ Header: 'Load Faktor', accessor: 'load_faktor', show: true, disableFilters: true, allowEditing: true, allowUpdating: true, minWidth: 140, enabled: false, }]

export const DAYA_AKTIF = () => {
  return [
    { Header: 'Daya Aktif (MW)', accessor: 'p', minWidth: '150px', disableFilters: true, show: true }
  ]
}
export const TEGANGAN_MIN = () => {
  return [
    { Header: 'Tegangan Min (kV)', accessor: 'v_min', minWidth: '150px', disableFilters: true, show: true }
  ]
}
export const TEGANGAN_MAX = () => {
  return [
    { Header: 'Tegangan Max (kV)', accessor: 'v_max', minWidth: '150px', disableFilters: true, show: true }
  ]
}
export const TEGANGAN_AVG = () => {
  return [
    { Header: 'Tegangan AVG (kV)', accessor: 'v_avg', minWidth: '150px', disableFilters: true, show: true }
  ]
}
/*
count 24|48 24 for interval 1 hour 48 for interval 30 minutes
addMinute 30|60 minutes
*/
export const TIME_HOUR = (count: any = 24, addMinute: any = 60) => {
  let data: any = [];
  let time = "2022-01-01 00:00:00";
  for (let index = 0; index < count; index++) {
    let times = moment(time).add(addMinute * index, 'minutes').format("YYYY-MM-DD HH:mm")
    data.push(
      { Header: moment(times).format("HH:mm"), accessor: moment(times).format("HH_mm"), minWidth: '80px', disableFilters: true, show: true }
    )

  }

  return data;
}

export const DAYS = (year: any = moment().format("YYYYY"), month: any = moment().format("MM")) => {
  let data: any = []
  let startOfMonth: number = +moment(year + "-" + month + "-01").startOf('month').format('DD');
  let endOfMonth: number = +moment(year + "-" + month + "-01").endOf('month').format('DD');

  for (startOfMonth; startOfMonth <= endOfMonth; startOfMonth++) {
    data.push(
      { Header: startOfMonth, accessor: addLeadingZeros(startOfMonth, 1), minWidth: '80px', disableFilters: true, show: true }
    )
    // data.push(
    //   { Header: startOfMonth, accessor: year + "-" + month + "-" + addLeadingZeros(startOfMonth, 2), minWidth: '80px', disableFilters: true, show: true }
    // )
  }
  return data;
}

export const MORE_BEBAN_ARUS_COLUMN = () => {
  return [
    { Header: 'Min (A)', accessor: 'min', minWidth: '200px', disableFilters: true, show: true },
    { Header: 'Tgl Min', accessor: 'tgl_min', minWidth: '100px', disableFilters: true, show: true },
    { Header: 'Max (A)', accessor: 'max', minWidth: '100px', disableFilters: true, show: true },
    { Header: 'Tgl Min', accessor: 'tgl_min', minWidth: '100px', disableFilters: true, show: true },
    { Header: 'Avg', accessor: 'avg', minWidth: '100px', disableFilters: true, show: true },
    // { Header: 'Tgl Avg', accessor: 'tgl_avg', minWidth: '100px', disableFilters: true, show: true },

  ]
}

export const MORE_BEBAN_HARIAN_COLUMN = () => {
  return [
    {
      Header: 'Arus', disableFilters: true, show: true, customClass: "text-center",
      columns: [
        MORE_BEBAN_MULTI_COLUMN("Hari", "i", "", "A"),
        MORE_BEBAN_MULTI_COLUMN("Siang", "i", "_siang", "A"),
        MORE_BEBAN_MULTI_COLUMN("Malam", "i", "_malam", "A"),
      ]
    },
    {
      Header: 'Daya Aktif', minWidth: '150px', disableFilters: true, show: true, customClass: "text-center", columns: [
        MORE_BEBAN_MULTI_COLUMN("Hari", "p", "", "MW"),
        MORE_BEBAN_MULTI_COLUMN("Siang", "p", "_siang", "MW"),
        MORE_BEBAN_MULTI_COLUMN("Malam", "p", "_malam", "MW"),
      ]
    },
  ]
}
export const MORE_BEBAN_TEGANGAN_HARIAN_COLUMN = () => {
  return [
    {
      Header: 'Tegangan', disableFilters: true, show: true, customClass: "text-center",
      columns: [
        MORE_BEBAN_MULTI_COLUMN("Hari", "v", "", "kV"),
        MORE_BEBAN_MULTI_COLUMN("Siang", "v", "_siang", "kV"),
        MORE_BEBAN_MULTI_COLUMN("Malam", "v", "_malam", "kV"),
      ]
    },
  ]
}
export const MORE_BEBAN_DAYA_AKTIF_COLUMN = () => {
  return [
    {
      Header: 'Daya Aktif', minWidth: '150px', disableFilters: true, show: true, customClass: "text-center", columns: [
        MORE_BEBAN_MULTI_COLUMN("Hari", "p", "", "MW"),
        MORE_BEBAN_MULTI_COLUMN("Siang", "p", "_siang", "MW"),
        MORE_BEBAN_MULTI_COLUMN("Malam", "p", "_malam", "MW"),
      ]
    },
  ]
}



export const MORE_BEBAN_BULAN_COLUMN = () => {
  return [
    {
      Header: 'Arus', disableFilters: true, show: true, customClass: "text-center",
      columns: [
        MORE_BEBAN_MULTI_COLUMN("Bulan", "i", "", "A"),
        MORE_BEBAN_MULTI_COLUMN("Siang", "i", "_siang", "A"),
        MORE_BEBAN_MULTI_COLUMN("Malam", "i", "_malam", "A"),
      ]
    },
    {
      Header: 'Daya Aktif', minWidth: '150px', disableFilters: true, show: true, customClass: "text-center", columns: [
        MORE_BEBAN_MULTI_COLUMN("Bulan", "p", "", "MW"),
        MORE_BEBAN_MULTI_COLUMN("Siang", "p", "_siang", "MW"),
        MORE_BEBAN_MULTI_COLUMN("Malam", "p", "_malam", "MW"),
      ]
    },
  ]
}


export const MORE_BEBAN_TAHUN_COLUMN = () => {
  return [
    {
      Header: 'Arus', disableFilters: true, show: true, customClass: "text-center",
      columns: [
        MORE_BEBAN_MULTI_COLUMN("Tahun", "i", "", "A"),
        MORE_BEBAN_MULTI_COLUMN("Siang", "i", "_siang", "A"),
        MORE_BEBAN_MULTI_COLUMN("Malam", "i", "_malam", "A"),
      ]
    },
    {
      Header: 'Daya Aktif', minWidth: '150px', disableFilters: true, show: true, customClass: "text-center", columns: [
        MORE_BEBAN_MULTI_COLUMN("Tahun", "p", "", "MW"),
        MORE_BEBAN_MULTI_COLUMN("Siang", "p", "_siang", "MW"),
        MORE_BEBAN_MULTI_COLUMN("Malam", "p", "_malam", "MW"),
      ]
    },
  ]
}



export const MORE_BEBAN_ARUS_HARI_COLUMN = () => {
  return {
    Header: 'Hari', minWidth: '200px', disableFilters: true, show: true,
    columns: [
      { Header: 'Min (A)', accessor: 'min_hari', minWidth: '200px', disableFilters: true, show: true },
      { Header: 'Tgl Min', accessor: 'tgl_min_hari', minWidth: '100px', disableFilters: true, show: true },
      { Header: 'Max (A)', accessor: 'max_hari', minWidth: '100px', disableFilters: true, show: true },
      { Header: 'Tgl Min', accessor: 'tgl_max_hari', minWidth: '100px', disableFilters: true, show: true },
      { Header: 'Avg', accessor: 'avg_hari', minWidth: '100px', disableFilters: true, show: true },
      // { Header: 'Tgl Avg', accessor: 'tgl_avg_hari', minWidth: '100px', disableFilters: true, show: true }
    ]
  }
}

export const MORE_BEBAN_ARUS_SIANG_COLUMN = () => {
  return {
    Header: 'Siang', minWidth: '200px', disableFilters: true, show: true,
    columns: [
      { Header: 'Min (A)', accessor: 'min_siang', minWidth: '200px', disableFilters: true, show: true },
      { Header: 'Tgl Min', accessor: 'tgl_min_siang', minWidth: '100px', disableFilters: true, show: true },
      { Header: 'Max (A)', accessor: 'max_siang', minWidth: '100px', disableFilters: true, show: true },
      { Header: 'Tgl Min', accessor: 'tgl_max_siang', minWidth: '100px', disableFilters: true, show: true },
      { Header: 'Avg', accessor: 'avg_siang', minWidth: '100px', disableFilters: true, show: true },
      // { Header: 'Tgl Avg', accessor: 'tgl_avg_siang', minWidth: '100px', disableFilters: true, show: true },

    ]
  }
}

export const MORE_BEBAN_ARUS_MALAM_COLUMN = () => {
  return {
    Header: 'Malam', minWidth: '200px', disableFilters: true, show: true,
    columns: [
      { Header: 'Min (A)', accessor: 'min_malam', minWidth: '200px', disableFilters: true, show: true },
      { Header: 'Tgl Min', accessor: 'tgl_min_malam', minWidth: '100px', disableFilters: true, show: true },
      { Header: 'Max (A)', accessor: 'max', minWidth: '100px', disableFilters: true, show: true },
      { Header: 'Tgl Max', accessor: 'tgl_max_malam', minWidth: '100px', disableFilters: true, show: true },
      { Header: 'Avg', accessor: 'avg_malam', minWidth: '100px', disableFilters: true, show: true },
    ]
  }
}



export const MORE_BEBAN_MULTI_COLUMN = (label: string, field: string, type: string = "", satuan: string = "") => {
  return {
    Header: `${label}`, minWidth: '200px', disableFilters: true, show: true, customClass: "text-center",
    columns: [
      { Header: `Min (${satuan})`, accessor: `${field}_min${type}`, minWidth: '100px', disableFilters: true, show: true, customClass: "" },
      { Header: 'Tgl Min', accessor: `${field}_tgl_min${type}`, minWidth: '100px', disableFilters: true, show: true, },
      { Header: `Max (${satuan})`, accessor: `${field}_max${type}`, minWidth: '100px', disableFilters: true, show: true, customClass: "" },
      { Header: 'Tgl Max', accessor: `${field}_tgl_max${type}`, minWidth: '100px', disableFilters: true, show: true, customClass: "" },
      { Header: `AVG (${satuan})`, accessor: `${field}_avg${type}`, minWidth: '100px', disableFilters: true, show: true, customClass: "" },
      // { Header: 'Tgl Avg', accessor: `${field}_tgl_avg_${type}`, minWidth: '100px', disableFilters: true, show: true, customClass: "text-center" },

    ]
  }
}