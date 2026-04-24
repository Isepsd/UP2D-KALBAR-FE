interface IWpHirarc {
  id_wp_hirarc: number;
  pekerjaan: string;
  lokasi_pekerjaan: string;
  tanggal: string;
  id_wp_master_bagian: string;
}

export const WpHirarcField = {
  id_wp_hirarc: undefined,
  pekerjaan: null,
  lokasi_pekerjaan: null,
  id_wp_master_bagian: null,
  tanggal: 'date',
};

/** HIRARC DETAIL */
interface IWpHirarcDetail {
  id_wp_hirarc: any;
  kegiatan: string;
  bahaya: string;
  resiko_bahaya: string;
  peluang: string;
  akibat: string;
  tingkat_resiko: string;
  pengendalian: string;
  penanggung_jawab: string;
}

export const WpHirarcDetailField = {
  id_wp_hirarc: undefined,
  kegiatan:'',
  bahaya:'',
  resiko_bahaya:'',
  peluang:'',
  akibat:'',
  peluang2:'',
  akibat2:'',
  tingkat_resiko:'',
  pengendalian:'',
  penanggung_jawab:'',
};

export type { IWpHirarc, IWpHirarcDetail };
