// ASET STATUS
interface IAsetManufaktur {
  id: number;
  nama: string;
  status: TAsetManufaktur;
  tgl_entri: any;
  tgl_update: any;
  id_user_update: number;
  id_user_entri: number;
}

export const AsetManufakturField = {
  id_ref_aset_manufaktur: null,
  nama: '',
  status: 1,
  tgl_entri: null,
  tgl_update: null,
  id_user_update: null,
  id_user_entri: null
}

type TAsetManufaktur = 1 | 0;

export type { IAsetManufaktur };
