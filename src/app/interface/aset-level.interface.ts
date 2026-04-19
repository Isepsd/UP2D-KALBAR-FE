// ASET STATUS
interface IAsetLevel {
  id: number;
  nama: string;
  status: TLevelStatus;
  tgl_entri: any;
  tgl_update: any;
  id_user_update: number;
  id_user_entri: number;
}

export const AsetLevelField = {
  id_ref_aset_level: null,
  nama: '',
  status: 1,
  tgl_entri: null,
  tgl_update: null,
  id_user_update: null,
  id_user_entri: null
}

type TLevelStatus = 1 | 0;

export type { IAsetLevel };
