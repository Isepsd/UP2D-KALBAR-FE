// ASET STATUS
interface IFasopPath1 {
  id_ref_path1: number;
  id_ref_lokasi: number | null;
  path1: string;
  status: TAsetStatus;
  number:number
  ref_lokasi: any;
}

export const FasopPath1Field = {
  id_ref_path1: undefined,
  id_ref_lokasi: null,
  path1: '',
  status: 0,
};

type TAsetStatus = 1 | 0;

export type { IFasopPath1 };
