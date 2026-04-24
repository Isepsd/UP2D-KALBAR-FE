import { IJaringan } from '@app/interface/jaringan-lokasi.interface';
// ASET STATUS
interface IJaringanGarduHubung {
  number: number,
  id: number,
  jenis: number,
  id_parent_lokasi: number,
  id_gardu_induk: number,
  id_penyulang: number,
  parent_lokasi: IJaringan,
  nama_lokasi: string,
  tree_jaringan: TJaringan,
  alamat: string,
  lat: number,
  lon: number,
  status_listrik: TJaringan,
  tgl_entri: any,
  tgl_update: any,
  unit_pembangkit: any,
  id_ref_jenis_lokasi: any,
  id_user_entri: any;
  id_user_update: any;
  id_ref_province: any;
  id_ref_regency: any;
  id_ref_district: any;
  jenis_gi?: any;
  kode_lokasi: any;
  up2b: any;
  ref_province: any;
  ref_regency: any;
  ref_district: any;
  fungsi_scada: any,
  jenis_gardu: any,
  sinkron_data: any,
  id_i: any,
  id_v: any,
  path1: any,
  path2: any,
  path3: any,
  id_p: any,
  id_q: any,
  id_amr: any,
  id_portal_ext: any,
  url_webservice: any,
  rekon_beban: TJaringan,
  fungsi_lokasi:any,
}

export const JarianganGarduHubungField = {
  id_ref_lokasi: null,
  id_ref_jenis_lokasi: null,
  id_parent_lokasi: null,
  id_gardu_induk: null,
  id_penyulang: null,
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
  fungsi_scada: '',
  jenis_gardu: null,
  rekon_beban: '1',
  sinkron_data: null,
  id_i: null,
  id_v: null,
  id_p: null,
  id_q: null,
  id_amr: null,
  id_portal_ext: null,
  url_webservice: null,
};

type TJaringan = 1 | 0;

export type { IJaringanGarduHubung };
