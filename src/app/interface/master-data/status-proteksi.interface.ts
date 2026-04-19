interface IStatusProteksi {
  id_statu_proteksi:number;
  nama: string;
  created_user: string;
  update_user: string;
  status: true;
}

export const StatusProteksiField = {
  id_statu_proteksi:null, // id field primary key harus ada ini perlu untuk update
  nama: '',
  created_user: '',
  update_user: '', 
  status: "1",
}

export type { IStatusProteksi };