// ASET STATUS
interface IJaringanGarduHubungDetail {
  number: number,
  id: number,
  jenis: number,
  id_parent_lokasi: number,
  parent: string,
  nama_lokasi: string,
  tree_jaringan: TJaringanGarduHUbungDetail,
  alamat: string,
  coverage?: string,
  kva?: number,
  phase?: string,
  lat: number,
  lon: number,
  status_listrik: TJaringanGarduHUbungDetail,
  no_tiang?: string,
  jenis_jaringan?: string,
  status_penyulang?: string,
  count_gardu?: number,
  tgl_entri: any,
  tgl_update: any,
  id_ref_lokasi_child: any
}

export const JarianganGarduHubungDetailField = [
  "id_ref_lokasi",
  "id_ref_jenis_lokasi",
  "id_parent_lokasi",
  "nama_lokasi",
  "tree_jaringan",
  "alamat",
  "coverage",
  "kva",
  "phase",
  "lat",
  "lon",
  "status_listrik",
  "no_tiang",
  "tgl_entri",
  "tgl_update",
  "id_user_entri",
  "id_user_update"
];

type TJaringanGarduHUbungDetail = 1 | 0;

export type { IJaringanGarduHubungDetail };
