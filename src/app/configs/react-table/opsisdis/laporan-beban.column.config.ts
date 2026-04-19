import moment from "moment"
import { DATE, DATETIME, GARDU_INDUK, LOAD_FAKTOR, MONTH_YEAR, MORE_BEBAN_BULAN_COLUMN, MORE_BEBAN_DAYA_AKTIF_COLUMN, MORE_BEBAN_HARIAN_COLUMN, MORE_BEBAN_TAHUN_COLUMN, NO, PENYULANG, TRAFO, YEAR, TRAFO_KTT, PEMBANGKIT, UNIT_PEMBANGKIT, DAYA_AKTIF, MORE_BEBAN_TEGANGAN_HARIAN_COLUMN } from "../_more.columns.config"

export const PUNCAK_BULANAN_DATE_COLUMN = () => {
  let column = []
  const dateStartOfMonth = parseInt(moment().startOf('month').format('D'));
  const dateEndOfMonth = parseInt(moment().endOf('month').format('DD'));

  for (let index = dateStartOfMonth; index <= dateEndOfMonth; index++) {
    column.push({
      Header: `${index < 10 ? '0' + index : index}`, accessor: `${index}`, minWidth: '150px', disableFilters: true, canFilter: false, show: true, enabled: false, customClass: 'no-event text-center', columns: [
        { Header: 'Siang', accessor: `${index}_siang`, show: true, disableFilters: true, allowEditing: true, allowUpdating: true, minWidth: 100, enabled: false },
        { Header: 'Malam', accessor: `${index}_malam`, show: true, disableFilters: true, allowEditing: true, allowUpdating: true, minWidth: 100, enabled: false },
      ]
    })
  }

  return column
}


export const DAFTAR_PENGUKURAN_BEBAN_COLUMN = () => {
  return [
    ...NO(),
    { Header: 'Tanggal', accessor: 'tanggal', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Gardu Induk', accessor: 'gi', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Trafo', accessor: 'no_trafo', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Penyulang', accessor: 'penyulang', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Pengukuran', accessor: 'pengukuran', minWidth: '150px', disableFilters: true, show: true },
  ]
}

export const BEBAN_AREA_PERJAM_COLUMN = () => {
  return [
    ...NO(),
    ...DATETIME(),
    { Header: 'UP3', accessor: 'up3', minWidth: '150px', disableFilters: true, show: true, fixed: true },
    ...BEBAN_PERJAM()
  ]
}

export const BEBAN_UID_PERJAM_COLUMN = () => {
  return [
    ...NO(),
    ...DATETIME(),
    { Header: 'Unit Induk', accessor: 'uid', minWidth: '150px', disableFilters: true, show: true, fixed: true },
    ...BEBAN_PERJAM_UID()
  ]
}
export const BEBAN_UID_HARIAN_COLUMN = () => {
  return [
    ...NO(),
    ...DATE(),
    { Header: 'Unit Induk', accessor: 'uid', minWidth: '150px', disableFilters: true, show: true, fixed: true },
    ...MORE_BEBAN_DAYA_AKTIF_COLUMN(),
    ...LOAD_FAKTOR()
  ]
}

export const BEBAN_UID_BULANAN_COLUMN = () => {
  return [
    ...NO(),
    ...MONTH_YEAR(),
    { Header: 'Unit Induk', accessor: 'uid', minWidth: '150px', disableFilters: true, show: true, fixed: true },
    ...MORE_BEBAN_DAYA_AKTIF_COLUMN(),
    ...LOAD_FAKTOR(),
  ]
}
export const BEBAN_UID_TAHUNAN_COLUMN = () => {
  return [
    ...NO(),
    ...YEAR(),

    { Header: 'Unit Induk', accessor: 'uid', minWidth: '150px', disableFilters: true, show: true, fixed: true },

    ...MORE_BEBAN_DAYA_AKTIF_COLUMN(),
    ...LOAD_FAKTOR(),
  ]
}

export const BEBAN_PUNCAK_BULANAN_AREA_COLUMN = () => {
  return [
    ...NO(),
    ...MONTH_YEAR(),
    ...GARDU_INDUK(),
    ...TRAFO(),
    ...BEBAN_LAPORAN_BULANAN(),
  ]
}

export const BEBAN_PUNCAK_TAHUNAN_AREA_COLUMN = () => {
  return [
    ...NO(),
    ...YEAR(),
    ...GARDU_INDUK(),
    ...TRAFO(),
    ...BEBAN_LAPORAN_BULANAN(),
  ]
}

export const LAPORAN_BEBAN_AREA_LOAD_FAKTOR = () => {
  return [
    ...NO(),
    { Header: 'UP3', accessor: 'area', show: true, disableFilters: true, minWidth: 140 },
    { Header: 'Tanggal', accessor: 'date', show: true, disableFilters: true, minWidth: 140 },
    { Header: 'AVG (MW)', accessor: 'avg', minWidth: 150, show: true, disableFilters: true },
    { Header: 'Max (MW)', accessor: 'max', minWidth: 150, show: true, disableFilters: true },
    ...LOAD_FAKTOR()
  ]
}

// const Hour30M = () => {
//   let result = []
//   for (let index = 0; index < 24; index++) {
//     const header = index < 10 ? '0' + index : index
//     result.push({ Header: `${header}:00`, accessor: `${header}_00`, minWidth: '150px', disableFilters: true, show: true })
//     result.push({ Header: `${header}:30`, accessor: `${header}_30`, minWidth: '150px', disableFilters: true, show: true })
//   }

//   return result
// }

export const BEBAN_HARIAN_COLUMN = () => {
  return [
    ...NO(),
    ...DATE(),

    { Header: 'UP3', accessor: 'up3', minWidth: '150px', disableFilters: true, show: true, fixed: true },

    ...MORE_BEBAN_DAYA_AKTIF_COLUMN(),
    ...LOAD_FAKTOR()
  ]
}
export const BEBAN_BULANAN_COLUMN = () => {
  return [
    ...NO(),
    ...MONTH_YEAR(),

    { Header: 'UP3', accessor: 'up3', minWidth: '150px', disableFilters: true, show: true, fixed: true },

    ...MORE_BEBAN_DAYA_AKTIF_COLUMN(),
    ...LOAD_FAKTOR(),
  ]
}

export const BEBAN_UP2B_BULANAN_COLUMN = () => {
  return [
    ...NO(),
    ...MONTH_YEAR(),

    { Header: 'UP2B', accessor: 'up2b', minWidth: '150px', disableFilters: true, show: true, fixed: true },

    ...MORE_BEBAN_HARIAN_COLUMN(),
    ...LOAD_FAKTOR(),
  ]
}
export const BEBAN_TAHUNAN_COLUMN = () => {
  return [
    ...NO(),
    ...YEAR(),

    { Header: 'UP3', accessor: 'up3', minWidth: '150px', disableFilters: true, show: true },

    ...MORE_BEBAN_DAYA_AKTIF_COLUMN(),
    ...LOAD_FAKTOR(),
  ]
}


export const BEBAN_HARIAN_UP2B_COLUMN = () => {
  return [
    ...NO(),
    ...DATE(),

    { Header: 'UP2B', accessor: 'up2b', minWidth: '150px', disableFilters: true, show: true, fixed: true },

    ...MORE_BEBAN_DAYA_AKTIF_COLUMN(),
    ...LOAD_FAKTOR(),
  ]
}

export const BEBAN_UP2B_PERJAM_COLUMN = () => {
  return [
    ...NO(),
    ...DATETIME(),

    { Header: 'UP2B', accessor: 'up2b', minWidth: '150px', disableFilters: true, show: true, fixed: true },
    ...BEBAN_PERJAM()
  ]
}

export const BEBAN_PUNCAK_BULANAN_UP2B_COLUMN = () => {
  return [
    ...NO(),
    ...MONTH_YEAR(),

    { Header: 'UP2B', accessor: 'up2b', minWidth: '150px', disableFilters: true, show: true, fixed: true },

    ...MORE_BEBAN_DAYA_AKTIF_COLUMN(),
    ...LOAD_FAKTOR(),
  ]
}

export const BEBAN_PUNCAK_TAHUNAN_UP2B_COLUMN = () => {
  return [
    ...NO(),
    ...YEAR(),

    { Header: 'UP2B', accessor: 'up2b', minWidth: '150px', disableFilters: true, show: true, fixed: true },

    ...MORE_BEBAN_DAYA_AKTIF_COLUMN(),
    ...LOAD_FAKTOR(),
  ]
}

export const FAKTOR_HARIAN_BULANAN_COLUMN = () => {
  return [
    { Header: 'UP3', accessor: 'area', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Avg (MW)', accessor: 'avg', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Max (MW)', accessor: 'max', minWidth: '150px', disableFilters: true, show: true },
    ...LOAD_FAKTOR()
  ]
}

export const LOAD_FAKTOR_HARIAN_COLUMN = () => {
  return [
    ...NO(),
    { Header: 'Tanggal', accessor: 'tgl', minWidth: '150px', disableFilters: true, show: true },
    ...FAKTOR_HARIAN_BULANAN_COLUMN()
  ]
}

export const LOAD_FAKTOR_BULANAN_COLUMN = () => {
  return [
    ...NO(),
    { Header: 'Tahun-Bulan', accessor: 'thn_bln', minWidth: '150px', disableFilters: true, show: true },
    ...FAKTOR_HARIAN_BULANAN_COLUMN()
  ]
}

export const LAPORAN_BEBAN_PENYULANG_JAM = () => {
  return [
    ...NO(),
    ...DATETIME(),
    ...GARDU_INDUK(),
    // ...KODE_PENYULANG(),
    ...PENYULANG(),
    { Header: 'UP3', accessor: 'up3', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'ULP', accessor: 'ulp', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Pemilik', accessor: 'pemilik', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Tegangan (kV)', accessor: 'v', minWidth: '150px', disableFilters: true, show: true },
    ...BEBAN_PERJAM(),
    // { Header: 'Load Faktor', accessor: 'load_faktor', show: true, disableFilters: true, allowEditing: true, allowUpdating: true, minWidth: 140, enabled: false, customClass: "text-center" },
  ]
}


export const LAPORAN_BEBAN_PENYULANG_HARI = () => {
  return [
    ...NO(),
    ...DATE(),
    ...GARDU_INDUK(),
    // ...KODE_PENYULANG(),
    ...PENYULANG(),

    { Header: 'UP3', accessor: 'up3', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'ULP', accessor: 'ulp', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Pemilik', accessor: 'pemilik', minWidth: '150px', disableFilters: true, show: true },
    ...MORE_BEBAN_TEGANGAN_HARIAN_COLUMN(),
    ...MORE_BEBAN_HARIAN_COLUMN(),
    // ...LOAD_FAKTOR(),
  ]
}


export const LAPORAN_BEBAN_PENYULANG_BULAN = () => {
  return [
    ...NO(),
    ...MONTH_YEAR(),
    ...GARDU_INDUK(),
    // ...KODE_PENYULANG(),
    ...PENYULANG(),

    { Header: 'UP3', accessor: 'up3', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'ULP', accessor: 'ulp', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Pemilik', accessor: 'pemilik', minWidth: '150px', disableFilters: true, show: true },
    ...MORE_BEBAN_TEGANGAN_HARIAN_COLUMN(),
    ...MORE_BEBAN_BULAN_COLUMN(),
    // ...LOAD_FAKTOR(),
  ]
}

export const LAPORAN_BEBAN_PENYULANG_TAHUN = () => {
  return [
    ...NO(),
    ...YEAR(),

    ...GARDU_INDUK(),
    // ...KODE_PENYULANG(),
    ...PENYULANG(),
    { Header: 'UP3', accessor: 'up3', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'ULP', accessor: 'ulp', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Pemilik', accessor: 'pemilik', minWidth: '150px', disableFilters: true, show: true },
    ...MORE_BEBAN_TEGANGAN_HARIAN_COLUMN(),
    ...MORE_BEBAN_TAHUN_COLUMN(),
    // ...LOAD_FAKTOR(),
  ]
}

export const LAPORAN_BEBAN_PENYULANG_LOAD_FAKTOR = () => {
  return [
    ...NO(),
    ...PENYULANG(),
    { Header: 'Tanggal', accessor: 'date', show: true, disableFilters: true, minWidth: 140 },
    { Header: 'AVG(MW)', accessor: 'avg', minWidth: 150, show: true, disableFilters: true },
    { Header: 'Max(MW)', accessor: 'max', minWidth: 150, show: true, disableFilters: true },
    ...LOAD_FAKTOR(),
  ]
}

export const BEBAN_PEMBANGKIT_PERJAM_COLUMN = () => {
  return [
    ...NO(),
    ...DATETIME(),
    ...UNIT_PEMBANGKIT(),
    ...PEMBANGKIT(),
    ...DAYA_AKTIF()
  ]
}
export const BEBAN_PEMBANGKIT_HARIAN_COLUMN = () => {
  return [
    ...NO(),
    ...DATE(),
    ...UNIT_PEMBANGKIT(),
    ...PEMBANGKIT(),
    ...MORE_BEBAN_DAYA_AKTIF_COLUMN(),
  ]
}
export const BEBAN_PEMBANGKIT_BULANAN_COLUMN = () => {
  return [
    ...NO(),
    ...MONTH_YEAR(),
    ...UNIT_PEMBANGKIT(),
    ...PEMBANGKIT(),
    ...MORE_BEBAN_DAYA_AKTIF_COLUMN(),
  ]
}
export const BEBAN_PEMBANGKIT_TAHUNAN_COLUMN = () => {
  return [
    ...NO(),
    ...YEAR(),
    ...UNIT_PEMBANGKIT(),
    ...PEMBANGKIT(),
    ...MORE_BEBAN_DAYA_AKTIF_COLUMN(),
  ]
}

export const BEBAN_SUBSISTEM_PERJAM_COLUMN = () => {
  return [
    ...NO(),
    ...DATETIME(),

    { Header: 'Sub Sistem', accessor: 'subsistem', minWidth: '150px', disableFilters: true, show: true, fixed: true },
    ...BEBAN_PERJAM_SS()
  ]
}

export const BEBAN_PERJAM = () => {
  return [
    { Header: 'Arus (A)', accessor: 'i', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Daya Aktif (MW)', accessor: 'p', minWidth: '150px', disableFilters: true, show: true }
  ]
}

export const BEBAN_PERJAM_SS = () => {
  return [
    { Header: 'Daya Aktif (MW)', accessor: 'p', minWidth: '150px', disableFilters: true, show: true }
  ]
}

export const BEBAN_PERJAM_UID = () => {
  return [
    { Header: 'Daya Aktif (MW)', accessor: 'p', minWidth: '150px', disableFilters: true, show: true }
  ]
}



export const BEBAN_SUBSISTEM_HARIAN_COLUMN = () => {
  return [
    ...NO(),
    ...DATE(),

    { Header: 'Sub Sistem', accessor: 'subsistem', minWidth: '150px', disableFilters: true, show: true, fixed: true },

    ...MORE_BEBAN_DAYA_AKTIF_COLUMN(),
    ...LOAD_FAKTOR(),
  ]
}

export const BEBAN_PUNCAK_BULANAN_SUBSISTEM_COLUMN = () => {
  return [
    ...NO(),
    ...MONTH_YEAR(),

    { Header: 'Sub Sistem', accessor: 'subsistem', minWidth: '150px', disableFilters: true, show: true, fixed: true },

    ...MORE_BEBAN_DAYA_AKTIF_COLUMN(),
    ...LOAD_FAKTOR(),
  ]
}
export const BEBAN_PUNCAK_TAHUNAN_SUBSISTEM_COLUMN = () => {
  return [
    ...NO(),
    ...YEAR(),

    { Header: 'Sub Sistem', accessor: 'subsistem', minWidth: '150px', disableFilters: true, show: true, fixed: true },

    ...MORE_BEBAN_DAYA_AKTIF_COLUMN(),
    ...LOAD_FAKTOR(),
  ]
}



export const BEBAN_TRAFOGI_PERJAM_COLUMN = () => {
  return [
    ...NO(),
    ...DATETIME(),
    ...GARDU_INDUK(),
    ...TRAFO_KTT(),
    { Header: 'Jenis Layanan', accessor: 'jenis_layanan', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Kapasitas Trafo', accessor: 'kapasitas', minWidth: '150px', disableFilters: true, show: true },
    ...BEBAN_PERJAM()

  ]
}


export const BEBAN_TRAFOGI_HARIAN_COLUMN = () => {
  return [
    ...NO(),
    ...DATE(),

    ...GARDU_INDUK(),
    ...TRAFO(),
    ...MORE_BEBAN_HARIAN_COLUMN(),
    ...LOAD_FAKTOR()
  ]
}

export const BEBAN_TRAFOGI_PUNCAK_BULANAN_COLUMN = () => {
  return [
    ...NO(),
    ...MONTH_YEAR(),

    ...GARDU_INDUK(),
    ...TRAFO(),
    ...MORE_BEBAN_HARIAN_COLUMN(),
    ...LOAD_FAKTOR(),
  ]
}

export const BEBAN_TRAFOGI_PUNCAK_TAHUNAN_COLUMN = () => {
  return [
    ...NO(),
    ...YEAR(),

    ...GARDU_INDUK(),
    ...TRAFO(),
    ...MORE_BEBAN_HARIAN_COLUMN(),
    ...LOAD_FAKTOR(),

  ]
}


export const LAPORAN_BEBAN_TRAFO_LOAD_FAKTOR = () => {
  return [
    ...NO(),
    { Header: 'Tanggal', accessor: 'date', show: true, disableFilters: true, minWidth: 140 },
    { Header: 'Gardu Induk', accessor: 'ref_lokasi_gi', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Trafo', accessor: 'trafo', show: true, disableFilters: true, minWidth: 140 },
    { Header: 'AVG(MW)', accessor: 'avg', minWidth: 150, show: true, disableFilters: true },
    { Header: 'Max(MW)', accessor: 'max', minWidth: 150, show: true, disableFilters: true },
    { Header: 'Load Faktor', accessor: 'load_faktor', minWidth: 150, show: true, disableFilters: true },
  ]
}

export const BEBAN_TRAFOGI_REKAP_BEBAN_TRAFO_COLUMN = () => {
  return [
    ...NO(),
    { Header: 'Tahun-Bulan', accessor: 'thn_bln', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Gardu Induk', accessor: 'gi', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Trafo', accessor: 'no_trafo', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'I. Setting (A)', accessor: 'i_setting_a', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Max Arus', accessor: 'max_arus', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Tanggal Beban Max', accessor: 'tgl_beban_max', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Beban Max (A)', accessor: 'beban_max_a', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Beban Max (MW)', accessor: 'beban_max_mw', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Beban Max (%)', accessor: 'beban_max_percent', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Tanggal Beban Min', accessor: 'tgl_beban_min', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Beban Min (A)', accessor: 'beban_min_a', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Beban Min (MW)', accessor: 'beban_min_mw', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Beban Min (%)', accessor: 'beban_min_percent', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Beban Rata-Rata (MW)', accessor: 'beban_rata_mw', minWidth: '190px', disableFilters: true, show: true },
  ]
}

export const BEBAN_LAPORAN_HARIAN = () => {
  return [
    { Header: 'Beban Max(MW)', accessor: 'p_max', minWidth: '170px', disableFilters: true, show: true },
    { Header: 'Beban Rata-Rata(MW)', accessor: 'p_avg', minWidth: '200px', disableFilters: true, show: true },
    { Header: 'Beban Max Siang(MW)', accessor: 'p_max_siang', minWidth: '200px', disableFilters: true, show: true },
    { Header: 'Beban Max Malam(MW)', accessor: 'p_max_malam', minWidth: '200px', disableFilters: true, show: true },

    { Header: 'Arus Max(A)', accessor: 'i_max', minWidth: '120px', disableFilters: true, show: true },
    { Header: 'Arus Rata-Rata(A)', accessor: 'i_avg', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Arus Max Siang(A)', accessor: 'i_max_siang', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Arus Max Malam(A)', accessor: 'i_max_malam', minWidth: '180px', disableFilters: true, show: true },
    // { Header: 'P Tgl Max Siang', accessor: 'p_tgl_max_siang', minWidth: '150px', disableFilters: true, show: true },
    // { Header: 'P Tgl Max Malam', accessor: 'p_tgl_max_malam', minWidth: '160px', disableFilters: true, show: true },
    // { Header: 'P Tgl Max ', accessor: 'p_tgl_max', minWidth: '100px', disableFilters: true, show: true },
    // { Header: 'Load Faktor', accessor: 'avg', minWidth: '100px', disableFilters: true, show: true },
  ]
}
export const BEBAN_LAPORAN_BULANAN = () => {
  return [
    { Header: 'Beban Max(MW)', accessor: 'p_max', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Beban Rata-Rata(MW)', accessor: 'p_avg', minWidth: '200px', disableFilters: true, show: true },
    { Header: 'Beban Max Siang(MW)', accessor: 'p_max_siang', minWidth: '200px', disableFilters: true, show: true },
    { Header: 'Beban Max Malam(MW)', accessor: 'p_max_malam', minWidth: '200px', disableFilters: true, show: true },

    { Header: 'Arus Max(A)', accessor: 'i_max', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Arus Rata-Rata(A)', accessor: 'i_avg', minWidth: '200px', disableFilters: true, show: true },
    { Header: 'Arus Max Siang(A)', accessor: 'i_max_siang', minWidth: '200px', disableFilters: true, show: true },
    { Header: 'Arus Max Malam(A)', accessor: 'i_max_malam', minWidth: '200px', disableFilters: true, show: true },
  ]
}

export const TEGANGAN_PERJAM_COLUMN = () => {
  return [
    ...NO(),
    ...DATETIME(),

    ...GARDU_INDUK(),
    ...TRAFO(),
    { Header: 'Tegangan (kV)', accessor: 'v', minWidth: '150px', disableFilters: true, show: true },
  ]
}


export const TEGANGAN_HARIAN_COLUMN = () => {
  return [
    ...NO(),
    ...DATE(),

    ...GARDU_INDUK(),
    ...TRAFO(),
    ...TEGANGAN_BEBAN(),
  ]
}

export const TEGANGAN_PUNCAK_BULANAN_COLUMN = () => {
  return [
    ...NO(),
    ...MONTH_YEAR(),

    ...GARDU_INDUK(),
    ...TRAFO(),
    ...TEGANGAN_BEBAN(),

  ]
}

export const TEGANGAN_PUNCAK_TAHUNAN_COLUMN = () => {
  return [
    ...NO(),
    ...YEAR(),

    ...GARDU_INDUK(),
    ...TRAFO(),
    ...TEGANGAN_BEBAN(),

  ]
}

export const TEGANGAN_BEBAN = () => {
  return [

    {
      Header: 'Tegangan (kV)', minWidth: '100px', disableFilters: true, show: true,
      columns: [
        { Header: 'Min', accessor: 'v_min', minWidth: '100px', disableFilters: true, show: true },

        { Header: 'Tanggal Min', accessor: 'tgl_v_min', minWidth: '120px', disableFilters: true, show: true },
        { Header: 'Max', accessor: 'v_max', minWidth: '100px', disableFilters: true, show: true },

        { Header: 'Tanggal Max', accessor: 'tgl_v_max', minWidth: '120px', disableFilters: true, show: true },

      ]
    },
    {
      Header: 'Threshold (kali)', minWidth: '100px', disableFilters: true, show: true,
      columns: [
        { Header: 'Range >=20,2 s.d <=20,7', accessor: 'v_jlh_normal', minWidth: '200px', disableFilters: true, show: true },
        { Header: '< 20,2', accessor: 'v_jlh_kurang', minWidth: '100px', disableFilters: true, show: true },
        { Header: '> 20,7', accessor: 'v_jlh_lebih', minWidth: '100px', disableFilters: true, show: true },

      ]
    },


  ]
}