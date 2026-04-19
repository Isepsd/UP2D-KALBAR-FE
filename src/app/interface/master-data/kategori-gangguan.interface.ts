interface IKategoriGangguan {
  id_ref_ep_kat_ggn: number;
  nama: string;
  created_user: string;
  status:boolean
}

export const KategoriGangguanField = {
  id_ref_ep_kat_ggn: null,  // id field primary key harus ada ini perlu untuk update
  nama: '',
  created_user: '',
  status: true
}

export type { IKategoriGangguan };