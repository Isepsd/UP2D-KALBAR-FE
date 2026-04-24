// ASET STATUS
interface IFasopPath3 {
  id: number;
  path3: string;
  status: TAsetStatus;
  id_ref_path3: number;
  id_ref_lokasi: number;
  number:number
  ref_lokasi:any
}

export const FasopPath3Field = {
  id_ref_path3: undefined,
  id_ref_lokasi: null,
  path3: '',
  status: 0,
};

type TAsetStatus = 1 | 0;

export type { IFasopPath3 };
