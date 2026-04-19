import { IAsetKondisi } from '@app/interface/aset-kondisi.interface';
import { IAsetRak } from '@app/interface/aset-rak.interface';
import { IAsetRuangan } from '@app/interface/aset-ruangan.interface';
import { IAsetLantai } from '@app/interface/aset-lantai.interface';
import { IJaringan } from '@app/interface/jaringan-lokasi.interface';
import { IAsetStatus } from '@app/interface/aset-status.interface';
import { IAsetManufaktur } from '@app/interface/aset-manufaktur.interface';
import { IAsetLevel } from '@app/interface/aset-level.interface';
import { IAsetJenis } from './aset-jenis.interface';

interface IAset {
  id_ref_aset: number,
  id_ref_aset_parent: IAset,
  ref_aset_parent: IAset,
  jenis_aset: string,
  id_ref_aset_status: IAsetStatus,
  id_ref_aset_jenis: IAsetJenis,
  id_ref_aset_manufaktur: IAsetManufaktur,
  id_ref_aset_level: IAsetLevel,
  ref_aset_status: IAsetStatus,
  ref_aset_jenis: IAsetJenis,
  ref_aset_manufaktur: IAsetManufaktur,
  ref_aset_level: IAsetLevel,
  id_trans_pm: number,
  id_aset_mutasi: number,
  id_ref_lokasi_1: IJaringan,
  id_ref_lokasi_2: IJaringan,
  id_ref_lokasi_3: IJaringan,
  id_ref_lokasi_4: IJaringan,
  ref_lokasi_1: IJaringan,
  ref_lokasi_2: IJaringan,
  ref_lokasi_3: IJaringan,
  ref_lokasi_4: IJaringan,
  no_aset_internal: number,
  no_aset_external: number,
  nama: string,
  no_seri: string,
  model: string,
  tipe: string,
  tahun: number,
  dimensi_lebar: number,
  dimensi_panjang: number,
  dimensi_tinggi: number,
  dimensi_satuan: number,
  massa_berat: number,
  massa_satuan: number,
  id_ref_aset_lantai: IAsetLantai,
  id_ref_aset_ruangan: IAsetRuangan,
  id_ref_aset_kondisi: IAsetKondisi,
  id_ref_aset_rak: IAsetRak,
  ref_aset_lantai: IAsetLantai,
  ref_aset_ruangan: IAsetRuangan,
  ref_aset_kondisi: IAsetKondisi,
  ref_aset_rak: IAsetRak,
  lat: number,
  lon: number
}

export const FAset = [
  'id_ref_aset_parent',
  'id_ref_aset_status',
  'id_ref_aset_jenis',
  'id_ref_aset_manufaktur',
  'id_ref_aset_level',
  'id_trans_pm',
  'id_aset_mutasi',
  'id_ref_lokasi_1',
  'id_ref_lokasi_2',
  'id_ref_lokasi_3',
  'id_ref_lokasi_4',
  'id_ref_aset_lantai',
  'id_ref_aset_ruangan',
  'id_ref_aset_kondisi',
  'id_ref_aset_rak',
  'jenis_aset',
  'no_aset_internal',
  'no_aset_external',
  'nama',
  'no_seri',
  'model',
  'tipe',
  'tahun',
  'dimensi_lebar',
  'dimensi_panjang',
  'dimensi_tinggi',
  'dimensi_satuan',
  'massa_berat',
  'massa_satuan',
  'lat',
  'lon'
];

export type { IAset };