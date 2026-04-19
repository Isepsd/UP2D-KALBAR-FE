import { IFasopPointType } from "./fasop-pointtype.interface";

interface IFasopRTU {
  point_number:number;
  nama: string
  b3text: string
  status:number;
  faktor: string
  send_telegram:number;
  kinerja:number;
  id_pointtype: string
  id_ref_lokasi: string

  // lainlain
  id?:number;
  pointtype?:IFasopPointType,
  ref_lokasi: any;
}

export const FasopRTUField = {
  point_number: undefined,
  nama: '',
  b3text: '',
  status: 0,
  faktor: 0,
  jenis: '',
  send_telegram: 0,
  kinerja: 0,
  id_pointtype: '',
  id_ref_lokasi: '',
}

export type { IFasopRTU };
