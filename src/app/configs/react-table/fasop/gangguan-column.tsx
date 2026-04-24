import { NO } from "../_more.columns.config"

export const GANGGUAN_SAAT_INI_COLUMNS = () => {
  return [
    ...NO(),
    { Header: 'Kelompok Peralatan', accessor: 'kelompok', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Jenis Peralatan', accessor: 'jenis', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Lokasi (B1)', accessor: 'path1', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Tegangan (B2)', accessor: 'path2', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Bay (B3)', accessor: 'path3', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Element', accessor: 'path4', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Info', accessor: 'path5', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Tanggal Gangguan', accessor: 'tgl_gangguan', minWidth: '180px', disableFilters: true, show: true },
    // { Header: 'Hitung Kinerja', accessor: 'kinerja', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Durasi (dd:hh:mm:ss)', accessor: 'durasi', minWidth: '180px', disableFilters: true, show: true },
  ]
}