interface IApktTransJarHar {
  "nama_laporan": string,
  "id_trans_jadwal_har": any,
  "tgl_laporan": any,
  "user_entri": number,
  "tgl_user_entri": string,
  "status_laporan": string,
  "jenis_laporan": string,
  "pelaksana": number,
  "wilayah_padam": string,
  "status_apkt_kirim": 1,
  "tgl_mulai_pelaksanaan": any,
  "tgl_selesai_pelaksanaan": any
}

export const ApktTransJarHarField = {
  "nama_laporan": "pemeliharaan",
  "id_trans_jadwal_har": null,
  "tgl_laporan": "",
  "user_entri": 1,
  "tgl_user_entri": "",
  "status_laporan": "open",
  "jenis_laporan": "pemeliharaan",
  "pelaksana": null,
  "wilayah_padam": "-",
  "status_apkt_kirim": 1,
  "tgl_mulai_pelaksanaan": "",
  "tgl_selesai_pelaksanaan": ""
};

export type { IApktTransJarHar };