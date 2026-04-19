import moment from "moment"
import { NO } from "../_more.columns.config"

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

//  ---- Start Column Beban Area / UP3 ----- //
export const BEBAN_AREA_COLUMN = () => {
  return [
    ...NO(),
    { Header: 'Tanggal', accessor: 'datum', minWidth: '100px', disableFilters: true, show: true },
    { Header: 'UP3', accessor: 'up3', minWidth: '150px', disableFilters: true, show: true },
    ...BEBAN_PERJAM()
  ]
}

export const BEBAN_AREA_HARIAN_BULANAN_TAHUNAN_COLUMN = () => {
  return [
    ...NO(),
    { Header: 'Tanggal', accessor: 'datum', minWidth: '100px', disableFilters: true, show: true },
    { Header: 'UP3', accessor: 'up3', minWidth: '150px', disableFilters: true, show: true },
    ...BEBAN_PUNCAK()
  ]
}
//  ---- End Column Beban Area / UP3 ----- //

export const LAPORAN_BEBAN_PENYULANG = () => {
  return [
    ...NO(),
    { Header: 'Tanggal', accessor: 'datum', minWidth: '100px', disableFilters: true, show: true },
    { Header: 'Gardu Induk', accessor: 'gi', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Penyulang', accessor: 'penyulang', minWidth: '150px', disableFilters: true, show: true },
    ...BEBAN_PERJAM()
  ]
}

export const LAPORAN_BEBAN_HARIAN_BULANAN_TAHUNAN_PENYULANG = () => {
  return [
    ...NO(),
    { Header: 'Tanggal', accessor: 'datum', minWidth: '100px', disableFilters: true, show: true },
    { Header: 'Gardu Induk', accessor: 'gi', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Penyulang', accessor: 'penyulang', minWidth: '150px', disableFilters: true, show: true },
    ...BEBAN_PUNCAK()
  ]
}

export const BEBAN_UP2B_COLUMN = () => {
  return [
    ...NO(),
    { Header: 'Tanggal', accessor: 'datum', minWidth: '100px', disableFilters: true, show: true },
    { Header: 'UP2B', accessor: 'up2b', minWidth: '150px', disableFilters: true, show: true },
    ...BEBAN_PERJAM()
  ]
}

export const BEBAN_UP2B_HARIAN_BULANAN_TAHUNAN_COLUMN = () => {
  return [
    ...NO(),
    { Header: 'Tanggal', accessor: 'datum', minWidth: '100px', disableFilters: true, show: true },
    { Header: 'UP2B', accessor: 'up2b', minWidth: '150px', disableFilters: true, show: true },
    ...BEBAN_PUNCAK()
  ]
}

export const BEBAN_UID_COLUMN = () => {
  return [
    ...NO(),
    { Header: 'Tanggal', accessor: 'datum', minWidth: '100px', disableFilters: true, show: true },
    { Header: 'Unit Induk', accessor: 'uid', minWidth: '150px', disableFilters: true, show: true },
    ...BEBAN_PERJAM()
  ]
}

export const BEBAN_UID_HARIAN_BULANAN_TAHUNAN_COLUMN = () => {
  return [
    ...NO(),
    { Header: 'Tanggal', accessor: 'datum', minWidth: '100px', disableFilters: true, show: true },
    { Header: 'Unit Induk', accessor: 'uid', minWidth: '150px', disableFilters: true, show: true },
    ...BEBAN_PUNCAK()
  ]
}

export const BEBAN_SUBSISTEM_COLUMN = () => {
  return [
    ...NO(),
    { Header: 'Tanggal', accessor: 'tanggal', minWidth: '100px', disableFilters: true, show: true },
    { Header: 'Sub Sistem', accessor: 'subsistem', minWidth: '150px', disableFilters: true, show: true },
    ...BEBAN_PERJAM()
  ]
}

export const BEBAN_SUBSISTEM_HARIAN_BULANAN_TAHUNAN_COLUMN = () => {
  return [
    ...NO(),
    { Header: 'Tanggal', accessor: 'tanggal', minWidth: '100px', disableFilters: true, show: true },
    { Header: 'Sub Sistem', accessor: 'subsistem', minWidth: '150px', disableFilters: true, show: true },
    ...BEBAN_PUNCAK()
  ]
}

export const BEBAN_TRAFOGI_COLUMN = () => {
  return [
    ...NO(),
    { Header: 'Tanggal', accessor: 'datum', minWidth: '100px', disableFilters: true, show: true },
    { Header: 'Gardu Induk', accessor: 'gi', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Trafo', accessor: 'trafo', minWidth: '150px', disableFilters: true, show: true },
    ...BEBAN_PERJAM()
  ]
}

export const BEBAN_TRAFOGI_HARIAN_BULANAN_TAHUNAN_COLUMN = () => {
  return [
    ...NO(),
    { Header: 'Tanggal', accessor: 'datum', minWidth: '100px', disableFilters: true, show: true },
    { Header: 'Gardu Induk', accessor: 'ref_lokasi_gi', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Trafo', accessor: 'ref_lokasi_trafo_gi', minWidth: '150px', disableFilters: true, show: true },
    ...BEBAN_PUNCAK()
  ]
}

export const BEBAN_PERJAM = () => {
  return [
    { Header: 'Arus (A)', accessor: 'i', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Daya Aktif (MW)', accessor: 'p', minWidth: '150px', disableFilters: true, show: true }
  ]
}

export const BEBAN_PUNCAK = () => {
  return [
    { Header: 'Arus (A)', accessor: 'i_value', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Daya Aktif (MW)', accessor: 'p_value', minWidth: '150px', disableFilters: true, show: true }
  ]
}

