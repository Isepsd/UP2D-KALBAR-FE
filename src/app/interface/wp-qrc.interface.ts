interface IWpQrc {
  id_wp_qrc: number;
  nama_user: string;
  nama_pekerjaan: string;
  vendor: string;
  key_qrc: string;
  id_user_entri: string;
  id_user_update: string;
  qrc_details: string;
}

export const WpQrcField = {
  id_wp_qrc: undefined,
  nama_user: '',
  nama_pekerjaan: '',
  vendor: '',
  key_qrc: '',
  qrc_details:[]
};

export type { IWpQrc };
