import { NO } from "../_more.columns.config"

export const GRAFIK_SUBSISTEM = () => [
  { Header: 'Subsistem', accessor: 'subsistem', disableFilters: true, show: true },
  { Header: '00:00', accessor: 'grafik_0000', disableFilters: true, show: true },
  { Header: '00:30', accessor: 'grafik_0030', disableFilters: true, show: true },
  { Header: '01:00', accessor: 'grafik_0100', disableFilters: true, show: true },
]

export const DETAIL_PENYULANG_COLUMN = () => [
  ...NO(),
  { Header: 'GI', accessor: 'gi', disableFilters: true, show: true },
  { Header: 'Trafo', accessor: 'no_trafo', disableFilters: true, show: true },
  { Header: 'Penyulang', accessor: 'penyulang', disableFilters: true, show: true },
  { Header: 'Tanggal Update', accessor: 'tgl_update', disableFilters: true, show: true },
  { Header: 'Beban (MW)', accessor: 'beban_mw', disableFilters: true, show: true },
  { Header: 'Beban (A)', accessor: 'beban_a', disableFilters: true, show: true },
  { Header: 'Status Data', accessor: 'status_data', disableFilters: true, show: true },
]