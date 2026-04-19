import { IJaringan } from '@app/interface/jaringan-lokasi.interface';
interface IJaringanUnitPembangkit {
  number: number;
  id: number;
  nama_lokasi: string;
  alamat: string;
  status_listrik: TJariangan;
  jenis: number;
  lat: number;
  lon: number;
  tgl_entri: any;
  tgl_update: any;
  parent_lokasi: IJaringan;
  tree_jaringan: TJariangan;
  id_ref_jenis_lokasi: any;
  id_parent_lokasi: any;
  id_user_entri: any;
  id_user_update: any;
  id_ref_province: any;
  id_ref_regency: any;
  id_ref_district: any;
  ref_province: any;
  ref_regency: any;
  ref_district: any;
}

export const JaringanUnitPembangkitField = {
  id_ref_lokasi: null,
  id_ref_jenis_lokasi: null,
  id_parent_lokasi: null,
  id_unit_pembangkit: null,
  id_ref_province: process.env.ADM_PROVINCE,
  id_ref_regency: null,
  id_ref_district: null,
  nama_lokasi: '',
  alamat: '',
  lat: 0,
  lon: 0,
  id_user_entri: '',
  id_user_update: '',
  jenis_jaringan: null,
  status_listrik: '1',
};

type TJariangan = 1 | 0;

export type { IJaringanUnitPembangkit };
