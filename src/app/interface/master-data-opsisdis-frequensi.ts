// ASET STATUS
interface IFrequensi {
  point_number:number;
  number:number
  id_meter: number;
  no_urut: number;
  nama: string;
  datascada: string;
  path1: string;
  path2: string;
  path3: string;
  lokasi: string;
  general_address: string;
  general_slaveid: string;
  general_interval_logging: number;
  general_logging: TFrequensiStatus;
  general_scale: number;
  general_mode: string;
  general_koneksi: string;
  serial_parity: string;
  serial_port: string;
  serial_bautrate: string;
  serial_stopbits: number;
  serial_bytesize: number;
  serial_baudrate: number;
  serial_xonxoff: number;
  ip_host: string;
  ip_port: number;
  status: TFrequensiStatus;
  action: any;
  tgl_entri: any;
  tgl_update: any;
  id_user_update: number;
  id_user_entri: number;
}

export const AsetPBPembangkitField = {
  id_ref_aset_rak: null,
  point_number: null,
  nama: '',
  datascada: '',
  path1: '',
  path2: '',
  path3: '',
  status: 1,
  tgl_entri: null,
  tgl_update: null,
  id_user_update: null,
  id_user_entri: null
}

type TFrequensiStatus = 1 | 0;

export type { IFrequensi };
