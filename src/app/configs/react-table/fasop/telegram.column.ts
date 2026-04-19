import { NO } from "../_more.columns.config"

export const TELEGRAM_LOG_COLUMNS = () => {
  return [
    ...NO(),
    { Header: 'Tanggal Kirim', accessor: 'tgl_kirim', minWidth: '100px', show: true, disableFilters: true },
    { Header: 'Nama Bot', accessor: 'nama_bot', minWidth: '100px', show: true, disableFilters: true },
    { Header: 'Nama Grup', accessor: 'nama_chat', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Msg', accessor: 'msg', minWidth: '500px', show: true, disableFilters: true },
    { Header: 'Pesan Eror', accessor: 'pesan_error', minWidth: '100px', show: true, disableFilters: true },
    { Header: 'Kirim Ulang', accessor: 'kirim_ulang', minWidth: '100px', show: true, disableFilters: true },
    { Header: 'Status Kirim', accessor: 'status_sent', minWidth: '100px', show: true, disableFilters: true },
    // { Header: 'Status', accessor: 'status', minWidth: '100px', show: true, disableFilters: true },
  ]
}
