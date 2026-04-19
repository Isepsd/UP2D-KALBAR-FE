// ASET STATUS
interface IAsetRak {
  id: number;
  nama: string;
  status: TRakStatus;
  tgl_entri: any;
  tgl_update: any;
  id_user_update: number;
  id_user_entri: number;
}

export const AsetRakField = {
  id_ref_aset_rak: null,
  nama: '',
  status: 1,
  tgl_entri: null,
  tgl_update: null,
  id_user_update: null,
  id_user_entri: null
}

type TRakStatus = 1 | 0;

export type { IAsetRak };
