import { ACTION_COLUMN } from './_more.columns.config';

/* MASTER DATA ASET STATUS, LEVEL, KONDISI,RAK */
export const MASTER_DATA_DEPARTEMENT = () => {
  return [
    { Header: 'Nama', accessor: 'nama', minWidth: 200, disableFilters: true, show: true },
    ...ACTION_COLUMN(),
  ];
};

export const MASTER_DATA_PERUSAHAAN = () => {
  return [
    { Header: 'Nama Perusahaan', accessor: 'nama', minWidth: 200, disableFilters: true, show: true },
    { Header: 'Direktur', accessor: 'nama_direktur', minWidth: 200, disableFilters: true, show: true },
    { Header: 'email', accessor: 'email', minWidth: 200, disableFilters: true, show: true },
    { Header: 'alamat', accessor: 'alamat_kantor', minWidth: 200, disableFilters: true, show: true },
    ...ACTION_COLUMN(),
  ];
};

export const MASTER_DATA_JABATAN = () => {
  return [
    { Header: 'Nama', accessor: 'nama', minWidth: 200, disableFilters: true, show: true },
    ...ACTION_COLUMN(),
  ];
};
export const REGU_PETUGAS = () => {
  return [
    { Header: 'Nama', accessor: 'name', minWidth: 200, disableFilters: false, show: true },
    ...ACTION_COLUMN(),
  ];
};
export const PETUGAS_REGU = () => {
  return [
    { Header: 'Nama Petugas', accessor: 'petugas', minWidth: 200, disableFilters: false, show: true },
    { Header: 'Nama', accessor: 'nama', minWidth: 200, disableFilters: false, show: true },
    ...ACTION_COLUMN(),
  ];
};
