import { IJaringan } from '@app/interface/jaringan-lokasi.interface';

interface IJaringanPenyulang {
  number: number;
  id: number;
  nama_lokasi: string;
  kode_lokasi: string;
  parent_lokasi: any;
  status_listrik: TJaringan;
  tree_jaringan: TJaringan;
  status_penyulang: string;
  coverage: string;
  kva: string;
  phase: string;
  jenis: number;
  jenis_jaringan: any;
  ssot_number: any;
  lat: number;
  lon: number;
  count_gardu: number;
  unit_pembangkit: string;
  path1: string;
  path2: string;
  path3: string;
  pembangkit: string;
  gardu_induk: IJaringan;
  trafo_gi: string;
  id_trafo_gi: any;
  id_gardu_hubung: any;
  id_pembangkit: any;
  id_gardu_induk: any;
  id_parent_lokasi: any;
  id_ref_jenis_lokasi: any;
  id_user_entri: any;
  id_user_update: any;
  uid: IJaringan;
  up3_1: IJaringan;
  ulp_1: IJaringan;
  tgl_entri: any;
  tgl_update: any;
  id_ref_province: any;
  id_ref_regency: any;
  id_ref_district: any;
  i_max: any,
  id_i: any,
  id_v: any,
  id_p: any,
  id_q: any,
  id_amr: any,
  id_portal_ext: any,
  url_webservice: any,
  faktor_kali: any,
  dcc: any,
  pemilik: any,
  no_urut: any,
  jumlah_pelanggan: any,
  fungsi_lokasi: any,
  sinkron_data: any,
  jenis_peralatan: any,
  rekon_beban: TJaringan,
  panjang_jaringan: any,
 
}

export const JaringanPenyulangField = {
  id_ref_lokasi: null,
  path1: null,
  ssot_number: null,
  path2: null,
  path3: null,
  id_ref_jenis_lokasi: null,
  id_parent_lokasi: null,
  id_unit_pembangkit: null,
  id_pembangkit: null,
  id_gardu_induk: null,
  id_trafo_gi: null,
  id_gardu_hubung: null,
  id_ref_province: process.env.ADM_PROVINCE,
  id_ref_regency: null,
  id_ref_district: null,
  nama_lokasi: '',
  kode_lokasi: '',
  alamat: '',
  lat: 0,
  lon: 0,
  coverage: '',
  panjang_jaringan: '',
  rekon_beban: '1',
  // phase: '',
  id_user_entri: '',
  id_user_update: '',
  jenis_jaringan: null,
  status_listrik: '1',
  status_penyulang: null,
  id_uid: null,
  id_up3_1: null,
  id_ulp_1: null,
  i_max: null,
  id_i: null,
  id_v: null,
  id_p: null,
  id_q: null,
  id_amr: null,
  id_portal_ext: null,
  url_webservice: null,
  // faktor_kali: null,
  dcc: null,
  pemilik: null,
  no_urut: null,
  jenis_penyulang: null,
  jumlah_pelanggan: 0,
  fungsi_lokasi: null,
  sinkron_data: null,
  // ratio_ct: null,
  // ratio_vt: null,
};

type TJaringan = 1 | 0;

export type { IJaringanPenyulang };
