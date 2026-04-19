interface IJaringanKantor {
  number: number;
  id: number;
  nama_lokasi: string;
  alamat: string;
  status_listrik: TJariangan;
  jenis: number;
  parent: string;
  unit_induk: string;
  up3: string;
  upl: string;
  lat: number;
  lon: number;
  tgl_entri: any;
  tgl_update: any;
  id_ref_province: any;
  id_ref_regency: any;
  id_ref_district: any;
}

export const JarianganKantorField = {
  id_ref_lokasi: null,
  id_ref_jenis_lokasi: null,
  id_parent_lokasi: null,
  id_unit_pembangkit: null,
  id_pembangkit: null,
  id_gardu_induk: null,
  id_trafo_gi: null,
  id_ref_province: process.env.ADM_PROVINCE,
  id_ref_regency: null,
  id_ref_district: null,
  nama_lokasi: '',
  alamat: '',
  lat: 0,
  lon: 0,
  coverage: 0,
  kva: 0,
  phase: '',
  id_user_entri: '',
  id_user_update: '',
  jenis_jaringan: null,
  status_listrik: '1',
  status_penyulang: null,
  id_uid: null,
  id_up3_1: null,
  id_ulp_1: null,
};

type TJariangan = 1 | 0;

export type { IJaringanKantor };
