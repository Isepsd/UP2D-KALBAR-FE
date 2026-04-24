interface IFdir {
  id_penyulang_fdir:number;
  nama: string;
  created_user: string;
  status:boolean
}

export const FdirField = {
  id_penyulang_fdir: null, // id field primary key harus ada ini perlu untuk update
  nama: '',
  created_user: '',
  update_user: '',
  status: '1'
}

export type { IFdir };