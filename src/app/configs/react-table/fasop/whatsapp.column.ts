// import { ACTION_COLUMN } from "../_more.columns.config"


export const WHATSAPP_LOG_COLUMNS = () => {
  return [
    { Header: 'No', accessor: 'number', minWidth: '3%', show: true, disableFilters: true },
    { Header: 'Tanggal Kirim', accessor: 'datum_sent', minWidth: 150, show: true, disableFilters: true },
    { Header: 'Nama Bot', accessor: 'nama_bot', minWidth: 150, show: true, disableFilters: true },
    { Header: 'Nama Group', accessor: 'nama_kontak', minWidth: 150, show: true, disableFilters: true },
    { Header: 'Pesan', accessor: 'msg', minWidth: 500, show: true, disableFilters: true },
    { Header: 'Status Kirim', accessor: 'status_sent', minWidth: 150, show: true, disableFilters: true },
    { Header: 'Pesan Error', accessor: 'pesan_error', minWidth: 150, show: true, disableFilters: true },
    // { Header: 'Nama Chat', accessor: 'nama_chat', minWidth: '30%', show: true, disableFilters: true },
    // { Header: 'Bot', accessor: 'id_wa_bot', minWidth: '20%', show: true, disableFilters: true },
    // { Header: 'Msg', accessor: 'msg', minWidth: '100px', show: true, disableFilters: true },
    // { Header: 'Pesan Eror', accessor: 'pesan_error', minWidth: '100px', show: true, disableFilters: true },
    // { Header: 'Kirim Ulang', accessor: 'kirim_ulang', minWidth: '100px', show: true, disableFilters: true },
    // { Header: 'Status', accessor: 'status', minWidth: '100px', show: true, disableFilters: true },
    // ...ACTION_COLUMN(),
  ]
}

export const WHATSAPP_LOG_COLUMNS_JQX = () => {
  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'datum_sent', type: 'string' },
      { name: 'nama_bot', type: 'string' },
      { name: 'nama_kontak', type: 'string' },
      { name: 'msg', type: 'string' },
      { name: 'status_sent', type: 'string' },
      { name: 'pesan_error', type: 'string' }

    ],
    columns: [
      { text: 'NO', datafield: 'number', width: '3%', editable: false, },
      { text: 'Tanggal Kirim', datafield: 'datum_sent', width: '17%', editable: false, },
      { text: 'Nama Bot', datafield: 'nama_bot', width: '15%', editable: false, },
      { text: 'Nama Group', datafield: 'nama_kontak', width: '15%', editable: false, },
      { text: 'Pesan', datafield: 'msg', width: '20%', editable: false, },
      { text: 'Status Kirim', datafield: 'status_sent', width: '15%', editable: false, },
      { text: 'Pesan Error', datafield: 'pesan_error', width: '15%', editable: false, }

    ],
  };
};