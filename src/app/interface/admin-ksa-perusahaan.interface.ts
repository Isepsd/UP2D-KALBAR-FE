// ASET STATUS
interface IAdminKSAPerusahaan {
  id_perusahaan: number;
  nama: string;
  nama_direktur: string;
  alamat_kantor: string;
  email: string;
  no_hp: string;
  tgl_entri: string;
  tgl_update: string;
}

export const AdminKSAPerusahaanField = {
  id_perusahaan: undefined,
  nama: '',
  nama_direktur: '',
  alamat_kantor: '',
  email: '',
  no_hp: '',
  tgl_entri: '',
  tgl_update: '',
};

export type { IAdminKSAPerusahaan };
