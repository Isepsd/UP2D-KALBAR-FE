import { NO } from "../../_more.columns.config"

export const GANGGUAN_PENYULANG_HARIAN = () => {
  return [
    ...NO(),
    { Header: 'UP3', accessor: 'area', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Jumlah Gangguan', accessor: 'jlh_gangguan', minWidth: '170px', disableFilters: true, show: true },
    { Header: 'GI', accessor: 'gi', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Penyulang', accessor: 'penyulang', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Tanggal Gangguan', accessor: 'tgl_gangguan', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Tanggal Nyala Jaringan', accessor: 'tgl_nyala_jaringan', minWidth: '220px', disableFilters: true, show: true },
    { Header: 'Lama Padam', accessor: 'durasi', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Penyebab Gangguan', accessor: 'penyebab', minWidth: '200px', disableFilters: true, show: true },
    { Header: 'Keterangan Gangguan', accessor: 'keterangan', minWidth: '200px', disableFilters: true, show: true },
  ]
}

export const GANGGUAN_TRAFO_DIST_HARIAN = () => {
  return [
    ...NO(),
    { Header: 'UP3', accessor: 'area', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'GI', accessor: 'gi', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Penyulang', accessor: 'penyulang', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'No GGN', accessor: 'no_ggn', minWidth: '170px', disableFilters: true, show: true },
    { Header: 'Segmen Gardu', accessor: 'segmen_gardu', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Tanggal Gangguan', accessor: 'tgl_gangguan', minWidth: '220px', disableFilters: true, show: true },
    { Header: 'Panjang Kabel', accessor: 'pjg_kabel', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Hasil Deteksi', accessor: 'hsl_detek', minWidth: '200px', disableFilters: true, show: true },
  ]
}