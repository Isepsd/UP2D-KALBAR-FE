interface IAmrCustomer {
  number: number,
  id: number,
  nama: string,
  alamat: string,
  customer_rid: number,
  meter_id: string,
  meter_type: number,
  rate: string,
  modem_adr: number,
  lok: string,
  daya: number,
  bapm: string,
  faktor_kali: number,
  nofa: string,
  goltarif: string,
  kodegardu: string
  id_user_entri: any;
  id_user_update: any;
  tgl_entri: any,
  tgl_update: any,
}

export const JaringanZoneField = {
  id: null,
  customer_rid: 0,
  meter_id: null,
  meter_type: 0,
  rate: null,
  modem_adr: 0,
  nama: null,
  alamat: null,
  lok: null,
  daya: 0,
  bapm: null,
  faktor_kali: 0,
  nofa: null,
  goltarif: null,
  kodegardu: null
}

export type { IAmrCustomer };
