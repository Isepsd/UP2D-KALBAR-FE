import { ACTION_COLUMN } from "./_more.columns.config"

export const PERTANYAAN_QRC_COLUMNS = () => {
  return [
    { Header: 'No', accessor: 'number', minWidth: '50px', disableFilters: true, show: true },
    { Header: 'Pertanyaan', accessor: 'pertanyaan_qrc', minWidth: '150px', show: true, disableFilters: true, },
    { Header: 'Point', accessor: 'pertanyaan_qrc_point', minWidth: '150px', show: true, disableFilters: true, },
    ...ACTION_COLUMN(),
  ]
}

export const PERTANYAAN_QRC_SELECTION_COLUMNS = () => {
  return [
    { Header: 'No', accessor: 'number', minWidth: '50px', disableFilters: true, show: true },
    { Header: 'Pertanyaan', accessor: 'pertanyaan_qrc', minWidth: '150px', show: true, disableFilters: true, }
  ]
}

export const LARANGAN_TANGGUNG_JAWAB_COLUMNS = () => {
  return [
    { Header: 'No', accessor: 'number', minWidth: '50px', disableFilters: true, show: true },
    { Header: 'Uraian', accessor: 'uraian', minWidth: '150px', show: true, disableFilters: true, },
    ...ACTION_COLUMN(),
  ]
}

export const APPROVAL_MANAGEMENT_COLUMNS = () => {
  return [
    { Header: 'No', accessor: 'number', width: '50px', disableFilters: true, show: true },
    { Header: 'Nama Pegawai', accessor: 'nama_pegawai', minWidth: '150px', show: true, disableFilters: true, },
    { Header: 'Jabatan', accessor: 'nama_jabatan', minWidth: '150px', show: true, disableFilters: true, },
    ...ACTION_COLUMN(),
  ]
}

export const WP_BAGIAN_COLUMNS = () => {
  return [
    { Header: 'No', accessor: 'number', minWidth: '50px', disableFilters: true, show: true },
    { Header: 'Nama', accessor: 'name', minWidth: '350px', show: true, disableFilters: true, },
    ...ACTION_COLUMN(),
  ]
}