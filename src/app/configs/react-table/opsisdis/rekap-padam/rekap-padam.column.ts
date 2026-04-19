
import { ACTION_COLUMN, NO } from "../../_more.columns.config"
export const GANGGUAN_REKAP_PADAM = () => {
  return [
    ...NO(),
    { Header: 'Aksi', accessor: 'action', minWidth: '170px', disableFilters: true, show: true },
    { Header: 'Hari/Tanggal', accessor: 'date', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'No Event', accessor: 'no_event', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Key Point/GI/GH', accessor: 'keypoint', minWidth: '200px', disableFilters: true, show: true },
    { Header: 'No APKT', accessor: 'no_apkt', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Photo', accessor: 'photo', minWidth: '220px', disableFilters: true, show: true },
    { Header: 'Status', accessor: 'status', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Jam Lepas', accessor: 'jam_buka', minWidth: '200px', disableFilters: true, show: true },
    { Header: 'Jam Trip', accessor: 'jam_trip', minWidth: '200px', disableFilters: true, show: true },
    { Header: 'Jam Tutup', accessor: 'jam_tutup', minWidth: '200px', disableFilters: true, show: true },
    { Header: 'Jam Normal', accessor: 'jam_normal', minWidth: '200px', disableFilters: true, show: true },
    { Header: 'Beban Padam', accessor: 'beban_padam', minWidth: '200px', disableFilters: true, show: true },
    { Header: 'Durasi', accessor: 'durasi', minWidth: '200px', disableFilters: true, show: true },
    { Header: 'ENS (kWh)', accessor: 'ens', minWidth: '200px', disableFilters: true, show: true },
    { Header: 'Indikasi', accessor: 'indikasi', minWidth: '200px', disableFilters: true, show: true },
    { Header: 'Kategori', accessor: 'kategori', minWidth: '200px', disableFilters: true, show: true },
    { Header: 'R', accessor: 'r', minWidth: '100px', disableFilters: true, show: true },
    { Header: 'S', accessor: 's', minWidth: '100px', disableFilters: true, show: true },
    { Header: 'T', accessor: 't', minWidth: '100px', disableFilters: true, show: true },
    { Header: 'N', accessor: 'n', minWidth: '100px', disableFilters: true, show: true },
    { Header: 'UP3', accessor: 'up3', minWidth: '200px', disableFilters: true, show: true },
    { Header: 'ULP', accessor: 'ulp', minWidth: '200px', disableFilters: true, show: true },
    { Header: 'Lat', accessor: 'lat', minWidth: '200px', disableFilters: true, show: true },
    { Header: 'Lon', accessor: 'lon', minWidth: '200px', disableFilters: true, show: true },
  ]
}

export const GANGGUAN_REKAP_PADAM_DETAIL = () => {
  return [
    ...NO(),
    { Header: 'Hari/Tanggal', accessor: 'date', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'No Event', accessor: 'no_event', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'No APKT', accessor: 'no_apkt', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Photo', accessor: 'photo', minWidth: '220px', disableFilters: true, show: true },
    { Header: 'Status', accessor: 'status', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Key Point/GI/GH', accessor: 'keypoint', minWidth: '200px', disableFilters: true, show: true },
    { Header: 'Jam Trip', accessor: 'jam_trip', minWidth: '200px', disableFilters: true, show: true },
    { Header: 'Jam Tutup', accessor: 'jam_tutup', minWidth: '200px', disableFilters: true, show: true },
    { Header: 'Jam Normal', accessor: 'jam_normal', minWidth: '200px', disableFilters: true, show: true },
    { Header: 'ENS', accessor: 'ens', minWidth: '200px', disableFilters: true, show: true },
    { Header: 'Indikasi', accessor: 'indikasi', minWidth: '200px', disableFilters: true, show: true },
    { Header: 'R', accessor: 'r', minWidth: '100px', disableFilters: true, show: true },
    { Header: 'S', accessor: 's', minWidth: '100px', disableFilters: true, show: true },
    { Header: 'T', accessor: 't', minWidth: '100px', disableFilters: true, show: true },
    { Header: 'N', accessor: 'n', minWidth: '100px', disableFilters: true, show: true },
    { Header: 'UP3', accessor: 'up3', minWidth: '200px', disableFilters: true, show: true },
    { Header: 'ULP', accessor: 'ulp', minWidth: '200px', disableFilters: true, show: true },
    { Header: 'Lat', accessor: 'lat', minWidth: '200px', disableFilters: true, show: true },
    { Header: 'Lon', accessor: 'lon', minWidth: '200px', disableFilters: true, show: true },
  ]
}

export const REKAM_PADAM_EKSEKUSI_RC = () => {
  return [
    ...NO(),
    { Header: 'Tanggal Input', accessor: 'tgl_entri', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Jenis Peralatan', accessor: 'jenis_peralatan', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Peralatan', accessor: 'peralatan_rc', minWidth: '150px', disableFilters: true, show: true },
    // { Header: 'LBS MANUAL', accessor: 'lbs_manual', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Arus Gangguan HMI', accessor: 'arus_gangguan', minWidth: '200px', disableFilters: true, show: true },
    { Header: 'Status Operasi', accessor: 'status_operasi', minWidth: '200px', disableFilters: true, show: true },
    { Header: 'Beban', accessor: 'beban', minWidth: '150px', disableFilters: true, show: true },
   
    { Header: 'r', accessor: 'r', minWidth: '200px', disableFilters: true, show: true },
    { Header: 's', accessor: 's', minWidth: '200px', disableFilters: true, show: true },
    { Header: 't', accessor: 't', minWidth: '200px', disableFilters: true, show: true },
    { Header: 'n', accessor: 'n', minWidth: '200px', disableFilters: true, show: true },
    
    { Header: 'Open', accessor: 'rc_open', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Status Open', accessor: 'status_open', minWidth: '220px', disableFilters: true, show: true },
    { Header: 'Waktu Open', accessor: 'jam_open', minWidth: '200px', disableFilters: true, show: true },
    { Header: 'Close', accessor: 'rc_close', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Status Close', accessor: 'status_close', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Waktu Close', accessor: 'jam_close', minWidth: '200px', disableFilters: true, show: true },
    { Header: 'Keterangan', accessor: 'keterangan', minWidth: '200px', disableFilters: true, show: true },
    { Header: 'section', accessor: 'section', minWidth: '200px', disableFilters: true, show: true },
    { Header: 'Waktu Masuk', accessor: 'waktu_masuk', minWidth: '200px', disableFilters: true, show: true },
    { Header: 'Beban Masuk', accessor: 'beban_masuk', minWidth: '200px', disableFilters: true, show: true },
    // { Header: 'Status Manuver', accessor: 'status_manuver', minWidth: '200px', disableFilters: true, show: true },
    ...ACTION_COLUMN()
  ]
}

export const REKAM_PADAM_EKSEKUSI_FIOHL = () => {
  return [
    ...NO(),
    { Header: 'Peralatan', accessor: 'peralatan', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Indikasi', accessor: 'indikasi', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Tanggal', accessor: 'tanggal', minWidth: '150px', disableFilters: true, show: true },
    ...ACTION_COLUMN()
  ]
}
