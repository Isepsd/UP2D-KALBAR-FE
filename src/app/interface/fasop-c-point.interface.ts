// import { IFasopPointType } from './fasop-pointtype.interface';
// import { IJaringan } from './jaringan-lokasi.interface';

interface IFasopCPoint {
  point_number: undefined;
  id_pointtype: string;
  pointtype?: any;
  point_name: string;
  point_text: string;
  description: string;
  point_type: string;
  tipe_point: string; 
  station: any; 
  active: string;
  aor_id: number;
  aor_id_dw: number;
  measurement_type: number;
  tariff_group_id: number;
  ctrl_area_int_id: number;
  ctrl_area_ext_id: number;
  meas_unit: string;
  state_set_id: number;
  collection_rate: number;
  absolute_error: number;
  significant_digits: number;
  energy_type: string;
  import_export: string;
  counter_type: string;
  scaling_facktor: number;
  rollover_limit: number;
  precision_processing: number;
  precision: string;
  ddc_trigger_report_flag: string;
  system_id: number;
  collection_delay: number;
  value: number;
  status_network: string;
  update_network: string;
  kinerja: number;
  point_class: string;
  send_telegram: number;
  capture_telemetring: number;
  format_pesan: string;
  durasi_perubahan: number;
  rc: number;
  trip: number;
  rc_telegram: number;
  trip_telegram: number;
  status: any;
  wilayah: string;
  path1: string;
  path2: string;
  path3: string;
  path4: string;
  path5: string;
  path1text: string;
  path2text: string;
  path3text: string;
  path4text: string;
  path5text: string;
  nama_lokasi: string;
  id_ref_lokasi: number;

  ref_lokasi?: any;

  last_update: string;
  created: string;
  last_modified: string;
}

export const FasopCPointField = {
  point_number: undefined,
  id_pointtype: null,
  nama_lokasi: null,
  point_name: '',
  station: '',
  // nama_lokasi: '',
  point_text: '',
  description: '',
  point_type: '',
  active: '',
  aor_id: 0,
  aor_id_dw: 0,
  measurement_type: 0,
  tariff_group_id: 0,
  ctrl_area_int_id: 0,
  ctrl_area_ext_id: 0,
  meas_unit: '',
  state_set_id: 0,
  collection_rate: 0,
  absolute_error: 0,
  significant_digits: 0,
  energy_type: '',
  import_export: '',
  counter_type: '',
  scaling_facktor: 0,
  rollover_limit: 0,
  precision_processing: 0,
  precision: '',
  ddc_trigger_report_flag: '',
  system_id: 0,
  collection_delay: 0,
  value: 0,
  status_network: '',
  update_network: '',
  kinerja: 0,
  point_class: '',
  send_telegram: 0,
  capture_telemetring: 0,
  format_pesan: '',
  durasi_perubahan: 0,
  rc: 0,
  trip: 0,
  rc_telegram: 0,
  trip_telegram: 0,
  status: 0,
  wilayah: '',
  path1: '',
  path2: '',
  path3: '',
  path4: '',
  path5: '',
  path1text: '',
  path2text: '',
  path3text: '',
  path4text: '',
  path5text: '',
  id_ref_lokasi: '',
  id_bay_lokasi: '',
};

export type { IFasopCPoint };
