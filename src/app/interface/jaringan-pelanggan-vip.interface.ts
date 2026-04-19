import { IJaringan } from '@app/interface/jaringan-lokasi.interface';

interface IJaringanVIP {
  id: number;
  number: number;
  id_ref_lokasi: number;
  nama: string;
  nama_section: string;
  idpel: string;
  alamat: string;
  ref_lokasi: IJaringan;
  up3: IJaringan;
  ulp: IJaringan;
  ultg: IJaringan;
  daya_tersambung: number,
  satuan_daya_tersambung: any,
  no_kontak: string,
  status: number,
}

export const JaringanVIPField = {
  id: undefined,
  id_ref_lokasi: null,
  nama: '',
  nama_section: '',
  idpel: '',
  alamat: '',
  daya_tersambung: null,
  satuan_daya_tersambung: '',
  no_kontak: '',
  id_up3: null,
  id_ulp: null,
  id_ultg: null,
  datum_created: null,
  status: 1,
};

export type { IJaringanVIP };
