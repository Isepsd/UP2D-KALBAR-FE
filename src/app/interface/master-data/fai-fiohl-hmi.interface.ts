interface IFaiFiohlHmi {
  id_ref_ep_fiohl:number;
  nama: string;
  created_user: string;
  status:boolean
}

export const FaiFiohlHmiField = {
  id_ref_ep_fiohl:null, // id field primary key harus ada ini perlu untuk update
  nama: '',
  created_user: '',
  update_user: '',
  status: true
}

export type { IFaiFiohlHmi };