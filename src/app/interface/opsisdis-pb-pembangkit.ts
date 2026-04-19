// ASET STATUS
interface IPBPembangkit {
  id_trans_tm_pembangkit: number;
  no_urut: number;
  ref_lokasi: any;
  ref_parent_lokasi: any;
  v: any;
  f: any;
  i: any;
  p: any;
  q: any;
  datum: any;
  id_user_update: number;
  id_user_entri: number;
}

export const AsetPBPembangkitField = {
  id_trans_tm_pembangkit: null,
  tgl_entri: null,
  tgl_update: null,
  id_user_update: null,
  id_user_entri: null
}

export type { IPBPembangkit };
