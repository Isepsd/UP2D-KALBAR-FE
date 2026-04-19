// ASET STATUS
interface IJaringan {
  no_urut: number;
  number: number,
  id: number,
  jenis: number,
  id_parent_lokasi: number,
  parent: string,
  nama_lokasi: any,
  kode_lokasi: string,
  tree_jaringan: TJariangan,
  alamat: string,
  coverage?: string,
  kva?: number,
  phase?: string,
  path1?: string,
  path2?: string,
  path3?: string,

  id_upt?: any,
  ssot_number?: any,
  upt?: any,
  id_ultg?: any,
  ultg?: any,
  lat: number,
  lon: number,
  status_listrik: TJariangan,
  no_tiang?: string,
  jenis_jaringan?: string,
  ref_jenis_lokasi?: any,
  status_penyulang?: string,
  count_gardu?: number,
  unit_pembangkit?: string,
  pembangkit?: string,
  section: IJaringan,
  segment: IJaringan,
  gardu_distribusi?: string,
  trafo_gd?: string,
  up3: any,
  up3_2?: string,
  ulp_2?: string,
  trafo_gi: IJaringan,
  penyulang: IJaringan,
  parent_lokasi: IJaringan,
  gardu_induk: IJaringan,
  uid: IJaringan,
  up3_1: IJaringan,
  ulp_1: IJaringan,
  zone: IJaringan,
  tgl_entri: any,
  tgl_update: any,
  id_unit_pembangkit: any;
  id_ref_jenis_lokasi: any;
  kapasitas?: any
  sub_sistem?: any
  pemilik?: any
  status_trafo?: any
  jenis_trafo?: any
  i_max?: any,
  ratio_ct?: any
  ratio_vt?: any
  fk_meter_pembanding?: any
  primer_tegangan_max?: any
  primer_tegangan_min?: any
  sekunder_tegangan_min?: any
  sekunder_tegangan_max?: any
  sinkron_data?: any
  jenis_layanan?: any
  id_i?: any
  id_v?: any
  id_p?: any
  id_q?: any
  id_amr?: any
  id_portal_ext?: any
  url_webservice?: any
  fk_meter?: any
  def_pengukuran_teg_primer?: any
  def_pengukuran_teg_sekunder?: any
  nama_sub_sistem?: any
  def_nilai_cosq?: any
  jenis_gardu?: any
  fungsi_scada?: any
  panjang_jaringan?: any
  fungsi_lokasi?: any
  jumlah_pelanggan?: any
  jenis_peralatan?: any
  zona?: any
  ref_district?: any
  rekon_beban: TJariangan,
}

export const JarianganStatusField = [
  'id_parent_lokasi',
  'id_unit_pembangkit',
  'id_pembangkit',
  'id_gardu_induk',
  'id_trafo_gi',
  'id_penyulang',
  'id_zone',
  'id_section',
  'id_segment',
  'id_gardu_distribusi',
  'id_trafo_gd',
  'nama_lokasi',
  'ssot_number',
  'alamat',
  'status_listrik',
  'coverage',
  'kva',
  'phase',
  'lat',
  'lon',
  'uid',
  'up3_1',
  'ulp_1',
  "kode_lokasi",
  "jumlah_pelanggan",
  "jumlah_jurusan",
  "jenis_trafo",
  "id_user_entri",
  "id_user_update",
  "id_uid",
  "id_up3_1",
  "id_up3_2",
  "id_ulp_1",
  "id_ulp_2",
  "tree_jaringan",
  "no_tiang",
  "jenis_jaringan",
  "status_penyulang",
  "kapasitas",
  "sub_sistem",
  "pemilik",
  "status_trafo",
  "jenis_trafo",
  "i_max",
  "ratio_ct",
  "ratio_vt",
  "fk_meter",
  "fk_meter_pembanding",
  "primer_tegangan_max",
  "primer_tegangan_min",
  "sekunder_tegangan_min",
  "sekunder_tegangan_max",
  "sinkron_data",
  "jenis_layanan",
  "id_i",
  "id_v",
  "id_p",
  "id_q",
  "id_amr",
  "id_portal_ext",
  "url_webservice",
  "jenis_gardu",
  "fungsi_scada",
  "panjang_jaringan",
  "jenis_peralatan",
  "fungsi_lokasi",
  "id_ultg",
  "id_upt",
  "upt",
  "ultg",
];

type TJariangan = 1 | 0;

export type { IJaringan };
