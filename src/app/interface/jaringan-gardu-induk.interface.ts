import { IJaringan } from '@app/interface/jaringan-lokasi.interface';
// ASET STATUS
interface IJaringanGarduInduk {
  number: number,
  id: number,
  jenis: number,
  id_parent_lokasi: number,
  id_unit_pembangkit: number,
  id_pembangkit: number,
  parent_lokasi: IJaringan,
  nama_lokasi: string,
  tree_jaringan: TJariangan,
  alamat: string,
  lat: number,
  lon: number,
  status_listrik: TJariangan,
  tgl_entri: any,
  tgl_update: any,
  ssot_number: any,
  unit_pembangkit: any,
  id_ref_jenis_lokasi: any,
  id_user_entri: any;
  id_user_update: any;
  id_ref_province: any;
  id_ref_regency: any;
  id_ref_district: any;
  jenis_gi?: any;
  fungsi_scada: any;
  kode_lokasi: any;
  up2b: any;
  ref_province: any;
  ref_regency: any;
  ref_district: any;
}

export const JarianganGarduIndukField = {
  id_ref_lokasi: null,
  ssot_number: null,
  id_ref_jenis_lokasi: null,
  id_parent_lokasi: null,
  id_unit_pembangkit: null,
  id_pembangkit: null,
  id_ref_province: process.env.ADM_PROVINCE,
  id_ref_regency: null,
  id_ref_district: null,
  id_up2b: null,
  nama_lokasi: '',
  kode_lokasi: '',
  alamat: '',
  lat: 0,
  lon: 0,
  id_user_entri: '',
  id_user_update: '',
  jenis_gi: null,
  status_listrik: '1',
  fungsi_scada:''
};

type TJariangan = 1 | 0;

export type { IJaringanGarduInduk };
