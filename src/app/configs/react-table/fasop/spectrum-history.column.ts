import { NO, B1, B2, B3, JENIS_POINT } from "../_more.columns.config"

export const HIS_RTU_COLUMNS = () => {
  return [
    ...NO(),
    { Header: 'Jenis RTU', accessor: 'jenis_rtu', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'RTU', accessor: 'rtu', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Tanggal Awal', accessor: 'tanggal_awal', minWidth: '170px', disableFilters: true, show: true },
    { Header: 'Msec Awal', accessor: 'msec_awal', minWidth: '120px', disableFilters: true, show: true },
    { Header: 'Status Awal', accessor: 'status_awal', minWidth: '130px', disableFilters: true, show: true },
    { Header: 'Tanggal Akhir', accessor: 'tanggal_akhir', minWidth: '170px', disableFilters: true, show: true },
    { Header: 'Msec Akhir', accessor: 'msec_akhir', minWidth: '120px', disableFilters: true, show: true },
    { Header: 'Status Akhir', accessor: 'status_akhir', minWidth: '130px', disableFilters: true, show: true },
    { Header: 'Durasi (dd:hh:mm:ss)', accessor: 'durasi', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Kesimpulan', accessor: 'kesimpulan', minWidth: '180px', disableFilters: true, show: true }
  ]
}
export const SCADATEL_HISTORI_LOG_APKT = () => {
  
  return [
    ...NO(),
    { Header: 'Payload', accessor: 'payload',  minWidth: '40px', disableFilters: true, show: true,fixed: true },
    { Header: 'Deskripsi', accessor: 'description',  minWidth: '280px', disableFilters: false, show: true },
    { Header: 'Status Event', accessor: 'status',  minWidth: '120px', disableFilters: true, show: true },
    { Header: 'Waktu Event', accessor: 'up_down_time',  minWidth: '380px', disableFilters: false, show: true },
  { Header: 'ID Transaksi', accessor: 'transaction_id',  minWidth: '550px', disableFilters: false, show: true },
  { Header: 'Tanggal Capture', accessor: 'capture_at', minWidth: '450px', disableFilters: false, show: true },  // Adjust stickyLeft here
  // { Header: 'APD Code', accessor: 'apd_code', minWidth: '150px', disableFilters: false, show: true },
  // { Header: 'Waktu Capture', accessor: 'capture_time',  minWidth: '150px', disableFilters: false, show: true },
  // { Header: 'ID Event', accessor: 'id_event',  minWidth: '150px', disableFilters: false, show: true },
  
   
  ]
}
export const HIS_ANALOG_COLUMNS = () => {
  return [
    ...NO(),
    ...JENIS_POINT(),
    ...B1(),
    ...B2(),
    ...B3(),
    { Header: 'Element', accessor: 'element', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Tanggal Awal', accessor: 'tanggal_awal', minWidth: '170px', disableFilters: true, show: true },
    { Header: 'Msec Awal', accessor: 'msec_awal', minWidth: '120px', disableFilters: true, show: true },
    { Header: 'Status Awal', accessor: 'status_awal', minWidth: '130px', disableFilters: true, show: true },
    { Header: 'Tanggal Akhir', accessor: 'tanggal_akhir', minWidth: '170px', disableFilters: true, show: true },
    { Header: 'Msec Akhir', accessor: 'msec_akhir', minWidth: '130px', disableFilters: true, show: true },
    { Header: 'Status Akhir', accessor: 'status_akhir', minWidth: '130px', disableFilters: true, show: true },
    { Header: 'Durasi (dd:hh:mm:ss)', accessor: 'durasi', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Kesimpulan', accessor: 'kesimpulan', minWidth: '180px', disableFilters: true, show: true }
  ]
}

export const HIS_ANALOG_30M_COLUMNS = () => {
  return [
    ...NO(),
    ...JENIS_POINT(),
    ...B1(),
    ...B2(),
    ...B3(),
    { Header: 'Element', accessor: 'element', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Tanggal', accessor: 'tanggal', minWidth: '170px', disableFilters: true, show: true },
    { Header: 'Value', accessor: 'msec_akhir', minWidth: '130px', disableFilters: true, show: true },
  ]
}

export const HIS_DIGITAL_COLUMNS = () => {
  return [
    ...NO(),
    ...JENIS_POINT(),
    ...B1(),
    ...B2(),
    ...B3(),
    { Header: 'Element', accessor: 'element', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Tanggal Awal', accessor: 'tanggal_awal', minWidth: '170px', disableFilters: true, show: true },
    { Header: 'Msec Awal', accessor: 'msec_awal', minWidth: '120px', disableFilters: true, show: true },
    { Header: 'Status Awal', accessor: 'status_awal', minWidth: '130px', disableFilters: true, show: true },
    { Header: 'Tanggal Akhir', accessor: 'tanggal_akhir', minWidth: '170px', disableFilters: true, show: true },
    { Header: 'Msec Akhir', accessor: 'msec_akhir', minWidth: '120px', disableFilters: true, show: true },
    { Header: 'Status Akhir', accessor: 'status_akhir', minWidth: '130px', disableFilters: true, show: true },
    { Header: 'Durasi (dd:hh:mm:ss)', accessor: 'durasi', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Kesimpulan', accessor: 'kesimpulan', minWidth: '180px', disableFilters: true, show: true }
  ]
}

export const HIS_MASTER_COLUMNS = () => {
  return [
    ...NO(),
    { Header: 'Master', accessor: 'master', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Tanggal Awal', accessor: 'tanggal_awal', minWidth: '170px', disableFilters: true, show: true },
    { Header: 'Msec Awal', accessor: 'msec_awal', minWidth: '120px', disableFilters: true, show: true },
    { Header: 'Status Awal', accessor: 'status_awal', minWidth: '130px', disableFilters: true, show: true },
    { Header: 'Tanggal Akhir', accessor: 'tanggal_akhir', minWidth: '170px', disableFilters: true, show: true },
    { Header: 'Msec Akhir', accessor: 'msec_akhir', minWidth: '120px', disableFilters: true, show: true },
    { Header: 'Status Akhir', accessor: 'status_akhir', minWidth: '130px', disableFilters: true, show: true },
    { Header: 'Durasi (dd:hh:mm:ss)', accessor: 'durasi', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Kesimpulan', accessor: 'kesimpulan', minWidth: '180px', disableFilters: true, show: true }
  ]
}

export const HIS_TRIP_COLUMNS = () => {
  return [
    ...NO(),
    ...B1(),
    ...B2(),
    ...B3(),
    { Header: 'Element', accessor: 'element', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Waktu Open', accessor: 'tanggal_awal', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Waktu Close', accessor: 'tanggal_akhir', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Durasi (dd:hh:mm:ss)', accessor: 'durasi', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'I Beban', accessor: 'status_beban', minWidth: '100px', disableFilters: true, show: true },
    { Header: 'IfR', accessor: 'status_ifr', minWidth: '50px', disableFilters: true, show: true },
    { Header: 'IfS', accessor: 'status_ifs', minWidth: '50px', disableFilters: true, show: true },
    { Header: 'IfT', accessor: 'status_ift', minWidth: '50px', disableFilters: true, show: true },
    { Header: 'IfN', accessor: 'status_ifn', minWidth: '50px', disableFilters: true, show: true },
    { Header: 'OCR', accessor: 'status_ocr', minWidth: '50px', disableFilters: true, show: true },
    { Header: 'OCT', accessor: 'status_oct', minWidth: '50px', disableFilters: true, show: true },
    { Header: 'GFT', accessor: 'status_gft', minWidth: '50px', disableFilters: true, show: true },
    { Header: 'GFR', accessor: 'status_gfr', minWidth: '50px', disableFilters: true, show: true },
    { Header: 'CBTR', accessor: 'cbtr', minWidth: '50px', disableFilters: true, show: true },
    { Header: 'DISZ1', accessor: 'status_disz1', minWidth: '50px', disableFilters: true, show: true },
    { Header: 'DISZ2', accessor: 'status_disz2', minWidth: '50px', disableFilters: true, show: true },
    { Header: 'DISZ3', accessor: 'status_disz3', minWidth: '50px', disableFilters: true, show: true },
    { Header: 'ARO', accessor: 'status_aro', minWidth: '50px', disableFilters: true, show: true }
  ]
}

export const HIS_TRIP_DASHBOARD_COLUMNSS = () => {
  return [
    ...NO(),
    // ...B1(),
    // ...B2(),
    // ...B3(),
    // { Header: 'Element', accessor: 'element', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Waktu Open', accessor: 'tanggal_awal', minWidth: '80px', disableFilters: true, show: true },
    { Header: 'Waktu Close', accessor: 'tanggal_akhir', minWidth: '80px', disableFilters: true, show: true },
    // { Header: 'I Beban', accessor: 'status_beban', minWidth: '100px', disableFilters: true, show: true },
    // { Header: 'IFr', accessor: 'status_ifr', minWidth: '50px', disableFilters: true, show: true },
    // { Header: 'IFs', accessor: 'status_ifs', minWidth: '50px', disableFilters: true, show: true },
    // { Header: 'IFt', accessor: 'status_ift', minWidth: '50px', disableFilters: true, show: true },
    // { Header: 'IFn', accessor: 'status_ifn', minWidth: '50px', disableFilters: true, show: true },
    { Header: 'OCR', accessor: 'status_ocr', minWidth: '50px', disableFilters: true, show: true },
    { Header: 'GFR', accessor: 'status_gfr', minWidth: '50px', disableFilters: true, show: true },
    { Header: 'CBTR', accessor: 'cbtr', minWidth: '50px', disableFilters: true, show: true }
  ]
}

export const HIS_REMOTE_COLUMNS = () => {
  return [
    ...NO(),
    { Header: 'B1 (Lokasi)', accessor: 'path1', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'B2 (Tegangan)', accessor: 'path2', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'B3 (Bay)', accessor: 'path3', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Element', accessor: 'path4', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Operator', accessor: 'operator', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Eksekusi Remote', accessor: 'status_1', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Tanggal Eksekusi Remote', accessor: 'tgl_mulai_remote', minWidth: '170px', disableFilters: true, show: true },
    { Header: 'Tanggal Response Remote', accessor: 'tgl_selesai_remote', minWidth: '170px', disableFilters: true, show: true },

    { Header: 'Status Remote', accessor: 'status_remote', minWidth: '170px', disableFilters: true, show: true },
    { Header: 'Durasi Waktu Remote (dd:hh:mm:ss)', accessor: 'durasi', minWidth: '180px', disableFilters: true, show: true }
 
  ]
}
export const HIS_REMOTE_COLUMNS_detail = () => {
  return [
    ...NO(),

    { Header: 'B1 (Lokasi)', accessor: 'path1', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'B2 (Tegangan)', accessor: 'path2', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'B3 (Bay)', accessor: 'path3', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Element', accessor: 'path4', minWidth: '180px', disableFilters: true, show: true },
    // { Header: 'Element', accessor: 'element', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Operator', accessor: 'operator', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Eksekusi Remote', accessor: 'status_1', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Tanggal Eksekusi Remote', accessor: 'tgl_mulai_remote', minWidth: '170px', disableFilters: true, show: true },
    { Header: 'Tanggal Response Remote', accessor: 'tgl_selesai_remote', minWidth: '170px', disableFilters: true, show: true },

    { Header: 'Status Remote', accessor: 'status_2', minWidth: '170px', disableFilters: true, show: true },
    { Header: 'Durasi Waktu Remote (dd:hh:mm:ss)', accessor: 'durasi', minWidth: '180px', disableFilters: true, show: true }
  ]
}

export const KINERJA_SCADA_HIST = () => {
  return [
    // { Header: 'Peralatan SCADA', accessor: 'point_name', minWidth: '180px', disableFilters: true, show: true },
    ...NO(),
    ...B1(),
    ...B2(),
    ...B3(),
    { Header: 'Element', accessor: 'path4', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Info', accessor: 'path5', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Tanggal Awal', accessor: 'tanggal_awal', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Status Awal', accessor: 'satuan_awal', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Tanggal Akhir', accessor: 'tanggal_akhir', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Status Akhir', accessor: 'status_2', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Durasi (dd:hh:mm:ss)', accessor: 'durasi', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Keterangan', accessor: 'keterangan', minWidth: '180px', disableFilters: true, show: true },
  ]
}