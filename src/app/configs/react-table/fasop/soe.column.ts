import { NO, B1, B2, B3 } from "../_more.columns.config"

export const SOE_COLUMNS = () => {
  return [
    ...NO(),
    { Header: 'Tanggal', accessor: 'tanggal', minWidth: '160px', disableFilters: true, show: true },
    ...B1(),
    ...B2(),
    ...B3(),
    { Header: 'Element', accessor: 'element', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Info', accessor: 'info', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Status', accessor: 'msgstatus', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Tag', accessor: 'tag', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Operator', accessor: 'operator', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Limit', accessor: 'limit', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Value', accessor: 'value', minWidth: '150px', disableFilters: true, show: true },
  ]
}
export const PICKUP_SOE_COLUMNS = () => {
  return [
    ...NO(),
    { Header: 'Tanggal', accessor: 'tanggal', minWidth: '160px', disableFilters: true, show: true },
    ...B1(),
    ...B2(),
    ...B3(),
    { Header: 'Element', accessor: 'path4', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Info', accessor: 'info', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Status', accessor: 'msgstatus', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Tag', accessor: 'tag', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Operator', accessor: 'operator', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Limit', accessor: 'limit', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Value', accessor: 'value', minWidth: '150px', disableFilters: true, show: true },
  ]
}