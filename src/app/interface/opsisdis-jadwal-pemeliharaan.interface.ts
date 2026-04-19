// ASET STATUS
interface IJadwalPemerliharaan {
  id_trans_jadwal_har: number;
  id_gardu_induk: number
  id_penyulang: number
  id_gardu: number
  id_og: string
  id_up3: number
  id_ref_jenis_pekerjaan: number
  id_lama: number
  // nomor: string
  jam_pekerjaan: string
  // jam_buka: string
  // jam_tutup: string
  // jam_normal: string
  pelaksana: string
  pengawas: string
  butuh_padam: string
  lbs_manual: string
  keterangan: string
  jtm: string
  jenis_jadwal: string
  // usulan_dari: string
  jenis_pelayanan: string
  wilayah_padam: string
  // wilayah: string
  // tgl_periode: string
  status_pekerjaan: string
  // approval_apd1?: string
  // approval_area1?: string
  respon_apd?: string,
  // tgl_progres: any,
  id_user_entri?: any
  id_user_update?: any
  date: any
}

export const JadwalPemerliharaanFeild = {
  id_trans_jadwal_har: null,
  id_gardu_induk: null,
  id_penyulang: null,
  id_og: null,
  pelaksana: "",
  pengawas: "",
  id_gardu: null,
  id_up3: null,
  id_ref_jenis_pekerjaan: null,
  id_lama: null,
  // nomor: "",
  jam_pekerjaan: "",
  // jam_buka: "",
  // jam_tutup: "",
  // jam_normal: "",
  id_pelaksana: null,
  id_pengawas: null,
  butuh_padam: null,
  keterangan: "",
  lbs_manual: "",
  jtm: "",
  jenis_jadwal: "",
  // usulan_dari: "",
  jenis_pelayanan: "",
  wilayah_padam: "",
  // wilayah: "",
  // tgl_periode: "",
  tgl: "",
  status_pekerjaan: "",
  // approval_apd1: "",
  // approval_area1: "",
  respon_apd: "",
  // tgl_progres: "",
  id_user_entri: null,
  id_user_update: null,
}

// ASET STATUS
interface IJadwalPemerliharaanGardu {
  id_trans_jadwal_har: number;
  id_gardu_induk: any;
  id_og: any;
  id_trans_jadwal_har_gardu: any;

}

export const JadwalPemerliharaanGarduFeild = {
  id_trans_jadwal_har: null,
  id_gardu_induk: null,
  id_trans_jadwal_har_gardu: null,
  id_og: null,
}

interface IJadwalPemerliharaanDokumentasi {
  nama_dok: any;
  nama_file: any;
  id_trans_jadwal_har_dok: number;
  id_trans_jadwal_har: any

}

export const JadwalPemerliharaanDokumentasiFeild = {
  nama_dok: null,
  file_name: null,
  id_trans_jadwal_har_dok: null,
  id_trans_jadwal_har: null,
}

export type { IJadwalPemerliharaan, IJadwalPemerliharaanGardu, IJadwalPemerliharaanDokumentasi };


