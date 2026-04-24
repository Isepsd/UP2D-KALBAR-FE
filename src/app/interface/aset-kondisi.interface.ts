// ASET STATUS
interface IAsetKondisi {
  id: number;
  nama: string;
  status: TAsetKondisi;
  tgl_entri: any;
  tgl_update: any;
  id_user_update: number;
  id_user_entri: number;
}

export const AsetKondisiField = {
  id_ref_kondisi_aset: null,
  nama: '',
  status: 1,
  tgl_entri: null,
  tgl_update: null,
  id_user_update: null,
  id_user_entri: null
}

type TAsetKondisi = 1 | 0;

export type { IAsetKondisi };
