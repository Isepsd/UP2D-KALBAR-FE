// USER
interface IPegawai {
  number:number
  id: number;
  roleId: number;
  nip: string;
  status: TUserStatus;
  nama: string;
  sap: string;
  email: string;
  phone: string;
  gender: TGender;
  departement: string;
  avatar: string;
  password: string;
  signature: string; // tanda tangan
  tgl_entri: any;
  tgl_update: any;
}

export const UserField = [
  'id_user',
  'is_active',
  'roleId',
  'nip',
  'status',
  'fullname',
  'username',
  'sap',
  'email',
  'phone',
  'gender',
  'departement',
  'avatar',
  'password',
  'signature',
];

type TUserStatus = 1 | 0
type TGender = 'L' | 'P';

export type { IPegawai };
