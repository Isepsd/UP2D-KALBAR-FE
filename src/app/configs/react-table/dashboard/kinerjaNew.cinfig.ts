// import { NO } from "../_more.columns.config"

import { DAYS, TIME_HOUR } from "../_more.columns.config"

export const RTU_OUT_OFF_FULL = () => [
 
  { Header: 'Peralatan', accessor: 'peralatan', disableFilters: true, show: true },
  { Header: 'Durasi(dd:hh:mm:ss)', accessor: 'durasi', disableFilters: true, show: true },
]
export const RTU_OUT_OFF_FULL_JQX = () => {
  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'nama_pointtype', type: 'string' },
      { name: 'durasi', type: 'string' },



    ],
    columns: [
      { text: 'NO', datafield: 'number', width: '10%' },
      { text: 'RTU GI', datafield: 'nama_pointtype', width: '40%' },
      { text: 'Durasi', datafield: 'durasi', width: '50%' },
 
    ],
  };
};
export const RTU_OUT_FREK_FULL_JQX = () => {
  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'nama_pointtype', type: 'string' },
      { name: 'kali_oop', type: 'string' },



    ],
    columns: [
      { text: 'NO', datafield: 'number', width: '10%', },
      { text: 'RTU GI', datafield: 'nama_pointtype', width: '60%', },
      { text: 'KALI OOP', datafield: 'kali_oop', width: '30%', },
 
    ],
  };
};
export const RTU_OUT_FULL_JQX = () => {
  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'nama_pointtype', type: 'string' },
      { name: 'status', type: 'string' },
      { name: 'tanggal', type: 'string' },
      { name: 'durasi', type: 'string' },
      { name: 'kali_oop', type: 'string' },
      { name: 'path2text', type: 'string' },
      { name: 'path1text', type: 'string' },
      { name: 'path3text', type: 'string' },
      { name: 'dcc', type: 'string' },
      { name: 'up3', type: 'string' },



    ],
    columns: [
      { text: 'NO', datafield: 'number', width: '5%', editable: false, },
      { text: 'RTU', datafield: 'nama_pointtype', width: '25%', editable: false, },
      { text: 'DCC', datafield: 'dcc', width: '25%', editable: false, },
      { text: 'UP3', datafield: 'up3', width: '25%', editable: false, },
      // { text: 'Status', datafield: 'status', width: '10%', editable: false, },
      // { text: 'Tanggal', datafield: 'tanggal', width: '20%', editable: false, },
   
      // { text: 'Durasi', datafield: 'durasi', width: '25%', editable: false, },
   
      { text: 'KALI OOP', datafield: 'kali_oop', width: '20%', editable: false, },
   
     
    ],
  };
};

export const LAST_EVENT_UP3 = () => [
  { Header: 'Key Point', accessor: 'key', disableFilters: true, show: true },
  { Header: 'Event', accessor: 'event', disableFilters: true, show: true },
  { Header: 'Jam Event', accessor: 'jam_event', disableFilters: true, show: true },
]


export const KINERJA_PENYULANG_STATISTIC_UP3 = () => [
  { Header: 'UP3', accessor: 'up3', disableFilters: true, show: true },
  { Header: 'Jumlah', accessor: 'jumlah', disableFilters: true, show: true },
]
export const KINERJA_PENYULANG_JENIS_GANGGUAN = () => [
  { Header: 'ULP', accessor: 'ulp', disableFilters: true, show: true },
  { Header: 'Pneyulang/GD/RC', accessor: 'penyulang', disableFilters: true, show: true },
  { Header: 'Jumlah', accessor: 'jumlah', disableFilters: true, show: true },
  { Header: 'Permanen', accessor: 'permanen', disableFilters: true, show: true },
  { Header: 'Sesaat', accessor: 'sesaat', disableFilters: true, show: true },
  { Header: 'ENS', accessor: 'ens', disableFilters: true, show: true },
  { Header: 'AGV RCT', accessor: 'agv_rct', disableFilters: true, show: true },
]

export const KINERJA_PENYULANG_PENYEBAB_GANGGUAN = () => [
  { Header: 'FGTM', accessor: 'fgtm', disableFilters: true, show: true },
  { Header: 'Jumlah', accessor: 'jumlah', disableFilters: true, show: true },
]
export const KINERJA_PENYULANG_HISTORY_GANGGUAN_PENYULANG = () => [

  { Header: 'BULAN', accessor: 'bulan', disableFilters: true, show: true },
  { Header: 'TANGGAL', accessor: 'tanggal', disableFilters: true, show: true },
  { Header: 'PENYULANG/OG/RC', accessor: 'penyulang', disableFilters: true, show: true },
  { Header: 'TRIP', accessor: 'trip', disableFilters: true, show: true },
  { Header: 'NORMAL', accessor: 'normal', disableFilters: true, show: true },
  { Header: 'RCT', accessor: 'rct', disableFilters: true, show: true },
  { Header: 'ENS', accessor: 'ens', disableFilters: true, show: true },
  { Header: 'INDIKASI', accessor: 'indikasi', disableFilters: true, show: true },
  { Header: 'CUACA', accessor: 'cuaca', disableFilters: true, show: true },
  { Header: 'FR', accessor: 'fr', disableFilters: true, show: true },
  { Header: 'FS', accessor: 'fs', disableFilters: true, show: true },
  { Header: 'FT', accessor: 'ft', disableFilters: true, show: true },
  { Header: 'FN', accessor: 'fn', disableFilters: true, show: true },
  { Header: 'KELOMPOK', accessor: 'kelompok', disableFilters: true, show: true },
  { Header: 'GANGGUAN', accessor: 'gangguan', disableFilters: true, show: true },
  { Header: 'KETERANGAN', accessor: 'keterangan', disableFilters: true, show: true },
]

export const KAPASITAS_PENYULANG = () => [

  { Header: 'PENYULANG', accessor: 'penyulang', disableFilters: true, show: true },
  { Header: 'TANGGAL', accessor: 'tanggal', disableFilters: true, show: true },
  { Header: 'BATAS BAWAH(A)', accessor: 'batas_bawah', disableFilters: true, show: true },
  { Header: 'BATAS ATAS(A)', accessor: 'batas_atas', disableFilters: true, show: true },
  { Header: 'NILAI(A)', accessor: 'nilai', disableFilters: true, show: true },
]

export const DASHBOARD_PENYULANG_TRIP = () => [

  // {
  //   Header: 'JAM TRIP/JUMLAH', accessor: '', disableFilters: true, show: true, columns: [
  { Header: 'ULP', accessor: 'ulp', minWidth: '200px', disableFilters: true, show: true },
  { Header: 'Penyulang/GD/RC', accessor: 'penyulang', minWidth: '200px', disableFilters: true, show: true },
  ...TIME_HOUR(),
  // },  
]

export const DASHBOARD_PENYULANG_TRIP_DAY = () => [

  // {
  //   Header: 'JAM TRIP/JUMLAH', accessor: '', disableFilters: true, show: true, columns: [
  { Header: 'Bulan', accessor: 'bulan', minWidth: '100px', disableFilters: true, show: true },
  { Header: 'Penyulang/GD/RC', accessor: 'penyulang', minWidth: '200px', disableFilters: true, show: true },
  ...DAYS(),
  // },  
]