// ASET STATUS
interface IAsetJenis {
  id: number;
  nama: string;
  nama_aset_jenis: string;
  status: TAsetJenis;
  tgl_entri: any,
  tgl_update: any,
  tree_jaringan: any,
}

export const AsetJenisField = [
  'id_ref_aset_jenis',
  'nama_aset_jenis',
  'status',
  'tgl_entri',
  'tgl_update',
  'id_user_entri',
  'id_user_update'
];

type TAsetJenis = 1 | 0;

export type { IAsetJenis };
