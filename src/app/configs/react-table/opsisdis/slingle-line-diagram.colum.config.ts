// import { ACTION_COLUMN } from "../_more.columns.config"

export const GARDU_INDUK_COLUMN = () => {
  return [
    { Header: 'Gardu Induk', accessor: 'gi', minWidth: '150px', disableFilters: true, show: true },
    // ...ACTION_COLUMN()
  ]
}

export const SLD_COLUMN = () => {
  return [
    { Header: 'Nama File', accessor: 'keterangan', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Tanggal Upload', accessor: 'tgl_upload', minWidth: '150px', disableFilters: true, show: true },
    // ...ACTION_COLUMN()
  ]
}