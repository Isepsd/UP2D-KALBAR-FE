import { NO } from "../_more.columns.config"

export const AMR_COLUMN = () => {
  return [
    ...NO(),
    { Header: 'Tanggal', accessor: 'datetime', minWidth: '150px', disableFilters: true, show: true, fixed: true },
    { Header: 'Customer RID', accessor: 'customer_rid', minWidth: '150px', disableFilters: true, show: true, fixed: true },
    { Header: 'Customer Name', accessor: 'customer_name', minWidth: '150px', disableFilters: true, show: true, fixed: true },
    { Header: 'Faktor Kali', accessor: 'fk', minWidth: '150px', disableFilters: true, show: true, fixed: false },
    {
      Header: 'Stand Awal', minWidth: '150px', disableFilters: true, show: true, customClass: "text-center", columns: [
        { Header: 'KWH', accessor: 'kwh_prev', minWidth: '150px', disableFilters: true, show: true, fixed: false },
        { Header: 'KVARH', accessor: 'kvarh_prev', minWidth: '150px', disableFilters: true, show: true, fixed: false },
        { Header: 'Rate 1', accessor: 'rate1_prev', minWidth: '150px', disableFilters: true, show: true, fixed: false },
        { Header: 'Rate 2', accessor: 'rate2_prev', minWidth: '150px', disableFilters: true, show: true, fixed: false },
        { Header: 'Rate 3', accessor: 'rate3_prev', minWidth: '150px', disableFilters: true, show: true, fixed: false },

      ]
    },
    {
      Header: 'Stand Akhir', minWidth: '150px', disableFilters: true, show: true, customClass: "text-center", columns: [
        { Header: 'KWH', accessor: 'kwh', minWidth: '150px', disableFilters: true, show: true, fixed: false },
        { Header: 'KVARH', accessor: 'kvarh', minWidth: '150px', disableFilters: true, show: true, fixed: false },
        { Header: 'Rate 1', accessor: 'rate1', minWidth: '150px', disableFilters: true, show: true, fixed: false },
        { Header: 'Rate 2', accessor: 'rate2', minWidth: '150px', disableFilters: true, show: true, fixed: false },
        { Header: 'Rate 3', accessor: 'rate3', minWidth: '150px', disableFilters: true, show: true, fixed: false },

      ]
    },
    {
      Header: 'Nilai', minWidth: '150px', disableFilters: true, show: true, customClass: "text-center", columns: [
        { Header: 'KWH Real', accessor: 'pe_kwh', minWidth: '150px', disableFilters: true, show: true, fixed: false },
        { Header: 'KVARH Real', accessor: 'pe_kvarh', minWidth: '150px', disableFilters: true, show: true, fixed: false },
        { Header: 'Rate 1 Real', accessor: 'pe_rate1', minWidth: '150px', disableFilters: true, show: true, fixed: false },
        { Header: 'Rate 2 Real', accessor: 'pe_rate2', minWidth: '150px', disableFilters: true, show: true, fixed: false },
        { Header: 'Rate 3 Real', accessor: 'pe_rate3', minWidth: '150px', disableFilters: true, show: true, fixed: false },

      ]
    },
    { Header: 'Maxdem', accessor: 'maxdem', minWidth: '150px', disableFilters: true, show: true, fixed: false },

  ]
}