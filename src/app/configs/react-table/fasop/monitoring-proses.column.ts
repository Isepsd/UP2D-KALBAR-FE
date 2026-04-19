import { B1, B2, B3 } from "../_more.columns.config"

export const MONITORING_PROSES_COLUMN = () => {
  return [
    { Header: 'Nama', accessor: 'name', minWidth: '50px', disableFilters: true, show: true },
    { Header: 'Tanggal Proses', accessor: 'tgl_update_proses', minWidth: '80px', disableFilters: true, show: true },
    { Header: 'Status', accessor: 'status_data', minWidth: '30px', disableFilters: true, show: true },
    { Header: 'Group Proses', accessor: 'group_proses', minWidth: '30px', disableFilters: true, show: true },
    { Header: 'Expire Running', accessor: 'expire_running', minWidth: '30px', disableFilters: true, show: true },
    { Header: 'Expire Satuan', accessor: 'expire_satuan', minWidth: '30px', disableFilters: true, show: true },
    { Header: 'Keterangan', accessor: 'keterangan', minWidth: '30px', disableFilters: true, show: true },
    { Header: 'Console', accessor: 'console', minWidth: '30px', disableFilters: true, show: true },
  ]
}

export const MONITORING_PROSES_DETAIL_COLUMN = () => {
  return [

    { Header: 'No', accessor: 'number', minWidth: '30px', disableFilters: true, show: true },
    { Header: 'Point Number', accessor: 'point_number', minWidth: '100px', disableFilters: true, show: true },
    ...B1(),
    ...B2(),
    ...B3(),
    { Header: 'Element', accessor: 'path4', minWidth: '100px', disableFilters: true, show: true },
    { Header: 'Value', accessor: 'value', minWidth: '100px', disableFilters: true, show: true },
    { Header: 'Update Terakhir', accessor: 'datum_capture', minWidth: '100px', disableFilters: true, show: true },
    { Header: 'Status', accessor: 'kesimpulan', minWidth: '100px', disableFilters: true, show: true },

  ]
}