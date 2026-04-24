// ASET REF
interface IAsetRef {
  id: number;
  nama: string;
  status: TAsetRef;
  tgl_entri: any,
  tgl_update: any,
}

type TAsetRef = 1 | 0;

export type { IAsetRef };