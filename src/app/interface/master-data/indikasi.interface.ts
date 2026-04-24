interface IIndikasi {
  id_ref_ep_indikasi:number;
  nama: string;
  jenis: string;
  created_user: string;
  update_user: string;
  status: true;
}

export const IndikasiField = {
  id_ref_ep_indikasi:null, // id field primary key harus ada ini perlu untuk update
  nama: '',
  jenis: '',
  created_user: '',
  update_user: '', 
  status: "1",
}

export type { IIndikasi };
