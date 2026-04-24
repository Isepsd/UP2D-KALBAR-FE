import { ACTION_COLUMN } from "./_more.columns.config";

/* QRC */
export const WP_QRC_COLUMNS = () => {
  return [
    { Header: 'No', accessor: 'number', width: '50px', disableFilters: true, show: true },
    { Header: 'User', accessor: 'nama_user', minWidth: 200, disableFilters: true, show: true },
    { Header: 'Nama Pekerjaan', accessor: 'nama_pekerjaan', minWidth: 300, disableFilters: true, show: true },
    { Header: 'Vendor', accessor: 'vendor', minWidth: 100, disableFilters: true, show: true },
    { Header: 'PDF', accessor: 'download', minWidth: 100, disableFilters: true, show: true },
    ...ACTION_COLUMN(),
  ];
};

/* QRC */
export const WP_QRC_QUESTION_COLUMNS = () => {
  return [
    { Header: 'No', accessor: 'number', width: '50px', disableFilters: true, show: true },
    { Header: 'Pertanyaan', accessor: 'pertanyaan', minWidth: 700, disableFilters: true, show: true },
    { Header: 'Ada', accessor: 'ada', width: '50px', disableFilters: true, show: true },
    ...ACTION_COLUMN(),
  ];
};

/* SOP JSA */
export const WP_SOP_JSA_COLUMNS = () => {
  return [
    { Header: 'No', accessor: 'number', width: '50px', disableFilters: true, show: true },
    { Header: 'Judul Pekerjaan', accessor: 'judul_pekerjaan', minWidth: 300, disableFilters: true, show: true },
    { Header: 'Bagian', accessor: 'bagian', minWidth: 200, disableFilters: true, show: true },
    { Header: 'Dokumen', accessor: 'dokumen', minWidth: 100, disableFilters: true, show: true },
    ...ACTION_COLUMN(),
  ];
};

/* HIRARC */
export const WP_HIRARC_COLUMNS = () => {
  return [
    { Header: 'No', accessor: 'number', width: '50px', disableFilters: true, show: true },
    { Header: 'Bagian', accessor: 'bagian', minWidth: 100, disableFilters: true, show: true },
    { Header: 'Pekerjaan', accessor: 'pekerjaan', minWidth: 250, disableFilters: true, show: true },
    { Header: 'Lokasi Pekerjaan', accessor: 'lokasi_pekerjaan', minWidth: 250, disableFilters: true, show: true },
    { Header: 'Tanggal', accessor: 'tanggal', minWidth: 100, disableFilters: true, show: true },
    { Header: 'PDF', accessor: 'download', minWidth: 100, disableFilters: true, show: true },
    ...ACTION_COLUMN(),
  ];
};

/* HIRARC DETAIL */
export const WP_HIRARC_DETAIL_COLUMNS = () => {
  return [
    { Header: 'No', accessor: 'number', width: '50px', disableFilters: true, show: true },
    { Header: 'Kegiatan', accessor: 'kegiatan', minWidth: 100, disableFilters: true, show: true },
    { Header: 'Bahaya(HAZARD)', accessor: 'bahaya', minWidth: 100, disableFilters: true, show: true },
    { Header: 'Resiko Bahaya(Risk)', accessor: 'resiko_bahaya', minWidth: 100, disableFilters: true, show: true },
    { Header: 'Peluang', accessor: 'peluang', minWidth: 100, disableFilters: true, show: true },
    { Header: 'Akibat', accessor: 'akibat', minWidth: 100, disableFilters: true, show: true },
    { Header: 'Tingkat resiko', accessor: 'tingkat_resiko', minWidth: 100, disableFilters: true, show: true },
    { Header: 'pengendalian', accessor: 'pengendalian', minWidth: 100, disableFilters: true, show: true },
    { Header: 'penanggung jawab', accessor: 'penganggung_jawab', minWidth: 100, disableFilters: true, show: true },
    ...ACTION_COLUMN(),
  ];
};

/* DASHBOARD PEKERJAAN */
export const WP_DASHBOARD_PEKERJAAN_COLUMNS = () => {
  return [
    { Header: 'No', accessor: 'number', width: '50px', disableFilters: true, show: true },
    { Header: 'Nama Pekerjaan', accessor: 'pekerjaan_dilakukan', minWidth: 150, disableFilters: true, show: true },
    { Header: 'Bagian', accessor: 'bagian', minWidth: 100, disableFilters: true, show: true },
    { Header: 'Lokasi', accessor: 'lokasi_pekerjaan', minWidth: 100, disableFilters: true, show: true },
    { Header: 'Pengawas', accessor: 'pengawas', minWidth: 100, disableFilters: true, show: true },
    ...ACTION_COLUMN(),
  ];
};

/* WP */
export const WP_COLUMNS = () => {
  return [
    { Header: 'No', accessor: 'number', width: '50px', disableFilters: true, show: true },
    { Header: 'Posting', accessor: 'posting', minWidth: 120, disableFilters: true, show: true },
    { Header: 'Download', accessor: 'download', minWidth: 120, disableFilters: true, show: true },
    { Header: 'Nomor Formulir', accessor: 'nomor_formulir', minWidth: 150, disableFilters: true, show: true },
    { Header: 'Tanggal Mulai', accessor: 'tgl_pekerjaan', minWidth: 150, disableFilters: true, show: true },
    { Header: 'Tanggal Selesai', accessor: 'tgl_pekerjaan_selesai', minWidth: 150, disableFilters: true, show: true },
    { Header: 'Pekerjaan', accessor: 'pekerjaan_dilakukan', minWidth: 300, disableFilters: true, show: true },
    { Header: 'Status', accessor: 'status', minWidth: 150, disableFilters: true, show: true },
    { Header: 'Lokasi Pekerjaan', accessor: 'lokasi_pekerjaan', minWidth: 200, disableFilters: true, show: true },
    { Header: 'Jenis Pekerjaan', accessor: 'jenis_pekerjaan', minWidth: 100, disableFilters: true, show: true },
    { Header: 'Nama SPV', accessor: 'spv', minWidth: 170, disableFilters: true, show: true },
    { Header: 'Nama Asman', accessor: 'asman', minWidth: 170, disableFilters: true, show: true },
    { Header: 'PIC Persetujuan Padam', accessor: 'opsis', minWidth: 170, disableFilters: true, show: true },
    { Header: 'Nama K3l', accessor: 'k3l', minWidth: 170, disableFilters: true, show: true },
    { Header: 'Nama Manager', accessor: 'manager', minWidth: 170, disableFilters: true, show: true },
    { Header: 'Nama Pengawas', accessor: 'pengawas', minWidth: 170, disableFilters: true, show: true },
    { Header: 'Nama Pekerja', accessor: 'pekerja', minWidth: 170, disableFilters: true, show: true },
    { Header: 'Bagian', accessor: 'bagian', minWidth: 100, disableFilters: true, show: true },
    { Header: 'Perlu Pemadaman 20 kV', accessor: 'manuver', minWidth: 170, disableFilters: true, show: true },
    { Header: 'Perlu Grounding', accessor: 'grounding', minWidth: 170, disableFilters: true, show: true },
    ...ACTION_COLUMN(),
  ];
};

/* WP APPROVAL */
export const WP_APPROVAL_COLUMNS = () => {
  return [
    { Header: 'No', accessor: 'number', width: '50px', disableFilters: true, show: true },
    { Header: 'Approve', accessor: 'approve', minWidth: 100, disableFilters: true, show: true },
    { Header: 'Reject', accessor: 'reject', minWidth: 100, disableFilters: true, show: true },
    { Header: 'Nomor Formulir', accessor: 'nomor_formulir', minWidth: 150, disableFilters: true, show: true },
    { Header: 'Tanggal Pekerjaan', accessor: 'tgl_pekerjaan', minWidth: 150, disableFilters: true, show: true },
    { Header: 'Status', accessor: 'status', minWidth: 150, disableFilters: true, show: true },
    { Header: 'Pekerjaan', accessor: 'pekerjaan_dilakukan', minWidth: 300, disableFilters: true, show: true },
    { Header: 'Nama SPV', accessor: 'spv', minWidth: 170, disableFilters: true, show: true },
    { Header: 'Nama Asman', accessor: 'asman', minWidth: 170, disableFilters: true, show: true },
    { Header: 'PIC Persetujuan Padam', accessor: 'opsis', minWidth: 170, disableFilters: true, show: true },
    { Header: 'Nama K3l', accessor: 'k3l', minWidth: 170, disableFilters: true, show: true },
    { Header: 'Nama Manager', accessor: 'manager', minWidth: 170, disableFilters: true, show: true },
    { Header: 'Lokasi Pekerjaan', accessor: 'lokasi_pekerjaan', minWidth: 200, disableFilters: true, show: true },
    { Header: 'Nama Pengawas', accessor: 'pengawas', minWidth: 170, disableFilters: true, show: true },
    { Header: 'Nama Pekerja', accessor: 'pekerja', minWidth: 170, disableFilters: true, show: true },
    { Header: 'Bagian', accessor: 'bagian', minWidth: 100, disableFilters: true, show: true },
    { Header: 'Perlu Pemadaman 20 kV', accessor: 'manuver', minWidth: 170, disableFilters: true, show: true },
    { Header: 'Perlu Grounding', accessor: 'grounding', minWidth: 170, disableFilters: true, show: true },
    { Header: 'Detail', accessor: 'detail', minWidth: 100, disableFilters: true, show: true },
    ...ACTION_COLUMN(),
  ];
};


/* WP ONLINE PEKERJA */
export const WP_PEKERJA = () => {
  return [
    { Header: 'No', accessor: 'number', width: '50px', disableFilters: true, show: true },
    { Header: 'Nama Pekerja', accessor: 'nama_pekerja', minWidth: 300, disableFilters: true, show: true },
    ...ACTION_COLUMN(),
  ];
};