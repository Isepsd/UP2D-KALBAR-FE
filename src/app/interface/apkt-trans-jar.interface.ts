interface IApktTransJar {
  no_laporan: string;
  nama_laporan: string;
  tgl_laporan: string;
  no_apkt: number;
  status_laporan: number;
  jenis_laporan: number;
  jlh_gardu_nyala: number,
  jlh_gardu_padam: number,
  tgl_nyala_terakhir: string;
  tgl_close_laporan: string;
  status_apkt_kirim_padam: number;
  tgl_padam: string;
  server_apkt: number;
  res_apkt_kirim_padam: number;
  id_feeder: number;
  feeder: number;
  status_data: number;
  tgl_nyala_awal: string;
  tgl_mulai_apkt_kirim_padam: string;
  tgl_selesai_apkt_kirim_padam: string;
  status_apkt_kirim_nyala: number;
  tgl_mulai_apkt_kirim_nyala: string;
  tgl_selesai_apkt_kirim_nyala: string;
  nama_switch: number;
  point_number_switch: number;
  kode_aset: number;
  jenis_aset: number;
  parent_aset: number;
  res_apkt_kirim_nyala: number;
  tgl_apkt_kirim_nyala: string;
}

export const ApktTransJarField = {
  no_laporan: '',
  nama_laporan: '',
  tgl_laporan: '',
  no_apkt: '',
  status_laporan: '',
  jenis_laporan: '',
  jlh_gardu_nyala: 0,
  jlh_gardu_padam: 0,
  tgl_nyala_terakhir: '',
  tgl_close_laporan: '',
  status_apkt_kirim_padam: 0,
  tgl_padam: '',
  server_apkt: '',
  res_apkt_kirim_padam: '',
  id_feeder: '',
  feeder: '',
  status_data: 0,
  tgl_nyala_awal: '',
  tgl_mulai_apkt_kirim_padam: '',
  tgl_selesai_apkt_kirim_padam: '',
  status_apkt_kirim_nyala: 0,
  tgl_mulai_apkt_kirim_nyala: '',
  tgl_selesai_apkt_kirim_nyala: '',
  nama_switch: '',
  point_number_switch: 0,
  kode_aset: '',
  jenis_aset: '',
  parent_aset: '',
  res_apkt_kirim_nyala: '',
  tgl_apkt_kirim_nyala: ''
};


export const UpdatePadamField: any = {
  tgl: "",
  id_user: "",
  id_apkt_trans_jar: "",
  ids: []
}


export type { IApktTransJar };