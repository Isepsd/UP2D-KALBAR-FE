interface IPenyebabGangguan {
  nama: string;
  jenis: string;
  id_ref_ep_kat_ggn: string;
  created_user: string;
  update_user: string;
  status: true;
}

export const PenyebabGangguanField = {
  id_ref_ep_penyebab_ggn:null, // id field primary key harus ada ini perlu untuk update
  id_ref_ep_kat_ggn: '',
  nama: '',
  jenis: '',
  created_user: '',
  status: "1",
}

export type { IPenyebabGangguan };
