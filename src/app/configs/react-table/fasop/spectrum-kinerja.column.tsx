import React from "react"
import { NO, B1, B2, B3, ACTION_COLUMN, JENIS_POINT, KINERJA, JENIS_LOKASI } from "../_more.columns.config"

export const TRIP_COLUMNS = () => {
  return [
    ...NO(),
    { Header: 'Point PID', accessor: 'pointpid', minWidth: '150px', disableFilters: true, show: true },
    ...B1(),
    ...B2(),
    ...B3(),
    { Header: 'Element', accessor: 'element', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Trip', accessor: 'trip', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'OCR', accessor: 'ocr', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'OCRM', accessor: 'ocrm', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'GFR', accessor: 'gfr', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'GFRM', accessor: 'gfrm', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Durasi (dd:hh:mm:ss)', accessor: 'durasi', minWidth: '180px', disableFilters: true, show: true },
  ]
}

export const REMOTE_CONTROL_COLUMNS = () => {
  return [
    ...NO(),
    { Header: 'Tanggal', accessor: 'tanggal', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Nama Point', accessor: 'nama', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Downtime', accessor: 'downtime', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Ketersediaan (%)', accessor: 'avability', minWidth: '180px', disableFilters: true, show: true },
  ]
}

export const ANALOG_HARI_COLUMNS = () => {
  return [
    ...NO(),
    ...KINERJA(),
    { Header: 'Point Number', accessor: 'point_number', minWidth: '150px', disableFilters: true, show: true },
    ...JENIS_POINT(),
    ...B1(),
    ...B2(),
    ...B3(),
    { Header: 'Element', accessor: 'element', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Down (kali)', accessor: 'down', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Downtime (Menit)', accessor: 'downtime', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Durasi (dd:hh:mm:ss)', accessor: 'durasi', minWidth: '180px', disableFilters: true, show: true },
    {
      Header: 'Ketersediaan (%)', accessor: 'avability', minWidth: '180px', disableFilters: true, show: true
    },
    ...ACTION_COLUMN()
  ]
}

export const ANALOG_BULAN_COLUMNS = () => {
  return [
    ...NO(),
    ...KINERJA(),
    { Header: 'Point Number', accessor: 'point_number', minWidth: '150px', disableFilters: true, show: true },
    ...JENIS_POINT(),
    ...B1(),
    ...B2(),
    ...B3(),
    { Header: 'Element', accessor: 'element', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Down (kali)', accessor: 'down', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Downtime (Menit)', accessor: 'downtime', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Durasi (dd:hh:mm:ss)', accessor: 'durasi', minWidth: '180px', disableFilters: true, show: true },
    {
      Header: 'Ketersediaan (%)', accessor: 'avability', minWidth: '180px', disableFilters: true, show: true
    },
    ...ACTION_COLUMN()
  ]
}

export const KIN_DIGITAL_HARI_COLUMNS = () => {
  return [
    ...NO(),
    ...KINERJA(),
    { Header: 'Point Number', accessor: 'point_number', minWidth: '150px', disableFilters: true, show: true },
    ...JENIS_POINT(),
    ...B1(),
    ...B2(),
    ...B3(),
    { Header: 'Element', accessor: 'element', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Down (kali)', accessor: 'down', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Downtime (Menit)', accessor: 'downtime', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Durasi (dd:hh:mm:ss)', accessor: 'durasi', minWidth: '180px', disableFilters: true, show: true },
    {
      Header: 'Ketersediaan (%)', accessor: 'avability', minWidth: '180px', disableFilters: true, show: true
    },
    ...ACTION_COLUMN()
  ]
}

export const KIN_DIGITAL_BULAN_COLUMNS = () => {
  return [
    ...NO(),
    { Header: 'Point Number', accessor: 'point_number', minWidth: '150px', disableFilters: true, show: true },
    ...JENIS_POINT(),
    ...B1(),
    ...B2(),
    ...B3(),
    { Header: 'Element', accessor: 'element', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Downtime (Menit)', accessor: 'downtime', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Durasi (dd:hh:mm:ss)', accessor: 'durasi', minWidth: '180px', disableFilters: true, show: true },
    {
      Header: 'Ketersediaan (%)', accessor: 'avability', minWidth: '180px', disableFilters: true, show: true
    },
    ...ACTION_COLUMN()
  ]
}

export const KIN_RTU_HARI_COLUMNS = () => {
  return [
    ...NO(),
    ...KINERJA(),
    { Header: 'Point Number', accessor: 'point_number', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'RTU', accessor: 'rtu', minWidth: '150px', disableFilters: true, show: true },
    ...JENIS_LOKASI(),
    ...JENIS_POINT(),
    { Header: 'Down (kali)', accessor: 'down', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Downtime (Menit)', accessor: 'downtime', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Durasi (dd:hh:mm:ss)', accessor: 'durasi', minWidth: '180px', disableFilters: true, show: true },
    {
      Header: 'Ketersediaan (%)', accessor: 'avability', minWidth: '180px', disableFilters: true, show: true
    },
    ...ACTION_COLUMN()
  ]
}

export const KIN_RTU_BULAN_COLUMNS = () => {
  return [
    ...NO(),
    { Header: 'Point Number', accessor: 'point_number', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'RTU', accessor: 'rtu', minWidth: '150px', disableFilters: true, show: true },
    ...JENIS_LOKASI(),
    ...JENIS_POINT(),
    { Header: 'Downtime (Menit)', accessor: 'downtime', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Durasi (dd:hh:mm:ss)', accessor: 'durasi', minWidth: '180px', disableFilters: true, show: true },
    {
      Header: 'Ketersediaan (%)', accessor: 'avability', minWidth: '180px', disableFilters: true, show: true
    },
    ...ACTION_COLUMN()
  ]
}

export const KIN_MASTER__HARI_COLUMNS = () => {
  return [
    ...NO(),
    ...KINERJA(),
    { Header: 'Point Number', accessor: 'point_number', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Master', accessor: 'master', minWidth: '150px', disableFilters: true, show: true },
    ...JENIS_LOKASI(),
    ...JENIS_POINT(),
    { Header: 'Down (kali)', accessor: 'down', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Downtime (Menit)', accessor: 'downtime', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Durasi (dd:hh:mm:ss)', accessor: 'durasi', minWidth: '180px', disableFilters: true, show: true },
    {
      Header: 'Ketersediaan (%)', accessor: 'avability', minWidth: '180px', disableFilters: true, show: true
    },
    ...ACTION_COLUMN()
  ]
}

export const KIN_MASTER_BULAN_COLUMNS = () => {
  return [
    ...NO(),
    ...KINERJA(),
    { Header: 'Point Number', accessor: 'point_number', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Master', accessor: 'master', minWidth: '150px', disableFilters: true, show: true },
    ...JENIS_LOKASI(),
    ...JENIS_POINT(),
    { Header: 'Down (kali)', accessor: 'down', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Downtime (Menit)', accessor: 'downtime', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Durasi (dd:hh:mm:ss)', accessor: 'durasi', minWidth: '180px', disableFilters: true, show: true },
    {
      Header: 'Ketersediaan (%)', accessor: 'avability', minWidth: '180px', disableFilters: true, show: true
    },
    ...ACTION_COLUMN()
  ]
}

export const KIN_SCADA_COLUMNS = () => {
  return [
    // { Header: 'Peralatan SCADA', accessor: 'peralatan_scada', minWidth: '180px', disableFilters: true, show: true },
    ...NO(),
    { Header: 'Jenis Peralatan', accessor: 'jenis', minWidth: '180px', disableFilters: true, show: true },
    ...B1(),
    ...B2(),
    ...B3(),
    { Header: 'Element', accessor: 'path4text', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Info', accessor: 'path5text', minWidth: '180px', disableFilters: true, show: true },
    // { Header: 'Durasi (dd:hh:mm:ss)', accessor: 'durasi', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Ketersediaan (%)', accessor: 'avability', minWidth: '180px', disableFilters: true, show: true },
    // { Header: 'Keterangan', accessor: 'keterangan', minWidth: '180px', disableFilters: true, show: true }
  ]
}

export const KIN_RC = () => {
  return [
    ...NO(),
    { Header: 'B1 (Lokasi)', accessor: 'path1', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'B2 (Tegangan)', accessor: 'path2', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'B3 (Bay)', accessor: 'path3', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Element', accessor: 'path4', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Jumlah RC', accessor: 'jlm_rc', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Sukses', accessor: 'sukses', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Gagal', accessor: 'gagal', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Performance (%)', accessor: 'performance', minWidth: '180px', disableFilters: true, show: true },
  ]
}



export const HEADER_EXTRA_TREE_FASOP = () => {
  return [{
    id: "nama",
    accessor: 'nama',
    show: true,
    disableFilters: true,
    hideColumn: true,
    minWidth: '250px',
    Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }: any) => (
      <span {...getToggleAllRowsExpandedProps()}>
        {isAllRowsExpanded ? <i className="bi bi-caret-down-fill"></i> : <i className="bi bi-caret-right"></i>} Nama
      </span>
    ),
    Cell: ({ row }: any) =>
      row.canExpand ? (
        <div
          {...row.getToggleRowExpandedProps({
            style: {
              paddingLeft: `${row.depth * 1.25}rem`
            }
          })}
          className="d-flex gap-2"
        >
          {row.isExpanded ? <i className="bi bi-caret-down-fill"></i> : <i className="bi bi-caret-right"></i>}
          <span> {row.original.nama}</span>
        </div>
      ) : <div style={{ paddingLeft: `${(row.depth ? row.depth * 1.55 : 1.65)}rem` }}>{row.original.nama}</div>,
  },
  ]
}