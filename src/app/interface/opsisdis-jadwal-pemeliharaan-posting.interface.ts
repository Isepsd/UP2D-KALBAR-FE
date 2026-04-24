import moment from 'moment';
// ASET STATUS
interface IJadwalPemerliharaan {
  trans_jadwal_har_id: string;
  id_gardu_induk: string
  // gardu_induk: string
  id_penyulang: string
  id_gardu: string
  id_area: string
  jam_pekerjaan: string,
  jam_buka: string,
  jam_tutup: string,
  id: string
  id_pelaksana: string,
  id_pengawas: string,
  butuh_padam: string,
  keterangan: string,
  jtm: string,
  jenis_jadwal: string,
  jenis_pelayanan: string,
  wilayah_padam: string,
  wilayah: string
  periode_awal: string,
  periode_akhir: string,
  status_pekerjaan: string,
  approvel_apd?: any,
  approvel_area?: any,
  respon_apd?: string,
  // tgl_progres: any,
  id_user_entri?: string,
  id_user_update?: string,
  date: string,
  tanggal: string,
  sifat_pekerjaan: string,
  jam2: string,
  jam1: string,
  tanggal_posting?: string,
}

export const JadwalPemerliharaanFeild = {
  trans_jadwal_har_id: null,
  id_gardu_induk: null,
  // gardu_induk: null,
  id_penyulang: null,
  id: null,
  // pelaksana: null,
  id_pengawas: "",
  id_gardu: null,
  id_area: null,
  jam_pekerjaan: null,
  jam_buka: null,
  jam_tutup: null,
  // jam_normal: "",
  id_pelaksana: null,
  butuh_padam: null,
  keterangan: "",
  jtm: "",
  jenis_jadwal: "",
  // usulan_dari: "",
  jenis_pelayanan: "",
  wilayah_padam: "",
  wilayah: "",
  // tgl_periode: "",
  tgl: "",
  status_pekerjaan: "",
  approvel_apd: 0,
  approvel_area: 0,
  respon_apd: "",
  // tgl_progres: "",
  id_user_entri: null,
  id_user_update: null,
  sifat_pekerjaan: null,
  jam1: null,
  jam2: null,
  tanggal: moment().format('YYYY-MM-DD'),
  tanggal_posting: moment().format('YYYY-MM-DD'),
  periode_awal: null,
  periode_akhir: null,
}

// ASET STATUS
interface IJadwalPemerliharaanGardu {
  trans_jadwal_har_id: number;
  id_gardu_induk: any;
  // id_og: any;
  trans_jadwal_har_gardu_id: any;

}

export const JadwalPemerliharaanGarduFeild = {
  trans_jadwal_har_id: null,
  id_gardu_induk: null,
  trans_jadwal_har_gardu_id: null,
  // id_og: null,
}

interface IJadwalPemerliharaanDokumentasi {
  nama_dok: any;
  nama_file: any;
  trans_jadwal_har_dok_id: number;
  trans_jadwal_har_id: any

}

export const JadwalPemerliharaanDokumentasiFeild = {
  nama_dok: null,
  nama_file: null,
  trans_jadwal_har_dok_id: null,
  trans_jadwal_har_id: null,
}

export type { IJadwalPemerliharaan, IJadwalPemerliharaanGardu, IJadwalPemerliharaanDokumentasi };


