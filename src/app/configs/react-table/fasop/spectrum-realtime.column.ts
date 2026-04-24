export const REKAP_OOP_SAAT_INI_COLUMNS = () => {
  return [
    { Header: 'No', accessor: 'number', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Nama', accessor: 'nama', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Jumlah', accessor: 'jumlah', minWidth: '150px', disableFilters: true, show: true },
  ]
}

export const SCADATEL_STATUS_RTU_COLUMN_JQX = () => {
  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'point_number', type: 'string' },
      { name: 'nama_pointtype', type: 'string' },
      { name: 'path1', type: 'string' },
      { name: 'path2', type: 'string' },
      { name: 'path3', type: 'string' },
      { name: 'path4', type: 'string' },
      { name: 'path5', type: 'string' },
      { name: 'status_2', type: 'string' },
      { name: 'datum_2', type: 'string' },
      { name: 'value', type: 'string' },
      { name: 'durasi', type: 'string' },
      { name: 'kesimpulan', type: 'string' },
    ],
    columns: [
      { text: 'NO', datafield: 'number', width: '3%', editable: false, },
      { text: 'Point Number', datafield: 'point_number', width: '17%', editable: false, },
      { text: 'Tipe Point', datafield: 'nama_pointtype', width: '17%', editable: false, },
      { text: 'B1', datafield: 'path1', width: '10%', editable: false, },
      { text: 'B2', datafield: 'path2', width: '10%', editable: false, },
      { text: 'B3', datafield: 'path3', width: '10%', editable: false, },
      { text: 'Element', datafield: 'path4', width: '6%', editable: false, },
      { text: 'Info', datafield: 'path5', width: '6%', editable: false, },
      { text: 'Value', datafield: 'value', width: '10%', editable: false, },
      { text: 'Tanggal', datafield: 'datum_2', width: '10%', editable: false, },
      { text: 'Status', datafield: 'status_2', width: '10%', editable: false, },
      { text: 'Durasi', datafield: 'durasi', width: '10%', editable: false, },
      {
        text: 'Kesimpulan',
        datafield: 'kesimpulan',
        width: '7%',
        editable: false,
        cellsRenderer: function (row: any, column: any, value: any) {
          if (value === 'INVALID') {
            return '<div style="background-color: red; color: white;">' + value + '</div>';
          } else {
            return '<div style="background-color: green; color: white;">' + value + '</div>';
          }
        }
      },
    ],
  };
};
export const REKAP_OOP_HARIAN_COLUMNS = () => {
  return [
    { Header: 'No', accessor: 'number', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Nama', accessor: 'nama', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'OOP - 08:00', accessor: 'oop_08', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'OOP - 016:00', accessor: 'oop_16', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Selisih', accessor: 'selisih', minWidth: '150px', disableFilters: true, show: true },
  ]
}

const STATUS_TGL_BERAKHIR_DURASI = () => [
  { Header: 'Status', accessor: 'status', minWidth: '150px', disableFilters: true, show: true },
  { Header: 'Tgl Terakhir', accessor: 'tgl_terakhir', minWidth: '150px', disableFilters: true, show: true },
  { Header: 'Durasi (Menit)', accessor: 'durasi', minWidth: '150px', disableFilters: true, show: true },
]

export const MASTER_COLUMNS = () => {
  return [
    { Header: 'No', accessor: 'number', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Nama', accessor: 'nama', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Group', accessor: 'group', minWidth: '150px', disableFilters: true, show: true },
    ...STATUS_TGL_BERAKHIR_DURASI()
  ]
}

export const NETWORK_COLUMNS = () => {
  return [
    { Header: 'No', accessor: 'number', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Network', accessor: 'nama', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Jenis Point', accessor: 'jenis', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Group', accessor: 'group', minWidth: '150px', disableFilters: true, show: true },
    ...STATUS_TGL_BERAKHIR_DURASI()
  ]
}

export const GARDU_INDUK_COLUMNS = () => {
  return [
    { Header: 'No', accessor: 'number', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Gardu Induk', accessor: 'gi', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Gateway', accessor: 'gateway', minWidth: '150px', disableFilters: true, show: true },
    ...STATUS_TGL_BERAKHIR_DURASI()
  ]
}

export const PENYULANG_COLUMNS = () => {
  return [
    { Header: 'No', accessor: 'number', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'B1', accessor: 'b1', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'B3', accessor: 'b3', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Element', accessor: 'element', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Value', accessor: 'value', minWidth: '150px', disableFilters: true, show: true },
    ...STATUS_TGL_BERAKHIR_DURASI()
  ]
}

export const GARDU_HUBUNG_COLUMNS = () => {
  return [
    { Header: 'No', accessor: 'number', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Gardu Hubung', accessor: 'gh', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Gateway', accessor: 'gateway', minWidth: '150px', disableFilters: true, show: true },
    ...STATUS_TGL_BERAKHIR_DURASI()
  ]
}

export const RECLOSER_COLUMNS = () => {
  return [
    { Header: 'No', accessor: 'number', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'RCL', accessor: 'rcl', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'UP3', accessor: 'area', minWidth: '150px', disableFilters: true, show: true },
    ...STATUS_TGL_BERAKHIR_DURASI()
  ]
}

export const LBS_COLUMNS = () => {
  return [
    { Header: 'No', accessor: 'number', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Gardu', accessor: 'gardu', minWidth: '150px', disableFilters: true, show: true },
    ...STATUS_TGL_BERAKHIR_DURASI()
  ]
}

export const MESSAGE_COLUMNS = () => {
  return [
    { Header: 'No', accessor: 'number', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Tanggal', accessor: 'tanggal', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'B1text', accessor: 'b1text', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'B2text', accessor: 'b2text', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'B3text', accessor: 'b3text', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Elementtext', accessor: 'elementtext', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Info', accessor: 'info', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Value', accessor: 'value', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Msgstatus', accessor: 'msgstatus', minWidth: '150px', disableFilters: true, show: true },
  ]
}

export const STATUS_DIGITAL_COLUMNS = () => {
  return [
    { Header: 'No', accessor: 'number', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Jenis Point', accessor: 'jenis', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'B1', accessor: 'b1', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'B2', accessor: 'b2', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'B3', accessor: 'b3', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Element', accessor: 'element', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Info', accessor: 'info', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Waktu', accessor: 'datetime', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Status', accessor: 'status', minWidth: '150px', disableFilters: true, show: true },
  ]
}

export const STATUS_RTU_COLUMNS = () => {
  return [
    { Header: 'No', accessor: 'number', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Jenis RTU', accessor: 'jenis_rtu', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'RTU', accessor: 'rtu', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Waktu', accessor: 'last_update', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Status', accessor: 'status', minWidth: '150px', disableFilters: true, show: true },
  ]
}

export const STATUS_MASATER_COLUMNS = () => {
  return [
    { Header: 'No', accessor: 'number', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Jenis', accessor: 'jenis', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Nama', accessor: 'nama', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Waktu', accessor: 'last_update', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Status', accessor: 'status', minWidth: '150px', disableFilters: true, show: true },
  ]
}

export const UFR_COLUMNS = () => {
  return [
    { Header: 'No', accessor: 'number', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'GI', accessor: 'gi', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Penyulang', accessor: 'penyulang', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Waktu UFR', accessor: 'datetime_ufr', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Posisi UFR', accessor: 'posisi_ufr', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Status UFR', accessor: 'status_ufr', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Waktu CB', accessor: 'datetime_cb', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Posisi CB', accessor: 'posisi_cb', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Status CB', accessor: 'status_cb', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Waktu Beban', accessor: 'datetime_beban', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Beban (MW)', accessor: 'beban', minWidth: '150px', disableFilters: true, show: true },
  ]
}