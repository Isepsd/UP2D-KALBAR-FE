// ASET STATUS
interface IAsetRuangan {
  id: number;
  nama: string;
  status: TAsetRuangan;
  tgl_entri: any;
  tgl_update: any;
  id_user_update: number;
  id_user_entri: number;
}

export const AsetRuanganField = {
  id_ref_aset_ruangan: null,
  nama: '',
  status: 1,
  tgl_entri: null,
  tgl_update: null,
  id_user_update: null,
  id_user_entri: null
}

type TAsetRuangan = 1 | 0;

export type { IAsetRuangan };
