interface IDispatcher {
  id_ref_ep_petugas: number;
  nama: string;
  jenis:''
}

export const DispatcherField = {
  id_ref_ep_petugas: null,  // id field primary key harus ada ini perlu untuk update
  nama: '',
  jenis: ''
}

export type { IDispatcher };