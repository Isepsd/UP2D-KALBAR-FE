// ASET STATUS
interface IAsetLantai {
  id: number;
  nama: string;
  status: TAsetLantai;
  tgl_entri: any;
  tgl_update: any;
  id_user_update: number;
  id_user_entri: number;
}

export const AsetLantaiField = {
  id_ref_aset_lantai: null,
  nama: '',
  status: 1,
  tgl_entri: null,
  tgl_update: null,
  id_user_update: null,
  id_user_entri: null
}

type TAsetLantai = 1 | 0;

export type { IAsetLantai };
