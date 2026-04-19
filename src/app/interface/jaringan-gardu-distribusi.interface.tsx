import { IJaringan } from './jaringan-lokasi.interface';

// ASET STATUS
interface IJaringanGarduDsitribusi {
  number: number;
  id: number;
  nama_lokasi: string;
  alamat: string;
  parent_lokasi: any;
  status_listrik: TJaringan;
  tree_jaringan: TJaringan;
  status_penyulang: string;
  coverage: string;
  kva: string;
  phase: string;
  jenis: number;
  jenis_jaringan: any;
  lat: number;
  lon: number;
  count_gardu: number;
  unit_pembangkit: string;
  pembangkit: string;
  gardu_induk: IJaringan;
  trafo_gi: string;
  id_trafo_gi: any;
  id_penyulang: any;
  id_zone: any;
  id_section: any;
  id_segment: any;
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
  kode_lokasi: any;
  jumlah_pelanggan: any;
  fungsi_scada: any
  jenis_gardu: any
  ssot_number: any
}

export const JaringanGarduDsitribusiField = {
  id_ref_lokasi: null,
  id_ref_jenis_lokasi: null,
  id_parent_lokasi: null,
  id_unit_pembangkit: null,
  ssot_number: null,
  id_pembangkit: null,
  id_gardu_induk: null,
  id_trafo_gi: null,
  id_penyulang: null,
  id_zone: null,
  id_section: null,
  id_segment: null,
  id_ref_province: process.env.ADM_PROVINCE,
  id_ref_regency: null,
  id_ref_district: null,
  nama_lokasi: '',
  alamat: '',
  lat: 0,
  lon: 0,
  coverage: 0,
  kva: 0,
  jumlah_pelanggan: 0,
  kode_lokasi: "",
  phase: '',
  id_user_entri: '',
  id_user_update: '',
  jenis_jaringan: null,
  status_listrik: '1',
  status_penyulang: null,
  id_uid: null,
  id_up3_1: null,
  id_ulp_1: null,
  fungsi_scada: null,
  jenis_gardu: null,
  ref_province: null,
  segment: null,
  section: null,
  zone: null,
  trafo_gi: null,
};

type TJaringan = 1 | 0;

export type { IJaringanGarduDsitribusi };
