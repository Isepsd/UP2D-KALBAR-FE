// ASET STATUS
interface IAsetStatus {
  id: number;
  nama: string;
  status: TAsetStatus;
  tgl_entri: any;
  tgl_update: any;
  id_user_update: number;
  id_user_entri: number;
}

export const AsetStatusField = {
  id_ref_aset_status: null,
  nama: '',
  status: 1,
  tgl_entri: null,
  tgl_update: null,
  id_user_update: null,
  id_user_entri: null
}

type TAsetStatus = 1 | 0;

export type { IAsetStatus };
