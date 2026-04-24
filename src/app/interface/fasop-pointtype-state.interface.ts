import { IFasopPointType } from './fasop-pointtype.interface';

interface IFasopPointTypeState {
  id_pointtype_state: number;
  id_pointtype: string;
  pointtype: IFasopPointType;
  name: string;
  value: string;
  status: number;
  valid: number;
  date_created: string;
  statekey: number;
  quality_code: string;
}

export const FasopPointTypeStateField = {
  id_pointtype: null,
  name: '-',
  status: 0,
  valid: 0,
  value: 0,
  statekey: 0,
  quality_code: '',
};

export type { IFasopPointTypeState };
