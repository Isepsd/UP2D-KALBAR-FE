import { NO } from "../../_more.columns.config"

export const LAPORAN_GANGGUAN = () => {
  return [
    ...NO(),
    { Header: 'Tanggal Laporan', accessor: 'area', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Durasi Gangguan ', accessor: 'jlh_gangguan', minWidth: '170px', disableFilters: true, show: true },
    { Header: 'Titik Gangguan', accessor: 'gi', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Status ', accessor: 'penyulang', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Ringkasan Masalah', accessor: 'tgl_gangguan', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Photo', accessor: 'tgl_nyala_jaringan', minWidth: '220px', disableFilters: true, show: true },
    { Header: 'Prioritas', accessor: 'durasi', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Pelapor', accessor: 'penyebab', minWidth: '200px', disableFilters: true, show: true },
    { Header: 'Unit Pelapor', accessor: 'keterangan', minWidth: '200px', disableFilters: true, show: true },
  ]
}