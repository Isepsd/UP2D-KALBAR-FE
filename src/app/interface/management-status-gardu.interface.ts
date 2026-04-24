
interface IGarduStatus {
  id_scd_statusgardu: number,
  alamat: string,
  color_1: string,
  color_2: string,
  datetime_status_1: string,
  datetime_status_2: string,
  datum_created: string,
  feeder: string,
  msec_1: string,
  msec_2: string,
  nama_gardu: string,
  point_name: string,
  point_number: string,
  point_text: string,
  server: string,
  status: number,
  status_1: string,
  status_2: string
  status_gardu: boolean,
}

export const GarduStatusField = {
  alamat: "",
  color_1: null,
  color_2: null,
  datetime_status_1: "",
  datetime_status_2: "",
  datum_created: "",
  feeder: "",
  id_scd_statusgardu: null,
  msec_1: null,
  msec_2: null,
  nama_gardu: "",
  point_name: "",
  point_number: null,
  point_text: "",
  server: "",
  status: 0,
  status_gardu: 0,
  status_1: "",
  status_2: ""
}

export type { IGarduStatus };
