import { ACTION_COLUMN } from "./_more.columns.config"


export const MASTER_PEGAWAI = () => {
  return [
    { Header: 'No', accessor: 'number', minWidth: '50px', disableFilters: true, show: true },
    { Header: 'Nama', accessor: 'nama', minWidth: '150px', show: true },
    { Header: 'Alamat', accessor: 'alamat', minWidth: '150px', show: true },
    { Header: 'Status', accessor: 'status', minWidth: '100px', show: true, disableFilters: true, },
    { Header: 'Departement', accessor: 'departement', minWidth: '180px', show: true, disableFilters: true, },
    { Header: 'Jabatan', accessor: 'jabatan', minWidth: '100px', show: true, disableFilters: true, },
    { Header: 'Tanda Tangan', accessor: 'signature', minWidth: '100px', show: true, disableFilters: true, },

    ...ACTION_COLUMN(),
  ]
}