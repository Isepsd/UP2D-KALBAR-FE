interface IFaiMtrzHmi {
  id_ref_ep_fai_mtrz:number;
  nama: string;
  created_user: string;
  status:boolean
}

export const FaiMtrzHmiField = {
  id_ref_ep_fai_mtrz: null, // id field primary key harus ada ini perlu untuk update
  nama: '',
  created_user: '',
  update_user: '',
  status: '1'
}

export type { IFaiMtrzHmi };