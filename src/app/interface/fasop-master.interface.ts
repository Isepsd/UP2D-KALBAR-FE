interface IFasopMaster {
  number:number;
  nama: string;
  b3text: string;
  status: number;
  faktor: string;
  jenis: string;
  send_telegram: number;
  kinerja: number;
  id_pointtype: string;
  id_ref_lokasi: string;
  ref_lokasi: any;

  // relation
  pointtype?:any
}

export const FasopMasterField = {
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
};

export type { IFasopMaster };
