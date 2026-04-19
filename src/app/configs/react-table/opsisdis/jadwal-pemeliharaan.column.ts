import { ACTION_COLUMN, NO } from "../_more.columns.config"

export const INPUT_JADWAL_COLUMN = () => {
  return [
    ...NO(),
    { Header: 'Respon APD', accessor: 'respon_apd', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Tanggal Input', accessor: 'tgl_create', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Peralatan', accessor: 'id_og', minWidth: '210px', disableFilters: true, show: true },
    { Header: 'LBS MANUAL', accessor: 'lbs_manual', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'UP3', accessor: 'up3', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Butuh Pemadaman', accessor: 'butuh_padam', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Wilayah Padam', accessor: 'wilayah_padam', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Jadwal', accessor: 'jenis_jadwal', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Jenis Pelayanan', accessor: 'jenis_pelayanan', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Jam Pekerjaan', accessor: 'jam_pekerjaan', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Pangawas', accessor: 'pengawas', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Pelaksana', accessor: 'pelaksana', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Jenis Pekerjaan', accessor: 'jenis_pekerjaan', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'JTM', accessor: 'jtm', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Keterangan', accessor: 'keterangan', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Inputer', accessor: 'user_entri', minWidth: '150px', disableFilters: true, show: true },
   
    { Header: '', accessor: 'action', minWidth: '215px', canFilter: false, show: true, hideColumn: true }
  ]
}

export const INPUT_JADWAL_GARDU_COLUMN = () => {
  return [
    ...NO(),
    { Header: 'Gardu Induk', accessor: 'gardu_induk', minWidth: '210px', disableFilters: true, show: true },
    { Header: 'Penyulang', accessor: 'penyulang', minWidth: '210px', disableFilters: true, show: true },
    { Header: 'Gardu', accessor: 'gardu', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'UP3', accessor: 'up3', minWidth: '150px', disableFilters: true, show: true },

    { Header: 'Alamat', accessor: 'alamat', minWidth: '150px', disableFilters: true, show: true },
    { Header: '', accessor: 'action', canFilter: false, show: true, hideColumn: true }
  ]
}
export const INPUT_JADWAL_DOKUEMNTASI_COLUMN = () => {
  return [
    ...NO(),

    { Header: 'Nama Dokumen', accessor: 'nama_dok', minWidth: '450px', disableFilters: true, show: true },
    { Header: '', accessor: 'action', canFilter: false, show: true, hideColumn: true }
  ]
}

export const INPUT_JADWAL_DAFTAR_ASET_COLUMN = () => {
  return [
    { Header: 'Nomor Aset', accessor: 'nomor', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Nama Aset', accessor: 'nama', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Nomor Seri', accessor: 'seri', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Kategori', accessor: 'kategori', minWidth: '150px', disableFilters: true, show: true },
    ...ACTION_COLUMN()
  ]
}

export const TASK_PEMELIHARAAN_COLUMN = () => {
  return [
    { Header: 'Tugas', accessor: 'tugas', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Kategori', accessor: 'kategori', minWidth: '150px', disableFilters: true, show: true },
    ...ACTION_COLUMN()
  ]
}

export const TASK_ITEM_PEMELIHARAAN_COLUMN = () => {
  return [
    { Header: 'Nomor', accessor: 'nomor', minWidth: '100px', disableFilters: true, show: true },
    { Header: 'Item Tugas', accessor: 'item_task', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Nilai Acuan', accessor: 'nilai_acuan', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Satuan', accessor: 'satuan', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Tipe', accessor: 'tipe', minWidth: '150px', disableFilters: true, show: true },
  ]
}
export const APPROVE_REN = () => {
  return [
    { Header: 'TGL REN Mulai', accessor: 'tgl_mulai', minWidth: '120px', disableFilters: true, show: true },
    { Header: 'TGL REN Selesai', accessor: 'tgl_selesai', minWidth: '130px', disableFilters: true, show: true },
    { Header: 'Durasi Pekerjaan', accessor: 'est_durasi', minWidth: '210px', disableFilters: true, show: true },
    { Header: 'Durasi Proses', accessor: 'durasi_proses', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'GI/GH/PK', accessor: 'gi_gh_pk', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Titik Pemeliharaan', accessor: 'titik_pemeliharaan', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Status', accessor: 'status', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Prioritas', accessor: 'prioritas', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Pembuat', accessor: 'pembuat', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Unit Pembangkit', accessor: 'unit_pembangkit', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Action', accessor: 'action', minWidth: '215px', canFilter: false, show: true, hideColumn: false }
  ]
}

export const APPROVE_OPSIS = () => {
  return [
    { Header: 'TGL REN Mulai', accessor: 'tgl_mulai', minWidth: '120px', disableFilters: true, show: true },
    { Header: 'TGL REN Selesai', accessor: 'tgl_selesai', minWidth: '130px', disableFilters: true, show: true },
    { Header: 'Durasi Pekerjaan', accessor: 'durasi_pekerjaan', minWidth: '210px', disableFilters: true, show: true },
    { Header: 'Durasi Proses', accessor: 'durasi_proses', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'GI/GH/PK', accessor: 'gi_gh_pk', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Titik Pemeliharaan', accessor: 'titik_pemeliharaan', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Status', accessor: 'status', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'File SOP', accessor: 'file_sop', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Prioritas', accessor: 'prioritas', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Pembuat', accessor: 'pembuat', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Unit Pembuat', accessor: 'unit_pembuat', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Action', accessor: 'action', minWidth: '75px', canFilter: false, show: true, hideColumn: false }
  ]
}

export const RIWAYAT_PROGRES_COLUMN = () => {
  return [
    ...NO(),
    { Header: 'Tanggal Awal', accessor: 'tgl_awal', minWidth: '120px', disableFilters: true, show: true },
    { Header: 'Status Awal', accessor: 'status_awal', minWidth: '130px', disableFilters: true, show: true },
    { Header: 'Tanggal Akhir', accessor: 'tgl_akhir', minWidth: '210px', disableFilters: true, show: true },
    { Header: 'Status Akhir', accessor: 'status_akhir', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'User', accessor: 'user', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Durasi', accessor: 'durasi', minWidth: '150px', disableFilters: true, show: true },
  ]
}

export const APPROVE_BAGIAN = () => {
  return [
    { Header: 'Tanggal Mulai', accessor: 'tgl_mulai', minWidth: '120px', disableFilters: true, show: true },
    { Header: 'Tanggal Selesai', accessor: 'tgl_selesai', minWidth: '130px', disableFilters: true, show: true },
    { Header: 'Durasi Pekerjaan', accessor: 'durasi_pekerjaan', minWidth: '210px', disableFilters: true, show: true },
    { Header: 'Titik Manuver', accessor: 'titik_manuver', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'GI/GH/PK', accessor: 'gi_gh_pk', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Titik Pemeliharaan', accessor: 'titik_pemeliharaan', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Status', accessor: 'status', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Durasi Proses', accessor: 'durasi_proses', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Prioritas', accessor: 'prioritas', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Pembuat', accessor: 'pembuat', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Unit Pembangkit', accessor: 'unit_pembangkit', minWidth: '150px', disableFilters: true, show: true },
    { Header: '', accessor: 'action', minWidth: '165px', canFilter: false, show: true, hideColumn: true }
  ]
}

export const TASK_PELAKSANAAN_COLUMN = () => {
  return [
    ...NO(),
    { Header: 'Respone APD', accessor: 'respne_apd', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Tanggal', accessor: 'tgl_period', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Gardu Induk', accessor: 'gardu_induk', minWidth: '210px', disableFilters: true, show: true },
    { Header: 'Penyulang', accessor: 'penyulang', minWidth: '210px', disableFilters: true, show: true },
    { Header: 'Gardu', accessor: 'gardu', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'UP3', accessor: 'up3', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Status Pekerjaan', accessor: 'status_pekerjaan', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Butuh Pemadaman', accessor: 'butuh_padam', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Wilayah Padam', accessor: 'wilayah_padam', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Jadwal', accessor: 'jenis_jadwal', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Jenis Pelayanan', accessor: 'jenis_pelayanan', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Jam Pekerjaan', accessor: 'jam_pekerjaan', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Pelaksana', accessor: 'pelaksana', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Jenis Pekerjaan', accessor: 'jenis_pekerjaan', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'JTM', accessor: 'jtm', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Keterangan', accessor: 'keterangan', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Inputer', accessor: 'user_entri', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Tanggal Input', accessor: 'tgl_create', minWidth: '150px', disableFilters: true, show: true },
    { Header: '', accessor: 'action', minWidth: '50px', canFilter: false, show: true, hideColumn: true }
  ]
}

export const DAFTAR_TUGAS_PELAKSANAAN_COLUMN = () => {
  return [
    { Header: 'Tugas', accessor: 'tugas', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Level PM', accessor: 'level_pm', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Aset', accessor: 'aset', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Status Aset', accessor: 'status_aset', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Station', accessor: 'station', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Penyulang', accessor: 'penyulang', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Kesimpulan', accessor: 'kesimpulan', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Completed Tasks', accessor: 'completed_tasks', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Progres', accessor: 'progres', minWidth: '150px', disableFilters: true, show: true },
    ...ACTION_COLUMN()
  ]
}

export const USULANUP2D_COLUMN = () => {
  return [
    { Header: 'Nomor', accessor: 'nomor', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Tanggal REN Mulai', accessor: 'tgl_mulai', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Tanggal REN Selesai', accessor: 'tgl_selesai', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Estimasi Durasi Pekerjaan', accessor: 'est_durasi', minWidth: '210px', disableFilters: true, show: true },
    { Header: 'Durasi Respon', accessor: 'durasi_response', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Durasi Recovery', accessor: 'durasi_recovery', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'GI/GH/PK', accessor: 'gi_gh_pk', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Titik Pemeliharaan', accessor: 'titik_pemeliharaan', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Status WO', accessor: 'status_wo', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Status DCC', accessor: 'status_dcc', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Keterangan Pemeliharaan', accessor: 'ket_pemeliharaan', minWidth: '210px', disableFilters: true, show: true },
    { Header: 'Prioritas', accessor: 'prioritas', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Pelapor', accessor: 'pelapor', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Unit Pelapor', accessor: 'unit_pelapor', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Petugas Pelaksana', accessor: 'petugas_pelaksana', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Regu Pelaksana', accessor: 'regu_pelaksana', minWidth: '150px', disableFilters: true, show: true },
    { Header: '', accessor: 'action', minWidth: '165px', canFilter: false, show: true, hideColumn: true }
  ]
}

export const USULANUP3_COLUMN = () => {
  return [
    { Header: 'Nomor', accessor: 'nomor', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Tanggal REN Mulai', accessor: 'tgl_mulai', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Tanggal REN Selesai', accessor: 'tgl_selesai', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Durasi Pekerjaan', accessor: 'est_durasi', minWidth: '210px', disableFilters: true, show: true },
    { Header: 'Durasi Proses', accessor: 'durasi_proses', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'GI/GH/PK', accessor: 'gi_gh_pk', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Titik Pemeliharaan', accessor: 'titik_pemeliharaan', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Status WO', accessor: 'status_wo', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Status DCC', accessor: 'status_dcc', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Prioritas', accessor: 'prioritas', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Pembuat', accessor: 'pembuat', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Unit Pembuat', accessor: 'unit_pembuat', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Tanggal Tindakan MCC', accessor: 'tgl_tindakan_mcc', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Uraian Tindakan MCC', accessor: 'uraian_tindakan_mcc', minWidth: '180px', disableFilters: true, show: true },
    { Header: '', accessor: 'action', minWidth: '165px', canFilter: false, show: true, hideColumn: true }
  ]
}



export const MONITORING_COLUMN = () => {
  return [
    ...NO(),
    { Header: 'Respone APD', accessor: 'respne_apd', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Tanggal', accessor: 'tgl_period', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Gardu Induk', accessor: 'gardu_induk', minWidth: '210px', disableFilters: true, show: true },
    { Header: 'Penyulang', accessor: 'penyulang', minWidth: '210px', disableFilters: true, show: true },
    { Header: 'Gardu', accessor: 'gardu', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'UP3', accessor: 'up3', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Status Pekerjaan', accessor: 'status_pekerjaan', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Butuh Pemadaman', accessor: 'butuh_padam', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Wilayah Padam', accessor: 'wilayah_padam', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Jadwal', accessor: 'jenis_jadwal', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Jenis Pelayanan', accessor: 'jenis_pelayanan', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Jam Pekerjaan', accessor: 'jam_pekerjaan', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Pelaksana', accessor: 'pelaksana', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Jenis Pekerjaan', accessor: 'jenis_pekerjaan', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'JTM', accessor: 'jtm', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Keterangan', accessor: 'keterangan', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Inputer', accessor: 'user_entri', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Tanggal Input', accessor: 'tgl_create', minWidth: '150px', disableFilters: true, show: true },
  ]
}
