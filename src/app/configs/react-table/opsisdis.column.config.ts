import { cdnUrl } from "@app/helper/cdn.helper";
import { ACTION_COLUMN ,NO} from "./_more.columns.config"

export const OPSISDIS_USULAN_JADWALHAR_ROTBMH_COLUMN = () => {
  return [

    ...NO(),
    ...ACTION_COLUMN(),
    { Header: 'Respon APD', accessor: 'respon_apd', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Status Pekerjaan', accessor: 'status_pekerjaan', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'NO Usulan', accessor: 'no_pekerjaan', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Kategori', accessor: 'kategori_rotbmh', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Jadwal', accessor: 'jenis_jadwal', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Tanggal', accessor: 'tanggal', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Tanggal Awal Pekerjaan', accessor: 'periode_awal', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Tanggal Akhir Pekerjaan', accessor: 'periode_akhir', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'UP3', accessor: 'nama_area', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'GI', accessor: 'nama_gardu_induk', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Penyulang', accessor: 'nama_penyulang', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Gardu', accessor: 'nama_gardu', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Butuh Pemadaman Gardu', accessor: 'butuh_padam', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Estimasi SAIDI', accessor: 'saidi', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Estimasi SAIFI', accessor: 'saifi', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Wilayah', accessor: 'wilayah', minWidth: '150px', disableFilters: false, show: true },
    // { Header: 'Jadwal', accessor: 'jenis_jadwal', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Jenis Pelayanan', accessor: 'jenis_pelayanan', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Jam Pekerjaan', accessor: 'jam_pekerjaan', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Pengawas', accessor: 'id_pengawas', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Pelaksana', accessor: 'id_pelaksana', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Sifat Pekerjaan', accessor: 'sifat_pekerjaan', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'JTM', accessor: 'jtm', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Keterangan', accessor: 'keterangan', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Inputer', accessor: 'user_created', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Tanggal Entri', accessor: 'datum_created', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Posko', accessor: 'nama_posko', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Pemilik Pekerjaan', accessor: 'nama_pemilik_pekerjaan', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Jumlah Gardu Padam', accessor: 'jumlah_gardu_padam', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Sifat Pekerjaan', accessor: 'sifat_pekerjaan_2', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Keterangan Detail Jenis Pekerjaan', accessor: 'keterangan_detail_jenis_pekerjaan', minWidth: '150px', disableFilters: false, show: true },
    ]
}
export const OPSISDIS_USULAN_GARDU_PEMELIHARAAN_COLUMN_JQX = () => {
  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'gardu', type: 'string' },
      { name: 'penyulang', type: 'string' },
      { name: 'gardu_induk', type: 'string' },
      { name: 'up3_1', type: 'string' },
      { name: 'alamat', type: 'string' },

      // { name: 'status', type: 'string' },

    ],
    columns: [
      { text: 'NO.', datafield: 'number', width: '3%', editable: false, },
      { text: 'Gardu', datafield: 'gardu', width: '17%', editable: false, },
      { text: 'Penyulang', datafield: 'penyulang', width: '20%', editable: false, },
      { text: 'GI', datafield: 'gardu_induk', width: '20%', editable: false, },
      { text: 'UP3', datafield: 'up3_1', width: '20%', editable: false, },
      { text: 'Alamat', datafield: 'alamat', width: '20%', editable: false, },

    ],
  };
};

export const OPSISDIS_DAFTAR_BATALHAR_COLUMN_JQX = () => {
  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'hari', type: 'string' },
      { name: 'tanggal', type: 'string' },
      { name: 'tgl_periode', type: 'string' },
      { name: 'jenis_pelayanan', type: 'string' },
      { name: 'nama_penyulang', type: 'string' },
      { name: 'jam_pekerjaan', type: 'string' },
      { name: 'id_pelaksana', type: 'string' },
      { name: 'sifat_pekerjaan', type: 'string' },
      { name: 'nama_area', type: 'string' },
      { name: 'nama_gardu_induk', type: 'string' },
      { name: 'periode', type: 'string' },
      { name: 'jtm', type: 'string' },
      { name: 'nama_gardu', type: 'string' },
      { name: 'butuh_padam', type: 'string' },
      { name: 'har_terakhir', type: 'string' },
      { name: 'wilayah_padam', type: 'string' },
      { name: 'wilayah', type: 'string' },
      { name: 'status_pekerjaan', type: 'string' },
      { name: 'jenis_jadwal', type: 'string' },

    ],
    columns: [
      { text: 'NO.', datafield: 'number', width: '5%', editable: false, },
      {
        text: 'Hari & Tanggal Usulan Pekerjaan',
        datafield: 'tanggal',
        width: '12%',
        editable: false,
        cellsrenderer: function (row: any, columnfield: any, value: any) {
          const date = new Date(value);

          // Mendapatkan hari dalam bentuk nama hari (contoh: "Senin", "Selasa", dsb.)
          const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
          const dayName = days[date.getDay()];

          // Mengubah format tanggal menjadi YYYY-MM-DD
          const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

          // Menggabungkan nama hari dan tanggal dalam format yang diinginkan
          return `<div style="padding: 8px;">${dayName}, ${formattedDate}</div>`;
        },
      },

      { text: 'Jenis Pelayanan', datafield: 'jenis_pelayanan', width: '12%', editable: false, },
      { text: 'Penyulang', datafield: 'nama_penyulang', width: '12%', editable: false, },
      { text: 'Jam Pekerjaan', datafield: 'jam_pekerjaan', width: '12%', editable: false, },
      { text: 'Pelaksana', datafield: 'id_pelaksana', width: '12%', editable: false, },
      { text: 'Sifat Pekerjaan', datafield: 'sifat_pekerjaan', width: '12%', editable: false, },
      { text: 'Area', datafield: 'nama_area', width: '12%', editable: false, },
      { text: 'GI', datafield: 'nama_gardu_induk', width: '12%', editable: false, },
      { text: 'Periode Pek', datafield: 'periode', width: '12%', editable: false, },
      { text: 'JTM', datafield: 'jtm', width: '12%', editable: false, },
      { text: 'Gardu', datafield: 'nama_gardu', width: '12%', editable: false, },
      { text: 'HAR Terakhir', datafield: 'har_terakhir', width: '12%', editable: false, },
      { text: 'Wilayah Padam', datafield: 'wilayah_padam', width: '12%', editable: false, },
      { text: 'Wilayah', datafield: 'wilayah', width: '12%', editable: false, },
      { text: 'Status Pekerjaan', datafield: 'status_pekerjaan', width: '12%', editable: false, },
      { text: 'Jadwal', datafield: 'jenis_jadwal', width: '12%', editable: false, },
    ],
  };
};

export const OPSISDIS_DAFTAR_RENCANAHAR_COLUMN_JQX = () => {
  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'hari', type: 'string' },
      { name: 'tanggal', type: 'string' },
      { name: 'tgl_periode', type: 'string' },
      { name: 'jenis_pelayanan', type: 'string' },
      { name: 'nama_penyulang', type: 'string' },
      { name: 'jam_pekerjaan', type: 'string' },
      { name: 'id_pelaksana', type: 'string' },
      { name: 'sifat_pekerjaan', type: 'string' },
      { name: 'nama_area', type: 'string' },
      { name: 'nama_gardu_induk', type: 'string' },
      { name: 'periode', type: 'string' },
      { name: 'jtm', type: 'string' },
      { name: 'nama_gardu', type: 'string' },
      { name: 'butuh_padam', type: 'string' },
      { name: 'har_terakhir', type: 'string' },
      { name: 'wilayah_padam', type: 'string' },
      { name: 'wilayah', type: 'string' },
      { name: 'status_pekerjaan', type: 'string' },
      { name: 'jenis_jadwal', type: 'string' },

    ],
    columns: [
      { text: 'NO.', datafield: 'number', width: '5%', editable: false, },
      {
        text: 'Hari & Tanggal Usulan Pekerjaan',
        datafield: 'tanggal',
        width: '12%',
        editable: false,
        cellsrenderer: function (row: any, columnfield: any, value: any) {
          const date = new Date(value);

          // Mendapatkan hari dalam bentuk nama hari (contoh: "Senin", "Selasa", dsb.)
          const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
          const dayName = days[date.getDay()];

          // Mengubah format tanggal menjadi YYYY-MM-DD
          const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

          // Menggabungkan nama hari dan tanggal dalam format yang diinginkan
          return `<div style="padding: 8px;">${dayName}, ${formattedDate}</div>`;
        },
      },

      { text: 'Jenis Pelayanan', datafield: 'jenis_pelayanan', width: '12%', editable: false, },
      { text: 'Penyulang', datafield: 'nama_penyulang', width: '12%', editable: false, },
      { text: 'Jam Pekerjaan', datafield: 'jam_pekerjaan', width: '12%', editable: false, },
      { text: 'Pelaksana', datafield: 'id_pelaksana', width: '12%', editable: false, },
      { text: 'Sifat Pekerjaan', datafield: 'sifat_pekerjaan', width: '12%', editable: false, },
      { text: 'Area', datafield: 'nama_area', width: '12%', editable: false, },
      { text: 'GI', datafield: 'nama_gardu_induk', width: '12%', editable: false, },
      { text: 'Periode Pek', datafield: 'periode', width: '12%', editable: false, },
      { text: 'JTM', datafield: 'jtm', width: '12%', editable: false, },
      { text: 'Gardu', datafield: 'nama_gardu', width: '12%', editable: false, },
      { text: 'Butuh Pemadaman Gardu', datafield: 'butuh_padam', width: '12%', editable: false, columntype: 'checkbox', filtertype: 'bool' },
      { text: 'HAR Terakhir', datafield: 'har_terakhir', width: '12%', editable: false, },
      { text: 'Wilayah Padam', datafield: 'wilayah_padam', width: '12%', editable: false, },
      { text: 'Wilayah', datafield: 'wilayah', width: '12%', editable: false, },
      { text: 'Status Pekerjaan', datafield: 'status_pekerjaan', width: '12%', editable: false, },
      { text: 'Jadwal', datafield: 'jenis_jadwal', width: '12%', editable: false, },
    ],
  };
};

export const OPSISDIS_POSTING_JADWALHAR_ROTBMH_COLUMN = () => {
  return [

    ...NO(),
    ...ACTION_COLUMN(),
    // { Header: 'Respon APD', accessor: 'respon_apd', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Status Pekerjaan', accessor: 'status_pekerjaan', minWidth: '150px', disableFilters: false, show: true, },
    { Header: 'NO Usulan', accessor: 'no_pekerjaan', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Kategori', accessor: 'kategori_rotbmh', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Jadwal', accessor: 'jenis_jadwal', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Tanggal', accessor: 'tanggal', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Tanggal Awal Pekerjaan', accessor: 'periode_awal', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Tanggal Akhir Pekerjaan', accessor: 'periode_akhir', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Area', accessor: 'nama_area', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'GI', accessor: 'nama_gardu_induk', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Penyulang', accessor: 'nama_penyulang', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Gardu', accessor: 'nama_gardu', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Butuh Pemadaman Gardu', accessor: 'butuh_padam', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Estimasi SAIDI', accessor: 'saidi', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Estimasi SAIFI', accessor: 'saifi', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Wilayah', accessor: 'wilayah', minWidth: '150px', disableFilters: false, show: true },
    // { Header: 'Jadwal', accessor: 'jenis_jadwal', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Jenis Pelayanan', accessor: 'jenis_pelayanan', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Jam Pekerjaan', accessor: 'jam_pekerjaan', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Pengawas', accessor: 'id_pengawas', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Pelaksana', accessor: 'id_pelaksana', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Sifat Pekerjaan', accessor: 'sifat_pekerjaan', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'JTM', accessor: 'jtm', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Keterangan', accessor: 'keterangan', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Inputer', accessor: 'user_created', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Tanggal Entri', accessor: 'datum_created', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Tanggal Posting', accessor: 'tanggal_posting', minWidth: '150px', disableFilters: false, show: true },
  ]
}
export const OPSISDIS_DOKUMENHAR_COLUMN_JQX = () => {
  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'trans_jadwal_har_dok_id', type: 'string' },
      { name: 'trans_jadwal_har_id', type: 'string' },
      { name: 'nama_file', type: 'string' },
      { name: 'created_at', type: 'string' },
      { name: 'nama_dok', type: 'string' }
    ],
    columns: [
      { text: 'NO', datafield: 'number', width: '3%', editable: false, },
      {
        text: 'Nama Dokumen',
        datafield: 'nama_dok',
        width: '47%',
        editable: false,
        align: 'center', // Untuk menengahkan judul kolom
        cellsalign: 'center', // Untuk menengahkan isi kolom
        cellsRenderer: function (row: any, column: any, value: any, defaultHtml: any, columnSettings: any, rowData: any) {
          const fullUrl = cdnUrl(rowData.nama_file); // Ganti dengan URL yang sesuai jika diperlukan
          const HexColor = '#1e0fbe'; // Hex code for blue

          return `<div style="text-align: center;">
                    <a href="${fullUrl}" target="_blank" style="color: ${HexColor}; display: inline-block; width: 100%; height: 100%; line-height: 30px; text-align: center; pointer-events: auto;">
                      ${value}
                    </a>
                  </div>`;
        }
      },
      {
        text: 'Tanggal Upload',
        datafield: 'created_at',
        width: '49%',
        editable: false,
        align: 'center',
        cellsalign: 'center',
      },
    ],
  };
};

export const OPSISDIS_APPROVE_JADWALHAR_COLUMN = () => {
  return [

    ...NO(),
    ...ACTION_COLUMN(),
    // { Header: 'Respon APD', accessor: 'respon_apd', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Status Pekerjaan', accessor: 'status_pekerjaan', minWidth: '150px', disableFilters: false, show: true, },
    // { Header: 'NO Usulan', accessor: 'no_pekerjaan', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Tanggal Usulan Pekerjaan', accessor: 'tanggal', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Tanggal Mulai Pekerjaan', accessor: 'periode_awal', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Tanggal Akhir Pekerjaan', accessor: 'periode_akhir', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Area', accessor: 'nama_area', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'GI', accessor: 'nama_gardu_induk', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Penyulang', accessor: 'nama_penyulang', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Gardu', accessor: 'nama_gardu', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Butuh Pemadaman Gardu', accessor: 'butuh_padam', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Estimasi SAIDI', accessor: 'saidi', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Estimasi SAIFI', accessor: 'saifi', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Wilayah', accessor: 'wilayah', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Jadwal', accessor: 'jenis_jadwal', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Jenis Pelayanan', accessor: 'jenis_pelayanan', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Jam Pekerjaan', accessor: 'jam_pekerjaan', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Pengawas', accessor: 'id_pengawas', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Pelaksana', accessor: 'id_pelaksana', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Sifat Pekerjaan', accessor: 'sifat_pekerjaan', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'JTM', accessor: 'jtm', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Keterangan', accessor: 'keterangan', minWidth: '150px', disableFilters: false, show: true },
    // { Header: 'Inputer', accessor: 'inputer', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Approval', accessor: 'approval', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Tanggal Entri', accessor: 'datum_created', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Tanggal Posting', accessor: 'tanggal_posting', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Tanggal Approve', accessor: 'tanggal_approvel', minWidth: '150px', disableFilters: false, show: true },
    ]
}



export const OPSISDIS_APPROVE_JADWALHAR_ROTBMH_COLUMN = () => {
  return [

    ...NO(),
    ...ACTION_COLUMN(),
    // { Header: 'Respon APD', accessor: 'respon_apd', minWidth: '150px', disableFilters: false, show: true },
    
    // { Header: 'Kelengkapan Data', accessor: 'is_data_lengkap', minWidth: '150px', disableFilters: false, show: true, },
    { Header: 'Ceklis Data Lengkap', accessor: 'ceklis_lengkap', minWidth: '150px', disableFilters: false, show: true, },
    { Header: 'Keterangan Kelengkapan', accessor: 'keterangan_kelengkapan', minWidth: '150px', disableFilters: false, show: true, },
    { Header: 'Status Pekerjaan', accessor: 'status_pekerjaan', minWidth: '150px', disableFilters: false, show: true, },
    // { Header: 'NO Usulan', accessor: 'no_pekerjaan', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Kategori', accessor: 'kategori_rotbmh', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Jadwal', accessor: 'jenis_jadwal', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Tanggal Usulan Pekerjaan', accessor: 'tanggal', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Tanggal Mulai Pekerjaan', accessor: 'periode_awal', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Tanggal Akhir Pekerjaan', accessor: 'periode_akhir', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Area', accessor: 'nama_area', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'GI', accessor: 'nama_gardu_induk', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Penyulang', accessor: 'nama_penyulang', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Gardu', accessor: 'nama_gardu', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Butuh Pemadaman Gardu', accessor: 'butuh_padam', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Estimasi SAIDI', accessor: 'saidi', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Estimasi SAIFI', accessor: 'saifi', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Wilayah', accessor: 'wilayah', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Jenis Pelayanan', accessor: 'jenis_pelayanan', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Jam Pekerjaan', accessor: 'jam_pekerjaan', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Pengawas', accessor: 'id_pengawas', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Pelaksana', accessor: 'id_pelaksana', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Sifat Pekerjaan', accessor: 'sifat_pekerjaan', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'JTM', accessor: 'jtm', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Keterangan', accessor: 'keterangan', minWidth: '150px', disableFilters: false, show: true },
    // { Header: 'Inputer', accessor: 'inputer', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Approval', accessor: 'approval', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Tanggal Entri', accessor: 'datum_created', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Tanggal Posting', accessor: 'tanggal_posting', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Tanggal Approve', accessor: 'tanggal_approvel', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Posko', accessor: 'nama_posko', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Pemilik Pekerjaan', accessor: 'nama_pemilik_pekerjaan', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Jumlah Gardu Padam', accessor: 'jumlah_gardu_padam', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Sifat Pekerjaan', accessor: 'sifat_pekerjaan_2', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Keterangan Detail Jenis Pekerjaan', accessor: 'keterangan_detail_jenis_pekerjaan', minWidth: '150px', disableFilters: false, show: true },
  
  ]
}
export const OPSISDIS_UPDATEPROG_ROTBMH_JADWALHAR_COLUMN = () => {
  return [

    ...NO(),
    ...ACTION_COLUMN(),
    // { Header: 'Respon APD', accessor: 'respon_apd', minWidth: '150px', disableFilters: false, show: true },
    // { Header: 'Status Pekerjaan', accessor: 'status_pekerjaan', minWidth: '150px', disableFilters: false, show: true, },
    // { Header: 'NO Usulan', accessor: 'no_pekerjaan', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Kode P', accessor: 'kode_p', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Tanggal', accessor: 'tanggal', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Kategori', accessor: 'kategori_rotbmh', minWidth: '150px', disableFilters: false, show: true },
    // { Header: 'Tanggal Mulai Pekerjaan', accessor: 'periode_awal', minWidth: '150px', disableFilters: false, show: true },
    // { Header: 'Tanggal Akhir Pekerjaan', accessor: 'periode_akhir', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Area', accessor: 'nama_area', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'GI', accessor: 'nama_gardu_induk', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Penyulang', accessor: 'nama_penyulang', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Gardu', accessor: 'nama_gardu', minWidth: '150px', disableFilters: false, show: true },
    // { Header: 'Butuh Pemadaman Gardu', accessor: 'butuh_padam', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Butuh Pemadaman Gardu', accessor: 'butuh_padam', minWidth: '150px', disableFilters: false, show: true },
    // { Header: 'Wilayah', accessor: 'wilayah', minWidth: '150px', disableFilters: false, show: true },
    // { Header: 'Jadwal', accessor: 'jenis_jadwal', minWidth: '150px', disableFilters: false, show: true },
    // { Header: 'Jenis Pelayanan', accessor: 'jenis_pelayanan', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Jam Pekerjaan', accessor: 'jam_pekerjaan', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Realisasi Padam', accessor: 'jam_buka', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Realisasi Nyala', accessor: 'jam_tutup', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Jam Realisasi', accessor: 'durasi_menit', minWidth: '150px', disableFilters: false, show: true },
    // { Header: 'Pengawas', accessor: 'pengawis', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Pelaksana', accessor: 'id_pelaksana', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Sifat Pekerjaan', accessor: 'sifat_pekerjaan', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'JTM', accessor: 'jtm', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Keterangan', accessor: 'keterangan', minWidth: '150px', disableFilters: false, show: true },
    // { Header: 'Inputer', accessor: 'inputer', minWidth: '150px', disableFilters: false, show: true },
    // { Header: 'Tanggal Entri', accessor: 'datum_created', minWidth: '150px', disableFilters: false, show: true },
  ]
}

export const OPSISDIS_USULAN_GARDU_PEMELIHARAAN_COLUMN = () => {
  return [
    ...NO(),
    ...ACTION_COLUMN(),
    {
      Header: "Gardu",
      accessor: "gardu",
      minWidth: "200px",
      show: true,
      disableFilters: false,
    },
    {
      Header: "Penyulang",
      accessor: "penyulang",
      minWidth: "200px",
      show: true,
      disableFilters: false,
    },
    {
      Header: "GI",
      accessor: "gardu_induk",
      minWidth: "100px",
      show: true,
      disableFilters: false,
    },
    {
      Header: "UP3",
      accessor: "up3_1",
      minWidth: "100px",
      show: true,
      disableFilters: false,
    },
    {
      Header: "Alamat",
      accessor: "alamat",
      minWidth: "200px",
      show: true,
      disableFilters: false,
    },
    // ...ACTION_COLUMN(),
  ];
};
export const OPSISDIS_DOKUMENHAR_COLUMN_JQ = () => {
  return [
    ...NO(),
    ...ACTION_COLUMN(),
    {
      Header: "Nama Dokumen",
      accessor: "nama_dok",
      minWidth: "300px",
      show: true,
      disableFilters: false,
    },
    {
      Header: "Tanggal Upload",
      accessor: "created_at",
      minWidth: "300px",
      show: true,
      disableFilters: false,
    },


    // ...ACTION_COLUMN(),
  ];
};
export const OPSISDIS_UPDATEPROG_JADWALHAR_COLUMN = () => {
  return [

    ...NO(),
    ...ACTION_COLUMN(),
    // { Header: 'Respon APD', accessor: 'respon_apd', minWidth: '150px', disableFilters: false, show: true },
    // { Header: 'Status Pekerjaan', accessor: 'status_pekerjaan', minWidth: '150px', disableFilters: false, show: true, },
    // { Header: 'NO Usulan', accessor: 'no_pekerjaan', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Tanggal', accessor: 'tanggal', minWidth: '150px', disableFilters: false, show: true },
    // { Header: 'Tanggal Mulai Pekerjaan', accessor: 'periode_awal', minWidth: '150px', disableFilters: false, show: true },
    // { Header: 'Tanggal Akhir Pekerjaan', accessor: 'periode_akhir', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Area', accessor: 'nama_area', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'GI', accessor: 'nama_gardu_induk', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Penyulang', accessor: 'nama_penyulang', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Gardu', accessor: 'nama_gardu', minWidth: '150px', disableFilters: false, show: true },
    // { Header: 'Butuh Pemadaman Gardu', accessor: 'butuh_padam', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Butuh Pemadaman Gardu', accessor: 'butuh_padam', minWidth: '150px', disableFilters: false, show: true },
    // { Header: 'Wilayah', accessor: 'wilayah', minWidth: '150px', disableFilters: false, show: true },
    // { Header: 'Jadwal', accessor: 'jenis_jadwal', minWidth: '150px', disableFilters: false, show: true },
    // { Header: 'Jenis Pelayanan', accessor: 'jenis_pelayanan', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Jam Pekerjaan', accessor: 'jam_pekerjaan', minWidth: '150px', disableFilters: false, show: true },
    // { Header: 'Pengawas', accessor: 'pengawis', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Pelaksana', accessor: 'id_pelaksana', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Sifat Pekerjaan', accessor: 'sifat_pekerjaan', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'JTM', accessor: 'jtm', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Keterangan', accessor: 'keterangan', minWidth: '150px', disableFilters: false, show: true },
    // { Header: 'Inputer', accessor: 'inputer', minWidth: '150px', disableFilters: false, show: true },
    // { Header: 'Tanggal Entri', accessor: 'datum_created', minWidth: '150px', disableFilters: false, show: true },
  ]
}
export const OPSISDIS_APPROVE_UID_JADWALHAR_ROTBMH_COLUMN = () => {
  return [

    ...NO(),
    ...ACTION_COLUMN(),
    // { Header: 'Respon APD', accessor: 'respon_apd', minWidth: '150px', disableFilters: false, show: true },
    
    { Header: 'Status Pekerjaan', accessor: 'status_pekerjaan', minWidth: '150px', disableFilters: false, show: true, },
    // { Header: 'NO Usulan', accessor: 'no_pekerjaan', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Kategori', accessor: 'kategori_rotbmh', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Jadwal', accessor: 'jenis_jadwal', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Tanggal Usulan Pekerjaan', accessor: 'tanggal', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Tanggal Mulai Pekerjaan', accessor: 'periode_awal', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Tanggal Akhir Pekerjaan', accessor: 'periode_akhir', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Area', accessor: 'nama_area', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'GI', accessor: 'nama_gardu_induk', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Penyulang', accessor: 'nama_penyulang', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Gardu', accessor: 'nama_gardu', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Butuh Pemadaman Gardu', accessor: 'butuh_padam', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Estimasi SAIDI', accessor: 'saidi', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Estimasi SAIFI', accessor: 'saifi', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Wilayah', accessor: 'wilayah', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Jenis Pelayanan', accessor: 'jenis_pelayanan', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Jam Pekerjaan', accessor: 'jam_pekerjaan', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Pengawas', accessor: 'id_pengawas', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Pelaksana', accessor: 'id_pelaksana', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Sifat Pekerjaan', accessor: 'sifat_pekerjaan', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'JTM', accessor: 'jtm', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Keterangan', accessor: 'keterangan', minWidth: '150px', disableFilters: false, show: true },
    // { Header: 'Inputer', accessor: 'inputer', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Approval', accessor: 'approval', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Tanggal Entri', accessor: 'datum_created', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Tanggal Posting', accessor: 'tanggal_posting', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Tanggal Approve', accessor: 'tanggal_approvel', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Posko', accessor: 'nama_posko', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Pemilik Pekerjaan', accessor: 'nama_pemilik_pekerjaan', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Jumlah Gardu Padam', accessor: 'jumlah_gardu_padam', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Sifat Pekerjaan', accessor: 'sifat_pekerjaan_2', minWidth: '150px', disableFilters: false, show: true },
    { Header: 'Keterangan Detail Jenis Pekerjaan', accessor: 'keterangan_detail_jenis_pekerjaan', minWidth: '150px', disableFilters: false, show: true },
  
  ]
}

export const PENGUKURAN_BEBAN_PEMBANGKIT = () => {
  return [
    { Header: 'No', accessor: 'number', minWidth: 70, disableFilters: true, show: true, type: "string", allowEditing: false, allowUpdating: false,fixed:true },
    { Header: 'Unit Pembangkit', accessor: 'nama_parent', minWidth: 200, show: true, disableFilters: true, type: "string", allowEditing: false, allowUpdating: false,fixed:true },
    { Header: 'Pembangkit', accessor: 'nama_lokasi', minWidth: 250, show: true, disableFilters: true, type: "string", allowEditing: false, allowUpdating: false,fixed:true },
    { Header: 'Tanggal', accessor: 'datetime', minWidth: 150, show: true, disableFilters: true, allowEditing: false, allowUpdating: false },
    { Header: 'Arus (A)', accessor: 'i', show: true, disableFilters: true, allowEditing: true, allowUpdating: true, minWidth: 140, enabled: false },
    { Header: 'Tegangan (kV)', accessor: 'v', show: true, disableFilters: true, allowEditing: true, allowUpdating: true, minWidth: 140, enabled: false },
    { Header: 'Daya Aktif (MW)', accessor: 'p', show: true, disableFilters: true, allowEditing: true, allowUpdating: true, minWidth: 140, enabled: false },
  ]
}

export const PENGUKURAN_BEBAN_PENYULANG = () => {
  return [
    { Header: 'No', accessor: 'number', Width: 70, disableFilters: true, show: true, type: "string", allowEditing: false, allowUpdating: false,fixed:true },
     { Header: 'Tanggal', accessor: 'datetime', minWidth: 150, show: true, disableFilters: true, allowEditing: false, allowUpdating: false, type: "string",fixed:true },
     { Header: 'Gardu Induk', accessor: 'penyulang_gardu_induk', minWidth: 150, show: true, disableFilters: true, type: "string", allowEditing: false, allowUpdating: false,fixed:true },
    // { Header: 'Penyulang', accessor: 'kode_penyulang', minWidth: 100, show: true, disableFilters: true, type: "string", allowEditing: false, allowUpdating: false,fixed:true },
    { Header: 'Trafo', accessor: 'nama_parent', minWidth: 50, show: true, disableFilters: true, type: "string", allowEditing: false, allowUpdating: false,fixed:true },
    { Header: 'Penyulang', accessor: 'nama_lokasi', minWidth: 150, show: true, disableFilters: true, type: "string", allowEditing: false, allowUpdating: false,fixed:true },
    { Header: 'UP3', accessor: 'up3', minWidth: 150, show: true, disableFilters: true, type: "string", allowEditing: false, allowUpdating: false },
    { Header: 'ULP', accessor: 'ulp', minWidth: 150, show: true, disableFilters: true, type: "string", allowEditing: false, allowUpdating: false },
    { Header: 'Pemilik', accessor: 'pemilik', minWidth: 90, show: true, disableFilters: true, type: "string", allowEditing: false, allowUpdating: false },
    { Header: 'I. Max (A)', accessor: 'i_max', show: true, disableFilters: true, allowEditing: true, allowUpdating: true, minWidth: 100, enabled: false, type: "number" },
    
    // { Header: 'No Urut Cell', accessor: 'no_urut_cell', show: true, disableFilters: true, allowEditing: true, allowUpdating: true, minWidth: 100, enabled: false, type: "number" },
    { Header: 'Arus (A)', accessor: 'i', show: true, disableFilters: true, allowEditing: true, allowUpdating: true, minWidth: 100, enabled: false, type: "number" },
    { Header: 'Tegangan (kV)', accessor: 'v', show: true, disableFilters: true, allowEditing: true, allowUpdating: true, minWidth: 120, enabled: false, type: "number" },
    { Header: 'COS PHI', accessor: 'cosq', show: true, disableFilters: true, allowEditing: true, allowUpdating: true, minWidth: 100, enabled: false, type: "number" },
    { Header: 'Daya Aktif (MW)', accessor: 'p', show: true, disableFilters: true, allowEditing: false, allowUpdating: false, minWidth: 100, enabled: false, type: "string" },
  ]
}

export const PENGUKURAN_BEBAN_TRAFO_GI = () => {
  return [
    
    { Header: 'No', accessor: 'number', Width: 70, disableFilters: true, show: true, type: "string", allowEditing: false, allowUpdating: false,fixed:true },
    { Header: 'Tanggal', accessor: 'datetime', minWidth: 150, show: true, disableFilters: true, allowEditing: false, allowUpdating: false,fixed:true },
    { Header: 'Gardu Induk', accessor: 'nama_parent', minWidth: 150, show: true, disableFilters: true, type: "string", allowEditing: false, allowUpdating: false,fixed:true },
    { Header: 'Trafo', accessor: 'nama_lokasi', minWidth: 50, show: true, disableFilters: true, type: "string", allowEditing: false, allowUpdating: false,fixed:true },
    { Header: 'I. Max (A)', accessor: 'i_max', minWidth: 100, show: true, disableFilters: true, type: "string", allowEditing: false, allowUpdating: false },
    { Header: 'Arus (A)', accessor: 'i', show: true, disableFilters: true, allowEditing: true, allowUpdating: true, minWidth: 100, enabled: false },
    { Header: 'Tegangan (kV)', accessor: 'v', show: true, disableFilters: true, allowEditing: true, allowUpdating: true, minWidth: 100, enabled: false },
    { Header: 'COS PHI', accessor: 'cosq', show: true, disableFilters: true, allowEditing: true, allowUpdating: true, minWidth: 100, enabled: false },
    { Header: 'Daya Aktif (MW)', accessor: 'p', show: true, disableFilters: true, allowEditing: false, allowUpdating: false, minWidth: 100, enabled: false },
  ]
}

export const PENGUKURAN_BEBAN_TRAFO_GI_KTT = () => {
  return [
    
    { Header: 'No', accessor: 'number', Width: 70, disableFilters: true, show: true, type: "string", allowEditing: false, allowUpdating: false,fixed:true },
    { Header: 'Tanggal', accessor: 'datetime', minWidth: 150, show: true, disableFilters: true, allowEditing: false, allowUpdating: false,fixed:true },
    { Header: 'Gardu Induk', accessor: 'nama_parent', minWidth: 150, show: true, disableFilters: true, type: "string", allowEditing: false, allowUpdating: false,fixed:true },
    { Header: 'Nama KTT', accessor: 'nama_lokasi', minWidth: 50, show: true, disableFilters: true, type: "string", allowEditing: false, allowUpdating: false,fixed:true },
    { Header: 'I. Max (A)', accessor: 'i_max', minWidth: 100, show: true, disableFilters: true, type: "string", allowEditing: false, allowUpdating: false },
    { Header: 'Arus (A)', accessor: 'i', show: true, disableFilters: true, allowEditing: true, allowUpdating: true, minWidth: 100, enabled: false },
    { Header: 'Tegangan (kV)', accessor: 'v', show: true, disableFilters: true, allowEditing: true, allowUpdating: true, minWidth: 100, enabled: false },
    { Header: 'COS PHI', accessor: 'cosq', show: true, disableFilters: true, allowEditing: true, allowUpdating: true, minWidth: 100, enabled: false },
    // { Header: 'Daya Aktif (MW)', accessor: 'p', show: true, disableFilters: true, allowEditing: false, allowUpdating: false, minWidth: 100, enabled: false },
  ]
}

export const PENGUKURAN_BEBAN_ZONE = () => {
  return [
    { Header: 'No', accessor: 'number', Width: 70, disableFilters: true, show: true, type: "string", allowEditing: false, allowUpdating: false },
    { Header: 'Penyulang', accessor: 'nama_parent', minWidth: 200, show: true, disableFilters: true, type: "string", allowEditing: false, allowUpdating: false },
    { Header: 'Zone', accessor: 'nama_lokasi', minWidth: 250, show: true, disableFilters: true, type: "string", allowEditing: false, allowUpdating: false },
    { Header: 'Tanggal', accessor: 'datetime', minWidth: 150, show: true, disableFilters: true, allowEditing: false, allowUpdating: false },

    { Header: 'Arus (A)', accessor: 'i', show: true, disableFilters: true, allowEditing: true, allowUpdating: true, minWidth: 100, enabled: false },
    { Header: 'Tegangan (kV)', accessor: 'v', show: true, disableFilters: true, allowEditing: true, allowUpdating: true, minWidth: 130, enabled: false },
    { Header: 'Daya Aktif (MW)', accessor: 'p', show: true, disableFilters: true, allowEditing: true, allowUpdating: true, minWidth: 130, enabled: false },
  ]
}


export const PENGUKURAN_BEBAN_AREA = () => {
  return [
    { Header: 'No', accessor: 'number', Width: 70, disableFilters: true, show: true, type: "string", allowEditing: false, allowUpdating: false },
    { Header: 'UP3', accessor: 'nama_lokasi', minWidth: 300, show: true, disableFilters: true, type: "string", allowEditing: false, allowUpdating: false },
    { Header: 'Tanggal', accessor: 'datetime', minWidth: 170, show: true, disableFilters: true, allowEditing: false, allowUpdating: false },

    { Header: 'Arus (A)', accessor: 'i', show: true, disableFilters: true, allowEditing: true, allowUpdating: true, minWidth: 180, enabled: false },
    { Header: 'Tegangan (kV)', accessor: 'v', show: true, disableFilters: true, allowEditing: true, allowUpdating: true, minWidth: 180, enabled: false },
    { Header: 'Daya Aktif (MW)', accessor: 'p', show: true, disableFilters: true, allowEditing: true, allowUpdating: true, minWidth: 180, enabled: false },
  ]
}


export const PENGUKURAN_BEBAN_WILAYAH = () => {
  return [
    { Header: 'No', accessor: 'number', Width: 70, disableFilters: true, show: true, type: "string", allowEditing: false, allowUpdating: false },
    { Header: 'Wilayah', accessor: 'nama_lokasi', minWidth: 300, show: true, disableFilters: true, type: "string", allowEditing: false, allowUpdating: false },
    { Header: 'Tanggal', accessor: 'datetime', minWidth: 170, show: true, disableFilters: true, allowEditing: false, allowUpdating: false },
    { Header: 'Arus (A)', accessor: 'i', show: true, disableFilters: true, allowEditing: true, allowUpdating: true, minWidth: 180, enabled: false },
    { Header: 'Tegangan (kV)', accessor: 'v', show: true, disableFilters: true, allowEditing: true, allowUpdating: true, minWidth: 180, enabled: false },
    { Header: 'Daya Aktif (MW)', accessor: 'p', show: true, disableFilters: true, allowEditing: true, allowUpdating: true, minWidth: 180, enabled: false },
  ]
}

export const PENGUKURAN_BEBAN_LOAD_PROFILE = () => {
  return [
    { Header: 'No', accessor: 'number', Width: 50, disableFilters: true, show: true, type: "string", allowEditing: false, allowUpdating: false },
    { Header: 'Tanggal', accessor: 'datetime', minWidth: 150, show: true, disableFilters: true, allowEditing: false, allowUpdating: false },
    { Header: 'Custormer ID', accessor: 'customer_rid', minWidth: 200, show: true, disableFilters: true, type: "string", allowEditing: false, allowUpdating: false },
    { Header: 'Customer Name', accessor: 'customer_name', minWidth: 200, show: true, disableFilters: true, type: "string", allowEditing: false, allowUpdating: false },

    {
      Header: 'Arus (A)', accessor: 'i', show: true, disableFilters: true, allowEditing: true, allowUpdating: true, minWidth: 100, enabled: false, columns: [
        { Header: 'R', accessor: 'i', show: true, disableFilters: true, allowEditing: true, allowUpdating: true, minWidth: 100, enabled: false },
        { Header: 'T', accessor: 'i', show: true, disableFilters: true, allowEditing: true, allowUpdating: true, minWidth: 100, enabled: false },
        { Header: 'S', accessor: 'i', show: true, disableFilters: true, allowEditing: true, allowUpdating: true, minWidth: 100, enabled: false }
      ]
    },
  ]
}

export const PENGUKURAN_BEBAN_ENERGI_TRAFO = () => {
  return [
    { Header: 'Trafo', accessor: 'no_trafo', minWidth: '100px', show: true, disableFilters: true, columns: [] },
    {
      Header: 'Stand Awal', minWidth: '100px', show: true, disableFilters: true, columns: [
        { Header: 'Export', accessor: 'sa_export', minWidth: '100px', show: true, disableFilters: true, },
        { Header: 'Import', accessor: 'sa_import', minWidth: '100px', show: true, disableFilters: true, },
      ]
    },
    {
      Header: 'Stand Saat', accessor: 'sa_import', minWidth: '100px', show: true, disableFilters: true, columns: [
        { Header: 'Stand Saat Ini Export', accessor: 'ss_export', minWidth: '100px', show: true, disableFilters: true, },
        { Header: 'Stand Saat Ini  Import', accessor: 'ss_import', minWidth: '100px', show: true, disableFilters: true, },
        { Header: 'Stand Saat Ini Exp. Keterangan', accessor: 'ss_export_keterangan', minWidth: '100px', show: true, disableFilters: true, },
        { Header: 'Stand Saat Ini  Imp Keterangan', accessor: 'ss_import_keterangan', minWidth: '100px', show: true, disableFilters: true, },
      ]
    },
  ]
}

export const PENGUKURAN_BEBAN_ENERGI_PENYULANG = () => {
  return [
    { Header: 'Trafo', accessor: 'no_trafo', minWidth: '100px', show: true, disableFilters: true },
    {
      Header: 'Stand Awal', accessor: 'sa_export', minWidth: '100px', show: true, disableFilters: true, columns: [
        { Header: 'Export', accessor: 'sa_export', minWidth: '100px', show: true, disableFilters: true, },
        { Header: 'Import', accessor: 'sa_import', minWidth: '100px', show: true, disableFilters: true, },
      ]
    },
    {
      Header: 'Stand Saat', accessor: 'sa_import', minWidth: '100px', show: true, disableFilters: true, columns: [
        { Header: 'Stand Saat Ini Export', accessor: 'ss_export', minWidth: '100px', show: true, disableFilters: true, },
        { Header: 'Stand Saat Ini  Import', accessor: 'ss_import', minWidth: '100px', show: true, disableFilters: true, },
      ]
    },
  ]
}


export const PENGUKURAN_BEBAN_ENERGI_CUSTOMER = () => {
  return [
    { Header: 'Customer ID', accessor: 'customer_rid', minWidth: '100px', show: true, disableFilters: true, },
    { Header: 'Nama', accessor: 'nama', minWidth: '100px', show: true, disableFilters: true, },
    { Header: 'Alamat', accessor: 'alamat', minWidth: '100px', show: true, disableFilters: true, },
    { Header: 'lokasi', accessor: 'lok', minWidth: '100px', show: true, disableFilters: true, },
    { Header: 'Meter ID', accessor: 'meter_id', minWidth: '100px', show: true, disableFilters: true, },
    { Header: 'Meter Type', accessor: 'meter_type', minWidth: '100px', show: true, disableFilters: true, },
    { Header: 'Daya', accessor: 'daya', minWidth: '100px', show: true, disableFilters: true, },
    { Header: 'Gol Tarif', accessor: 'goltarif', minWidth: '100px', show: true, disableFilters: true, },
    { Header: 'Modem ADR', accessor: 'modem_adr', minWidth: '100px', show: true, disableFilters: true, },
    { Header: 'BAPM', accessor: 'bapm', minWidth: '100px', show: true, disableFilters: true, },
    { Header: 'Faktor Kali', accessor: 'faktor_kali', minWidth: '100px', show: true, disableFilters: true, },
    { Header: 'Nofa', accessor: 'nofa', minWidth: '100px', show: true, disableFilters: true, },
    { Header: 'Rate', accessor: 'rate', minWidth: '100px', show: true, disableFilters: true, },
    { Header: 'Kode gardu', accessor: 'kodegardu', minWidth: '100px', show: true, disableFilters: true, },

    ...ACTION_COLUMN(),
  ]
}

export const PENGUKURAN_BEBAN_ENERGI = () => {
  return [
    { Header: 'Nama', accessor: 'ref_customer.nama', minWidth: '100px', show: true, disableFilters: true, },
    { Header: 'KWH', accessor: 'kwh', minWidth: '100px', show: true, disableFilters: true, },
    { Header: 'KVARH', accessor: 'kvarh', minWidth: '100px', show: true, disableFilters: true, },
    { Header: 'KVAH', accessor: 'kvah', minWidth: '100px', show: true, disableFilters: true, },
    { Header: 'FK', accessor: 'fk', minWidth: '100px', show: true, disableFilters: true, },
    { Header: 'KWH Prev', accessor: 'kwh_prev', minWidth: '100px', show: true, disableFilters: true, },
    { Header: 'KVARH Prev', accessor: 'kvarh_prev', minWidth: '100px', show: true, disableFilters: true, },
    { Header: 'KVAH Prev', accessor: 'kvah_prev', minWidth: '100px', show: true, disableFilters: true, },
    { Header: 'Rate 1', accessor: 'rate1', minWidth: '100px', show: true, disableFilters: true, },
    { Header: 'Rate 2', accessor: 'rate2', minWidth: '100px', show: true, disableFilters: true, },
    { Header: 'Rate 3', accessor: 'rate3', minWidth: '100px', show: true, disableFilters: true, },
    { Header: 'Rate Prev 1', accessor: 'rate1_prev', minWidth: '100px', show: true, disableFilters: true, },
    { Header: 'Rate Prev 2', accessor: 'rate2_prev', minWidth: '100px', show: true, disableFilters: true, },
    { Header: 'Rate Prev 3', accessor: 'rate3_prev', minWidth: '100px', show: true, disableFilters: true, },
    { Header: 'Maxdem', accessor: 'maxdem', minWidth: '100px', show: true, disableFilters: true, },
    { Header: 'Tgl Maxdem', accessor: 'tgl_maxdem', minWidth: '100px', show: true, disableFilters: true, },
    { Header: 'Tgl', accessor: 'tgl', minWidth: '100px', show: true, disableFilters: true, },
    { Header: 'Tgl Prev', accessor: 'tgl_prev', minWidth: '100px', show: true, disableFilters: true, },
    { Header: 'Tgl Capture', accessor: 'tgl_capture', minWidth: '100px', show: true, disableFilters: true, },

    ...ACTION_COLUMN(),
  ]
}





export const FREQUENSI_EKSEKUSI_RECORD = () => {
  return [
    { Header: 'Trafo', accessor: 'no_trafo', minWidth: '100px', show: true, disableFilters: true, columns: [] },
    {
      Header: 'Stand Awal', accessor: 'sa_export', minWidth: '100px', show: true, disableFilters: true, columns: [
        { Header: 'Export', accessor: 'sa_export', minWidth: '100px', show: true, disableFilters: true, },
        { Header: 'Import', accessor: 'sa_import', minWidth: '100px', show: true, disableFilters: true, },
      ]
    },
    {
      Header: 'Stand Saat', accessor: 'sa_import', minWidth: '100px', show: true, disableFilters: true, columns: [
        { Header: 'Stand Saat Ini Export', accessor: 'ss_export', minWidth: '100px', show: true, disableFilters: true, },
        { Header: 'Stand Saat Ini  Import', accessor: 'ss_import', minWidth: '100px', show: true, disableFilters: true, },
        { Header: 'Stand Saat Ini Exp. Keterangan', accessor: 'ss_export_keterangan', minWidth: '100px', show: true, disableFilters: true, },
        { Header: 'Stand Saat Ini  Imp Keterangan', accessor: 'ss_import_keterangan', minWidth: '100px', show: true, disableFilters: true, },
      ]
    },
  ]
}
export const PENGUKURAN_BEBAN_TRESHOLD_HARIAN = () => {
  return [
    { Header: 'No', accessor: 'number', minWidth: '100px', show: true, disableFilters: true, },
    { Header: 'Tanggal', accessor: 'tgl', minWidth: '100px', show: true, disableFilters: true },
    { Header: 'Nama Alat', accessor: 'nama', minWidth: '100px', show: true, disableFilters: true },
    { Header: 'Lokasi', accessor: 'lokasi', minWidth: '100px', show: true, disableFilters: true },
    { Header: 'Jenis', accessor: 'jenis', minWidth: '100px', show: true, disableFilters: true },
    { Header: 'Theshold', accessor: 'theshold', minWidth: '100px', show: true, disableFilters: true },
    {
      Header: 'Min Max', accessor: '', minWidth: '100px', show: true, disableFilters: true, columns: [
        { Header: 'Tgl', accessor: 'min_max_tgl', minWidth: '100px', show: true, disableFilters: true, },
        { Header: 'Nilai', accessor: 'min_max_nilai', minWidth: '100px', show: true, disableFilters: true, },
      ]
    },
    {
      Header: 'Awal', accessor: '', minWidth: '100px', show: true, disableFilters: true, columns: [
        { Header: 'Tgl', accessor: 'awal_tgl', minWidth: '100px', show: true, disableFilters: true, },
        { Header: 'Nilai', accessor: 'awal_nilai', minWidth: '100px', show: true, disableFilters: true, },

      ]
    },
    {
      Header: 'Akhir', accessor: '', minWidth: '100px', show: true, disableFilters: true, columns: [
        { Header: 'Tgl', accessor: 'akhir_tgl', minWidth: '100px', show: true, disableFilters: true, },
        { Header: 'Nilai', accessor: 'akhir_nilai', minWidth: '100px', show: true, disableFilters: true, },

      ]
    },
    { Header: 'Durasi (sec)', accessor: 'agv', minWidth: '100px', show: true, disableFilters: true, },
  ]
}

export const PENGUKURAN_BEBAN_FREQUNESI_HARIAN = () => {
  return [
    { Header: 'No', accessor: 'number', minWidth: '100px', show: true, disableFilters: true, },
    { Header: 'Nama Alat', accessor: 'nama', minWidth: '100px', show: true, disableFilters: true },
    { Header: 'Lokasi', accessor: 'lokasi', minWidth: '100px', show: true, disableFilters: true },
    { Header: 'Tanggal', accessor: 'tgl', minWidth: '100px', show: true, disableFilters: true },
    {
      Header: 'Minimum', accessor: '', minWidth: '100px', show: true, disableFilters: true, columns: [
        { Header: 'Jam', accessor: 'min_jam', minWidth: '100px', show: true, disableFilters: true, },
        { Header: 'Mulai', accessor: 'min_nilai', minWidth: '100px', show: true, disableFilters: true, },
      ]
    },
    {
      Header: 'Maximum', accessor: '', minWidth: '100px', show: true, disableFilters: true, columns: [
        { Header: 'Jam', accessor: 'max_jam', minWidth: '100px', show: true, disableFilters: true, },
        { Header: 'Mulai', accessor: 'max_nilai', minWidth: '100px', show: true, disableFilters: true, },

      ]
    },
    { Header: 'Agv', accessor: 'agv', minWidth: '100px', show: true, disableFilters: true, },
  ]
}


export const DAFTAR_UFR = () => {
  return [
    { Header: 'No', accessor: 'number', Width: 70, disableFilters: true, show: true, type: "string", allowEditing: false, allowUpdating: false },
    { Header: 'UFR', accessor: 'ufr', minWidth: 150, show: true, disableFilters: true, type: "string", allowEditing: false, allowUpdating: false },
    { Header: 'Penyulang', accessor: 'penyulang', show: true, disableFilters: true, allowEditing: true, allowUpdating: true, minWidth: 140, enabled: false },
    { Header: 'Trafo', accessor: 'trafo_gi', show: true, disableFilters: true, allowEditing: true, allowUpdating: true, minWidth: 140, enabled: false },
    { Header: 'Gardu Induk', accessor: 'gardu_induk', show: true, disableFilters: true, allowEditing: true, allowUpdating: true, minWidth: 140, enabled: false },
  ]
}

export const JADWAL_PEMELIHARAAN_GARDU = () => {
  return [
    { Header: 'No', accessor: 'number', Width: 70, disableFilters: true, show: true, type: "string", allowEditing: false, allowUpdating: false },
    { Header: 'Gardu', accessor: 'gardu', minWidth: 150, show: true, disableFilters: true, type: "string", allowEditing: false, allowUpdating: false },
    { Header: 'Penyulang', accessor: 'penyulang', show: true, disableFilters: true, allowEditing: true, allowUpdating: true, minWidth: 140, enabled: false },
    { Header: 'Gardu Induk', accessor: 'gardu_induk', show: true, disableFilters: true, allowEditing: true, allowUpdating: true, minWidth: 140, enabled: false },
    { Header: 'UP3', accessor: 'up3', show: true, disableFilters: true, allowEditing: true, allowUpdating: true, minWidth: 140, enabled: false },
    { Header: 'Alamat', accessor: 'alamat', show: true, disableFilters: true, allowEditing: true, allowUpdating: true, minWidth: 140, enabled: false },
  ]
}
