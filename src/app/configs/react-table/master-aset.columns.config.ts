import { ACTION_COLUMN } from './_more.columns.config';

export const MASTER_DATA_ASET_ASET = () => {
  return [
    { Header: 'No Aset', accessor: 'no_aset_internal', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Kategori', accessor: 'id_ref_aset_jenis', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Nama Aset', accessor: 'nama', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Station', accessor: 'id_ref_lokasi_1', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Penyulang', accessor: 'id_ref_lokasi_3', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Pengelola', accessor: 'id_ref_lokasi_4', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'No Seri', accessor: 'no_seri', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Manufaktur', accessor: 'id_ref_aset_manufaktur', disableFilters: true, show: true },
    { Header: 'Tipe', accessor: 'tipe', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Tahun', accessor: 'tahun', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Status Aset', accessor: 'id_ref_aset_status', minWidth: '150px', disableFilters: true, show: true },
    ...ACTION_COLUMN(),
  ];
};

/* MASTER DATA ASET STATUS, LEVEL, KONDISI,RAK */
export const MASTER_DATA_ASET_REF = () => {
  return [
    { Header: 'Nama', accessor: 'nama', minWidth: 200, disableFilters: true, show: true },
    { Header: 'Status', accessor: 'status', minWidth: 100, disableFilters: true, show: true },
    { Header: 'Tanggal Buat', accessor: 'tgl_entri', minWidth: 100, disableFilters: true, show: true },
    { Header: 'Tanggal Ubah', accessor: 'tgl_update', minWidth: 100, disableFilters: true, show: true },
    ...ACTION_COLUMN(),
  ];
};

/* MASTER DATA ASET STATUS, LEVEL, KONDISI,RAK */
export const MASTER_DATA_STATUS_ASET = () => {
  return [
    { Header: 'Nama', accessor: 'nama', minWidth: 200, disableFilters: true, show: true },
    { Header: 'Status', accessor: 'status', minWidth: 100, disableFilters: true, show: true },
    { Header: 'Tanggal Buat', accessor: 'tgl_entri', minWidth: 100, disableFilters: true, show: true },
    { Header: 'Tanggal Ubah', accessor: 'tgl_update', minWidth: 100, disableFilters: true, show: true },
    ...ACTION_COLUMN(),
  ];
};

export const MASTER_DATA_JENIS_ASET = () => {
  return [
    { Header: 'Nama', accessor: 'nama', minWidth: 200, disableFilters: true, show: true },
    { Header: 'Status', accessor: 'status', minWidth: 100, disableFilters: true, show: true },
    ...ACTION_COLUMN(),
  ];
};

export const MASTER_DATA_JENIS_ASET_ITEM = () => {
  return [
    { Header: 'Nama', accessor: 'nama', minWidth: 200, disableFilters: true, show: true },
    { Header: 'Satuan', accessor: 'satuan', minWidth: 100, disableFilters: true, show: true },
    ...ACTION_COLUMN(),
  ];
};
