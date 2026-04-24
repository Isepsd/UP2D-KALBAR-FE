import { IJaringan } from '@app/interface/jaringan-lokasi.interface';
interface IJaringanTrafoGI {
  number: number;
  id: number;
  nama_lokasi: string;
  unit_pembangkit: string;
  pembangkit: string;
  alamat: string;
  status_listrik: TJaringan;
  tree_jaringan: TJaringan;
  jenis: number;
  lat: number;
  lon: number;
  tgl_entri: any;
  tgl_update: any;
  id_gardu_induk: IJaringan;
  id_ref_jenis_lokasi: any;
  id_user_entri: any;
  id_user_update: any;
  id_parent_lokasi: any;
  id_ref_province: any;
  id_ref_regency: any;
  id_ref_district: any;
  kapasitas?: any
  sub_sistem?: any
  pemilik?: any
  status_trafo?: any
  jenis_trafo?:any
  i_max?:any,
  ratio_ct?:any
  ratio_vt?:any
  fk_meter_pembanding?:any
  primer_tegangan_max?:any
  primer_tegangan_min?:any
  sekunder_tegangan_min?:any
  sekunder_tegangan_max?:any
  sinkron_data?:any
  jenis_layanan?:any
  id_i?:any
  id_v?:any
  id_p?:any
  id_amr?:any
  id_portal_ext?:any
  url_webservice?:any
  fk_meter?:any
  path1?:any
  path2?:any
  path3?:any
  no_urut?:any
  def_nilai_cosq:any,
  def_pengukuran_teg_sekunder:any,
  def_pengukuran_teg_primer:any,
  coverage:any,
  phase:any,
  ssot_number:any,
  rekon_beban: TJaringan,
}

export const JaringanTrafoGIField = {
  id_ref_lokasi: null,
  path1: null,
  path2: null,
  path3: null,
  ssot_number: null,
  id_ref_jenis_lokasi: null,
  id_parent_lokasi: null,
  id_unit_pembangkit: null,
  id_pembangkit: null,
  id_ref_province: process.env.ADM_PROVINCE,
  id_ref_regency: null,
  id_ref_district: null,
  nama_lokasi: '',
  alamat: '',
  lat: 0,
  lon: 0,
  // coverage: 0,
  // kva: 0,
  phase: '',
  id_gardu_induk: null,
  id_user_entri: '',
  id_user_update: '',
  jenis_jaringan: null,
  status_listrik: '1',
  kapasitas:null,
  sub_sistem:null,
  pemilik:null,
  status_trafo:null,
  jenis_trafo:null,
  i_max:null,
  // ratio_ct:null,
  // ratio_vt:null,
  // fk_meter_pembanding:null,
  // primer_tegangan_max:null,
  // primer_tegangan_min:null,
  // sekunder_tegangan_min:null,
  // sekunder_tegangan_max:null,
  def_nilai_cosq:null,
  def_pengukuran_teg_sekunder:null,
  def_pengukuran_teg_primer:null,
  sinkron_data:null,
  jenis_layanan:null,
  id_i:null,
  id_v:null,
  id_p:null,
  id_amr:null,
  id_portal_ext:null,
  url_webservice:null,
  no_urut:null,
  rekon_beban: '1',
};

type TJaringan = 1 | 0;

export type { IJaringanTrafoGI };
