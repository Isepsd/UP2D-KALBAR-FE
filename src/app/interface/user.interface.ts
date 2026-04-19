// USER
interface IUser {
  roleId: number;
  nip: string;
  status: TUserStatus;
  fullname: string;
  username: string;
  sap: string;
  email: string;
  phone: string;
  gender: TGender;
  departement: string;
  avatar: string;
  password: string;
  signature: string; // tanda tangan
  id_perusahaan: any;
  id_jabatan: any;
  id_departemen: any;
  departemen: any,
  jabatan: any,
  perusahaan: any,
  role: any,
}

export const UserField = {
  id_user: undefined,
  departemen: null,
  jabatan: null,
  perusahaan: null,
  role: null,
  is_superuser: true,
  is_active: true,
  nip: '',
  status: 'active',
  fullname: '',
  username: '',
  sap: '',
  email: '',
  phone: '',
  gender: 'L',
  avatar: '',
  signature: '',
  akses_login: true,
  roleId: null,
  id_perusahaan: null,
  id_jabatan: null,
  id_departemen: null,
};

type TUserStatus = 'active' | 'inactive' | 'block';
type TGender = 'L' | 'P';

export type { IUser };
