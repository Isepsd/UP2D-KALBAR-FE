// import { IFasopTelegramGroup } from "./fasop-telegram-group.interface";

interface IFasopKinerjaScada {
  id_pointtype?: number;
  tahun?: number;
  t_01: number;
  t_02: number;
  t_03: number;
  t_04: number;
  t_05: number;
  t_06: number;
  t_07: number;
  t_08: number;
  t_09: number;
  t_10: number;
  t_11: number;
  t_12: number;
}
/** YANG DI PAKE DI FORM */
export const FasopKinerjaScadaFiled: any = {
  id_pointtype: undefined,
  id_unit: undefined,
  tahun: null,
  t_01: 0,
  t_02: 0,
  t_03: 0,
  t_04: 0,
  t_05: 0,
  t_06: 0,
  t_07: 0,
  t_08: 0,
  t_09: 0,
  t_10: 0,
  t_11: 0,
  t_12: 0,
};

export type { IFasopKinerjaScada };
