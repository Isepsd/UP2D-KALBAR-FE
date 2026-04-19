
interface IJaringanSubsistem {
  nama_lokasi: string;
  tree_jaringan: TJaringan;
  tgl_entri: any;
  tgl_update: any;
  id_ref_jenis_lokasi: any;
  id_user_entri: any;
  id_user_update: any;
  status_listrik: TJaringan;
}

export const JaringanSubsistemField = {
  nama_lokasi: '',
  tree_jaringan: 0,
  id_user_entri: '',
  id_user_update: '',
  id_ref_jenis_lokasi: null,
  tgl_entri: "",
  tgl_update: "",
  status_listrik: 0
};

type TJaringan = 1 | 0;
export type { IJaringanSubsistem };
