interface ICuaca {
  id_ref_ep_cuaca: number;
  nama: string;
  created_user: string;
  status:boolean
}

export const CuacaField = {
  id_ref_ep_cuaca: null, // id field primary key harus ada ini perlu untuk update
  nama: '',
  created_user: '',
  status: true
}

export type { ICuaca };
