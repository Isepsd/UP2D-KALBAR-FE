import { NO } from "../../_more.columns.config"

export const NYALA_BERTAHAP_REKAP_PADAM = () => {
  return [
    ...NO(),  
    { Header: 'Section', accessor: 'section', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Sisa beban padam', accessor: 'sisa_beban_padam', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Durasi', accessor: 'durasi', minWidth: '100px', disableFilters: true, show: true },
    { Header: 'ENS', accessor: 'ens', minWidth: '100px', disableFilters: true, show: true },
    { Header: 'Aksi', accessor: 'action', minWidth: '90px', disableFilters: true, show: true },
  ]
}
